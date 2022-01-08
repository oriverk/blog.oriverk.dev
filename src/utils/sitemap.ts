import { getPostsData } from 'utils/markdown/getContentData'

const blogPath = process.env.NEXT_PUBLIC_BLOG_PATH || ''

export async function generateSitemapXml(): Promise<string> {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>`
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`

  xml += `
    <url>
      <loc>${blogPath}/</loc>
      <lastmod>${new Date()}</lastmod>
    </url>
    <url>
      <loc>${blogPath}/tag/</loc>
      <lastmod>${new Date()}</lastmod>
    </url>
    <url>
      <loc>${blogPath}/search/</loc>
      <lastmod>${new Date()}</lastmod>
    </url>
    <url>
      <loc>${blogPath}/404/</loc>
      <lastmod>${new Date()}</lastmod>
    </url>
  `

  const { posts } = await getPostsData()

  posts.forEach(({ fileName, frontMatter }) => {
    xml += `
      <url>
        <loc>${blogPath}/entry/${fileName}/</loc>
        <lastmod>${frontMatter.update || frontMatter.create}</lastmod>
      </url>
    `
  })

  xml += '</urlset>'

  return xml
}
