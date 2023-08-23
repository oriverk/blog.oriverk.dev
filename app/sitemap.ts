import type { MetadataRoute } from "next";
import urlJoin from 'url-join';
import { getPostsFrontmatter } from "@src/utils/markdown/getContentData";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = ['', 'entry', 'search', 'tag']
    .map(entry => {
      return {
        path: entry,
        lastmod: ""
      }
    })
  
  const postEntries = getPostsFrontmatter()
    .map(({ url, create, update }) => {
      return {
        path: url,
        lastmod: update || create,
      }
    })
  
  const sitemapEntries = [...staticEntries, ...postEntries]
  
  const result = sitemapEntries.map(({ path, lastmod }) => ({ 
    url: urlJoin(process.env.NEXT_PUBLIC_BLOG_PATH || "", path, "/"),
    lastModified: lastmod || ""
  }))

  return result
}