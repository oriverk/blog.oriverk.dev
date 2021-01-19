import { useRouter } from 'next/router'
import css from 'styled-jsx/css';

import { Layout } from '../components/Layout';
import { CustomHead } from '../components/common/Head'
import { useTranslation } from '../hooks/translation'

import { Configure, InstantSearch } from 'react-instantsearch-dom'
import { indexName, searchClient } from '../components/search/SearchClients'
import { CustomSearchBox } from '../components/search/SearchBox'
import { CustomStateResults } from '../components/search/StateResults'
import { CustomPoweredBy } from '../components/search/PoweredBy'
import { CustomHits } from '../components/search/Hits'

const style = css`
h1 {
  text-align: center;
}

.content {
  padding: 3%;
  height: 100%;
}

.search {
  margin: 0 auto;
  width: 100%;
  max-width: 1000px;
}
`

const Component: React.FC = () => {
  const router = useRouter()
  const { locale, asPath } = router
  const qs = router.query.q as string
  const urlToSearchState = decodeURI(qs || '')

  const searchTitle = useTranslation('SEARCH_TITLE')
  const searchResultsFor = useTranslation('SEARCH_RESULTS_FOR', { searchState: urlToSearchState })

  return (
    <Layout>
      <CustomHead
        pageUrl={`/${locale}${asPath}`}
        pageTitle={searchTitle}
        pageDescription={qs ? searchResultsFor : searchTitle} />
      <article className='content'>
        <h1>{searchTitle}</h1>
        <div className='search'>
          <InstantSearch
            indexName={indexName}
            searchClient={searchClient}
          >
            <Configure hitsPerPage={10} />
            <CustomSearchBox
              defaultRefinement={urlToSearchState}
            />
            <div className='searchResults'>
              <CustomPoweredBy />
              <CustomStateResults />
              <CustomHits />
            </div>
          </InstantSearch>
        </div>
      </article>
      <style jsx>{style}</style>
    </Layout>
  )
}

export default Component