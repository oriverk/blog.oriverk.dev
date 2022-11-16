import { usePoweredBy } from 'react-instantsearch-hooks-web'

import { AlgoliaIcon } from '@src/components/icons'

export const CustomPoweredBy: React.FC = () => {
  const { url } = usePoweredBy()
  return (
    <a className="flex justify-end" href={url} target="_blank" rel="noopener noreferrer">
      <AlgoliaIcon />
    </a>
  )
}
