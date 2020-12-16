import css from 'styled-jsx/css'
import { Layout } from '../components/Layout'
import { CustomHead } from '../components/common/Head'
import { Header } from '../components/common/Header'
import { Top, About, History, Works } from '../components/HomeContents'

const style = css`

`

const Component: React.FC = () => (
  <Layout>
    <CustomHead pageUrl='/' pageTitle='Home' pageDescription="Home | Kawano Yudai's site" />
    {/* <Header className='kkk'
      pageLink='/'
      src='/assets/home/sunrise.jpg'
      alt=''
      title='Kawano Yudai'
      subTitle='B.Agr'
    /> */}
    <Top />
    <About />
    <History />
    <Works />
  </Layout>
)

export default Component