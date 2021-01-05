import { AppProps } from 'next/app'
import Router from 'next/router'
import { IconContext } from 'react-icons'

import * as gtag from '../lib/gtag'
import { DARK_MODE, LIGHT_MODE } from '../style/color'
import { ThemeProvider } from '../hooks/theme'

export default function MyApp({ Component, pageProps }: AppProps) {  
  Router.events.on('routeChangeComplete', (url: string) => gtag.pageview(url))

  return (
    <>
      <ThemeProvider>
        <IconContext.Provider value={{ className: 'react-icons' }}>
          <Component {...pageProps} />
        </IconContext.Provider>
      </ThemeProvider>
      <style jsx global>{`
        :root {
          --colorWhite: #FFF;
          --colorBlack: #111;
          --transitionTimeFunc: 0.25s linear;
          --zIndexIcons: 2;

          --colorTextDefault: ${DARK_MODE.text.default};
          --colorTextLink: ${DARK_MODE.text.link};
          --colorTextGray: ${DARK_MODE.text.gray};
          --colorBackgroundDefault ${DARK_MODE.background.default};
          --colorBackgroundPaper: ${DARK_MODE.background.paper};
        }

        [data-theme=light] {
          --colorTextDefault: ${LIGHT_MODE.text.default};
          --colorTextLink: ${LIGHT_MODE.text.link};
          --colorTextGray: ${LIGHT_MODE.text.gray};
          --colorBackgroundDefault ${LIGHT_MODE.background.default};
          --colorBackgroundPaper: ${LIGHT_MODE.background.paper};
        }

        *, *::before, *::after{
          box-sizing: border-box;
        }

        #__next{
          /* display: flex; */
          /* flex-direction: column; */
        }

        body {
          margin: 0;
        }

        a {
          text-decoration: none;
          color: var(--colorTextLink);
        }
        
        a:hover, a:active {
          text-decoration: underline;
        }

        ul, ol {
          margin: .5rem 0;
          padding-left: 1.5rem;
        }

        source, img {
          width: 100%;
          height: auto;
          object-fit: cover;
        }

        p > code,
        pre > code {
          font-size: 1rem;
        }

        .react-icons, .wantedlySvg, .search-icon {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 1.25rem;
          height: 1.25rem;
          fill: var(--colorBackgroundDefault);
          transition: fill var(--transitionTimeFunc);
        }
        @media( min-width: 960px ){
          .react-icons {
            width: 1.5rem;
            height: 1.5rem;
          }
        }
      `}</style>
    </>
  )
}
