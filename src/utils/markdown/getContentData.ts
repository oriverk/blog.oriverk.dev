import * as fs from 'fs'
import * as path from 'path'
import urlJoin from 'url-join'

import type { FrontMatterType } from 'types/markdown'
import { serializeMdx } from './serializeMdx'
import { getTableOfContents } from './getTableOfContents'

const POSTS_PATH = path.join(process.cwd(), 'docs')
// https://github.com/oriverk/blog.oriverk.dev
const GithubPath = process.env.NEXT_PUBLIC_GITHUB_PATH
const GithubDocPath = GithubPath + '/blob/main/docs/'
const isDev = process.env.NODE_ENV === 'development'

/**
 * @param localFilePath
 * ex: /home/oriverk/Codes/oriverk/blog/docs/2022/memo.md
 * @returns
 */
async function getPostData(localFilePath: string) {
  const source = fs.readFileSync(localFilePath).toString()
  const { frontMatter, mdxSource } = await serializeMdx(source)
  const { title, create, update, tags = [], published = true } = frontMatter as FrontMatterType
  const headings = source ? getTableOfContents(source) : []

  let regexp = new RegExp(`${POSTS_PATH}\/|.mdx?$`, 'g')
  // 2022/20220505-ubuntu2204
  const filePath = localFilePath.replace(regexp, '')
  // .md | .mdx
  const ext = path.extname(localFilePath)
  const editUrl = urlJoin(GithubDocPath, `${filePath}${ext}`)

  return {
    fileName: filePath,
    frontMatter: {
      title: title || 'title is missing.',
      create: create,
      tags: tags || [],
      headings,
      update: update || create,
      published,
      editUrl,
    },
    mdxSource,
  }
}

export async function getPostsData() {
  const postFileNames = getAllFiles(POSTS_PATH)
    .filter((path) => /\.mdx?$/.test(path))

  const promise = postFileNames.map(async (fileName) => getPostData(fileName))
  const posts = (await Promise.all(promise))
    .filter(({ frontMatter }) => frontMatter.create)
    .filter(({ frontMatter }) => (isDev ? true : frontMatter.published))
    .sort((post1, post2) => (post1.frontMatter.create! > post2.frontMatter.create! ? -1 : 1))

  const tags = posts.map((post) => post.frontMatter.tags).flat()
  const newSetTags = Array.from(new Set(tags)).sort()

  return { posts, allTags: newSetTags }
}

/**
 * @param dir ex: /home/oriverk/Codes/oriverk/blog/docs
 * @returns [/home/oriverk/Codes/oriverk/blog/docs/2022/memo.md]
 */
function getAllFiles(dir: string) {
  return fs.readdirSync(dir).reduce((files: string[], file): string[] => {
    const name = path.join(dir, file)
    const isDirectory = fs.statSync(name).isDirectory()
    return isDirectory ? [...files, ...getAllFiles(name)] : [...files, name]
  }, [])
}
