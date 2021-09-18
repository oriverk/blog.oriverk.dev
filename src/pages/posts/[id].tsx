import { GetStaticProps, GetStaticPaths } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import css from 'styled-jsx/css'

import { Layout } from '../../components/Layout'
import { CustomHead } from '../../components/common/Head'
import { PostIcons } from '../../components/icons'
import {
  // Date,
  getI18nDate
} from '../../components/common/Date'
import { getAllPostIds, getPostData } from '../../lib/posts'
import { useTranslation } from '../../hooks/translation'

import { PostDataType } from '../../types/posts'

export const getStaticPaths: GetStaticPaths = async ({ locales, defaultLocale }) => {
  const paths = getAllPostIds(locales)
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params, locale, locales, defaultLocale }) => {
  const postData = await getPostData(params.id as string, locale)
  return {
    props: {
      postData
    }
  }
}

const style = css`
.content {
  margin: 0 auto 1rem;
  padding: 5%;
  max-width: 1000px;
}

h1{
  text-align: center;
  font-size: 1.5rem;
  text-decoration: underline var(--colorTextLink);
  color: var(--colorTextDefault);
}

.tags{
  margin-bottom: 1rem;
}

.tag {
  display: inline-block;
  margin: .5rem;
  margin-bottom: 0;
  padding: 0.1rem 1rem;
  border: 1.5px solid var(--colorTextDefault);
  border-radius: 2rem;
  text-decoration: none;
  font-size: .9rem;
  color: var(--colorTextDefault);
}
.tag:hover, .tag:active{
  background-color: var(--colorBackgroundPaper);
  border: 1.5px solid var(--colorTextLink);
}

:global(.heading-link){
  text-decoration: solid underline var(--colorTextLink);
  color: var(--colorTextDefault);
}

:global(.heading-link):hover,
:global(.heading-link):hover::before {
  text-decoration: underline;
  color: var(--colorTextLink)
}

:global(h2 > .heading-link){
  font-size: 1.5rem;
}
:global(h2 > .heading-link)::before{
  content: '## ';
}
:global(h3 > .heading-link){
  font-size: 1.17rem;
}
:global(h3 > .heading-link)::before{
  content: '### ';
}
:global(h4 > .heading-link){
  font-size: 1rem;
}
:global(h4 > .heading-link)::before{
  content: '#### ';
}

code :global(.markdown.content) {
  display: inline-block;
  margin: .1rem .3rem;
  padding: 0 .4rem;
  background-color: var(--colorBackgroundPaper);
  color: var(--colorTextDefault);
}

pre :global(.markdown.content){
  display: block;
  margin: 1rem 0;
  width: 100%;
  max-width: 1000px;
  overflow-x: auto;
  white-space: pre;
  background-color: var(--colorBackgroundPaper);
}

blockquote :global(.markdown.content){
  margin: 1rem 0;
  padding: .5rem 0 .5rem .5rem;
  border-left: 5px solid var(--colorTextDefault);
  color: var(--colorTextDefault);
}
`


type PostProps = {
  postData: Partial<PostDataType>
}

const Component: React.VFC<PostProps> = ({ postData }) => {
  const { locale } = useRouter()
  const { id, title, create, update, tags, image, content } = postData
  const pageTags = tags.join(' ') || 'react nextjs'
  
  return (
    <Layout>
      <CustomHead pageUrl={`/${locale}/posts/${id}/`} pageTitle={title}
        pageDescription={pageTags} pageImage={image} >
        <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.0.3/styles/vs2015.min.css' />
      </CustomHead>
      <article className='markdown content'>
        <PostIcons title={title} id={id} tags={tags} />
        <h1>{title}</h1>
        <div>
          {update ? (
              <div>{useTranslation('POST_UPDATED_AT', { timestamp: getI18nDate(update, locale) })}</div>
            ) : (
              <div>{useTranslation('POST_CREATED_AT', { timestamp: getI18nDate(create, locale) })}</div>
            )
          }
          <div className='tags'>
            {tags.map((tag) => (
              <Link key={tag} href={`/tags/${tag}/`} locale={locale}>
                <a className='tag'>{tag}</a>
              </Link>
            ))}</div>
        </div>
        {image && (
          <a href={image} target='_blank' rel='noopener noreferrer'>
            <img src={image} alt='post cover image' />
          </a>
        )}
        <div dangerouslySetInnerHTML={{ __html: content }} className='markdown' />
      </article>
      <style jsx>{style}</style>
    </Layout>
  )
}

export default Component