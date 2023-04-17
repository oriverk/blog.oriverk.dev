import urlJoin from 'url-join'
import RSS from 'rss'
import { format } from 'date-fns'
import { getPostsFrontmatter } from 'utils/markdown/getContentData'

const blogPath = process.env.NEXT_PUBLIC_BLOG_PATH || ''

export function generateFeedXml(): string {
    const feed = new RSS({
    title: 'blog.oriverk.dev',
    description: '',
    site_url: blogPath,
    feed_url: urlJoin(blogPath, 'feed.xml'),
    language: 'ja',
  })

  const statics = ['', 'entry', 'search', 'tag'];
  statics.forEach((path) => {
    const url = urlJoin(blogPath, path, '/');
    const lastModified = format(new Date(), 'yyyy-MM-dd');
    feed.item({
      title: path || 'home',
      description: '',
      date: lastModified,
      url
    })
  })

  getPostsFrontmatter()
    .forEach(post => {
      const { url, create, update, title, tags } = post;
      const lastModified = update || create;

      feed.item({
        title,
        description: tags.join(', '),
        date: lastModified,
        url
      })
    })


  return feed.xml()
}
