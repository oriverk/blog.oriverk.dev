import Head from 'next/head'
import Link from 'next/link'
import { Layout } from '../components/Layout'
import blogConfig from '../../blog.config'

const Component: React.FC = () => {
  return (
    <Layout>
      <Head>
        <title>{`404 | ${blogConfig.shortName}`}</title>
        <meta name='title' content={`404 | ${blogConfig.baseName}`} />
        <meta name='description' content={blogConfig.desc} />
        <meta property='og:title' content={`404 | ${blogConfig.baseName}`} />
        <meta property='og:description' content={blogConfig.desc} />
        <meta property='og:image' content={blogConfig.baseUrl + blogConfig.ogImage} />
        <meta property='og:url' content={ blogConfig.baseUrl + '/404/'} />
      </Head>
      <div style={{ textAlign: 'center' }}>
        <h1>404 - Page Not Found</h1>
        <p><Link href='/'><a>Please go back to Home.</a></Link></p>
      </div>
    </Layout>
  )
}

export default Component

