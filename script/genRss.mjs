import path from 'path'
import fs from 'fs'
import blogConfig from '../blog.config.js'

const posts = JSON.parse(fs.readFileSync(
  path.join(process.cwd(), 'gen/postsMap.json'), 'utf8'
))

// RSS 2.0
const rss = `<?xml version='1.0'?>
<rss version='2.0'>
  <channel>
    <title>${blogConfig.baseName}</title>
    <link>${blogConfig.baseUrl}</link>
    <description>${blogConfig.desc}</description>
    <language>ja</language>
    <lastBuildDate>${new Date()}</lastBuildDate>/
${posts.map((post) => {
  return `
    <item>
      <title>${post.title}</title>
      <link>${blogConfig.baseUrl}/posts/${post.id}</link>
      <description>${post.tags.join(', ')}</description>
      <pubDate>${post.create}</pubDate>
    </item>`}).join('')}
  </channel>
</rss>`

fs.writeFileSync(path.join(process.cwd(),'public/rss.xml'), rss)

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

// rss 2.0
// <? xml version = '1.0' encoding = 'UTF-8' ?>
// <rss version='2.0'>
//   <channel>
//     <title>hogehoge foobar</title>
//     <link>http://example.com/</link>
//     <description>aaaaaaaaaaaaaaaa</description>
//     <item>
//       <title>tegetege mikan</title>
//       <link>http://example.com/post3.html</link>
//       <description> this is description</description>
//       <pubDate>Wed, 11 Jun 2008 15:30:59 +0900</pubDate>
//     </item>
//   </channel>
// </rss>