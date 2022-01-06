const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

// const { defaultConfig } = require("next/dist/server/config-shared");
const defaultConfig = {
  trailingSlash: true,
  optimizeFonts: true,
  reactStrictMode: true,
  images: {
    deviceSizes: [320, 420, 768, 1024, 1200],
    iconSizes: [],
    domains: ['res.cloudinary.com'],
    path: '/_next/image',
    loader: 'default',
  },
  webpack: (config) => ({
    ...config,
    externals: [...config.externals, 'sharp'],
  }),
}

const plugins = [withBundleAnalyzer];

module.exports = withPlugins(plugins, defaultConfig);
