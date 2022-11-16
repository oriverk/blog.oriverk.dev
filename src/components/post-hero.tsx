import { FrontMatterType } from '@src/types/markdown'
import { DateFormatter, DateFormatterProps } from '@src/components/date-formatter'
import Link from 'next/link'

type Props = Pick<FrontMatterType, 'title' | 'tags' | 'editUrl'> & DateFormatterProps

export const PostHero: React.FC<Props> = (props) => {
  const { title, tags, editUrl, dateString } = props

  return (
    <div className="text-center">
      <h1 className="mb-4 break-words text-center text-2xl 2xl:text-3xl">{title}</h1>
      <p className="m-2 flex flex-wrap justify-center">
        <DateFormatter dateString={dateString} />
        &nbsp;/
        {tags.map((tag) => (
          <>
            &nbsp;
            <Link href={`/tag/#${tag}`} key={tag} className="decoration-red-400">
              {'#' + tag}
            </Link>
          </>
        ))}
      </p>
      <p className="m-2">
        <a href={editUrl} target="_blank" rel="noopener noreferrer">
          GitHub で編集する
        </a>
      </p>
    </div>
  )
}
