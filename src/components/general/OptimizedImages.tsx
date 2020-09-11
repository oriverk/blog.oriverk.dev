import React from 'react'

export function OptimizedImages({ src, alt, imgStyle }: {
  src: string,
  alt: string,
  imgStyle?: React.CSSProperties
}) {
  // https://dev.to/joserfelix/how-to-make-a-static-blog-with-next-js-2bd6

  // src = 'assets/posts/hoge.jpg' OR src = '/assets/posts/hoge.jpg'
  // src = 'posts/hoge.jpg'        OR src = '/posts/hoge.jpg'
  
  const sliced = src.slice(0, 1) === '/' ? src.slice(1) : src
  const split = sliced.split('/')[0] === 'assets' ? sliced.replace('assets/', '') : sliced
  // => posts/hoge.jpg

  return (
    <React.Fragment>
      <picture>
        <source
          srcSet={require(`@public/assets/${split}?{sizes:[640, 960, 1200, 1800], format: 'webp' }`).srcSet}
          type='image/webp'
          style={imgStyle}
        />
        <img
          src={require(`@public/assets/${split}?resize`).src}
          srcSet={require(`@public/assets/${split}?resize`).srcSet}
          alt={alt}
          style={imgStyle}
        />
      </picture>
    </React.Fragment>
  )
}