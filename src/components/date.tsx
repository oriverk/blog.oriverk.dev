// import { parseISO, format } from 'date-fns'

// export function Date({ dateString }) {
//   const date = parseISO(dateString)
//   return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>
// }

import { parseISO, format } from 'date-fns'

export default function Date({ dateString }: { dateString: string }) {
  const date = parseISO(dateString)
  return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>
}