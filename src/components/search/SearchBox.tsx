import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import css from 'styled-jsx/css'
import { IconContext } from 'react-icons'
import { MdSearch } from 'react-icons/md'
import {useDebounce } from '../../hooks/useDebounce'

import { useTranslation } from '../../hooks/translation'

import { connectSearchBox } from 'react-instantsearch-dom'
import { SearchBoxProvided } from 'react-instantsearch-core';

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
  outline: none;
  cursor: pointer;
  padding: 0;
}

:global(.search-icon) {
  position: relative;
  transform: none;
  top: 0;
  left: 0;
  fill: var(--colorTextDefault);
  width: 2rem;
  height: 2rem;
}

button:disabled > :global(.search-icon){
  fill: var(--colorTextGray);
}

/* clears the ‘X’ from Chrome */
input[type="search"]::-webkit-search-decoration,
input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-results-button,
input[type="search"]::-webkit-search-results-decoration { display: none; }
`

const SearchBox: React.VFC<SearchBoxProvided> = ({
  refine
}) => {
  const router = useRouter()

  const [inputValue, setInputValue] = useState('')
  const debouncedValue = useDebounce(inputValue, 400)
  refine(debouncedValue)

  function changeQuery2Path(query: any) {    
    if (query) {
      router.push(
        { pathname: router.pathname, query: { q: encodeURI(query) } },
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

  useEffect(() => {
    changeQuery2Path(debouncedValue)
  }, [debouncedValue])
  
  const placeholder = useTranslation('SEARCH_IN_ENGLISH')
  return (
    <>
      <form noValidate action='' role='search' onSubmit={e => { e.preventDefault(); }}>
        <input
          placeholder={placeholder + '...'}
          type='search'
          value={inputValue}
          onChange={e => {
            e.preventDefault();
            setInputValue(e.target.value)
          }}
          onSubmit={e => e.preventDefault()}
          autoFocus
        />
        <button type='submit' disabled={!inputValue}>
          <IconContext.Provider value={{ className: 'search-icon' }}>
            <MdSearch />
          </IconContext.Provider>
        </button>
      </form>
      <style jsx>{style}</style>
    </>
  )
}

export const CustomSearchBox = connectSearchBox(SearchBox)