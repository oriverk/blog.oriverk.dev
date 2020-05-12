---
date: '2019-03-06'
update: '2019-12-4'
title: 'Qiita: 2日目(2)：Scaffoldなしでの掲示板作成'
tags: Qiita Ubuntu Ruby Rails scaffold
author: OriverK
slide: false
---

from Qiita:
- [2日目(2)：Scaffoldを用いた掲示板作成](https://qiita.com/OriverK/items/3b12f4d2f09f207a4dfa)
- [3日目：ScaffoldなしでのApp作成](https://qiita.com/OriverK/items/c1cbcc7e1a92bfced79f)
- [4日目：Scaffold無しでフォーム作成：ModelとView](https://qiita.com/OriverK/items/c3cc42eee20219361a1c)
- [8日目(1)：Scaffoldなしの掲示板作成：まとめ](https://qiita.com/OriverK/items/589efb97d7c6667319b9)

　　　　　　　　 
# 使用環境
- ホストOS: Windows10 home
- 仮想環境OS: Ubuntu Bento/Bionic
- Ruby：2.51
  - Rails:5.2.2
- エディタ: VSCode + nano

# Scaffoldを用いたページ作成
最初にScaffoldを利用して掲示板を作ってみる

## Scaffoldとは
使用するデータの型などを指定して、作りたいものの土台(アプリケーションの雛形）を作成。
*Scaffoldは英で足場の意で、個人的には初段階用の便利簡単即席ツールという認識。

##　まずrails newあたりから、rails serverまで。
```sh:terminal
rails new sample -d mysql
cd sample
```

作成されたGemfileを開き、中の`mini-racer`をコメントアウトし、`bundle install`

```yml:config/database.yml
# passwordを書き込む。
rails db:create
# database.ymlを読み込み，これに基づいてデータベースを作成
```

`rails server`でサーバーを立ち上げる

## Scaffold使用段階
```sh:terminal
rails generate model User name:string email:string sex:integer age:integer address:integer attendance:integer opinion:text
# rails generate scaffold (コントローラ名/モデル名) カラム名1:データ型1 カラム名2:データ型 2 …

rails db:migrate
```

>Railsドキュメントより(http://railsdoc.com/references/rake%20db:migrate)
>>rails db:migrateを実行
>>schema_migrationsテーブルを調べ、存在しなければ作成
>>db/migrateディレクトリ内のすべてのマイグレーションファイルを調べる
>>データベースの現在のバージョンと異なるバージョンがあった場合、データベースに適応
>>schema_migrationsテーブルの更新

この状態で、rails sで立ち上げ、localhost:3000/usersに接続し、データ入力しようとすると、

![dc16e3b0540b67f8e5999a15dde5ad82.jpg](https://qiita-image-store.s3.amazonaws.com/0/294402/e5e0fca3-7a91-c3bf-809b-8d87535916e6.jpeg)

のように、integer型で指定したカラムに±∞の数値を入力できてしまう。
そこで

```rb:app/models/user.rb
class User < ApplicationRecord  
  enum sex: { male: 0, female: 1 }
end
```

```rb:app/views/users/_form.html.erb
# ラジオボタンに変更
<div class"field">
<%= form.label :sex %>
<%= form.radio_button :sex, 'male' %>男性
<%= form.radio_button :sex, 'female' %>女性
</div>
```

とすると、性別がラジオボタンとなり、意図したデータ入力ができる。
その他のカラムも同様にラジオボタンに変更するなり出来る。

---
# 3日目
これから、`scaffold`を利用せずにApp作成をし、Scaffoldの有難みを知る

## 前準備
1. rails s new qiita_routes -d mysql
2. Gemfileのminiracerコメントインして、bundle install
3. config/database.ymlのpassword情報編集
4. rails db:create

## 前提：知識
### ページ作成に必要なもの
- view(@ /app/views/コントローラ名/
    - 今日はしなかったので、今投稿には未記載
    - viewの中身がブラウザに表示される内容
- controller(コントローラ
    - ページ表示の際、controllerを経由して、viewをブラウザに返す。
    - controllerで設定したactionは、controllerと同じ名前のviewフォルダの中から、actionと同じ名前のhtmlファイルを探してブラウザに返します（まだ理解しきれていない気がする。
- routing(ルーティング
    - ブラウザとcontrollerを繋ぐ。

### ページ表示の流れ
**Routing => Controller => Model => View**
modelはデータベース情報が必要な時だけ使用.今回は必要ではないので、とばす。

## 本段階
### ①controllerを作成
```sh:terminal
#rails generate controller コントローラ名 (+アクション名)
rails generate controller Users
```

```sh
# rails routes

 Prefix Verb URI Pattern                                                                              Controller#Action
       rails_service_blob GET  /rails/active_storage/blobs/:signed_id/*filename(.:format)                               active_storage/blobs#show
rails_blob_representation GET  /rails/active_storage/representations/:signed_blob_id/:variation_key/*filename(.:format) active_storage/representations#show
       rails_disk_service GET  /rails/active_storage/disk/:encoded_key/*filename(.:format)                              active_storage/disk#show
update_rails_disk_service PUT  /rails/active_storage/disk/:encoded_token(.:format)                                      active_storage/disk#update
     rails_direct_uploads POST /rails/active_storage/direct_uploads(.:format)                                           active_storage/direct_uploads#create
```

となる。また、`rails server`を行うと、

![routing_error.JPG](https://qiita-image-store.s3.amazonaws.com/0/294402/a646ba25-39f5-193d-0a98-0506b83d78f8.jpeg)

これは、routingを未だ設定していない為。
### routingの設定：ブラウザとコントローラをつなぐ

```rb:config/routes.rb
Rails.application.routes.draw do
  get 'users', action: :index, controller: 'users'
end
```

```sh:
# rails routes

Prefix Verb URI Pattern                                                                              Controller#Action
users GET  /users(.:format) 　 #追加された行                                                                       users#index   　　　　　　　　　#追加された行
2行が追加
```

`rails s`で確認

![unknown_action.JPG](https://qiita-image-store.s3.amazonaws.com/0/294402/2cb463ca-c50b-81ad-ceb4-707dfc9c1c72.jpeg)

### controller：modelとviewをつなぐ
```rb:app/controllers/users_controller.rb
class UsersController < ApplicationController
  def index
    render plain: 'Hello'
  end
end
```

無事に、ブラウザ上でHelloが表示された。

### renderメソッド
上controller編集時に用いた、renderメソッドは実際に画面に表示される内容を生成する。今回のrenderのplainオプションを指定すると、文字列を直接表示できる。
**Railsのcontrollerでrenderを省略すると、代わりにapp/views/コントローラ名/アクション名.html.erbを用いる**
=>ということはcontroller作成コマンドは `rails g controller コントローラ名　アクション名`

### 明日以降やると思われること=Model、View
- model
    - データベースを操作する。
    - app/models下に配置される
    - データベースに含まれるテーブル毎に用意され、データの登録・取得・更新・削除などを行う
    
- view
    - app/views/users/に配置され、ファイル拡張子はhtml.erb
    - viewの中身がブラウザに表示される内容。編集すると表示内容を変更することができる。

## 参考
- 参照
  - [Ruby on Rails でページを作成する仕組み by @np_misaki氏](https://qiita.com/np_misaki/items/1c5ff951272a91f70e5f)

- config : アプリケーションの設定情報を格納する
- /routes.rb : ルーティングの設定を行う
- /locales : 辞書ファイル(グローバル対応等)
- /app : アプリケーション開発中にメインで使用するディレクトリ
- /controllers..Controller クラスを格納する
- /models :　Modelクラスを格納する
/views :View クラスを格納する

---
# 4日目

# モデルを作成
## modelとは
- データベースを操作する。
- app/models下に配置される
- データベースに含まれるテーブル毎に用意され、データの登録・取得・更新・削除などを行う

## model作成コマンド
```sh:terminal
# rails generate model モデル名 カラム名:データ型 カラム名:データ型 ...
rails generate model User name:string email:string sex:integer age:integer address:integer attendance:integer opinion:text
# string型は文字型、integer型は整数型
```

# DBの操作
## テーブルの作成をする。
```sh:terminal
rails db:migrate
```

## 出来たテーブルをMySQL側で確認してみる。

```sql:mysql
mysql>USE scanashi0307_development;
Reading table information for completion of table and column names
You can turn off this feature to get a quicker startup with -A

Database changed
mysql> SHOW TABLES;
+------------------------------------+
| Tables_in_scanashi0307_development |
+------------------------------------+
| ar_internal_metadata               |
| schema_migrations                  |
| users                              |
+------------------------------------+
3 rows in set (0.00 sec)

# usersテーブルが作成されたことが分かる。
```

```sql:mysql
mysql> SHOW CREATE TABLE users;
(ハイフン省略)
| users | CREATE TABLE `users` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `sex` int(11) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `address` int(11) DEFAULT NULL,
  `attendance` int(11) DEFAULT NULL,
  `opinion` text,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 |
(以下省略)
```

`rails g models`で設定したカラム名が作成されているのが分かる。

## データベースにfooさんのレコードを追加してみる
```sql:MySQL
mysql> INSERT INTO `users` (`name`, `email`, `sex`, `age`, `address`, `attendance`, `opinion`, `created_at`, `updated_at`) VALUES ('foo', 'foo@gmail.com', 1, 23, 2, 0, 'foooo', '2017-04-04 04:44:44', '2018-04-04 04:44:44');
Query OK, 1 row affected (0.00 sec)
```

## MySQLの中から、追加されているレコードを確認してみる。
```sql:mysql
mysql> SELECT * FROM users;
+----+------+---------------+------+------+---------+------------+---------+---------------------+---------------------+
| id | name | email         | sex  | age  | address | attendance | opinion | created_at          | updated_at          |
+----+------+---------------+------+------+---------+------------+---------+---------------------+---------------------+
|  1 | foo  | foo@gmail.com |    1 |   23 |       2 |          0 | foooo   | 2017-04-04 04:44:44 | 2018-04-04 04:44:44 |
+----+------+---------------+------+------+---------+------------+---------+---------------------+---------------------+
```

## rails consoleからレコードを確認
```rb:
# MySQLの外、Rails Console上でレコード確認
# すべてのレコードを取得
User.all
# 表示結果
irb(main):001:0> User.all
   (0.2ms)  SET NAMES utf8,  @@SESSION.sql_mode = CONCAT(CONCAT(@@sql_mode, ',STRICT_ALL_TABLES'), ',NO_AUTO_VALUE_ON_ZERO'),  @@SESSION.sql_auto_is_null = 0, @@SESSION.wait_timeout = 2147483
  User Load (0.3ms)  SELECT  `users`.* FROM `users` LIMIT 11
=> #<ActiveRecord::Relation [#<User id: 1, name: "foo", email: "foo@gmail.com", sex: 1, age: 23, address: 2, attendance: 0, opinion: "foooo", created_at: "2017-04-04 04:44:44", updated_at: "2018-04-04 04:44:44">]>
```

## `rails console`側から新たにレコードを追加する。
```rb:
irb(main):002:0> user = User.create(name: "taro", email: "val@gmail.com", sex: 0, address: 1, attendance: 1, opinion: 'nothing special')
   (0.1ms)  BEGIN
user.save  User Create (2.6ms)  INSERT INTO `users` (`name`, `email`, `sex`, `address`, `attendance`, `opinion`, `created_at`, `updated_at`) VALUES ('taro', 'val@gmail.com', 0, 1, 1, 'nothing special', '2019-03-07 13:18:53', '2019-03-07 13:18:53')
   (3.8ms)  COMMIT
=> #<User id: 2, name: "taro", email: "val@gmail.com", sex: 0, age: nil, address: 1, attendance: 1, opinion: "nothing special", created_at: "2019-03-07 13:18:53", updated_at: "2019-03-07 13:18:53">
irb(main):003:0> user.save
   (0.5ms)  BEGIN
   (0.2ms)  COMMIT
=> true
#user.saveでDBに保存する
```

## Rails Console上でレコード取得コマンド
```rb
# レコードの全てのユーザ情報を取得
User.all
# レコードの全てののユーザ情報のうち、最後に追加したものを取得
User.all.last
# 最初に追加したユーザを取得して、データを削除
first_user = User.all.first
first_user.destroy
# ユーザ情報を変更
user = User.all.first       #最初に追加したユーザ情報を取得
user.name = "ichitaro"　    #取得した最初のユーザ情報のうち、nameを"ichitaro"にオーバーライド
user.save　　　　　　　　　　 #ユーザ情報を保存
# 追加されているユーザ数をカウント
User.all.count
# カラムの値がXという条件に合致するユーザ情報を取得
# User.find_by(カラム:値)
(.ex) User.find_by(id:2)
```

## controllerのアクションの整備
```rb:app/controllers/users_controller.rb
class UsersController < ApplicationController
  def index
    @users = User.all
   end
end
```

## viewの整備
```rb:erb:app/view/index.html.erb
 <body>
    <h1>Users</h1>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Sex</th>
          <th>Age</th>
          <th>Address</th>
          <th>Attendance</th>
          <th>Opinion</th>
          <th colspan="3"></th>
        </tr>
      </thead>

      <tbody>
        <% @users.each do |user| %>
          <tr>
            <td><%= user.name %></td>
            <td><%= user.email %></td>
            <td><%= user.sex %></td>
            <td><%= user.age %></td>
            <td><%= user.address %></td>
            <td><%= user.attendance %></td>
            <td><%= user.opinion %></td>
          </tr>
        <% end %>
      </tbody>
    </table>
  </body>
```

```rb:app/views/layouts/application.html.erb
<!DOCTYPE html>
<html>
  <head>
    <title>CebuApp</title>
    <%= csrf_meta_tags %>
    <%= csp_meta_tag %>
    <%= stylesheet_link_tag    'application', media: 'all', 'data-turbolinks-track': 'reload' %>
    <%= javascript_include_tag 'application', 'data-turbolinks-track': 'reload' %>
  </head>
  <body>
    <%= yield %>
  </body>
</html>
```

ルーティングを変更

```rb:app/config/routes.erb
resources :users
```

`rails routes`実行

```
 Prefix Verb   URI Pattern Controller#Action

    users GET    /users(.:format)            users#index
          POST   /users(.:format)            users#create
  new_user GET    /users/new(.:format)        users#new
edit_user GET    /users/:id/edit(.:format)   users#edit
      user GET    /users/:id(.:format)        users#show
          PATCH  /users/:id(.:format)        users#update
          PUT    /users/:id(.:format)        users#update
          DELETE /users/:id(.:format)        users#destroy
(以下省略)
```

次に上にある、「users GET    /users(.:format)  users#index 」を実装
UserControllerの中にshowアクションを作成

```rb:app/controllers/users_controller.rb
class UsersController < ApplicationController
    def index
        @users = User.all
    end
# 下が追加したshowアクション
    def show
    end
end
```

```rb:app/views/users/index.html.erb
# user.nameのラインを下の様に変更
<td><%= link_to user.name, user_path(user.id) %></td>
# <% link_to ("A"."/B") %>
# 上はhtml上で <a href="/B">A</a>に変化する。
```

この時点で`rails s`で立ち上げると

![name-ga-link-ni.JPG](https://qiita-image-store.s3.amazonaws.com/0/294402/ac09780d-212e-b0b3-c2e0-393cf99049ab.jpeg)

さらに、fooさんのname部分のリンクにアクセスすると、

![showaction-ga-missing.JPG](https://qiita-image-store.s3.amazonaws.com/0/294402/fdd404d4-d4eb-926a-a3fc-b67729dc02af.jpeg)

まだ、showアクションを定義していなかった。

## showアクション
- users_pathはusers#indexへのリンク
- new_user_pathはusers#newへのリンク
- edit_user_pathはusers#editへのリンク
- user_pathはusers#showへのリンク

```rb:app/views/users/show.html.erb
<p id="notice"><%= notice %></p>
<p>
  <strong>Name:</strong>
  <%= @user.name %>
</p>
<p>
  <strong>Email:</strong>
  <%= @user.email %>
</p>
<p>
  <strong>Sex:</strong>
  <%= @user.sex %>
</p>
<p>
  <strong>Age:</strong>
  <%= @user.age %>
</p>
<p>
  <strong>Address:</strong>
  <%= @user.address %>
</p>
<p>
  <strong>Attendance:</strong>
  <%= @user.attendance %>
</p>
<p>
  <strong>Opinion:</strong>
  <%= @user.opinion %>
</p>
<%= link_to 'Edit', edit_user_path(@user) %> |
<%= link_to 'Back', users_path %>
```

## showアクションの定義
```rb:app/controllers/users_controller.rb
def show
    @user = User.find params[:id]
  end
```

nameリンクにアクセスできるようになった

![showアクション.JPG](https://qiita-image-store.s3.amazonaws.com/0/294402/d7f4a8b2-527f-fdbb-5940-6ab40a50be63.jpeg)

しかし、まだeditアクションを定義してないので、editリンクにアクセスしても、『UsersController#edit is missing a template』エラーが出るだろう。(そろそろ、エラーのパターンが見えてくる）

## editアクションの定義
```rb:app/controllers/users_controller.rb
def edit
  @user = User.find(params[:id])
end
```

```rb:app/views/users/edit.html.erb
<%= form_with(model: @user, local: true) do |form| %>
  <% if @user.errors.any? %>
    <div id="error_explanation">
      <h2><%= pluralize(@user.errors.count, "error") %> prohibited this @user from being saved:</h2>
      <ul>
        <% @user.errors.full_messages.each do |message| %>
          <li><%= message %></li>
        <% end %>
      </ul>
    </div>
  <% end %>
  <div class="field">
    <%= form.label :name %>
    <%= form.text_field :name %>
  </div>
  <div class="field">
    <%= form.label :email %>
    <%= form.text_field :email %>
  </div>
  <div class="field">
    <%= form.label :sex %>
    <%= form.number_field :sex %>
  </div>
  <div class="field">
    <%= form.label :age %>
    <%= form.number_field :age %>
  </div>
  <div class="field">
    <%= form.label :address %>
    <%= form.number_field :address %>
  </div>
  <div class="field">
    <%= form.label :attendance %>
    <%= form.number_field :attendance %>
  </div>
  <div class="field">
    <%= form.label :opinion %>
    <%= form.text_area :opinion %>
  </div>
  <div class="actions">
    <%= form.submit %>
  </div>
<% end %>
```

ここで、`rails s`すると、

![editacton-make.JPG](https://qiita-image-store.s3.amazonaws.com/0/294402/aaaad782-116e-410f-8928-97069b47f8e8.jpeg)

ようやく、editページが表示された。
だが、しかし、updateアクションをまだ定義していないので、updateを押すと

![no-update-aciton-error.JPG](https://qiita-image-store.s3.amazonaws.com/0/294402/d94c279b-4a89-0d9a-ad35-9075b21af67b.jpeg)

# 追加：2日目を参考にし、表示を触ってみる。
性別の値0or1を男性or女性で表示させる。

```rb:app/models/user.rb
class User < ApplicationRecord
    enum sex: { male: 0 ,female: 1}
end
```

男性、女性で表示されるようになった。だが、editページは、テキスト入力のままだ。

![dansei-josei.JPG](https://qiita-image-store.s3.amazonaws.com/0/294402/c002c8da-4d41-e7e1-9d1f-dc95ef0d8bb1.jpeg)

ラジオボタンに変更

```rb:erb:app/views/users/edit.html.erb
<div class"field">
    <%= form.label :sex %>
    <%= form.radio_button :sex, 'male' %>男性
    <%= form.radio_button :sex, 'female' %>女性
</div>
```

![seibetu-radiobutton.JPG](https://qiita-image-store.s3.amazonaws.com/0/294402/cd6cbebc-2c61-fa66-157b-90f30ae52be3.jpeg)

同様に、年齢、住所、参加不参加もラジオボタンにしておく。

![性別住所参加をラジオ化.JPG](https://qiita-image-store.s3.amazonaws.com/0/294402/1d044efe-e23c-1967-de5c-132f800b42ad.jpeg)

fooさんが『23歳』なのは都合が悪いかったので、0に書き換える。

```rb:console
# レコードの中から、nameがfooであるユーザ情報を取得
user = User.find_by(name:"foo")
# 取得したユーザ情報のうち、ageを0にオーバーライド
user.age = 0
# ユーザ情報をDBに保存する
user.save
# fooさんの年齢が確認されたか、確認してみる。
User.find_by(name: "foo")
# 結果
<User id: 1, name: "foo", email: "foo@gmail.com", sex: "女性", age: 0, address: "日本以外", attendance: "参加", opinion: "foooo", created_at: "2017-04-04 04:44:44", updated_at: "2019-03-08 00:07:47"
# DB上に格納される性別や住所、参加有無も自然言語で保存されるように編集したのか。
```

## 年齢に、10代、20代、30代のラジオボタンを追加しておく
![全部日本語表記.JPG](https://qiita-image-store.s3.amazonaws.com/0/294402/bc21679f-17f7-0fea-fb1f-2741f63e70a5.jpeg)
![エディットも全部ラジオ.JPG](https://qiita-image-store.s3.amazonaws.com/0/294402/22d8a59c-35a9-8997-b1bf-7b2a7c5459f2.jpeg)
ブラウザ上のカラム表記を日本語にするにはどうすればいいのだろう、また次に。
<strong> </strong>でした

---
# 8日目

## users_controller定義
```rb:app/controllers/uupdate.rb
# updateアクション
def update
    @user = User.find params[:id]
    if @user.update(params.require(:user).permit(:name, :email, :sex, :age, :address, :attendance, :opinion))
      respond_to do |format|
        format.html { redirect_to @user, notice: 'User was successfully updated.' }
      end
    else
      respond_to do |format|
        format.html { render :edit }
      end
    end
end

# destroyアクション定義
def destroy
  @user = User.find params[:id]
  @user.destroy
  respond_to do |format|
    format.html { redirect_to users_url, notice: 'User was successfully destroyed.' }
  end
end

# newアクション定義
def new
  @user = User.new
end
```

## indexページからのdestroyへのリンク作成
```rb:app/views/users/index.html.erb
<td><%= link_to 'Destroy', user, method: :delete, data: { confirm: 'Are you sure?' } %></td>
```

## newページ編集
```rb:app/views/users/new.html.erb
<h1>New User</h1>
<%= form_with(model: @user, local: true) do |form| %>
  <% if @user.errors.any? %>
    <div id="error_explanation">
      <h2><%= pluralize(@user.errors.count, "error") %> prohibited this user from being saved:</h2>
      <ul>
      <% @user.errors.full_messages.each do |message| %>
        <li><%= message %></li>
      <% end %>
      </ul>
    </div>
  <% end %>
  <div class="field">
    <%= form.label :name %>
    <%= form.text_field :name %>
  </div>
  <div class="field">
    <%= form.label :email %>
    <%= form.text_field :email %>
  </div>
  <div class="field">
    <%= form.label :sex %>
    <%= form.number_field :sex %>
  </div>
  <div class="field">
    <%= form.label :age %>
    <%= form.number_field :age %>
  </div>
  <div class="field">
    <%= form.label :address %>
    <%= form.number_field :address %>
  </div>
  <div class="field">
    <%= form.label :attendance %>
    <%= form.number_field :attendance %>
  </div>
  <div class="field">
    <%= form.label :opinion %>
    <%= form.text_area :opinion %>
  <div>
  <div class="actions">
    <%= form.submit %>
  </div>
<% end %>
<%= link_to 'Back', users_path %>
```

## indexからnewへのリンク作成
```rb:app/views/users/index.html.erb
<%= link_to 'New User', new_user_path %>
```

## createアクション定義
```rb:app/controllers/users_controller.rb
def create
    @user = User.new(params.require(:user).permit(:name, :email, :sex, :age, :address, :attendance, :opinion))
    if @user.save
      respond_to do |format|
        format.html { redirect_to @user, notice: 'User was successfully updated.' }
      end
    else
    respond_to do |format|
      format.html { render :edit }
    end
  end
end
```

# リファクタリング
>[from wikipedia]
>>リファクタリング (refactoring) とは、コンピュータプログラミングにおいて、プログラムの外部から見た動作を変えずにソースコードの内部構造を整理することである。

## createアクションとupdateアクションの共通化
2アクションに下の共通箇所がある

```rb:app/controllers/users_controller.rb
@user = User.new(params.require(:user).permit(:name, :email, :sex, :age, :address, :attendance, :opinion))
```
リファクタリング後

```rb:app/controllers/users_controller.rb
def create
  @user = User.new(user_params)
  if @user.save
    respond_to do |format|
      format.html { redirect_to @user, notice: 'User was successfully updated.' }
    end
  else
    respond_to do |format|
      format.html { render :edit }
    end
  end
end

def update
  @user = User.find params[:id]
  if @user.update(user_params)
    respond_to do |format|
      format.html { redirect_to @user, notice: 'User was successfully updated.' }
    end
  else
    respond_to do |format|
      format.html { render :edit }
    end
  end
end

private

def user_params
    params.require(:user).permit(:name, :email, :sex, :age, :address, :attendance, :opinion)
  end
end
```

## show. edit. updata, destroyの共通化
```rb:app/controllers/users_controller.rb
# 共通している部分
@user = User.find params[:id]

# 共通化した結果
# set_user追加
def set_user
  @user = User.find params[:id]
end

# before_action追加
# show, edit, update, destroyアクションの前に、必ず実行の意
class UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :update, :destroy]
```

## アクションのリファクタリング後（全体）
```rb:app/controllers/users_controller.rb
class UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :update, :destroy]

def index
    @users = User.all
end
def show; end
def edit; end
def update
  if @user.update(user_params)
    respond_to do |format|
    format.html { redirect_to @user, notice: 'User was successfully updated.' }
  end
  else
    respond_to do |format|
      format.html { render :edit }
    end
  end
end
def destroy
  @user.destroy
  respond_to do |format|
    format.html { redirect_to users_url, notice: 'User was successfully destroyed.' }
  end
end
def new
  @user = User.new
end
def create
  @user = User.new(user_params)
  if @user.save
    respond_to do |format|
      format.html { redirect_to @user, notice: 'User was successfully updated.' }
    end
  else
    respond_to do |format|
      format.html { render :edit }
    end
  end
end

private
  def set_user
    @user = User.find params[:id]
  end
  def user_params
    params.require(:user).permit(:name, :email, :sex, :age, :address, :attendance, :opinion)
  end
end
```

# 完
全部出来るようになったが、アクション定義方法やら覚えないと。。

![scanashilast.JPG](https://qiita-image-store.s3.amazonaws.com/0/294402/ab456ea8-52b6-fd9b-0a9e-4ce3d25cfc38.jpeg)