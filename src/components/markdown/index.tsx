import { MDXRemote } from 'next-mdx-remote'

import { MDXComponents } from './mdx-components'

type Props = {
  compiledSource: string
}

export const MarkdownContent: React.FC<Props> = (props) => {
  const { compiledSource } = props

  return (
    <div className="markdown prose prose-invert mx-auto max-w-sm overflow-x-auto break-words sm:max-w-md md:max-w-2xl lg:max-w-2xl">
      <MDXRemote compiledSource={compiledSource} components={MDXComponents} />
    </div>
  )
}
