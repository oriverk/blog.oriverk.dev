import React from 'react'

type ImageProps = {
  src?: string,
  alt?: string,
  imgStyle?: React.CSSProperties
  isAmp?: boolean
  className?: string
}

// external image => do not optimize
export function CustomAmpImg({ src = '/assets/ImageIsMissing', alt='no alt', className }: ImageProps) {
  const Src = src.replace(/^.?\/assets\/?/, '')
  const webp = require(`@public/assets/${Src}?resize&format=webp`)
  const image = require(`@public/assets/${Src}?resize`)
  // only When process.env.NODE_ENV is 'development', resize is false and width/height become undefined
  return (
    <React.Fragment>
        <amp-img layout='responsive'
          src={webp.src} srcSet={webp.srcSet} width={webp.width || '3'} height={webp.height || '2'} alt={alt} className={className}>
          <amp-img layout='responsive' fallback=''
            src={image.src} srcSet={image.srcSet} width={image.width || '3' } height={image.height || '2'} alt={alt} className={className}></amp-img>
        </amp-img>
      <style jsx>{`
        .cardImg {
          height: 100%;
          border-radius: .5rem .5rem 0 0;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }
      `}</style>
    </React.Fragment>
  )
}

export function CustomImg({ src = '/assets/ImageIsMissing.png', alt = 'no alt', className }: ImageProps) {
  const Src = src.replace(/^.?\/assets\/?/, '')
  const webp = require(`@public/assets/${Src}?resize&format=webp`)
  const image = require(`@public/assets/${Src}?resize`)
  return (
    <React.Fragment>
      <picture>
        <source
          srcSet={webp.srcSet} type='image/webp' className={className}
        />
        <img
          src={image.src} srcSet={image.srcSet} width={image.width} height={image.height} className={className}
          alt={alt} loading='lazy'
        />
      </picture>
      <style jsx>{`
        .cardImg {
          height: 100%;
          border-radius: .5rem .5rem 0 0;
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
        }
      `}</style>
    </React.Fragment>
  )
}