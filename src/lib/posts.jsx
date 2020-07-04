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
  for (var m = 0; m < matterTags.length; m++){
    for (var n = 0; n < matterTags[m].length; n++){
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