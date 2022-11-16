import { CustomSeoProps, CustomSeo } from '../seo'
import { Header } from './header'
import { Main } from './main'
import { Footer } from './footer'

type Props = CustomSeoProps & {
  children: React.ReactNode
}

export const Layout: React.FC<Props> = (props) => {
  const { children, ...restSeoProps } = props
  return (
    <>
      <CustomSeo {...restSeoProps} />
      <div className='flex flex-col mx-auto min-h-screen max-w-sm sm:max-w-2xl md:max-w-3xl'>
        <Header />
        <Main>{children}</Main>
        <Footer />
      </div>
    </>
  )
}
