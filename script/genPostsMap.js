
const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

const postsDirectory = path.join(process.cwd(), 'src/docs')

const fileNames = fs.readdirSync(postsDirectory)
const allPostsData = fileNames.map((fileName) => {
  const id = fileName.replace(/\.md$/, '')
  const fullPath = path.join(postsDirectory, fileName)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const matterResult = matter(fileContents)
  const LowerCaseTags = matterResult.data.tags.map((tag) => (tag.toLowerCase())).sort()

  const title = matterResult.data.title
  const create = matterResult.data.create
  const update = matterResult.data.update || ''
  const tags = LowerCaseTags || ''
  return {
    id,
    title,
    create,
    update,
    tags
  }
})

const sortedPostsData = allPostsData.sort((a, b) => {
  if (a.create < b.create) {
    return 1
  } else {
    return -1
  }
})

try {
  fs.writeFileSync(
    path.join(process.cwd(), 'gen/postsMap.json'),
    JSON.stringify(sortedPostsData, undefined, 2),
    'utf-8'
  )
  console.log('success')
}catch (err) {
  console.error(err)
}

// postPages.json
// {
//   id: '20200526-next-portfolio',
//   title: 'Qiita: Next.jsでポートフォリオサイトを作成した',
//   create: '2020-05-26',
//   update: '2020-06-05',
//   tags: ['qiita', 'react', 'next.js', 'remark.js', 'vercel'],
// },