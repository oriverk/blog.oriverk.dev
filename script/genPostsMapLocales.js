
const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')
const removeMd = require('remove-markdown')
const assert = require('assert').strict
const i18nConfig = require(
  `${path.join(process.cwd(), 'i18n.config.js')}`
  )
const locales = i18nConfig.locales

function getNecessayContents(content) {
  const notAscii = /[^\x00 -\x7F]/gim   // = 全角
  const symbols = /[\d\.\,\?\|\&\:\(\)\*\+\$\{\}\[\]\/\<\>\=%~'";@]/gim
  const codeBlock = /```[a-z]*\n?[\s\S]*?\n?```/gim
  const codeRemoved = content.replace(codeBlock, ' ')
  const removed = removeMd(codeRemoved)
    .replace(notAscii, ' ')
    .replace(symbols, ' ')
    .replace(/\n/gim, ' ')
    .replace(/\s{2,}/gim, ' ')
  
  return removed
}

function getAllPostsData(locale) {
  const docsDir = path.join(process.cwd(), `src/docs/${locale}`)
  const fileNames = fs.readdirSync(docsDir)

  const allPostsData = fileNames.map((name) => {
    const id = name.replace(/\.mdx?$/, '')
    const fullPath = path.join(docsDir, name)
    const contents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(contents)

    const { title, create = '', update = '' } = matterResult.data
    const tags = matterResult.data.tags.map(t => t.toLowerCase()).sort() || ''
    const content = getNecessayContents(matterResult.content)

    return { id, title, create, update, tags, content }
  })
  return allPostsData
}

function getAllPostsLocales(locales) {
  let paths = []
  locales.map((locale) => {
    const data = getAllPostsData(locale)
    data.map((datum) => {
      const {id, create } = datum
      // paths.push({parmas:{...datum}, locale})
      paths.push({ locale, ...datum })
    })
  })
  return paths
}

const sortedData = getAllPostsLocales(locales).sort((a, b) => {
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
      path.join(process.cwd(), 'gen/postsMapLocales.json'),
      JSON.stringify(sortedData, undefined, 2)
      , 'utf-8'
    )
    console.log('succeed in saving data as new postsMap.json')
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