type Props = {
  src?: string,
  alt?: string,
  imgStyle?: React.CSSProperties
  className?: string
}

// external image => do not optimize
export const CustomImg: React.FC<Props> = ({ src = '/assets/ImageIsMissing.png', alt = 'no alt', className }) => {
  const Src = src.replace(/^.?\/assets\/?/, '')
  const webp = require(`@public/assets/${Src}?resize&format=webp`)
  const image = require(`@public/assets/${Src}?resize`)
  return (
    <picture>
      <source srcSet={webp.srcSet} type='image/webp' className={className} />
      <img src={image.src} srcSet={image.srcSet} width={image.width} height={image.height} className={className} alt={alt}/>
    </picture>
  )
}