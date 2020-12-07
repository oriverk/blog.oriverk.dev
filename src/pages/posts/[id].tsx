import Link from 'next/link'
import css from 'styled-jsx/css'
import { GetStaticProps, GetStaticPaths } from 'next'
import { Layout } from '../../components/Layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
// import { getFetchPath } from '../../components/HeaderImg'
import { PostIcons } from '../../components/IconsWrapper'
import { Date } from '../../components/common/Date'
import { CustomImg } from '../../components/common/Image'
import { CustomHead } from '../../components/common/Head'

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
  margin: 0 auto 1rem;
  padding: 5%;
  max-width: 1000px;
}

h1{
  font-size: 1.5rem;
  text-decoration: underline var(--colorTextLink);
  color: var(--colorTextDefault);
}

.tags{
  margin-bottom: 1rem;
}

.tag{
  display: inline-block;
  margin: .5rem;
  padding: 0.1rem 1rem;
  margin-bottom: 0;
  border: 1px solid var(--colorTextLink);
  border-radius: 2rem;
  text-decoration: none;
  font-size: .9rem;
  color: var(--colorTextDefault);
}
.tag:hover, .tag:active{
  background-color: var(--colorBackgroundPaper);
}

:global(.heading-link){
  color: var(--colorTextDefault);
  border-bottom: .1rem solid var(--colorTextLink);
}

:global(.heading-link):hover,
:global(.heading-link):hover::before {
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
  overflow: auto;
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
  return (
    <Layout>
      <CustomHead pageUrl={`/posts/${id}/`} pageTitle={title}
        pageDescription={pageTags} pageImage={image} >
        <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.0.3/styles/vs2015.min.css' />
      </CustomHead>
      <article className='markdown content'>
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
      <style jsx>{style}</style>
    </Layout>
  )
}

export default Component