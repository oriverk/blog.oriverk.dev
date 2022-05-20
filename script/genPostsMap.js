const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')
const removeMd = require('remove-markdown')
const assert = require('assert').strict

require('dotenv').config({ path: '.env.local' })

const POSTS_PATH = path.join(process.cwd(), 'docs')

/**
 * @param dir ex: /home/oriverk/Codes/oriverk/blog/docs
 * @returns [/home/oriverk/Codes/oriverk/blog/docs/2022/memo.md]
 */
function getAllFiles(dir) {
  return fs.readdirSync(dir).reduce((files, file) => {
    const name = path.join(dir, file);
    const isDirectory = fs.statSync(name).isDirectory();
    return isDirectory ? [...files, ...getAllFiles(name)] : [...files, name];
  },
    []
  )
};

function getNecessayContents(content) {
  // const notAscii = /[^\x00-\x7F]/gim // = 全角
  const codeBlock = /^`{3}[a-z]*\n?[\s\S]*?\n?`{3}$/gim
  const removed = removeMd(content.replace(codeBlock, ' '))
    // .replace(codeBlock, ' ')
    .replace(/[\d-\|\.~\/=>"_\n:：\(\)（）　]/g, ' ')
    .replace(/\s[a-z]{0,2}\s/gi, ' ')
    .replace(/ {2,}/g, '')
    .trim()

  return removed
}

/**
 * @param localFilePath
 * ex: /home/oriverk/Codes/oriverk/blog/docs/2022/memo.md
 * @returns
 */
async function getPostData(localFilePath) {
  const source = fs.readFileSync(localFilePath).toString()
  const { data, content } = matter(source)
  const { title, create = '', update = '', published = false, tags } = data;
  
  let regexp = new RegExp(`${POSTS_PATH}\/|.mdx?$`, 'g')
  // ex: 2022/20220505-ubuntu2204
  const id = localFilePath.replace(regexp, '')

  return {
    id,
    title,
    create,
    update,
    tags: tags.map(tag => tag.toLowerCase()).sort() || '',
    content: getNecessayContents(content),
    published
  }
}

async function getPostsDataX() {
  const postFileNames = getAllFiles(POSTS_PATH)
    .filter((path) => /\.mdx?$/.test(path))

  const promise = postFileNames
    .map(async (fileName) => getPostData(fileName))

  const posts = (await Promise.all(promise))
    .filter(({ create }) => create)
    .filter(({ published }) => published)
    .sort((post1, post2) => (post1.create > post2.create ? -1 : 1))
  
  return posts
}

async function genPostsMap() {
  const postsData = await getPostsDataX()
  const postsMapPath = path.join(process.cwd(), 'script/postsMap.json');
  
  const previousPostsMap = fs.existsSync(postsMapPath)
    ? JSON.parse(fs.readFileSync(postsMapPath, 'utf8'))
    : {};

  try {
    assert.deepStrictEqual(postsData, previousPostsMap, 'These data are different')
  } catch (err) {
    try {
      fs.writeFileSync(
        path.join(process.cwd(), `script/postsMap.json`),
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