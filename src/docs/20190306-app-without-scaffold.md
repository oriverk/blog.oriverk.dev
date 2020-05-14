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
- 仮想環境OS: Ubuntu 18.04
- Ruby：2.51
  - Rails:5.2.2

## rails db:migrate
>Railsドキュメントより(http://railsdoc.com/references/rake%20db:migrate)
>>rails db:migrateを実行
>>schema_migrationsテーブルを調べ、存在しなければ作成
>>db/migrateディレクトリ内のすべてのマイグレーションファイルを調べる
>>データベースの現在のバージョンと異なるバージョンがあった場合、データベースに適応
>>schema_migrationsテーブルの更新

---
# 3日目
`scaffold`を利用せずにApp作成をし、Scaffoldの有難みを知る

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

### routingの設定：ブラウザとコントローラをつなぐ
```rb:config/routes.rb
Rails.application.routes.draw do
  get 'users', action: :index, controller: 'users'
end
```

```sh:
# rails routes

Prefix Verb URI Pattern
Controller#Action
users GET  /users(.:format) 　 #追加された行
users#index   　　　　　　　　　#追加された行
```

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

## `rails console`側から新たにレコードを追加する。
```rb:
user = User.create(name: "taro", email: "val@gmail.com", sex: 0, address: 1, attendance: 1, opinion: 'nothing special')

#user.saveでDBに保存する
user.save
# => true
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
    # 割愛
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

<picture>
  <source srcSet="/assets/posts/201903/scaffold1.webp" type="image/webp">
  <img src="/assets/posts/201903/scaffold1.jpg" alt="scaffold first">
</picture>

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
# 割愛

<%= link_to 'Edit', edit_user_path(@user) %> |
<%= link_to 'Back', users_path %>
```

## show, edit アクションの定義
```rb:app/controllers/users_controller.rb
def show
  @user = User.find params[:id]
end

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
  # 割愛
<% end %>
```

# 追加：2日目を参考にし、表示を触ってみる。
性別の値0or1を男性or女性で表示させる。

```rb:app/models/user.rb
class User < ApplicationRecord
    enum sex: { male: 0 ,female: 1}
end
```

男性、女性で表示されるようになった。だが、editページは、テキスト入力のままだ。

<picture>
  <source srcSet="/assets/posts/201903/scaffold2.webp" type="image/webp">
  <img src="/assets/posts/201903/scaffold2.jpg" alt="male / female enum">
</picture>

ラジオボタンに変更

```rb:erb:app/views/users/edit.html.erb
<div class"field">
    <%= form.label :sex %>
    <%= form.radio_button :sex, 'male' %>男性
    <%= form.radio_button :sex, 'female' %>女性
</div>
```

同様に、年齢、住所、参加不参加もラジオボタンにしておく。

<picture>
  <source srcSet="/assets/posts/201903/scaffold3.webp" type="image/webp">
  <img src="/assets/posts/201903/scaffold3.jpg" alt="change to radio button">
</picture>


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

<picture>
  <source srcSet="/assets/posts/201903/scaffold5.webp" type="image/webp">
  <img src="/assets/posts/201903/scaffold5.jpg" alt="changed to radiobutton">
</picture>


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
  # 割愛
  
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

<picture>
  <source srcSet="/assets/posts/201903/scaffold6.webp" type="image/webp">
  <img src="/assets/posts/201903/scaffold6.jpg" alt="change result">
</picture>