import algoliasearch from 'algoliasearch/lite'

const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || '';
const searchKey = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY || '';

const algoliaClient = algoliasearch(
  appId,
  searchKey
)

export const searchClient = {
  search(requests: any) {
    if (requests.every(({ params }: { params: any }) => !params.query)) {
      return Promise.resolve({
        results: requests.map(() => ({
          hits: [],
          nbHits: 0,
          nbPages: 0,
          processingTimeMS: 0,
        })),
      })
    }
    return algoliaClient.search(requests);
  }
}