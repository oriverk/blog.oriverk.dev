import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useAmp } from 'next/amp'
import { getTags } from '../../lib/posts'
import { BlogLayout } from '../../components/BlogLayout'
import { TagsIcons } from '../../components/IconsWrapper'
import blogConfig from '../../../blog.config'
import { GetStaticProps } from 'next'

export const config = {
  amp: 'hybrid'
}

export const getStaticProps: GetStaticProps = async () => {
  const tags: string[] = getTags()
  return {
    props: {
      tags
    },
  }
}

export default function Tag ({ tags }: { tags: string[] }) {
  const isAmp = useAmp()
  const ogImage = blogConfig.baseUrl + blogConfig.ogImage
  const url = blogConfig.baseUrl + '/tags/'
  return (
    <React.Fragment>
      <BlogLayout isAmp={isAmp}>
        <Head>
          <title>Tags | {blogConfig.shortName}</title>
          <meta name='title' content={`Tags | ${blogConfig.baseName}`} />
          <meta name='description' content={blogConfig.desc} />
          <meta property='og:title' content={`Tags | ${blogConfig.baseName}`} />
          <meta property='og:description' content={blogConfig.desc} />
          <meta property='og:image' content={ogImage} />
          <meta property='og:url' content={ isAmp ? url + '?amp=1' : url } />
        </Head>
        <TagsIcons isAmp={isAmp} />
        <article className='content'>
          <h1>Blog Tags</h1>
          <div className='tags'>
            {tags.map((tag) => (
              <Link href={ isAmp ? `/tags/${tag}/?amp=1` : `/tags/${tag}/` } key={tag}>
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
          display: inline-block;
          min-width: 4rem;
          text-align: center;
          color: #EEE;
          font-size: 1rem;
          text-decoration: none;
          margin: .5rem;
          padding: .1rem .8rem;
          border-radius: 2rem;
          border: 1px solid #50CAF9;
        }
        .tag:hover, .tag:active{
          background-color: #424242;
        }
      `}</style>
    </React.Fragment>
  )
}