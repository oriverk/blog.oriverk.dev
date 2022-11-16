import Link from 'next/link'
import { HomeIcon, TagIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'

const sitePath = process.env.NEXT_PUBLIC_SITE_PATH || ''

export const Header: React.FC = () => {
  const _className =
    'block text-gray-400 hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-700 rounded-lg p-2.5'

  return (
    <header className="text-center text-2xl">
      <nav className="my-0 mx-auto flex max-w-3xl items-center justify-between p-4">
        <Link
          href="/"
          className="text-slate-50 transition-colors duration-300 ease-in hover:text-[var(--color-miku)] hover:no-underline"
        >
          <div className="py-2.5 px-4">blog</div>
        </Link>
        <div className="flex gap-1">
          <Link href="/search" className={_className} title="search">
            <MagnifyingGlassIcon className="h-8 w-8 text-gray-400" />
            <span className="sr-only">投稿を検索する</span>
          </Link>
          <Link href="/tag" className={_className} title="tags">
            <TagIcon className="h-8 w-8 text-gray-400" />
            <span className="sr-only">タグごとに投稿を見る</span>
          </Link>
          <a href={sitePath} target="_blank" rel="noopener noreferrer" className={_className} title={sitePath}>
            <HomeIcon className="h-8 w-8 text-gray-400" />
            <span className="sr-only">{sitePath}に移動する</span>
          </a>
        </div>
      </nav>
    </header>
  )
}
