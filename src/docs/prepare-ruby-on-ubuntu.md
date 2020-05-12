---
date: '2019-03-11'
update: '2019-12-04'
title: 'Qiita: Ubuntu18.04仮想環境でのRubyonRails導入しrails new近辺まで'
tags: Qiita Ubuntu vm Ruby Rails
author: OriverK
slide: false
---

from Qiita
- [Ubuntu18.04仮想環境でRubyonRailsを導入し、rails new近辺までする、のまとめ](https://qiita.com/OriverK/items/c69b715fc455e8f4b5fd)

# 使用環境
ホストOS: Windows10 Home
仮想環境OS: Ubuntu Bento/Bionic
Ruby：バージョン指定しない
Rails:バージョン指定しない
データベース：MySQL：バージョン指定しない

# はじめに
aptコマンドを使用します。
aptコマとapt-getコマの違いについては、[こちらの記事が私的には読みやすかったです](https://itsfoss.com/apt-vs-apt-get-difference/)

# 流れ
1. 仮想環境にPCからログイン
2. リポジトリ一覧を更新
3. RubyとRuby開発用のツールをインストール
4. ソフトウェアのインストに使う基本的なツールをインストール
5. Railsをインストール
6. MySQL関連インストールし、設定
7. Rails new

# 実際の流れ
## 仮想環境、ログイン
```sh:terminal
vagrant up
vagrant ssh
```

## リポジトリ一覧更新
```sh:terminal
sudo apt update
```

## RubyとRuby開発用ツール、ソフトウェアインストに必要な基本ツールを、ダウンロード
```sh:terminal
sudo apt install -y ruby ruby-dev build-essential
```

-『-y』オプションは、すべて『Yes』
- build-essential　[参照リンク](https://packages.debian.org/ja/sid/build-essential)
    - Debianパッケージの構築に必要とされるパッケージの一覧情報が含まれる
    - Debianパッケージを構築しないなら不要
   
## Railsインストール
```sh:terminal
sudo gem install rails
```

## MySQLとそのクライアントツールをインスト
```sh:terminal
sudo apt -y install mysql-server libmysqlclient-dev
```

## MySQLのパスワードを設定
```sh:terminal
sudo mysql_secure_installation
```

**このコマンドを実行し忘れると、パスワード設定要求されずに、MySQL設定が終了するため注意**
## MySQLにログイし、パスワード更新、権限変更
```sql::mysql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'TegetegePassword';
flush privileges;
```

# rails newから、設定
## webアプリ雛形作成
```sh:terminal
# RubyonRailsのデフォルトDBがSqLiteなため、オプション『-d』で使用DBを指定
rails new hoge_app -d mysql
```

## Gemfileで、使用するJSをコメントイン（JSを使わないなら、しなくてよし）
```rb:/hoge_app/Gemfile.rb
gem 'mini_racer', platforms: :ruby
```

## 編集したGemfileに沿って、インスト
```sh:
bundle install
```

## DBのパスワード変更
```yml:/hoge_app/config/database.yml
default: &default
  adapter: mysql2
  encoding: utf8
  pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>
  username: root
  password: TegetegePassword  #最初はここが空欄になっている
  socket: /var/run/mysqld/mysqld.sock
```

## Railsプロジェクトのdatabase.ymlを読み込み，これに基づいてDB作成
```sh:
# rake db:createなど、『rake』はすべて『rails』で実行。
rails db:create
```

## サーバー立ち上げ
```sh:termianl
rails server
```

## Vagrantファイルで指定した、ipアドレスに接続。
デフォルトでは、『192.168.33.10:3000』にアクセス。
毎回打つのは面倒なので、私はブックマーク。