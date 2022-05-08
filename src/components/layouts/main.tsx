import { styled } from 'goober'

interface Props {
  children: React.ReactNode
}

const StyledComponent = styled('main')`
  flex: 1;
  overflow: hidden;
  display: flex;
  justify-content: center;
`

const ContainerComponent: React.FC<Props> = (props) => <StyledComponent {...props} />

export const Main = ContainerComponent
