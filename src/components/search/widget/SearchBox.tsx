import { useRouter } from 'next/router'
import css from 'styled-jsx/css'
import { connectSearchBox } from 'react-instantsearch-dom'
import { IconContext } from 'react-icons'
import { MdSearch } from 'react-icons/md'

const style = css`
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

button[type='submit'] {
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
`

const SearchBox = ({ currentRefinement, refine }) => {
  const router = useRouter()

  function handleOnChange(e) {
    e.preventDefault();
    refine(e.currentTarget.value)
    if (e.currentTarget.value) {
      router.push(
        { pathname: router.pathname, query: { q: e.currentTarget.value } },
        undefined,
        { shallow: true }
      )
      console.dir(router)
    } else {
      router.push(router.pathname, undefined, { shallow: true })
    }
  }

  return (
    <>
      <div>
        <form noValidate action='' role='search' onSubmit={e => { e.preventDefault(); }}>
          <input
            placeholder='Search posts in English...'
            type='search'
            value={currentRefinement}
            onChange={e => { handleOnChange(e) }}
            onSubmit={e => { e.preventDefault(); }}
            autoFocus
          />
          <button type='submit' disabled={!currentRefinement}>
            <IconContext.Provider value={{ className: 'react-icons' }}><MdSearch /></IconContext.Provider>
          </button>
        </form>
      </div>
      <style jsx>{style}</style>
    </>
  )
}

export const CustomSearchBox = connectSearchBox(SearchBox)