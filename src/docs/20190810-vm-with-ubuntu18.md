---
date: '2019-08-10'
update: '2020-03-28'
title: 'Qiita: 仮想環境をUbuntu 18.04 （CUI/GUI）で構築する'
tags: Qiita ubuntu18.04 Vagrant vmware
author: OriverK
slide: false
---

Qiita: [仮想環境をUbuntu18.04( CUI/GUi )で構築する](https://qiita.com/OriverK/items/115c0c4d3c25c89327bc) より

[仮想環境でRubyonRailsを導入し、rails newまでする](https://qiita.com/OriverK/items/c69b715fc455e8f4b5fd)の投稿はしているのに、
仮想環境をUbuntuで構築する投稿をしていなかったことに気づいた。

# 環境
ホストOS：Windows10 Home
実装RAM： 16GB

# 構築：CUI/GUI共通

まず最初に、下2つをインストールしておく
1. [vagrant](https://www.vagrantup.com/downloads.html) 
2. [virtualbox](https://www.virtualbox.org/wiki/Downloads) 

仮想環境を作成する場所にフォルダを作っておく。今回は適当に `hoge`　とする。

```sh:terminal
mkdir hoge
```
作成したフォルダに移動し、Vagrantfileを作成する。
Vagrantfileには、Vagrant、VirtualBoxを使うための設定が記載されている。
また、Vagrantfileはrubyで書かれている。

```sh:terminal
cd hoge
vagrant init
```
`vagrant init`で作成されたVagrantfileを編集する。
今回は、bento/ubuntu-18.04を使用する

ここからCUIとGUI(デスクトップ)で作業が変わる

Vagrantfileの編集をする。
私のPCのRAMは16GBあるので、今回は8GBとする。

```rb:Vagrantfile
# 最初の状態
# ipアドレスの部分がコメントアウトされているので注意
Vagrant.configure("2") do |config|
  config.vm.box = "base"
  # config.vm.network "private_network", ip: "192.168.33.10"
    config.vm.provider "virtualbox" do |vb|
      vb.memory = "1024"
    end
end

# 編集後
Vagrant.configure("2") do |config|
  config.vm.box = "bento/ubuntu-18.04"
  config.vm.network "private_network", ip: "192.168.33.10"
    config.vm.provider "virtualbox" do |vb|
      vb.memory = "8192"
    end
end
```

仮想環境を立ち上げる

```sh:terminal
vagrant up
```

## ubuntuの日本語化とロケール変更(CUI/GUI共通）
個人的には、言語に関しては英語のままで良いじゃんと思ってるけども。

```sh:terminal
# change locale to ja_JP.utf-8
# make japanize environmet
sudo locale-gen ja_JP.UTF-8
# when activate, activate with japanese
echo export LANG=ja_JP.UTF-8 >> ~/.profile
# apply the setting
source ~/.profile

# change timezone to jst
sudo timedatectl set-timezone Asia/Tokyo

# confirm
date
# => 2020年  3月 10日 火曜日 01:01:01 JST

```

# GUI版の構築
GUI版を構築する際はVagrantfileの編集から少し異なる。

```rb:Vagrantfile
# 編集後
Vagrant.configure("2") do |config|
  config.vm.box = "bento/ubuntu-18.04"
  config.vm.network "private_network", ip: "192.168.33.10"

  config.vm.provider "virtualbox" do |vb|
    vb.gui = true
    vb.memory = "8192"　# RAMを使える量を変更
    # cpu の数
    vb.cpus = 4
    vb.customize [
      "modifyvm", :id,
      "--vram", "256", # ビデオメモリ確保（フルスクリーンモードにするため
      "--clipboard", "bidirectional", # クリップボードの共有
      "--accelerate3d", "on",
      "--hwvirtex", "on",
      "--nestedpaging", "on",
      "--largepages", "on",
      "--ioapic", "on",
      "--pae", "on",
      "--paravirtprovider", "kvm",
    ]
   end
end
```

仮想環境の立ち上げ

```sh:terminal
vagrant up
```

SSH接続、パッケージ更新

```sh:terminal
vagrant ssh

sudo apt update
sudo apt upgrade
```

Ubuntuデスクトップ版(GUI)をインストールする
ここで、非常に時間が掛かるので注意

```sh:terminal
sudo apt install ubuntu-desktop
```

完

![キャプチャ.JPG](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/294402/6b1609c1-da18-c152-2673-31adb417b31b.jpeg)











