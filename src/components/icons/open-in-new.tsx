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
      <path d="M0 0h24v24H0z" fill="none"/>
      <path d="M19 19H5V5h7V3H5a2 2 0 00-2 2v14a2 2 0 002 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
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

export const OpenInNewIcon = ContainerComponent
