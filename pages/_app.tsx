import React from 'react'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import NextHeadSeo from 'next-head-seo'

import packageJson from '../package.json'
import 'styles/globals.scss'

const blogPath = process.env.NEXT_PUBLIC_BLOG_PATH || ''

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="format-detection" content="email=no,telephone=no,address=no" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/icon16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/icon32x.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/icon180x.png" />
        <link rel="alternate" type="application/rss+xml" title="RSS" href="/feed.xml" />
        <meta name="theme-color" content="#00e1ee" />
        <meta content={packageJson.keywords.join(', ')} name="keywords" />
      </Head>
      <NextHeadSeo
        og={{
          image: `${blogPath}/assets/sugarloaf-adelaide.png`,
          type: 'article',
          siteName: packageJson.name,
        }}
        twitter={{
          card: 'summary_large_image',
        }}
      />
      <Component {...pageProps} />
    </>
  )
}
