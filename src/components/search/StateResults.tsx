import css from 'styled-jsx/css'
import { connectStateResults } from 'react-instantsearch-dom'
import { SearchState, AllSearchResults, AlgoliaError } from "react-instantsearch-core"

import { useTranslation } from '../../hooks/translation'

const style = css`
div {
  padding: .5rem;
  text-align: center;
  color: var(--colorTextDefault);
}
`

type Props = {
  searchState: SearchState,
  error: AlgoliaError,
  searchResults: AllSearchResults
}

const StateResults: React.FC<Props> = ({
  // searchState,
  error,
  searchResults
}) => {  
  const hasResults = searchResults && searchResults.nbHits !== 0
  const nbHits = searchResults && searchResults.nbHits
  // I don't like Ternary operation(三項演算子) but this way needs few codes.
  const searchError = useTranslation('SEARCH_ERROR')
  const resultsFound = useTranslation('SEARCH_SOME_RESULTS_FOUND')
  const noResultsFound = useTranslation('SEARCH_NO_RESULT_FOUND')
  return (
    <>
      {
        error ? (<div>{searchError}: {error.message}</div>)
          : hasResults ? (<div>{nbHits + ' ' + resultsFound}</div>)
          : (<div>{noResultsFound}</div>)
      }
      <style jsx>{style}</style>
    </>
  )
}

export const CustomStateResults = connectStateResults(StateResults)