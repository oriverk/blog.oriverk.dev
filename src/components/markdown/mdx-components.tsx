import { H2, H3, H4 } from './headings'
import { Table } from './table'
import { Pre } from './pre'
import { InlineCode } from './inline-code'
import { CodeBlock } from './codeblock'
import { Image } from './image'
import { Anchor } from './anchor'

export const MDXComponents = {
  h2: H2,
  h3: H3,
  h4: H4,
  a: Anchor,
  inlineCode: InlineCode,
  img: Image,
  pre: (props: any) => {
    if (typeof props.children === 'string') return <Pre {...props} />
    return <CodeBlock {...props} />
  },
  table: Table,
}
