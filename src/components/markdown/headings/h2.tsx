import { styled } from 'goober'

export interface PassedProps {
  id: string
  children: string
}

interface Props extends PassedProps {
  className?: string
}

const Component = (props: Props) => {
  const { className, id, children } = props

  return (
    <h2 id={id} className={className}>
      <a href={`#${id}`}>{children}</a>
    </h2>
  )
}

// css content: refernce: https://blog.jxck.io/entries/2022-03-06/markdown-style-table-css.html#alternative-text
const StyledComponent = styled(Component)`
  padding-bottom: 0.2rem;
  margin-bottom: 1.1rem;
  scroll-margin-block: 3rem;
  border-bottom: 1px solid var(--color-gray);
  & {
    a::before {
      /* Safari 用のフォールバック */
      content: '## ';
      /* 読み上げ等に対しては空文字として認識させる */
      content: '## ' / '';
    }
    a {
      color: var(--color-white);
      text-decoration: none;
    }
  }
  &:hover > a::before {
    text-decoration: none;
    color: var(--color-miku);
  }
`

const ContainerComponent: React.FC<PassedProps> = (props) => {
  return <StyledComponent {...props} />
}

export const H2 = ContainerComponent
