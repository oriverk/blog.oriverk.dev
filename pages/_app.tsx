import React from 'react'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import { setup } from 'goober'
import { prefix } from 'goober/prefixer'
import NextHeadSeo from 'next-head-seo'

import { GlobalStyles } from 'styles/goober'

import packageJson from '../package.json'

const blogPath = process.env.NEXT_PUBLIC_BLOG_PATH || ''

// goober's needs to know how to render the `styled` nodes.
// So to let it know, we run the `setup` function with the
// `createElement` function and prefixer function.
setup(React.createElement, prefix)

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="format-detection" content="email=no,telephone=no,address=no" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
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
          card: 'summary_large_image'
        }}
      />
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  )
}
