import { GetStaticProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import css from 'styled-jsx/css'

import { Layout } from '../../components/Layout'
import { CustomHead } from '../../components/common/Head'
import { TagsIcons } from '../../components/icons/index'
import { PostDataType, getTags } from '../../lib/posts'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const tags: string[] = getTags(locale)
  return {
    props: {
      tags
    },
  }
}

const style = css`
  .content {
    margin: 0 auto 1rem;
    padding: 5%;
    max-width: 1000px;
  }

  h1 {
    text-align: center;
  }

  .tag {
    display: inline-block;
    margin: .5rem;
    padding: .1rem .8rem;
    min-width: 4rem;
    border-radius: 2rem;
    border: 1.5px solid var(--colorTextDefault);
    text-align: center;
    text-decoration: none;
    font-size: 1rem;
    color: var(--colorTextDefault);
  }
  .tag:hover, .tag:active{
    border: 1.5px solid var(--colorTextLink);
    background-color: var(--colorBackgroundDefault);
  }
`

type TagsProps = Pick<PostDataType, 'tags'>

const Component: React.FC<TagsProps> = ({ tags }) => {
  const { locale } = useRouter()
  return (
    <Layout>
      <CustomHead pageUrl={`/${locale}/tags/`} pageTitle='Tags' pageDescription='Posts Tags index' />
      <TagsIcons />
      <article className='content'>
        <h1>Blog Tags</h1>
        <div className='tags'>
          {tags.map((tag) => (
            <Link href={`/tags/${tag}/`} locale={locale} key={tag}>
              <a className='tag'>{tag}</a>
            </Link>
          ))}
        </div>
      </article>
      <style jsx>{style}</style>
    </Layout>
  )
}

export default Component