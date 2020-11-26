import Link from 'next/link'
import { Layout } from '../components/Layout'
import { CustomHead } from '../components/general/Head'

const Component: React.FC = () => (
  <Layout>
    <CustomHead pageUrl='/404/' pageTitle='404' pageDescription='404 - Page Not Found.' />
    <div style={{ textAlign: 'center' }}>
      <h1>404 - Page Not Found</h1>
      <p><Link href='/'><a>Please go back to Home.</a></Link></p>
    </div>
  </Layout>
)

export default Component