import Link from 'next/link'
import { styled } from 'goober'

import { Layout } from 'components/layouts'

interface Props {
  className?: string
}

const Component: React.FC<Props> = (props) => {
  const { className } = props
  return (
    <Layout title="404: Page not found" path="/404/">
      <section className={className}>
        <h1>Page Not Found</h1>
        <Link href="/">
          Go back to Top
        </Link>
      </section>
    </Layout>
  )
}

const StyledCompoent = styled(Component)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const ContainerComponent: React.FC = () => <StyledCompoent />

const PageComponent = ContainerComponent

export default PageComponent
