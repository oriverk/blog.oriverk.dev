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

const docsDirectory = path.join(process.cwd(), 'src/docs')

// posts/index.tsx
export function getSortedPostsData() {
  const fileNames = fs.readdirSync(docsDirectory)
  const allPostsData = fileNames.map(fileName => {
    const id = fileName.replace(/\.md$/, '')
    const fullPath = path.join(docsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)
    const tags = matterResult.data.tags.map((tag) => (tag.toLowerCase())).sort()
    return {
      id,
      ...matterResult.data,
      tags,
    }
  })
  return allPostsData.sort((a, b) => {
    if (a.create < b.create) {
      return 1
    } else {
      return -1
    }
  })
}

// posts/[id].tsx
export function getAllPostIds() {
  const fileNames = fs.readdirSync(docsDirectory)
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}

const alignHeading = () => {
  return tree => {
    const heading = tree.children.filter(child => child.type === 'heading')
    const min = Math.min(...heading.map(h => h.depth))
    if (min === 1) {
      heading.forEach(node => {
        node.depth = node.depth + 1
      })
    }
  }
}

// posts/[id].tsx
export async function getPostData(id) {
  // ↑async is for remark.
  const fullPath = path.join(docsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const matterResult = matter(fileContents)
  const tags = matterResult.data.tags.map((tag) => (tag.toLowerCase())).sort()

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
    .process(matterResult.content)
    
  const contentHtml = processor.toString()

  
  // const processor1 = unified().use(toMdast).use(frontmatter).use(alignHeading).use(link2heading)   
  
  // console.log('-parsed---------------------- ')
  // const parsed = processor1.parse(fullPath);
  // console.log(inspect(parsed));
  // console.log('=transformed================')
  // const transformed = processor1.runSync(parsed);
  // console.log(inspect(transformed));
  
  return {
    id,
    contentHtml,
    ...matterResult.data,
    tags,
  }
}

// tags/index.tsx
export function getAllTags() {
  const fileNames = fs.readdirSync(docsDirectory)
  const matterTags = fileNames.map(fileName => {
    const fullPath = path.join(docsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    return matter(fileContents).data.tags.map((tag) => tag.toLowerCase())
  })

  // [['qiita', 'ruby', 'hoge'], ['qiita', 'ruby', 'python']]

  // convert Two dimentional array to One that
  const allMatterTags = []
  for (var m = 0; m < matterTags.length; m++) {
    for (var n = 0; n < matterTags[m].length; n++) {
      allMatterTags.push(matterTags[m][n])
    }
  }
  // sort and unique allMatterTags
  const set = new Set(allMatterTags.sort());
  const tags = Array.from(set)
  return tags
}

export function getTagPosts(arg) {
  const fileNames = fs.readdirSync(docsDirectory)
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '')
    const fullPath = path.join(docsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)
    const tags = matterResult.data.tags.map((tag) => tag.toLowerCase()).sort()
    if (tags.includes(arg.toLowerCase())) {
      return {
        id,
        ...matterResult.data,
        tags
      }
    } else {
      return ''
    }
  })
  return allPostsData.filter(Boolean).sort((a, b) => {
    if (a.create < b.create) {
      return 1
    } else {
      return -1
    }
  })
}