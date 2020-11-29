import Router from 'next/router'
import { AppProps } from 'next/app'
import * as gtag from '../lib/gtag'

export default function MyApp({ Component, pageProps }: AppProps) {
  Router.events.on('routeChangeComplete', (url: string) => gtag.pageview(url))
  return (
    <>
      <Component {...pageProps} />
      <style jsx global>{`
        ::-webkit-scrollbar {
          width: .3rem;
        }
        
        /*スクロールバーの動く部分*/
        ::-webkit-scrollbar-thumb {
          background-color: #999;
          border-radius: .3rem;
        }

        html {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        *{
          font-family: 'Hiragino Sans', 'Meiryo', sans-serif;
          --drawerWidth: 250px;
          --swipeDrawerWidth: 90vw;
          --bottomNavHeight: 55px;
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

          overflow-y: scroll;
        }

        #__next{
          /* display: flex; */
          /* flex-direction: column; */
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

        source, img {
          width: 100%;
          height: auto;
          object-fit: cover;
        }
      `}</style>
    </>
  )
}
