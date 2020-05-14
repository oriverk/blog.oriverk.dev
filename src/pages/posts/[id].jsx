import Head from 'next/head'
import PostLayout from '../../components/PostLayout'
// import Date from '../../components/date'
import { getAllPostIds, getPostData } from '../../lib/posts'

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
          <h1>{postData.title}</h1>
          <div>
            <time dateTime={postData.date}>posted on: {postData.date}</time>
          </div>
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml}} />
        </article>
      </PostLayout>
      <style jsx global>{`
        a{
          color: #F48FB1;
        }
        code{
          display: inline-block;
          margin: 0 1rem;
          background-color: #555;
        }
        pre{
          border: .8px solid grey;
          border-radius: 0.25rem;
          display: block;
          white-space: pre;
          background-color: #272c34;
         
          width: 100%;
          max-width: 1000px;
          margin-bottom: 2rem;
          padding: 1rem;
          overflow: auto;
        }
        pre code{
          background-color: #272c34;
          color: white;
          font-size: 1rem;
          font-weight: 400;
          word-break: break-word;
          line-height: 1.5;
        }
        source, img{
          display: block;
          margin: 2rem auto;
          background-color: #424242;
          width: 95%;
        }
      `}</style>
      <style jsx>{`
        .content {
          width: 100%;
          max-width: 1000px;
          margin: 0 auto 10px auto;
          padding: 5%;
          flex-grow: 1;
        }
        h1{
          font-size: 1.5rem;
          text-align: center;
        }
      `}</style>
    </>
  )
}