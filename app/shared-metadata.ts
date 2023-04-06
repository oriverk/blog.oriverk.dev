import { type Metadata } from "next"
import packageJson from "../package.json"

const blogPath = process.env.NEXT_PUBLIC_BLOG_PATH || "http://localhost:3000"
const domain = blogPath.replace('https://', '');

export const sharedMetadata: Metadata = {
  // Note: This is the same values as the default value set
  // You likely don't need to change this, but it's included for completeness
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  title: {
    template: `%s | ${domain}`,
    default: domain,
  },
  description: 'description',
  keywords: packageJson.keywords,
  colorScheme: 'dark',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/favicon/icon16.png', sizes: '16x16' },
      { url: '/favicon/icon32x.png', sizes: '32x32' },
    ],
    other: [
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        url: '/favicon/icon180x.png'
      }
    ]
  },
  themeColor: '#00e1ee',
  openGraph: {
    title: domain,
    description: 'description',
    url: blogPath,
    siteName: domain,
    images: [
      {
        url: '/assets/sugarloaf-adelaide.png',
      }
    ],
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: domain,
    description: 'description',
    site: '@not_you_die',
    creator: '@not_you_die',
    images: ['/assets/sugarloaf-adelaide.png']
  },
  alternates: {
    canonical: blogPath,
    types: {
      'application/rss+xml': '/feed.xml',
    }
  }
}