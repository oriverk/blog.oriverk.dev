type Props = {
  id: string
  children: React.ReactNode;
}

export const H3: React.FC<Props> = (props) => {
  const { id, children } = props

  return (
    <h3 id={id}>
      <a href={`#${id}`}>{children}</a>
    </h3>
  )
}
