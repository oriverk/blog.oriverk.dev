import { styled } from 'goober'

const Component: React.FC = (props: any) => {
  const { className, ...rest } = props

  return (
    <div className={className}>
      <table {...rest} />
    </div>
  )
}

const StyledComponent = styled(Component)`
  overflow-x: auto;
  & > table {
    margin-top: 2rem;
    border-collapse: collapse;
    border: 1px solid var(--color-gray);
    text-align: left;
  }
`

const ContainerComponent: React.FC = (props: any) => {
  return <StyledComponent {...props} />
}

export const Table = ContainerComponent
