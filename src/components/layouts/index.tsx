import { styled } from 'goober'

import { CustomSeoProps, CustomSeo } from '../seo'
import { Header } from './header'
import { Main } from './main'
import { Footer } from './footer'

const StyledComponent = styled('div')`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

export const Layout: React.FC<CustomSeoProps> = (props) => {
  const { children, ...restSeoProps } = props
  return (
    <>
      <CustomSeo {...restSeoProps} />
      <StyledComponent>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </StyledComponent>
    </>
  )
}
