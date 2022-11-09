import { styled } from 'goober'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'

import { MDXComponents } from './mdx-components'

interface PassedProps {
  compiledSource: string
}

interface Props extends PassedProps {
  className?: string
}

const Component = (props: Props) => {
  const { className, compiledSource } = props

  return (
    <div className={className}>
      <MDXRemote compiledSource={compiledSource} components={MDXComponents} />
    </div>
  )
}

const StyledComponent = styled(Component)`
  ul,
  ol {
    margin: 1rem 0 1rem 1rem;
    li {
      padding: 0.5rem 0 0;
      ul,
      ol {
        margin: 0 0 0 1rem;
        padding: 0;
      }
    }
  }

  table {
    tr {
      th {
        background-color: #0d1117;
      }
    }
    tr:nth-child(2n) {
      background-color: #0d1117;
    }
    td,
    th {
      padding: 0.5rem 0.9rem;
      border: 1px solid var(--color-gray);
      white-space: normal;
    }
  }

  strong::before,
  strong::after {
    /* Safari 用のフォールバック */
    content: '**';
    /* 読み上げ等に対しては空文字として認識させる */
    content: '**' / '';
  }

  hr {
    margin: 2rem 0;
    border-color: var(--color-gray);
  }

  blockquote {
    margin: 1rem 0;
    padding: 2px 0 2px 0.8rem;
    border-left: 3px solid var(--color-gray);

    blockquote {
      margin: 0.5rem;
      margin-left: 0;
    }

    p {
      margin: 0;
      font-size: 1rem;
    }
  }
`

const ContainerComponent: React.FC<PassedProps> = (props) => <StyledComponent {...props} />

export const MarkdownContent = ContainerComponent
