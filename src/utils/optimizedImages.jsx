import React from 'react'

export function OptimizedImages({ alt, src, style }) {
  // https://dev.to/joserfelix/how-to-make-a-static-blog-with-next-js-2bd6
  // const [imageLoaded, setImageLoaded] = useState(false)
  // const styles = {
  //   lqip: {
  //     opacity: 1,
  //     filter: 'blur(10px)',
  //     position: 'absolute',
  //     top: 0,
  //     left: 0,
  //     zIndex: 10,
  //     width: '100%',
  //     transition: 'opacity 500ms cubic-bezier(0.4, 0, 1, 1)'
  //   }
  // }
  // if (imageLoaded) {
  //   style.lqip.opacity = 0
  // }

  const slicedSrc = src.slice(0, 1) === '/' ? src.slice(1) : src
  const optimizedAlt = alt === null ? 'image' : alt

  return (
    <React.Fragment>
      <div className='optimized relative'>
        <picture>
          <source
            className='webp w-full'
            // srcSet={responsiveImageWebp.srcSet}
            srcSet={require(`@public/${slicedSrc}?{sizes:[640, 960, 1200, 1800], format: 'webp' }`).srcSet}
            type='image/webp'
          />
          <img
            className='jpeg w-full'
            src={require(`@public/${slicedSrc}?resize`).src}
            srcSet={require(`@public/${slicedSrc}?resize`).srcSet}
            alt={optimizedAlt}
          />
        </picture>
      </div>
      <style jsx>{`
        div.optimized{
          position: relative;
        }

        img.webp, img.jpeg{
          width: 100%;
        }

        ${style}
      `}</style>
    </React.Fragment>
  )
}