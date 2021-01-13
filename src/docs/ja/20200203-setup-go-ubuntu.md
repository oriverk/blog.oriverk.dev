---
create: '2020-02-03'
update: '2020-07-30'
author: Kawano Yudai
title: 'Ubuntu: Golang の環境構築'
tags: [ubuntu, go]
---

from [Gist: oriverk/InstallLanguage2Ubuntu.md](https://gist.github.com/oriverk/5d0352c7ca673883d9326e5ce0fb2ae1)

## Setup Golang

Use goenv to install Go.
goenv is package management tool which based on rbenv

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
goenv install x.x.x
# confirm available Golang ver.
goenv versions
# make the Golang ver. available to use as global
goenv global x.x.x
goenv rehash
# confirm Golang ver. that is available to use
go version
```

## Reference
- [golang.org](https://golang.org/)

## Others
- [A Tour of Go](https://tour.golang.org/welcome/1)
- [Learn Web Programming in Go by Examples](https://gowebexamples.com/)
- [今改めて読み直したい Go基礎情報 その1 #golangtokyo](https://budougumi0617.github.io/2019/06/20/golangtokyo25-read-again-awesome-go-article/)
- [プログラミング言語Go完全入門 by mercari](https://engineering.mercari.com/blog/entry/goforbeginners/)