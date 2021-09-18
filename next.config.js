const withPlugins = require('next-compose-plugins')
const withPWA = require('next-pwa')
const withBundleAnalyzer = require('@next/bundle-analyzer')

const i18n = require('./i18n.config')

const nextConfig = {
  trailingSlash: true,
  i18n: {
    locales: i18n.locales,
    defaultLocale: i18n.defaultLocale,
    // locales: ['en', 'ja'],
    // defaultLocale: 'en',
  },
}

module.exports = withPlugins(
  [
    [
      withBundleAnalyzer, {
        enabled: process.env.ANALYZE === 'true',
      }
    ],
    [
      withPWA, {
        pwa: {
          disable: process.env.NODE_ENV === 'development',
          dest: 'public'
        }
      }
    ],
  ],
  nextConfig
)

