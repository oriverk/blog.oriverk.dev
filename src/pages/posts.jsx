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

export default function Posts({ allPostsData, posts }) {
  return (
    <>
      <Layout posts>
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
                <time dateTime={date}>{date}</time>
                <span className='tags'>{LowerCaseTags.map((tag) => (<code key={tag}><Link href='/tags/[tag]' as={`/tags/${tag}`}><a>{tag}</a></Link></code>))}</span>
                <Link href='/posts/[id]' as={`/posts/${id}`}><a><h2>{title}</h2></a></Link>
              </li>
            ))}
          </ul>
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

        h2{
          margin: .5rem auto 1.5rem;
          font-weight: 600;
        }

        a {
          color: #D9D9D9;
          text-decoration: underline;
        }

        .tags {
          display: block;
        }

        .tags a{
          font-size: .8rem;
          color: #50CAF9
        }

        @media( min-width: 1280px ){
          .tags {
            display: inline;
          }
        }
      `}</style>
    </>
  )
}