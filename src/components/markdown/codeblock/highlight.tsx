import { styled } from 'goober'
import BaseHighlight, {
  defaultProps,
  Language,
  PrismTheme,
} from "prism-react-renderer"
import { LineNumber } from './line-number'

const StyledDiv = styled('div')`
  overflow-x: auto;
  margin: .5rem 0;
`

interface HighlightProps {
  codeString: string
  language: Language
  theme: PrismTheme
  // metastring?: string
  showLines?: boolean
}

const Highlight: React.VFC<HighlightProps> = (props) => {
  const { codeString, language, showLines, ...rest } = props
  
  return (
    <BaseHighlight
      code={codeString}
      language={language}
      {...defaultProps}
      {...rest}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <StyledDiv className='highlight'>
          <pre className={className}>
            <code translate="no">
              {tokens.map((line, i) => {
              const lineProps = getLineProps({ line, key: i })
              return (
                <div
                  {...lineProps}
                  key={i}
                >
                  {/* <LineNumber>{i + 1}</LineNumber> */}
                  <LineNumber number={i+1} />
                  {line.map((token, key) => (
                    <span {...getTokenProps({ token, key })} key={key}/>
                  ))}
                </div>
              )
            })}
            </code>
          </pre>
        </StyledDiv>
      )}
    </BaseHighlight>
  )
}

export default Highlight
