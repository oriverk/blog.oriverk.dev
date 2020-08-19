import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { BlogLayout } from '../../components/BlogLayout'
import blogConfig from '../../../blog.config'
import { getTags, getTagPosts } from '../../lib/posts'
import { TagIcons } from '../../components/IconsWrapper'

import { GetStaticProps, GetStaticPaths } from 'next'

export const getStaticPaths: GetStaticPaths = async () => {
  const paths: string[] = getTags().map((tag) => {
    return `/tags/${tag}`
  })
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async (props) => {
  const tag = props.params.tag as string
  const tagPosts = getTagPosts(tag as string)
  return {
    props: {
      tag,
      tagPosts
    }
  }
}

export default function Tag({ tag, tagPosts }: {
  tag: string, tagPosts: any[]
})
{
  return (
    <React.Fragment>
      <BlogLayout>
        <Head>
          <title>{`${tag} | ${blogConfig.baseName}`}</title>
          <meta name='title' content={`${tag} | ${blogConfig.baseName}`} />
          <meta name='description' content={blogConfig.desc} />
          <meta property='og:title' content={`${tag} | ${blogConfig.baseName}`} />
          <meta property='og:description' content={blogConfig.baseDesc} />
          <meta property='og:image' content={`${blogConfig.baseUrl}/assets/prtsc700.jpg`} />
          <meta property='og:url' content={`${blogConfig.baseUrl}/tags/hoge`} />
        </Head>
        <TagIcons />
        <article className='content'>
          <h1>{`${tag} tag Posts`}</h1>
          <ul>
            {tagPosts.map(({ id, create, title, tags }) => (
              <li key={id}>
                <time dateTime={create}>{create}</time>
                <span className='tags'>{tags.map((t) =>
                  (<code key={t}>
                    <Link href='/tags/[tag]' as={`/tags/${t}`}><a>{t}</a></Link></code>))}
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