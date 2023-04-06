import type { FrontMatterType } from '@src/types/markdown'
import { getPosts } from '@src/utils/markdown/getContentData'
import { PostCard } from '@src/components/post-card'

export const metadata = {
  title: 'Tag Posts',
}

async function getData() {
  const { posts, allTags: tags } = await getPosts()

  const data = tags.map((tag) => {
    const result = posts
      .filter((post) => post.frontmatter.tags.includes(tag))
      .map(({ frontmatter, fileName }) => {
        const { published, editUrl, image, ...rest } = frontmatter
        return {
          frontmatter: { ...rest },
          fileName,
        }
      })

    return {
      tag,
      posts: result,
    }
  })

  return data
}

type TagPostsProps = {
  tagPosts: {
    tag: string
    posts: {
      frontmatter: Pick<FrontMatterType, 'title' | 'tags' | 'create' | 'update'>
      fileName: string
    }[]
  }
}

const TagPostCards: React.FC<TagPostsProps> = ({ tagPosts }) => {
  const { tag, posts } = tagPosts

  return (
    <section className="mb-3" key={tag}>
      <h2 id={tag} className="mb-3 text-xl">
        <a href={`#${tag}`} className="underline decoration-[var(--color-miku)] underline-offset-2">
          # {tag}
        </a>
      </h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {posts.map(({ fileName, frontmatter }) => {
          return <PostCard fileName={fileName} frontmatter={frontmatter} key={fileName} />
        })}
      </div>
    </section>
  )
}

export default async function Page() {
  const data = await getData()

  return (
    <>
      <h1 className="mb-4 text-center text-2xl 2xl:text-3xl">Tag Posts Index</h1>
      {data.map((datum) => (
        <TagPostCards tagPosts={datum} key={datum.tag} />
      ))}
    </>
  )
}
