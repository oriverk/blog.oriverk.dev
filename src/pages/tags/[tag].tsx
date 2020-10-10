import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useAmp } from 'next/amp'
import { GetStaticProps, GetStaticPaths } from 'next'
import { getTags, getTagPosts } from '../../lib/posts'
import { BlogLayout } from '../../components/BlogLayout'
import { CustomImg, CustomAmpImg } from '../../components/general/Image'
import { Date } from '../../components/general/Date'
import { TagIcons } from '../../components/IconsWrapper'
import blogConfig from '../../../blog.config'

export const config = {
  amp: 'hybrid'
}

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
  const postsData = getTagPosts(tag as string)
  return {
    props: {
      tag,
      postsData,
    },
    revalidate: 30,
  }
}

type Props = {
  tag: string,
  postsData: {
    id: string,
    title: string,
    create: string,
    update: string,
    tags?: string[],
    image?: string
  }[]
}

export default function Tag({ tag, postsData }: Props) {
  const isAmp = useAmp()
  const ogImage = blogConfig.baseUrl + blogConfig.ogImage
  const url = `${blogConfig.baseUrl}/tags/${tag}/`

  return (
    <React.Fragment>
      <BlogLayout>
        <Head>
          <title>{`${tag} | ${blogConfig.baseName}`}</title>
          <meta name='title' content={`${tag} | ${blogConfig.baseName}`} />
          <meta name='description' content={blogConfig.desc} />
          <meta property='og:title' content={`${tag} | ${blogConfig.baseName}`} />
          <meta property='og:description' content={blogConfig.baseDesc} />
          <meta property='og:image' content={ogImage} />
          <meta property='og:url' content={ isAmp ? url + '?amp=1' : url } />
        </Head>
        <TagIcons isAmp={isAmp} />
        <article className='content'>
          <h1>{`${tag} Posts`}</h1>
          <div className='posts'>
            {postsData.map(({ id, title, create, update, tags, image }) => (
              <div className='postCard' key={id}>
                <Link href={ isAmp ? `/posts/${id}/?amp=1` : `/posts/${id}/`}>
                  <a className='postLink'>
                    <div className='imgOuter'>
                      {isAmp ? (
                        <CustomAmpImg src={image || '/assets/home/sunrise.jpg'} alt={title} className='cardImg' />
                      ) :
                        (
                        <CustomImg src={image || '/assets/home/sunrise.jpg'} alt={title} className='cardImg' />
                      )}
                    </div>
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
                <div className='tags'>
                  {tags.map((tag) => (
                    <Link href={ isAmp ? `/tags/${tag}/?amp=1` : `/tags/${tag}/`} key={tag}>
                      <a className='tag' key={tag}>{tag}</a>
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
        }

        .posts {
          display: grid;
          gap: 1rem;
        }

        .postCard{
          padding-bottom: 1rem;
          background-color: #424242;
          border-radius: .5rem;
          max-width: 35rem;
        }
        .postCard:hover{
          border: 1px solid #50CAF9;
        }

        .postLink{
          display: block;
          color: #EEE;
          text-decoration: none;
        }

        .imgOuter{
          position: relative;
          width: 100%;
        }
        .imgOuter:before{
          content: '';
          display: block;
          padding-top: 66%;
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
      `}</style>
    </React.Fragment>
  )
}