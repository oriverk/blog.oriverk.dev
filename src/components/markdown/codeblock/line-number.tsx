import { styled } from 'goober'

interface PassedProps {
  number: number
  code: string
}

interface Props extends PassedProps {
  className?: string
}

const Component: React.VFC<Props> = (props) => {
  const { className, number, code } = props

  return (
    <div className={className}>
      <span data-line-number={number} />
    </div>
  )
}

const StyledComponent = styled(Component)`
  display: inline-block;
  margin-right: 1rem;
  text-align: right;
  width: 1.5rem;
  color: dimgray;
  font-size: 1rem;
  & > span::before {
    content: attr(data-line-number);
  }
`

const ContainerComponent: React.VFC<PassedProps> = (props) => <StyledComponent {...props} />

export const LineNumber = ContainerComponent
