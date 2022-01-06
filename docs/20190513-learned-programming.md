---
create: '2019-05-13'
update: '2019-12-12'
title: 'プログラミングを2か月間、日本人エンジニアの下で学んできた'
tags: [cebu]
published: true
---

from [Qiita: プログラミングを2か月間、日本人エンジニアの下でマンツーマンで学んできた](https://qiita.com/OriverK/items/30d8941c7799c9aa6dfd)

Web エンジニアに転職するために、独りで勉強を進めていましたが、独学のデメリットを埋めるべく、[Value Space of Cebu](http://value-space.net/)に参加してきました。参加経緯や 2 か月間の感想等を書き留める。

## 私について

- 2017 年 3 月　農学学士　卒業
- 2018 年 8 月　新卒入社企業　退職
- 2018 年 12 月~2019 年 9 月　オーストラリアでのワーキングホリデー
- 2019 年 3~4 月　セブでのプログラミング勉強

専門は農学部植物系学科ですが、農業生産システム工学研究室に所属し、卒論は自動除草ロボット用の『雑草中の作物列検出する方法』の研究でした。使用言語は C++、ライブラリとして OpenCV を使用。

## 参加講座について

プログラミングについて調べている中で[『プログラミング道場』](https://programming-dojo.com/)というブログを知り、そのブログ主の[ジョージさん](https://twitter.com/monkey_d_george)さんが 2 か月間の講師でした。3 月からセブでプログラミング講座をするというツイートを見、参加しました。

### 参加目的

1. 独学によるデメリットを少しでも埋める
2. Ruby を学ぶ
3. Progate レベルの HTML、Git、ComandLine から、さらに理解を深める
4. Web エンジニアに会ったことがないので。

### 場所

フィリピンのセブ島のすぐ下のマクタン島

### 講座開始前にしたこと

1. 仮想環境（CUI）の構築、RubyonRails の環境準備
2. Ruby、Html、Git を Progate で一通りやること。

### 講座内容

毎日したことを[アウトプットとして、Qiitaに投稿](https://qiita.com/OriverK)していました。

#### 1か月目

時間割に沿って行われました。

##### Ruby認定試験を用いた勉強

- 参照：[Ruby認定試験のアウトプット](https://qiita.com/search?utf8=%E2%9C%93&sort=&q=OriverK+Ruby%E8%AA%8D%E5%AE%9A%E8%A9%A6%E9%A8%93)

以下は例(以下省略)

```rb
# ファイルdataの内容はabcdefg
File.open("data") do |io|
  while not io.eof?
    print io.read(1)
    io.seek(0,IO::SEEK_SET)
  end
end
```

![image](/assets/posts/201905/cebu2.png)

##### Scaffoldなしの掲示板

Bootstrap や DB を組み合わせ、生徒データ情報一覧になりました。

![image](/assets/posts/201905/cebu3.png)

##### MySQL

- [6日目：MySQL操作](https://qiita.com/OriverK/items/8c35aae3cbe05a1a28ce)
- [12日目：PostgreSQLを用いたログイン機能付きサイト](https://qiita.com/OriverK/items/ef1883408ea924376c1c)
- [15日目：アプリをネットに公開したく、Herokuを使ってみた。](https://qiita.com/OriverK/items/03c39ffbccb13c653d92)

##### RailsTutorial

[RailsTutorial](https://railstutorial.jp/)の、テストの最初段以降を除いて、時折技術サポート受けながら、最初から最終章までしました。1 か月目後半頃だったので、『既にやったぞ』という箇所が多かったです。

#### 2か月目

主に基本情報技術者試験のセキュリティと DB の設問に費やしました。

- 例： [H30秋午後設問3](https://www.jitec.ipa.go.jp/1_04hanni_sukiru/mondai_kaitou_2018h30_2/2018h30a_fe_pm_qs.pdf)
- [18日目：トランザクションって](https://qiita.com/OriverK/items/2359c9159b55c74f15d1)
- [21日目：H30秋基本情報技術者試験の問3データベース](https://qiita.com/OriverK/items/6efe454be2d6be84ceb5)

![image](/assets/posts/201905/cebu5.png)

JS 等、追加で勉強しなければと感じています。

### 2か月を終えて

#### 良かった点

- 触ったことのなかった Ruby を、上のサイト程度までには触れるようになった。
- SQL や Git、ComandLine の Progate レベルを脱することができた。

#### ああしとけばと思う点

- 遠慮なく質問すればよかった。マンツーマンで、精神的に萎縮してしまった感じもする。
  - 最終的には自己解決が必要なのですが、勉強する場なのだから、遠慮せずに、と。

## 私の今後

ワーホリビザは 11 月末期限ですが、それを待たずに Web エンジニアとして転職したいと考えています。
農学部出身、他業種出身からの未経験採用となので、厳しいと思いますが。

### 今後したい事

- コンサートチケット申込購入サイトを完成させ、Heroku 等にあげる。
  - Twitter 登録やトランザクション実装、Top ページ追加、デザイン修正、メール、バッチ処理の追加等々。。。
- Ruby と Git 等の理解をさらに深めるべく、勉強の継続。
  - オリジナルの Web アプリを作成するなりして。

### 転職に向け、すること

- ポートフォリオ作成
- 他言語や、AWS や Docker、コンピュータサイエンス等の勉強
- 転職サイトなど（そういや転職について何も使うべきではない言葉なので修正してください）

## 参照

- 講師: [＠monkey_d_george](https://twitter.com/monkey_d_george)
  - [Value Space of Cebu](http://value-space.net/)
  - [プログラミング道場](https://programming-dojo.com/%E7%A7%81%E3%81%AE%E3%83%9D%E3%83%BC%E3%83%88%E3%83%95%E3%82%A9%E3%83%AA%E3%82%AA/)
- 私: <https://oriverk.dev>
  - [Github Acount](https://github.com/oriverk)

注）『転職』といった形で恩を返す？　事が出来ないので、今回の投稿となりました。
