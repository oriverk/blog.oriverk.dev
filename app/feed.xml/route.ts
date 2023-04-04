import { generateFeedXml } from '@src/utils/feed'

export async function GET() {
  const xml = await generateFeedXml();
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=86400, stale-white-revalidate',
    }
  })
}