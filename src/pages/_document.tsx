import React from 'react'
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'
import { GA_TRACKING_ID } from '../lib/gtag'
import blogConfig from '../../blog.config'

// changeable meta data in Head is located at /src/components/common/Head.tsx
export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <meta name='format-detection' content='email=no,telephone=no,address=no' />
          <meta name='theme-color' content={blogConfig.themeColor} />
          <meta content='developer, react, nextjs, typescript' name='keywords' />
          <meta property='og:type' content='website' />
          <meta property='og:site_name' content={blogConfig.baseName} />
          <meta content='summary_large_image' name='twitter:card' />
          <meta content={blogConfig.sns.twitter} name='twitter:site' />
          <link rel='icon' type='image/png' sizes='32x32' href='/favicon/favicon-32x32.png' />
          <link rel='icon' type='image/png' sizes='16x16' href='/favicon/favicon-16x16.png' />
          <link rel='apple-touch-icon' sizes='180x180' href='/assets/human512x512.png' />
          <link rel='manifest' crossOrigin='use-credentials' href='/manifest.json' />
          <link rel='alternate' type='application/rss+xml' title={blogConfig.baseName} href='/rss.xml' />
          <link rel='alternate' type='application/atom+xml' title={blogConfig.baseName} href='/atom.xml' />
          <link rel='alternate' type='application/rss+xml' title={blogConfig.baseName} href='/sitemap.xml' />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
          <script dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}');
            `,
          }}
          />
        </body>
      </Html>
    )
  }
}