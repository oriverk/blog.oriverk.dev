import Link from 'next/link'
import css from 'styled-jsx/css'
import { Layout } from '../components/Layout'
import { CustomHead } from '../components/general/Head'

const style = css`
article {
  padding: 5%;
  text-align: center;
}
`

const Component: React.FC = () => (
  <Layout>
    <CustomHead pageUrl='/404/' pageTitle='404' pageDescription='404 - Page Not Found.' />
    <article>
      <div>
        <h1>404 - Page Not Found</h1>
        <p><Link href='/'><a>Please go back to Home.</a></Link></p>
      </div>
    </article>
    <style jsx>{style}</style>
  </Layout>
)

export default Component