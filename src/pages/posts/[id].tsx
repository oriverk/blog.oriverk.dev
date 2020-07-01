import Head from 'next/head'
import Link from 'next/link'

import { PostLayout } from '../../components/PostLayout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import { HatenaIcon, TwitterIcon } from '../../utils/svgIcon'
import { IconButton } from '../../utils/utils'

import { GetStaticProps, GetStaticPaths } from 'next' 

const blog = require('../../../blog.json')

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
      LowerCaseTags?: string[]
      image?: string
      contentHtml: string
  }
}) {
  const tags = postData.LowerCaseTags
  const pageTags = tags ? tags.join(' ') : 'React, Next.js'
  const pageImage = postData.image ? postData.image : '/assets/prtsc700.jpg'
  
  return (
    <>
      <PostLayout>
        <Head>
          <title>{`${postData.title} | ${blog.short_name}`}</title>
          <meta name='title' content={`${postData.title} | ${blog.short_name}`} />
          <meta name='description' content={pageTags} />
          <meta property='og:title' content={`${postData.title} | ${blog.baseName}`} />
          <meta property='og:description' content={pageTags} />
          <meta property='og:image' content={`${blog.baseUrl}/${pageImage}`} />
          <meta property='og:url' content={`${blog.baseUrl}/posts/${postData.id}`} />
          <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.0.3/styles/vs2015.min.css' />
        </Head>
        <article className='content'>
          <h1>{postData.title}</h1>
          <div>
            <time dateTime={postData.create}>posted on: {postData.create}</time>
            <br />
            <span className='tags'>{tags.map((tag) => (<code key={tag}><Link href={`/tags/${tag}`}><a>{tag}</a></Link></code>))}</span>
          </div>
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} className='markdonw' />
          {/* <div>`${postData.jsx}`</div> */}
          <div className='sns'>
            <IconButton label='twitter share button' href={`https://twitter.com/share?text=${postData.title}&hashtags=react,nextjs&url=${blog.baseUrl}/posts/${postData.id}&related=${blog.sns.tiwtter}`}>
              <TwitterIcon />
            </IconButton>
            <IconButton label='hatena share button' href={`https://b.hatena.ne.jp/entry/${blog.baseUrl}/posts/${postData.id}`}>
              <HatenaIcon />
            </IconButton>
          </div>
        </article>
      </PostLayout>
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

        .sns {
          position: absolute;
          left: 50%;
          transform: translate(-50%, 0);
          margin: 1rem 0;
        }
      `}</style>
    </>
  )
}