import Link from 'next/link'
import urlJoin from 'url-join';

import type { PostCardType } from 'types/markdown'
import { DateFormatter } from './date-formatter'

export const PostCard: React.FC<PostCardType> = (props) => {
  const { fileName, frontMatter } = props
  const { title, create, update, tags } = frontMatter;
  const date = update || create;

  const href = urlJoin('/entry', fileName);
  return (
    <section className="p-1 border border-solid border-gray-400 rounded-lg hover:border-gray-300 flex flex-col justify-between" key={fileName}>
      <h3 className="m-2 text-xl">
        <Link href={href} className="no-underline text-slate-50 hover:text-slate-50 hover:underline hover:decoration-[var(--color-miku)]">{title}</Link>
      </h3>
      <p className="p-2 flex flex-wrap">
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
