
type Props = {
  children: React.ReactNode
}

export const CodeContainer: React.FC<Props> = ({ children }) => (
  // background: #011627;
  <div className="code-container">
    {children}
  </div>
) 
