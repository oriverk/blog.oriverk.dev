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
    max-width: 1000px;
    margin: 0 auto 1rem;
    padding: 5%;
    flex-grow: 1;
  }

  .tag {
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