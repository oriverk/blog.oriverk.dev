import { useContext } from 'react'
import Link from 'next/link'
import { ThemeContext } from '../pages/_app' 
import { Footer } from './common/Footer'
import blogConfig from 'blog.config'

export const Layout: React.FC = ({ children }) => {
  const { theme, toggleTheme } = useContext(ThemeContext)
  return (
    <>
      <div>
        <header>
          <h1 className='baseName'>
            <Link href='/'>
              <a>{blogConfig.baseName}</a>
            </Link>
          </h1>
          <button onClick={() => toggleTheme()}>
            {theme === 'light' ? '🌞' : '🌙'}
          </button>
        </header>
        <main>
          {children}
        </main>
        <Footer />
      </div>
      <style jsx>{`
        div {
          min-height: 100vh;
          background-color: var(--colorBackgroundDefault);
          color: var(--colorTextDefault);
          transition: all 0.25s linear;
        }

        header {
          display: flex;
          position: fixed;
          top: 0;
          z-index: 50;
          width: 100%;
          /* background-color: var(--colorTextLink); */
          background-color: rgba(200, 200, 200, 0.5);
          -webkit-backdrop-filter: blur(10px);
          backdrop-filter: blur(10px);
        }

        .baseName > a {
          margin: 0;
          text-decoration: none;
          font-size: 1.25rem;
          color: var(--colorTextDefault);
        }
      `}</style>
    </>
  )
}