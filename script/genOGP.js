const fs = require('fs')
const path = require('path')
const fetch = require('node-fetch')

const blogConfig = require(
  path.join(process.cwd(), 'blog.config.js')
)
const posts = JSON.parse(fs.readFileSync(
  path.join(process.cwd(), 'gen/postsMap.json'), 'utf8'
))

const svgFiles = fs.readdirSync(path.join(process.cwd(), 'public/svg'))
const svgs = svgFiles.map((svgFile) => {
  return svgFile.replace(/\.svg/, '')
})
svgs.push('vercel', 'hyper', 'nextjs', 'typescirpt', 'go')

// console.log(svgs)

const vercel = 'https://assets.vercel.com/image/upload/front/assets/design'
// https://og-image.now.sh/**Hello**%20World.png?theme=dark&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fvercel-triangle-white.svg

const options = {
  target: 'https://og-image.now.sh',
  extension: 'png',
  theme: 'dark',
  md: '0',
  font: '100px'
}


function genFetchPath(title, extension, theme, md, font, tags) {
  const links = []
  tags.map((tag) => {
    if (svgs.includes(tag)) {
      switch (tag) {
        case 'vercel':
          theme === 'light' ? links.push(`${vercel}/vercel-triangle-black.svg`) : links.push(`${vercel}/vercel-triangle-white.svg`)
          break
        case 'hyper':
          links.push(`${vercel}/hyper-color-logo.svg`)
          break
        case 'nextjs':
          theme === 'light' ? links.push(`${vercel}/nextjs-black-logo.svg`) : links.push(`${vercel}/nextjs-white-logo.svg`)
          break
        case 'typescript':
          links.push('https://cdn.jsdelivr.net/gh/remojansen/logo.ts@master/ts.svg')
          break
        case 'go':
          links.push(`${blogConfig.baseUrl}/svg/go-blue.svg`)
          break
        default:
          links.push(`${blogConfig.baseUrl}/svg/${tag}.svg`)
      }
    }
  })
  const encodedLinks = links.map((link) => {
    return encodeURIComponent(link)
  })
  const joined = encodedLinks.length ? '&images=' + encodedLinks.join('&images=') : false;
  return `${options.target}/${encodeURIComponent(title)}.${extension}?theme=${theme}&md=${md}&fontSize=${font}${joined ? joined : ''}`
}
// https://og-image.now.sh/**Hello**%20World.png?theme=dark&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fvercel-triangle-white.svg


posts.map((post) => {
  const fetchPath = genFetchPath(post.title, options.extension, options.theme, options.md, options.font, post.tags)
  fetch(fetchPath, { method: 'get', })
    .then(response => { console.log(response.url) })
    .catch(error => console.error(error))
})

// https://og-image.now.sh/Hello.png?theme=dark&md=0&fontSize=100px&images=https%3A%2F%2Foriverk.dev%2Fsvg%2Fruby.svg
// https://og-image.now.sh/Qiita.png?theme=dark&md=0&fontSize=100px&images=https://oriverk.dev/svg/ruby.svg