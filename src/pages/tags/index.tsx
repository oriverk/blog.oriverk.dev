import Head from 'next/head'
import Link from 'next/link'
import css from 'styled-jsx/css'
import { getTags } from '../../lib/posts'
import { BlogLayout } from '../../components/BlogLayout'
import { TagsIcons } from '../../components/IconsWrapper'
import blogConfig from '../../../blog.config'
import { GetStaticProps } from 'next'

export const getStaticProps: GetStaticProps = async () => {
  const tags: string[] = getTags()
  return {
    props: {
      tags
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

  .tag{
    display: inline-block;
    min-width: 4rem;
    text-align: center;
    color: #EEE;
    font-size: 1rem;
    text-decoration: none;
    margin: .5rem;
    padding: .1rem .8rem;
    border-radius: 2rem;
    border: 1px solid #50CAF9;
  }
  .tag:hover, .tag:active{
    background-color: #424242;
  }
`

type Props = {
  tags: string[]
}

const Component: React.FC<Props> = ({tags}) => {
  return (
    <>
      <BlogLayout>
        <Head>
          <title>Tags | {blogConfig.shortName}</title>
          <meta name='title' content={`Tags | ${blogConfig.baseName}`} />
          <meta name='description' content={blogConfig.desc} />
          <meta property='og:title' content={`Tags | ${blogConfig.baseName}`} />
          <meta property='og:description' content={blogConfig.desc} />
          <meta property='og:image' content={blogConfig.baseUrl + blogConfig.ogImage} />
          <meta property='og:url' content={ blogConfig.baseUrl + '/tags/' } />
        </Head>
        <TagsIcons />
        <article className='content'>
          <h1>Blog Tags</h1>
          <div className='tags'>
            {tags.map((tag) => (
              <Link href={ `/tags/${tag}/` } key={tag}>
                <a className='tag'>{tag}</a>
              </Link>
            ))}
          </div>
        </article>
      </BlogLayout>
      <style jsx>{style}</style>
    </>
  )
}

export default Component