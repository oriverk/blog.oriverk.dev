import type { SerializeOptions } from 'next-mdx-remote/dist/types'
import { serialize } from 'next-mdx-remote/serialize'
import remarkComment from 'remark-comment'
import rehypeSlug from 'rehype-slug'

export async function serializeMdx(source: string) {
  const serializeOptions: SerializeOptions = {
    mdxOptions: {
      remarkPlugins: [remarkComment],
      rehypePlugins: [rehypeSlug],
    },
    parseFrontmatter: true,
  }

  const serializedResult = await serialize(source, serializeOptions)
  return serializedResult
}
