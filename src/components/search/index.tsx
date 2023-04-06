'use client';

import { useRef } from 'react'
import type { UseSearchBoxProps } from 'react-instantsearch-hooks-web'
import { InstantSearch, Configure } from 'react-instantsearch-hooks-web'
import { history } from 'instantsearch.js/es/lib/routers'

import { searchClient } from './search-client'
import { CustomSearchBox } from './search-box'
import { CustomSearchResults } from './search-results'
import { CustomHits } from './hits'

const algoliaIndex = process.env.NEXT_PUBLIC_ALGOLIA_INDEX || ''

// [Sync your URLs with React InstantSearch Hooks | Algolia]
// (https://www.algolia.com/doc/guides/building-search-ui/going-further/routing-urls/react-hooks/#basic-urls)
const routing = {
  router: history(),
  stateMapping: {
    stateToRoute(uiState: any) {
      const indexUiState = uiState[algoliaIndex]
      return {
        q: indexUiState.query,
      }
    },
    routeToState(routeState: any) {
      return {
        [algoliaIndex]: {
          query: routeState.q,
        },
      }
    },
  },
}

export const AlgoliaSearch: React.FC = () => {
  const timerId = useRef<ReturnType<typeof setTimeout>>()
  const queryHook: UseSearchBoxProps['queryHook'] = (query, search) => {
    if (timerId.current) {
      clearTimeout(timerId.current)
    }
    timerId.current = setTimeout(() => search(query), 1000)
  }

  return (
    <InstantSearch indexName={algoliaIndex} searchClient={searchClient} routing={routing}>
      <Configure hitsPerPage={10} analytics={false} />
      <CustomSearchBox queryHook={queryHook} placeholder="Search with English (1000ms delay)" />
      <CustomSearchResults />
      <CustomHits />
    </InstantSearch>
  )
}
