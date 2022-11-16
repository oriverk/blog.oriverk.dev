import { H2, H3, H4 } from './headings'
import { Pre } from './pre'
import { InlineCode } from './inline-code'
import { CodeBlock } from './codeblock'
import { Image } from './image'
import { Anchor } from './anchor'

export const MDXComponents = {
  h2: (props: any) => <H2 {...props} />,
  h3: (props: any) => <H3 {...props} />,
  h4: (props: any) => <H4 {...props} />,
  a: (props: any) => <Anchor {...props} />,
  inlineCode: (props: any) => <InlineCode {...props} />,
  // eslint-disable-next-line jsx-a11y/alt-text
  img: (props: any) => <Image {...props} />,
  pre: (props: any) => {
    if (typeof props.children === 'string') return <Pre {...props} />
    return <CodeBlock {...props} />
  }
}
