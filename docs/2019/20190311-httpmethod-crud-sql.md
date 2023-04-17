---
create: '2019-03-11'
title: 'Day 3：HTTP method と CRUD と SQL'
tags: [cebu, crud, restful]
published: true
---

from [Qiita: HTTPメソッドとCRUDとSQL](https://qiita.com/OriverK/items/19b9e0113fe22afb3017)

## flow to display web page

1. ブラウザで URL にアクセスして、DNS サーバーに IP を問い合わせ、DNS サーバーが IP を返す
2. html などの情報をやり取りするための Protocol Cliant がサーバー上の query(何を)と Http メソッドをサーバーに Http リクエストする。
3. サーバーがレスポンス

## HTTP

- Hypertext Transfer Protocol の略
- HTML と XML による Hypertext の送信を主に、その他さまざまなデータのやり取りができる。
- リクエスト-レスポンス型のプロトコルで、
  - web ブラウザ「あれが欲しい。これをしてくれ」
  - (※あれ＝query、これをして＝http method)
  - web サーバー「OK、はいよ」

## HTTPメソッドの内訳とSQLの関係、CRUDとRESTful

|  HTTPメソッド  | 内容 | CRUD  |MySQL| MySQL|
|:-:|:-:|:-:|:-:|:-:|
|  GET 　| リソース取得 | CREATE  | 生成| INSERT |
|  POST  | リソースデータ追加、小リソース作成 | READ | 読み取り | SELECT |
|  PUT/PATCH  | リソース更新作成  | UPDATE  | 更新 | UPDATE |
|  DELETE  | リソース削除 | DELETE  | 削除 | DELETE |
|:-:|:-:|
| HEAD | リソースのヘッダー(メタデータ取得)  |
| OPTION | リソースがサポートしているメソッドの取得  |
| TRACE | プロキシ動作の確保  |
| Connect | プロキシ動作のトンネル接続への変更  |

### CRUD

- CREATE, READ, UPDATE, DELETE の 4 つの単語のイニシャルを並べたもの
- 上４つは、**殆どすべてのコンピュータソフトが持つ永続性の基本機能**
  - （情報の参照。検索。更新。削除）
  - [ここでいう永続性とは専門的な意味合いなので、wikiだけでも読むと面白い](https://ja.wikipedia.org/wiki/%E6%B0%B8%E7%B6%9A%E6%80%A7)

### REST

- 分散ハイパーメディアシステムのためのソフトウェアアーキテクチャのスタイルの1つ。
- HTTP 規格の主要著者のロイ・フィールディングが 2000 年にはじめて提唱

- 参照: [Architectural Styles and the Design of Network-based Software Architectures](https://www.ics.uci.edu/~fielding/pubs/dissertation/top.htm)

- [wikipedia「Representational State Transfer」より](https://ja.wikipedia.org/wiki/Representational_State_Transfer)
  - フィールディングの REST アーキテクチャスタイルの原則に合わせた Web サービスシステム。
  - 遠隔手続き呼出し(RPC)スタイルに合わせた簡易な XML + HTTP インタフェースを採用したシステム
