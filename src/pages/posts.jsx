import Head from 'next/head'
import Link from 'next/link'
import { Layout } from '../components/Layout'
import { getSortedPostsData } from '../lib/posts'

const manifest = require('../../public/manifest.json')

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

export default function Posts({ allPostsData }) {
  // console.log(allPostsData)
  return (
    <>
      <Layout>
        <Head>
          <title>Blog | {manifest.name}</title>
          <meta name='title' content={`Blog | ${manifest.name}`} />
          <meta name='description' content={manifest.description} />
          <meta property='og:title' content={`Blog | ${manifest.name}`} />
          <meta property='og:description' content={manifest.description} />
          <meta property='og:image' content={`${manifest.vercel}/assets/prtsc700.jpg`} />
          <meta property='og:url' content={`${manifest.vercel}/posts`} />
        </Head>
        <article className='content'>
          <h1>Blog Posts</h1>
          <ul>
            {allPostsData.map(({ id, date, title, LowerCaseTags }) => (
              <li key={id}>
                <time key={id} dateTime={date}>{date}</time>
                <span key={id} className='tags'>{LowerCaseTags.map((tag) => (<code key={id}><Link key={id} href={`/tags/${tag}`}><a>{tag}</a></Link></code>))}</span>
                <Link key={id} href='/posts/[id]' as={`posts/${id}`}><a key={id}><h2 key={id}>{title}</h2></a></Link>
              </li>
            ))}
          </ul>
        </article>
      </Layout>
      <style jsx>{`
        .content {
          width: 100%;
          max-width: 950px;
          margin: 0 auto 1rem;
          padding: 5%;
          flex-grow: 1;
        }
        h1{
          text-align: center;
        }
        h2{
          margin: .5rem auto 1.5rem;
          font-weight: 600;
        }
        ul{
          padding-left: 1.25rem;
        }
        a {
          color: #D9D9D9;
          text-decoration: underline;
        }
        code{
          /* color: #DDD; */
          display: inline-block;
          margin: 0 .5rem;
          padding: 0 .3rem;
          background-color: #555;
        }
        .tags a{
          font-size: .8rem;
          color: #50CAF9
        }
      `}</style>
    </>
  )
}