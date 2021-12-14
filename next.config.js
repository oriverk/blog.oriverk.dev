const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const runtimeCaching = require('next-pwa/cache');
const withPWA = require('next-pwa')({
  pwa: {
    disable: process.env.NODE_ENV === 'development',
    dest: 'public',
    runtimeCaching,
  },
});

// const { defaultConfig } = require("next/dist/server/config-shared");
const defaultConfig = {
  trailingSlash: true,
  optimizeFonts: true,
  reactStrictMode: true,
  images: {
    deviceSizes: [320, 420, 768, 1024, 1200],
    iconSizes: [],
    domains: [],
    path: '/_next/image',
    loader: 'default',
  },
  webpack: (config) => ({
    ...config,
    externals: [...config.externals, 'sharp'],
  }),
};

const plugins = [withBundleAnalyzer, withPWA];

module.exports = withPlugins(plugins, defaultConfig);
