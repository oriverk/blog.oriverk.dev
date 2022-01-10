import { styled } from 'goober'
import { CopyButton } from './copy-button'

interface PassedProps {
  filename?: string
  rawCode: string
}

interface Props extends PassedProps {
  className?: string
}

const Component: React.VFC<Props> = (props) => {
  const { className, filename, rawCode } = props

  return (
    <div className={className}>
      {filename ? <div className="filename" data-filename={filename} translate="no" /> : <div />}
      <CopyButton code={rawCode} />
    </div>
  )
}

const StyledComponent = styled(Component)`
  display: flex;
  justify-content: space-between;

  & > .filename::before {
    content: attr(data-filename);
    padding: 0.2rem 0.5rem;
    background: dimgray;
    font-size: small;
  }

  & > button {
    background: var(--color-miku);
    font-weight: bold;
  }
`

const ContainerComponent: React.VFC<PassedProps> = (props) => <StyledComponent {...props} />

export const CodeNav = ContainerComponent
