import Head from 'next/head'
import PostLayout from '../../components/PostLayout'
// import Date from '../../components/date'
import { getAllPostIds, getPostData } from '../../lib/posts'
import utilStyles from '../../styles/utils.module.css'

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id)
  // ↑await is for reamrk. if not use remark, remove async
  return {
    props: {
      postData
    }
  }
}

export default function Post({ postData }) {
  return (
    <>
      <PostLayout>
        <Head>
          <title>{postData.title}</title>
        </Head>
        <article className="content">
          <h1 className={utilStyles.headingXl}>{postData.title}</h1>
          <div className={utilStyles.lightText}>
            {/* <Date dateString={postData.date} /> */}
            <time dateTime={postData.date}>posted on: {postData.date}</time>
          </div>
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml}} />
        </article>
      </PostLayout>
      <style jsx>{`
        .content {
          width: 100%;
          max-width: 1000px;
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