import { GetServerSidePropsContext } from 'next'

import { generateSitemapXml } from '../lib/genSitemap'

// reference: https://zenn.dev/catnose99/articles/c441954a987c24

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { res, locale, locales, defaultLocale } = ctx

  const xml = generateSitemapXml(locales, defaultLocale)
  
  res.statusCode = 200
  // 866400 = 24h * 60min * 60second
  res.setHeader('Cache-Control', 's-maxage=86400, state-while-revalidate')
  res.setHeader('Content-Type', 'text/xml')
  res.end(xml)

  return {
    props: {}
  }
}

const Component = () => null
export default Component