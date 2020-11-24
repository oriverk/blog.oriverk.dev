import { indexName, searchClient } from './SearchClients'
import { Configure, InstantSearch } from 'react-instantsearch-dom'
import { CustomSearchBox } from './widget/SearchBox'
import { SearchResults } from './widget/SearchResults'

export const AlgoliaSearch: React.FC = () => {
  return (
    <InstantSearch
      indexName={indexName}
      searchClient={searchClient}
    >
      <Configure hitsPerPage={10} />
      <CustomSearchBox />
      <SearchResults />
    </InstantSearch>
  )
}