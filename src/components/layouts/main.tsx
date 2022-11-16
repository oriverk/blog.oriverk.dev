type Props = {
  children: React.ReactNode
}

export const Main: React.FC<Props> = ({ children }) => (
  <main className="w-full p-4">
    {children}
  </main>
)
