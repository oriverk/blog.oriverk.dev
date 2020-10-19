const path = require('path')
const fs = require('fs')
const blogConfig = require(
  `${path.join(process.cwd(),'blog.config.js')}`
)
const response = JSON.parse(fs.readFileSync(
  path.join(process.cwd(), 'gen/response.json'), 'utf8'
))

const results = response.results[0].hits

const data = results.map(result => {
    const id = result.id
    const title = result.title
    const update = result.update || result.create
    const tags = result.tags
    return {
      id,
      title,
      update,
      tags
    }
})

const hoge = {
  items: data
}

const jso = JSON.stringify(hoge)

console.dir(jso)
