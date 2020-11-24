import Link from 'next/link'
import css from 'styled-jsx/css'
import { Hits, Panel } from 'react-instantsearch-dom'
// import { Hit as HitType, SearchState, AllSearchResults, AlgoliaError, }
// from "react-instantsearch-core"
import { CustomStateResults } from './StateResults'
import { CustomPoweredBy } from './PoweredBy'

import { Date } from '../../general/Date'

// interface IProps {
//   hit: HitType
//   searchState: SearchState
//   searchResults: AllSearchResults
//   error: AlgoliaError
// }

const hitStyle = css`
.result{
  display: block;
  padding: .5rem;
  text-decoration: none;
  color: #D9D9D9;
  border-radius: .5rem;
  border: 1px solid #EEE;
}
.result:hover, .result:active, .result:visited{
  background-color: #333;
  border: 1px solid #50CAF9;
}
.tag{
  display: inline-block;
  font-size: .9rem;
  border-radius: 2rem;
  border: 1px solid #50CAF9;
  padding: 0.1rem .5rem;
  margin: .5rem .3rem;
  color: #EEE;
}
`

const Hit = (props) => {
  const { hit } = props
  const tags = hit.tags
  const date = hit.update || hit.create
  return (
    <>
      <Link href={`/posts/${hit.id}`} passHref>
        <a key={hit.id} className='result'>
          <Date dateString={date} />
          <div className='tags'>
            {tags.map((tag) => <span key={tag} className='tag'>{tag}</span>)}
          </div>
          <div className='title'>{hit.title}</div>
        </a>
      </Link>
      <style jsx>{hitStyle}</style>
    </>
  )
}

const style = css`
:global(.ais-Hits-list){
  list-style: none;
  padding: 0;
}
:global(.ais-Hits-item){
  padding: .5rem;
}

.hits{
  overflow: hidden scroll;
}
`

export const SearchResults = () => {
  return (
    <Panel>
      <CustomPoweredBy />
      <div className='hits'>
        <Hits hitComponent={Hit} />
      </div>
      <CustomStateResults />
      <style jsx>{style}</style>
    </Panel>
  )
}