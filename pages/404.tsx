import Link from 'next/link'
import { styled } from 'goober'

import { Layout } from 'components/layouts'

interface Props {
  className?: string;
}

const Component: React.VFC<Props> = (props) => {
  const { className } = props
  return (
    <Layout>
      <section className={className}>
        <h1>pageNotFound</h1>
        <Link href="/">
          <a>
            Go back to Top
          </a>
        </Link>
      </section>
    </Layout>
  )
}

const StyledCompoent = styled(Component)`
  text-align: center;
`

const ContainerComponent: React.VFC = () => <StyledCompoent />

const PageComponent = ContainerComponent

export default PageComponent