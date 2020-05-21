import Head from 'next/head'
import Link from 'next/link'
import { Layout } from '../components/Layout'
import { getSortedPostsData } from '../lib/posts'

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

export default function Index({allPostsData}) {
  return (
    <>
      <Layout>
        <Head>
          <title>Blog | Kawano Yudai's site</title>
          <meta name='title' content="Blog | Kawano Yudai's site" />
          <meta name='description' content="My name is Kawano Yudai. I majored Botanics, Agricultural Engineering and studied crop row detection tech by image processing. Now, I'm seeking job as developer in Japan." />
          <meta property='og:title' content="Blog | Kawano Yudai's site" />
          <meta property='og:description' content="My name is Kawano Yudai. I majored Botanics, Agricultural Engineering and studied crop row detection tech by image processing. Now, I'm seeking job as developer in Japan." />
          <meta property='og:image' content='./assets/prtsc700.jpg' />
          <meta property='og:url' content='/' />
        </Head>
        <article className='content'>
          <h1>Blog Posts</h1>
          <ul>
            {allPostsData.map(({ id, date, title }) => (
              <li key={id}>
                <time dateTime={date}>{date}</time>
                <Link href='/posts/[id]' as={`posts/${id}`}>
                  <a><h2>{title}</h2></a>
                </Link>
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
        }
        ul{
          padding-left: 1.25rem;
        }
        a {
          color: #FFF;
        }
      `}</style>
    </>
  )
}