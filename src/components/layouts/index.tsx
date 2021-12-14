import { Header } from './header'
import { Main } from './main'
import { Footer } from './footer'

export const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </>
  )
}
