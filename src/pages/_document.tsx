import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { existsGaId, GA_TRACKING_ID } from '../lib/gtag'
import blogConfig from '../../blog.config'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang='en'>
        <Head>
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          {existsGaId ? (
            <>
              <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
              <script dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_TRACKING_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}/>
            </>
          ) : null }
          <meta name='theme-color' content={blogConfig.themeColor} />
          <meta content='developer, ruby, react' name='keywords' />
          <meta property='og:type' content='website' />
          <meta property='og:site_name' content={blogConfig.baseName} />
          <meta property='og:locale' content={blogConfig.lang} />
          <meta content='summary_large_image' name='twitter:card' />
          <meta content={blogConfig.sns.twitter} name='twitter:site' />
          <link rel='manifest' crossOrigin="use-credentials" href='./manifest.json' />
          <link rel="alternate" type="application/rss+xml" title={blogConfig.baseName} href="./rss.xml" />
          <link rel="alternate" type="application/atom+xml" title={blogConfig.baseName} href="./atom.xml" />
          <link rel="alternate" type="application/rss+xml" title={blogConfig.baseName} href="./sitemap.xml" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}