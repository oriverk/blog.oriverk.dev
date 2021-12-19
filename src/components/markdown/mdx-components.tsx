import { H2, H3, H4 } from './headings'
import { Table } from './table'
import { InlineCode } from "./inline-code"
import { Pre } from './pre'
import { CodeBlock } from "./codeblock"

export const MDXComponents = {
  h2: (props: any) => <H2 {...props} />,
  h3: (props: any) => <H3 {...props} />,
  h4: (props: any) => <H4 {...props} />,
  code: InlineCode,
  pre: (props: any) => {
    if (typeof props.children === 'string') return <Pre {...props} />
    return <CodeBlock {...props} />
  },
  table: Table,
}