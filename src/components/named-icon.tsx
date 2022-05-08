import { styled } from 'goober'

interface PassedProps {
  variant: 'none' | 'outline'
  borderRadius: number
  name: string
  color: string
  fontSize: number
  width: number
  height: number
  children: React.ReactNode;
}

interface Props extends PassedProps {
  className?: string;
}

const Component = (props: Props) => {
  const { className, children, name } = props
  return (
    <div className={className}>
      <span className="icon">{children}</span>
      {name && <span className="iconName">{name}</span>}
    </div>
  )
}

const StyledComponent = styled(Component)`
  border: ${(props) => (props.variant === 'outline' ? `1px solid ${props.color}` : 'none')};
  border-radius: ${(props) => props.borderRadius / 4 + 'rem'};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.width / 4 + 'rem'};
  height: ${(props) => props.height / 4 + 'rem'};
  user-select: none;

  .iconName {
    display: block;
    font-size: ${(props) => props.fontSize / 4 + 'rem'};
    color: ${(props) => props.color};
  }
`

const ContainerComponent: React.FC<Partial<PassedProps>> = (props) => {
  const {
    variant = 'outline',
    borderRadius = 1,
    name = '',
    color = '#b3b3b3',
    fontSize = 4,
    width = 16,
    height = 16,
    children,
  } = props

  const modified = {
    variant,
    borderRadius,
    name,
    color,
    fontSize,
    width,
    height,
    children,
  }

  return <StyledComponent {...modified} />
}

const NamedIcon = ContainerComponent
export default NamedIcon
