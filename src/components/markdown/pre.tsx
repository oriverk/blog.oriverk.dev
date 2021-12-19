import { styled } from 'goober'

const StyledComponent = styled('div')`
  margin-top: 2em;
  margin-bottom: 2em;
  border-radius: .125rem;
`

export const Pre: React.VFC = (props: any) => (
  <StyledComponent {...props} className='codeblock-container' />
)
