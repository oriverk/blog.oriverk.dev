type Props = {
  children: React.ReactNode
}

export const Pre: React.FC<Props> = ({ children }) => (
  <pre className="codeblock-container my-2 rounded-sm">{children}</pre>
)
