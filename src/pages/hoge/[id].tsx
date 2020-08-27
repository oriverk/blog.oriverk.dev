import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { getAllPostIds, getPostData } from '../../lib/hoge'
import { GetStaticProps, GetStaticPaths } from 'next'

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params.id as string)
  // await is only for remark
  return {
    props: {
      postData
    }
  }
}

export default function Post({ postData
}: {
  postData: {
    id: string
    title: string
    create: string
    tags?: string[]
    image?: string
    contentHtml: string
  }
}) {
  const tags = postData.tags

  return (
    <React.Fragment>
      <Head>
        <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.0.3/styles/vs2015.min.css' />
      </Head>
      <article className='post content'>
        <h1>{postData.title}</h1>
        <div>
          <time dateTime={postData.create}>posted on: {postData.create}</time>
          <br />
          <span className='tags'>{tags.map((tag) => (<code key={tag}><Link href={`/tags/${tag}`}><a>{tag}</a></Link></code>))}</span>
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} className='markdown' />
      </article>
      <style jsx>{`
        .content {
          width: 100%;
          max-width: 1000px;
          margin: 0 auto 1rem;
          padding: 5%;
          flex-grow: 1;
        }
        .content .tags {
          display: block;
          text-align: center;
        }
        
        h1{
          font-size: 1.5rem;
          text-decoration: underline #50CAF9;
        }
      `}</style>
    </React.Fragment>
  )
}