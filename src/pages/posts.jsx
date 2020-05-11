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
    <Layout>
      <Head>
        <title>Blog Index</title>
      </Head>
      <article>
        <h1>Blog</h1>
        <ul>
          {allPostsData.map(({ id, date, title }) => (
            // <li className={utilStyles.listItem} key={id}>
            <li key={id}>
              <Link href="/posts/[id]" as={`posts/${id}`}>
                <a><h2>{title}</h2></a>
              </Link>
              <br />
              {/* <small className={utilStyles.lightText}> */}
              <time dateTime={date}>{date}</time>
            </li>
          ))}
        </ul>
      </article>
    </Layout>
  )
}