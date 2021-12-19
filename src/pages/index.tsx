import { GetStaticProps } from 'next'
import Link from 'next/link'

import type { PostType } from '../types/markdown'
import { getPostsData } from '../utils/markdown/getContentData'
import { Layout } from '../components/layouts'

interface PostsProps {
  posts: Omit<PostType, 'mdxSource'>[]
  allTags: string[]
}

const Page: React.VFC<PostsProps> = (props) => {
  const { posts, allTags } = props
  
  return (
    <Layout>
      <div className='main'>
        <h1>Posts Index</h1>
        <ul>
          {posts.map(({fileName, frontMatter}) => {
            const { title, create, tags } = frontMatter
            return (
              // <ArticleCard slug={fileName} title={title} date={create} tags={tags} key={fileName} />
              <li key={fileName}>
                <Link href={`/entry/${fileName}`}>
                  <a>
                    {title}
                  </a>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </Layout>
  )
}

export default Page

export const getStaticProps: GetStaticProps = async () => {
  const { posts, allTags } = await getPostsData()

  const returnData = posts.map(post => {
    const { frontMatter, fileName } = post
    const { headings, editUrl, ...rest } = frontMatter
    return {
      frontMatter: { ...rest },
      fileName
    }
  })

  return {
    props: {
      posts: returnData,
      allTags
    }
  }
}
