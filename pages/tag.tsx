import type { GetStaticProps, NextPage } from 'next'
import { styled } from 'goober'

import type { FrontMatterType, PostType } from 'types/markdown'
import { getPostsData } from 'utils/markdown/getContentData'
import { Layout } from 'components/layouts'
import { PostCard } from 'components/post-card'
import { H2 } from 'components/markdown/headings'

const PostsWrapper = styled('div')`
  padding: 1rem;
  max-width: var(--max-width);
  width: 100%;
`

const H1 = styled('h1')`
  text-align: center;
`

type Props = {
  posts: PostType[]
  tags: FrontMatterType['tags']
}

const Page: NextPage<Props> = (props) => {
  const { posts, tags } = props

  return (
    <Layout title="tag posts" path="/tag/">
      <PostsWrapper>
        <H1>Tag Posts Index</H1>
        {tags.map((tag) => {
          const tagPosts = posts.filter((post) => post.frontMatter.tags.includes(tag))
          return (
            <>
              <H2 id={tag}>{tag}</H2>
              {tagPosts.map(({ fileName, frontMatter }) => {
                const { title, create, tags } = frontMatter
                return <PostCard slug={fileName} title={title} date={create} tags={tags} key={fileName} />
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
