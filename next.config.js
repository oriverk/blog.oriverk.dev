/** @type {import('next').NextConfig} */
// @next/bundle-analyzerが本番環境で読み込まれないようにする
// https://zenn.dev/catnose99/scraps/661d77118aa2af
const withBundleAnalyzer = process.env.ANALYZE === 'true'
    ? require('@next/bundle-analyzer')({ enabled: true })
    : (config) => config;

// const { defaultConfig } = require("next/dist/server/config-shared");
const defaultConfig = {
  trailingSlash: true,
  optimizeFonts: true,
  reactStrictMode: true,
  images: {
    deviceSizes: [320, 420, 768, 1024, 1200],
    domains: ['res.cloudinary.com', 'i.gyazo.com', 'i.imgur.com'],
    path: '/_next/image',
    loader: 'default',
  },
  webpack: (config) => ({
    ...config,
    externals: [...config.externals, 'sharp'],
  }),
}

module.exports = withBundleAnalyzer(defaultConfig)