// const withMDX = require('@next/mdx')({
//   extension: /\.mdx?$/
// })



module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    // Important: return the modified config
    config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//))
    return config
  },
  webpackDevMiddleware: config => {
    // Perform customizations to webpack dev middleware config
    // Important: return the modified config
    return config
  },
}

// module.exports = withMDX({
  //   pageExtensions: ['js', 'jsx', 'md', 'mdx']
  // })
  
const withPWA = require('next-pwa')

module.exports = withPWA({
    pwa: {
        dest: 'public'
    }
})