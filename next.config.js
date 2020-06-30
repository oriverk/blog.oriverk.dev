// const withMDX = require('@next/mdx')({
//   extension: /\.mdx?$/
// })

// module.exports = withMDX({
  //   pageExtensions: ['js', 'jsx', 'md', 'mdx']
  // })
  
const withPlugins = require('next-compose-plugins')
const nextConfig = {}

const withPWA = require('next-pwa')

module.exports = withPlugins(
  [
    [
      withPWA,
      {
        pwa: {
          disable: process.env.MODE_ENV === 'development',
          dest: 'public'
        }
      }
    ],
  ],
  nextConfig
)