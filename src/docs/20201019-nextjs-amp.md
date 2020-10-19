---
title: Next.js製のサイトを途中からAMP化する
create: '2020-10-19'
update: '2020-10-20'
tags: [nextjs, typescript, amp]    
image: '/assets/posts/202010/pikachu.jpg'
---

# introduction
## Too Long, Didn't Read
`[slug].tsx`で`getStaticPaths`等を使った dynamic route と、Hybrid AMPを併用することは現状難しいことが判明した。色々考えた結果、[https://oriverk.dev](https://oriverk.dev) の方はコードの自由度を保つため、AMP技術を組み込まないことにした。その他の playground や 趣味ブログで使っていきたい。(amp component を使うと、drawer や sidebar などがコード1行で済んでしまって、非常にお勉強にならないと思った。

- [amp を試す際に作った playground](https://play.oriverk.dev)
- [上 playground のコード](https://github.com/oriverk/next-ts-amp)

## AMP（Accelerated Mobile Pages）
GoogleとTwitterによる開発のキャッシュ等によるモバイル表示高速化技術。AMP Websites,　Stories, Ads, Email の4つがあり、検索ページではAMP対応サイトは雷⚡マークが表示される。今回はAMP Websitesを利用する。

reference: [amp.dev - AMP HTML 仕様](https://amp.dev/ja/documentation/guides-and-tutorials/learn/spec/amphtml/?format=websites)

<details><summary>AMP format sample</summary><div>

```html
<!doctype html>
<html ⚡>
  <head>
    <meta charset="utf-8">
    <title>Sample document</title>
    <link rel="canonical" href="./regular-html-version.html">
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
    <style amp-custom>h1 {color: red}</style>
    <script type="application/ld+json">
    {
      "@context": "http://schema.org",
      "@type": "NewsArticle",
      "headline": "Article headline",
      "image": [
        "thumbnail1.jpg"
      ],
      "datePublished": "2015-02-05T08:00:00+08:00"
    }
    </script>
    <script async custom-element="amp-carousel" src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"></script>
    <script async custom-element="amp-ad" src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"></script>
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
    <script async src="https://cdn.ampproject.org/v0.js"></script>
  </head>
  <body>
    <h1>Sample document</h1>
    <p>Some text<amp-img src=sample.jpg width=300 height=300></amp-img></p>
  </body>
</html>
```

</div></details>

## Next.js と AMP
Next.jsはAMPに対応していて、AMPのみの生成とAMPと従来のHTMLページの生成を制御できる。`export const config = { amp: true }`または 'hybrid'としておけば、ampコンポーネント用のscript等の記述が自動で挿入される。

### AMP First Page
- nextjs と react client sideのランタイムを持たない
- amp optimizerで自動最適化
- ユーザ用の最適化済みページと、検索エンジン用のインデックス可能な非最適化ページを生成

```jsx
export const config = { amp: true }
const Component = () => {
  return <h3>My AMP About Page!</h3>
}
export default Component
```

### Hybrid AMP Page
- 従来のHTMLページとAMPページが生成される。
- AMPページは amp-optimizer により最適化されているため、検索エンジンによるインデックスが可能。

なお、amp-onlyとhybridの2つのモードの区別には、`useAmp()`というReact Hooksが用いられ、前者の時は`true`を、後者の時は`false`を返す。

<details><summary>Hybrid AMP sample code</summary><div>

```typescript
import { useAmp } from 'next/amp'

export const config = { amp: 'hybrid' }
const Component = () => {
  const isAmp = useAmp()
  return (
    <>
      {isAmp ? (
        <amp-img　layout="responsive" width="300" height="300"
          src="/my-img.jpg" alt="a cool image"/>
      ) : (
        <img width="300" height="300" src="/my-img.jpg"
        alt="a cool image" />
      )}
    </>
  )
}
export default Component
```

</div></details>

# Main
## 修正する必要がある箇所
- `_document.jsx`内の gtag の変更
- imageの取り扱い
    - ampモード時は`amp-img`を使用する必要がある。
- swipeableなside-bar
- サイト内検索用の algolia
    - [algolia communityの中で対応法が示されている](https://discourse.algolia.com/t/amp-support-for-algolia/1697)
    - [amp対応algolia デモ](https://amp-script-demos.glitch.me/algolia.html)
- `onclick`で開閉するアイコンリンク群
    - `amp-state`辺りでイケるかな？

## setup amp-validator
正しくampに対応しているか、エラーや警告をターミナルに表示する[amp-validator](https://www.npmjs.com/package/amphtml-validator)があるが、コードを追加したくないので、[google web store - AMP Validator](https://chrome.google.com/webstore/detail/amp-validator/nmoffdblmcmgeicmolmhobpoocbbmknc?hl=ja)を使用する。

## modify components for amp
### style amp-custom
cssライブラリには `styled-jsx` を使ってます。非ampの時の様に `<style jsx>{ amp-img { width: 100%; } }</style>` の様に書けば、自動的に `<style amp-custom>` に変換され、head 内に挿入されるので良いです。

### amp.d.ts
[AMPはtypescript用の組込型が無い](https://nextjs.org/docs/advanced-features/amp-support/typescript)ので、自分で`amp.d.ts`を作る必要がある。実際に`<amp-img>`とすると`Property 'amp-img' does not exist on type 'JSX.IntrinsicElements'.`と出る。

![](/assets/posts/202010/ampError.png)

なので、[このstack overflow](https://stackoverflow.com/questions/50585952/typescript-and-google-amp-property-amp-img-does-not-exist-on-type-jsx-intrin/50601125#50601125)を見ながら、custom typesを追加してくれと、Next.js公式はドキュメントで言っている。。

取り敢えず、[amp-image](https://amp.dev/ja/documentation/components/amp-img/?format=websites)を対応してみる。

```typescript
// amp.d.ts
declare namespace JSX {
  type ReactAmp = React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  >
  
  interface AmpImg extends ReactAmp {
    children?: React.ReactNode
    alt?: string
    attribution?: string
    src?: string
    srcset?: string
    width?: string
    height?: string
    sizes?: string
    heights?: string
    layout?: 'fill' | 'fixed' | 'fixed-height' | 'flex-item' | 'intrinsic' | 'nodisplay' | 'responsive'
    fallback?: ''

    on?: string // amp-image-lightbox
    role?: string
    tabindex?: string
  }

  interface IntrinsicElements {
    'amp-img': AmpImg;
  }
}
```

余談：[とあるgist](https://gist.github.com/azu/2dec148bcec2ea8a34c894aee51b3571)や[とあるamp.d.ts](https://github.com/SYMBIO/next-devstack/blob/761fcc46904f5dca0bb1b457f6e387fe007c023a/src/types/amp.d.ts)を見かけた。

### amp-img
[以前に画像最適化した際](https://oriverk.dev/posts/20200921-optimized-images)に使った `next-optimized-images` を今回も併用した。

また fallback にはエラー回避の為に、空文字を渡しておいた。これは[Reactの仕様に起因](https://reactjs.org/docs/jsx-in-depth.html#props-default-to-true)していて、[React issue#9230](https://github.com/facebook/react/issues/9230)が一番参考になった。これによるNext.js側のissueだと、[#8861](https://github.com/vercel/next.js/issues/8861)、[#10000](https://github.com/vercel/next.js/issues/10000)、[#12708](https://github.com/vercel/next.js/issues/12708)がある。attributeが違うだけで、原因は全部同じようだ。


<details><summary>code of amp-img</summary><div>

```typescript
const AmpImg = () => {
// below is related to next-optimized-images
  const image = require('@public/assets/shirase.jpg?resize')
  const webp = require('@public/assets/shirase.jpg?resize&format=webp')
  return (
    <>
      <amp-img alt='shirase' layout='responsive'
        width={webp.width} height={webp.height} src={webp.src} srcset={webp.srcSet}
      >
      <amp-img fallback='' alt='shirase'
        width={image.width} height={image.height} src={image.src} srcset={image.srcSet}
      ></amp-img>
      </amp-img>
    </>
  )
}
```

</div></details>

### amp-image-lightbox
画像ポップアップのlightbox。amp-image-lightboxを書き加え、amp-imgにon属性等を書き足すだけで動く。またidさえ合致して置けば、1ページに1つのamp-image-lightboxで動く。

[リンク: amp-image-lightbox](https://amp.dev/ja/documentation/components/amp-image-lightbox/?format=websites)

<details><summary>code of amp-image-lightbox</summary><div>

```typescript
const AmpImageLightbox = () => {
  const shirase = require('@public/assets/shirase.jpg?resize')
  const pikachu = require('@public/assets/pikachu.jpg?resize')
  return (
    <>
      <amp-image-lightbox id='lightbox1' layout='nodisplay' />
      <figure>
        <amp-img on='tap:lightbox1' role='button' tabindex='0' layout='responsive' className='shirase' width={shirase.width} height={shirase.height} src={shirase.src}></amp-img>
        <figcaption>JSDF Antarctic IceBreaker Shirase</figcaption>
      </figure>
      <div>
        <amp-img on='tap:lightbox1' role='button' tabindex='0' layout='responsive' className='pikachu' aria-describedby='imageDescription' width={pikachu.width} height={pikachu.height} src={pikachu.src}></amp-img>
        <div id='imageDescription'>A wild pikachu in WA.</div>
      </div>
    </>
  )
}
```
</div></details>

### amp-image-slider
中央のスライダーを動かして、画像を比較できる。個人的にはphotoshopでの画像修正のビフォーアフターを見せる箇所の奴。画像ラベルには通常のdiv要素にはない属性を必要とし、.d.tsで拡張することにした。

```typescript
// index.d.ts
import { AriaAttributes, DOMAttributes } from 'react'
declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    first?: '';
    second?: '';
  }  
}
```

![](/assets/posts/202010/pikachu.jpg)

<details><summary>code of amp-image-slider</summary><div>

```typescript
const AmpImageSlider = () => {
  const lqip = require('@public/assets/pikachu.jpg?lqip')
  const pikachu = require('@public/assets/pikachu.jpg?resize')
  return (
    <>
      <amp-image-slider layout='responsive' width='100' height='200'>
        <amp-img src={lqip.src} alt='lqip' width={pikachu.width} height={pikachu.height}></amp-img>
        <amp-img src={pikachu.src} alt='pikachu' width={pikachu.width} height={pikachu.height}></amp-img>
        <div first=''>this is pikachu lqip</div>
        <div second=''>this is pikachu</div>
      </amp-image-slider>
    </>
  )
}
```

</div></details>

### amp-carousel
amp-carouselも実際に触ってみたが、controlsやautoplay、loopに空文字を渡せるように.d.tsに定義する以外は真新しいものは無かったので割愛。ただ、`amp-carousel`に指定できる属性が多く、属性だけで見た目や動作などを大きく変えれるので、弄って遊ぶだけでも面白かった。

![](/assets/posts/202010/carousel.jpg)


## others

[TOC]

# Last
# References
- [amp を試す際に作った playground](https://play.oriverk.dev)
- [上 playground のコード](https://github.com/oriverk/next-ts-amp)

amp化する際に、読んだり参考にしたもの。

- [amp.dev](https://amp.dev/)
- [Vercel Next.js - AMP Support](https://nextjs.org/docs/advanced-features/amp-support/introduction)
- [mizchi.dev - next.js の AMP mode を使って静的サイトを作る](https://mizchi.dev/study-next-amp-by-mdxx-ssg)
    - こちらのサイトはFull AMPで実装
- [Recruit - モダンなWebフロントエンドの技術とAMP](https://engineer.recruit-lifestyle.co.jp/techblog/2019-12-04-amp-next-js/)
    - Next.jsとAMPの話。
- [実践 Web Stories（旧 AMP Stories）](https://qiita.com/p_irisawa/items/caf0b82c9b184ce6e874)
- [TypeScript で書く React コンポーネントを基礎から理解する](https://qiita.com/sangotaro/items/3ea63110517a1b66745b)
- [How to add attributes to HTML element in TypeScript](https://linguinecode.com/post/how-to-add-attributes-to-html-element-in-typescript)
    - 既存のHTMLの拡張の仕方。
