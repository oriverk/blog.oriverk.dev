import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { BlogLayout } from '../../components/BlogLayout'
import { getAllPostIds, getPostData } from '../../lib/posts'
// import { getFetchPath } from '../../components/HeaderImg'
import blogConfig from '../../../blog.config'
import { PostIcons } from '../../components/IconsWrapper'
import { Date } from '../../components/general/Date'
import { Image } from '../../components/general/Image'

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
      content: string
  }
  }) {
  const pageTags = postData.tags.join(' ') || 'react nextjs'
  const ogImage = !postData.image ? blogConfig.baseUrl + blogConfig.ogImage :
    postData.image.split('')[0] === '/' ?
      blogConfig.baseUrl + postData.image : blogConfig.baseUrl + '/' + postData.image
  
  return (
    <React.Fragment>
      <BlogLayout post title postId>
        <Head>
          <title>{`${postData.title} | ${blogConfig.shortName}`}</title>
          <meta name='title' content={`${postData.title} | ${blogConfig.baseName}`} />
          <meta name='description' content={pageTags} />
          <meta property='og:title' content={`${postData.title} | ${blogConfig.baseName}`} />
          <meta property='og:description' content={pageTags} />
          <meta property='og:image' content={ogImage} />
          <meta property='og:url' content={`${blogConfig.baseUrl}/posts/${postData.id}`} />
          <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.0.3/styles/vs2015.min.css' />
        </Head>
        <article className='content'>
        <PostIcons postTitle={postData.title} postId={postData.id} postTags={postData.tags}/>
          <h1>{postData.title}</h1>
          <div>
            <div>post on <Date dateString={postData.create} /></div>
            <div className='tags'>
              {postData.tags.map((tag) => (
                <Link href='/tags[tag]' as={`/tags/${tag}`} key={tag}>
                  <a className='tag'>{tag}</a>
                </Link>
              ))}</div>
          </div>
          {postData.image && (
            <Image src={postData.image} alt='post cover image' anchor />
          )}
          <div dangerouslySetInnerHTML={{ __html: postData.content }} className='markdown' />
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
        
        h1{
          font-size: 1.5rem;
          text-decoration: underline #50CAF9;
          color: #D9D9D9;
        }

        .tags{
          margin-bottom: 1rem;
        }

        .tag{
          text-decoration: none;
          display: inline-block;
          font-size: .9rem;
          border-radius: 2rem;
          border: 1px solid #50CAF9;
          padding: 0.1rem 1rem;
          margin: .5rem;
          margin-bottom: 0;
          color: #EEE;
        }
        .tag:hover, .tag:active{
          background-color: #424242;
        }
      `}</style>
    </React.Fragment>
  )
}