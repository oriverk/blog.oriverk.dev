---
create: '2020-05-26'
update: '2020-07-01'
author: Kawano Yudai
title: 'Qiita: Next.js でポートフォリオサイトを作成した'
tags: [Qiita, React, next.js, remark.js, Vercel]
image: '/assets/prtsc-1000.jpg'
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
React とNext.js のtutorial と docs を一通りやりました。

- [React チュートリアル](https://ja.reactjs.org/tutorial/tutorial.html)
- [Next.js チュートリアル](https://nextjs.org/docs/getting-started)

### サイト自体の目的
- 経歴や作成したもののリンクをまとめる
  - GithubPagesやQiita、Gistへの投稿物を一か所にまとめる
  - Markdonwによるページ作成

### つくったもの
- [Github リポジトリ](https://github.com/oriverk/next-portfolio)
- [this site](https://oriverk.dev)

<video autoplay loop muted playsinline>  
  <source src='/assets/posts/202005/next-portfolio-prtsc.webm' type='video/webm'>  
  <img src='/assets/posts/202005/next-portfolio-prtsc.gif' alt='screen-shot of next.js portfolio' />
</video>

lighthouse

<picture>
  <img src='/assets/posts/202005/next7.png' alt='page score' />
</picture>

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

- `localhost:3000/posts/hoge/`にアクセスすると`pages/posts/hoge.jsx`が読み込まれる
- `localhost:3000/posts/foobar`だと、`pages/posts/foobar.jsx`が読み込まれ、

<picture>
  <source srcSet='/assets/posts/202005/next2.webp' type='image/webp' />
  <img src='/assets/posts/202005/next2.jpg' alt='dynamic route' />
</picture>

`dynamic route`と`Link( next/link )`を併用する時は、`href`に合わせて`as`も使う。

#### getStaticProps, getStaticPaths
今回はmdファイルを`/src/pages/docs`に入れる。

- `baseUrl/posts`へのアクセス時は、docs下のmdファイルを読込み、posts一覧の出力
- `baseUrl/posts/[id]`の場合は、同様にして、post単体の出力
- `baseUrl/tags`の場合は、同様にpostsで使用されている投稿タグ一覧の出力
- `baseUrl/tags/[tag]`なら、同タグを使用するposts一覧を出力
- docs配下に無いmdファイル名にアクセスした場合は、`404`

ページ出力が`src/pages/docs/xxx.md`という外部データに依存した静的ページ出力をしたいので、`getStaticProps`と`getStaticPaths`を使用した。

- 参照: [Data fetching - Next.js](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation)
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
- 最終的に利用したもの。
   - [jonschlinkert/ gray-matter](https://github.com/jonschlinkert/gray-matter)
   - processor: [remarkjs/ remark](https://remark.js.org/)
   - highlighter: [highlight.js](https://highlightjs.org/)

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

## UPDATE
### README.md
@ 2020-05-27

- 参照: [README.mdをカッコ可愛くデザインしてアプリの魅力を120%にする](https://qiita.com/aocattleya/items/5f836e9c65ba3eb3af03)

Qiita投稿の公開に当たり、[`README.md`](https://github.com/oriverk/next-portfolio/blob/master/README.md)を充実させた

### npm install 禁止
@ 2020-05-27

- 参照: [yarnを使うプロジェクトでnpm installを禁止する方法](https://qiita.com/suin/items/a7bf214f48eb9b2d9afc)

特に理由はないが`npm`の仕様を禁じることにした。

### Custom Domain
@ 2020-06-01

1. [google domain](https://domains.google.com/m/registrar/oriverk.dev?_ga=2.153310781.441756797.1591349884-1076856418.1588824685#)で購入
2. Vercel側でドメインを変更
3. Google Domain側でdnsをvercel用に変更

- ns1.vercel-dns.com
- ns2.vercel-dns.com

### Google Analytics
@ 2020-06-05

- 参照: [vercel/next.js - examples/with-google-analytics](https://github.com/vercel/next.js/tree/canary/examples/with-google-analytics)

GoogleAnalytics側でIDを取得し、`_app.jsx`と`_document.jsx`を上コードに従って修正する。

### PWA implimentation
#### next-offline
@ 2020-06-05

- 参照：[github - hanford/next-offline](https://github.com/hanford/next-offline)

`next-offline`を利用した。上リポジトリでも記載してあるが、Vercel( Now )のv1とv2で動作が違う。但し、現在はv2オンリーなので、同レポジトリ内にある[packages/now2-example](https://github.com/hanford/next-offline/tree/master/packages/now2-example)の`now.json`と`next.config.json`に倣えばよい。

#### PWA
@2020-06-25

- reference: [shadowwalker / next-pwa](https://github.com/shadowwalker/next-pwa)

最初に使った `next-offline` は更新が遅く、またexperimentalな部分を利用していた等の理由から、`next-pwa`に移行した。example から分かるように、非常にシンプルになった。

```js
// next.config.js
const withPWA = require('next-pwa')

module.exports = withPWA({
  pwa: {
    dest: 'public'
  }
})
```

#### TypeScirpt
@2020-06-30
Next.jsのTS化は非常に簡単で、最初のうちは[Next.js Learn Typescipt](https://nextjs.org/learn/excel/typescript)などに従えば良い。

```sh
touch tsconfig.json
# If you’re using Yarn
yarn add --dev typescript @types/react @types/node
```

あとは、Learn 等に従って、ts化していけば、何となく理解できる。また、`tsconfig.json`で`allowJs:true`にしておけば、もし仮に型が解らんものを含むjsファイルはそのままにしておいて、理解が進んでから完全にts化すればいいのでは。

- TSの理解を深める為に、読んだもの
  - [Qiita: tsconfig.jsonの全オプションを理解する（随時追加中）by @ryokkkke](https://qiita.com/ryokkkke/items/390647a7c26933940470)
  - [Qiita: TypeScriptの型入門 by @uhyo ](https://qiita.com/uhyo/items/e2fdef2d3236b9bfe74a)
  - [Qiita: TypeScriptの型推論詳説 by @uhyo](https://qiita.com/uhyo/items/6acb7f4ee73287d5dac0)
  - [私的TypeScriptとの関わり方ガイドライン from 角待ちは対空](https://blog.yux3.net/entry/2017/02/05/000805)

#### npm-script
[mizchi氏のブログ](https://mizchi.dev/202006211925-support-ogp)等を見てて、npm-script や EsModule 等を知った。ちょうど、`sitemap.mxl`を造る必要があったので、利用することにした。

```sh
# pagesMap.json => sitmap.mxl
# pagesMap.json + history.json => rss
```

ただ、node v12 では ESModule は未だ experimental な機能で、package.json にも `node --experimental-modules test.mjs` とする必要がある。しかし、v13からはフラグが要らないので、nodejsをアップデートした。


```sh
n --stable
# => 12.18.2
n --latest
# => 14.5.0
n latest
node -v
=> v14.4.0
```

**vercel は nodejs の LTS しか対応しないので、package.json 中の npm-script は build 用 と generate script用で分ける必要があった。**

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "local-build": "next build && node script/genRobots.mjs && node script/genPostsMap.mjs && node script/genSiteMap.mjs && node script/genRss.mjs && node script/genAtom.mjs",
  "start": "next start",
},
```

mjsについて未だ良く解らん事、作るのが自分用のファイルジェネレーターであることもあって、コードが汚いので・・・↓

##### pages.json
@2020-06-30
postの情報を集約した postPages.json を作成した。ファイル更新履歴等はそのうち github から取得できるようにしたい。

- JSON.stringify が良く解らなかったので、読んだもの。
  - [JSON.stringifyを改めて調べる。 @qoAop](https://qiita.com/qoAop/items/57d35a41ef9629351c3c)

作りたいファイル構成

```json
// {
//   id: '20200526-next-portfolio',
//   title: 'Qiita: Next.jsでポートフォリオサイトを作成した',
//   create: '2020-05-26',
//   update: '2020-06-05',
//   tags: ['qiita', 'react', 'next.js', 'remark.js', 'vercel'],
// },
```

<details><summary>postsMap generator script</summary><div>

```mjs
// script/genPagesMap.mjs
import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'src/docs')
const fileNames = fs.readdirSync(postsDirectory)
const allPostsData = fileNames.map((fileName) => {
  const id = fileName.replace(/\.md$/, '')
  const fullPath = path.join(postsDirectory, fileName)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const matterResult = matter(fileContents)
  const LowerCaseTags = matterResult.data.tags.map((tag) => (tag.toLowerCase()))
  
  const title = matterResult.data.title
  const create = matterResult.data.create
  const update = matterResult.data.update || ''
  const tags = LowerCaseTags || ''
  return {
    id,
    title,
    create,
    update,
    tags
  }
})

const sortedPostsData = allPostsData.sort((a, b) => {
    if (a.create < b.create) {
      return 1
    } else {
      return -1
    }
})

fs.writeFileSync(
  path.join(process.cwd(), 'gen/postPages.json'),
  JSON.stringify(sortedPostsData, undefined, 2),
  'utf-8'
)
```

</div></details>

##### sitemap.xml
@2020-07-01
[kuflash / react-router-sitemap](https://github.com/kuflash/react-router-sitemap) や [IlusionDev / nextjs-sitemap-generator](https://github.com/IlusionDev/nextjs-sitemap-generator)等があるが、next.js なので、react-router を使ってないし、xml の構造は簡単そうだったので自作した。

- sitemap.xml を知るために読んだもの
  - [sitemaps.org - サイトマップの XML 形式](https://www.sitemaps.org/ja/protocol.html)
  - [Google Search Home - Products > Search for Developers > Guides > Separate URLs](https://developers.google.com/search/mobile-sites/mobile-seo/separate-urls)
  - [Search Console help サイトマップについて](https://support.google.com/webmasters/answer/156184?hl=ja&ref_topic=4581190)

sitemap.xml の基本構成　

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>http://www.example.com/</loc>
    <lastmod>2005-01-01</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
</urlset> 
```

**xmlはファイル頭に空白行が入ると、`<?xml ?>`の宣言が無いと言ってエラーを吐く**

<details><summary>sitemap.xml generator script</summary><div>

```mjs
// script/genSiteMap.mjs
import path from 'path'
import fs from 'fs'

const base = 'https://oriverk.dev'
const fixed = [
  { url: base, update: '2020-06-26' },
  { url: '/posts', update: '2020-06-30' },
  { url: '/tags', update: '2020-06-26' }
]

const posts = JSON.parse(fs.readFileSync(
  path.join(process.cwd(), 'gen/postPages.json'), 'utf8'
))

const sitemap = `<?xml version="1.0"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${fixed.map((f) => {
  return `<url>
    <loc>${base === f.url ? base : base + f.url}</loc>
    <lastmod>${f.update}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  `}).join("")}
${posts.map((post) => { return `<url>
    <loc>${base}/posts/${post.id}</loc>
    <lastmod>${post.update || post.create}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  `}).join("")}
</urlset>`

fs.writeFileSync(path.join(process.cwd(), "public/sitemap.xml"), sitemap)
```

</div></details>

##### RSS & Atom
@2020-07-01
RSS 2.0 と Atom 1.0 に対応する。

- 読んだもの
  - [Google Margant Center ヘルプ - RSS 2.0 仕様](https://support.google.com/merchants/answer/160589?hl=ja&ref_topic=2473799)
  - [Google Margant Center ヘルプ - Atom 1.0 仕様](https://support.google.com/merchants/answer/160593?hl=ja)
  - [PHP & JavaScript Room - RSS 2.0 のフォーマット](https://phpjavascriptroom.com/?t=topic&p=rss_format)

<details><summary>- RSS 2.0 フォーマット</summary><div>

```xml
<?xml version='1.0' encoding='UTF-8'?>
<rss version='2.0'>
	<channel>
		<title>hogehoge foobar</title>
		<link>http://example.com/</link>
		<description>aaaaaaaaaaaaaaaa</description>
		<item>
			<title>tegetege mikan</title>
			<link>http://example.com/post3.html</link>
			<description> this is description</description>
			<pubDate>Wed, 11 Jun 2008 15:30:59 +0900</pubDate>
		</item>
	</channel>
</rss>
```

</div></details>

<details><summary>- Atom 1.0 フォーマット</summary><div>

```xml
<?xml version='1.0' encoding='UTF-8'?>
<feed xmlns='http://www.w3.org/2005/Atom' xml:lang='ja'>
	<id>tag:example.comfeed/</id>
	<title>example.com update info</title>
	<updated>2020-06-11T15:30:59Z</updated>
	<link rel='alternate' type='text/html' href='http://example.com/feed/' />
	<link rel='self' type='application/atom+xml' href='http://example.com/feed/atom10.xml' />
	<entry>
		<id>http://example.com/post1.html#20080609205030</id>
		<title>foobar</title>
		<link rel='alternate' type='text/html' href='http://example.com/post1.html' />
		<updated>2020-06-09T20:50:30Z</updated>
		<summary>foofoooofooo</summary>
	</entry>
</feed>
```

</div></details>

RSS と Atom のジェネレーターコードは、基本的に sitemap.xml と同じなので。

<details><summary>RSS 2.0 ジェネレーター</summary><div>

```mjs
// script/genRss.mjs
import path from 'path'
import fs from 'fs'

const base = {
  url: 'https://oriverk.dev',
  title: "Kawano Yudai's site",
  desc: "This site is for my portfolio and made with React, Next.js"
}
const posts = JSON.parse(fs.readFileSync(
  path.join(process.cwd(), 'gen/postPages.json'), 'utf8'
))

const rss = `<?xml version='1.0'?>
<rss version='2.0'>
  <channel>
    <title>${base.title}</title>
    <link>${base.url}</link>
    <description>${base.desc}</description>
    <language>ja</language>
    <lastBuildDate>${new Date()}</lastBuildDate>/
${posts.map((post) => {
  return `<item>
      <title>${post.title}</title>
      <link>${base.url}/posts/${post.id}</link>
      <description>${post.tags.join(', ')}</description>
      <pubDate>${post.create}</pubDate>
    </item>
  `}).join('')}
  </channel>
</rss>`
fs.writeFileSync(path.join(process.cwd(),'public/rss.xml'), rss)
```

</div></details>

<details><summary>Atom 1.0 ジェネレーター</summary><div>

Atom の ユニークid をどうしようかと考えましたが、適当に。

```mjs
// script/genRss.mjs
import path from 'path'
import fs from 'fs-extra'

const base = {
  url: 'https://oriverk.dev',
  title: "Kawano Yudai's site",
  desc: "This site is for my portfolio and made with React, Next.js"
}
const posts = JSON.parse(fs.readFileSync(
  path.join(process.cwd(), 'gen/postPages.json'), 'utf8'
))

const atom = `<?xml version='1.0'?>
<feed xmlns='http://www.w3.org/2005/Atom' xml:lang='ja'>
  <id>${base.url}</id>
  <title>${base.title}</title>
  <updated>${new Date()}</updated>
  <link rel='alternate' type='text/html' href='${base.url}' />
  <link rel='self' type='application/atom+xml' href='${base.url + '/atom.xml'}' />
  ${posts.map((post) => {
    return `<entry>
      <id>${post.id}</id>
      <title>${post.title}</title>
      <link rel='alternate' type='text/html' href='${base.url + '/posts/' + post.id}' />
      <updated>${post.update || post.create}</updated>
      <summary>${post.tags.join(', ')}</summary>
    </entry>`}).join('')}
</feed>`
fs.writeFileSync(path.join(process.cwd(), 'public/atom.xml'), atom)

```
</div></details>

## To do

- CSSの統一
- AMP対応( 参照：[Next.js next/amp](https://nextjs.org/docs/api-reference/next/amp)
- `/tags`ページの整備
- コードブロックの言語またはファイル名の出力
- syntax-highlightの改善
- 検索機能
- postページの目次機能
- モバイル用 bottom navigation の設置
- og:image 動的生成コード