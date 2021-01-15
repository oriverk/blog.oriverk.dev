import Link from 'next/link'
import { useRouter } from 'next/router'
import css from 'styled-jsx/css'

import { postCardStyle } from '../../pages/posts/index'
import { Date, getI18nDate } from '../common/Date'
import { useTranslation } from '../../hooks/translation'

import { connectHits } from 'react-instantsearch-dom'
import { HitsProvided, Hit } from 'react-instantsearch-core'

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
  const { locale } = useRouter()
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
                      <div>{useTranslation('POST_UPDATED_AT', { timestamp: getI18nDate(hit.update, locale) })}</div>
                    ) : (
                      <div>{useTranslation('POST_CREATED_AT', { timestamp: getI18nDate(hit.create, locale) })}</div>
                    )
                  }
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