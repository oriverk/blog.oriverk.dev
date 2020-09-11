import React, { Component } from 'react'
import { indexName, searchClient } from './SearchClients'
import { Configure, InstantSearch } from 'react-instantsearch-dom'
import { CustomSearchBox } from './Connector'
import { SearchResults } from './SearchResults'

export class AlgoliaSearch extends Component {
  render() {
    return (
      <React.Fragment>
        <InstantSearch
          indexName={indexName}
          searchClient={searchClient}
        >
          <Configure hitsPerPage={10} />
          <CustomSearchBox />
          <SearchResults />
        </InstantSearch>
      </React.Fragment>
    )
  }
}