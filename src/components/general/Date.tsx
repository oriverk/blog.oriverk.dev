import { parseISO, format } from 'date-fns'

type Props = {
  dateString: string
}

export function Date({ dateString }: Props) {
  const date = parseISO(dateString)
  return <time dateTime={dateString}>{format(date, 'LLL d, yyyy')}</time>
}