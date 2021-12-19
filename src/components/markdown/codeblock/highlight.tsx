import BaseHighlight, {
  defaultProps,
  Language,
  PrismTheme,
} from "prism-react-renderer"

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
        <>
          <pre className={className} style={style}>
            {tokens.map((line, i) => {
              const lineProps = getLineProps({ line, key: i })
              return (
                <div style={{padding: '0 1.25rem'}}
                  {...lineProps}
                  key={i}
                >
                  {line.map((token, key) => (
                    <span {...getTokenProps({ token, key })} key={key}/>
                  ))}
                </div>
              )
            })}
          </pre>
        </>
      )}
    </BaseHighlight>
  )
}

export default Highlight
