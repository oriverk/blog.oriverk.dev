import type { ComponentPropsWithoutRef, FC } from 'react'

type Props = ComponentPropsWithoutRef<'pre'>

export const Pre: FC<Props> = ({ children }) => (
  <pre className="codeblock-container my-2 rounded-sm">{children}</pre>
)
