import type { FC } from 'react'
import { CopyButton } from './copy-button'

type Props = {
  filename?: string
  rawCode: string
}

export const CodeNav: FC<Props> = (props) => {
  const { filename, rawCode } = props

  return (
    <div className="-mb-6 flex gap-1">
      {filename ? <div className="filename" data-filename={filename} translate="no" /> : <div />}
      <CopyButton code={rawCode} />
    </div>
  )
}
