import React, { useState } from 'react'

export function OptimizedImages({ alt, src }) {
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

  return (
    <React.Fragment>
      <div className='optimized relative'>
        <picture>
          <source
            className='webp w-full'
            // srcSet={responsiveImageWebp.srcSet}
            srcSet={require(`@public/${src}?{sizes:[300,600,1024,2048], format: 'webp'}`).srcSet}
            type='image/webp'
          />
          <img
            className='jpeg w-full'
            src={require(`@public/${src}?{sizes:[300,600,1024,2048]}`).src}
            srcSet={require(`@public/${src}?{sizes:[300,600,1024,2048]}`).srcSet}
            alt={alt}
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
      `}</style>
    </React.Fragment>
  )
}