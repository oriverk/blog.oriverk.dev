import { useCopyToClipboard } from 'react-use'
import { styled } from 'goober'

interface PasssedProps {
  code: string
}

interface Props extends PasssedProps {
  className?: string
}

const Component = ({ className, code }: Props) => {
  const [state, copyToClipboard] = useCopyToClipboard()

  return (
    <button className={className} onClick={() => copyToClipboard(code)}>
      {!state.error && state.value ? 'Copied' : 'Copy'}
    </button>
  )
}

const StyledComponent = styled(Component)`
  background: var(--color-miku);
  font-weight: bold;
  padding: 0.2rem 0.5rem;
`

const ContainerComponent: React.FC<PasssedProps> = (props) => <StyledComponent {...props} />

export const CopyButton = ContainerComponent
