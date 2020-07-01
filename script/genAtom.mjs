import path from 'path'
import fs from 'fs-extra'

const base = {
  url: 'https://oriverk.dev',
  title: "Kawano Yudai's site",
  desc: "This site is for my portfolio and made with React, Next.js"
}

const posts = JSON.parse(fs.readFileSync(
  path.join(process.cwd(), 'gen/postsMap.json'), 'utf8'
))

const atom = `
<? xml version='1.0' encoding='UTF-8' ?>
<feed xmlns='http://www.w3.org/2005/Atom' xml:lang='ja'>
  <id>${base.url}</id>
  <title>${base.title}</title>
  <updated>${new Date()}</updated>
  <link rel='alternate' type='text/html' href=${base.url} />
  <link rel='self' type='application/atom+xml' href=${base.url + '/atom.xml'} />
  ${posts.map((post) => {
    return `
    <entry>
      <id>${post.id}</id>
      <title>${post.title}</title>
      <link rel='alternate' type='text/html' href=${base.url + '/posts/' + post.id} />
      <updated>${post.update || post.create}</updated>
      <summary>${post.tags.join(', ')}</summary>
    </entry>
    `
  }).join('')}
</feed>
`

fs.writeFileSync(path.join(process.cwd(), 'public/atom.xml'), atom)

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

// atom 1.0
// <? xml version='1.0' encoding='UTF-8' ?>
// <feed xmlns='http://www.w3.org/2005/Atom' xml:lang='ja'>
//   <id>tag:example.comfeed/</id>
//   <title>example.com update info</title>
//   <updated>2020-06-11T15:30:59Z</updated>
//   <link rel='alternate' type='text/html' href='http://example.com/feed/' />
//   <link rel='self' type='application/atom+xml' href='http://example.com/feed/atom10.xml' />
//   <entry>
//     <id>http://example.com/post2.html#200810153059</id>
//     <title>hogehoge</title>
//     <link rel='alternate' type='text/html' href='http://example.com/post2.html' />
//     <updated>2020-06-10T15:30:59Z</updated>
//     <summary>hoge</summary>
//   </entry>
//   <entry>
//     <id>http://example.com/post1.html#20080609205030</id>
//     <title>foobar</title>
//     <link rel='alternate' type='text/html' href='http://example.com/post1.html' />
//     <updated>2020-06-09T20:50:30Z</updated>
//     <summary>foofoooofooo</summary>
//   </entry>
// </feed>