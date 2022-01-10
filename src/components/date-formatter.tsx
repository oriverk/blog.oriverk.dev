import { parseISO, format } from 'date-fns'

interface Props {
  dateString: string
}

export const DateFormatter: React.VFC<Props> = (props) => {
  const { dateString } = props
  const date = parseISO(dateString)

  return <time dateTime={dateString}>{format(date, 'yyyy.MM.dd')}</time>
}
