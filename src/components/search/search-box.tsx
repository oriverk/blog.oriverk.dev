import { useCallback } from 'react'
import { useRouter } from 'next/router'
import { connectSearchBox } from 'react-instantsearch-dom'
import { SearchBoxProvided } from 'react-instantsearch-core'
import { styled } from 'goober'

import { SearchIcon } from 'components/icons'

interface PassedProps extends SearchBoxProvided {
  placeholder?: string
}

interface Props extends PassedProps {
  className?: string
}

const Component = (props: Props) => {
  const { className, refine, currentRefinement, isSearchStalled, placeholder = '' } = props
  const router = useRouter()

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const query = event.currentTarget.value

      refine(query)
      if (query) {
        router.push({ pathname: router.pathname, query: { q: encodeURI(query) } }, undefined, { shallow: true })
      } else {
        router.push({ pathname: router.pathname }, undefined, { shallow: true })
      }
    },
    [refine, router]
  )

  return (
    <div className={className}>
      <span>
        <SearchIcon label="search posts" size={8} color="var(--color-gray)" />
      </span>
      <input
        type="text"
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
        maxLength={64}
        placeholder={placeholder}
        value={currentRefinement}
        onChange={handleChange}
      />
      {isSearchStalled ? 'My search is stalled' : ''}
    </div>
  )
}

const StyledComponent = styled(Component)`
  display: flex;
  position: relative;
  & > span {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 2.5rem;
    height: 2.5rem;
  }
  & > input {
    padding: 0 1rem 0 2.5rem;
    position: relative;
    width: 100%;
    height: 2.5rem;
    outline: 2px solid transparent;
    color: var(--color-white);
    border: none;
    border-bottom: 1px solid var(--color-gray);
    background: inherit;
    font-size: inherit;
    transition: box-shadow 200ms;
  }
  & > input:focus {
    border-color: rgb(99, 179, 237);
    box-shadow: rgb(99 179 237) 0px 1px 0px 0px;
  }
`

const ContainerComponent: React.FC<PassedProps> = (props) => <StyledComponent {...props} />

export const CustomSearchBox = connectSearchBox(ContainerComponent)
