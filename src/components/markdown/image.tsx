function isImgur(src: string) {
  const RE = /\.(webp|png|jpe?g)$/gi
  return src.startsWith('https://i.imgur.com') && !RE.test(src)
}

type Props = {
  src: string
  alt: string
  title: string
}

export const Image: React.FC<Partial<Props>> = (props) => {
  const { src, alt = 'image', title = '' } = props

  if (!src) return null;
  
  const imgSrc = isImgur(src) ? src + '.png' : src

  if (!title) {
    return (
      <picture>
        <img loading="lazy" decoding="async" src={imgSrc} alt={alt} />
      </picture>
    )
  }

  return (
    <figure>
      <img loading="lazy" decoding="async" src={imgSrc} alt={alt} />
      <figcaption>{title}</figcaption>
    </figure>
  )
}
