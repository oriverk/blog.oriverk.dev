import type { ComponentPropsWithoutRef, FC } from 'react'

type Props = ComponentPropsWithoutRef<'code'>

export const InlineCode: FC<Props> = ({ children }) => <code translate="no">{children}</code>
