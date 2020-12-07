import { parseISO, format } from 'date-fns'

type Props = {
  className?: string,
  dateString: string
}

export const Date: React.FC<Props> = ({ className, dateString }) => {
  const date = parseISO(dateString)
  return <time className={className} dateTime={dateString}>{format(date, 'LLL d, yyyy')}</time>
}