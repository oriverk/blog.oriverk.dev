import type { UseHitsProps } from 'react-instantsearch-hooks-web'
import { useHits } from 'react-instantsearch-hooks-web'

import type { FrontMatterType } from '@src/types/markdown'
import { CustomPoweredBy } from './powered-by'
import { PostCards } from '../post-cards'

type Props = Pick<FrontMatterType, 'title' | 'create' | 'update' | 'tags'> & {
  id: string
}

type HitProps = Props

const Hits: React.FC<UseHitsProps<HitProps>> = (props) => {
  const { hits } = useHits<HitProps>(props)
  const posts = hits.slice().map(({ id, title, create, update, tags }) => {
    return {
      fileName: id,
      frontMatter: { title, create, update, tags },
    }
  })

  return (
    <div className="flex flex-col gap-4">
      <PostCards posts={posts} />
      <CustomPoweredBy />
    </div>
  )
}

export const CustomHits = Hits
