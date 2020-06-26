import Head from 'next/head'
import Link from 'next/link'
import { Layout } from '../../components/Layout'
import { getPostsTags } from '../../lib/posts'

const blog = require('../../../blog.json')

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
          <title>Tags | {blog.short_name}</title>
          <meta name='title' content={`Tags | ${blog.baseName}`} />
          <meta name='description' content={blog.baseDesc} />
          <meta property='og:title' content={`Tags | ${blog.baseName}`} />
          <meta property='og:description' content={blog.baseDesc} />
          <meta property='og:image' content={`${blog.baseUrl}/assets/prtsc700.jpg`} />
          <meta property='og:url' content={`${blog.baseUrl}/tags`} />
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