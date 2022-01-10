import { styled } from 'goober'
import type { SvgIconProps } from '../../types'

interface Props extends SvgIconProps {
  className?: string
}

const Component: React.VFC<Props> = (props) => {
  const { title, label, color: fill, ...restProps } = props

  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill={fill} aria-label={label || ''} {...restProps}>
      {title && <title>{title}</title>}
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
    </svg>
  )
}

const StyledComponent = styled(Component)`
  fill: ${(props) => props.color};
  width: ${(props) => props.size / 4 + 'rem'};
  height: ${(props) => props.size / 4 + 'rem'};
`

const ContainerComponent: React.VFC<Partial<SvgIconProps>> = (props) => {
  const { color = '#000', size = 4, role = 'presentation', ...rest } = props
  const modified = { color, size, role, ...rest }

  return <StyledComponent {...modified} />
}

export const CopyIcon = ContainerComponent
