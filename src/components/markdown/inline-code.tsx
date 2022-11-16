type Props = {
  children: React.ReactNode
}

export const InlineCode: React.FC<Props> = ({ children }) => (
  <code translate='no'>{children}</code>
)
