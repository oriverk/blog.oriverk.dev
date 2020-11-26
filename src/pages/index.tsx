import { Layout } from '../components/Layout'
import { Top, About, History, Works } from '../components/HomeContents'
import { CustomHead } from '../components/general/Head'

const Component: React.FC = () => (
  <Layout>
    <CustomHead pageUrl='/' pageTitle='Home' pageDescription="Home | Kawano Yudai's site" />
    <Top />
    <About />
    <History />
    <Works />
  </Layout>
)

export default Component