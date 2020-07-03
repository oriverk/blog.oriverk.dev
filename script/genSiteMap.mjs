import path from 'path'
import fs from 'fs'
import blogConfig from '../blog.config.js'

const base = blogConfig.baseUrl

const fixed = [
  {
    url: base,
    update: '2020-06-26'
  },
  {
    url: `${base}/posts`,
    update: '2020-06-30'
  },
  {
    url: `${base}/tags`,
    update: '2020-06-26'
  }
]

const posts = JSON.parse(fs.readFileSync(
  path.join(process.cwd(), 'gen/postsMap.json'), 'utf8'
))

const sitemap = `<?xml version="1.0"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${fixed.map((f) => {
  return `
  <url>
    <loc>${f.url}</loc>
    <lastmod>${f.update}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`}).join('')}
${posts.map((post) => {
  return `
  <url>
    <loc>${base}/posts/${post.id}</loc>
    <lastmod>${post.update || post.create}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`}).join("")}
</urlset>`

fs.writeFileSync(path.join(process.cwd(), "public/sitemap.xml"), sitemap)

// posts
// [
//   {
//     "id": "20190305-shellscript-permission",
//     "title": "Qiita: 1日目  LinuxとShellscriptとPermission",
//     "create": "2019-03-05",
//     "update": "2019-03-18",
//     "tags": [
//       "qiita",
//       "linux",
//       "shellscript"
//     ]
//   }
// ]

// <?xml version = "1.0" encoding = "UTF-8"?>
// <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
//     <url>
//       <loc>http://www.example.com/</loc>
//       <lastmod>2005-01-01</lastmod>
//       <changefreq>monthly</changefreq>
//       <priority>0.8</priority>
//     </url>
// </urlset>
