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
      <div key={hit.id} className='resultLink'>
        <Link href='/posts/[id]' as={`/posts/${hit.id}`} passHref>
          <a key={hit.id}>
            <div className='title'>{hit.title}</div>
            <div className='tags'>{tags.map((tag) => <span key={tag}>{tag}&nbsp;</span>)}</div>
            <Date dateString={date} />
          </a>
        </Link>
      </div>
      <style jsx>{`
        .resultLink{
          padding: .5rem;
        }
        .resultLink:hover, .resultLink:visited{
          background-color: #424242;
          border-radius: .5rem;
        }
      `}</style>
    </React.Fragment>
  )
}

export const SearchResults = (props) => {
  const { error } = props
  return (
    <React.Fragment>
      <Panel>
        <CustomPoweredBy />
        <div className='hits'>
          <Hits hitComponent={Hit} />
        </div>
        <CustomStateResults />
        {error ? <div>{error.message}</div> : null}
      </Panel>
      <style jsx global>{`
        .ais-Hits-list{
          list-style: none;
          padding: 0;
        }
        .ais-Hits-item{
          padding: .5rem;
        }
      `}</style>
      <style jsx>{`
        .hits{
          overflow: hidden scroll;
        }
      `}</style>
    </React.Fragment>
  )
}