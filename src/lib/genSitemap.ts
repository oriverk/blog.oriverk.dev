import path from 'path'
import fs from 'fs'

import { PostDataType } from '../types/posts'
import blogConfig from '../../blog.config'

const fixedPage = [
  '',
  'search/',
  'posts/',
  'tags/'
]

function getPostsData(locales: string[]) {
  const paths = []
  locales.map((locale) => {
    const postsMap = JSON.parse(fs.readFileSync(
      path.join(process.cwd(), `gen/postsMap.${locale}.json`), 'utf8'
    ))
    postsMap.map((post: PostDataType) => {
      paths.push({
        id: post.id,
        lastmod: post.update || post.create,
        lang: post.locale,
      })
    })
  })
  return paths.sort((a, b) => {
    if (a.lastmod < b.lastmod) {
      return 1
    } else {
      return -1
    }
  })
}


export function generateSitemapXml(locales: string[], defaultLocale: string): string {
  const langs = locales.map((locale) => { return locale.split('-')[0] })
  const defaultLang = defaultLocale.split('-')[0] || langs[0]
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>`
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`

  fixedPage.forEach((fixed) => {
    langs.forEach((lang) => {
      const path = `${blogConfig.baseUrl}/${lang == defaultLang ? `${fixed}` : `${lang}/${fixed}`}`
      const lastmod = new Date()

      xml += `
        <url>
          <loc>${path}</loc>
          <lastmod>${lastmod.toISOString()}</lastmod>
          <changefreq>weekly</changefreq>
        </url>
      `
    })
  })

  const postsData = getPostsData(langs)
  postsData.forEach((post) => {
    const path = `${blogConfig.baseUrl}/${post.lang === defaultLang ? `${post.id}/` : `${post.lang}/${post.id}/`}`

    xml += `
        <url>
          <loc>${path}</loc>
          <lastmod>${post.lastmod}</lastmod>
          <changefreq>monthly</changefreq>
        </url>
      `
  })

  xml += `</urlset>`

  return xml
}