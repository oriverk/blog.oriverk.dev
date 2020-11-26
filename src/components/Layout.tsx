import { Footer } from '../components/general/Footer'

export const Layout: React.FC = ({ children }) => (
  <div>
    <main>
      {children}
    </main>
    <Footer />
  </div>
)