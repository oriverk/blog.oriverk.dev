import type { SerializeOptions } from 'next-mdx-remote/dist/types'
import { compileMDX } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import remarkComment from 'remark-comment'
import { nodeTypes } from '@mdx-js/mdx'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'

import type { FrontMatterType } from '@src/types/markdown'
import { MDXComponents } from '@src/components/markdown/mdx-components'
import { rehypeAnchor } from './rehypeAnchor'
import { rehypeFigure } from './rehypeFigure'

export async function serializeMdx(source: string) {
  const serializeOptions: SerializeOptions = {
    mdxOptions: {
      remarkPlugins: [remarkComment, remarkGfm],
      rehypePlugins: [[rehypeRaw, { passThrough: nodeTypes }], rehypeSlug, rehypeAnchor, rehypeFigure],
    },
    parseFrontmatter: true,
  }

  const serializedResult = await compileMDX<FrontMatterType>({
    source,
    options: serializeOptions,
    components: MDXComponents,
  })
  return serializedResult
}
