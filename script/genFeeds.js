const path = require('path')
const fs = require('fs')
const blogConfig = require(
  `${path.join(process.cwd(),'blog.config.js')}`
)
const i18nConfig = require(
  `${path.join(process.cwd(), 'i18n.config.js')}`
)
const { locales, defaultLocale } = i18nConfig

const posts = JSON.parse(fs.readFileSync(
  path.join(process.cwd(), 'gen/postsMap.json'), 'utf8'
))

// SiteMap
const fixed = [
  { pathname: '/', update: '2021-01-01' },
  { pathname: '/posts', update: '2021-01-01' },
  { pathname: '/tags', update: '2021-01-01' },
  { pathname: '/search', update: '2021-01-01' },
]

const sitemap = `<?xml version="1.0"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${fixed.map((f) => {
  return locales.map((locale) => {
    return `
  <url>
    <loc>${blogConfig.baseUrl}/${locale}/${f.url}</loc>
    <lastmod>${f.update}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`}).join('')
})}
${posts.map((post) => {
    return `
  <url>
    <loc>${blogConfig.baseUrl}/${posts.locale}/posts/${post.id}</loc>
    <lastmod>${post.update || post.create}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`}).join("")}
</urlset>`

try {
  fs.writeFileSync(path.join(process.cwd(), 'public/sitemap.xml'), sitemap)
  console.log('genSiteMap success')
} catch (e) {
  console.error(e)
}

// RSS 2.0
const rss = `<?xml version='1.0'?>
<rss version='2.0'>
  <channel>
    <title>${blogConfig.baseName}</title>
    <link>${blogConfig.baseUrl}</link>
    <description>${blogConfig.desc}</description>
    <language>ja</language>
    <lastBuildDate>${new Date()}</lastBuildDate>
${posts.map((post) => {
  return `
    <item>
      <title>${post.title}</title>
      <link>${blogConfig.baseUrl}/${post.locale}/posts/${post.id}</link>
      <description>${post.tags.join(', ')}</description>
      <pubDate>${post.create}</pubDate>
    </item>`}).join('')}
  </channel>
</rss>`

try {
  fs.writeFileSync(path.join(process.cwd(), 'public/rss.xml'), rss)
  console.log('genRss success')
} catch (e) {
  console.error(e)
}

// Atom 1.0
const atom = `<?xml version='1.0'?>
<feed xmlns='http://www.w3.org/2005/Atom' xml:lang='ja'>
  <id>${blogConfig.baseUrl}</id>
  <title>${blogConfig.baseName}</title>
  <updated>${new Date()}</updated>
  <link rel='alternate' type='text/html' hreflang='en' href='${blogConfig.baseUrl}/' />
  <link rel='alternate' type='text/html' hreflang='ja' href='${blogConfig.baseUrl}/ja' />
  <link rel='self' type='application/atom+xml' href='${blogConfig.baseUrl + '/atom.xml'}' />
  ${posts.map((post) => {
  return `
  <entry>
    <id>${post.id}</id>
    <title>${post.title}</title>
    <link rel='alternate' type='text/html' href='${blogConfig.baseUrl}/${post.locale}/posts/${post.id}' />
    <updated>${post.update || post.create}</updated>
    <summary>${post.tags.join(', ')}</summary>
  </entry>`}).join('')}
</feed>`

try {
  fs.writeFileSync(path.join(process.cwd(), 'public/atom.xml'), atom)
  console.log('getAtom success')
} catch (e) {
  console.error(e)
}

