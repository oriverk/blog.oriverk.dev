import React from 'react'

type ImageProps = {
  src?: string,
  alt?: string,
  imgStyle?: React.CSSProperties,
  isAmp?: boolean
}

// external image => do not optimize
export function CustomAmpImg({ src = '/assets/ImageIsMissing', alt='no alt' }: ImageProps) {
  if (src.startsWith('http')) {
    return (
      <React.Fragment>
        <div className='amp-img-container'>
          <amp-img layout='fill' src={src}></amp-img>
        </div>
        <style jsx>{`
          .apm-img-container {
            width: 100%;
            max-width: 800px;
          }
        `}</style>
      </React.Fragment>
    )
  } else {
    const Src = src.replace(/^.?\/assets\/?/, '')
    // => processed = '/home/example.jpg'
    const webp = require(`@public/assets/${Src}?resize&format=webp`)
    const image = require(`@public/assets/${Src}?resize`)
    // only When process.env.NODE_ENV is 'development', resize is false and width/height become undefined
    return (
      <React.Fragment>
        <amp-img layout='responsive'
          src={webp.src} width={webp.width || '3'} height={webp.height || '2'} alt={alt}>
          <amp-img layout='responsive' fallback=''
            src={image.src} width={image.width || '3' } height={image.height || '2'} alt={alt}></amp-img>
        </amp-img>
      </React.Fragment>
    )
  }
}

export function CustomImg({ src = '/assets/ImageIsMissing.png', alt = 'no alt', imgStyle }: ImageProps) {
  if (src.startsWith('http')) {
    return (
      <React.Fragment>
        <img src={src} width='3' height='2' alt={alt} />
      </React.Fragment>
    )
  } else {
    const Src = src.replace(/^.?\/assets\/?/, '')
    const webp = require(`@public/assets/${Src}?resize&format=webp`)
    const image = require(`@public/assets/${Src}?resize`)
    return (
      <React.Fragment>
        <picture>
          <source
            srcSet={webp.srcSet} type='image/webp' style={imgStyle}
          />
          <img
            src={image.src} srcSet={image.srcSet} width={image.width} height={image.height}
            alt={alt} style={imgStyle} loading='lazy'
          />
        </picture>
      </React.Fragment>
    )
  }
}

// export function CustomImage({ src = '/assets/ImageIsMissing.png', alt, imgStyle, anchor, isAmp }: ImageProps) {
//   if (isAmp && src.startsWith('http')) {
//     return (
//       <React.Fragment>
//         <div className='amp-img-container'>
//           <amp-img layout='fill' src={src} ></amp-img>
//         </div>
//         <style jsx>{`
//           .amp-img-container {
//             max-width: 800px;
//             width: 100%;
//           }
//         `}</style>
//       </React.Fragment>
//     )
//   } else if (isAmp && !src.startsWith('http')) {
//     return (
//       <React.Fragment>
//         <amp-img src={src} layout='responsive'></amp-img>
//       </React.Fragment>
//     )
//   }
// }

// export function Image({ src = 'assets/ImageIsMissing.png', alt, imgStyle, anchor, isAmp }: ImageProps) {
//   if (src.startsWith('http')) {
//     return (
//       <React.Fragment>
//         { anchor ? (
//           <a href={src} rel="noreferrer noopener" target="_blank">
//             <img src={src} alt={alt} />
//           </a>
//         ) : (
//           <img src={src} alt={alt} />  
//         )}
//       </React.Fragment>
//     )
//   } else {
//     return (
//       <React.Fragment>
//         { anchor ? (
//           <a href={src} target='_blank' rel='noopener noreferrer'>
//             <OptimizedImages src={src} alt={alt} imgStyle={imgStyle}/>
//           </a>
//         ) : (
//           <OptimizedImages src={src} alt={alt} imgStyle={imgStyle}/>  
//         )}
//       </React.Fragment>
//     )
//   }
// }

// type OptiProps = {
//   src?: string,
//   alt?: string,
//   imgStyle?: React.CSSProperties
// }

// function OptimizedImages({ src, alt, imgStyle }: OptiProps) {
//   const replaced = src.replace(/^.?\/assets\/?/, '')
//   // => processed = '/home/example.jpg'

//   const responsiveImage = require(`@public/assets/${replaced}?resize`)
//   const responsiveImageWebp = require(`@public/assets/${replaced}?resize&format=webp`)

//   return (
//     <React.Fragment>
//       <picture>
//         <source
//           srcSet={responsiveImageWebp.srcSet}
//           type='image/webp'
//           style={imgStyle}
//           />
//         <img
//           src={responsiveImage.src}
//           srcSet={responsiveImage.srcSet}
//           alt={alt}
//           style={imgStyle}
//           width={responsiveImage.width}
//           height={responsiveImage.height}
//           loading='lazy'
//           />
//       </picture>
//     </React.Fragment>
//   )
// }

// type AmpImgProps = {
//   src: string,
//   alt: string,
//   width: string,
//   height: string,
//   fallback?: boolean
// }

// function AmpImage({ src, alt, width, height, fallback }: AmpImgProps) {
//   return (
//     <amp-img alt={alt}
//       width={width}
//       height={height}
//       src={src}>
//       {fallback && (
//         <amp-img alt={alt}
//           fallback=''
//           width={width}
//           height={height}
//           src={src}></amp-img>
//       )}
//     </amp-img>
//   )
// }