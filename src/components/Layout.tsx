import { useContext } from 'react'
import { ThemeContext } from '../pages/_app' 
import { Footer } from './common/Footer'

export const Layout: React.FC = ({ children }) => {
  const { theme, toggleTheme } = useContext(ThemeContext)
  return (
    <>
      <div data-theme={theme}>
        <header>
          <button onClick={()=>toggleTheme()}>{theme === 'light' ? '🌞' : '🌙'}</button>
        </header>
        <main>
          {children}
        </main>
        <Footer />
      </div>
      <style jsx>{`
        header {
          height: 1rem;
          width: 100%;
          position: fixed;
          top: 0;
          z-index: 50;
          background-color: var(--colorHoge);
          transition: all 0.25s linear;
        }
      `}</style>
    </>
  )
}