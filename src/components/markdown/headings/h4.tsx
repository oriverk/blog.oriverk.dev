import { styled } from 'goober'

interface PassedProps {
  id: string
  children: string
}

interface Props extends PassedProps {
  className?: string
}

const Component = (props: Props) => {
  const { className, id, children } = props

  return (
    <h4 id={id} className={className}>
      <a href={`#${props.id}`}>{children}</a>
    </h4>
  )
}

const StyledComponent = styled(Component)`
  scroll-margin-block: 3rem;
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

export const H4 = ContainerComponent
