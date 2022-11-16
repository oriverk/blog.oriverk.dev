import type { GetStaticProps, NextPage } from 'next'

import type { FrontMatterType, PostType } from 'types/markdown'
import { getPostsData } from 'utils/markdown/getContentData'
import { Layout } from 'components/layouts'
import { PostCards } from '@src/components/post-cards'

type H2Props = {
  id: string
  children: React.ReactNode;
}

export const H2: React.FC<H2Props> = (props) => {
  const { id, children } = props

  return (
    <h2 id={id} className="mb-3 text-xl">
      <a href={`#${id}`} className="underline underline-offset-2 decoration-[var(--color-miku)]">
        # {children}
      </a>
    </h2>
  )
}


type Props = {
  posts: PostType[]
  tags: FrontMatterType['tags']
}

const Page: NextPage<Props> = (props) => {
  const { posts, tags } = props

  return (
    <Layout title="tag posts" path="/tag/">
      <h1 className='mb-4 text-2xl 2xl:text-3xl text-center'>Tag Posts Index</h1>
      {tags.map((tag) => {
        const tagPosts = posts.filter((post) => post.frontMatter.tags.includes(tag))
        return (
          <div className="mb-8" key={tag}>
            <H2 id={tag}>{tag}</H2>
            <PostCards posts={tagPosts} />
          </div>
        )
      })}
    </Layout>
  )
}

export default Page

export const getStaticProps: GetStaticProps = async () => {
  const { posts, allTags } = await getPostsData()

  const returnData = posts.map((post) => {
    const { frontMatter, fileName } = post
    const { published, editUrl, ...rest } = frontMatter
    return {
      frontMatter: { ...rest },
      fileName,
    }
  })

  return {
    props: {
      posts: returnData,
      tags: allTags,
    },
  }
}
