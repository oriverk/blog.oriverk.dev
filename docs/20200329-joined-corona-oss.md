---
create: '2020-03-29'
update: '2020-04-07'
title: '宮崎県 COVID-19 対策サイトの OSS 活動に参加した。'
tags: [oss, vue]
published: true
---

from [Qita: 宮崎県COVID-19対策サイトを見つけ、出身者として何かしたいと思ったから、した。](https://qiita.com/OriverK/items/91429a32e6a8c191a1a6)

出身の宮崎県用の対策サイトが出来、何かできる事は無いかと思ったので、Qiita に記録しつつ、色々やってみた。

## Introduction

Referrence

- [宮崎県 新型コロナウイルス 対策サイト](https://covid19-miyazaki.netlify.com/)
  - [Github covid19-miyazaki/covid19](https://github.com/covid19-miyazaki/covid19)
- [東京都 新型コロナウイルス 対策サイト](https://stopcovid19.metro.tokyo.lg.jp/)
  - [tokyo-metropolitan-gov/covid19](https://github.com/tokyo-metropolitan-gov/covid19)
- [Qiita: 東京都 新型コロナウイルス対策サイトへの貢献方法を解説](https://qiita.com/FPC_COMMUNITY/items/b9cc072813dc2231b2b2)

### Environment

- Ubuntu 18.04
  - Node.js: v12.16
  - yarn: 1.22.4

## environment setup

- [Github: リポジトリのREADME.md中の開発者向け情報->環境構築の手順](https://github.com/covid19-miyazaki/covid19#%E7%92%B0%E5%A2%83%E6%A7%8B%E7%AF%89%E3%81%AE%E6%89%8B%E9%A0%86)
- [oriverk.dev: Build FrontEnd environment on Ubuntu](https://oriverk.dev/posts/202003-setup-frontend-ubuntu)

```sh
# set up git
git config --global user.name "usename"
git config --global user.email "email"

# set up vim
# copy and paste from [oriverk/dotfiles/.vimrc](https://github.com/oriverk/dotfiles/blob/master/init.vim)
# select vim as default editor
sudo update-alternatives --config editor

# fork, clone, yarn install
git clone https://github.com/oriverk/covid19.git
cd covid19

yarn install
yarn dev
```

![image](/assets/posts/202003/miyazaki-oss.webp)

## What I did

Vue 何もわからないので、まず自然言語の表示の修正をする事にした。

- 表示言語選択メニューバー: [covid19/nuxt-i18n.config.ts](https://github.com/covid19-miyazaki/covid19/blob/development/nuxt-i18n.config.ts)
- 他言語表示用 json: [covid19/assets/locales/](https://github.com/covid19-miyazaki/covid19/tree/development/assets/locales)

1. `CODE_OF_CONDUCT.md`の修正

![image](/assets/posts/202003/miyazaki-oss2.webp)

東京都 ver から宮崎県 ver にした際の地域表記変更の漏れであり、1 文字の修正だった。

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

PR の機会は初めてだったので、下を参照しながら行った。

- 参照: [東京都 新型コロナウイルス対策サイトへの貢献方法を解説](https://qiita.com/FPC_COMMUNITY/items/b9cc072813dc2231b2b2#%E3%83%97%E3%83%AB%E3%83%AA%E3%82%AF%E3%82%A8%E3%82%B9%E3%83%88%E3%82%92%E9%80%81%E3%82%8B)

やってることは同じなので割愛。こんな感じで書いた。

![image](/assets/posts/202003/miyazaki-oss3.webp)

無事に pull request が merge され、OSS 活動(?)の実績解除となりました。

![image](/assets/posts/202003/miyazaki-oss4.webp)

## What I wanna do

- 表示自然言語の部分を中心に修正改善
- Warning と出ている部分の修正
  - 恐らく Typescript の型由来の警告なので、ドキュメントと格闘しながら。
