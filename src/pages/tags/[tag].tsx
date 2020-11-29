import Link from 'next/link'
import { GetStaticProps, GetStaticPaths } from 'next'
import { getTags, getTagPosts } from '../../lib/posts'
import { Layout } from '../../components/Layout'
import { CustomImg } from '../../components/common/Image'
import { Date } from '../../components/common/Date'
import { TagIcons } from '../../components/IconsWrapper'
import { CustomHead } from '../../components/common/Head'
import { postCardStyle } from '../posts/index'

export const getStaticPaths: GetStaticPaths = async () => {
  const paths: string[] = getTags().map((tag) => {
    return `/tags/${tag}/`
  })
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const tag = params.tag as string
  const postsData = getTagPosts(tag as string)
  return {
    props: {
      tag,
      postsData,
    },
  }
}

type Props = {
  tag: string,
  postsData: {
    id: string,
    title: string,
    create: string,
    update: string,
    tags?: string[],
    image?: string
  }[]
}

const Component: React.FC<Props> = ({ tag, postsData }) => (
  <Layout>
    <CustomHead pageUrl={`/tags/${tag}/`} pageTitle={`${tag} Posts`} pageDescription={`${tag} Posts`} />
    <TagIcons />
    <article className='content'>
      <h1>{`${tag} Posts`}</h1>
      <div className='posts'>
        {postsData.map(({ id, title, create, update, tags, image }) => (
          <div className='postCard' key={id}>
            <Link href={ `/posts/${id}/`}>
              <a className='postLink'>
                <div className='imgOuter'>
                  <CustomImg src={image || '/assets/home/sunrise.jpg'} alt={title} className='cardImg' />
                </div>
                <div className='postDesc'>
                  {update ? (
                    <div>updated on <Date dateString={update} /></div>
                  ) : (
                      <div>posted on <Date dateString={create} /></div>
                    )}
                  <h2>{title}</h2>
                </div>
              </a>
            </Link>
            <div className='tags'>
              {tags.map((tag) => (
                <Link href={ `/tags/${tag}/`} key={tag}>
                  <a className='tag' key={tag}>{tag}</a>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </article>
    <style jsx>{postCardStyle}</style>
  </Layout>
)

export default Component