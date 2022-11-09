import * as fs from 'fs'
import * as path from 'path'
import algoliasearch from 'algoliasearch'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const AdminApiKey = process.env.ALGOLIA_ADMIN_KEY || ''
const AppId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || ''
const IndexName = process.env.NEXT_PUBLIC_ALGOLIA_INDEX || ''

type PostType = {
  id: string
  title: string
  create: string
  update: string
  tags: string[]
  content: string
  published: boolean
}

async function pushData2Algolia() {
  const client = algoliasearch(AppId, AdminApiKey)
  const index = client.initIndex(IndexName)

  const posts = JSON.parse(fs.readFileSync(path.join(process.cwd(), `script/postsMap.json`), 'utf8')).map(
    (post: PostType) => {
      return {
        objectID: post.id,
        ...post,
      }
    }
  )

  // just add
  // index.saveObjects(postsWithObjectID, { autoGenerateObjectIDIfNotExist: true })

  // partial update
  // https://www.algolia.com/doc/api-reference/api-methods/partial-update-objects/#partially-update-multiple-objects-using-one-api-call-and-send-extra-http-headers
  try {
    await index.partialUpdateObjects(posts, { createIfNotExists: true }).then(({ objectIDs }) => {
      console.log(`post data for was successfull pushed to Algolia!`)
      console.log(objectIDs)
    })
  } catch (error) {
    console.log('Error occurred!')
    console.error(error.message)
  }

  // delete
  // try {
  //   await index.deleteObjects(posts.map(post => post.objectID)).then(({ objectIDs }) => {
  //     console.log(objectIDs);
  //   });
  // } catch (error){
  //   console.log('Error occurred!')
  //   console.error(error.message)
  // }
}

pushData2Algolia()
