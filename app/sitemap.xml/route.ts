import { generateSitemapXml } from '@src/utils/sitemap'

export async function GET() {
  const xml = await generateSitemapXml()

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=86400, stale-white-revalidate',
    },
  })
}
