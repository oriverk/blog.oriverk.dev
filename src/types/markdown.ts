// import type { MDXRemoteSerializeResult } from 'next-mdx-remote'

interface HeadingType {
  level: 'h2' | 'h3'
  text: string
  id: string
}

interface FrontMatterType {
  title: string
  create: string
  update: string
  description: string
  tags: string[]
  image?: string
  published?: boolean
  editUrl: string
}

interface PostType {
  fileName: string
  frontMatter: FrontMatterType
  compiledSource: string;
  // headings: HeadingType[]
}

export type { HeadingType, FrontMatterType, PostType }
