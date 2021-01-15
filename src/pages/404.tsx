import Link from 'next/link'
import { useRouter } from 'next/router'
import css from 'styled-jsx/css'

import { Layout } from '../components/Layout'
import { CustomHead } from '../components/common/Head'
import { useTranslation } from '../hooks/translation'

const style = css`
article {
  padding: 5%;
  text-align: center;
}
`

const Component: React.FC = () => {
  const { locale } = useRouter()
  const pageNotFound = useTranslation('ERROR_404')
  const backToTop = useTranslation('BACK_TO_TOP')
  return (
    <Layout>
      <CustomHead pageUrl={`/${locale}/404/`} pageTitle='404' pageDescription='404 - Page Not Found.' />
      <article>
        <div>
          <h1>{pageNotFound}</h1>
          <p><Link href='/' locale={locale}><a>{backToTop}</a></Link></p>
        </div>
      </article>
      <style jsx>{style}</style>
    </Layout>
  )
}

export default Component