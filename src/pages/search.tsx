import Head from 'next/head';
import css from 'styled-jsx/css';
import { BlogLayout } from '../components/BlogLayout';
import blogConfig from '../../blog.config';
import { AlgoliaSearch } from '../components/search/AlgoliaSearch'

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
    <BlogLayout>
      <Head >
        <title>{blogConfig.baseName}</title>
        <meta name='title' content={blogConfig.baseName} />
        <meta name='description' content={blogConfig.desc} />
        <meta property='og:title' content={blogConfig.baseName} />
        <meta property='og:description' content={blogConfig.desc} />
        <meta property='og:image' content={blogConfig.baseUrl + blogConfig.ogImage} />
        <meta property='og:url' content={blogConfig.baseUrl + '/'} />
      </Head>
      <article className='content'>
        <h1>Search posts</h1>
        <div className='search'>
          <AlgoliaSearch />
        </div>
      </article>
      <style jsx>{style}</style>
    </BlogLayout>
  )
}

export default Component