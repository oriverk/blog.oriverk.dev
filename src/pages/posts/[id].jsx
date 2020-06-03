import Head from 'next/head'
import Link from 'next/link'

import { PostLayout } from '../../components/PostLayout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import { HatenaIcon, TwitterIcon } from '../../utils/svgIcon'

const manifest = require('../../../public/manifest.json')

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id)
  // await is for reamrk. if not use remark, remove async
  return {
    props: {
      postData
    }
  }
}

export default function Post({ postData }) {
  const pageTitle = `${postData.title} | ${manifest.name}`
  const tags = postData.LowerCaseTags
  const pageTags = tags ? tags.join(' ') : 'React, Next.js'
  const pageImageUrl = postData.image ? postData.image : '/assets/prtsc700.jpg'
  
  return (
    <>
      <PostLayout>
        <Head>
          <title>{pageTitle}</title>
          <meta name='title' content={pageTitle} />
          <meta name='description' content={pageTags} />
          <meta property='og:title' content={pageTitle} />
          <meta property='og:description' content={pageTags} />
          <meta property='og:image' content={`${manifest.vercel}${pageImageUrl}`} />
          <meta property='og:url' content={`${manifest.vercel}/posts/${postData.id}`} />
          <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.0.3/styles/vs2015.min.css' />
        </Head>
        <article className='content'>
          <h1>{postData.title}</h1>
          <div>
            <time dateTime={postData.date}>posted on: {postData.date}</time>
            <wbr />
            <span>{tags.map((tag) => (<code key={tag}><Link href={`/tags/${tag}`}><a>{tag}</a></Link></code>))}</span>
          </div>
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
          {/* <div>`${postData.jsx}`</div> */}
          <div className='sns'>
            <button className='twitter'>
              <a href={`https://twitter.com/share?text=${postData.title}&hashtags=react,nextjs&url=https://next-portfolio-blue.now.sh/posts/${postData.id}&related=not_you_die`}
                target='_blank' rel='noopener noreferrer'><TwitterIcon /></a>
            </button>
            <button className='hatena'>
              <a href={`https://b.hatena.ne.jp/entry/https://next-portfolio-blue.now.sh/posts/${postData.id}`} className='hatena-bookmark-button' data-hatena-bookmark-layout='touch-counter'
                title={postData.title} target='_blank' rel='noopener noreferrer'><HatenaIcon /></a>
            </button>
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
        
        h1{
          font-size: 1.5rem;
        }

        .sns {
          position: absolute;
          left: 50%;
          transform: translate(-50%, 0);
          margin: 1rem 0;
        }
        .twitter, .hatena {
          float: left;
          margin: 0 .5rem;
          fill: #FFF;
          background-color: transparent;
          border: transparent;
          border-radius: .5rem;
        }
      `}</style>
    </>
  )
}