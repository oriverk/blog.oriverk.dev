---
date: '2020-05-26'
author: Kawano Yudai
title: 'Qiita: Next.jsでポートフォリオサイトを作成した'
tags: [Qiita, React, Next.js]
image: '/assets/posts/202003/miyazaki-oss1.jpg'
slide: false
---


※自分がやった事、経歴等を纏めたサイトという意味でのポートフォリオ

# はじめに
[Ruby + JekyllによるGihubPagesは既にある](https://github.com/oriverk/oriverk.github.io)のですが、宮崎版コロナ対策サイトでVueに触れ、勉強がてら実際にJSによるサイト作成をする事にしました。

- [2020年 React軸で学ぶべき技術 from mizchi's blog](https://mizchi.hatenablog.com/entry/2020/01/04/172041)
- [ユーザー体験を向上させるサーバーサイドレンダリングJavaScript — 歴史と利点](https://medium.com/@sundaycrafts/%E3%83%A6%E3%83%BC%E3%82%B6%E3%83%BC%E4%BD%93%E9%A8%93%E3%82%92%E5%90%91%E4%B8%8A%E3%81%95%E3%81%9B%E3%82%8B%E3%82%B5%E3%83%BC%E3%83%90%E3%83%BC%E3%82%B5%E3%82%A4%E3%83%89%E3%83%AC%E3%83%B3%E3%83%80%E3%83%AA%E3%83%B3%E3%82%B0javascript-%E6%AD%B4%E5%8F%B2%E3%81%A8%E5%88%A9%E7%82%B9-df68cd7cd991)

# 作成に当たって
- サイト自体の目的
    - 経歴や作成したもののリンクをまとめる
    - GithubPagesやQiita、Gistへの投稿物を一か所にまとめる
        - Markdonwによるページ作成

ReactとNext.jsのtutorialとdocsを一通りやりました。

- [React チュートリアル](https://ja.reactjs.org/tutorial/tutorial.html)
- [Next.js チュートリアル](https://nextjs.org/docs/getting-started)

## 出来たものについて
![prtsc-800.gif](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/294402/2dea47f2-3556-c63a-cc9c-1d894f8a4419.gif)

書いたコードは[Github](https://github.com/oriverk/next-portfolio)にありますが、一部工事中な上に、色々試した結果なのでコードが汚いです。今は未だ、人のコードや文献を参照して、どの様な書き方、componentの分け方(粒度？)などを学んでいる所です。

## 技術とか要件とか
- React.js、FW: Next.js
    - マークダウン変換: [remarkjs/reamrk](https://remark.js.org/)
        - あとで[mdx-js/mdx](https://mdxjs.com/)に変更するかも
    - シンタックスハイライト: highlight.js
    - UIコンポーネント：[Material-UI mui-org/material-ui](https://material-ui.com/)
- ダークテーマ

## 環境
- vm：virtualbox + vagrant
    - OS: Ubuntu18.04 bionic
- yarn -v :1.22.4
- node -v :v12.16.1

# 実作業
## `yarn create next-app`
オプションが出てくる

```sh
yarn create next-app next-portfolio

# =>
# ? Pick a template › - Use arrow-keys. Return to submit.
# ❯  Default starter app
#    Example from the Next.js repo
```

### Example from the Next.js repoを選択した場合
- amp類
    - amp, amp-story, amp-first
        - [参考: ビジュアルに訴える AMP ストーリーを作成する from AMP](https://amp.dev/ja/documentation/guides-and-tutorials/start/visual_story/?format=stories)
- google analytics類
    - with-google-analytics, with-google-analytics-amp
- aws類 
    - with-aws-amplify, with-aws-amplify-typescript
- その他: api類, custome server類, preact及び多数（多すぎるので割愛
- [参照：Github: zeit/next.js/example](https://github.com/zeit/next.js/tree/master/examples)


### Default starter appの場合
今回はReact Next.jsの勉強も兼ねているので、defaultの方を利用した。

`yarn dev`すると

![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/294402/a4aad096-1c13-a304-f01a-2be26f40b4ac.png)

<details><summary>作成されるディレクトリ、`package.json`</summary><div>

```sh
# directory
- public
    - favicon.ico, zeit.svg
- pages
    - index.js
- package.json
- node_modules
- README.md
- yarn.lock
```

```json
// package.json
{                                                                  
  "name": "next-portfolio",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "9.3.5",
    "react": "16.13.1",
    "react-dom": "16.13.1"
  }
}
```

</div></details>

- 参照：
    - [React.Component](https://ja.reactjs.org/docs/react-component.html#gatsby-focus-wrapper)
    - [React.Fragment](https://ja.reactjs.org/docs/fragments.html#keyed-fragments)

## Material-UI 導入
見た目重視でmaterial-uiを導入し、主にサイドバーのpermanent / swipeable drawerとGrid
デザインの箇所に使用した。手軽に今風なものが作成できて良かったが、別のuiコンポーネントに変更した際のデザイン崩れが大きそうなので、あとで脱material-uiを図りたい。

- 参照：[Material-UI top 日本語ページ](https://material-ui.com/ja/)
    - [material-ui/examples/nextjs/](https://github.com/mui-org/material-ui/tree/master/examples/nextjs)
    - ：[Icon from material-ui](https://material-ui.com/ja/components/icons/)
        - ：[Icon一覧](https://material-ui.com/ja/components/material-icons/)

```sh
yarn add @material-ui/core
yarn add @material-ui/icons
```

## サイトトップ: `src/pages/index.jsx` の作成

1. `src`ディレクトリを作成し、下に`pages`を収める。
2. `src/components/Layout.jsx`の作成

複数ページで共通デザインとなる`Layout.jsx`を作成する。ここでは省略したが、`<aside />`の中には、`material-ui`を利用したpermanent-drawerとモバイル用のswipeable-drawerを実装した。

<details><summary><code>src/components/Layout.jsx</code></summary><div>

```jsx
// src/components/Layout.jsx

import React from 'react'
import Link from 'next/link'

import { makeStyles, useTheme } from '@material-ui/core/styles'
import Hidden from '@material-ui/core/Hidden'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import Drawer from '@material-ui/core/Drawer'
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow'
import { List, ListItem, ListItemIcon, ListItemText, Divider } from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
import { MyDrawerList } from '../components/MyDrawerList'

const drawerWidth = 250
const useStyles = makeStyles((theme) => ({
  // ...
}))

export function Layout({ children }) {
  // ...
  const [state, setState] = React.useState({
    left: false,
  })

  // swipeable-drawerの開閉を制御するボタン
  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }
    setState({ ...state, [anchor]: open })
  }

  const HomeDrawerList = () => {
    return (
      <MyDrawerList>
        <List>
          <Link href='/'>
            <ListItem button>
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <ListItemText primary='Home' />
            </ListItem>
          </Link>
          // ...
        </List>
      </MyDrawerList>
    )
  }

  return (
    <React.Fragment key='left'>
      <Hidden lgUp>
        // モバイル端末用
        // if display-width > 1280px, display: none
        <SwipeableDrawer anchor='left' open={state['left']}
          onClose={toggleDrawer('left', false)} onOpen={toggleDrawer('left', true)}
        >
          <div className='swipeableList' role='presentation'
            onClick={toggleDrawer('left', false)} onKeyDown={toggleDrawer('left', false)}
          >
            <HomeDrawerList />
          </div>
        </SwipeableDrawer>
        <footer>
          <button onClick={toggleDrawer('left', true)}>
            <DoubleArrowIcon color='secondary' style={{ fontSize: 34 }} />
          </button>
        </footer>
      </Hidden>
      <Hidden mdDown>
        // 非モバイルディスプレイ用
        // if device-width < 1280px, display:none
        <aside>
          <Drawer className='permanentDrawer' variant='permanent' anchor='left'>
            <HomeDrawerList />
          </Drawer>
        </aside>
      </Hidden>
      <main className={classes.contents}>
        {children}
      </main>
      <style jsx>{`
        // ...
      `}</style>
    </React.Fragment>
  )
}
```

</div></details>

3. `pages/index.jsx`の作成
まだReact等に不慣れなので、`pages/index.js`にサイト1ページ目を作りこんで、後からcomponentに分割する方式をとった。


色々試した結果、サイトトップにあたる `pages/index.jsx`は下の様になった。また、`<head><meta/></head>`用のデータは`/public/manifest.json`から持ってくる事にした。

```jsx
// src/pages/index.jsx

import React from 'react'
import Head from 'next/head'
import { Layout } from '../components/Layout'
import { Top, About, History, Works } from '../components/HomeContents'
const manifest = require('../../public/manifest.json')

export default function Home() {
  return (
    <>
      <Layout>
        <Head>
          <title>{manifest.name}</title>
          <meta name='title' content={manifest.name} />
          <meta name='description' content={manifest.description} />
          <meta property='og:title' content={manifest.name} />
          <meta property='og:description' content={manifest.description} />
          <meta property='og:image' content={`${manifest.vercel}/assets/prtsc700.jpg`} />
          <meta property='og:url' content={`${manifest.vercel}`} />
        </Head>
        <Top />
        <About />
        <History />
        <Works />
      </Layout>
      <style jsx global>{`
        // ...
      `}</style>
    </>
  )
}
```

<details><summary><code>src/components/HomeContetnts.jsx`</code></summary><div>

```jsx
// src/components/HomeContetnts.jsx

import React from 'react'
import Link from 'next/link'
import Grid from '@material-ui/core/Grid'

export function Top() {
  return ( <section id='top' className='topContainer' />  )
}

export function About() {
  return (
    <section id='about' className='content'>
      <h2>About</h2>
      <Grid container spacing={4}>
        <Grid item md={12} lg={5}>
          <picture>
            // ...
          </picture>
        </Grid>
        <Grid item md={12} lg={7}>
          <p>My name is Kawano Yudai.</p>
          <p>I graduated from Miyazaki Universiy as Bachelor of Agriculture.</p>
          <p>I belonged to agricultural engineering lablatory and studied crop row detecting tech by image processing with C++ and OpenCV.</p>
          <p>After I quited egg company, I stayed at Australia as working holiday. Then I studied Ruby and other tech like database, website system.</p>
          <p>So, I'm interested in both nature and machinery</p>
          <p style={{ color: '#F48FB1' }}><em>Now, I'm seeking job as developer. Please contact me from left drawer.</em></p>
        </Grid>
      </Grid>
    </section>
  );
}

export function Works() {
  return ( <section id='works' className='content' /> )
}

export function History() {
  return ( <section id='history' className='content' /> )
}
```

</div></details>

## `_app.jsx`, `_document.jsx`, `404.jsx`の作成
- 参照
  - [Custom `App` from Next.js](https://nextjs.org/docs/advanced-features/custom-app)
  - [Custom `Document` from Next.js](https://nextjs.org/docs/advanced-features/custom-document)
  - [Custom Error Page from Next.js](https://nextjs.org/docs/advanced-features/custom-error-page)

主な特徴＆注意
- `_app.jsx`
  - global cssを追加する場所
- `_document.jsx`
  - SSRされる箇所なので、`onclick`などイベントハンドラは動かない
  - `<Main />`の外側にあるコンポーネントはブラウザによる初期化がされないので、Appロジック等を追加したければ、`app.jsx`に書いて。
  - `<title>`や`<Head />`、`styled-jsx`を書いちゃ駄目。

## ダイナミックルーティング
参照
- [Learn - Dynamic Route from Next.js](https://nextjs.org/learn/basics/dynamic-routes/page-path-external-data)
- [Docs - next/routes from Next.js](https://nextjs.org/docs/api-reference/next/router)

参考によい
- [Next.js 9にDynamic Routingが付いた、それは嬉しい](https://qiita.com/NanimonoDaemon/items/b27e44ba9991411dc9c2)

言葉で説明すると冗長なので下の感じ

```sh
- pages (*directory)
  - index.jsx
  - posts (*directory)
    - hoge.jsx
    - [post].jsx
```
```jsx:index.jsx
import Link from 'next/link`
import useRouter
export default function Index(){
  return (
    <ul>
      <li><List href='/posts/foobar.jsx'><a>foobar</a></List></li>
    </ul>
  )
}
```
```jsx:hoge.jsx
export default function Hoge(){
  return (<h1>This page is Hoge</h1>)
}
```
```jsx:[post].jsx
import { useRouter } from 'next/route'
import { useRouter } from 'next/router'

export default function Post(){
  const router = useRouter()
  const { pid } = router.query
  return <p>Post: {pid}</p>
}
```
<!-- WIP -->

## Posts及び[post].jsxの作成
- 実現したい事
    - QiitaやGist等での投稿を可能な限り手間なく集約したい
      - `mdxjs/mdx`なら、ファイル中に`import`や`export`等のjsを組み込める。
        - 汎用性を考えて、`front-matter`を使用する。
 - 最終的に利用したもの。
   - markdwon-processor: [remarkjs/remark] (https://remark.js.org/)
   - `front-matter`: [jonschlinkert / gray-matter](https://github.com/jonschlinkert/gray-matter)
   - highlighter: [highlight.js](https://highlightjs.org/)

- 参照：markdonwらへん
    - [MDXjs get started](https://mdxjs.com/getting-started/next)
    - [Zeit - Next.config.js](https://nextjs.org/docs/api-reference/next.config.js/introduction)
- 参照：dynamic routingらへん
    - [Next.js - Dynamic routes](https://nextjs.org/docs/routing/dynamic-routes)
    - [Next.js - Pages](https://nextjs.org/docs/basic-features/pages#pages-with-dynamic-routes)


```sh:terminal
yarn add @next/mdx @mdx-js/loader
touch next.config.js
```
```next.config.js
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/
})
module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'md', 'mdx']
})
```

読み込んだmdファイルを`base-url/post/[params]'のようにしたい。

```sh:terminal
mkdir pages/post
```
