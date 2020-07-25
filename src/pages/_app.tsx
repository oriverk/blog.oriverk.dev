import React, { useEffect } from 'react'
import Router from 'next/router'
import Head from 'next/head'
import * as gtag from '../lib/gtag'

import { AppProps } from 'next/app'

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }
    Router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      Router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [])

  return (
    <React.Fragment>
      <Head>
        <meta charSet='utf-8' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width' />
        <meta name='format-detection' content='email=no,telephone=no,address=no' />
        <link rel='apple-touch-icon' sizes='180x180' href='/assets/human512x512.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='/favicon/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/favicon/favicon-16x16.png' />
        <link rel='manifest' crossOrigin="use-credentials" href='/manifest.json' />
      </Head>
      <Component {...pageProps} />
      <style jsx global>{`
        ::-webkit-scrollbar {
          width: 0;
          height: .5rem;
        }
        
        /*スクロールバーの動く部分*/
        ::-webkit-scrollbar-thumb {
          background-color: rgb(128, 128, 128);
          border-radius: .3rem;
        }

        html {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          box-sizing: border-box;
        }

        *{
          font-family: 'Hiragino Sans', 'Meiryo', sans-serif;
          --drawerWidth: 250px;
          --swipeDrawerWidth: 85vw;
          --bottomNavHeight: 55px
        }

        *, *::before, *::after{
          box-sizing: border-box;
        }

        body {
          margin: 0;
          color: #EEE;
          font-weight: 400;
          font-size: 0.874rem;
          line-height: 1.43;
          letter-spacing: 0.01071em;
          background-color: #303030;
        }

        #__next{
          display: flex;
        }

        h1 {
          text-align: center;
        }

        div, p, a, li, b{
          font-size: 1rem;
        }

        ul, ol {
          margin: .5rem 0;
          padding-left: 1.5rem;
        }

        ul li{
          padding-bottom: 1rem;
        }

        a{
          color: #50CAF9;
          text-decoration: none;
        }

        strong, b {
          font-weight: 700;
        }

        code {
          display: inline-block;
          margin: .1rem .3rem;
          padding: 0 .4rem;
          background-color: #555;
          color: #EEE;
        }

        pre {
          border: .8px solid grey;
          border-radius: 0.25rem;
          display: block;
          white-space: pre;
          background-color: #1E1E1E;
          width: 100%;
          max-width: 1000px;
          margin: 1rem 0;
          overflow: auto;
        }

        picture, video {
          width: 100%;
        }
        
        source, img {
          display: block;
          width: 100%;
          margin: 1rem 0;
          background-color: #424242;
        }

        blockquote {
          color: #BBB;
          border-left: 5px solid #BBB;
          margin: 1rem 0;
          padding: .5rem 0 .5rem .5rem;
        }
      `}</style>
    </React.Fragment>
  )
}
