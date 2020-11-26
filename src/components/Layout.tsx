import css from 'styled-jsx/css'
import { Footer } from '../components/general/Footer'

const style = css`
div {
  width: 100%;
}
`

export const Layout: React.FC = ({ children }) => (
  <>
    <div>
      <main>
        {children}
      </main>
      <Footer />
    </div>
    <style jsx>{style}</style>
  </>
)