import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), './src/docs')

export function getSortedPostsData() {
  // get files name under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map(fileName => {
    // remove '.md' from fileName to get id
    const id = fileName.replace(/\.md$/, '')
    // read markdonw-file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    // use gray-matter to analyze meta data from post
    const matterResult = matter(fileContents)
    const LowerCaseTags = matterResult.data.tags.map((tag) => (tag.toLowerCase()))
    
    // bring data together with id
    return {
      id,
      LowerCaseTags,
      ...matterResult.data,
    }
  })
  // sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
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
  // ↑async is for remark. if not use remark, remove async
  
  // fetch data to render post with id and return post data
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  // use gray-matter to analyze post meta data
  const matterResult = matter(fileContents)
  const LowerCaseTags = matterResult.data.tags.map((tag) => (tag.toLowerCase()))
  // const mdx = require('@mdx-js/mdx')
  const highlight = require('remark-highlight.js')
  
  //use remark to convert markdonw to html string
  const processedContent = await remark()
  .use(highlight)
  .use(html)
  .process(matterResult.content)
  
  const contentHtml = processedContent.toString()
  
  return {
    id,
    contentHtml,
    LowerCaseTags,
    ...matterResult.data,
  }
}
      
export function getPostsTags() {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map(fileName => {
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterTags = matter(fileContents).data.tags
    const matterTagsLower = matterTags.map((tag) => tag.toLowerCase())
    return matterTagsLower
  })

  // [['qiita', 'ruby', 'hoge'],
  //  ['qiita','ruby', 'python']]
  
  // convert Two dimentional array to One that
  const allPostsTags = []
  for (var m = 0; m < allPostsData.length; m++){
    for (var n = 0; n < allPostsData[m].length; n++){
      allPostsTags.push(allPostsData[m][n])
    };
  }

  // ['qiita','ruby','hoge','qiita','ruby','python']

  // sort and unique allPostsTags
  const set = new Set(allPostsTags.sort());
  let postsTags = Array.from(set)
  // 上2行は下1行と同じ
  // const setToArr = [...new Set(allPostsTags.sort())]
  return postsTags
}

export function getPostsWithTag(args) {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map(fileName => {
    const id = fileName.replace(/\.md$/, '')
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)
    const lowerTags = matterResult.data.tags.map((elm) => elm.toLowerCase())
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
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}