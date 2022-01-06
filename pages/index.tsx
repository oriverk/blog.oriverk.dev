import { GetStaticProps } from 'next'
import { styled } from 'goober'

import type { PostType } from '../src/types/markdown'
import { getPostsData } from '../src/utils/markdown/getContentData'
import { Layout } from '../src/components/layouts'
import { PostCard } from '../src/components/post-card'

const PostsWrapper = styled('div')`
  padding: 1rem;
  max-width: var(--max-width);
  width: 100%;
`

interface PostsProps {
  posts: Omit<PostType, 'mdxSource'>[]
}

const Page: React.VFC<PostsProps> = (props) => {
  const { posts } = props
  
  return (
    <Layout>
      <PostsWrapper>
        <h1>Posts Index</h1>
        {posts.map(({ fileName, frontMatter }) => {
          const { title, create, tags } = frontMatter
          return (
            <PostCard slug={fileName} title={title} date={create} tags={tags} key={fileName} />
          )
        })}
      </PostsWrapper>
    </Layout>
  )
}

export default Page

export const getStaticProps: GetStaticProps = async () => {
  const { posts } = await getPostsData()

  const returnData = posts.map(post => {
    const { frontMatter, fileName } = post
    const { headings, published, editUrl, ...rest } = frontMatter
    return {
      frontMatter: { ...rest },
      fileName
    }
  })

  return {
    props: {
      posts: returnData,
    }
  }
}
