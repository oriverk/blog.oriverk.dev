import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), './src/pages/posts')

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
    
    // bring data together with id
    return {
      id,
      ...matterResult.data
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