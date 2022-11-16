import type { GetServerSidePropsContext } from 'next'

import { generateFeedXml } from '@src/utils/feed'

const Page: React.FC = () => null
export default Page

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { res } = ctx

  const xml = await generateFeedXml()

  res.statusCode = 200
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate') // 24時間のキャッシュ
  res.setHeader('Content-Type', 'text/xml')
  res.write(xml)
  res.end()

  return {
    props: {},
  }
}
