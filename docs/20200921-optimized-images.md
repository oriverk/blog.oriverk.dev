---
create: '2020-09-21'
title: 'Next.js: next-optimized-images を使った画像自動最適化'
tags: [nextjs]
published: false
---

今回は、例えば jpg や png を webp に変換し、レスポンシブや Low Quality Image Placeholder に対応すると言った、最適化をした事を書きたい。

## next-optimized-images

以降、next-optimized-images を"next-opti"と略す

画像の最適化方法はタスクランナーの中で画像圧縮プラグインを利用するなど複数あるが、今回は[`cyrilwanner/next-optimized-images`](https://github.com/cyrilwanner/next-optimized-images)を利用する。

### environment

- "node": "v14.5.0"
- "react": "16.13.1"
- "next": "9.3.5",
- "next-optimized-images": "^2.6.2"

[canary版のv3](https://github.com/cyrilwanner/next-optimized-images/issues/120)もある。

### setup

```sh
yarn add next-optimized-images
```

このパッケージに加え、自分が必要な機能にあったプラグインを入れる必要がある。取り敢えず、MozJPEG と OptiPNG に変換するプラグインを入れておく。

```sh
yarn add npm imagemin-mozjpeg imagemin-optipng
```

#### config

パッケージの方に[各プラグインのデフォルト設定値](https://github.com/cyrilwanner/next-optimized-images#example)が含まれているが、`next.config.js`の中で設定を変更できる。下は自分のもので書きやすくするために、[`next-compose-plugins`](https://github.com/cyrilwanner/next-compose-plugins)を入れている。

<!-- <details><summary>自分のnext.config.js</summary><div> -->

```jsx
// next.config.js
const withPlugins = require('next-compose-plugins')
const withPWA = require('next-pwa')　// 今回は関係ない
const optimizedImages = require('next-optimized-images')

const nextOptimizedImagesConfig = {
  imagesFolder: 'images',
  imagesName: '[name]-[hash].[ext]',
  handleImages: ['jpeg', 'png', 'webp'],
  removeOriginalExtension: true,
  optimizeImages: process.env.MODE_ENV !== 'development',
  optimizeImagesInDev: false,
  mozjpeg: { quality: 85, },
  optipng: { optimizationLevel: 3, },
  webp: { preset: 'default', quality: 85,},
}

module.exports = withPlugins(
  [
    [ withPWA, nextPwaConfig ], // 今回は関係ない
    [ optimizedImages, nextOptimizedImagesConfig ],
  ],
)
```

<!-- </div></details> -->

### usage

#### href (image path)

画像は`<img src={require(../../example.jpg)} />`の様に指定するが、md 内で指定する時などは面倒なので、`next.js.config`にパスのエイリアスを追加する。

![compiled with warning](/assets/posts/202009/opti1.jpg)

原因は webpack にある模様

- references:
  - [issue #92: Module parse failed: Unexpected character '�'](https://github.com/cyrilwanner/next-optimized-images/issues/92)
  - [issue #130: Performance issues `npm run dev` hot-reloading](https://github.com/cyrilwanner/next-optimized-images/issues/130)

```jsx
// next.config.js
// ...
const { resolve } = require('path')

const nextConfig = {
  webpack: (config) => {
    config.resolve.alias['@public/assets'] = resolve(__dirname, 'public/assets')
    return config
  },
}

// ...
module.exports = withPlugins(
  [ // ...
  ],
  nextConfig
)
```

#### convert to webp

```sh
<!-- use webp-loader for image optimization to webp -->
yarn add webp-loader
```

また、imagemin-mozjpeg や imagemin-optipng 等は`href={require('../example.jpg')}`の様にすればプラグインが適用化されるが、その他は query params で指定する必要がある。

```jsx
export default () => (
  <picture>
    <source srcSet={require('./images/my-image.jpg?webp')} type="image/webp" />
    <img src={require('./images/my-image.jpg')} />
  </picture>
)
```

#### responsive image

```sh
yarn add responsive-loader sharp
```

resize を可能にする responsive-loarder は jimp と sharp が別に必要だが、jimp は[README.md](https://github.com/cyrilwanner/next-optimized-images#resize)(↓)でディスられてる位なので、sharp を使う。

> Requires the optional package responsive-loader (npm install responsive-loader) and either jimp (node implementation, slower) or sharp (binary, faster)

画像をリンクする際は`require('./images/my-image.jpg?resize&sizes[]=300&sizes[]=600&sizes[]=1000')`の様に指定できるが、下の様に`responsive:sized:[]`と画像サイズ幅を global resize property として指定できる。

```jsx
// next.config.js
// ...
const nextOptimizedImagesConfig = {
// ...
  responsive: {
    adapter: require('responsive-loader/sharp'),
    sizes: [640, 960, 1200, 1800],
    disable: process.env.MODE_ENV === 'development'
  },
// ...
}

module.exports = withPlugins(
  [[　optimizedImages, nextOptimizedImagesConfig　],],
  nextConfig
)
```

サンプルコード
※ require 内での sizes 指定方法は下の様に複数ある。

```jsx
// どれでも動く
const multi = require(`../../public/cat1200x.jpg?resize&sizes:[640,960,1200,1800]`)
// const multi = require('../../public/cat1200x.jpg?resize&sizes[]=640&sizes[]=960&sizes[]=1200&sizes=[1800]')
// const multi = require('../../public/cat1200x.jpg?resize&sizes[]=640,sizes[]=960,sizes[]=1200,sizes[]=1900')

export default () => (
  <img 
    srcSet={multi.srcSet} 
    src={multi.src}
    width={multi.width}
    height={multi.height}/>
);
```

![html of responsive image](/assets/posts/202009/opti2.jpg)

#### webp-loader と responsive-loader

現在の next-opti は issue を抱えていて、例えば webp 変換の webp-loader と複数サイズ画像生成の responsive-loader の query parmas を`example.jpg?webp?resize`の様に連ねて書くと動かない。根本的な解決は[next-opti v3](https://github.com/cyrilwanner/next-optimized-images/issues/120)で解決する模様。

2 つを同時に動かすサンプルコード

```jsx
export default function () {
  const multiWebp = require(`../../public/cat1200x.jpg?resize&sizes:[640,960,1200,1800]&format=webp`)
  return (
      <img 
        srcSet={multiWebp.srcSet}
        src={multiWebp.src}
        width={multiWebp.width}
        height={multiWebp.height} />
  )
}
```

![both responsive-loader and webp-loader are working](/assets/posts/202009/opti3.jpg)

##### 自分の場合

next.config.js の中で、`responsive:{sizes: [640, 960, 1200, 1800],}`としてあるので、[https://oriver.dev](https://oriverk.dev)では下の様に component を作って利用している。(一部略)

```jsx
// src/components/general/OptimizedImages.tsx
export function OptimizedImages({ src, alt, imgStyle }) {
  const multi = require(`@public/assets/${src}?resize`)
  const multiWebp = require(`@public/assets/${src}?resize&format=webp`)

  return (
    <React.Fragment>
      <picture>
        <source srcSet={responsiveImageWebp.srcSet} type='image/webp' />
        <img
          src={responsiveImage.src}
          srcSet={responsiveImage.srcSet}
          width={responsiveImage.width}
          height={responsiveImage.height}
        />
      </picture>
    </React.Fragment>
  )
}
```

#### Low Qualy Image Placeholder

```sh
yarn add lqip-loader
```

```jsx
export default function () {
  return (
    <img src={require('../../public/shirase.jpg?lqip')} />
    <img src={require('../../public/shirase.jpg')} />
  )
}
```

![low quality image placeholder of ice breaker ship Shirase](/assets/posts/202009/opti4.jpg)

豪に居た時に撮影した、西豪州フリーマントルに停泊する砕氷艦しらせの画像に適用してみた。lqip(左)の方は 10×7px の 925b に縮小されており、パフォーマンス的には問題が無さそう。[更に filter:blur(10px) 辺りを掛けると更に良さそう。](https://github.com/zouhir/lqip-loader/issues/5)

#### lqip-loaderを使ったprogressive image loading の実装

早い話が medium 風の画像表示をやってみる。まずは useState を使って、lazy load の画像が load されたら、lqpi の opacity を 0 にする方法。

```jsx
import React, { useState } from 'react'

export default function () {
  const [imageLoaded, setImageLoaded] = useState(false)
  return (
    <>
      <div>
        <img src={require(`../../public/shirase.jpg?lqip`)}
          className='lqip' style={{opacity: imageLoaded ? 0 : 1}}
        />
        <img src={require(`../../public/shirase.jpg`)}
          onLoad={() => setImageLoaded(true)} loading='lazy'
        />
      </div>
      <style jsx>{`
        div{ 
          position: relative; 
        }

        img{
          width: 50%;
          height: auto;
        }
        .lqip{
          position: absolute;
          top: 0;　left: 0;　z-index: 10;
          filter: blur(10px);
          transition: opacity 500ms cubic-bezier(0.4, 0, 1, 1);
        }
      `}</style>
    </>
  )
}
```

### references

- [cyrilwanner/next-optimized-images](https://github.com/cyrilwanner/next-optimized-images#lqip)
- [Mozilla - Progressive loading](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Loading)
- [Medium - Progressively Loading Images In React](https://medium.com/frontend-digest/progressively-loading-images-in-react-107cb075417a)
