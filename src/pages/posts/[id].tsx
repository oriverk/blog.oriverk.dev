import Head from 'next/head'
import Link from 'next/link'
import css from 'styled-jsx/css'
import { GetStaticProps, GetStaticPaths } from 'next'
import { BlogLayout } from '../../components/BlogLayout'
import { getAllPostIds, getPostData } from '../../lib/posts'
// import { getFetchPath } from '../../components/HeaderImg'
import blogConfig from '../../../blog.config'
import { PostIcons } from '../../components/IconsWrapper'
import { Date } from '../../components/general/Date'
import { CustomImg } from '../../components/general/Image'

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
  const id = postData.id
  const title = postData.title
  const create = postData.create
  const tags = postData.tags
  const image = postData.image
  const content = postData.content
  return {
    props: {
      id, title, create, tags, image, content
    },
  }
}

const style = css`
.content {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto 1rem;
  padding: 5%;
  flex-grow: 1;
}

h1{
  font-size: 1.5rem;
  text-decoration: underline #50CAF9;
  color: #D9D9D9;
}

.tags{
  margin-bottom: 1rem;
}

.tag{
  text-decoration: none;
  display: inline-block;
  font-size: .9rem;
  border-radius: 2rem;
  border: 1px solid #50CAF9;
  padding: 0.1rem 1rem;
  margin: .5rem;
  margin-bottom: 0;
  color: #EEE;
}
.tag:hover, .tag:active{
  background-color: #424242;
}
`

type Props = {
  id: string,
  title: string,
  create: string,
  tags?: string[],
  image?: string,
  content: string
}

const Component: React.FC<Props> = ({ id, title, create, tags, image, content })  => {
  const pageTags = tags.join(' ') || 'react nextjs'
  const ogImage = image ? blogConfig.baseUrl + image : blogConfig.baseUrl + blogConfig.ogImage
  return (
    <>
      <BlogLayout>
        <Head>
          <title>{`${title} | ${blogConfig.shortName}`}</title>
          <meta name='title' content={`${title} | ${blogConfig.baseName}`} />
          <meta name='description' content={pageTags} />
          <meta property='og:title' content={`${title} | ${blogConfig.baseName}`} />
          <meta property='og:description' content={pageTags} />
          <meta property='og:image' content={ogImage} />
          <meta property='og:url' content={`${blogConfig.baseUrl}/posts/${id}/` } />
          <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.0.3/styles/vs2015.min.css' />
        </Head>
        <article className='content'>
        <PostIcons title={title} id={id} tags={tags} />
          <h1>{title}</h1>
          <div>
            <div>post on <Date dateString={create} /></div>
            <div className='tags'>
              {tags.map((tag) => (
                <Link key={tag} href={ `/tags/${tag}/`}>
                  <a className='tag'>{tag}</a>
                </Link>
              ))}</div>
          </div>
          {image && (
            <a href={image} target='_blank' rel='noopener noreferrer'>
              <CustomImg src={image} alt='post cover image' />
            </a>
          )}
          <div dangerouslySetInnerHTML={{ __html: content }} className='markdown' />
        </article>
      </BlogLayout>
      <style jsx>{style}</style>
    </>
  )
}

export default Component