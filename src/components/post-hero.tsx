import { styled } from 'goober'
import { FrontMatterType } from 'types/markdown'
import { DateFormatter, DateFormatterProps } from 'components/date-formatter'
import Link from 'next/link'

type PassedProps = DateFormatterProps & {
  title: string
} & Pick<FrontMatterType, "tags" | "editUrl">

type Props = PassedProps & {
  className?: string
}

const Component = (props: Props) => {
  const { className, title, dateString, tags, editUrl } = props

  return (
    <div className={className}>
      <h1>{title}</h1>
      <p>
        <DateFormatter dateString={dateString} />
        &nbsp;/
        {tags.map((tag) => (
          <>
            &nbsp;
            <Link href={`/tag/#${tag}`} key={tag}>
              {'#' + tag}
            </Link>
          </>
        ))}
      </p>
      <p>
        <a href={editUrl} target="_blank" rel="noopener noreferrer">
          GitHub で編集する
        </a>
      </p>
    </div>
  )
}

const StyledComponent = styled(Component)`
  & > h1 {
    text-align: center;
  }
  & > p {
    margin: 0.5rem;
    text-align: center;
  }
`

const ContainerComponent: React.FC<PassedProps> = (props) => <StyledComponent {...props} />

export const PostHero = ContainerComponent
