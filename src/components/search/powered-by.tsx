import { styled } from 'goober'
import { connectPoweredBy } from 'react-instantsearch-dom'

import { AlgoliaIcon } from 'components/icons'

interface Props {
  className?: string
}

const Component: React.FC<Props> = (props) => {
  const { className } = props
  return (
    <a className={className} href="https://www.algolia.com" target="_blank" rel="noopener noreferrer">
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

export const CustomPoweredBy = connectPoweredBy(ContainerComponent)
