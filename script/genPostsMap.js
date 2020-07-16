
const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')
const removeMd = require('remove-markdown')
const assert = require('assert').strict

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
  const content = removeMd(matterResult.content).replace(/\n/gim, '').replace(/\s{2,}/gim , '')
  return {
    id,
    title,
    create,
    update,
    tags,
    content
  }
})

const sortedData = allPostsData.sort((a, b) => {
  if (a.create < b.create) {
    return 1
  } else {
    return -1
  }
})

const postsMap = JSON.parse(fs.readFileSync(
  path.join(process.cwd(), 'gen/postsMap.json'), 'utf8'
))

try {
  assert.deepStrictEqual(sortedData, postsMap,'these data are different')
} catch (err) {
  try {
    fs.writeFileSync(
      path.join(process.cwd(), 'gen/postsMap.json'),
      JSON.stringify(sortedData, undefined, 2)
      , 'utf-8'
    )
    console.log('suceed in saving data as new postsMap.json')
  } catch (err) {
    console.error(err)
    console.log('failed to save data as new postsMap.json')
  }
}

// postPages.json
// {
//   id: '20200526-next-portfolio',
//   title: 'Qiita: Next.jsでポートフォリオサイトを作成した',
//   create: '2020-05-26',
//   update: '2020-06-05',
//   tags: ['qiita', 'react', 'next.js', 'remark.js', 'vercel'],
// },


// const assertion = assert.deepStrictEqual(test1, test2,'hogehoge')
// https://nodejs.org/api/assert.html#assert_assert_deepstrictequal_actual_expected_message
// if actual and expected is same, return false
// and if is different, return 
// assert.js: 103
// throw new AssertionError(obj);
//   ^

//   AssertionError[ERR_ASSERTION]: Expected values to be strictly deep - equal:
// + actual - expected ...Lines skipped

// [
//   {
// + content: 'from Qita: 宮崎県COVID-19対策サイトを見つけ、出身者として何かしたいと思ったから、した。出身の宮崎県用の対策サイトが出来、同時に感染者数が3人に増えていたこと

// ...
// generatedMessage: true,
//   code: 'ERR_ASSERTION',
//     actual: [
//       {