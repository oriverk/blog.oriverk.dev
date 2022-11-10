import { styled } from 'goober'
import { usePoweredBy } from 'react-instantsearch-hooks-web'

import { AlgoliaIcon } from 'components/icons'

type Props = {
  className?: string
}

const Component: React.FC<Props> = (props) => {
  const { className } = props
  const { url } = usePoweredBy();
  return (
    <a className={className} href={url} target="_blank" rel="noopener noreferrer">
      <AlgoliaIcon />
    </a>
  )
}

const StyledComponent = styled(Component)`
  display: inline-flex;
`

const ContainerComponent: React.FC = () => {
  return <StyledComponent />
}

export const CustomPoweredBy = ContainerComponent;
