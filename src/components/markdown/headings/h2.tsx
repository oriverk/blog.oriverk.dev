import { styled } from 'goober'

export interface PassedProps {
  id: string
  children: string
}

interface Props extends PassedProps {
  className?: string
}

const Component: React.FC<Props> = (props) => {
  const { className, id, children } = props

  return (
    <h2 id={id} className={className}>
      <a href={`#${id}`}>{children}</a>
    </h2>
  )
}

const StyledComponent = styled(Component)`
  padding-bottom: 0.2rem;
  margin-bottom: 1.1rem;
  scroll-margin-block: 3rem;
  border-bottom: 1px solid var(--color-gray);
  & {
    a::before {
      content: '## ';
    }
    a {
      color: var(--color-white);
      text-decoration: none;
    }
  }
  &:hover > a::before {
    text-decoration: none;
    color: var(--color-miku);
  }
`

const ContainerComponent: React.FC<PassedProps> = (props) => {
  return <StyledComponent {...props} />
}

export const H2 = ContainerComponent
