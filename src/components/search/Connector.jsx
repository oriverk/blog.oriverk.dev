import { connectPoweredBy, connectSearchBox, connectStateResults } from 'react-instantsearch-dom'

const PoweredBy = () => {
  return (
    <div>
      <a href='https://www.algolia.com'>
        <img loading="lazy" src="https://res.cloudinary.com/hilnmyskv/image/upload/q_auto/v1594300044/Algolia_com_Website_assets/images/search/search-by-algolia.svg" alt="Search by Algolia" />
      </a>
      <style jsx>{`
        img{
          height: 1.5rem;
          width: auto;
          float: right;
          background-color: #303030;
        }
      `}</style>
    </div>
  )
}
export const CustomPoweredBy = connectPoweredBy(PoweredBy)

const SearchBox = ({ currentRefinement, isSearchStalled, refine }) => (
  <React.Fragment>
    <div>
      <form noValidate action='' role='search'>
        <input
          placeholder='Search post'
          type='search'
          value={currentRefinement}
          onChange={event => refine(event.currentTarget.value)}
          />
      </form>
    </div>
    <style jsx>{`
      div{
        position: absolute;
        bottom: 0;
        margin: 0 auto 1.5rem;
      }
      
      input {
        font-size: 1rem;
        height: 3rem;
        padding: .5rem;
        border: none;
        border-radius: .5rem;
      }
    `}</style>
  </React.Fragment>
)
export const CustomSearchBox = connectSearchBox(SearchBox)

const StateResults = ({ searchResults }) => {
  const hasResults = searchResults && searchResults.nbHits !== 0;
  // const nbHits = searchResults && searchResults.nbHits // the number of hits
  return (
    <div>
      {!hasResults && <div>No Result Found.</div>}
      <style jsx>{`
        div{
          text-align: center;
          color: #EEE;
        }
      `}</style>
    </div>
  )
}
export const CustomStateResults = connectStateResults(StateResults)
