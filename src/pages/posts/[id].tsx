import Link from 'next/link'
import css from 'styled-jsx/css'
import { GetStaticProps, GetStaticPaths } from 'next'
import { Layout } from '../../components/Layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
// import { getFetchPath } from '../../components/HeaderImg'
import { PostIcons } from '../../components/IconsWrapper'
import { Date } from '../../components/general/Date'
import { CustomImg } from '../../components/general/Image'
import { CustomHead } from '../../components/general/Head'

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

:global(.heading-link){
  color: #EEE;
  border-bottom: .1rem solid #50CAF9;
}
:global(.heading-link):hover{
  color: #50CAF9;
}
:global(.heading-link):hover::before{
  color: #50CAF9;
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
  background-color: #555;
  color: #EEE;
}

pre :global(.markdown.content){
  border: .8px solid grey;
  border-radius: 0.25rem;
  display: block;
  white-space: pre;
  background-color: #1E1E1E;
  width: 100%;
  max-width: 1000px;
  margin: 1rem 0;
  overflow: auto;
}

blockquote :global(.markdown.content){
  color: #BBB;
  border-left: 5px solid #BBB;
  margin: 1rem 0;
  padding: .5rem 0 .5rem .5rem;
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