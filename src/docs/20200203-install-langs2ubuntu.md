---
create: '2020-02-03'
update: '2020-03-17'
author: Kawano Yudai
title: 'Gist: installl langs to ubuntu'
tags: [Gist, Ubuntu, Ruby, Rails, Node.js, Rust, Java]
---

from [Gist: oriverk/InstallLanguage2Ubuntu.md](https://gist.github.com/oriverk/5d0352c7ca673883d9326e5ce0fb2ae1)

## Ruby on Rails
- Refference
  - [WSL+Ubuntuで、ruby on rails6.00の環境を整える](https://qiita.com/BlindSoup/items/8ed98b5ba15d1d6c6a7c)
  - [How to Install Ruby 2.6 & Rails 6 on Ubuntu 19.04](https://www.techiediaries.com/install-ruby-and-ruby-on-rails-ubuntu/)

### Install latest version
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
rbenv install 2.〇.〇
rbenv global 2.〇.〇

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

### Install RubyonRails by "apt install"
```sh
sudo apt install -y ruby ruby-dev build-essential
sudo apt install yarn

sudo gem install rails
```

- "-y" means "All Yes"
- build-essential contain information about package to build Debian pack.
  - If do not build Debian, build~ is not needed
  - [Reference](https://packages.debian.org/ja/sid/build-essential)

## Golang
- use goenv to install Go
  - goenv is package management tool which based on rbenv

```sh
git clone https://github.com/syndbg/goenv.git ~/.goenv
# make path
echo 'export GOENV_ROOT="$HOME/.goenv"' >> ~/.bashrc
echo 'export PATH="$GOENV_ROOT/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(goenv init -)"' >> ~/.bashrc
# reload shell
exec $SHELL
# confirm goenv version
goenv --version
# check available Golang ver.
goenv install --list
# install Golang
goenv install 〇.〇.〇
# confirm available Golang ver.
goenv versions
# make the Golang ver. available to use as global
goenv global 〇.〇.〇
goenv rehash
# confirm Golang ver. that is available to use
go version
```
## Nodejs
rails6 uses webpacker, which needs nodejs

```sh
sudo apt install -y nodejs npm
# install n-package
sudo npm install n -g
# confirm stable nodejs ver
n --stable
# confirm latest nodejs ver
n --latest
# by n-package, install node
sudo n stable( or latest )
# uninstal old nodejs and npm, and re-login
sudo apt purge -y nodejs npm
exec $SHELL -l

# confirm
node -v
```

## Rust

```sh
sudo apt install build-essential
# install rust
curl https://sh.rustup.rs -sSf | sh
# add the pass
source $HOME/.cargo/env
```

## Java
```sh
sudo apt update
sudo apt install openjdk-11-jdk
# confirmation
java --version
```