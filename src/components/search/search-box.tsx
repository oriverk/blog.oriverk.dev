import { useCallback, useEffect, useRef, useState } from 'react'
import { styled } from 'goober'
import type { UseSearchBoxProps, SearchBox } from 'react-instantsearch-hooks-web';
import { useSearchBox } from 'react-instantsearch-hooks-web';

import { SearchIcon } from 'components/icons'

type PassedProps = UseSearchBoxProps & {
  placeholder?: string
}

type Props = PassedProps & {
  className?: string
}

const Component = (props: Props) => {
  const { className, placeholder = "", ...rest } = props
  const inputRef = useRef<HTMLInputElement>(null)
  const [inputValue, setInputValue] = useState("")
  const { query, refine } = useSearchBox(rest);

  useEffect(() => {
    if (!inputRef.current) return;

    inputRef.current.focus();
  }, [inputRef])

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.currentTarget.value
      setInputValue(value)
      refine(value)
    },
    [refine]
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
        value={inputValue}
        onChange={handleChange}
        ref={inputRef}
      />
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

export const CustomSearchBox = ContainerComponent
