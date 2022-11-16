import { useInstantSearch } from 'react-instantsearch-hooks-web';

export const CustomSearchResults: React.FC = () => {
  const { results, error, status } = useInstantSearch();
  const { nbHits, query } = results;
  let _className = "p-4 text-center"
  let text;

  if (error) {
    _className = _className + ' text-red'
    text = `SEARCH_ERROR ${error.message}`
  } else if (status === "loading" || status === "stalled") {
    text = "Loading ..."
  } else if (!query.length) {
    text = ""
  } else if (nbHits) {
    text = `${nbHits} results were found for ${query}.`
  } else {
    text = `No results for ${query}`
  }

  return (
    <div className={_className}>{text}</div>
  )
}
