import type { MultipleQueriesQuery, MultipleQueriesResponse } from '@algolia/client-search'
import type { SearchClient } from 'algoliasearch/lite'
import algoliasearch from 'algoliasearch/lite'

const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || ''
const searchKey = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY || ''

const algoliaClient = algoliasearch(appId, searchKey)

export const searchClient: SearchClient = {
  ...algoliaClient,
  search: <SearchResponse>(requests: Readonly<MultipleQueriesQuery[]>) => {
    if (requests.every(({ params }) => !params?.query)) {
      return Promise.resolve<MultipleQueriesResponse<SearchResponse>>({
        results: requests.map(() => ({
          hits: [],
          nbHits: 0,
          nbPages: 0,
          page: 0,
          processingTimeMS: 0,
          hitsPerPage: 0,
          exhaustiveNbHits: false,
          query: '',
          params: '',
        })),
      })
    }

    return algoliaClient.search(requests)
  },
}
