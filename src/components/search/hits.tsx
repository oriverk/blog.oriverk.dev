import { HitsProvided, Hit } from 'react-instantsearch-core'
import { connectHits } from 'react-instantsearch-dom'
import { PostCard } from 'components/post-card'
import { CustomPoweredBy } from '.'
import { PostType, FrontMatterType } from 'types/markdown'

interface HitProps extends Pick<FrontMatterType, 'title' | 'create' | 'update' | 'tags'> {
  id: PostType['fileName']
}

const Hits: React.FC<HitsProvided<Hit<HitProps>>> = ({ hits }) => {
  return (
    <>
      {hits.map((hit) => (
        <PostCard slug={hit.id} title={hit.title} date={hit.update || hit.create} tags={hit.tags} key={hit.id} />
      ))}
      {!!hits.length && <CustomPoweredBy />}
    </>
  )
}

export const CustomHits = connectHits(Hits)
