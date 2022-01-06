import { styled } from 'goober'

function isImgur(src: string) {
  const RE = /\.(webp|png|jpe?g)$/gi
  if (src.startsWith('https://i.imgur.com') && !RE.test(src)) {
    return true
  } else {
    return false
  }
}

interface PassedProps {
  src: string;
  alt: string;
}

interface Props extends PassedProps {
  className?: string;
}

const Component: React.VFC<Props> = (props) => {
  const { className, src, alt = 'image' } = props
  const imgSrc = isImgur(src) ? src + '.png' : src

  return (
    <picture className={className}>
      <img loading='lazy'
        decoding='async'
        src={imgSrc}
        alt={alt}
      />
    </picture>
  )
}

const StyledComponent = styled(Component)`
  & > source, img {
    border: 1px solid gray;
    background-color: white;
    max-width: 100%;
  }
`

const ContainerComponent: React.VFC<PassedProps> = (props) => (
  <StyledComponent {...props} />
)

export const Image = ContainerComponent