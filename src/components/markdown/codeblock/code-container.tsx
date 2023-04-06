import type { ComponentPropsWithoutRef, FC } from 'react'

type Props = ComponentPropsWithoutRef<'div'>

export const CodeContainer: FC<Props> = ({ children }) => <div className="code-container">{children}</div>
