import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/Layout'
// import utilStyles from '../styles/utils.module.css'
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
          <title>Blog Index</title>
        </Head>
        <article className="content">
          <h1>Blog Posts</h1>
          <ul>
            {allPostsData.map(({ id, date, title }) => (
              // <li className={utilStyles.listItem} key={id}>
              <li key={id}>
                <Link href="/posts/[id]" as={`posts/${id}`}>
                  <a><h2>{title}</h2></a>
                </Link>
                <br/>
                {/* <small className={utilStyles.lightText}> */}
                <time dateTime={date}>{date}</time>
              </li>
            ))}
          </ul>
        </article>
      </Layout>
      <style jsx>{`
        .content {
          width: 100%;
          max-width: 800px;
          margin: 0 auto 10px auto;
          padding: 5%;
          flex-grow: 1;
        }
        h1{
          text-align: center;
        }
        a {
          color: #FFF;
          {/* border-bottom: 0.25rem solid #50CAF9; */}
        }
      `}</style>
    </>
  )
}