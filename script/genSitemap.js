const path = require('path')
const fs = require('fs')
const blogConfig = require(
  `${path.join(process.cwd(), 'blog.config.js')}`
)
const i18nConfig = require(
  `${path.join(process.cwd(), 'i18n.config.js')}`
)
const { locales, defaultLocale } = i18nConfig

const langs = locales.map((locale) => { return locale.split('-')[0] })
const defaultLang = defaultLocale.split('-') || langs[0]

function genFixedUrls(locales) {
  const urls = ['', 'posts', 'tags', 'search'].map((page) => {
    return locales.map((locale) => {
      const lc = locale === defaultLang ? '' : `${locale}/`
      return `
  <url>
    <loc>${blogConfig.baseUrl}/${lc}${page}</loc>
    <lastmod>${new Date()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>`
    }).join('')
  }).join('')
  return urls
}

function getPostsData(locales) {
  const paths = []
  locales.map((locale) => {
    const postsMap = JSON.parse(fs.readFileSync(
      path.join(process.cwd(), `gen/postsMap.${locale}.json`), 'utf8'
    ))
    postsMap.map((post) => {
      paths.push({
        id: post.id,
        lastmod: post.update || post.create,
        lang: post.locale,
        locales: [],
        tags: post.tags
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

function genPostsUrls(locales) {
  return getPostsData(locales).map((post) => {
    const lc = post.lang === defaultLang ? '' : `${post.lang}/`
    return `
  <url>
    <loc>${blogConfig.baseUrl}/${lc}posts/${post.id}</loc>
    <lastmod>${post.lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
  }).join('')
}

function genSitemap(locales) {
  const fixed = genFixedUrls(locales)
  const posts = genPostsUrls(locales)
  const sitemap = `
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
>${fixed} ${posts}
</urlset>`
  
  try {
    fs.writeFileSync(path.join(process.cwd(), 'public/sitemap.xml'), sitemap)
    console.log('sitemap.xml was successfully generated!')
  } catch (e) {
    console.error(e)
  }
}

genSitemap(langs)

