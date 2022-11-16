import { CopyButton } from './copy-button'

type Props = {
  filename?: string
  rawCode: string
}

export const CodeNav: React.FC<Props> = (props) => {
  const { filename, rawCode } = props

  return (
    <div className="flex gap-1 -mb-6">
      {filename
        ? <div className="filename" data-filename={filename} translate="no" />
        : <div />
      }
      <CopyButton code={rawCode} />
    </div>
  )
}
