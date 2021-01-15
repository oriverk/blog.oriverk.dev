---
create: '2019-03-28'
update: '2019-12-04'
author: Kawano Yudai
title: 'Day 15： How to publish apps on Heroku'
tags: [ruby, rails, heroku]
---

from [Qiita: アプリをネットに公開したく、Herokuを使ってみた。](https://qiita.com/OriverK/items/03c39ffbccb13c653d92)

## What is PaaS
> [PaaS - 富士通](http://jp.fujitsu.com/solutions/cloud/glossary/public-paas.html)
>> アプリケーションを開発・実行するために必要なハードウェア、OSなどの環境をネットワーク経由で利用する形態 。開発・実行環境が提供されるため、企業ごとに独自のサービスを構築できる。
 
## Environment
- 仮想環境: Ubuntu 18.04
- Ruby：2.51
- Rails: 5.2.2
    - `devise`: for authentication
    - `kaminari`: for pagination
- DB: PostgreSQL

## Content
### Heroku setup
[Getting Started on Heroku with Ruby](https://devcenter.heroku.com/articles/getting-started-with-ruby?singlepage=true)

```sh

#  After signup heroku, then install heroku
sudo snap install heroku --clasic

# login heroku
heroku login --interactive
# =>
# heroku: Press any key to open up the browser to login or q to exit
#  ›   Warning: If browser does not open, visit
#  ›   https://cli-auth.heroku.com/auth/browser/***
# heroku: Waiting for login...
# Logging in... done
# Logged in as me@example.com
```

### deploy app to heroku
アプリのソースコードを受け取るHerokuを準備する

```sh
heroku create
# 出力例
# Creating polar-inlet-4930... done, stack is cedar-14
# http://polar-inlet-4930.herokuapp.com/ | https://git.heroku.com/polar-inlet-4930.git
Git remote heroku added

git add .
git commit -m "init"
git push heroku master

heroku run rails db:migrate
```

### other heroku command
```sh
# Heroku上にデータを追加する
heroku run rails console
# 操作ログを見る
heroku logs --tail
# Heroku上のファイルの詳細を見る
heroku "ls -l"
# Heroku上のアプリのURLとその他を確認
heroku info
```