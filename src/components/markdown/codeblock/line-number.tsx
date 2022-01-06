import { styled } from 'goober'

interface PassedProps {
  number: number
}

interface Props extends PassedProps {
  className?: string
}

const Component: React.VFC<Props> = (props) => {
  const { className, number } = props
  return <span className={className} data-line-number={number} />
}

const StyledComponent = styled(Component)`
  margin-right: 1rem;
  color: dimgray;

  &::before {
    content: attr(data-line-number);
  }
`

const ContainerComponent: React.VFC<PassedProps> = (props) => <StyledComponent {...props} />

export const LineNumber = ContainerComponent
