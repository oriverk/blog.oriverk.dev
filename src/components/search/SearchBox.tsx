import { useRouter } from 'next/router'
import css from 'styled-jsx/css'
import { connectSearchBox } from 'react-instantsearch-dom'
import { SearchBoxProvided } from 'react-instantsearch-core';
import { IconContext } from 'react-icons'
import { MdSearch } from 'react-icons/md'

const style = css`
form {
  display: inline-flex;
  margin-bottom: 1.5rem;
  border-bottom: .15rem solid #EEE;
  width: 100%;
}

input[type='search'] {
  color: var(--colorTextDefault);
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

:global(.react-icons) {
  fill: var(--colorTextDefault);
  width: 2rem;
  height: 2rem;
}

button:disabled > :global(.react-icons){
  fill: var(--colorTextDisable);
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

const SearchBox: React.FC<SearchBoxProvided> = ({
  currentRefinement,
  refine
}) => {
  const router = useRouter()

  function handleOnChange(e) {
    refine(e.currentTarget.value)
    // serachResults to URL
    if (e.currentTarget.value) {
      router.push(
        { pathname: router.pathname, query: { q: encodeURI(e.currentTarget.value) } },
        undefined,
        { shallow: true }
      )
    } else {
      router.push(
        { pathname: router.pathname },
        undefined,
        { shallow: true })
    }
  }

  return (
    <>
      <form noValidate action='' role='search' onSubmit={e => { e.preventDefault(); }}>
        <input
          placeholder='Search posts in English...'
          type='search'
          value={currentRefinement}
          onChange={e => {
            e.preventDefault();
            handleOnChange(e)
          }}
          onSubmit={e => e.preventDefault()}
          autoFocus
        />
        <button type='submit' disabled={!currentRefinement}>
          <IconContext.Provider value={{ className: 'react-icons' }}>
            <MdSearch />
          </IconContext.Provider>
        </button>
      </form>
      <style jsx>{style}</style>
    </>
  )
}

export const CustomSearchBox = connectSearchBox(SearchBox)