import { styled } from 'goober'

const StyledComponent = styled('div')`
  margin: 2rem 0;
  padding: 0 1.25rem;
  border-radius: 8px;
  background: #011627;
`

const ContainerComponent = (props: any) => {
  return <StyledComponent {...props} />
}

export const CodeContainer = ContainerComponent