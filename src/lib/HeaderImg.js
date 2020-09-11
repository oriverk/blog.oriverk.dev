import fs from 'fs'
import path from 'path'

const svgFiles = fs.readdirSync(path.join(process.cwd(), '/public/svg'))
console.log(path.join(process.cwd(), 'public/svg'))
console.log(svgFiles)
const svgs = svgFiles.map((svgFile) => {
  return svgFile.replace(/\.svg/, '')
})
svgs.push('vercel', 'next', 'go')
console.log(svgs)

const options = {
  target: 'https://ogp.oriverk.dev',
  extension: 'png',
  theme: 'dark',
  md: '0',
  font: '100px'
}

function convertTag2Link(tags) {
  const links = []
  tags.map((tag) => {
    if (svgs.includes(tag)) {
      switch (tag) {
        case 'vercel':
          theme === 'light' ? links.push(`${blogConfig.baseUrl}/svg/vercel-triangle-black.svg`) : links.push(`${blogConfig.baseUrl}/svg/vercel-triangle-white.svg`)
          break
        case 'next':
          theme === 'light' ? links.push(`${blogConfig.baseUrl}/svg/nextjs-black-logo.svg`) : links.push(`${blogConfig.baseUrl}/svg/nextjs-white-logo.svg`)
          break
        case 'rust':
          theme === 'light' ? links.push(`${blogConfig.baseUrl}/svg/rust.svg`) : links.push(`${blogConfig.baseUrl}/svg/rust-white.svg`)
          break
        case 'go':
          links.push(`${blogConfig.baseUrl}/svg/go-blue.svg`)
          break
        default:
          links.push(`${blogConfig.baseUrl}/svg/${tag}.svg`)
      }
    }
  })
}

export function getFetchPath(title, theme, md, tags) {
  const links = convertTag2Link(tags)
  const encodedLinks = links.map((link) => {
    return encodeURIComponent(link)
  })
  const joined = encodedLinks.length ? `&fontSize=${options.fontSize}&images=` + encodedLinks.join('&images=') : false;
  return `${options.target}/${encodeURIComponent(title)}.${options.extension}?theme=${theme}&md=${md}${joined ? joined : ''}`
}

// function getImage(src, width = 'auto', height = '225') {
//   return `<img
//         class='logo'
//         alt='Generated Image'
//         src='${src}'
//         width='${sanitizeHtml(width)}'
//         height='${sanitizeHtml(height)}'
//     />`
// }

// export function HeaderImg() {
//   return (
//     <div>
//       <div className='spacer'>
//         <div className='logo-wrapper'>
//           post.tags.svg
//         </div>
//       </div>
//       <div className='spacer'>
//         <div className='heading'>
//           post.title
//         </div>

//       </div>
//     </div>
//   )
// }