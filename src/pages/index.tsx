import { Layout } from '../components/Layout'
import { useRouter } from 'next/router'

import { CustomHead } from '../components/common/Head'
import {
  Top, About, History,
  Works
} from '../components/HomeContents'

const Component: React.FC = () => {
  const { locale } = useRouter()
  return (
    <Layout isHome>
      <CustomHead pageUrl={`/${locale}/`} pageTitle='Home' pageDescription="Home | Kawano Yudai's site" />
      <Top />
      <About />
      <History />
      <Works />
    </Layout>
  )
}

export default Component