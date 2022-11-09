import { styled } from 'goober'
import type { SvgIconProps } from '../../types'

type Props = SvgIconProps & {
  className?: string
}

const Component = (props: Props) => {
  const { title, label, color: fill, ...restProps } = props

  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill={fill} aria-label={label || ''} {...restProps}>
      {title && <title>{title}</title>}
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 000-1.41l-2.34-2.34a.996.996 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
    </svg>
  )
}

const StyledComponent = styled(Component)`
  fill: ${(props) => props.color};
  width: ${(props) => props.size / 4 + 'rem'};
  height: ${(props) => props.size / 4 + 'rem'};
`

const ContainerComponent: React.FC<Partial<SvgIconProps>> = (props) => {
  const { color = '#000', size = 4, role = 'presentation', ...rest } = props
  const modified = { color, size, role, ...rest }

  return <StyledComponent {...modified} />
}

export const PenIcon = ContainerComponent
