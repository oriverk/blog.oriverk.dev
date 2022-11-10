import { useInstantSearch } from 'react-instantsearch-hooks-web';
import { styled } from 'goober'

type Props = {
  className?: string
}

const Component = (props: Props) => {
  const { className } = props;
  const { results, error, status } = useInstantSearch();
  const { nbHits, query } = results;

  if (error) {
    return <div className={className + ' error'}>SEARCH_ERROR: {error.message}</div>
  }

  if (status === 'loading' || status === 'stalled') {
    return <div className={className}>Loading ...</div>
  }

  if (!query?.length) {
    return <div className={className} />
  }

  if (nbHits) {
    return (
      <div className={className}>
        {nbHits} results were found for {query}.
      </div>
    )
  } else {
    return <div className={className}>No results for {query}</div>
  }
}

const StyledComponent = styled(Component)`
  padding: 1rem;
  text-align: center;
  &.error {
    color: red;
  }
`

const ContainerComponent: React.FC = () => <StyledComponent />

export const CustomSearchResults = ContainerComponent
