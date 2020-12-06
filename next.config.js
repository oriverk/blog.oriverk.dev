const withPlugins = require('next-compose-plugins')

const withPWA = require('next-pwa')
const optimizedImages = require('next-optimized-images')

const nextConfig = {
  trailingSlash: true,
}

const nextPwaConfig = {
  pwa: {
    disable: process.env.NODE_ENV === 'development',
    dest: 'public'
  }
}

const nextOptimizedImagesConfig = {
  optimizeImages: process.env.NODE_ENV !== 'development',
  optimizeImagesInDev: true,
  removeOriginalExtension: true,
  responsive: {
    disable: process.env.NODE_ENV === 'development',
    adapter: require('responsive-loader/sharp'),
    sizes: [640, 960, 1200, 1800],
  },
}

module.exports = withPlugins(
  [
    [
      withPWA, nextPwaConfig
    ],
    [
      optimizedImages, nextOptimizedImagesConfig
    ],
  ],
  nextConfig
)