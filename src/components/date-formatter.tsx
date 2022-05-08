import { parseISO, format } from 'date-fns'

export interface DateFormatterProps {
  dateString: string
}

export const DateFormatter: React.FC<DateFormatterProps> = (props) => {
  const { dateString } = props
  const date = parseISO(dateString)

  return <time dateTime={dateString}>{format(date, 'yyyy.MM.dd')}</time>
}
