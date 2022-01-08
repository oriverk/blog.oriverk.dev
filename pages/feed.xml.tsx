import { GetServerSideProps } from 'next'

import { generateFeedXml } from 'utils/feed'

const Page: React.VFC = () => null
export default Page

export const getServerSideProps: GetServerSideProps = async (props) => {
  const { res } = props

  const xml = await generateFeedXml()

  res.statusCode = 200
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate') // 24時間のキャッシュ
  res.setHeader('Content-Type', 'text/xml')
  res.end(xml)

  return {
    props: {},
  }
}
