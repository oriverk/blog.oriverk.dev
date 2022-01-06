import { useRouter } from 'next/router'
import { Configure, InstantSearch } from 'react-instantsearch-dom'
import { styled } from 'goober'

import { Layout } from 'components/layouts'
import { searchClient, CustomSearchBox, CustomStateResults, CustomHits } from 'components/search'

const PostsWrapper = styled('div')`
  padding: 1rem;
  max-width: var(--max-width);
  width: 100%;
`

const algoliaIndex = process.env.NEXT_PUBLIC_ALGOLIA_INDEX || ''

const Component: React.VFC = () => {
  const router = useRouter()
  const qs = router.query.q as string
  const urlToSearchState = decodeURI(qs || '')

  return (
    <Layout>
      <PostsWrapper>
        <h1>Search</h1>
        <InstantSearch indexName={algoliaIndex} searchClient={searchClient}>
          <Configure hitsPerPage={10} />
          <CustomSearchBox defaultRefinement={urlToSearchState} />
          <CustomStateResults />
          <CustomHits />
        </InstantSearch>
      </PostsWrapper>
    </Layout>
  )
}

export default Component
