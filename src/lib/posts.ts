import fs from 'fs'
import path from 'path'
import matter from 'gray-matter' // front matter parser
import remark from 'remark'
import html from 'remark-html' // plugin to serialize Markdown as HTML.
import katex from 'remark-html-katex' // plugin to transform inlineMath and math nodes with KaTeX for remark-html.
import math from 'remark-math' //plugins to support math! use $$ \n\n $$
import highlight from 'remark-highlight.js' // plugin to highlight code blocks with highlight.js (via lowlight)
// import toc from 'remark-toc' // plugin to generate a table of contents.
import breaks from 'remark-breaks' // plugin to add break support, without needing spaces.
import slug from 'remark-slug' // plugin to add anchors headings using GitHub’s algorithm.
import link2heading from 'remark-autolink-headings' // plugin to automatically add links to headings. this must be included after `remark-slug`
import squeeze from 'remark-squeeze-paragraphs' // plugin to remove empty (or whitespace only) paragraphs.
// import vfile from 'vfile'
// import unified from 'unified'
// import inspect from 'unist-util-inspect' // utility to inspect nodes
// import remarkMdx from 'remark-mdx'
// import toMdast from 'remark-parse' // parses markdown ton mdast
// import toHast from 'mdast-util-to-hast'

import { alignHeading } from './mdParser'

import { PostDataType } from '../types/posts'

function getDocDir(locale: string): string {
  return path.join(process.cwd(), 'src/docs/' + locale)
}

function getAllPostData(locale: string): PostDataType[] {
  const docsDir = getDocDir(locale)
  const fileNames = fs.readdirSync(docsDir)
  const allPostData = fileNames.map(name => {
    const id = name.replace(/\.mdx?$/, '')
    const fullPath = path.join(docsDir, name)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)

    const { title = '', create = '', update = '', image = '' } = matterResult.data as PostDataType
    const content = matterResult.content || ''
    const tags: string[] = matterResult.data.tags.map((tag: string) => tag.toLowerCase()).sort() || []

    return { id, title, create, update, tags, image, content }
  })
  
  return allPostData.sort((a, b) => {
    if (a.create < b.create) {
      return 1
    } else {
      return -1
    }
  })
}

// posts/index
export function getSortedPostsData(locale: string): Omit<PostDataType, 'content'>[] {
  const allPostData = getAllPostData(locale)
  const sortedData = allPostData.map(postData => {
    const { id, title, create, update, image } = postData

    let tags: string[] = postData.tags
    if (tags.includes('ruby') && tags.includes('rails')) {
      tags = tags.filter(tag => tag !== 'ruby')
    }

    return { id, title, create, update, tags, image }
  })
  return sortedData
}

// posts/[id].tsx getStaticPaths
export function getAllPostIds(locales: string[]) {
  let paths: { params: { id: string }; locale: string }[] = [];
  locales.map((locale) => {
    const data = getAllPostData(locale)
    data.map((datum) => {
      const { id } = datum
      paths.push({ params: { id }, locale });
    })
  })
  return paths
}

// posts/[id].tsx getStaticProps
export async function getPostData(id: string, locale: string): Promise<PostDataType> {
  const allPostData = getAllPostData(locale)
  const postData = allPostData.find(post => post.id === id)

  const { title, create, update, tags, image } = postData

  const processor = await remark()
    .use(squeeze)
    .use(alignHeading)
    .use(slug)
    .use(link2heading, {
      behavior: 'wrap',
      linkProperties: { class: "heading-link" },
    }) // Note that this module must be included after `remark-slug`.
    .use(breaks)
    .use(math)
    .use(katex)
    .use(highlight)
    .use(html, { sanitize: false })
    .process(postData.content)

  // const processor1 = unified().use(toMdast).use(frontmatter).use(alignHeading).use(link2heading)   

  // console.log('-parsed---------------------- ')
  // const parsed = processor1.parse(fullPath);
  // console.log(inspect(parsed));
  // console.log('=transformed================')
  // const transformed = processor1.runSync(parsed);
  // console.log(inspect(transformed));

  const content = processor.toString()

  return { id, title, create, update, tags, image, content }
}

// function countDuplicateTags (arr) {
//   return arr.reduce(function (counts, key) {
//     counts[key] = (counts[key]) ? counts[key] + 1 : 1
//     return counts
//   }, {})
// }
// const hoge = countDuplicateTags(tags)
// {'ruby':5, 'js': 2, ...}

// tags/index.tsx
export function getTags(locale: string): string[] {
  const allPostData = getAllPostData(locale)
  let tags: string[] = []
  allPostData.forEach((post) => {
    tags = tags.concat(post.tags)
  })
  const setTags = [...new Set(tags)]
  return setTags.sort()
}

export function getTagsLocales(locales: string[]) {
  let paths: { params: { tag: string }; locale: string }[] = []
  locales.map((locale) => {
    const tags = getTags(locale)
    tags.map((tag) => {
      paths.push({ params: { tag }, locale })
    })
  })
  return paths
}

// tags/[tag].tsx
export function getTagPosts(tag: string, locale: string): Omit<PostDataType, 'content'>[] {
  const allPostData = getAllPostData(locale)
  const tagPostsData = allPostData.filter((post) => post.tags.includes(tag))
  const postsData = tagPostsData.map((post) => {
    const { id, title, create, update, image } = post

    let tags: string[] = post.tags
    if (tags.includes('ruby') && tags.includes('rails')) {
      tags = tags.filter(tag => tag !== 'ruby')
    }
    return { id, title, create, update, tags, image }
  })
  return postsData
}