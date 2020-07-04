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

const postsDirectory = path.join(process.cwd(), 'src/docs')

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map(fileName => {
    const id = fileName.replace(/\.md$/, '')
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)
    const tags = matterResult.data.tags.map((tag) => (tag.toLowerCase())).sort()
    
    // bring data together with id
    return {
      id,
      tags,
      ...matterResult.data,
    }
  })
  // sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.create < b.create) {
      return 1
    } else {
      return -1
    }
  })
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}

export async function getPostData(id) {
  // ↑async is for remark.
  const fullPath = path.join(postsDirectory, `${id}.md`)
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
    tags,
    ...matterResult.data,
  }
}
      
export function getPostsTags() {
  const fileNames = fs.readdirSync(postsDirectory)
  const matterTags = fileNames.map(fileName => {
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    return matter(fileContents).data.tags.map((tag) => tag.toLowerCase()).sort()
  })

  // [['qiita', 'ruby', 'hoge'],
  //  ['qiita','ruby', 'python']]
  
  // convert Two dimentional array to One that
  const allMatterTags = []
  for (var m = 0; m < matterTags.length; m++){
    for (var n = 0; n < matterTags[m].length; n++){
      allMatterTags.push(matterTags[m][n])
    };
  }

  // ['qiita','ruby','hoge','qiita','ruby','python']

  // sort and unique allMatterTags
  const set = new Set(allMatterTags.sort());
  let tags = Array.from(set)
  // 上2行は下1行と同じ
  // const setToArr = [...new Set(allMatterTags.sort())]
  return tags
}

export function getPostsWithTag(args) {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map(fileName => {
    const id = fileName.replace(/\.md$/, '')
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)
    const lowerTags = matterResult.data.tags.map((elm) => elm.toLowerCase()).sort()
    if (lowerTags.includes(args.toLowerCase())) {
      // delete matterResult.data.tags
      return {
        id,
        ...matterResult.data
      }
    }
  })
  // sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.create < b.create) {
      return 1
    } else {
      return -1
    }
  })
}