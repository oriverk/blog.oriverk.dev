---
create: '2020-02-03'
update: '2020-07-30'
author: Kawano Yudai
title: 'Ubuntu: Rust の環境構築'
tags: [ubuntu, rust]
---

from [Gist: oriverk/InstallLanguage2Ubuntu.md](https://gist.github.com/oriverk/5d0352c7ca673883d9326e5ce0fb2ae1)

## Setup

```sh
sudo apt install build-essential
# install rust
curl https://sh.rustup.rs -sSf | sh
# add the pass
source $HOME/.cargo/env
```

## Reference
- [rust-lang.org (en)](https://www.rust-lang.org/)
- [Rustの日本語ドキュメント/Japanese Docs for Rust](https://doc.rust-jp.rs)
- [easy rust document (en)](https://github.com/Dhghomon/easy_rust)

## Others
- [An inside look at the Rust programming language](https://about.gitlab.com/blog/2020/07/21/rust-programming-language/)
- [Qiita: なぜRustを学ぶべきなのか 〜 5年経った今改めてまとめてみる](https://qiita.com/garkimasera/items/edce62f3fd6b2fe98d82?utm_content=buffer6a2e7&utm_medium=social&utm_source=twitter.com&utm_campaign=buffer)
- [Why Discord is switching from Go to Rust](https://blog.discord.com/why-discord-is-switching-from-go-to-rust-a190bbca2b1f)
- [実装言語を「Go」から「Rust」に変更、ゲーマー向けチャットアプリ「Discord」の課題とは](https://www.atmarkit.co.jp/ait/articles/2002/10/news038.html)
