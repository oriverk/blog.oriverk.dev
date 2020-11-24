import { useRouter } from 'next/router'
import { connectPoweredBy, connectSearchBox, connectStateResults } from 'react-instantsearch-dom'
import { IconContext } from 'react-icons'
import { MdSearch } from 'react-icons/md'

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

const PoweredBy: React.FC = () => {
  return (
    <>
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
    </>
  )
}
export const CustomPoweredBy = connectPoweredBy(PoweredBy)

const SearchBox = ({ currentRefinement, refine }) => {
  const router = useRouter()

  function handleOnChange(e){
    e.preventDefault();
    refine(e.currentTarget.value)
    const path = e.currentTarget.value ? `/search/?q=${e.currentTarget.value}` : '/search/';
    router.push(path, undefined, {shallow: true})
  }
  return (
    <>
      <div>
        <form noValidate action='' role='search' onSubmit={e => {
          e.preventDefault();
        }}>
          <input
            placeholder='Search posts in English...'
            type='search'
            value={currentRefinement}
            onChange={e => { handleOnChange(e) }}
            autoFocus
            onSubmit={e => { e.preventDefault();}}
          />
          <button type='submit' disabled={!currentRefinement}>
            <IconContext.Provider value={{ className: 'react-icons' }}><MdSearch /></IconContext.Provider>
          </button>
        </form>
      </div>
      <style jsx>{`
      div{
        margin: 0 auto 1.5rem;
      }

      form {
        display: inline-flex;
        border-bottom: .15rem solid #EEE;
        width: 100%;
      }

      input[type='search'] {
        color: #EEE;
        font-size: 1rem;
        height: 3rem;
        width: 100%;
        padding: 0;
        border: none;
        border-radius: 0;
        outline: none;
        background: none;
      }

      button[type='submit'], button[type='reset'] {
        background-color: transparent;
        border: none;
        cursor: pointer;
        outline: none;
        padding: 0;
        appearance: none;
      }

      :global(.react-icons){
        fill: #EEE;
        width: 2rem;
        height: 2rem;
      }

      /* clears the ‘X’ from Internet Explorer */
      input[type=search]::-ms-clear { display: none; width : 0; height: 0; }
      input[type=search]::-ms-reveal { display: none; width : 0; height: 0; }
      /* clears the ‘X’ from Chrome */
      input[type="search"]::-webkit-search-decoration,
      input[type="search"]::-webkit-search-cancel-button,
      input[type="search"]::-webkit-search-results-button,
      input[type="search"]::-webkit-search-results-decoration { display: none; }
    `}</style>
    </>
  )
}

export const CustomSearchBox = connectSearchBox(SearchBox)

const StateResults = ({ error, searchResults }) => {
  const hasResults = searchResults && searchResults.nbHits !== 0
  const nbHits = searchResults && searchResults.nbHits
  if (error) {
    return (
      <div>An error happened {error.message}</div>
    )
  }
  if (hasResults) {
    return (
      null
    )
  } else {
    return (
      <>
        <div>No Results Found.</div>
        <style jsx>{`
          div{
            align-self: center;
            text-align: center;
            color: #EEE;
            height: 100%;
          }
        `}</style>
      </>
    )
  }
}

export const CustomStateResults = connectStateResults(StateResults)