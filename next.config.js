// const withMDX = require('@next/mdx')({
//   extension: /\.mdx?$/
// })

// module.exports = withMDX({
  //   pageExtensions: ['js', 'jsx', 'md', 'mdx']
  // })
  
const withPWA = require('next-pwa')
const withPlugins = require('next-compose-plugins')

const nextConfig = {}

module.exports = withPlugins(
  [
    [
      withPWA,
      {pwa: { dest: 'public' }}
    ],
  ],
  nextConfig
)