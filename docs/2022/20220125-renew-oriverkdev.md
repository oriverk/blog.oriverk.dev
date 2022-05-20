---
title: oriverk.dev のサイトを作り替えました
create: "2022-01-25"
update: "2022-05-20"
tags: [preact, nextjs, typescript]
description: ""
published: true
---

## はじめに

過去の投稿：『[Next.js でポートフォリオサイトを作成した](https://blog.oriverk.dev/entry/2020/20200526-next-portfolio/)』で言及した Next.js + TypeScript の構成を作り替えました。

### 以前のサイト

2020 年頭に宮崎県版 COVID-19 対策サイトの活動の中で Vue.js に触れたこと、[Next.js が SSG 等を公開](https://nextjs.org/blog/next-9-3)した事をきっかけに、以前のサイトをつくりました。

- React, Next.js, TypeScript
- Material-UI, styled-jsx
- markdown parser: remark
- image optimizer: [cyrilwanner / next-optimized-images](https://github.com/cyrilwanner/next-optimized-images)
- host on Vercel

|![Image from Gyazo](https://i.gyazo.com/b3a6bea1c281fac879e9d9e0e824523a.jpg)|
|-:|
|トップページ|

|![Image from Gyazo](https://i.gyazo.com/e8558777eac747332b3130719f741adb.png)|
|-:|
|投稿一覧|

### 現在のサイト

- oriverk.dev
  - Vite, Preact, TypeScript, goober.js (CSS in JS)
  - SPA
  - micromark
  - Eslint, Prettier, markdownlint, textlint
  - host on CloudFlare
- blog.oriverk.dev
  - React, Next.js, TypeScript, goober.js
  - Static Generation
  - next-mdx-remote
  - Eslint, Prettier, markdownlint, textlint
  - host on Vercel

oriverk.dev と blog.oriverk.dev で分けた理由は、別々の技術・言語でやれる機会が出来るからだけです。

|![oriverk.dev](https://i.imgur.com/H29hzzB.webp)|
|-:|
|oriverk.dev|

|![blog.oriverk.dev](https://i.imgur.com/9rMMOeQ.webp)|
|-:|
|blog.oriverk.dev|

|![blog.oriverk.dev/entry](https://i.imgur.com/2nztEhZ.webp)|
|-:|
|blog.oriverk.dev/entry|

## 今後

- oriverk.dev を Preact から React に変更するかもしれない
  - React18 を触りたい。
- Material Design 3 に対応させるかもしれない
