import Link from 'next/link'
import css from 'styled-jsx/css'
import { getTags } from '../../lib/posts'
import { Layout } from '../../components/Layout'
import { TagsIcons } from '../../components/IconsWrapper'
import { GetStaticProps } from 'next'
import { CustomHead } from '../../components/common/Head'

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
    flex-grow: 1;
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
    border: 1px solid var(--colorTextLink);
    text-align: center;
    text-decoration: none;
    font-size: 1rem;
    color: var(--colorTextDefault);
  }
  .tag:hover, .tag:active{
    background-color: var(--colorBackgroundDefault);
  }
`

type Props = {
  tags: string[]
}

const Component: React.FC<Props> = ({ tags })  => (
  <Layout>
    <CustomHead pageUrl='/tags/' pageTitle='Tags' pageDescription='Posts Tags index' />
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
    <style jsx>{style}</style>
  </Layout>
)

export default Component