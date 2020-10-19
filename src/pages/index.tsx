import Head from 'next/head'
import { Layout } from '../components/Layout'
import { Top, About, History, Works } from '../components/HomeContents'
import blogConfig from '../../blog.config'

const Component: React.FC = () => {
  return (
    <Layout>
      <Head >
        <title>{blogConfig.baseName}</title>
        <meta name='title' content={blogConfig.baseName} />
        <meta name='description' content={blogConfig.desc} />
        <meta property='og:title' content={blogConfig.baseName} />
        <meta property='og:description' content={blogConfig.desc} />
        <meta property='og:image' content={blogConfig.baseUrl + blogConfig.ogImage} />
        <meta property='og:url' content={ blogConfig.baseUrl + '/' } />
      </Head>
      <Top />
      <About />
      <History />
      <Works />
    </Layout>
  )
}

export default Component