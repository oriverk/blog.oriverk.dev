import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { Layout } from '../../components/Layout'

// import { getPostsWithTag } from '../../lib/posts'
// import { getAllPostIds, getPostData } from '../../lib/posts'

const blog = require('../../../blog.json')

// const tag = () => {
//   const router = useRouter()
//   return router.query
// }

// export async function getStaticPaths({tag}) {
//   const allPostsWithTag = getPostsWithTag({tag})
//   const paths = allPostsWithTag.map((id) => (allPostsWithTag.id))
//   return {
//     paths,
//     fallback: false,
//   }
// }

// export async function getStaticProps({ tag }) {
//   const allPostsWithTag = getPostsWithTag(tag)
//   return {
//     props: {
//       allPostsWithTag
//     }
//   }
// }

export default function Tag() {
  // console.log(allPostsWithTag)
  const router = useRouter()
  const { tag } = router.query
  return (
    <>
      <Layout>
        <Head>
          <title>{`${tag} | ${blog.baseName}`}</title>
          <meta name='title' content={` Tag | ${blog.baseName}`} />
          <meta name='description' content={blog.baseDesc} />
          <meta property='og:title' content={`Tag | ${blog.baseName}`} />
          <meta property='og:description' content={blog.baseDesc} />
          <meta property='og:image' content={`${blog.baseUrl}/assets/prtsc700.jpg`} />
          <meta property='og:url' content={`${blog.baseUrl}/tags/hoge`} />
        </Head>
        <article className='content'>
          <h1>Tag: {tag}</h1>
          <h2>Sorry, this page is under construction ...</h2>
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

        h2 {
          margin: .5rem auto 1.5rem;
          font-weight: 600;
          text-align: center;
        }

        ul {
          padding-left: 1.25rem;
        }

        a {
          color: #D9D9D9;
          text-decoration: underline;
        }

        code {
          /* color: #DDD; */
          display: inline-block;
          margin: 0 .5rem;
          padding: 0 .3rem;
          background-color: #555;
        }

        .tags a {
          font-size: .8rem;
          color: #50CAF9
        }
      `}</style>
    </>
  )
}