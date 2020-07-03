---
create: '2020-03-29'
update: '2020-04-7'
author: Kawano Yudai
title: 'Qiita: 宮崎県 COVID-19 対策サイトの OSS 活動に参加した。'
tags: [Qiita, COVID-19, OSS, GitHub, Vue.js, TypeScript]
image: '/assets/posts/202003/miyazaki-oss1.jpg'
---

from [Qita: 宮崎県COVID-19対策サイトを見つけ、出身者として何かしたいと思ったから、した。](https://qiita.com/OriverK/items/91429a32e6a8c191a1a6)

出身の宮崎県用の対策サイトが出来、同時に感染者数が3人に増えていたことを知った。何かできる事は無いかと思ったので、Qiitaに記録しつつ、色々やってみた。

## Introduction
Referrence
- [宮崎県 新型コロナウイルス 対策サイト](https://covid19-miyazaki.netlify.com/)
    - [Github covid19-miyazaki/covid19](https://github.com/covid19-miyazaki/covid19)
- [東京都 新型コロナウイルス 対策サイト](https://stopcovid19.metro.tokyo.lg.jp/)
    - [tokyo-metropolitan-gov/covid19](https://github.com/tokyo-metropolitan-gov/covid19)
- [Qiita: 東京都 新型コロナウイルス対策サイトへの貢献方法を解説](https://qiita.com/FPC_COMMUNITY/items/b9cc072813dc2231b2b2)

### Environment
- Ubuntu 18.04 ( vm with Vagrant
    - Node.js: v12.16. (>= 10.19.0
    - yarn: 1.22.4

## environment setup
- Refferrence
- [Github: リポジトリのREADME.md中の開発者向け情報->環境構築の手順](https://github.com/covid19-miyazaki/covid19#%E7%92%B0%E5%A2%83%E6%A7%8B%E7%AF%89%E3%81%AE%E6%89%8B%E9%A0%86)

- Gitの設定（今回は新しくvm環境を用意したので。
    - git config --global user.name "usename"
    - git config --global user.email "email"
- Vimの設定
    - [oriverk/dotfiles/.vimrc](https://github.com/oriverk/dotfiles/blob/master/init.vim)からコピペ
    - 環境のデフォルトエディタを変更し、vimを選択
        - sudo update-alternatives --config editor
- Vue用の仮想環境を用意した。（割愛
    - [仮想環境をUbuntu 18.04 （CUI/GUI）で構築する](https://qiita.com/OriverK/items/115c0c4d3c25c89327bc)
- Node.js >= v10.19.0の用意（割愛
    - [Ubuntuで使う言語のインストール方法とか環境構築とか](https://qiita.com/OriverK/items/9da9facc9d8007146e73#nodejs)
- fork, clone, yarn install

```sh
git clone https://github.com/oriverk/covid19.git
cd covid19

yarn install
yarn dev
```

<picture>
  <source srcSet="/assets/posts/202003/miyazaki-oss.webp" type="image/webp" />
  <img src="/assets/posts/202003/miyazaki-oss.jpg" alt="localhost" />
</picture>

<picture>
  <source srcSet="/assets/posts/202003/miyazaki-oss1.webp" type="image/webp" />
  <img src="/assets/posts/202003/miyazaki-oss1.jpg" alt="miyazaki-oss" />
</picture>

## What I did
最初に書いた通り、Vue（と言うかJS）何もわからないので、表示される自然言語の修正をする事にした。

- 表示言語選択メニューバー: [covid19/nuxt-i18n.config.ts](https://github.com/covid19-miyazaki/covid19/blob/development/nuxt-i18n.config.ts)
- 他言語表示用json: [covid19/assets/locales/](https://github.com/covid19-miyazaki/covid19/tree/development/assets/locales)

1. `CODE_OF_CONDUCT.md`の修正

<picture>
  <source srcSet="/assets/posts/202003/miyazaki-oss2.webp" type="image/webp" />
  <img src="/assets/posts/202003/miyazaki-oss2.jpg" alt="localhost" />
</picture>

東京都verから宮崎県verにした際の地域表記変更の漏れであり、1文字の修正だった。

```md
# CODE_OF_CONDUCT.md
<!-- 33行目：都庁の人だけではなく -->
<!-- => 県庁の人だけでなく -->
```

```sh
git add .
git commit -m "都庁を県庁に修正" --no-verify
git push コピーしてきたURL development
```

### はじめてのpull request
PRの機会は初めてだったので、下を参照しながら行った。

- 参照: [東京都 新型コロナウイルス対策サイトへの貢献方法を解説](https://qiita.com/FPC_COMMUNITY/items/b9cc072813dc2231b2b2#%E3%83%97%E3%83%AB%E3%83%AA%E3%82%AF%E3%82%A8%E3%82%B9%E3%83%88%E3%82%92%E9%80%81%E3%82%8B)

やってることは同じなので割愛。こんな感じで書いた。

<picture>
  <source srcSet="/assets/posts/202003/miyazaki-oss3.webp" type="image/webp" />
  <img src="/assets/posts/202003/miyazaki-oss3.jpg" alt="localhost" />
</picture>

無事にpull requestがmergeされ、OSS活動(?)の実績解除となりました。

<picture>
  <source srcSet="/assets/posts/202003/miyazaki-oss4.webp" type="image/webp" />
  <img src="/assets/posts/202003/miyazaki-oss4.jpg" alt="localhost" />
</picture>

## What I wanna do 
- 表示自然言語の部分を中心に修正改善
- Warningと出ている部分の修正
  - 恐らくTypescriptの型由来の警告なので、ドキュメントと格闘しながら。