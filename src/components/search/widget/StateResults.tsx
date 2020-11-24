import css from 'styled-jsx/css'
import { connectStateResults } from 'react-instantsearch-dom'

const style = css`
div{
  align-self: center;
  text-align: center;
  color: #EEE;
  height: 100%;
}
`

const StateResults = ({ error, searchResults }) => {
  const hasResults = searchResults && searchResults.nbHits !== 0
  // const nbHits = searchResults && searchResults.nbHits
  if (error) {
    return (
      <>
        <div>An error happened {error.message}</div>
        <style jsx>{style}</style>
      </>
    )
  }else if (hasResults) {
    return null
  } else {
    return (
      <>
        <div>No Results Found.</div>
        <style jsx>{style}</style>
      </>
    )
  }
}

export const CustomStateResults = connectStateResults(StateResults)