const fs = require('fs')
const path = require('path')
const algoliasearch = require('algoliasearch')

require('dotenv').config({ path: '.env.local' })

const AdminApiKey = process.env.ALGOLIA_ADMIN_KEY || ''
const AppId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || ''
const IndexName = process.env.NEXT_PUBLIC_ALGOLIA_INDEX || ''

async function pushData2Algolia() {
  const client = algoliasearch(AppId, AdminApiKey)
  const index = client.initIndex(IndexName)

  const posts = JSON.parse(fs.readFileSync(
    path.join(process.cwd(), `gen/postsMap.json`), 'utf8'
  ))
  const postsWithObjectID = posts.map((post) => {
    const objectID = `/entry/${post.id}`
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
    await index.partialUpdateObjects(postsWithObjectID, { createIfNotExists: true, })
      .then(({ objectIDs }) => {
        console.log(`post data for was successfull pushed to Algolia!`)
        console.log(objectIDs)
      })
  } catch (error) {
    console.log('Error occurred!')
    console.error(error.message)
  }
}

pushData2Algolia()
