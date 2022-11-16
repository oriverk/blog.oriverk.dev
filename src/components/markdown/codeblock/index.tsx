import type { Language } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/nightOwl'

import { CodeContainer } from './code-container'
import Highlight from './highlight'
import { CodeNav } from './code-nav'

type PassedProps = {
  className?: string
  children: any
}

export const CodeBlock: React.FC = (props: any) => {
  const { className, children } = props.children.props as PassedProps
  const [language, filename] = className?.replace(/language-/, '').split(':') as [Language, string]
  const rawCode = children.trim()

  return (
    <CodeContainer>
      <CodeNav filename={filename || language} rawCode={rawCode} />
      <Highlight codeString={rawCode} language={language} theme={theme} showLines={true} />
    </CodeContainer>
  )
}
