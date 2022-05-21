import { styled } from 'goober'

function isImgur(src: string) {
  const RE = /\.(webp|png|jpe?g)$/gi
  return src.startsWith('https://i.imgur.com') && !RE.test(src)
}

export interface PassedProps {
  src: string
  alt: string
  title: string
}

interface Props extends PassedProps {
  className?: string
}

const Component = (props: Props) => {
  const { className, src, alt = 'image', title = '' } = props
  const imgSrc = isImgur(src) ? src + '.png' : src

  return (
    <figure className={className}>
      <img loading="lazy" decoding="async" src={imgSrc} alt={alt} />
      {title ? (
        <figcaption>
          {title}
        </figcaption>
      )
        : null
      }
    </figure>
  )
}

const StyledComponent = styled(Component)`
  border: 1px gray solid;
  padding: 5px;
  margin: auto;
  max-width: 100%;
  width: 100%;
  & > img {
    max-width: 100%;
    width: 100%;
  }

  & > figcaption {
    text-align: center;
    color: lightgray;
  }
`

const ContainerComponent: React.FC<PassedProps> = (props) => <StyledComponent {...props} />

export const Image = ContainerComponent
