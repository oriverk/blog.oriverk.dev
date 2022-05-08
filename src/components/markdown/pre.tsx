import { styled } from 'goober'

const StyledComponent = styled('div')`
  margin-top: 2em;
  margin-bottom: 2em;
  border-radius: 0.125rem;
`

export const Pre: React.FC = (props: any) => <StyledComponent {...props} className="codeblock-container" />
