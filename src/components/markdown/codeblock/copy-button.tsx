import { useCopyToClipboard } from 'react-use'
import { styled } from 'goober'

interface PasssedProps {
  code: string
}

interface Props extends PasssedProps {
  className?: string
}

const Component: React.VFC<Props> = ({ className, code }) => {
  const [state, copyToClipboard] = useCopyToClipboard()

  return (
    <button className={className} onClick={() => copyToClipboard(code)}>
      {!state.error && state.value ? 'Copied!' : 'Copy'}
    </button>
  )
}

const StyledComponent = styled(Component)``

const ContainerComponent: React.VFC<PasssedProps> = (props) => <StyledComponent {...props} />

export const CopyButton = ContainerComponent
