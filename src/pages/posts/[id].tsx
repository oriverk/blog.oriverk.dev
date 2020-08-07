import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { BlogLayout } from '../../components/BlogLayout'
import { getPostIds, getPostData } from '../../lib/posts'
// import { getFetchPath } from '../../components/HeaderImg'
import blogConfig from '../../../blog.config'

import { GetStaticProps, GetStaticPaths } from 'next'

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getPostIds()
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
  const pageTags = tags ? tags.join(' ') : 'React, Next.js'
  // const pageImage = postData.image ? postData.image : '/assets/prtsc700.jpg'
  // const ogImage:string = getFetchPath(postData.title, 'dark', 0, tags)
  return (
    <React.Fragment>
      <BlogLayout>
        <Head>
          <title>{`${postData.title} | ${blogConfig.shortName}`}</title>
          <meta name='title' content={`${postData.title} | ${blogConfig.baseName}`} />
          <meta name='description' content={pageTags} />
          <meta property='og:title' content={`${postData.title} | ${blogConfig.baseName}`} />
          <meta property='og:description' content={pageTags} />
          {/* <meta property='og:image' content={`${blogConfig.baseUrl}/${pageImage}`} /> */}
          {/* <meta property='og:image' content={ogImage} /> */}
          <meta property='og:url' content={`${blogConfig.baseUrl}/posts/${postData.id}`} />
          <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.0.3/styles/vs2015.min.css' />
        </Head>
        <article className='content'>
          <h1>{postData.title}</h1>
          <div>
            <time dateTime={postData.create}>posted on: {postData.create}</time>
            <br />
            <span className='tags'>{tags.map((tag) => (<code key={tag}><Link href={`/tags/${tag}`}><a>{tag}</a></Link></code>))}</span>
          </div>
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} className='markdown' />
        </article>
      </BlogLayout>
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

        {/* .sns {
          position: absolute;
          left: 50%;
          transform: translate(-50%, 0);
          margin: 1rem 0;
        } */}
      `}</style>
    </React.Fragment>
  )
}