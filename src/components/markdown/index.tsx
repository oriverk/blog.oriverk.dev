import { MDXRemote } from 'next-mdx-remote'

import { MDXComponents } from './mdx-components'

type Props = {
  compiledSource: string
}

export const MarkdownContent: React.FC<Props> = (props) => {
  const { compiledSource } = props

  return (
    <div className="markdown mx-auto prose prose-invert max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-2xl break-words overflow-x-auto">
      <MDXRemote compiledSource={compiledSource} components={MDXComponents} />
    </div>
  )
}
