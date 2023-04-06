import urlJoin from 'url-join'
import { getPosts } from 'utils/markdown/getContentData'

const blogPath = process.env.NEXT_PUBLIC_BLOG_PATH || ''

export async function generateFeedXml(): Promise<string> {
  const blogTitle = blogPath.replace('https://', '')
  const today = new Date().toUTCString()
  const thisYear = new Date().getUTCFullYear()

  let xml = `<?xml version='1.0' encoding="utf-8"?>
    <rss version='2.0'>
  `
  xml += `
    <channel>
      <title>${blogTitle}</title>
      <link>${blogPath}/feed.xml</link>
      <language>ja</language>
      <lastBuildDate>${today}</lastBuildDate>
      <docs>https://validator.w3.org/feed/docs/rss2.html</docs>
      <copyright>© ${thisYear} Kawano Yudai.</copyright>
      <category>blog</category>
    </channel>
  `

  const { posts } = await getPosts()

  posts.forEach(({ fileName, frontmatter }) => {
    const datetime = frontmatter.update || frontmatter.create
    const utcString = new Date(datetime).toUTCString()
    const description = frontmatter.tags.join(', ')
    const link = urlJoin(blogPath, 'entry', fileName, '/')

    xml += `
      <item>
        <title>${frontmatter.title}</title>
        <link>${link}</link>
        <guid>entry/${fileName}</guid>
        <pubDate>${utcString}</pubDate>
        <description>${description}</description>
      </item>
    `
  })

  xml += `</rss>`

  return xml
}
