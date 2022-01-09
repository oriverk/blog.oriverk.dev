import { styled } from 'goober'

const StyledComponent = styled('main')`
  flex: 1;
  overflow: hidden;
  display: flex;
  justify-content: center;
`

const ContainerComponent: React.FC = (props) => <StyledComponent {...props} />

export const Main = ContainerComponent
