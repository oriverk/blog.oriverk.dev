import { GetServerSideProps } from 'next'
import { generateSitemapXml } from 'utils/sitemap'

const Page: React.FC = () => null

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
