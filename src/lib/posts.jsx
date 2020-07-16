import fs from 'fs'
import path from 'path'

import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'
import highlight from 'remark-highlight.js'
import frontmatter from 'remark-frontmatter'
import math from 'remark-math'
import katex from 'remark-html-katex'
import toc from 'remark-toc'
import breaks from 'remark-breaks'

const docsDirectory = path.join(process.cwd(), 'src/docs')
const postsMap = JSON.parse(fs.readFileSync(
  path.join(process.cwd(), 'gen/postsMap.json'), 'utf8'
))

// posts/[id].tsx
export function getPostIds() {
  return postsMap.map((post) => {
    return {
      params: {
        id: post.id
      }
    }
  })
}

// posts/[id].tsx
export async function getPostData(id) {
  // ↑async is for remark.
  const fullPath = path.join(docsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const matterResult = matter(fileContents)
  const tags = matterResult.data.tags.map((tag) => (tag.toLowerCase())).sort()
  
  const processor = await remark()
    .use(breaks)
    .use(math)
    .use(toc)
    .use(katex)
    .use(highlight)
    .use(html)
    .process(matterResult.content)
  
  const contentHtml = processor.toString()
  
  return {
    id,
    contentHtml,
    ...matterResult.data,
    tags,
  }
}

// tags/index.tsx
export function getTags() {
  const tags = []
  postsMap.map((post) => {
    post.tags.map((t) => tags.push(t))
  })
  
  const setTags = [...new Set(tags)]
  return setTags.sort()
}

// tags/[tag].tsx
export function getTagPosts(tag) {
  return postsMap.filter((post) => post.tags.includes(tag))
}