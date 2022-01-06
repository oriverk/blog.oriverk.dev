import { GetStaticProps } from 'next'
import { styled } from 'goober'

import type { FrontMatterType, PostType } from '../types/markdown'
import { getPostsData } from '../utils/markdown/getContentData'
import { Layout } from '../components/layouts'
import { PostCard } from '../components/post-card'
import { H2 } from '../components/markdown/headings'

const PostsWrapper = styled('div')`
  padding: 1rem;
  max-width: var(--max-width);
  width: 100%;
`

interface PostsProps {
  posts: Omit<PostType, 'mdxSource'>[];
  tags: FrontMatterType['tags'];
}

const Page: React.VFC<PostsProps> = (props) => {
  const { posts, tags } = props
  
  return (
    <Layout>
      <PostsWrapper>
        <h1>Posts Index</h1>
        {tags.map(tag => {
          const tagPosts = posts.filter(post => post.frontMatter.tags.includes(tag))
          return (
            <>
              <H2 id={tag}>{tag}</H2>
              {tagPosts.map(({ fileName, frontMatter }) => {
                const { title, create, tags } = frontMatter
                return (
                  <PostCard slug={fileName} title={title} date={create} tags={tags} key={fileName} />
                )
              })}
            </>
          )
        })}
      </PostsWrapper>
    </Layout>
  )
}

export default Page

export const getStaticProps: GetStaticProps = async () => {
  const { posts, allTags } = await getPostsData()

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
      tags: allTags
    }
  }
}
