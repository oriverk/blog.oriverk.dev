type Props = {
  number: number
  code: string
}

export const LineNumber: React.FC<Props> = (props) => {
  const { number } = props

  return (
    <div className="line-number">
      <span data-line-number={number} />
    </div>
  )
}