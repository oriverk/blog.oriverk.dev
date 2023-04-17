type HeadingType = {
  level: 'h2' | 'h3'
  text: string
  id: string
}

type FrontMatterType = {
  title: string
  create: string
  update: string
  description: string
  tags: string[]
  image?: string
  published?: boolean
  editUrl: string
  noindex?: boolean
}

type PostType = {
  fileName: string
  frontMatter: FrontMatterType
  compiledSource: string
  // headings: HeadingType[]
}

type PostCardType = {
  fileName: PostType['fileName']
  frontmatter: Pick<FrontMatterType, 'title' | 'create' | 'update' | 'tags'>
}

export type { HeadingType, FrontMatterType, PostType, PostCardType }
