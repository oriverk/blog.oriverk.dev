---
title: Thinkpad Ubuntu の中央ボタンによるペーストを無効にする。
create: '2021-02-13'
update:
tags: [ubuntu]
# tags: ubuntu
image:
# lang: ja
---

[TOC]

## 環境
- Thinkpad X280
	- Ubuntu 20.10
	- US keyboard
	- input langs: ja(Mozc), en

## main
### 経緯
マウスを使わず、Thinkpadのトラックポイントのセンターボタンを使ってスクロールしていると、意図せずリンクが開いたり、以前にクリップボードにコピーしたものが意図せずペーストされ、非常に困ったので治すことにした。

### reference
- [xinput](https://www.x.org/archive/X11R7.5/doc/man/man1/xinput.1.html)
- [Ubuntu wiki - input - Example: Disabling middle-mouse button paste on a scrollwheel mouse](https://wiki.ubuntu.com/X/Config/Input#Example:_Disabling_middle-mouse_button_paste_on_a_scrollwheel_mouse)
- [archlinux - Synaptics タッチパッド- xinput を使ってタッチパッドの機能を調べる](https://wiki.archlinux.jp/index.php/Synaptics_%E3%82%BF%E3%83%83%E3%83%81%E3%83%91%E3%83%83%E3%83%89#xinput_を使ってタッチパッドの機能を調べる)

### how to
#### input button map 情報を取得する
```
xinput list
```

![](https://i.imgur.com/Aa0suNG.png)

今回はThinkpadのトラックポイントのセンターボタンを変更したいので、上写真中だと、id=16になる。

ここで、id=16に設定されているボタンマッピングを取得するには

```
# xinput get-button-map [device id]
xinput get-button-map 16
# => 1 2 3 4 5 6 7 
```

出力された「1 2 3 4 5 6 7」は、指定された入力デバイスにおける（デフォルトだと１から始まる）物理的な順序を表していて、論理ボタンにマッピングされている。また、これら数字を0にすると、『無効化』ということになる。

また、これらボタンの機能の内容を確認するには

```
# xinput list [device id]
xinput list 16
```

![](https://i.imgur.com/Jolg4Oi.png)

上画像中の『Button labels』によると、`xinput get-button-map`で得られた数字は左から、『左ボタン、中央ボタン、右ボタン、ホイールアップ、ホイールダウン、左移動、右移動』のようだ。

#### input button map 情報を更新する
「1 2 3 4 5 6 7」のうち、中央ボタンに当たる『2』を『0』にすれば良い。

**後の、永続化のために`/.profile`に書き込んで再起動して気が付きましたが、`set-button-map`にはidではなく、device-nameを使う方が良いみたいです・・・idは可変の模様。。**

```
# xinput set-button-map [device-name] map-button-order
xinput set-button-map "TPPS/2 Elan TrackPoint" 1 0 3 4 5 6 7

# 確認
xinput get-button-map 16
# => 1 0 3 4 5 6 7
```

#### 設定を永続化する
今設定したものはPC再起動するともとに戻ってしまうので、永続化する必要がある。なので`/home/[username]/.profile`の末尾にさっきのxinputコマンドを記入し、ログイン時に`.profile`が読み込まれる際にxinputが実行されるようにする。

```
# /home/[username]/.profile
# xinput set-button-map [device-name] [button map numbers]
xinput set-button-map "TPPS/2 Elan TrackPoint" 1 0 3 4 5 6 7
```

## もし左ボタンと右ボタンを入れ替えるなら
「1 2 3 4 5 6 7」を「3 2 1 4 5 6 7」に変更すれば良いので

```
xinput set-button-map "TPPS/2 Elan TrackPoint" 3 2 1 4 5 6 7
```

でできる。