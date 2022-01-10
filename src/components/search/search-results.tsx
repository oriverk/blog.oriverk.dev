import { connectStateResults } from 'react-instantsearch-dom'
import { SearchState, AllSearchResults, AlgoliaError } from 'react-instantsearch-core'
import { styled } from 'goober'

interface PassedProps {
  error: AlgoliaError
  searchState: SearchState
  searchResults: AllSearchResults
}

interface Props extends PassedProps {
  className?: string
}

const Component: React.VFC<Props> = (props) => {
  const { className, error, searchState, searchResults } = props
  const hasResults = searchResults && searchResults.nbHits !== 0
  const nbHits = searchResults && searchResults.nbHits

  if (error) {
    return <div className={className + ' error'}>SEARCH_ERROR: {error.message}</div>
  }

  if (!searchState.query?.length) {
    return <div className={className} />
  }

  if (hasResults) {
    return (
      <div className={className}>
        {nbHits} results were found for {searchState.query}.
      </div>
    )
  } else {
    return <div className={className}>No results for {searchState.query}</div>
  }
}

const StyledComponent = styled(Component)`
  padding: 1rem;
  text-align: center;
  &.error {
    color: red;
  }
`

const ContainerComponent: React.VFC<PassedProps> = (props) => <StyledComponent {...props} />

export const CustomStateResults = connectStateResults(ContainerComponent)
