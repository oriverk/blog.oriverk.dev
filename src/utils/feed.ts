import { getPostsData } from 'utils/markdown/getContentData'

const blogPath = process.env.NEXT_PUBLIC_BLOG_PATH || ''

export async function generateFeedXml(): Promise<string> {
  let xml = `<?xml version='1.0' encoding="utf-8"?>
    <rss version='2.0'>
  `
  xml += `
    <channel>
      <title>${blogPath.replace('https://', '')}</title>
      <link>${blogPath}/feed.xml</link>
      <language>ja</language>
      <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
      <docs>https://validator.w3.org/feed/docs/rss2.html</docs>
      <copyright>© ${new Date().getFullYear()} Kawano Yudai.</copyright>
      <category>blog</category>
    </channel>
  `

  const { posts } = await getPostsData()

  posts.forEach(({ fileName, frontMatter, mdxSource }) => {
    const datetime = frontMatter.update || frontMatter.create
    const utcString = new Date(datetime).toUTCString()

    xml += `
      <item>
        <title>${frontMatter.title}</title>
        <link>${blogPath}/entry/${fileName}/</link>
        <guid>entry/${fileName}</guid>
        <pubDate>${utcString}</pubDate>
        <description>${frontMatter.tags.join(', ')}</description>
      </item>
    `
  })

  xml += `</rss>`

  return xml
}
