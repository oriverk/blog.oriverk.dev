import { Header } from './common/Header'
import { Footer } from './common/Footer'

type Props = {
  isHome?: boolean
}

export const Layout: React.FC<Props> = ({ children, isHome }) => {
  return (
    <>
      <div className='root'>
        {!isHome && (
          <Header />
        )}
        <main>
          {children}
        </main>
        <Footer />
      </div>
      <style jsx>{`
        .root {
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