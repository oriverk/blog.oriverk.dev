import React from 'react'
import { useAmp } from 'next/amp'

type ImageProps = {
  src?: string,
  alt?: string,
  imgStyle?: React.CSSProperties,
  anchor?: boolean,
}

export function Image({ src = 'assets/ImageIsMissing.png', alt, imgStyle, anchor }: ImageProps) {
  const isAmp = useAmp()

  if (src.startsWith('http')) {
    return (
      <React.Fragment>
        { anchor ? (
          <a href={src} rel="noreferrer noopener" target="_blank">
            <img src={src} alt={alt} />
          </a>
        ) : (
          <img src={src} alt={alt} />  
        )}
      </React.Fragment>
    )
  } else {
    return (
      <React.Fragment>
        { anchor ? (
          <a href={src} target='_blank' rel='noopener noreferrer'>
            <OptimizedImages src={src} alt={alt} imgStyle={imgStyle}/>
          </a>
        ) : (
          <OptimizedImages src={src} alt={alt} imgStyle={imgStyle}/>  
        )}
      </React.Fragment>
    )
  }
}

type OptiProps = {
  src?: string,
  alt?: string,
  imgStyle?: React.CSSProperties
}

function OptimizedImages({ src, alt, imgStyle }: OptiProps) {
  const replaced = src.replace(/^.?\/assets\/?/, '')
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
          alt={alt}
          style={imgStyle}
          width={responsiveImage.width}
          height={responsiveImage.height}
          loading='lazy'
          />
      </picture>
    </React.Fragment>
  )
}

type AmpImgProps = {
  src: string,
  alt: string,
  width: string,
  height: string,
  fallback?: boolean
}

function AmpImage({ src, alt, width, height, fallback }: AmpImgProps) {
  return (
    <amp-img alt={alt}
      width={width}
      height={height}
      src={src}>
      {fallback && (
        <amp-img alt={alt}
          fallback=''
          width={width}
          height={height}
          src={src}></amp-img>
      )}
    </amp-img>
  )
}