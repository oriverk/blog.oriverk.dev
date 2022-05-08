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
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M13.17 4L18 8.83V20H6V4h7.17M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-2 12c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm4 3.43c0-.81-.48-1.53-1.22-1.85a6.95 6.95 0 00-5.56 0A2.01 2.01 0 008 17.43V18h8v-.57z" />
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

export const ContactIcon = ContainerComponent
