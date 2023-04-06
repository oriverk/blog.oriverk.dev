import type { ReactNode } from 'react'
import { Header } from './header'
import { Main } from './main'
import { Footer } from './footer'

type Props = {
  children: ReactNode
}

export const Layout: React.FC<Props> = (props) => {
  const { children } = props
  return (
    <>
      <div className="mx-auto flex min-h-screen max-w-sm flex-col sm:max-w-2xl md:max-w-3xl">
        <Header />
        <Main>{children}</Main>
        <Footer />
      </div>
    </>
  )
}
