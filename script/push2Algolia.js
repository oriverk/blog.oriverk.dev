const fs = require('fs')
const path = require('path')
const algoliasearch = require('algoliasearch')

require('dotenv').config({ path: '.env.local' })
const { ALGOLIA_ADMIN_API_KEY } = process.env


const blogConfig = require(`${path.join(process.cwd(), 'blog.config.js')}`)
const i18nConfig = require(`${path.join(process.cwd(), 'i18n.config.js')}`)
const { locales, defaultLocale } = i18nConfig
const langs = locales.map((locale) => { return locale.split('-')[0] }) || [defaultLocale]

async function pushData2Algolia(locale) {
  const client = algoliasearch(blogConfig.algolia.appId, ALGOLIA_ADMIN_API_KEY)

  const indices = blogConfig.algolia.indexName
  const index = client.initIndex(indices[`${locale}`])

  const postsLocale = JSON.parse(fs.readFileSync(
    path.join(process.cwd(), `gen/postsMap.${locale}.json`), 'utf8'
  ))
  const postsWithObjectID = postsLocale.map((post) => {
    const objectID = `/${locale}/posts/${post.id}`
    return {
      objectID: objectID,
      ...post
    }
  })

  // just add
  // index.saveObjects(postsWithObjectID, { autoGenerateObjectIDIfNotExist: true })

  // partial update
  // https://www.algolia.com/doc/api-reference/api-methods/partial-update-objects/#partially-update-multiple-objects-using-one-api-call-and-send-extra-http-headers
  try {
    await index.partialUpdateObjects(postsWithObjectID, {
      createIfNotExists: true,
    }).then(({ objectIDs }) => {
      console.log(`post data for ${locale} was successfull pushed to Algolia!`)
      console.log(objectIDs)
    })
  } catch (error) {
    console.log('Error occurred!')
    console.log(error.message)
  }
}

try {
  langs.map((lang) => {
    pushData2Algolia(lang)
  })
} catch (error) {
  console.log(error.message)
}