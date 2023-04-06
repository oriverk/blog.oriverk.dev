import { AlgoliaSearch } from '@src/components/search'

export const metadata = {
  title: 'Search',
}

export default function Page() {
  return (
    <div className="w-full">
      <h1 className="mb-4 text-center text-2xl 2xl:text-3xl">Search</h1>
      <AlgoliaSearch />
    </div>
  )
}
