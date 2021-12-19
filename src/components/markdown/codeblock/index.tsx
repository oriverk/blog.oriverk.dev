import { styled } from 'goober'
import type { Language } from "prism-react-renderer"
import theme from "prism-react-renderer/themes/nightOwl"
import { CodeContainer } from "./code-container"
// import { CopyButton } from "./copy-button"
import Highlight from "./highlight"

const StyledDiv = styled('div')`
  position: relative;
  z-index: 0;
`

interface PassedProps {
  className?: string;
  children: any;
}

export const CodeBlock: React.VFC = (props: any) => {
  const { className, children } = props.children.props as PassedProps
  const [language, filename] = className?.replace(/language-/, "")
    .split(':') as [Language, string]
  const rawCode = children.trim()

  return (
    <StyledDiv>
      <CodeContainer>
        {/* {filename ? filename : ""} */}
        <Highlight
          codeString={rawCode}
          language={language}
          theme={theme}
        />
      </CodeContainer>
      {/* <CopyButton top={4} code={rawCode} /> */}
    </StyledDiv>
  )
}
