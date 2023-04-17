import type { FC } from 'react'
import type { GetServerSidePropsContext } from 'next'

import { generateFeedXml } from 'utils/feed'

const Page: FC = () => null
export default Page

export const getServerSideProps = (ctx: GetServerSidePropsContext) => {
  const { res } = ctx

  const xml = generateFeedXml()
  const age = 60 * 60 * 24 // 24時間

  res.statusCode = 200
  res.setHeader('Cache-Control', `s-maxage=${age}, stale-while-revalidate`)
  res.setHeader('Content-Type', 'text/xml')
  res.end(xml);

  return {
    props: {},
  }
}