const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')
const removeMd = require('remove-markdown')
const assert = require('assert').strict

function getAllFiles(dir){
  return fs.readdirSync(dir).reduce((files, file) => {
    const name = path.join(dir, file);
    const isDirectory = fs.statSync(name).isDirectory();
    return isDirectory ? [...files, ...getAllFiles(name)] : [...files, name];
  },
    []
  )
};

function getNecessayContents(content) {
  const notAscii = /[^\x00-\x7F]/gim // = 全角
  const symbols = /[\.\,\?\|\&\:\(\)\*\+\$\{\}\[\]\/\<\>\=%~'";@]/gim
  // const codeBlock = /```[a-z]*\n?[\s\S]*?\n?```/gim
  // const codeRemoved = content.replace(codeBlock, ' ')
  const removed = removeMd(content)
    .replace(notAscii, ' ')
    .replace(symbols, ' ')
    .replace(/\s{2,}|\n/gim, ' ')

  return removed
}

function getPostsData() {
  const fileNames = getAllFiles('docs');

  const postsData = fileNames.map((name) => {
    const id = name.replace(/\.mdx?$/, '')
    const fullPath = path.join(process.cwd(), name)
    const contents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(contents)

    const { title, create = '', update = '', published = false } = matterResult.data
    const tags = matterResult.data.tags.map((tag) => tag.toLowerCase()).sort() || ''
    const content = getNecessayContents(matterResult.content)

    return { id, title, create, update, tags, content, published }
  })
    .filter(post => post.published)
  
  return postsData.sort((a, b) => {
    if (a.create < b.create) {
      return 1
    } else {
      return -1
    }
  })
}

function genPostsMap() {
  const postsData = getPostsData()
  const postsMapPath = path.join(process.cwd(), 'gen/postsMap.json');
  
  const previousPostsMap = fs.existsSync(postsMapPath)
    ? JSON.parse(fs.readFileSync(postsMapPath, 'utf8'))
    : {};

  try {
    assert.deepStrictEqual(postsData, previousPostsMap, 'These data are different')
  } catch (err) {
    try {
      fs.writeFileSync(
        path.join(process.cwd(), `gen/postsMap.json`),
        JSON.stringify(postsData, undefined, 2),
        'utf-8'
      )
      console.log(`succeed in saving data as new postsMap.json`)
    } catch (err) {
      console.log(`failed to save data as new postsMap.json`)
      console.error(err)
    }
  }
}

genPostsMap()