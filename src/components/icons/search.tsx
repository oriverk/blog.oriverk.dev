import { styled } from 'goober'
import type { SvgIconProps } from '../../types'

interface Props extends SvgIconProps {
  className?: string
}

const Component = (props: Props) => {
  const { title, label, color: fill, ...restProps } = props

  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill={fill} aria-label={label || ''} {...restProps}>
      {title && <title>{title}</title>}
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
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

export const SearchIcon = ContainerComponent
