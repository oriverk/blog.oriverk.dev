import { GetStaticPaths, GetStaticProps } from 'next'
import { styled } from 'goober'

import type { PostType } from '@src/types/markdown'
import { getPostsData } from '../../src/utils/markdown/getContentData'
import { Layout } from "../../src/components/layouts"
import { MarkdownContent } from '../../src/components/markdown'
import { DateFormatter } from '../../src/components/date-formatter'

const ContentWrapper = styled('div')`
  max-width: var(--max-width);
  width: 100%;
`

const FlexWrapper = styled('div')`
  display: flex;
`

const Page: React.VFC<Omit<PostType, "fileName">> = (props) => {
  const { mdxSource, frontMatter } = props
  const { title, create, update, tags, headings, editUrl } = frontMatter

  return (
    <Layout>
      <ContentWrapper>
        <h1>{title}</h1>
        <p>
          <DateFormatter dateString={create || update} />
          {' / '}
          {tags.map((tag) => (
            <>
              <a href={`/tag/#${tag}`} key={tag}>
                {'#' + tag}
              </a>
              {' '}
            </>
          ))}
        </p>
        <p>
          <a href={editUrl} target="_blank" rel="noopener noreferrer">
            GitHub で編集する
          </a>
        </p>
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
  const paths = posts.map(post => {
    return {
      params: {
        slug: post.fileName
      }
    }
  })

  return {
    paths,
    fallback: false
  } 
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as Record<string, string | string[]>
  const { posts } = await getPostsData()
  const post = posts.find(post => post.fileName === slug)

  if (!post) {
    throw new Error(`No content found for ${slug}`)
  }

  const { frontMatter, mdxSource } = post

  return {
    props: {
      mdxSource, frontMatter
    }
  }
}