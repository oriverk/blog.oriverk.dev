---
date: '2020-01-28'
update: '2020-05-13'
author: Kawano Yudai
title: 'Gist: how to build VM with linux Ubuntu'
tags: [VM, Linux, Ubuntu]
image: ''
slide: false
---

from Gist: 
- [ oriverk/buildVMwithUbuntu.md](https://gist.github.com/oriverk/34a82751aa11ea19d5b74a0a442cfa2f)

# how to build CUI
## vagrant init
```sh
mkdir -p vm/MyVagrant/hogehoge
cd hogehoge
vagrant init
```

## add or modify file "Vagrantfile" in hogehoge directory (↓
```rb
# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure("2") do |config|
  # The most common configuration options are documented and commented below.
  # For a complete reference, please see the online documentation at
  # https://docs.vagrantup.com.

  # Every Vagrant development environment requires a box. You can search for
  # boxes at https://vagrantcloud.com/search.
  config.vm.box = "bento/ubuntu-18.04"
  
  # vagrant name
  config.vm.define "hogehoge"

  # Disable automatic box update checking. If you disable this, then
  # boxes will only be checked for updates when the user runs
  # `vagrant box outdated`. This is not recommended.
  # config.vm.box_check_update = false

  # Create a forwarded port mapping which allows access to a specific port
  # within the machine from a port on the host machine. In the example below,
  # accessing "localhost:8080" will access port 80 on the guest machine.
  # NOTE: This will enable public access to the opened port
  # config.vm.network "forwarded_port", guest: 80, host: 8080

  # Create a forwarded port mapping which allows access to a specific port
  # within the machine from a port on the host machine and only allow access
  # via 127.0.0.1 to disable public access
  # config.vm.network "forwarded_port", guest: 80, host: 8080, host_ip: "127.0.0.1"

  # Create a private network, which allows host-only access to the machine
  # using a specific IP.
    config.vm.network "private_network", ip: "192.168.33.10"

  # Create a public network, which generally matched to bridged network.
  # Bridged networks make the machine appear as another physical device on
  # your network.
  # config.vm.network "public_network"

  # Share an additional folder to the guest VM. The first argument is
  # the path on the host to the actual folder. The second argument is
  # the path on the guest to mount the folder. And the optional third
  # argument is a set of non-required options.
  # config.vm.synced_folder "../data", "/vagrant_data"

  # Provider-specific configuration so you can fine-tune various
  # backing providers for Vagrant. These expose provider-specific options.
  # Example for VirtualBox:
  #
   config.vm.provider "virtualbox" do |vb|
  #   # Display the VirtualBox GUI when booting the machine
  #   vb.gui = true
  #
  #   # Customize the amount of memory on the VM:
    vb.memory = "8192"
    end
  #
  # View the documentation for the provider you are using for more
  # information on available options.

  # Enable provisioning with a shell script. Additional provisioners such as
  # Puppet, Chef, Ansible, Salt, and Docker are also available. Please see the
  # documentation for more information about their specific syntax and use.
  # config.vm.provision "shell", inline: <<-SHELL
  #   apt-get update
  #   apt-get install -y apache2
  # SHELL
end
```

## lastly
```sh
vagrant up
vagrant global-status
# for WSL@ setting information
vagrant ssh-config
vagrant ssh
```

## Inner SSH
```sh
sudo apt update
# If build Desktop ver
sudo apt install ubuntu-desktop
```

## Change locale and timezone
```sh
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
# => 2019年  1月 30日 水曜日 14:49:48 JST
```

# GUI版の構築
GUI版を構築する際はVagrantfileの編集から少し異なる。

```rb
# Vagrantfile
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

```sh
vagrant up
vagrant ssh

sudo apt update
sudo apt upgrade
```

Ubuntuデスクトップ版(GUI)をインストールする
ここで、非常に時間が掛かるので注意

```sh
sudo apt install ubuntu-desktop
```

<picture>
  <source srcSet="/assets/posts/202001/ubuntu1.webp" type="image/webp" />
  <img src="/assets/posts/202001/ubuntu1.jpg" alt="ubuntu desktop" />
</picture>