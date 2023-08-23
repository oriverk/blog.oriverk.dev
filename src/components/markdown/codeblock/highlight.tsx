'use client'

import type { FC } from 'react'
import type { Language, PrismTheme } from 'prism-react-renderer'
import { Highlight as PrismHighlight } from 'prism-react-renderer'
import { LineNumber } from './line-number'

type Props = {
  codeString: string
  language: Language
  theme: PrismTheme
  // metastring?: string
  showLines?: boolean
}

const Highlight: FC<Props> = (props) => {
  const { codeString, language, showLines, ...rest } = props

  return (
    <PrismHighlight code={codeString} language={language} {...rest}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <div className="highlight">
          <pre className={className}>
            <code translate="no">
              {tokens.map((line, i) => {
                const lineProps = getLineProps({ line, key: i })
                const code = codeString.split('\n')[i]

                return (
                  <div {...lineProps} key={i}>
                    {showLines ? <LineNumber number={i + 1} code={code} /> : null}
                    {line.map((token, key) => (
                      <span {...getTokenProps({ token, key })} key={key} />
                    ))}
                  </div>
                )
              })}
            </code>
          </pre>
        </div>
      )}
    </PrismHighlight>
  )
}

export default Highlight
