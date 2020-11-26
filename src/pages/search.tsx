import css from 'styled-jsx/css';
import { Layout } from '../components/Layout';
import { AlgoliaSearch } from '../components/search/AlgoliaSearch'
import { CustomHead } from '../components/general/Head'

const style = css`
.content {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto 1rem;
  padding: 5%;
  flex-grow:1;
}

.search {
}
`

const Component: React.FC = () => {
  return (
    <Layout>
      <CustomHead pageUrl='/search/' pageTitle='Search posts' pageDescription='Search posts in English' />
      <article className='content'>
        <h1>Search posts</h1>
        <div className='search'>
          <AlgoliaSearch />
        </div>
      </article>
      <style jsx>{style}</style>
    </Layout>
  )
}

export default Component