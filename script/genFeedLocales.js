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


const item = (post, locale) => {
  return `
  <item>
    <title>${post.title}</title>
    <link>${blogConfig.baseUrl}/${locale === defaultLang && 'ja/'}posts/${post.id}</link>
    <guid>${locale === defaultLang && 'ja/'}posts/${post.id}</guid>
    <pubDate>${post.create}</pubDate>
    <description>${post.tags.join(', ')}</description>
  </item>`
}

const rss = (locale, posts) => {
  return `
<?xml version='1.0'?>
  <rss version='2.0'>
  <channel>
    <title>${blogConfig.baseName}</title>
    <link>${blogConfig.baseUrl}/rss.${locale}.xml</link>
    <description>${blogConfig.desc}</description>
    <language>${locale}</language>
    <lastBuildDate>${new Date()}</lastBuildDate>
  </channel>${posts.map((post) => {
    return item(post, locale)
  }).join('')}
  </rss>`
}

function genFeedLocale(locale) {
  const postsDataLocale = JSON.parse(fs.readFileSync(
    path.join(process.cwd(), `gen/postsMap.${locale}.json`), 'utf8'
  ))
  const rssData = rss(locale, postsDataLocale)

  try {
    fs.writeFileSync(path.join(process.cwd(), `public/rss.${locale}.xml`), rssData)
    console.log(`sucessfully rss.${locale}.xml was generated!`)
  } catch (e) {
    console.log(`rss.${locale}.xml failed to be generated.`)
    console.error(e)
  }
}

langs.map((lang) => {
  genFeedLocale(lang)
})