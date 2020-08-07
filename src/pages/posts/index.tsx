import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { BlogLayout } from '../../components/BlogLayout'
import blogConfig from '../../../blog.config'
import fs from 'fs'
import path from 'path'

import { GetStaticProps } from 'next'

export const getStaticProps: GetStaticProps = async () => {
  const postsData = JSON.parse(fs.readFileSync(
    path.join(process.cwd(), 'gen/postsMap.json'), 'utf8'
  ))

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
        <article className='content'>
          <h1>Blog Posts</h1>
          <ul>
            {postsData.map(({ id, create, title, tags }) => (
              <li key={id}>
                <time dateTime={create}>{create}</time>
                <span className='tags'>{tags.map((tag) =>
                  (<code key={tag}>
                    <Link href='/tags/[tag]' as={`/tags/${tag}`}><a>{tag}</a></Link>
                  </code>))}
                </span>
                <Link href='/posts/[id]' as={`/posts/${id}`}><a><h2>{title}</h2></a></Link>
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

        h2{
          margin: .5rem auto 1.5rem;
          font-weight: 600;
        }

        a {
          color: #D9D9D9;
          text-decoration: underline;
        }

        time {
          margin-right: 1rem;
        }

        .tags {
          display: block;
        }

        .tags a{
          font-size: .8rem;
          color: #50CAF9;
        }

        @media( min-width: 1280px ){
          .tags {
            display: inline;
          }
        }
      `}</style>
    </React.Fragment>
  )
}