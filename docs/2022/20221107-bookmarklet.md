---
title: js ブックマークレットのメモ書き
create: "2022-11-07"
tags: [memo, javascript, chrome]
description: "js ブックマークレットのメモ"
published: true
---

## はじめに

この投稿は自分用のメモ書きなので、参考を利用することで説明を出来るだけ省き、保存しておきたいコード等をメモ書きすることに徹する。

## ブックマークレットとは

> ブックマークレット (Bookmarklet) とは、ユーザーがウェブブラウザのブックマークなどから起動し、なんらかの処理を行う簡易的なプログラムのことである。携帯電話のウェブブラウザで足りない機能を補ったり、ウェブアプリケーションの処理を起動する為に使われることが多い。
> > Wikipedia『ブックマークレット』より

## 作成方法

作り方を忘れた時は大体 [Bookmarkletを作ろう(準備編） - Qiita](https://qiita.com/kanaxx/items/63debe502aacd73c3cb8) を見ている。([魚拓](https://megalodon.jp/2022-1107-1612-25/https://qiita.com:443/kanaxx/items/63debe502aacd73c3cb8))

## 本題：普段使っているもの

### markdown 用のリンクを取得

ブログを書くときにいつも使う。

```javascript:pre-minified.js
// copy text to clipboard: e.g. [Google](https://www.google.com/)

javascript: 'use strict'; (
  function () {
    const a = `[${document.title.trim()}](${location.href})`;
    navigator.clipboard.writeText(a)
      .then(
        () => { alert(`Successfully copied ${a}`) },
        () => { alert("Unfortunately failed to copy..") }
      )
  }
)();
```

```javascript:minified.js
javascript: 'use strict'; (function(){const a=`[${document.title.trim()}](${location.href})`;navigator.clipboard.writeText(a).then(()=>{alert(`Successfully copied ${a}`)},()=>{alert("Unfortunately failed to copy..")})})();
```

### はみ出した Element を見つけるやつ

- [TAK on Twitter: "予期せぬ余白や横スクロールが生じた際に全称セレクタ＋outline指定で確認している人が多いけど、デベロッパーツールのConsoleに以下のスクリプトをコピペしたほうが速いと思ってます 枠線の表示だけでなく、実際に横スクロールを起こしている要素も出力可能です サンプル: https://t.co/gkFmFg6ZCk https://t.co/tsRwkQqZ7h" / Twitter](https://twitter.com/tak_dcxi/status/1454019066608304134)
- [CODEPEN | tack-dcxi 横スクロールの原因を調べる](https://codepen.io/tak-dcxi/pen/ZEJJWxE)

こちらのコードをそのまま利用すると`Uncaught ReferenceError: $$ is not defined`となるので、一部弄って

```javascript:pre-minified.js
javascript: (
  function () {
    const a = document.documentElement.clientWidth;
    Array.from(document.getElementsByTagName("*")).forEach(function (b) {
      b.style.outline = "1px solid tomato";
      a < b.clientWidth && console.log(b)
    })
  }
)();
```

```javascript:minified.js
javascript:'use strict';(function(){const b=document.documentElement.clientWidth;Array.from(document.getElementsByTagName("*")).forEach(function(a){a.style.outline="1px solid tomato";b<a.clientWidth&&console.log(a)})})();
```

こうなる。

![image](https://i.imgur.com/bE9Kd2W.png)

## 参照

- [Bookmarkletを作ろう(準備編） - Qiita](https://qiita.com/kanaxx/items/63debe502aacd73c3cb8)
- [Closure Compiler Service](https://closure-compiler.appspot.com/home)
- [Clipboard.writeText() - Web API | MDN](https://developer.mozilla.org/ja/docs/Web/API/Clipboard/writeText)
