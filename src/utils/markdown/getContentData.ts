import * as fs from 'fs'
import * as path from 'path'
import format from 'date-fns/format'

import type { FrontMatterType } from '../../types/markdown'
import { serializeMdx } from './serializeMdx'
import { getTableOfContents } from './getTableOfContents'

const POSTS_PATH = path.join(process.cwd(), 'docs')
const GithubPath = process.env.NEXT_PUBLIC_GITHUB_PATH
const GithubDocPath = GithubPath + '/blob/main/docs/'

async function getPostData(fileName: string) {
  const filePath = path.join(POSTS_PATH, fileName)
  const source = fs.readFileSync(filePath).toString()
  const { frontMatter, mdxSource } = await serializeMdx(source)
  const {
    title,
    create,
    update,
    tags = [],
    published = true
  } = frontMatter as Partial<FrontMatterType>

  const headings = source ? getTableOfContents(source) : []
  const lastCommit = format(new Date(), 'yyyy-MM-dd')

  return {
    fileName: fileName.replace(/\.mdx?$/, ''),
    frontMatter: {
      title: title || 'title is missing.',
      create: create || format(new Date(), 'yyyy-MM-dd'),
      tags: tags || [],
      headings,
      update: update || lastCommit,
      published,
      editUrl: GithubDocPath + fileName
    },
    mdxSource,
  }
}

export async function getPostsData() {
  const postFileNames = fs.readdirSync(POSTS_PATH)
    .filter((path) => /\.mdx?$/.test(path))
  
  const promise = postFileNames.map(async (fileName) => getPostData(fileName));
  const posts = (await Promise.all(promise))
    .filter((post) => post.frontMatter.published)
    .sort((post1, post2) => (post1.frontMatter.create > post2.frontMatter.create ? -1 : 1))
  
  const tags = posts
    .filter(post => post.frontMatter.published)
    .map((post) => post.frontMatter.tags).flat()
  const newSetTags = Array.from(new Set(tags)).sort()
  
  return { posts, allTags: newSetTags }
}
