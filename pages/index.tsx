import type { GetStaticProps, NextPage } from 'next'

import type { FrontMatterType, PostType } from 'types/markdown'
import { getPostsData } from 'utils/markdown/getContentData'
import { Layout } from 'components/layouts'
import { PostCards } from '@src/components/post-cards'

type Props = {
  posts: {
    fileName: PostType["fileName"];
    frontMatter: Pick<FrontMatterType, "title" | "create" | "update" | "tags">
  }[]
}

const Page: NextPage<Props> = (props) => {
  const { posts } = props

  return (
    <Layout title="home" path="/">
      <h1 className="mb-4 text-2xl 2xl:text-3xl text-center">Posts Index</h1>
      <PostCards posts={posts} />
    </Layout>
  )
}

export default Page

export const getStaticProps: GetStaticProps = async () => {
  const { posts } = await getPostsData()

  const returnData = posts.map((post) => {
    const { frontMatter, fileName } = post
    const { published, editUrl, ...rest } = frontMatter

    return {
      frontMatter: rest,
      fileName,
    }
  })

  return {
    props: {
      posts: returnData,
    },
  }
}
