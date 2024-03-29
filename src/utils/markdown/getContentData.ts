import * as fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter';
import urlJoin from 'url-join';

import { serializeMdx } from './serializeMdx'
import { FrontMatterType } from '@src/types/markdown';

const blogPath = process.env.NEXT_PUBLIC_BLOG_PATH || "http://localhost:3000";
export const POSTS_PATH = join(process.cwd(), 'docs')
const isDev = process.env.NODE_ENV === 'development'

/**
 * @param localFilePath
 * ex: /home/oriverk/Codes/oriverk/blog/docs/2022/memo.md
 * @returns
 */
export async function getPostContent(localFilePath: string) {
  const path = localFilePath
  const source = fs.readFileSync(path).toString()
  const { content, frontmatter } = await serializeMdx(source)

  let regexp = new RegExp(`${POSTS_PATH}\/|.mdx?$`, 'g')
  // 2022/20220505-ubuntu2204
  const filePath = path.replace(regexp, '')

  return {
    fileName: filePath,
    frontmatter,
    content,
    // headings,
  }
}

export function getPostFrontmatter(path: string) {
  let regexp = new RegExp(`${POSTS_PATH}\/|.mdx?$`, 'g')
  const url = urlJoin(blogPath, 'entry', path.replace(regexp, ''), '/');
  
  const source = fs.readFileSync(path).toString();
  const { data } = matter(source) as unknown as { data: FrontMatterType };
  return {
    ...data,
    url
  };
}

export function getPostsFrontmatter() {
  const paths = getAllFiles(POSTS_PATH).filter((path) => /\.mdx?$/.test(path));
  const result = paths.map((path) => getPostFrontmatter(path))
    .filter((frontmatter) => (isDev || frontmatter.published))
    .sort((post1, post2) => (post1.create > post2.create ? -1 : 1))
  return result;
}

export async function getPost(path: string) {
  const { posts } = await getPosts()
  const post = posts.find((post) => post.fileName === path)
  return post
}

export async function getPosts() {
  const postFileNames = getAllFiles(POSTS_PATH).filter((path) => /\.mdx?$/.test(path))

  const promise = postFileNames.map(async (fileName) => getPostContent(fileName))
  const posts = (await Promise.all(promise))
    .filter(({ frontmatter }) => (isDev || frontmatter.published))
    .sort((post1, post2) => (post1.frontmatter.create > post2.frontmatter.create ? -1 : 1))

  const tags = posts.map(({ frontmatter }) => frontmatter.tags).flat()
  const allTags = Array.from(new Set(tags)).sort()

  return { posts, allTags }
}

/**
 * @param dir ex: /home/oriverk/Codes/oriverk/blog/docs
 * @returns [/home/oriverk/Codes/oriverk/blog/docs/2022/memo.md]
 */
function getAllFiles(dir: string) {
  return fs.readdirSync(dir).reduce((files: string[], file): string[] => {
    const name = join(dir, file)
    const isDirectory = fs.statSync(name).isDirectory()
    return isDirectory ? [...files, ...getAllFiles(name)] : [...files, name]
  }, [])
}
