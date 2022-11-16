import type { PostCardType } from '@src/types/markdown'
import { PostCard } from '@src/components/post-card'

type Props = {
  posts: PostCardType[]
}

export const PostCards: React.FC<Props> = (props) => {
  const { posts } = props

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {posts.map(({ fileName, frontMatter }) => {
        return <PostCard fileName={fileName} frontMatter={frontMatter} key={fileName} />
      })}
    </div>
  )
}
