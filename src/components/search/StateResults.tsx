import css from 'styled-jsx/css'
import { connectStateResults } from 'react-instantsearch-dom'
import { SearchState, AllSearchResults, AlgoliaError } from "react-instantsearch-core"

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
  return (
    <>
      {
        error ? (<div>An error occured: {error.message}</div>)
          : hasResults ? (<div>{nbHits} results found.</div>)
          : (<div>No result found.</div>)
      }
      <style jsx>{style}</style>
    </>
  )
}

export const CustomStateResults = connectStateResults(StateResults)