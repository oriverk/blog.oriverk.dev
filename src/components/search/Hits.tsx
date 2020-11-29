import Link from 'next/link'
import css from 'styled-jsx/css'
import { connectHits } from 'react-instantsearch-dom'
import { HitsProvided, Hit } from 'react-instantsearch-core'
import { Date } from '../common/Date'
import { postCardStyle } from '../../pages/posts/index'

const hiddenStyle = css`
.hidden {
  visibility: hidden;
}
`

type Props = {
  id: string,
  title: string,
  create: string,
  update?: string,
  tags?: string[],
  image?: string,
}

const Hits: React.FC<HitsProvided<Hit<Props>>> = ({
  hits,
}) => {
  // before search, below tags become undefined.
  // console.log(hits[0].tags)
  return (
    <>
      <div className='posts'>
        {hits.map((hit) => (
          <div className='postCard' key={hit.id}>
            <Link href={`/posts/${hit.id}/`}>
              <a className='postLink' key={hit.id}>
                {/* <div className='imgOuter'>
                  <CustomImg src={hit.image || '/assets/home/sunrise.jpg'} alt={hit.title} className='cardImg' />
                </div> */}
                <div className='postDesc'>
                  {hit.update ? (
                    <div>updated on <Date dateString={hit.update} /></div>
                    ) : (
                      <div>posted on <Date dateString={hit.create} /></div>
                      )}
                  <h2>{hit.title}</h2>
                </div>
              </a>
            </Link>
            <div className='tags'>
              {hit.tags.map((tag) => (
                <Link href={`/tags/${tag}/`} key={tag}>
                  <a className='tag'>
                    {tag}
                  </a>
                </Link>
              ))}
            </div>
          </div>
        ))}
        {hits.length % 2 !== 0 && (
          <div className='postCard hidden'/>
        )}
      </div>
      <style jsx>{postCardStyle}</style>
      <style jsx>{hiddenStyle}</style>
    </>
  );
}

export const CustomHits = connectHits(Hits)