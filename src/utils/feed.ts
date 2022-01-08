import { getPostsData } from 'utils/markdown/getContentData'

const blogPath = process.env.NEXT_PUBLIC_BLOG_PATH || ''

export async function generateFeedXml(): Promise<string> {
  let xml = `<?xml version='1.0'?>`
  xml += `<rss version='2.0'>`

  xml += `
    <channel>
      <title>${blogPath.replace('https://', '')}</title>
      <link>${blogPath}/</link>
      <language>ja</language>
      <lastBuildDate>${new Date()}</lastBuildDate>
    </channel>
  `

  const { posts } = await getPostsData()

  posts.forEach(({ fileName, frontMatter }) => {
    xml += `
      <item>
        <title>${frontMatter.title}</title>
        <link>${blogPath}/entry/${fileName}/</link>
        <guid>entry/${fileName}</guid>
        <pubDate>${frontMatter.update || frontMatter.create}</pubDate>
        <description>${frontMatter.tags.join(', ')}</description>
      </item>
    `
  })

  return ''
}
