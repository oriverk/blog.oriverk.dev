import { ComponentPropsWithoutRef, FC } from 'react'

type Props = ComponentPropsWithoutRef<'div'>

export const Markdown: FC<Props> = (props) => {
  const { children } = props

  return (
    <div className="markdown prose prose-invert mx-auto max-w-sm overflow-x-auto break-words sm:max-w-md md:max-w-2xl lg:max-w-2xl">
      {children}
    </div>
  )
}
