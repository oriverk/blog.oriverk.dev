import type { GetServerSideProps, NextPage } from 'next'
import { generateSitemapXml } from '@src/utils/sitemap'

const Page: NextPage = () => null

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const xml = await generateSitemapXml()

  res.statusCode = 200
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate') // 24時間のキャッシュ
  res.setHeader('Content-Type', 'text/xml')
  res.write(xml)
  res.end()

  return {
    props: {},
  }
}

export default Page
