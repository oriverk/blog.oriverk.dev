import { useState, useEffect } from 'react'
import { AppProps } from 'next/app'
import Router from 'next/router'

import * as gtag from '../lib/gtag'
import { DARK_MODE, LIGHT_MODE } from '../style/color'
import { Themes, getTheme, setLocalStorageTheme, ThemeContext } from '../hooks/theme'

export default function MyApp({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState<Themes>(null)

  useEffect(() => {
    const currentTheme = getTheme() as Themes
    setTheme(currentTheme)
    setLocalStorageTheme(currentTheme)
    document.body.setAttribute('data-theme', currentTheme)
  }, [theme])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setLocalStorageTheme(newTheme)
    setTheme(newTheme)
  }
  
  Router.events.on('routeChangeComplete', (url: string) => gtag.pageview(url))
  return (
    <>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <Component {...pageProps} />
      </ThemeContext.Provider>
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
      `}</style>
    </>
  )
}
