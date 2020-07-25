import Link from 'next/link'
import { Hits, Panel } from 'react-instantsearch-dom'
// import { Hit as HitType, SearchState, AllSearchResults, AlgoliaError, }
  // from "react-instantsearch-core"
import { CustomPoweredBy, CustomStateResults } from './Connector'
import Date from '../date'

// interface IProps {
//   hit: HitType
//   searchState: SearchState
//   searchResults: AllSearchResults
//   error: AlgoliaError
// }

const Hit = (props) => {
  const { hit } = props
  const tags = hit.tags
  const date = hit.update || hit.create
  return (
    <React.Fragment>
      <div className='resultLinks'>
        <Link href='/posts/[id]' as={`/posts/${hit.id}`} passHref>
          <a key={hit.id}>
            <div className='title'>{hit.title}</div>
            <div className='tags'>{tags.map((tag) => <span key={tag}>{tag}&nbsp;</span>)}</div>
            <Date dateString={date} />
          </a>
        </Link>
      </div>
      <style jsx>{`
        .resultLinks{
          padding: .5rem;
        }
        .resultLinks:hover{
          background-color: #424242;
          border-radius: .5rem;
        }
      `}</style>
    </React.Fragment>
  )
}

export const SearchResults = (props) => {
  return (
    <Panel footer={<CustomPoweredBy />} >
      <Hits hitComponent={Hit} />
      <CustomStateResults />
    </Panel>
  )
}

// export const SearchResult = (props) => {
//   const { searchState, searchResults, error } = props
//   if (searchState && !searchState.query) {
//     return null
//   }
//   return (
//     <Panel footer={<CustomPoweredBy />}>
//       {error ? <div>{error.message}</div> : null}
//       {searchResults && searchResults.nbHits > 0 ? (
//         <Hits hitComponent={Hit} />
//       ) : (
//           <div>No Results Found.</div>
//       )}
//     </Panel>
//   )
// }