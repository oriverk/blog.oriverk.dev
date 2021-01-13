import { parseISO, format } from 'date-fns'
import ja from 'date-fns/locale/ja'
import enUs from 'date-fns/locale/en-US'

type Props = {
  dateString: string,
  locale?: string
}

export const Date: React.FC<Props> = ({ dateString, locale }) => {
  const date = parseISO(dateString)
  if (locale && locale === 'ja') {
    return (
      <time dateTime={dateString}>
        {format(date, 'yyyy年LLLd日', { locale: ja })}
      </time>
    )
  }
  return (
    <time dateTime={dateString}>
      {format(date, 'LLL d, yyyy', { locale: enUs })}
    </time>
  )
}