import type { NextPage } from 'next'

import { Layout } from '@src/components/layouts'
import { AlgoliaSearch } from '@src/components/search'

const Page: NextPage = () => {
  return (
    <Layout title="search posts" path="/search/">
      <div className="w-full">
        <h1 className="mb-4 text-center text-2xl 2xl:text-3xl">Search</h1>
        <AlgoliaSearch />
      </div>
    </Layout>
  )
}

export default Page
