---
date: '2020-05-26'
author: Kawano Yudai
title: 'Qiita: Next.jsでポートフォリオサイトを作成した'
tags: [Qiita, React, next.js, remark.js, Vercel]
image: '/assets/prtsc-1000.jpg'
slide: false
---

## はじめに
[Ruby + JekyllによるGihubPagesは既にある](https://github.com/oriverk/oriverk.github.io)のですが、宮崎版コロナ対策サイトでVueに触れ、勉強がてら実際にJSによるサイト作成をする事にしました。

- JSの現状を知るために参照した主サイト
- [2020年 React軸で学ぶべき技術 from mizchi's blog](https://mizchi.hatenablog.com/entry/2020/01/04/172041)
- [ユーザー体験を向上させるサーバーサイドレンダリングJavaScript — 歴史と利点](https://medium.com/@sundaycrafts/%E3%83%A6%E3%83%BC%E3%82%B6%E3%83%BC%E4%BD%93%E9%A8%93%E3%82%92%E5%90%91%E4%B8%8A%E3%81%95%E3%81%9B%E3%82%8B%E3%82%B5%E3%83%BC%E3%83%90%E3%83%BC%E3%82%B5%E3%82%A4%E3%83%89%E3%83%AC%E3%83%B3%E3%83%80%E3%83%AA%E3%83%B3%E3%82%B0javascript-%E6%AD%B4%E5%8F%B2%E3%81%A8%E5%88%A9%E7%82%B9-df68cd7cd991)

### 自分
大学研究でcppを利用しただけの、農学部卒。
ただいま無職、転職活動中（ここ2か月は自粛でstay home

## 作成に当たって
ReactとNext.jsのtutorialとdocsを一通りやりました。

- [React チュートリアル](https://ja.reactjs.org/tutorial/tutorial.html)
- [Next.js チュートリアル](https://nextjs.org/docs/getting-started)

### サイト自体の目的
- 経歴や作成したもののリンクをまとめる
  - GithubPagesやQiita、Gistへの投稿物を一か所にまとめる
  - Markdonwによるページ作成

### つくったもの
- [Github リポジトリ](https://github.com/oriverk/next-portfolio)
- [this site](https://oriverk.dev)

<picture>
</picture>

<video autoplay loop muted playsinline>  
  <source src='/assets/posts/202005/next-portfolio-prtsc.webm' type='video/webm'>  
  <img src='/assets/posts/202005/next-portfolio-prtsc.gif' alt='screen-shot of next.js portfolio' />
</video>  

まだ、ドキュメントや人のコードを参照しながら色々試している最中なので、コードが汚いです。

### 技術・要件など
- React.js, Next.js
  - マークダウン変換
    - [remarkjs/reamrk](https://remark.js.org/)
    - あとで[mdx-js/mdx](https://mdxjs.com/)に変更するかも
  - シンタックスハイライト
    - [highlight.js](https://github.com/highlightjs/highlight.js/)
  - UIコンポーネント
    - [Material-UI mui-org/material-ui](https://material-ui.com/)
  - ダークテーマ

### 環境
- vm：virtualbox + vagrant
    - OS: Ubuntu18.04 bionic
- node -v :v12.16.1
- yarn -v :1.22.4

## 実作業
### yarn create next-app

```sh
yarn create next-app next-portfolio
# =>
# ? Pick a template › - Use arrow-keys. Return to submit.
# ❯  Default starter app
#    Example from the Next.js repo
```

#### Example from the Next.js repo
- amp類
  - amp, amp-story, amp-first
    - 参照: [ビジュアルに訴える AMP ストーリーを作成する from AMP](https://amp.dev/ja/documentation/guides-and-tutorials/start/visual_story/?format=stories)
- google analytics類
  - with-google-analytics, with-google-analytics-amp
- aws類 
  - with-aws-amplify, with-aws-amplify-typescript
- その他: api類, custome server類, preact及び多数（多すぎるので割愛
- 参照：[Github: zeit/next.js/example](https://github.com/zeit/next.js/tree/master/examples)


#### Default starter appの場合
今回はReact Next.jsの勉強も兼ねているので、defaultの方を利用した。

`yarn dev`すると

<picture>
  <source srcSet='/assets/posts/202005/next1.webp' type='image/webp' />
  <img src='/assets/posts/202005/next1.jpg' alt='Hello Next.js' />
</picture>


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

- 参照
- [React.Component](https://ja.reactjs.org/docs/react-component.html#gatsby-focus-wrapper)
- [React.Fragment](https://ja.reactjs.org/docs/fragments.html#keyed-fragments)

### Material-UI 導入
見た目重視でmaterial-uiを導入し、主にサイドバーのpermanent / swipeable drawerとGridに使用。

- 参照
- [Material-UI top 日本語ページ](https://material-ui.com/ja/)
  - [material-ui/examples/nextjs/](https://github.com/mui-org/material-ui/tree/master/examples/nextjs)
    - [Icon from material-ui](https://material-ui.com/ja/components/icons/)
    - [Icon一覧](https://material-ui.com/ja/components/material-icons/)

```sh
yarn add @material-ui/core
yarn add @material-ui/icons
```

### create src/pages/index.jsx

1. `src`ディレクトリを作成し、下に`pages`を収める。
2. `src/components/Layout.jsx`の作成

複数ページで共通デザインとなる`Layout.jsx`を作成する。ここでは省略したが、`<aside />`の中には、`material-ui`を利用したpermanent-drawerとモバイル用のswipeable-drawerを実装した。

<details><summary><code>/src/components/Layout.jsx</code></summary><div>

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

<details><summary><code>/src/components/HomeContetnts.jsx</code></summary><div>

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
            ...
          </picture>
        </Grid>
        <Grid item md={12} lg={7}>
          <p>My name is Kawano Yudai.</p>
          <p>I graduated from Miyazaki Universiy as Bachelor of Agriculture.</p>
          <p>I belonged to agricultural engineering lablatory and studied crop row detecting tech by image processing with C++ and OpenCV.</p>
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

### _app.jsx, _document.jsx, 404.jsx
参照
- [Custom App from Next.js](https://nextjs.org/docs/advanced-features/custom-app)
- [Custom Document from Next.js](https://nextjs.org/docs/advanced-features/custom-document)
- [Custom Error Page from Next.js](https://nextjs.org/docs/advanced-features/custom-error-page)

- `_app.jsx`
  - global cssを追加する場所
- `_document.jsx`
  - SSRされる箇所なので、`onclick`などイベントハンドラは動かない
  - `<Main />`の外側にあるコンポーネントはブラウザによる初期化がされないので、Appロジック等は`app.jsx`に記述
  - `<title>`や`<Head />`、`styled-jsx`を書いちゃ駄目。

### Posts周辺の作成
#### ダイナミックルーティング
- 参照
- [Next.js - Pages](https://nextjs.org/docs/basic-features/pages#pages-with-dynamic-routes)
- [Next.js - Dynamic routes](https://nextjs.org/docs/routing/dynamic-routes)
- [Docs - next/routes from Next.js](https://nextjs.org/docs/api-reference/next/router)

ディレクトリ構成

```sh
- pages (*directory)
  - index.jsx
  - posts (*directory)
    - hoge.jsx
    - [id].jsx
```

また、`/pages/posts/[id].jsx`は

```jsx
// /pages/posts/[id].jsx
import useRouter from 'next/route'
export default function Post(){
  const router = useRouter()
  const { id } = router.query
  return <p>Post: {id}</p>
}
```

ファイル名に`[]`が付いてるので変に見えるが。例えば

- `localhost:3000/posts/hoge/`にアクセスすると`pages/posts/hoge.jsx`が読み込まれる。(これは普通)
- `localhost:3000/posts/foobar`だと、`pages/posts/foobar.jsx`が読み込まれ、

<picture>
  <source srcSet='/assets/posts/202005/next2.webp' type='image/webp' />
  <img src='/assets/posts/202005/next2.jpg' alt='dynamic route' />
</picture>

`dynamic route`と`Link( next/link )`を併用する時は、`href`に合わせて`as`も使うなど注意点があるが、非常に便利な代物かと。

#### getStaticProps, getStaticPaths
今回はmdファイルを`/src/pages/docs`に入れる。

- `baseUrl/posts`へのアクセス時は、docs下のmdファイルを読込み、posts一覧の出力
- `baseUrl/posts/[id]`の場合は、同様にして、post単体の出力
- `baseUrl/tags`の場合は、同様にpostsで使用されている投稿タグ一覧の出力
- `baseUrl/tags/[tag]`なら、同タグを使用するposts一覧を出力
  - 重複tagが出るので、tag全取得 => `toLowerCase()` => `sort()` => 重複削除
- docs配下に無いmdファイル名にアクセスした場合は、`404`

ページ出力が`src/pages/docs/xxx.md`という外部データに依存した静的ページ出力をしたいので、`getStaticProps`と`getStaticPaths`を使用した。

- 参照
- [Data fetching - Next.js](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation)
- [Static Generation with Data - Next.js Pages](https://nextjs.org/docs/basic-features/pages#static-generation-with-data)

- `getStaticProps`
  - 出力ページのコンテンツが外部データに依存している時に使用
- `getStaticPaths`
  - 出力ページ中のリンクが外部データに依存している時に使用

実装は下を参照しながらしました。タグの方は自分で用意しましたが。
[Next.jsのチュートリアルのこのページ](https://nextjs.org/learn/basics/dynamic-routes/implement-getstaticpaths)

<picture>
  <img src='/assets/posts/202005/next3.png' alt='posts index' />
</picture>

tagsページのスタイルが未だ・・・

<picture>
  <img src='/assets/posts/202005/next4.png' alt='tags index' />
</picture>

#### マークダウン

- 実現したい事
    - QiitaやGist等での投稿を可能な限り手間なく集約したい
      - `mdxjs/mdx`なら、ファイル中に`import`や`export`等のjsを組み込める。
        - 汎用性を考えて、今回は`front-matter`を使用する。
- 最終的に利用したもの。
   - [jonschlinkert/ gray-matter](https://github.com/jonschlinkert/gray-matter)
   - processor: [remarkjs/ remark](https://remark.js.org/)
   - highlighter: [highlight.js](https://highlightjs.org/)

- 参照：`mdxjs/mdx`らへん
- [MDXjs get started](https://mdxjs.com/getting-started/next)
- [Zeit - Next.config.js](https://nextjs.org/docs/api-reference/next.config.js/introduction)

構文木について、しっかり学ばねばと思いました。

<details><summary><code>/src/lib/posts.jsx</code></summary><div>

```jsx
// /src/lib/posts.jsx
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'
export async function getPostData(id) {  
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const matterResult = matter(fileContents)
  const LowerCaseTags = matterResult.data.tags.map((tag) => (tag.toLowerCase()))
  const highlight = require('remark-highlight.js')
  
  const processedContent = await remark()
    .use(highlight)
    .use(html)
    .process(matterResult.content)
  
  const contentHtml = processedContent.toString()
  
  return {
    id,
    contentHtml,
    LowerCaseTags,
    ...matterResult.data,
  }
}
```

</div></details>

#### meta

<picture>
  <source srcSet='/assets/posts/202005/next5.webp' type='image/webp' />
  <img src='/assets/posts/202005/next5.jpg' alt='next.js syntax-highlight' />
</picture>

以前に[rubyとjekyllで作ったgithubpages](https://oriverk.github.io/blog/confirm-font-size)と比較して、syntax-highlightが粗いので改善が必要

<picture>
  <img src='/assets/posts/202005/next6.png' alt='githubpages syntax-highlight' />
</picture>


```sh
# front-matter
---
date: '2020-05-26'
author: Kawano Yudai
title: 'Qiita: Next.jsでポートフォリオサイトを作成した'
tags: [Qiita, React, Next.js]
image: '/assets/posts/202003/miyazaki-oss1.jpg'
slide: false
---
```

#### SNSシェアボタン

```jsx
// ./src/pages/posts/[id].jsx
<button className='twitter'>
  <a href={`https://twitter.com/share?text=${postData.title}&hashtags=react,nextjs&url=https://next-portfolio-blue.now.sh/posts/${postData.id}&related=not_you_die`}
    target='_blank' rel='noopener noreferrer'><TwitterIcon /></a>
</button>
<button className='hatena'>
  <a href={`https://b.hatena.ne.jp/entry/https://next-portfolio-blue.now.sh/posts/${postData.id}`} className='hatena-bookmark-button' data-hatena-bookmark-layout='touch-counter'
    title={postData.title} target='_blank' rel='noopener noreferrer'><HatenaIcon /></a>
</button>
```

## 更新
### README.md 整備
@ 2020/05/27

- 参照
- [【GitHub】README.mdをカッコ可愛くデザインしてアプリの魅力を120%にする](https://qiita.com/aocattleya/items/5f836e9c65ba3eb3af03)

Qiita投稿の公開に当たり、[`README.md`](https://github.com/oriverk/next-portfolio/blob/master/README.md)を充実させた

### npm install 禁止
@ 2020/05/27

- 参照
- [yarnを使うプロジェクトでnpm installを禁止する方法](https://qiita.com/suin/items/a7bf214f48eb9b2d9afc)

特に理由はないが`npm`の仕様を禁じることにした。

## 残る改善点、したい事など
### サイト全体

- Material-uiからの脱却
- swipeable-drawer以外は自分で実装出来そうなので 

<picture>
  <img src='/assets/posts/202005/next7.png' alt='page score' />
</picture>

- CSSの統一(module.cssなのかstyled-jsxなのか等)
- TypeScript化（触ってみたいだけ
- AMP一部対応( 参照：[Next.js next/amp](https://nextjs.org/docs/api-reference/next/amp)
- google analytics, PWA対応
- カスタムドメイン
  - https://oriverk.dev
- api routeを試す

### posts, tags周辺
- `/tags`ページの整備
- コードブロックの言語またはファイル名の出力
- syntax-highlightの改善
- rssの対応
