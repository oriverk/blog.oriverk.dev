import React from 'react'
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'
import { useAmp } from 'next/amp'
import { GA_TRACKING_ID } from '../lib/gtag'
import blogConfig from '../../blog.config'
import AmpAnalytics from '../components/amp/AmpAnalytics'

type AmpWrapProps = {
  ampOnly?: any
  nonAmp?: any
}

function AmpWrap({ ampOnly, nonAmp }: AmpWrapProps) {
  const isAmp = useAmp()
  if (ampOnly) return isAmp && ampOnly
  return !isAmp && nonAmp
}

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang='en'>
        <Head>
          <meta name='theme-color' content={blogConfig.themeColor} />
          <meta content='developer, ruby, react' name='keywords' />
          <meta property='og:type' content='website' />
          <meta property='og:site_name' content={blogConfig.baseName} />
          <meta property='og:locale' content={blogConfig.lang} />
          <meta content='summary_large_image' name='twitter:card' />
          <meta content={blogConfig.sns.twitter} name='twitter:site' />
          <link rel='manifest' crossOrigin='use-credentials' href='./manifest.json' />
          <link rel='alternate' type='application/rss+xml' title={blogConfig.baseName} href='./rss.xml' />
          <link rel='alternate' type='application/atom+xml' title={blogConfig.baseName} href='./atom.xml' />
          <link rel='alternate' type='application/rss+xml' title={blogConfig.baseName} href='./sitemap.xml' />
        </Head>
        <body>
          <Main />
          <NextScript />
          {/* AMP - Google Analytics */}
          <AmpWrap
            ampOnly={
              <AmpAnalytics
                type='googleanalytics'
                script={{
                  vars: {
                    account: GA_TRACKING_ID,
                    gtag_id: GA_TRACKING_ID,
                    config: {
                      [GA_TRACKING_ID]: { groups: 'default' },
                    },
                  },
                  triggers: {
                    trackPageview: {
                      on: 'visible',
                      request: 'pageview',
                    },
                  },
                }}
              />
            }
          />
          {/* Non-AMP - Google Analytics */}
          <AmpWrap
            nonAmp={
              <>
                <script
                  async
                  src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
                />
                <script
                  dangerouslySetInnerHTML={{
                    __html: `
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());
                      gtag('config', '${GA_TRACKING_ID}');
                    `,
                  }}
                />
              </>
            }
          />
        </body>
      </Html>
    )
  }
}