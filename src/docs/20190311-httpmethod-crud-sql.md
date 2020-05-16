---
date: '2019-03-11'
author: Kawano Yudai
title: 'Qiita: 3日目(2)：HTTPメソッドとCRUDとSQL'
tags: Qiita HTTP crud SQL MySQL RESTful
image: '/assets/posts/201903/http1.jpg'
slide: false
---

from Qiita: 
- [3日目(2): HTTPメソッドとCRUDとSQL](https://qiita.com/OriverK/items/19b9e0113fe22afb3017)

# Webページが表示される流れのごく一部

<picture>
  <source srcSet="/assets/posts/201903/http1.webp" type="image/webp">
  <img src="/assets/posts/201903/http1.jpg" alt="https method">
</picture>

1. ブラウザでURLにアクセスして、DNSサーバーにIPを問い合わせ、DNSサーバーがIPを返す
2. htmlなどの情報をやり取りするためのProtocol Cliantがサーバー上のquery(何を)とHttpメソッド(行いたい処理）をサーバーにHttpリクエストする。
3. サーバーがレスポンス

# HTTPとは
- Hypertext Transfer Protocolの略
- HTMLとXMLによるHypertextの送信を主に、その他様々なデータのやり取りができる。
- リクエスト-レスポンス型のプロトコルで、
    - webブラウザ「あれが欲しい。これをしてくれ」
    - (※あれ＝query、これをして＝http method)
    - webサーバ「OK、はいよ」

# HTTPメソッドの内訳とSQLの関係、CRUDとRESTful

```
|  HTTPメソッド  | 内容 | CRUD  |MYSql| MySQL|
|:-:|:-:|:-:|:-:|:-:|
|  GET 　| リソース取得 | CREATE  | 生成| INSERT |
|  POST  | リソースデータ追加、小リソース作成 | READ | 読み取り | SELECT |
|  PUT/PATCH  | リソース更新作成  | UPDATE  | 更新 | UPDATE |
|  DELETE  | リソース削除 | DELETE  | 削除 | DELETE |
|:-:|:-:|
| HEAD | リソースのヘッダ(メタデータ取得)  |
| OPTION | リソースがサポートしているメソッドの取得  |
| TRACE | プロキシ動作の確保  |
| CONNECT | プロキシ動作のトンネル接続への変更  |
```

## CRUDとは
- CREATE, READ, UPDATE, DELETEの4つの単語のイニシャルを並べたもの
- 上４つは、**殆ど全てのコンピュータソフトが持つ永続性の基本機能**
    - （情報の参照。検索。更新。削除）
    - [ここでいう永続性とは専門的な意味合いなので、wikiだけでも読むと面白い](https://ja.wikipedia.org/wiki/%E6%B0%B8%E7%B6%9A%E6%80%A7)

## RESTとは
- 分散ハイパーメディアシステムのためのソフトウェアアーキテクチャのスタイルのひとつ。
- HTTP規格の主要著者のロイ・フィールディングが2000年に初めて提唱

- 参照:
    - [Architectural Styles and the Design of Network-based Software Architectures](https://www.ics.uci.edu/~fielding/pubs/dissertation/top.htm)

- [wikipedia「Representational State Transfer」より](https://ja.wikipedia.org/wiki/Representational_State_Transfer)
    - フィールディングのRESTアーキテクチャスタイルの原則に合わせたWebサービスシステム。
    - 遠隔手続き呼出し(RPC)スタイルに合わせた簡易なXML + HTTPインタフェースを採用したシステム