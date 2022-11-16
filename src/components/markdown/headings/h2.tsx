type Props = {
  id: string
  children: React.ReactNode;
}

export const H2: React.FC<Props> = (props) => {
  const { id, children } = props

  return (
    <h2 id={id}>
      <a href={`#${id}`}>{children}</a>
    </h2>
  )
}
