import Router from 'next/router'
import { AppProps } from 'next/app'
import * as gtag from '../lib/gtag'
import { DARK_MODE, LIGHT_MODE } from '../style/color'
import { useState, useEffect, createContext } from 'react'
import { setLocalStorageTheme, getTheme } from '../context/theme'

export type Themes = 'light' | 'dark'
export const ThemeContext = createContext<{ theme: Themes; toggleTheme: () => void }>(
  {} as any
)

export default function MyApp({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState<Themes>(null)
  useEffect(() => {
    const currentTheme = getTheme() as Themes
    setTheme(currentTheme)
  }, [theme, setTheme])

  const toggleTheme = () => {
    const currentTheme = getTheme()
    const newTheme = currentTheme === 'light' ? 'dark' : 'light'
    setLocalStorageTheme(newTheme)
    setTheme(newTheme)
  }
  
  Router.events.on('routeChangeComplete', (url: string) => gtag.pageview(url))
  return (
    <>
      <ThemeContext.Provider value={{theme, toggleTheme}}>
        <Component {...pageProps} />
      </ThemeContext.Provider>
      <style jsx global>{`
        :root {
          --colorTextDefault: ${DARK_MODE.text.default};
          --colorTextLink: ${DARK_MODE.text.link};
          --colorTextGray: ${DARK_MODE.text.gray};
          --colorBackgroundDefault ${DARK_MODE.background.default};
          --colorBackgroundPaper: ${DARK_MODE.background.paper};
          --colorHoge: green;
        }

        [data-theme=light] {
          --colorTextDefault: ${LIGHT_MODE.text.default};
          --colorTextLink: ${LIGHT_MODE.text.link};
          --colorTextGray: ${LIGHT_MODE.text.gray};
          --colorBackgroundDefault ${LIGHT_MODE.background.default};
          --colorBackgroundPaper: ${LIGHT_MODE.background.paper};
          --colorHoge: red;
        }

        *, *::before, *::after{
          box-sizing: border-box;
        }

        ::-webkit-scrollbar {
          width: .3rem;
        }
        
        /*スクロールバーの動く部分*/
        ::-webkit-scrollbar-thumb {
          background-color: var(--colorTextGray);
        }

        body {
          margin: 0;
          font-family: 'Hiragino Sans', 'Meiryo', sans-serif;
          color: var(--colorTextDefault);
          background-color: var(--colorBackgroundDefault);
        }

        #__next{
          /* display: flex; */
          /* flex-direction: column; */
        }


        div, p, a, li, b{
          font-size: 1rem;
        }

        ul, ol {
          margin: .5rem 0;
          padding-left: 1.5rem;
        }

        a{
          text-decoration: none;
          color: var(--colorTextLink);
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
