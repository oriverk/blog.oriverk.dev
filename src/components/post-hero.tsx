import { FrontMatterType } from '@src/types/markdown'
import { DateFormatter } from '@src/components/date-formatter'
import Link from 'next/link'
import { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = ComponentPropsWithoutRef<'div'> & Pick<FrontMatterType, 'title' | 'tags' | 'create' | 'update'>

export const PostHero: React.FC<Props> = (props) => {
  const { className, title, tags, create, update } = props

  return (
    <div className={twMerge("text-center", className)}>
      <h1 className="mb-4 break-words text-center text-2xl 2xl:text-3xl">{title}</h1>
      <p className="m-2 flex flex-wrap justify-center">
        <DateFormatter dateString={update || create} />
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
    </div>
  )
}
