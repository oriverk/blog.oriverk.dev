import Link from 'next/link'
import urlJoin from 'url-join'

import type { PostCardType } from '@src/types/markdown'
import { DateFormatter } from './date-formatter'

export const PostCard: React.FC<PostCardType> = (props) => {
  const { fileName, frontmatter } = props
  const { title, create, update, tags } = frontmatter
  const date = update || create

  const href = urlJoin('/entry', fileName)
  return (
    <section
      className="flex flex-col justify-between rounded-lg border border-solid border-gray-400 p-1 hover:border-gray-300"
      key={fileName}
    >
      <h3 className="m-2 text-xl">
        <Link
          href={href}
          className="text-slate-50 no-underline hover:text-slate-50 hover:underline hover:decoration-[var(--color-miku)]"
        >
          {title}
        </Link>
      </h3>
      <p className="flex flex-wrap p-2">
        <DateFormatter dateString={date} />
        &nbsp;/
        {tags.map((tag) => (
          <>
            &nbsp;
            <Link href={`/tag/#${tag}`} key={`${fileName}/${tag}`}>
              {`#${tag}`}
            </Link>
          </>
        ))}
      </p>
    </section>
  )
}
