---
title: 普段使いアイコン画像の生成方法のメモ書き
create: "2022-11-07"
tags: [memo]
description: ""
published: true
---

## はじめに

この投稿は自分用のメモ書きなので、参考を利用することで説明を出来るだけ省き、保存しておきたいコード等をメモ書きすることに徹する。

## 普段使っているアイコン画像

GIMP、Blender や Windowns プリインストールのペイントで良い感じの画像生成が自分には出来ないので、Twitter や GitHub 等で使っているアイコンは主に HTML と CSS で生成している。

[Easing Gradients](https://larsenwork.com/easing-gradients/#editor)などの CSS ジェネレータで好きな色や形の CSS を取得し、HTML に反映させて、それを画像変換ライブラリ等を使って生成している。（基本的に青系統の色が好き。[ヱヴァンゲリヲン新劇場版：Q](https://www.evangelion.co.jp/3_0/index.html)や初音ミクもこんな色。[Top | Kawano Yudai](https://oriverk.dev/)では`--color-miku: #00e1ee;`と CSS 変数を設定している。（何色なのか分からないので、取り敢えず近い色を使用している初音ミクの名前を借りた。

## HTML と CSS

```htmlembedded
<div class='border forNow' />
```

```css:gradient.css
#target {
  display: inline-block;
  padding: 50px;
  opacity: .9;
}

.border {
  width: 300px;
  height: 300px;
  border-radius: 30% 70% 59% 41% / 30% 26% 74% 70%;
}

.forNow {
  background: linear-gradient(to top right,
      hsl(157.83, 100%, 45.1%) 0%,
      hsl(158.37, 100%, 44.88%) 9.1%,
      hsl(159.93, 100%, 44.27%) 16.8%,
      hsl(162.39, 100%, 43.3%) 23.5%,
      hsl(165.67, 100%, 42.03%) 29.2%,
      hsl(169.74, 100%, 40.48%) 34.4%,
      hsl(174.6, 100%, 38.69%) 39.1%,
      hsl(180.28, 100%, 36.88%) 43.6%,
      hsl(186.13, 100%, 38.5%) 48.2%,
      hsl(191.54, 100%, 40.03%) 53%,
      hsl(196.45, 100%, 41.43%) 58.3%,
      hsl(200.81, 100%, 42.65%) 64.3%,
      hsl(204.51, 100%, 43.66%) 71.3%,
      hsl(207.41, 100%, 44.43%) 79.4%,
      hsl(209.31, 100%, 44.92%) 88.9%,
      hsl(210, 100%, 45.1%) 100%);
}
```

## PNG や SVG として取得

今までは画像化ライブラリに[tsayen/dom-to-image: Generates an image from a DOM node using HTML5 canvas](https://github.com/tsayen/dom-to-image)を使っていたが、当投稿中に[bubkoo/html-to-image: ✂️ Generates an image from a DOM node using HTML5 canvas and SVG.](https://github.com/bubkoo/html-to-image#readme)を見つけたのでこちらを使う。

```shell
npm create vite@latest gradient -- --template react-ts
npm i html-to-image
```

```jsx:App.tsx
import React, { useCallback, useRef } from 'react'
import { toPng, toSvg } from 'html-to-image';

import "./gradient.css"

const App: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)

  function filter(node: any) {
    return (node.tagName !== 'i');
  }

  const handleClick = useCallback(() => {
    if (ref.current === null) return;

    toSvg(ref.current, { filter })
      .then((dataUrl) => {
        const link = document.createElement('a')
        link.download = 'gradient.svg'
        link.href = dataUrl
        link.click()
      })
      .catch((err) => {
        console.log(err)
      })
  }, [ref])

  return (
    <>
      <button onClick={handleClick}>Click me</button>
      <div id='target' ref={ref}>
        <div className='border forNow' />
      </div>
      <div id='dest'></div>
    </>
  )
}

export default App
```

`toPng`を使うと、下の画像が得られる。

![gradient icon image](https://i.imgur.com/sSlooVx.png)

### 今まで書いてたコード

※だいぶ前に書いたもの。

```jsx:App.tsx
import React from 'react'
import domtoimage from 'dom-to-image'

const App: React.VFC = () => {
  const onClick = async (e: any) => {
    e.preventDefault()
    const node = currentTarget
    const dest = document.getElementById('dest')

    try {
      let img = new Image()
      img.src = await domtoimage.toPng(node)
      dest?.appendChild(img)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div id='target' onClick={onClick}>
        <div className='border forNow' />
      </div>
      <div id='dest'></div>
    </>
  )
}

export default App;
```

## 参照

- [Easing Gradients](https://larsenwork.com/easing-gradients/#editor)
- [Fancy Border Radius Generator](https://9elements.github.io/fancy-border-radius/)
- [bubkoo/html-to-image: ✂️ Generates an image from a DOM node using HTML5 canvas and SVG.](https://github.com/bubkoo/html-to-image#readme)
- [tsayen/dom-to-image: Generates an image from a DOM node using HTML5 canvas](https://github.com/tsayen/dom-to-image)

- たまに使うその他の CSS ジェネレータ・ツール
  - [Smooth Shadow](https://shadows.brumm.af/)
  - [Get Waves – Create SVG waves for your next design](https://getwaves.io/)
  - [Blobmaker - Make organic SVG shapes for your next design](https://www.blobmaker.app/)
  - [Neumorphic Generator](https://neumorphic.design/)
