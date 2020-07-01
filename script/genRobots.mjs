import path from 'path'
import fs from 'fs'
import blogConfig from '../blog.config.js'

const robots = `User - agent: *
Allow: /
Sitemap: ${blogConfig.baseUrl}/sitemap.xml
Host: ${blogConfig.baseUrl}
`

fs.writeFileSync(
  path.join(process.cwd(), 'public/robots.txt'), robots
)