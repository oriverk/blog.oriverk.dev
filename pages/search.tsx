import type { NextPage } from 'next'
import { styled } from 'goober'

import { Layout } from 'components/layouts'
import { AlgoliaSearch } from 'components/search'

const PostsWrapper = styled('div')`
  padding: 1rem;
  max-width: var(--max-width);
  width: 100%;
`

const H1 = styled('h1')`
  text-align: center;
`

const Page: NextPage = () => {
  return (
    <Layout title="search posts" path="/search/">
      <PostsWrapper>
        <H1>Search</H1>
        <AlgoliaSearch />
      </PostsWrapper>
    </Layout>
  )
}

export default Page
