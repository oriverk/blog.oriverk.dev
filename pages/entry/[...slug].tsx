import { GetStaticPaths, GetStaticProps } from 'next'
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

const Page: React.FC<PostType> = (props) => {
  const { fileName, mdxSource, frontMatter } = props
  const { title, create, update, tags, headings, editUrl } = frontMatter
  const dateString = update || create

  return (
    <Layout title={title} path={`/entry/${fileName}/`}>
      <ContentWrapper>
        <PostHero title={title} dateString={dateString} tags={tags} editUrl={editUrl} />
        <FlexWrapper>
          <MarkdownContent mdxSource={mdxSource} />
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

  const { fileName, frontMatter, mdxSource } = post!

  return {
    props: {
      fileName,
      mdxSource,
      frontMatter,
    },
  }
}
