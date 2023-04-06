import type { FC } from 'react'
import type { Language } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/nightOwl'

import { CodeContainer } from './code-container'
import Highlight from './highlight'
import { CodeNav } from './code-nav'

type Props = {
  className?: string
  children: any
}

export const CodeBlock: FC<Props> = (props) => {
  const { className, children } = props.children.props
  const [language, filename]: [Language, string] = className?.replace(/language-/, '').split(':')
  const rawCode: string = children.trim()

  return (
    <CodeContainer>
      <CodeNav filename={filename || language} rawCode={rawCode} />
      <Highlight codeString={rawCode} language={language} theme={theme} showLines={true} />
    </CodeContainer>
  )
}
