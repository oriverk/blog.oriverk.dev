import type { UseHitsProps } from 'react-instantsearch-hooks-web';
import { useHits } from 'react-instantsearch-hooks-web';

import type { PostType, FrontMatterType } from 'types/markdown'
import { PostCard } from 'components/post-card'
import { CustomPoweredBy } from './powered-by'

type HitProps = Pick<FrontMatterType, 'title' | 'create' | 'update' | 'tags'> & {
  id: PostType['fileName']
}

const Hits: React.FC<UseHitsProps<HitProps>> = (props) => {
  const { hits } = useHits<HitProps>(props);
  return (
    <>
      {hits.map(({ id, title, update, create, tags }) => (
        <PostCard slug={id} title={title} date={update || create} tags={tags} key={id} />
      ))}
      <CustomPoweredBy />
    </>
  )
}

export const CustomHits = Hits
