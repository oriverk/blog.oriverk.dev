import Router from 'next/router'
import { AppProps } from 'next/app'
import * as gtag from '../lib/gtag'
import { DARK_MODE, LIGHT_MODE } from '../style/color'

export default function MyApp({ Component, pageProps }: AppProps) {
  Router.events.on('routeChangeComplete', (url: string) => gtag.pageview(url))
  return (
    <>
      <Component {...pageProps} />
      <style jsx global>{`
        :root {
          --colorTextDefault: ${DARK_MODE.text.default};
          --colorTextLink: ${DARK_MODE.text.link};
          --colorTextDisable: ${DARK_MODE.text.gray};
          --colorBackgroundDefault ${DARK_MODE.background.default};
          --colorBackgroundPaper: ${DARK_MODE.background.paper};
        }

        *, *::before, *::after{
          box-sizing: border-box;
        }

        ::-webkit-scrollbar {
          width: .3rem;
        }
        
        /*スクロールバーの動く部分*/
        ::-webkit-scrollbar-thumb {
          background-color: #999;
          border-radius: .3rem;
        }

        body {
          margin: 0;
          font-family: 'Hiragino Sans', 'Meiryo', sans-serif;
          color: var(--colorTextDefault);
          font-weight: 400;
          font-size: 0.874rem;
          line-height: 1.43;
          letter-spacing: 0.01071em;
          background-color: var(--colorBackgroundDefault);
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
          color: var(--colorTextLink);
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
