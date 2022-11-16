import type { NextPage } from 'next'
import Link from 'next/link'

import { Layout } from 'components/layouts'

const Page: NextPage = () => {
  return (
    <Layout title="404: Page not found" path="/404/">
      <section className="flex flex-col justify-center items-center">
        <h1 className="text-2xl 2xl:text-3xl">Page Not Found</h1>
        <Link href="/" className="text-xl 2xl:text-2xl">Go back to Top</Link>
      </section>
    </Layout>
  )
}

export default Page;
