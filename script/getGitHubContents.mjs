
import * as dotenv from 'dotenv'
import { graphql, GraphqlResponseError } from '@octokit/graphql'
import fs from "fs-extra";

dotenv.config({ path: '.env.local' })

async function fetchGitHubContents(githubToken, owner, repo, expression) {
  try {
    if (!githubToken) throw new Error('No GitHub token provided')
    
    const { repository } = await graphql(`
      query ($owner: String!, $repo: String!, $expression: String!) {
        repository(owner: $owner, name: $repo) {
          object(expression: $expression) {
            ... on Tree {
              entries {
                oid
                name
                extension
                path
                object {
                  ... on Blob {
                    text
                  }
                }
              }
            }
          }
        }
      }`,
      {
        owner,
        repo,
        expression,
        headers: {
          authorization: `token ${githubToken}`
        }
      }
    )
    
    return { repository }
  } catch (error) {
    if(error instanceof GraphqlResponseError) {
      console.log("Request failed:", error.request)
      console.log(error.message);
    } else {
      console.log('non GitHub GraphQl erorr happend.')
      console.error(error)
    }
  }
}

// {
//   "oid": "37950a85f5188f9180abe7ecfee40cc0669895ec",
//   "name": "20190305-shellscript-permission.md",
//   "extension": ".md",
//   "path": "articles/20190305-shellscript-permission.md"
//   "object": {
//     "text": "..."
//   }
// }

/**
 * @typedef {Object} GitTreeEntry
 * @property {string} oid
 * @property {string} name
 * @property {string} extension
 * @property {string} path
 * @property {Object} object
 * @property {string} object.text
 */

async function saveContents() {
  const githubToken = process.env.GITHUB_FINE_GRAINED_PERSONAL_ACCESS_TOKEN
  const owner = "oriverk"
  const repo = "oriverk-docs"
  const expression = "main:articles"

  const { repository } = await fetchGitHubContents(githubToken, owner, repo, expression)
  /** @type {GitTreeEntry[]} */
  const entries = repository.object.entries
  
  fs.ensureDirSync(".contents");
  for (const entry of entries) {
    const { object, name } = entry
    const { text } = object
    fs.outputFile(`.contents/${name}`, text)
  }
  console.log(`${entries.length} files saved.`)
}

await saveContents()