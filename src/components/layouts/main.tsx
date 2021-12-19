import { styled } from 'goober'

const StyledComponent = styled('main')`
  padding: 1rem;
  flex: 1;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ContainerComponent: React.FC = (props) => <StyledComponent {...props} />

export const Main = ContainerComponent
