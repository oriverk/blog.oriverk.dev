import React from 'react'

export function OptimizedImages({ src, alt, imgStyle }: {
  src?: string,
  alt: string,
  imgStyle?: React.CSSProperties
}) {
  // https://dev.to/joserfelix/how-to-make-a-static-blog-with-next-js-2bd6
  const replaced = src.replace(/^.?\/assets\/?/, '') || 'imageIsMissing.png'
  // => processed = '/home/example.jpg'
  const responsiveImage = require(`@public/assets/${replaced}?resize`)
  const responsiveImageWebp = require(`@public/assets/${replaced}?{sizes:[640,960,1200,1800], format: 'webp'}`)

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
        />
      </picture>
    </React.Fragment>
  )
}