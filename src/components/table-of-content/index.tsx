import { styled } from 'goober'

import type { HeadingType } from 'types/markdown'
import { useScrollSpy } from 'hooks/useScrollSpy'
import { ListItem } from './list-item'

interface PassedProps {
  headings: HeadingType[];
}

interface Props extends PassedProps {
  className?: string;
}

const Component: React.VFC<Props> = (props) => {
  const { className, headings } = props
  const activeId = useScrollSpy(
    headings.map(({ id }) => `[id="${id}"]`),
    {
      rootMargin: "0% 0% -24% 0%",
    },
  )

  return (
    <nav className={className}>
      <h2>Index</h2>
      <ol>
        {headings.map((headingProps) => {
          const { id } = headingProps
          return (
            <ListItem activeId={activeId} {...headingProps} key={id} />
          )
        })}
      </ol>
    </nav>
  )
}

const StyledComponent = styled(Component)`
  width: 16rem;
  flex-shrink: 0;
  display: block;
  position: sticky;
  top: 6rem;
  right: 0;
  padding: 2.5rem 1rem 2.5rem 0;
  font-size: smaller;
  align-self: start;
  overflow-y: auto;
  max-height: calc(100vh - 8rem);
  overscroll-behavior: contain;

  & > h2 {
    font-weight: bold;
    font-size: small;
    color: var(--color-gray)
  }

  & > ol {
    letter-spacing: .25rem;
    margin: 0;
    margin-top: 1rem;
    list-style: none;
  }
`

const ContainerComponent: React.VFC<PassedProps> = (props) => (
  <StyledComponent {...props} />
)

export const TableOfContent = ContainerComponent
