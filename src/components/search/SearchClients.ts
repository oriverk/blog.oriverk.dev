import algoliasearch from 'algoliasearch/lite'
import blogConfig from '../../../blog.config'

export const indexName = blogConfig.algolia.indexName

const algoliaClient = algoliasearch(
  blogConfig.algolia.appId,
  blogConfig.algolia.searchOnlyApiKey
)

export const searchClient = {
  search(requests) {
    if (requests.every(({ params }) => !params.query)) {
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
  },
}