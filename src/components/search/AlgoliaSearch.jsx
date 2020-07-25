import React, { Component } from 'react'
import Router from 'next/router'
import qs from 'qs'
import algoliasearch from 'algoliasearch/lite'
import { Configure, InstantSearch, } from 'react-instantsearch-dom'
import { findResultsState } from 'react-instantsearch-dom/server'
import { SearchResults } from './SearchResults'
import { CustomSearchBox } from './Connector'
import search from '../../../blog.config'

const indexName = search.algolia.indexName
const searchClient = algoliasearch(
  search.algolia.appId,
  search.algolia.searchOnlyApiKey
)

const updateAfter = 700

const searchStateToUrl = (searchState) =>
  searchState ? `${window.location.pathname}?${qs.stringify(searchState)}` : ''

export class AlgoliaSearch extends Component {
  constructor(props) {
    super(props)
    this.onSearchStateChange = this.onSearchStateChange.bind(this)
  }

  onSearchStateChange = (searchState) => {
    clearTimeout(this.debouncedSetState)
    this.debouncedSetState = setTimeout(() => {
      const href = searchStateToUrl(searchState)
      Router.push(href, href, {
        shallow: true,
      })
    }, updateAfter)
    this.setState({ searchState })
  }

  async componentDidMount() {
    this.setState({
      searchState: qs.parse(window.location.search.slice(1)),
      resultsState: await findResultsState(InstantSearch, { indexName, searchClient }),
    })
  }

  UNSAFE_componentWillReceiveProps() {
    this.setState({ searchState: qs.parse(window.location.search.slice(1)) })
  }

  render() {
    return (
      <React.Fragment>
        {this.state && this.state.resultsState && this.state.searchState && (
          <InstantSearch
            indexName={indexName}
            searchClient={searchClient}
            resultsState={this.state.resultsState}
            onSearchStateChange={this.onSearchStateChange}
            searchState={this.state.searchState}
          >
            <Configure hitsPerPage={5} />
            <SearchResults />
            <CustomSearchBox />
          </InstantSearch>
        )}
      </React.Fragment>
    )
  }
}
