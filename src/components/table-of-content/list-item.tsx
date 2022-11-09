import { styled } from 'goober'
import type { HeadingType } from 'types/markdown'

type PassedProps = HeadingType & {
  activeId?: string
}

type Props = PassedProps & {
  className?: string
}

const Component = (props: Props) => {
  const { className, activeId, id, text } = props

  return (
    <li className={className + ` ${id === activeId ? 'active' : undefined}`} key={id} title={text}>
      <a href={`#${id}`}>{text}</a>
    </li>
  )
}

const StyledComponent = styled(Component)`
  margin-left: ${({ level }) => (level === 'h3' ? 1 : 0)}rem;
  & {
    a {
      padding: 0.25rem 0;
      display: block;
      font-weight: ${({ activeId, id }) => (id === activeId ? 'bold' : 'normal')};
      /* color: var(--color-gray); */
      color: ${({ activeId, id }) => (id === activeId ? 'gray' : 'white')};
    }
    a:hover {
      color: var(--color-white);
    }
  }
`

const ContainerComponent: React.FC<PassedProps> = (props) => <StyledComponent {...props} />

export const ListItem = ContainerComponent
