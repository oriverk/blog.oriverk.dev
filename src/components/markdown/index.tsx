import { ComponentPropsWithoutRef, FC } from 'react'

type Props = ComponentPropsWithoutRef<'div'>

export const Markdown: FC<Props> = (props) => {
  const { children } = props

  return (
    <div className="markdown max-w-none prose prose-invert prose-p:text-slate-50 prose-li:text-slate-50 mx-auto overflow-x-auto break-words">
      {children}
    </div>
  )
}
