---
date: '2019-03-05'
update: '2019-03-18'
title: 'Qiita: 1日目  LinuxとShellscriptとPermission'
tags: Qiita Linux ShellScript memo
author: OriverK
slide: false
---

Qiita: [1日目 LinuxとShellscriptとPermission](https://qiita.com/OriverK/items/23509ae58fc0b4cbf462) より

# Linux

## メイン課題
1. ディレクトリ1を作成
2. ディレクトリ1の中にファイル1を作成
3. ディレクトリ2を作成
4. ディレクトリ2の中にディレクトリ3を作成
5. ディレクトリ1をディレクトリ3の中に移動

なお、ディレクトリ1/2/3をdir1/2/3、ファイル1をfile1とした。
最終的に簡潔になったコード。

```sh:terminal
mkdir dir1
touch dir1/file1
mkdir -p dir2/dir3
mv dir1 dir2/dir3
```
### コマンドのオプションが分からなくなった時

```sh:terminal
man コマンド名
```

## 今回使用したオプション付きコマンド
```sh:terminal
mkdir -p
 # -p, --parents　no error if existing, make parent directories as needed

mv O1 O2
 # O2が同ディレクトリ内に存在しないとき：リネーム
 # O2が同ディレクトリ内に存在するとき：移動

rm -r
 # -r, -R, --recursive
 # remove directories and their contents recursively
 # recursive：再帰的：ディレクトリ内のものに一つ一つに対し処理

ls -la
 # manコマンドで調べると-la自体は無いが、-lと-aオプションが存在する。
 # -a, --all do not ignore entries starting with
 # すべてのファイルやディレクトリを表示する。
 #この時、隠しフォルダや。から始まるディレクトリも表示される。

 # -l  use a long listing format
 # ファイルの詳細を表示する。
```

# シェルスクリプト
OSのシェルまたはコマンドラインインタプリタ向けに書かれたスクリプト言語。拡張子は`.sh`。

```sh:terminal
#シェルスクリプト作成
touch test.sh

#シェルスクリプト内編集(先の課題のコードを記述してみる。
#!/bin/sh

mkdir dir1
touch dir1/file1
mkdir -p dir2/dir3
mv dir1 dir2/dir3
```

1行目は『シバン』と呼ばれ、UNIXのスクリプトの`#!` から始まる1行目を指す。起動してスクリプトを読み込むインタプリタを指定する。
インタプリタ（interpreter）とは、プログラミング言語で書かれたソースコードないし中間表現を逐次解釈しながら実行（英語版）するプログラムのこと。(※よくわからなかったので、あとで調べる）

このtest.shを活用することで、先の課題を自動的に行うことができる。

```sh:terminal
#起動方法
./test.sh
```

#　Permission
まず、先のtest.shに対する権限を確認。

```sh:terminal
ls -la test.sh
#表示結果
-rw-rw-r-- 1 vagrant vagrant 0 Mar  4 23:48 test.sh
#左のチャンクから、user:所有者、usergroup:vagrant、others:誰でも、を意味する。
#また、r＝read権限、w=write権限、ここでは見えないがx=execute権限(実行許可）を指す。
```

## 権限編集方法
chmod=change mode

```sh:
# すべてのユーザーに実行権限を与える／禁止する。
chmod +x test.sh　/ chmod -x test.sh
#グループに書き込み権限をその他のユーザーには実行権限を禁止する。
chmod g+w,o-x test.sh
```
## 別の表示方法(数字）

```sh:
# r、w、xにそれぞれ4，2，1を割り当て、表すことができる。
rw-r--r--    =>  644
r-xr--r--    =>  544
#数字表示での権限編集

#すべてのユーザーに書き込み権限と読込権限を与える。
chmod 666 test.sh
```
# PermissionとPermitの違い（※プログラムはPermission
どちらも名詞で『許可』を意味するが、ニュアンスが違う。
日本語で説明するとズレるので、英英辞典で確認したい。
あと、Permissionのスペル注意。
