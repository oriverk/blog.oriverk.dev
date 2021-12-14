import React from 'react'
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'
import { extractCss } from 'goober'

import { GA_TRACKING_ID } from '../lib/gtag'
import blogConfig from '../../blog.config'
import i18nConfig from '../../i18n.config'
const { locales, defaultLocale } = i18nConfig
const langs = locales.map((locale) => { return locale.split('-')[0] }) || [defaultLocale]

// changeable meta data in Head is located at /src/components/common/Head.tsx
export default class MyDocument extends Document<{ css: string }> {
  static async getInitialProps({ renderPage }: DocumentContext) {
    const page = await renderPage()
    // Extrach the css for each page render
    const css = extractCss()
    return { ...page, css }
  }

  render() {
    return (
      <Html>
        <Head>
          <style
            id={'_goober'}
            // And defined it in here
            dangerouslySetInnerHTML={{ __html: ' ' + this.props.css }}
          />
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
          {langs.map((lang) => (
            <link rel='alternate' type='application/rss+xml' title={`${blogConfig.baseName} Language: ${lang.toUpperCase()}`} href={`/rss.${lang}.xml`} key={lang}/>
          ))}
          <link rel='sitemap' type='text/xml' href='/sitemap.xml' />
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