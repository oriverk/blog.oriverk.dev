import { styled } from 'goober'
import { CopyButton } from './copy-button'

interface PassedProps {
  filename?: string
  rawCode: string
}

interface Props extends PassedProps {
  className?: string
}

const Component = (props: Props) => {
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

  & > .filename::before {
    content: attr(data-filename);
    padding: 0.2rem 0.5rem;
    background: dimgray;
    font-size: small;
  }
`

const ContainerComponent: React.FC<PassedProps> = (props) => <StyledComponent {...props} />

export const CodeNav = ContainerComponent
