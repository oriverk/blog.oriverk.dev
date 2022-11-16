type Props = {
  id: string
  children: React.ReactNode;
}

export const H4: React.FC<Props> = (props) => {
  const { id, children } = props

  return (
    <h4 id={id}>
      <a href={`#${id}`}>{children}</a>
    </h4>
  )
}
