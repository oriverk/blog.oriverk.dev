import type { SerializeOptions } from 'next-mdx-remote/dist/types'
import { serialize } from 'next-mdx-remote/serialize'
import matter from 'gray-matter'
import rehypeSlug from 'rehype-slug'

export async function serializeMdx(source: string) {
  const { content, data } = matter(source)

  const serializeOptions: SerializeOptions = {
    scope: data,
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [rehypeSlug],
    },
    target: 'esnext',
  }

  const mdxSource = await serialize(content, serializeOptions)

  return {
    frontMatter: data,
    mdxSource,
  }
}
