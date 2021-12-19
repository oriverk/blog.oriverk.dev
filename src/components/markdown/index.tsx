import { styled } from 'goober'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'

import { MDXComponents } from './mdx-components'

interface PassedProps {
  mdxSource: MDXRemoteSerializeResult<Record<string, unknown>>
}

interface Props extends PassedProps {
  className?: string;
}

const Component: React.VFC<Props> = (props) => {
  const { className, mdxSource } = props;

  return (
    <div className={className}>
      <MDXRemote {...mdxSource} components={MDXComponents} />
    </div>
  )
}

const StyledComponent = styled(Component)`
  ul, ol {
    margin: 1.5rem 0 0 1.25rem;
    li {
      padding-bottom: 4px;
    }
  }
  
  table {
    tr {
      background-color: #0d1117;
    }
    tr:nth-child(2n) {
      background-color: var(--color-background);
    }
    td, th {
      padding: .5rem .9rem;
      border: 1px solid var(--color-gray);
      white-space: normal;
    }
  }

  hr {
    margin: 2.5rem 0;
    border-color: var(--color-gray);
  }
  blockquote {
    margin: 1rem 0;
    padding: 2px 0 2px .8rem;
    border-left: 3px solid var(--color-gray);
    font-size: 1rem;
  }
`

const ContainerComponent: React.VFC<PassedProps> = (props) => (
  <StyledComponent {...props} />
)

export const MarkdownContent = ContainerComponent;
