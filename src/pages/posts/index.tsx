import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { BlogLayout } from '../../components/BlogLayout'
import blogConfig from '../../../blog.config'
import { getSortedPostsData } from '../../lib/posts'
import { PostsIcons } from '../../components/IconsWrapper'
import { Date, OptimizedImages } from '../../utils'

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
      update: string
      tags: string[]
      image: string
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
        <PostsIcons />
          <h1>Blog Posts</h1>
          <div className='posts'>
            {postsData.map(({ id, title, create, update, tags, image }) => (
              <div className='postCard' key={id}>
                <Link href='/posts/[id]' as={`/posts/${id}`} key={id}>
                  <a className='postLink'>
                    <OptimizedImages src={image || '/assets/home/sunrise.jpg'} alt={`post: ${title}`}
                      imgStyle={{ borderRadius: '.5rem .5rem 0 0' }} />
                    <div className='postDesc'>
                      {update ? (
                        <div>updated on <Date dateString={update} /></div>
                      ) : (
                          <div>posted on <Date dateString={create} /></div>
                        )}
                      <h2>{title}</h2>
                    </div>
                  </a>
                </Link>
                <div className='postTags'>
                  {tags.map((tag) => (
                    <Link href='/tags/[tag]' as={`/tags/${tag}`} key={tag}>
                      <a className='tag'>{tag}</a>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </article>
      </BlogLayout>
      <style jsx>{`
        .content {
          width: 95%;
          margin: 0 auto 1rem;
          padding: 5%;
          flex-grow: 1;
        }

        .posts {
          display: grid;
          gap: 1rem;
        }

        @media( min-width: 760px ){
          .content{
            width: 90%;
          }
          .posts {
            display: grid;
            gap: 1.5rem;
            grid-template-columns: repeat(auto-fit, minmax(22rem, 1fr));
          }
        }

        .postCard{
          padding-bottom: 1rem;
          background-color: #424242;
          border-radius: .5rem;
        }
        .postCard:hover{
          border: 1px solid #50CAF9;
        }

        .postLink{
          display: block;
          color: #EEE;
          text-decoration: none;
        }

        .postDesc{
          padding: .5rem;
        }

        h2{
          margin-top: .5rem;
          font-size: 1.25rem;
        }

        .tag{
          text-decoration: none;
          display: inline-block;
          font-size: .8rem;
          border-radius: 2rem;
          border: 1px solid #50CAF9;
          padding: 0.1rem .8rem;
          margin: 0 .5rem;
          color: #EEE;
        }
        .tag:hover, .tag:active{
          background-color: #424242;
        }

        h2{
          margin-bottom: 0;
        }
      `}</style>
    </React.Fragment>
  )
}