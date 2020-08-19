import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { BlogLayout } from '../../components/BlogLayout'
import { getTags } from '../../lib/posts'
import blogConfig from '../../../blog.config'
import { TagsIcons } from '../../components/IconsWrapper'

import { GetStaticProps } from 'next'

export const getStaticProps: GetStaticProps = async () => {
  const tags: string[] = getTags()
  return {
    props: {
      tags
    }
  }
}

export default function ({ tags }: { tags: string[] }) {
  return (
    <React.Fragment>
      <BlogLayout>
        <Head>
          <title>Tags | {blogConfig.shortName}</title>
          <meta name='title' content={`Tags | ${blogConfig.baseName}`} />
          <meta name='description' content={blogConfig.desc} />
          <meta property='og:title' content={`Tags | ${blogConfig.baseName}`} />
          <meta property='og:description' content={blogConfig.desc} />
          <meta property='og:image' content={`${blogConfig.baseUrl}/assets/prtsc700.jpg`} />
          <meta property='og:url' content={`${blogConfig.baseUrl}/tags`} />
        </Head>
        <TagsIcons />
        <article className='content'>
          <h1>Blog Tags</h1>
          <div className='tags'>
            {tags.map((tag) => (
              <Link href='/tags/[tag]' as={`/tags/${tag}`} key={tag}>
                <a className='tag'>{tag}</a>
              </Link>
            ))}
          </div>
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
          color: #EEE;
        }
        .tag:hover, .tag:active{
          background-color: #424242;
        }
      `}</style>
    </React.Fragment>
  )
}