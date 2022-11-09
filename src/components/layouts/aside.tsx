import { styled } from 'goober'

type PassedProps = {
  width: string
  top: string
}

type Props = PassedProps & {
  className?: string
}

const Component = (props: Props) => <aside {...props} />

const StyledComponent = styled(Component)`
  @media screen and (min-width: 48em) {
    display: none;
  }

  margin: 1rem;
  padding: 1rem;
  position: sticky;
  top: ${({ top }) => top || '6rem'};
  min-height: 100vh;
  width: ${({ width }) => width || '20rem'};
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
`

const ContainerComponent: React.FC<PassedProps> = (props) => <StyledComponent {...props} />

export const Aside = ContainerComponent
