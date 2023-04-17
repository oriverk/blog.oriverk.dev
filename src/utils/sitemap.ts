import { getPostsFrontmatter } from 'utils/markdown/getContentData'
import urlJoin from 'url-join'
import { format } from 'date-fns'

const blogPath = process.env.NEXT_PUBLIC_BLOG_PATH || ''

export function generateSitemapXml(): string {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset 
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xhtml="http://www.w3.org/1999/xhtml"
      xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
      xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
      xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
    >
  `

  const staticUrls = ['', 'entry', 'search', 'tag'].map((path) => urlJoin(blogPath, path, '/'))
  staticUrls.forEach((url) => {
    const lastModified = format(new Date(), 'yyyy-MM-dd');
    xml += `
      <url>
        <loc>${url}</loc>
        <lastmod>${lastModified}</lastmod>
      </url>
    `
  })
  
  getPostsFrontmatter().forEach(post => {
    const { url, create, update } = post;
    const lastModified = update || create;

    xml += `
      <url>
        <loc>${url}</loc>
        <lastmod>${lastModified}</lastmod>
      </url>
    `
  })

  xml += '</urlset>'

  return xml
}
