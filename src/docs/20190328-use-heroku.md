---
date: '2019-03-28'
update: '2019-12-04'
title: 'Qiita: 15日目：Herokuでアプリを公開しよう'
tags: Qiita Ruby Rails Heroku
author: OriverK
slide: false
---

Qiita: [15日目：アプリをネットに公開したく、Herokuを使ってみた。](https://qiita.com/OriverK/items/03c39ffbccb13c653d92) より

Rails製アプリをネットにあげるため、Herokuを使ってみた。
Herokuとは、PaaSお呼ばれるサービス。

# Paasとは
> [［用語］PaaS（Platform as a Service）@"富士通"より](http://jp.fujitsu.com/solutions/cloud/glossary/public-paas.html)
>>アプリケーションを開発・実行するために必要なハードウェア、OSなどの環境をネットワーク経由で利用する形態 。開発・実行環境が提供されるため、企業ごとに独自のサービスを構築できる。

>>従来、企業が業務システムを導入するためには、プラットフォームと呼ばれる開発・運用のための基盤を用意し、システム構築・運用する必要があった。PaaSはクラウド上にあらかじめ用意されているシステム導入のための環境を組み合わせて利用でき、開発や運用にかかる費用・工数、を削減できる。

要はネットアプリ作成の開発環境に必要なものを揃えてくれてるもの。
 
# 使用環境
- ホストOS: Windows10 Home
- 仮想環境: Ubuntu Bento/Bionic
- Ruby：2.51
- Rails: 5.2.2
    - gem ：'devise'（ログイン等の機能用）、'kaminari' （ページネーション）
- DB: PostgreSQL

# 実作業
## Heroku準備
1. Herokuサイトでアカウント作成
2. Herokuのインストール

- 参照
  - [Getting Started on Heroku with Ruby](https://devcenter.heroku.com/articles/getting-started-with-ruby?singlepage=true)

```sh:terminal
sudo snap install heroku --clasic
```
## Herokuにログイン

```sh:terminal
heroku login
# こんなのが出る。自動でブラウザが開かないときは、自分で開いてあげる必要がある。
heroku: Press any key to open up the browser to login or q to exit
 ›   Warning: If browser does not open, visit
 ›   https://cli-auth.heroku.com/auth/browser/***
heroku: Waiting for login...
Logging in... done
Logged in as me@example.com
```
ローカルのプロジェクトディレクトリに移動

# アプリをHerokuへデプロイ
## アプリのソースコードを受け取るHerokuを準備する

```sh:terminal
heroku create
# 出力例
Creating polar-inlet-4930... done, stack is cedar-14
http://polar-inlet-4930.herokuapp.com/ | https://git.heroku.com/polar-inlet-4930.git
Git remote heroku added
```

この時、herokuにより自動でgit remoteが生成され、local git repositoryと紐付けられる。

## コードをデプロイする。
```sh:terminal
git add .
git commit -m "init"
git push heroku master
```

## Herokuでマイグレーションを行う
```sh:terminal
heroku run rails db:migrate
```

# Herokuのその他コマンド
## Heroku上にデータを追加する
まず、git push heroku masterしてもローカルにあるデータはアップロードされない。なので、Herokuと連携させたコンソールで入力しないといけない。

```sh:terminal
heroku run rails console
```
コンソールでのデータ入力は、ローカル環境用と同じ。

## 操作ログを見る
```sh:terminal
heroku logs --tail
```
## Heroku上のファイルの詳細を見る
```sh:terminal
heroku "ls -l"
```
## Heroku上のアプリのURLとその他を確認
```sh:terminal
heroku info
```

授業のRubyonRails製のサイトをアップロードした。