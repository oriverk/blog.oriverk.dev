import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { styled } from 'goober'

import type { PostType } from 'types/markdown'
import { getPostsData } from 'utils/markdown/getContentData'
import { Layout } from 'components/layouts'
import { MarkdownContent } from 'components/markdown'
import { PostHero } from 'components/post-hero'

const ContentWrapper = styled('div')`
  max-width: var(--max-width);
  width: 100%;
`

const FlexWrapper = styled('div')`
  display: flex;
`

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
      <ContentWrapper>
        <PostHero title={title} dateString={dateString} tags={tags} editUrl={editUrl} />
        <FlexWrapper>
          <MarkdownContent compiledSource={compiledSource} />
          {/* <TableOfContent headings={headings} /> */}
        </FlexWrapper>
      </ContentWrapper>
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
