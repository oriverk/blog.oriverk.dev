import React from 'react'
// import Link from 'next/link'
import { connectPoweredBy, connectSearchBox, connectStateResults } from 'react-instantsearch-dom'

// const Hits = (props) => {
//   const { hits } = props
//   return (
//     <div>
//       {hits.map((hit) => {
//         <div className='resultLink' key={hit.id}>
//           <Link href='/posts/[id]' as={`/posts/${hit.id}`} passHref>
//             <a key={hit.id}>
//               <div className='title'>{hit.title}</div>
//               <div className='tags'>{hit.tags.map((tag) => <span key={tag}>{tag}&nbsp;</span>)}</div>
//               <Date dateString={hit.update || hit.create} />
//             </a>
//           </Link>
//         </div>
//       })}
//     </div>
//   )
// }
// export const CustomHits = connectHits(Hits)

const PoweredBy = () => {
  return (
    <React.Fragment>
      <div>
        <a href='https://www.algolia.com' target='_blank' rel='noopener noreferrer'>
          <img loading="lazy"
            src="https://res.cloudinary.com/hilnmyskv/image/upload/q_auto/v1594300044/Algolia_com_Website_assets/images/search/search-by-algolia.svg" alt="Search by Algolia" />
        </a>
      </div>
      <style jsx>{`
        div{
          width: 100%;
          text-align: right;
        }
        img{
          height: 1.2rem;
          width: auto;
          margin: 0 auto;
        }
      `}</style>
    </React.Fragment>
  )
}
export const CustomPoweredBy = connectPoweredBy(PoweredBy)

const SearchBox = ({ currentRefinement, refine }) => (
  <React.Fragment>
    <div>
      <form noValidate action='' role='search'>
        <input
          placeholder='Search post'
          type='search'
          value={currentRefinement}
          onChange={event => refine(event.currentTarget.value)}
          autoFocus
        />
      </form>
    </div>
    <style jsx>{`
      div{
        width: 100%;
        margin: 0 auto 1.5rem;
      }
      input {
        font-size: 1rem;
        height: 3rem;
        width: 100%;
        padding: .5rem;
        border: none;
        border-radius: .5rem;
      }
      input:active, input:focus{
        border-radius: .5rem;
      }
    `}</style>
  </React.Fragment>
)
export const CustomSearchBox = connectSearchBox(SearchBox)

const StateResults = ({ searchResults }) => {
  const hasResults = searchResults && searchResults.nbHits !== 0
  // const nbHits = searchResults && searchResults.nbHits // the number of hits
  if (hasResults) {
    return (
      null
    )
  } else {
    return (
      <React.Fragment>
        <div>No Results Found.</div>
        <style jsx>{`
          div{
            align-self:center;
            text-align: center;
            color: #EEE;
            height: 100%;
          }
        `}</style>
      </React.Fragment>
    )
  }
}
export const CustomStateResults = connectStateResults(StateResults)