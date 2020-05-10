import Head from 'next/head'
import Layout from '../components/Layout'
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
      <article>
        <h1>Blog</h1>
        <ul>
          {allPostsData.map(({ id, date, title }) => (
            <li key={id}>
              {title}
              <br />
              {id}
              <br />
              {date}
            </li>
          ))}
        </ul>
      </article>
    </Layout>
  )
}