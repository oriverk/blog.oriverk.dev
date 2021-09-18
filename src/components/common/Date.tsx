import { parseISO, format } from 'date-fns'
import ja from 'date-fns/locale/ja'
import enUs from 'date-fns/locale/en-US'

type Props = {
  dateString: string,
  locale?: string
}

export const Date: React.VFC<Props> = ({ dateString, locale }) => {
  // let lang: string
  // if (!locale.split('-')) {
  //   lang = locale
  // } else {
  //   lang = locale.split('-')[0]
  // }
  const lang = locale.split('-')[0]
  const date = parseISO(dateString)

  if (lang && lang === 'ja') {
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

export function getI18nDate(dateString: string, locale: string) {
  const lang = locale.split('-')[0]
  const date = parseISO(dateString)

  if (lang === 'ja') {
    return format(date, 'yyyy年LLLd日', { locale: ja })
  }
  return format(date, 'LLL d, yyyy', { locale: enUs })
}