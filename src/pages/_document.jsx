import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

const manifest = require('../../public/manifest.json')

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang='en'>
        <Head>
          <meta name='theme-color' content={manifest.theme_color} />
          <meta content='developer, ruby, react' name='keywords' />
          <meta property='og:type' content='website' />
          <meta property='og:site_name' content={manifest.name} />
          <meta property='og:locale' content={manifest.lang} />
          <meta content='summary_large_image' name='twitter:card' />
          <meta content='@not_you_die' name='twitter:site' />
          <link rel='manifest' crossOrigin="use-credentials" href='./manifest.json' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}