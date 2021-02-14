---
title: WindowsとUbuntuのデュアルブートにした時のメモ書き。
create: '2021-02-12'
update:
tags: [ubuntu]    
image:
# lang: ja
# tags: ubuntu
---

## はじめに
### 環境
- Thinkpad x280
	- Windows, intel core i5 8th
	- Storage: m.2 sata 500gb
	- RAM: 16GB
	- US配列キーボード
- Ubuntu用にした外付けSSD
	- m.2 sata 128gb

### デュアルブートにしたきっかけ
元々はWindowsユーザでしたが、RubyやJSなどコードを扱うときはローカルのWindowsの中がごちゃごちゃになることを嫌って、virtualboxによる仮想環境でコードを触っていました。vmにRAM8GB弱を分け与えていたこともあり特に問題もなくサクサクとやっていまいましたが、最近になってChromeがPCが頻繁にフリーズするようになったので、デュアルブートを考えました。

## 本題：Ubuntuの用意
今回は[Ubuntu Japanese Team](https://www.ubuntulinux.jp/)の20.10 日本語 Remix iso image を使用した。

### インストールメディア
インストールメディアの作成には[Rufus](https://rufus.ie/ja_JP.html)を使用し、isoイメージと作成先のUSB等のメディアを選択するだけで、非常に簡単容易だった。

通常だと内蔵SSDにUbuntuを作成する際はパーティションを弄る訳だが今回は空っぽの外付けSSDを使うので特に何もしなかった。

再起動してBios設定画面でOSブートに先に作成したインストールメディアを使うように優先順位を設定して、また再起動して、Ubuntuを起動、『Ubuntuを試す』を選択した。

### Ubuntuのインストール
スワップ領域と言われても余り分からない人間なので、この[いおりのプログラミングめも](http://fanblogs.jp/iorisprogramming/archive/17/0)の記事を参考にした。画像も添えてあって非常にわかりやすかった。なのでこちらでは割愛。

## Ubuntuのセットアップ
### キーボード配列の変更
今回はUbuntu日本語Remixを使用したのでインストール直後から日本語を使用することができたが、PCのキーボードはUS配列なので、キーボード配列を変更する必要があった。

設定の『地域と言語』の入力ソースから英語を追加、元々入っている日本語と日本語(Mozc)のうち、日本語は不要だったので削除した。

![](https://i.imgur.com/jfhBkpy.png)

言語の切り替えはWindows＋Spaceでできるようだ。個人的に好きじゃないので、あとで変更したい。

### ディレクトリ名を日本語から英語に
```
LANG=C xdg-user-dirs-gtk-update
```

### curl のインストール
```
sudo apt install curl
```

### ゴミ箱をDockに表示
```
gsettings set org.gnome.shell.extensions.dash-to-dock show-trash true 
```

### Windowsとの時刻ズレを解消
```
sudo timedatectl set-local-rtc true
```

### MP4動画等を再生できる様にする
```
sudo install ubuntu-restricted-extras
sudo install ffmpeg
```

コピーライトの関連で、ライセンスに同意していない状態でプリインストールさせるわけには行かないらしい。

the below reference is [here](https://ourcodeworld.com/articles/read/980/unable-to-play-mp4-file-in-ubuntu-18-04-h-264-main-profile-decoder-is-required-to-play-the-file-but-is-not-installed#:~:text=Ubuntu%20excludes%20these%20codecs%20because,their%20licensing%20terms%20and%20conditions.)

> Unable to play MP4 file in Ubuntu 18.04: H.264 (Main Profile) decoder is required to play the file, but is not installed
>> Ubuntu excludes these codecs because these video files and other media formats are copy-right protected, so you can't just add these protected technology to your operating systems and programs without agreeing to their licensing terms and conditions.


## 各種ソフトウェアのインストール
注：基本的に`sudo apt install` で済ましたいと思っています。

### 不要ソフトのアンインストール
最小インストールをしておけば良かったけれどもしなかったので、UbuntuSoftware上で削除。

![](https://i.imgur.com/ozMQiVC.png)


- 削除したもの
	- ゲーム類: お遊び用PCじゃないので
	- 写真・カレンダー・その他バックアップ、LibreOffice等
		- Google使うので
	- テキストエディタ類：VSCodeを使うので


### google chrome
Ubuntu用に .deb が用意されているので、取り敢えずDL。

```
# dl先にて
sudo apt install ./google-chrome-stable_current_amd64.deb
```

Ubuntuシングルサインオン？Googleのパスワード管理で十分です。非UbuntuのPCでもChromeさえ入れれば使えるので。

### slack
[ここ](https://slack.com/intl/ja-jp/downloads/linux)にLinux版が用意されている。.debをDLしてあとはChromeと一緒。

### VisualStudioCode
[ここ](https:// "title")から.debをDL。File＞Preference＞TurnOnSyncで設定同期

### vim
VSCodeもvimも使う

```
sudo apt remove nano
sudo apt install vim
sudo update-alternatives --config editor
```

w

### git 
```
sudo apt install git
git config --global core.editor 'vim -c "set fenc=utf-8"'
git config --global user.name "blah blah"
git config --global user.email "username@example.com"
```
### gyazo
[linux版がgithub](https://github.com/gyazo/Gyazo-for-Linux)にある。

```
curl -s https://packagecloud.io/install/repositories/gyazo/gyazo-for-linux/script.deb.sh | sudo bash
sudo apt-get install gyazo
```

### Solaar（マウス関連
Logicoolのマウス管理ソフトにはLinux版がないので、代替として[Solaar](https://pwr-solaar.github.io/Solaar/)を使う。

```
sudo apt install solaar
```

![](https://i.imgur.com/Tbeo8cy.png)

### howdy(WindowsHello的な顔認証)
githubは[こちら](https://github.com/boltgolt/howdy)。

```
sudo add-apt-repository ppa:boltgolt/howdy
sudo apt update
sudo apt install howdy
# get IR camera path
sudo apt install v4l-utils
v4l2-ctl --list-devices
```

aptだけでやりたいなら、Releaseページで.debをDL。`howdy [-U user] [-y] command [argument]` な感じでセッティング。分からないときは、[arch linux wiki - howdy](https://wiki.archlinux.org/index.php/Howdy#Add_correct_IR_sensor)に載っている。

### squoosh(画像圧縮)
ソフトウェアではなくPWAだけれども。有能なので[サイト](https://squoosh.app/)からPWAを追加

![](https://i.imgur.com/ROQt0fa.png)