---
date: '2019-08-18'
update: '2019-12-1'
title: 'Qiita: GithubPagesでjekyllを使ってみよう。'
tags: Git github-pages Jekyll Ruby
author: OriverK
slide: false
---

Qiita: [GithubPagesでjekyllを使ってみよう](https://qiita.com/OriverK/items/ce48102c66c9fa97b33e)より

GithubPagesJekyllを利用し、静的ページを作成した。

# major update history

- 20190825：GithubPages with jekyll 作成
    - 目的：自分の情報等を纏めるサイト作成の為
    - remote theme：[fongandrew / hydeout](https://github.com/fongandrew/hydeout)

![キャプチャ.JPG](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/294402/942c1434-8629-33d2-0bfb-25583fb44678.jpeg)

- 20191206：デザイン等変更
  - 目的：アクセシビリティ改善、デバイスによる見た目差を小さく

作り替えた結果

<blockquote class="twitter-tweet"><p lang="und" dir="ltr"><a href="https://t.co/8OewG37cGD">https://t.co/8OewG37cGD</a></p>&mdash; Yudai Oriver K@転職活動してる無職 (@not_you_die) <a href="https://twitter.com/not_you_die/status/1204474648223576064?ref_src=twsrc%5Etfw">December 10, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

[ーデザインを大幅修正した件](https://qiita.com/OriverK/items/ce48102c66c9fa97b33e#%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%82%92%E5%A4%A7%E5%B9%85%E4%BF%AE%E6%AD%A3%E3%81%97%E3%81%9F%E4%BB%B6)

# 環境
- ホストOS: Windows10 Home with Windows Insider Program
- 仮想環境ゲストOS: Linux Ubuntu Bento/Bionic
    - Ruby ruby 2.5.1p57

# 参照
- [GithubPages：https://pages.github.com/](https://pages.github.com/)
- [Jekyll：https://jekyllrb.com/](https://jekyllrb.com/)
- [Jekyll Themes :hydeout](http://jekyllthemes.org/themes/hydeout/)
- [幣GithubPagesリポジトリ：https://github.com/oriverk/oriverk.github.io](https://github.com/oriverk/oriverk.github.io)

# デフォルトのGithubPages作成
## jekyllの準備、作成

```terminal:
gem install bundler jekyll
jekyll new oriverk.github.io
```

## gitリモートレポジトリ作成、git push
**リポジトリ名を `username.github.io`にすること**

>Github Pages HPより引用
>>If the first part of the repository doesn’t exactly match your username, it won’t work, so make sure to get it right.

##デフォルト状態完成
上記に従ったデフォルト状態では、[テーマminimaが適用され、こんなページになる。](https://jekyll.github.io/minima/)

# jekyllテーマを変更
- 参照
  - [jekyll-theme-hydeout 4.0.2](https://rubygems.org/gems/jekyll-theme-hydeout)

## テーマをhydeoutに変更してみる
このテーマはgem版があるので、それを利用することにした。他のテーマは知らない。
上記の`jekyll new username.github.ip`で作成したディレクトリに手を加えていく。

まず、Gemfileを編集。
デフォルトでは`gem "github-pages"がコメントアウトされてるので、アンコメント。
また、今回使用するテーマhydeoutのgemを書き加える。

```rb:Gemfile
# uncomment
gem "github-pages", group: :jekyll_plugins
# add gem
gem "jekyll-theme-hydeout"
```
次に、_config.ymlを編集。
今回はリモートテーマを使用するので、`theme`を`remote_theme`に変更する。
更に、プラグインも追加しておく。

```_config.yml
# theme: mininma
remote_theme: fongandrew/hydeout

plugins:
  - jekyll-feed # 元から入っている
  - jekyll-remote-theme　# added
  - github-pages # added
```

```terminal:
bundle install
bundle exec jekyll server
```
これで、テーマがhydeoutに変更されているはず。

# エラー
githubpages公式のgem等由来であれば、[Troubleshooting GitHub Pages builds
](https://help.github.com/en/articles/troubleshooting-github-pages-builds)で、大体は悩み解消されるのではと思う。実は、投稿中に存在に気づきました。

追記：[GitHub Pages ビルドのトラブルシューティング](https://help.github.com/ja/articles/troubleshooting-github-pages-builds)

## Layoutが見つからないエラー
記事投稿中にターミナルログを消してしまって、エラー文を覚えていないが、
該当の.mdファイル中の`Layout`を、`Layout:page`に変えたら、エラーが解消された。

## Invalid theme folder: _sass
- 参照
  - [`Invalid theme folder: _sass` when using Github Pages with remote_theme #7630](https://github.com/jekyll/jekyll/issues/7630)
  - [Page build failed: Invalid Sass or SCSS
](https://help.github.com/en/articles/page-build-failed-invalid-sass-or-scss)

参照先での議論を見る限り、問題ない・・・・？

## Liquid Exception: invalid byte sequence in UTF-8
- 参照
  - [Github: "Liquid Exception: invalid byte sequence in UTF-8..." with binaries #5181](https://github.com/jekyll/jekyll/issues/5181)
  - [Jekyll: Error: invalid byte sequence in UTF-8](https://talk.jekyllrb.com/t/error-invalid-byte-sequence-in-utf-8/1384/9)

単なる文字コードのエラーではあるが、最初に後者の方を参考にした。後者で質問している人は、同僚と共同編集している際にスペイン語の特殊文字が混入したという事に気づき、エラー解消したみたいだ。

![キャプチャ.JPG](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/294402/d63ddd00-6953-f525-21e2-9fb886280676.jpeg)

nav-linksでのWantedly用svgファイル中のsvgタグid属性が"ãƒ¬ã‚¤ãƒ¤ãƒ¼_1"となっている。。。

[公式からダウンロード](https://wantedlyinc.com/ja/brand_assets)したのにな。。

20191024追記：結局エラー処理できなかったので、泣く泣くエラー発生前までgit resetしました。。

# カスタマイズ
※使用テーマやテーマの追加方法によって、ディレクトリ構造が違うので、他テーマは知らない

ディレクトリに`_include`フォルダを作成。

## headタグ内の情報を書き込む
`_include`フォルダ内に、`head.html`ファイルを作成する

```:head.html
<head>
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta http-equiv="content-type" content="text/html; charset=utf-8" />

  <!-- Enable responsiveness on mobile devices-->
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" />

  <title>
    {% if page.title == "Home" %}
    {{ site.title }}{% if site.tagline %} &middot; {{ site.tagline }}{% endif %}
    {% else %}
    {{ page.title }} &middot; {{ site.title }}
    {% endif %}
  </title>

  <!-- CSS -->
  <link rel="stylesheet" href="{{ "/assets/css/main.css" | relative_url }}" />
</head>
```

## ページネーション機能
jekyll関連gemにページネーションがあり、プラグインなので`_config.yml`に書き加える。

```_config.yml
plugins:
  - jekyll-paginate

paginate: 5
paginate_path: '/blog/page:num'
sidebar_blog_link: '/blog'
```
```:terminal
bundle install
bundle exec jekyll server
```
## Googleアナリティクス
- 参照
  - [Google Analytics for Jekyll](https://desiredpersona.com/google-analytics-jekyll/)


1． まず、GoogleアナリティクスをトラッキングIDを取得する。(割愛
2． `google-analytics.html`を作成

```google-analytics.html
{% if jekyll.environment == 'production' and site.google_analytics %}
<script>
  (function (i, s, o, g, r, a, m) {
  i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
    (i[r].q = i[r].q || []).push(arguments)
  }, i[r].l = 1 * new Date(); a = s.createElement(o),
    m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
  })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
  ga('create', '{{ site.google_analytics }}', 'auto');
  ga('send', 'pageview');
</script>
{% endif %}
```
3． `_include/head.html`に書き加える。

```_include/head.html

<head>
    {% include google-analytics.html %}
</head>
```
4． `_config.yml`にトラッキングIDを書き加える
トラッキングIDは、UA-　から始まるID。

```_config.yml
# Google Analytics
google_analytics: UA-〇〇〇〇〇
```
githubに上げて完了。

## Twitterカード追加
- 参照
  - [サルワカ：【2019年版】Twitterカードとは？使い方と設定方法まとめ](https://saruwakakun.com/html-css/reference/twitter-card)
  - [Supporting Twitter Cards with Jekyll](http://davidensinger.com/2013/04/supporting-twitter-cards-with-jekyll/)
  - [Twitter Cards on Jekyll](https://www.brianbunke.com/blog/2017/09/06/twitter-cards-on-jekyll/)

1. `_include/twitter-card.html`を作成

```_include/twitter-card.html
<!-- Twitter cards -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@not_you_die"/>
<!-- <meta name="twitter:creator" content="@{{ page.author }}"/> -->
<meta name="twitter:title" content="{{ page.title }}"/>

{% if page.summary %}
<meta name="twitter:description" content="{{ page.summary }}"/>
{% else %}
<meta name="twitter:description" content="{{ site.description }}"/>
{% endif %}

{% if page.image %}
<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:image" content="{{ site.url }}{{ page.image }}"/>
{% else %}
<meta name="twitter:card" content="summary"/>
<meta name="twitter:image" content="{{ site.title_image }}"/>
{% endif %}
<!-- end of Twitter cards -->
```
2．`_include/head.html`内に書き加える

```_include/head.html
<head>
<!-- Twitter card-->
    {% include twitter-card.html %}
</haed>
```

3．gitにpushし、[Twitter Card Validator](https://cards-dev.twitter.com/validator) で確認

## sidebar-nav-link
![キャプチャ.JPG](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/294402/1e635242-b348-25b4-d29d-063294b06bf6.jpeg)
こんな感じで、サイドバーにnavlink付け足したい。

## svgファイルの最適化
順序的には下の文字コードエラーの後なのだが、まあ。
SVGファイルの最適化を、vscodeの拡張機能[svgo](https://marketplace.visualstudio.com/items?itemName=1000ch.svgo)を利用して行った。

使い方は、書いてある通り。
長々と数行に渡って記述されていたsvgファイルから余計なタグが取り払われ、1行コードになってた。

```wantedly.svg
# ※wantedly公式ダウンロードサイトからDLしたものを最適化した。DLリンクはエラー↓の文字コードの所。

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 900"><path fill="#fff" d="M100 208.6h100l150 362.1L400 450 300 208.6h100l50 120.7 50-120.7h100L500 450l50 120.7 150-362.1h100L600 691.4H500l-50-120.7-50 120.7H300z"/></svg>
```

# デザインを大幅修正した件
前のは自分好みのデザインではあったが、PCファーストで訪問者的にはよろしくなかった。

- 改修方針
  - モバイルファースト
  - ページ数を少なく。
  - サイズ指定にpxを極力使わず、remや％を使う

## 実作業
GithubPages公開にはマスターブランチしか使えない。ので、ブランチを作成して、そこで作業する。

```terminal:
git branch changeDesign
git checkout changeDesign
```
### `Gemfile`と`_config.yml`から不要なものを削除
今回は外部テーマを使わないので、外部テーマのgem類は要らない。削除した結果↓

```rb:Gemfile
source 'https://rubygems.org'

gem 'github-pages', group: :jekyll_plugins

group :jekyll_plugins do
  gem 'jekyll-admin'
  gem 'jekyll-feed', '~> 0.6'
end

install_if -> { RUBY_PLATFORM =~ /mingw|mswin|java/ } do
  gem 'tzinfo', '~> 1.2'
  gem 'tzinfo-data'
end

gem 'wdm', '~> 0.1.0', install_if: Gem.win_platform?
gem 'jekyll-coffeescript'
```
`_config.yml`は割愛。今回はpaginationも削除した。

### 最低限必要なディレクトリ構造を考える
自分でデザインを構成するには、jekyllとliquidで出来る事を理解する必要があった。

- `_include`配下のファイルは`{% include footer.html %}`の形で変数展開の様に扱う。
    - 但し、画像はこの方法では利用できない。svgはok。
- _site中身は`bundle exec jekyll serve`で自動で生成されるので中身は触らない

自分の結果

```
# 一部割愛
.
├── _config.yml
├── _includes
|   ├── svgファイル類
|   └── `head`内パーツ類（head.html, twitter-card, google-analytics, bootstrap ...
|   └── `body`内のhtmlパーツ類
├── _layouts
|   └── default.html
├── _posts
|   ├── 2007-10-29-why-every-programmer-should-play-nethack.md
|   └── 2009-04-26-barcamp-boston-4-roundup.md
├── assets
|   └── jpg / png 画像類
└── index.html # can also be an 'index.md' with valid front matter
```

### スクロール関連の変更
サイトコンテンツが画面高を超えると、右端にスクロールバーが現れ、背景画像サイズが変わるのがいやっだ。あと、スクロールしても背景画像は動かないようにした。なお、背景画像はbodyにcssで指定。

```scss:_layout.scss
body{
  background-image:url("../taiwan.jpg");
  background-size:cover;
  background-position: right;
  background-attachment:fixed;

  -ms-overflow-style: none; // IE用
  overflow: -moz-scrollbars-none; // Firefox用
  &::-webkit-scrollbar { // Chrome用
    display: none;
  }
}
```
