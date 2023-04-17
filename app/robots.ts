import type { MetadataRoute } from 'next'
import urlJoin from 'url-join';

const blogPath = process.env.NEXT_PUBLIC_BLOG_PATH || "http://localhost:3000";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: urlJoin(blogPath, 'sitemap.xml'),
  }
}