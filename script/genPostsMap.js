const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')
const removeMd = require('remove-markdown')
const assert = require('assert').strict

const docsDirectory = path.join(process.cwd(), 'src/docs/ja')

const fileNames = fs.readdirSync(docsDirectory)
const allPostsData = fileNames.map((name) => {
  const id = name.replace(/\.mdx?$/, '')
  const fullPath = path.join(docsDirectory, name)
  const contents = fs.readFileSync(fullPath, 'utf8')
  const matterResult = matter(contents)

  const { title, create = '', update = '' } = matterResult.data
  const tags = matterResult.data.tags.map(t => t.toLowerCase()).sort() || ''

  const notAscii = /[^\x00 -\x7F]/gim   // = 全角
  const symbols = /[\d\.\,\?\|\&\:\(\)\*\+\$\{\}\[\]\/\<\>\=%~'";@]/gim
  const codeBlock = /```[a-z]*\n?[\s\S]*?\n?```/gim
  const codeRemoved = matterResult.content.replace(codeBlock, ' ')
  const content = removeMd(codeRemoved)
    .replace(notAscii, ' ')
    .replace(symbols, ' ')
    .replace(/\n/gim, ' ')
    .replace(/\s{2,}/gim, ' ')
  
  return { id, title, create, update, tags, content }
})

console.log(typeof allPostsData)

// const sortedData = allPostsData.sort((a, b) => {
//   if (a.create < b.create) {
//     return 1
//   } else {
//     return -1
//   }
// })

// const postsMap = JSON.parse(fs.readFileSync(
//   path.join(process.cwd(), 'gen/postsMap.json'), 'utf8'
// ))

// try {
//   assert.deepStrictEqual(sortedData, postsMap, 'these data are different')
// } catch (err) {
//   try {
//     fs.writeFileSync(
//       path.join(process.cwd(), 'gen/postsMap.json'),
//       JSON.stringify(sortedData, undefined, 2)
//       , 'utf-8'
//     )
//     console.log('suceed in saving data as new postsMap.json')
//   } catch (err) {
//     console.error(err)
//     console.log('failed to save data as new postsMap.json')
//   }
// }