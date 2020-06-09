import Head from 'next/head'
import Link from 'next/link'
import { Layout } from '../../components/Layout'
import { getPostsTags } from '../../lib/posts'

const manifest = require('../../../public/manifest.json')

export async function getStaticProps() {
  const postsTags = getPostsTags()
  return {
    props: {
      postsTags
    }
  }
}

export default function ({ postsTags }) {
  return (
    <>
      <Layout>
        <Head>
          <title>Tags | {manifest.name}</title>
          <meta name='title' content={`Tags | ${manifest.name}`} />
          <meta name='description' content={manifest.description} />
          <meta property='og:title' content={`Tags | ${manifest.name}`} />
          <meta property='og:description' content={manifest.description} />
          <meta property='og:image' content={`${manifest.vercel}/assets/prtsc700.jpg`} />
          <meta property='og:url' content={`${manifest.vercel}/tags`} />
        </Head>
        <article className='content'>
          <h1>Blog Tags</h1>
          <div className='tags'>
            {postsTags.map((tag) => (<span key={tag} className={tag}><code><Link href='/tags/[tag]' as={`/tags/${tag}`}><a>{tag}</a></Link></code></span>))}
          </div>
        </article>
      </Layout>
      <style jsx>{`
        .content {
          width: 100%;
          max-width: 1000px;
          margin: 0 auto 1rem;
          padding: 5%;
          flex-grow: 1;
        }

        .tags a{
          font-size: .8rem;
        }
      `}</style>
    </>
  )
}