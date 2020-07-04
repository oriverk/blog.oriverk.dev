import Head from 'next/head'
import Link from 'next/link'
import { Layout } from '../../components/Layout'
import blogConfig from '../../../blog.config'
import { getAllTags, getTagPosts } from '../../lib/posts'

export function getStaticPaths() {
  const paths = getAllTags().map((tag) => {
    return `/tags/${tag}`
  })
  return {
    paths,
    fallback: false
  }
}

export function getStaticProps({ params }) {
  const tagPosts = getTagPosts(params.tag)
  return {
    props: {
      tagPosts
    }
  }
}

export default function Tag({tagPosts}) {
  
  return (
    <React.Fragment>
      <Layout>
        <Head>
          {/* <title>{`${tag} | ${blogConfig.baseName}`}</title> */}
          <meta name='title' content={` Tag | ${blogConfig.baseName}`} />
          <meta name='description' content={blogConfig.desc} />
          <meta property='og:title' content={`Tag | ${blogConfig.baseName}`} />
          <meta property='og:description' content={blogConfig.baseDesc} />
          <meta property='og:image' content={`${blogConfig.baseUrl}/assets/prtsc700.jpg`} />
          <meta property='og:url' content={`${blogConfig.baseUrl}/tags/hoge`} />
        </Head>
        <article className='content'>
          <h1>Tag</h1>
          <ul>
            {tagPosts.map(({ id, create, title, tags }) => (
              <li>
                <time dateTime={create}>{create}</time>
                <span className='tags'>{tags.map((tag) => (<code key={tag}><Link href='/tags/[tag]' as={`/tags/${tag}`}><a>{tag}</a></Link></code>))}</span>
                <Link href='/posts/[id]' as={`/posts/${id}`}><a><h2>{title}</h2></a></Link>
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
    </React.Fragment>
  )
}