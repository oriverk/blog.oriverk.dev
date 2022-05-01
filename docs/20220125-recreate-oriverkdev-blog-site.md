---
title: oriverkdev のサイトを作り替えた
create: "2022-01-25"
tags: [preact, nextjs, typescript]
description: テスト記事
published: false
---

過去の投稿：『[Next.js でポートフォリオサイトを作成した](https://blog.oriverk.dev/entry/20200526-next-portfolio/)』で言及した Next.js + TypeScript の構成を作り替えました。

## 以前のサイト

2020 年頭に宮崎県版 COVID-19 対策サイトの活動の中で Vue.js に触れたこと、[Next.js が SSG 等を公開](https://nextjs.org/blog/next-9-3)した事をきっかけに、以前のサイトをつくりました。


- JS 関連
  - React, Next.js, TypeScript
- Material-UI
- styled-jsx
- markdown: [remarkjs / remark](https://github.com/remarkjs/remark)
- image optimizer: [cyrilwanner / next-optimized-images](https://github.com/cyrilwanner/next-optimized-images)
- hosting: Vercel

## 現在のサイト

- oriverk.dev
  - Preact + TypeScript + goober.js (for CSS in JS)
  - SPA
- blog.oriverk.dev
  - React + Next.js + TypeScript + goober.js
  - SSG
