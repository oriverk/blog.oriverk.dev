import { useCallback, useEffect, useRef, useState } from 'react'
import type { UseSearchBoxProps } from 'react-instantsearch-hooks-web';
import { useSearchBox } from 'react-instantsearch-hooks-web';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

type PassedProps = UseSearchBoxProps & {
  placeholder?: string
}

type Props = PassedProps & {
  className?: string
}

export const CustomSearchBox = (props: Props) => {
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
    <div className="flex relative">
      <label htmlFor="検索" className="sr-only">検索</label>
      <div className="relative w-full">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <MagnifyingGlassIcon aria-hidden="true" className="w-5 h-5 text-gray-400" />
        </div>
        <input
          id="検索"
          type="text"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          maxLength={64}
          placeholder={placeholder}
          value={inputValue}
          onChange={handleChange}
          ref={inputRef}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
    </div>
  )
}
