import Link from 'next/link'
import { Heading } from './Heading'
import { Pre } from './pre'
import { InlineCode } from './inline-code'
import { CodeBlock } from './codeblock'

export const MDXComponents: Record<string, (props: any) => JSX.Element> = {
  h2: (props) => <Heading depth={2} {...props} />,
  h3: (props) => <Heading depth={3} {...props} />,
  h4: (props) => <Heading depth={4} {...props} />,
  a: (props) => <Link {...props} />,
  inlineCode: (props) => <InlineCode {...props} />,
  pre: (props) => {
    if (typeof props.children === 'string') return <Pre {...props} />
    return <CodeBlock {...props} />
  },
}
