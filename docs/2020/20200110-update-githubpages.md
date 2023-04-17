---
create: '2020-01-10'
title: Post ページを中心に改修した
tags: [githubpages, jekyll]
published: true
---

## 改修

### 内容

- デザインの変更
  - dark theme
  - mobile first
    - Bootstrap の排除
- Posts.index ページの追加
- Post.show ページの追加
  - Syntax-highlighter Rouge の導入

### デザイン変更

[ページ表示速度](https://developers.google.com/speed/pagespeed/insights/?hl=JA&url=https%3A%2F%2Foriverk.github.io%2F&tab=mobile)を向上させるため、メニュータブにしか使っていない Bootstrap 由来の JS と CSS を排除し、自作の js スクリプトを追加した。

```js
<script>
  'use strict';
  {
    const menuItems = document.querySelectorAll('.menu li a');
    const contents = document.querySelectorAll('.content');

    menuItems.forEach(clickedItem => {
      clickedItem.addEventListener('click', e => {
        e.preventDefault();

        menuItems.forEach(item => {
          item.classList.remove('active');
        });
        clickedItem.classList.add('active');

        contents.forEach(content => {
          content.classList.remove('active');
        });
        document.getElementById(clickedItem.dataset.id).classList.add('active');
      });
    });
  }
</script>
```

### Syntax-highlighter Rougeの導入

Posts.index と Post.show ページは jekyll 通りなので割愛。
コードのハイライトを有効化するため、Rouge を導入した。

```rb
gem 'rouge'
```

```yml:_config.yml
# this is defualt setting to use hightlight and endhighlight
markdown: kramdown
highlighter: rouge

# modify setting to use code block like Qiita
markdown: kramdown
kramdown:
   input: GFM
   hard_wrap: false
highlighter: rouge
```

あとは`rougify style [<theme-name>]`でシンタックスハイライト用の css、今回は molokai を生成し、一部修正、適用させた。

### 改修予定

- AMP の導入。興味があるだけ
