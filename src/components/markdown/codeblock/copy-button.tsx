import { useCopyToClipboard } from 'react-use'
import { CheckIcon, ClipboardIcon } from '@heroicons/react/24/outline'

type Props = {
  code: string
}

export const CopyButton: React.FC<Props> = (props) => {
  const { code } = props
  const [{ error, value }, copyToClipboard] = useCopyToClipboard()
  const isCopied = !error && value

  return (
    <button
      className=" rounded-lg p-1.5 text-gray-400 hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-700"
      onClick={() => copyToClipboard(code)}
      disabled={!!isCopied}
    >
      {!isCopied ? (
        <ClipboardIcon className="h-5 w-5" title="Copy" />
      ) : (
        <CheckIcon className="h-5 w-5 text-green-400" title="Copied!" />
      )}
    </button>
  )
}
