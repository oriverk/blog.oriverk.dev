import { getPosts } from '@src/utils/markdown/getContentData'
import { PostCard } from '@src/components/post-card'

async function getData() {
  const { posts } = await getPosts()
  const data = posts.map(({ frontmatter, fileName }) => {
    const { published, editUrl, image, ...rest } = frontmatter
    return {
      frontmatter: rest,
      fileName,
    }
  })
  return data
}

export default async function Page() {
  const posts = await getData()

  return (
    <>
      <h1 className="mb-4 text-center text-2xl 2xl:text-3xl">Posts Index</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {posts.map(({ fileName, frontmatter }) => {
          return <PostCard fileName={fileName} frontmatter={frontmatter} key={fileName} />
        })}
      </div>
    </>
  )
}
