import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import type { PostType } from '@src/types/markdown'
import { getPostsData } from '@src/utils/markdown/getContentData'
import { Layout } from '@src/components/layouts'
import { MarkdownContent } from '@src/components/markdown'
import { PostHero } from '@src/components/post-hero'

type Props = {
  post: PostType
}

const Page: NextPage<Props> = (props) => {
  const { post } = props
  const { fileName, frontMatter, compiledSource } = post
  const { title, create, update, tags, editUrl } = frontMatter
  const dateString = update || create

  return (
    <Layout title={title} path={`/entry/${fileName}/`}>
      <PostHero title={title} dateString={dateString} tags={tags} editUrl={editUrl} />
      <div className="flex">
        <MarkdownContent compiledSource={compiledSource} />
        {/* <TableOfContent headings={headings} /> */}
      </div>
    </Layout>
  )
}

export default Page

export const getStaticPaths: GetStaticPaths = async () => {
  const { posts } = await getPostsData()
  const paths = posts.map((post) => {
    return {
      params: {
        slug: post.fileName.split('/'),
      },
    }
  })

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as Record<string, string[]>
  const { posts } = await getPostsData()
  const post = posts.find((post) => post.fileName === slug.join('/'))

  if (!post) {
    throw new Error(`No content found for ${slug}`)
  }

  return {
    props: {
      post,
    },
  }
}
