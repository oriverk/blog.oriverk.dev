import { getPostsData } from 'utils/markdown/getContentData'

const blogPath = process.env.NEXT_PUBLIC_BLOG_PATH || ''

export async function generateSitemapXml(): Promise<string> {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset 
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xhtml="http://www.w3.org/1999/xhtml"
      xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
      xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
      xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
    >
  `

  xml += `
    <url>
      <loc>${blogPath}/</loc>
    </url>
    <url>
      <loc>${blogPath}/tag/</loc>
    </url>
    <url>
      <loc>${blogPath}/search/</loc>
    </url>
  `

  const { posts } = await getPostsData()

  posts.forEach(({ fileName }) => {
    xml += `
      <url>
        <loc>${blogPath}/entry/${fileName}/</loc>
      </url>
    `
  })

  xml += '</urlset>'

  return xml
}
