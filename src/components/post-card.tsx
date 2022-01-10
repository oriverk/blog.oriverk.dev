import { styled } from 'goober'
import Link from 'next/link'
import { DateFormatter } from './date-formatter'
import { FrontMatterType } from 'types/markdown'

interface PassedProps extends Pick<FrontMatterType, 'title' | 'tags'> {
  slug: string
  date: string
  key: React.Key
}

interface Props extends PassedProps {
  className?: string
}

const Component: React.VFC<Props> = (props) => {
  const { className, slug, title, date, tags, key } = props

  return (
    <section className={className} key={key}>
      <h3>
        <Link href={`/entry/${slug}/`}>
          <a>{title}</a>
        </Link>
      </h3>
      <p>
        <DateFormatter dateString={date} />
        &nbsp;/
        {tags.map((tag) => (
          <>
            &nbsp;
            <Link href={`/tag/#${tag}`} key={tag}>
            <a>{`#${tag}`}</a>
          </Link>
          </>
        ))}
      </p>
    </section>
  )
}

const StyledComponent = styled(Component)`
  margin-bottom: 1rem;
  padding: 0.3rem;
  border: 1px solid dimgray;
  border-radius: 0.5rem;
  &:hover {
    border-color: gray;
  }
  a {
    color: var(--color-miku);
    text-decoration: none;
  }
  a:hover {
    color: var(--color-miku);
    text-decoration: underline;
  }
  h3 {
    margin: 0.5rem;
    font-size: 1.25rem;
  }
  h3 > a {
    color: var(--color-white);
  }
  h3 > a:hover {
    color: var(--color-white);
    text-decoration-color: var(--color-miku);
  }
  p {
    margin: 0.5rem;
  }
`

const ContainerComponent: React.VFC<PassedProps> = (props) => <StyledComponent {...props} />

export const PostCard = ContainerComponent
