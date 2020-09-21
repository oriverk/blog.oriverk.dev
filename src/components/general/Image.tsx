import React from 'react'

export function Image({ src, alt, imgStyle }: {
  src?: string,
  alt: string,
  imgStyle?: React.CSSProperties
}) {
  return (
    <React.Fragment>
      <OptimizedImages src={src} alt={alt} imgStyle={imgStyle}/>
    </React.Fragment>
  )
}

function OptimizedImages({ src, alt, imgStyle }: {
  src?: string,
  alt: string,
  imgStyle?: React.CSSProperties
}) {
  // https://dev.to/joserfelix/how-to-make-a-static-blog-with-next-js-2bd6
  const replaced = src.replace(/^.?\/assets\/?/, '') || 'imageIsMissing.png'
  // => processed = '/home/example.jpg'

  const responsiveImage = require(`@public/assets/${replaced}?resize`)
  const responsiveImageWebp = require(`@public/assets/${replaced}?resize&format=webp`)

  return (
    <React.Fragment>
      <picture>
        <source
          srcSet={responsiveImageWebp.srcSet}
          type='image/webp'
          style={imgStyle}
          />
        <img
          src={responsiveImage.src}
          srcSet={responsiveImage.srcSet}
          alt={alt || 'no image'}
          style={imgStyle}
          width={responsiveImage.width}
          height={responsiveImage.height}
          loading='lazy'
        />
      </picture>
    </React.Fragment>
  )
}