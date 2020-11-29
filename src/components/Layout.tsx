import { Footer } from './common/Footer'

export const Layout: React.FC = ({ children }) => (
  <div>
    <main>
      {children}
    </main>
    <Footer />
  </div>
)