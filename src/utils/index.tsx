import React from 'react'
import { parseISO, format } from 'date-fns'

export function Date({ dateString }: { dateString: string }) {
  const date = parseISO(dateString)
  return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>
}

export function NoImage (){
  return (
    <>
      <div className='parent'>
        <div className='child'>no image</div>
      </div>
      <style jsx>{`
        .parent {
          padding: 1rem auto;
          height: 100%;
          width: 100%;
          margin-bottom: 1rem;
        }
        .child {
          border: 1px solid grey;
          background-color: #242657;
          padding: .5rem;
          color: #FFF;
          text-align: center;
          font-size: 1.5rem;
          font-weight: bold;
        }
      `}</style>
    </>
  )
}

export const Divider = () => {
  return (
    <>
      <hr />
      <style jsx>{`
        hr {
          border: none;
          height: 1px;
          margin: 0;
          flex-shrink: 0;
          background-color: rgba(255, 255, 255, 0.12);
        }  
      `}</style>
    </>
  )
}

// SVG
export const QiitaSvg = (props) => {
  return <svg className={props.class} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 256'><path d='M82 .22c-16.13 3.2-28.59 7.83-42 17.52-9.75 7.05-18.97 16.9-25.14 27.26C-12.67 91.27.77 150.39 47 178.94c7.94 4.9 18.89 9.35 28 11.4 12.8 2.86 25.06 3.27 38 1.22 12.11-1.91 21.24-5.63 32-11.34 8.61-4.58 14.17-9.37 21-16.22 45.92-46.07 33.44-125.02-25-154.25-11.78-5.88-23.73-9.73-37-9.53H82zM202 0c8.12 11.71 15.54 19.7 22.19 33 14.31 28.62 18.26 61.85 11.39 93-2.99 13.53-7.27 25.78-13.89 38-1.88 3.48-9.36 13.75-8.82 17 .66 3.95 9.05 10.39 12.13 13.17 9.75 8.82 20.4 21.24 31 28.83V0h-54zM0 201v55h223c-6.76-9.45-22.28-22.3-31-31-2.61-2.6-9.63-10.58-13-10.99-2.52-.3-5.91 2.27-8 3.57-5.46 3.36-11.1 6.47-17 8.99-17.29 7.4-36.15 11.99-55 12.42-4.87.11-6.5-.39-11-.82-23.86-2.31-43.17-7.05-64-19.62L0 201zm255 24l-29 31h30l-1-31z' /></svg>
}

export const WantedlySvg = (props) => {
  return <svg className={props.class} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 900 900'><path d='M100 208.6h100l150 362.1L400 450 300 208.6h100l50 120.7 50-120.7h100L500 450l50 120.7 150-362.1h100L600 691.4H500l-50-120.7-50 120.7H300z' /></svg>
}

export const HatenaSvg = (props) => {
  return <svg className={props.class} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M20.47 0C22.42 0 24 1.58 24 3.53v16.94c0 1.95-1.58 3.53-3.53 3.53H3.53C1.58 24 0 22.42 0 20.47V3.53C0 1.58 1.58 0 3.53 0h16.94zm-3.705 14.47c-.78 0-1.41.63-1.41 1.41s.63 1.414 1.41 1.414 1.41-.645 1.41-1.425-.63-1.41-1.41-1.41zM8.61 17.247c1.2 0 2.056-.042 2.58-.12.526-.084.976-.222 1.32-.412.45-.232.78-.564 1.02-.99s.36-.915.36-1.48c0-.78-.21-1.403-.63-1.87-.42-.48-.99-.734-1.74-.794.66-.18 1.156-.45 1.456-.81.315-.344.465-.824.465-1.424 0-.48-.103-.885-.3-1.26-.21-.36-.493-.645-.883-.87-.345-.195-.735-.315-1.215-.405-.464-.074-1.29-.12-2.474-.12H5.654v10.486H8.61zm.736-4.185c.705 0 1.185.088 1.44.262.27.18.39.495.39.93 0 .405-.135.69-.42.855-.27.18-.765.254-1.44.254H8.31v-2.297h1.05zm8.656.706v-7.06h-2.46v7.06H18zM8.925 9.08c.71 0 1.185.08 1.432.24.245.16.367.435.367.83 0 .38-.13.646-.39.804-.265.154-.747.232-1.452.232h-.57V9.08h.615z' /></svg>
}

export function OptimizedImages({ src, alt, imgStyle }: {
  src: string,
  alt?: string,
  imgStyle?: React.CSSProperties
}) {
  // https://dev.to/joserfelix/how-to-make-a-static-blog-with-next-js-2bd6

  // src = 'assets/posts/hoge.jpg' OR src = '/assets/posts/hoge.jpg'
  // src = 'posts/hoge.jpg'        OR src = '/posts/hoge.jpg'
  const sliced = src.slice(0, 1) === '/' ? src.slice(1) : src
  const split = sliced.split('/')[0] === 'assets' ? sliced.replace('assets/', '') : sliced
  // => posts/hoge.jpg
  const optimizedAlt = alt === null ? 'image' : alt

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
          alt={optimizedAlt}
          style={imgStyle}
        />
      </picture>
    </React.Fragment>
  )
}