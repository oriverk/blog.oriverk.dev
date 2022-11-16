import { useCopyToClipboard } from 'react-use'
import { CheckIcon, ClipboardIcon } from '@heroicons/react/24/outline'

type Props = {
  code: string
}

export const CopyButton: React.FC<Props> = (props) => {
  const { code } = props
  const [{ error, value }, copyToClipboard] = useCopyToClipboard()
  const isCopied = !error && value;

  return (
    <button
      className=" text-gray-400 hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-700 rounded-lg p-1.5"
      onClick={() => copyToClipboard(code)}
      disabled={!!isCopied}
    >
      {!isCopied ? (
        <ClipboardIcon className='w-5 h-5' title="Copy" />
      ) : (
        <CheckIcon className='w-5 h-5 text-green-400' title="Copied!" />
      )}
    </button>
  )
}