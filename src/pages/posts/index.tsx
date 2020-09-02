import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { BlogLayout } from '../../components/BlogLayout'
import blogConfig from '../../../blog.config'
import { getSortedPostsData } from '../../lib/posts'
import { PostsIcons } from '../../components/IconsWrapper'
import { Date } from '../../utils'

import { GetStaticProps } from 'next'

export const getStaticProps: GetStaticProps = async () => {
  const postsData = getSortedPostsData()
  return {
    props: {
      postsData
    }
  }
}

export default function ({
  postsData, posts
}: {
    postsData: {
      id: string
      title: string
      create: string
      tags: string[]
  }[],
  posts?: boolean
  }) {
  return (
    <React.Fragment>
      <BlogLayout posts>
        <Head>
          <title>Blog | {blogConfig.shortName}</title>
          <meta name='title' content={`Blog | ${blogConfig.baseName}`} />
          <meta name='description' content={blogConfig.desc} />
          <meta property='og:title' content={`Blog | ${blogConfig.baseName}`} />
          <meta property='og:description' content={blogConfig.desc} />
          <meta property='og:image' content={`${blogConfig.baseUrl}/assets/prtsc700.jpg`} />
          <meta property='og:url' content={`${blogConfig.baseUrl}/posts`} />
        </Head>
        <PostsIcons />
        <article className='content'>
          <h1>Blog Posts</h1>
          <ul>
            {postsData.map(({ id, create, title, tags }) => (
              <li key={id}>
                <div>post on <Date dateString={create} /></div>
                <span className='tags'>
                  {tags.map((tag) => (
                    <Link href='/tags/[tag]' as={`/tags/${tag}`} key={tag}>
                      <a className='tag'>{tag}</a>
                    </Link>
                  ))}
                </span>
                <Link href='/posts/[id]' as={`/posts/${id}`}>
                  <a className='title'><h2>{title}</h2></a>
                </Link>
              </li>
            ))}
          </ul>
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

        .tag{
          text-decoration: none;
          display: inline-block;
          font-size: .8rem;
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

        .title {
          color: #D9D9D9;
          text-decoration: underline;
        }

        h2{
          margin: .5rem auto 1.5rem;
          font-weight: 600;
        }
      `}</style>
    </React.Fragment>
  )
}