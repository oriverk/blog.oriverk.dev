---
create: '2020-02-03'
update: '2020-07-30'
author: Kawano Yudai
title: 'Build Ruby environment on Ubuntu'
tags: [ubuntu, ruby, rails]
---

from [Gist: oriverk/InstallLanguage2Ubuntu.md](https://gist.github.com/oriverk/5d0352c7ca673883d9326e5ce0fb2ae1)

## Setup
### Install latest ver.
```sh
# install in one time
sudo apt install autoconf bison build-essential libssl-dev libreadline-dev zlib1g-dev libncurses5-dev libffi-dev libgdbm-dev

# install rbenv
# rbenv is tool to manage a few of ruby versions and enable to change ruby ver. project by project.
git clone https://github.com/rbenv/rbenv.git ~/.rbenv
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(rbenv init -)"' >> ~/.bashrc
source ~/.bashrc
git clone https://github.com/rbenv/ruby-build.git "$(rbenv root)"/plugins/ruby-build

# Install ruby
rbenv install --list
rbenv install 2.x.x
rbenv global 2.x.x

# Instal yarn
# Rails6 needs webpacker, and Webpacker needs yarn to install
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt update
sudo apt install yarn

# Install Rails
gem install rails --no-document

# install webpacker
# inner App
rails webpacker:install
```

### Install by "apt install"
```sh
sudo apt install -y ruby ruby-dev build-essential
sudo apt install yarn

sudo gem install rails
```

- "-y" means "All Yes"
- build-essential contain information about package to build Debian pack.
  - If do not build Debian, build~ is not needed
  - [Reference](https://packages.debian.org/ja/sid/build-essential)

## Reference
- [Ruby - official site](https://www.ruby-lang.org/ja/)
- [Ruby 2.7.0 リファレンスマニュアル (ja)](https://docs.ruby-lang.org/ja/2.7.0/doc/index.html)
- [Ruby on Rails ガイド](https://railsguides.jp/)

## Setup Reference
- [WSL+Ubuntuで、ruby on rails6.00の環境を整える](https://qiita.com/BlindSoup/items/8ed98b5ba15d1d6c6a7c)
- [How to Install Ruby 2.6 & Rails 6 on Ubuntu 19.04](https://www.techiediaries.com/install-ruby-and-ruby-on-rails-ubuntu/)

## Exam
- [Qiita: Ruby技術者認定試験 Silver](https://qiita.com/joji/private/cf5a25935995395f24fc)
- [Rex Ruby Examination](https://rex.libertyfish.co.jp/)
- [sean2121 / silver_j.md](https://gist.github.com/sean2121/945035ef2341f0c39bf40762cd8531e0)
- [Qiita: Ruby 技術者認定試験 Silver/Gold 対策の個人的なハマり問題集](https://qiita.com/ffggss/items/0bab2a1e80e941378b49)

## Others
- [Rails Application Build Guides (ja)](https://rails.densan-labs.net/index.html#)
- [everyday rails](https://everydayrails.com/)
- [Qiita: Rails deviseの使い方（rails5版）](https://qiita.com/cigalecigales/items/f4274088f20832252374)
- [Qiita: railsで複数ワードでの検索機能(and)とマイナス検索機能(-)を実装してみる](https://qiita.com/Orangina1050/items/c53919864b5313ab9672)