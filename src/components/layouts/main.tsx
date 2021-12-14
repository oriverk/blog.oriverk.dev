import { styled } from 'goober'

interface Props {
  className?: string
}

const Component: React.FC<Props> = (props) => {
  const { className, children } = props
  return <main className={className}>{children}</main>
}

const StyledComponent = styled(Component)`
  padding: 1rem;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ContainerComponent: React.FC = (props) => <StyledComponent {...props} />

export const Main = ContainerComponent
