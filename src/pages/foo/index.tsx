import React from 'react'
import Link from 'next/link'
import { getSortedPostsData } from '../../lib/foo'
import { GetStaticProps } from 'next'

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

export default function ({
  allPostsData, posts
}: {
  allPostsData: {
    id: string
    title: string
    create: string
    tags: string[]
  }[],
  posts?: boolean
}) {
  return (
    <React.Fragment>
        <article className='content'>
          <h1>Blog Posts</h1>
          <ul>
            {allPostsData.map(({ id, create, title, tags }) => (
              <li key={id}>
                <time dateTime={create}>{create}</time>
                <span className='tags'>{tags.map((tag) =>
                  (<code key={tag}>
                    <Link href='/tags/[tag]' as={`/tags/${tag}`}><a>{tag}</a></Link>
                  </code>))}
                </span>
                <Link href='/hoge/[id]' as={`/hoge/${id}`}><a><h2>{title}</h2></a></Link>
              </li>
            ))}
          </ul>
        </article>
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