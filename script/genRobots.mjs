import path from 'path'
import fs from 'fs-extra'

const userAgent = '*'
const allow = '/'
const sitemap = '/sitemap.xml'
const baseUrl = 'https://oriverk.dev'


const robots = `
User - agent: ${userAgent}
Allow: ${allow}
Sitemap: ${baseUrl}${sitemap}
Host: ${baseUrl}
`

fs.writeFileSync(
  path.join(process.cwd(), 'public/robots.txt'),
  robots
)

