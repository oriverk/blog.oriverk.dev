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
}

type PostType = {
  fileName: string
  frontMatter: FrontMatterType
  compiledSource: string;
  // headings: HeadingType[]
}

export type { HeadingType, FrontMatterType, PostType }
