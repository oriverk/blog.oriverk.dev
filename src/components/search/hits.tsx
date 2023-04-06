import type { UseHitsProps } from 'react-instantsearch-hooks-web'
import { useHits, PoweredBy } from 'react-instantsearch-hooks-web'

import type { FrontMatterType } from '@src/types/markdown'
import { PostCard } from '../post-card'

type Props = Pick<FrontMatterType, 'title' | 'create' | 'update' | 'tags'> & {
  id: string
}

type HitProps = Props

const Hits: React.FC<UseHitsProps<HitProps>> = (props) => {
  const { hits } = useHits<HitProps>(props)
  const posts = hits.slice().map(({ id, title, create, update, tags }) => {
    return {
      fileName: id,
      frontmatter: { title, create, update, tags },
    }
  })

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {posts.map(({ fileName, frontmatter }) => {
          return <PostCard fileName={fileName} frontmatter={frontmatter} key={fileName} />
        })}
      </div>
      <div id="hoe" className="flex justify-end">
        <PoweredBy theme="dark" className="w-48" />
      </div>
    </div>
  )
}

export const CustomHits = Hits
