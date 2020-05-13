---
date: '2019-03-11'
update: '2019-1204'
title: 'Qiita: 5日目：Bootstrapを初めて触ってみた'
tags: Qiita Ruby Rails Bootstrap
author: OriverK
slide: false
---

from Qiita
- [5日目：Bootstrapを初めて触ってみた](https://qiita.com/OriverK/items/7cff4e36a2d19759cccb)

# 使用環境
ホストOS: Windows10 Home
仮想環境OS: Ubuntu Bento/Bionic
ruby 2.5.1p57
Rails 5.2.2
MySQL

# Bootstrapとは
> [Bootstrapホームページトップより](https://getbootstrap.com/)
>>Build responsive, mobile-first projects on the web with the world’s most popular front-end component library.

>>Bootstrap is an open source toolkit for developing with HTML, CSS, and JS. Quickly prototype your ideas or build your entire app with our Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful plugins built on jQuery.

# いつもの`rails s`辺りまでの準備
```sh:terminal
rails new private_butostrap -d mysql
#Gemfileのmini-racerコメントイン
bundle install
/config/database.ymlのパスワード情報追加
rails db:create
rails s  # 一応確認
```

# Scaffoldでテーブル作成
```sh:terminal
# rails g scaffold (コントローラ名/モデル名)　カラム名：データ型　・・・
rails g scaffold User name:string email:string sex:integer age:integer address:integer attendance:integer opinion:text
```

## rails db:migrate
```sh:terminal
rails db:migrate
# 一応確認として
use private_butostrap_development;
show table;
```

## consoleでデータ追加
```rb:console
(1..100).each do |num|
  if num % 2 == 0
    s = 0
    ad = 0
    at = 0
  else
    s = 1
    ad = 1
    at = 1
  end

  user = User.create(name: "taro-#{num}", email: "val-#{num}@gmail.com", sex: s, address: ad, attendance: at, opinion: "nothing special-#{num}")
  user.save
end
```

## `rails s`で一応確認
太郎100人兄弟入ってる。

![buto1.JPG](https://qiita-image-store.s3.amazonaws.com/0/294402/acbaff5f-7a12-7e7d-d3ce-af7e4f1142f7.jpeg)

# Bootstrapで見栄え修正
## ButostrapのCSSの読み込み
参照
- [Bootstrap introduction](https://getbootstrap.com/docs/4.3/getting-started/introduction/)

```html:app/views/layouts/application.html.erb
<!-- <head>の中で読み込む -->
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

<!-- <body>の中で読み込む -->
<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
```

リンクが青くなった。

![buto2.JPG](https://qiita-image-store.s3.amazonaws.com/0/294402/640313b9-b4bf-095e-9f93-696099a3eade.jpeg)

## indexページのNewUserボタンの変更
```rb:app/views/users/index.html.erb
# 元のコード
<%= link_to 'New User', new_user_path" %>
# Bootstrap用のclass追加
<%= link_to 'New User', new_user_path , class: "btn btn-primary"%>
```

同様にshow、edit、destroyボタンも変更

## tableの見栄えも変更
参照：[bootstrap table](https://getbootstrap.com/docs/4.3/content/tables/)

```rb:app/views/layouts/application.html.erb
# 元のコード
<table>
# 修正後
<table class="table table-hover table-dark">
```

NewUserボタンをblockに、テーブルを黒くし、ホバリングで色が変わるようにみた。、修正しようと思えば、いくらでもなので、indexページだけにしておく（白地も気にしない）

![buto4.JPG](https://qiita-image-store.s3.amazonaws.com/0/294402/4091e819-a755-2bea-bd3c-e012e5c9ace1.jpeg)

Bootstrapが、こんなに簡単だとは思いもしなかった。

# jsファイルの挿入部分を考える
## 授業の中で言われたこと
- headかbodyどうかが、ユーザビリティに影響を与える
    - head内：jsファイルが重い場合は、jsファイルが読み込まれるまで、ページが表示されない。
    - body内：先にページが表示されて、その後にjsファイルが読み込まれます。
    - HTML解析前に実行されるべきjsファイルなどはheadタグ内に記述するべし

## ページ読み込み時間は、ユーザの直帰率等に影響を及ぼす
参考:
- [一次データ:Does Page Load Time Really Affect Bounce Rate? pingdom](https://royal.pingdom.com/page-load-time-really-affect-bounce-rate/)

上の一次データによると、ページ読み込み時間3秒までは直帰率は10%弱だが、5秒で38%、7秒で50%を超える

**サイトページをいかに軽し、見せたいものの読み込み速度を上げることは重要**
