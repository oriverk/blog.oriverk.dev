import fs from 'fs'
import path from 'path'
import matter from 'gray-matter' // front matter parser
import remark from 'remark'
import html from 'remark-html' // plugin to serialize Markdown as HTML.
import katex from 'remark-html-katex' // plugin to transform inlineMath and math nodes with KaTeX for remark-html.
import math from 'remark-math' //plugins to support math! use $$ \n\n $$
import highlight from 'remark-highlight.js' // plugin to highlight code blocks with highlight.js (via lowlight)
import toc from 'remark-toc' // plugin to generate a table of contents.
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

const docsDirectory = path.join(process.cwd(), 'src/docs')

function getAllPostsAllData() {
  const fileNames = fs.readdirSync(docsDirectory)
  const allPostsAllData = fileNames.map(name => {
    const id = name.replace(/\.mdx?$/, '')
    const fullPath = path.join(docsDirectory, name)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)

    const title = matterResult.data.title
    const tags = matterResult.data.tags.map(t => t.toLowerCase()).sort() || ''
    const create = matterResult.data.create
    const update = matterResult.data.update || ''
    const content = matterResult.content
    return {
      id,
      title,
      create,
      update,
      tags,
      content
    }
  })
  return allPostsAllData.sort((a, b) => {
    if (a.create < b.create) {
      return 1
    } else {
      return -1
    }
  })
}

// posts/index
export function getSortedPostsData() {
  const allPostsAllData = getAllPostsAllData()
  const sortedPostsData = allPostsAllData.map(postData => {
    const id = postData.id
    const title = postData.title
    const create = postData.create
    const update = postData.update
    const tags = postData.tags
    return {
      id,
      title,
      create,
      update,
      tags
    }
  })
  return sortedPostsData
}

// posts/[id].tsx getStaticPaths
export function getAllPostIds() {
  const allPostsAllData = getAllPostsAllData()
  return allPostsAllData.map(postData => {
    return {
      params: {
        id: postData.id
      }
    }
  })
}

// posts/[id].tsx getStaticProps
export async function getPostData(id) {
  // ↑async is for remark.
  const allPostsAllData = getAllPostsAllData()
  const postData = allPostsAllData.find( post => post.id === id )
  const title = postData.title
  const create = postData.create
  const update = postData.update
  const tags = postData.tags
  
  const processor = await remark()
    .use(squeeze)
    .use(alignHeading)
    .use(slug)
    .use(link2heading, {
      behavior: 'wrap',
      linkProperties: { ariaHidden: true, tabIndex: -1, class: "heading-link" },
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
  
  return {
    id,
    title,
    create,
    update,
    tags,
    content
  }
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
export function getTags() {
  const allPostsAllData = getAllPostsAllData()
  let tags = []
  allPostsAllData.forEach((post) => {
    tags = tags.concat(post.tags)
  })
  const setTags = [...new Set(tags)]
  return setTags.sort()
}

// tags/[tag].tsx
export function getTagPosts(tag) {
  const allPostsAllData = getAllPostsAllData()
  return allPostsAllData.filter((post) => post.tags.includes(tag))
}