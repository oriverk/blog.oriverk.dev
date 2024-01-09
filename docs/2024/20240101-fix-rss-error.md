---
title: RSSフィードでの特殊文字エンティティ関連エラーを報告しました
create: "2024-01-04"
update: "2024-01-04"
tags: [rss]
description: 
published: true
---

とある Web サイトの RSS フィードが構文エラーを引き起こしていたので、サイト管理者に報告して修正してもらいました。報告する過程で原因を調べていたら、はじめて知ったものだったのでメモとして残します。

## 内容

RSS ページに『error on line xxx at column yy: Entity 'alpha' not defined』と表示され、RSS Reader が動作しない。

![Image from Gyazo](https://i.gyazo.com/f29bce982fae6446dd380ba7d1c71c00.png)

## 期待される動作

エラーメッセージは表示されず、また RSS Reader で更新情報を正常に取得できる。

## エラーの原因

RSS 中の `<title />` に特殊文字エンティティ `&alpha;` が含まれている。

```xml
<rss xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/" version="2.0">
  <channel>
    <title>RSS Playground</title>
    <link>https://example.com</link>
    <description>example</description>
    <pubDate>Mon, 22 Nov 2023 09:46:41 +0900</pubDate>
    <language>ja</language>
    <item>
      <title>&alpha;</title>
      <link>https://example.com</link>
      <pubDate>Tue, 22 Nov 2023 09:46:41 +0900</pubDate>
      <category>修正履歴</category>
      <guid isPermaLink="true">https://example.com</guid>
      <description><![CDATA[ <p>&alpha;</p> ]]></description>
    </item>
  </channel>
</rss>
```

## エラーの解決法

- `CDATA` を用い、`<title><![CDATA[ &alpha; ]]></title>` の様にする
- エンティティを定義する

```xml
<!DOCTYPE rss [
  <!ENTITY beta "&#946;">
]>
<rss xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/" version="2.0">
  <channel>
    <title>RSS Playground</title>
    <link>https://example.com/</link>
    <description>新着一覧</description>
    <pubDate>Mon, 20 Nov 2023 09:46:41 +0900</pubDate>
    <language>ja</language>
    <item>
      <title>&beta;</title>
      <link>https://example.com/</link>
      <pubDate>Tue, 21 Nov 2023 09:46:41 +0900</pubDate>
      <category>修正履歴</category>
      <guid isPermaLink="true">https://example.com/</guid>
      <description><![CDATA[ <p>&beta;</p> ]]></description>
    </item>
  </channel>
</rss>
```

## 参照

- [RSS 2.0 Specification (Current)](https://www.rssboard.org/rss-specification)
- [Unicode Decimal Code &#945;](https://www.codetable.net/decimal/945)
- [Entity (エンティティ) - MDN Web Docs 用語集: ウェブ関連用語の定義 | MDN](https://developer.mozilla.org/ja/docs/Glossary/Entity)

## その他

RSS と特殊文字エンティティについて理解を深めるために、ChatGPT に解説してもらいました。

### `<title>&alpha;</title>`で『Entity 'alpha' not defined』となるのはなぜですか

> ChatGPT
> > \&alpha; が「Entity 'alpha' not defined」というエラーになるのは、XML文書内で使用するエンティティが事前に定義されていない場合です。通常、エンティティはDTD（Document Type Definition）やXMLスキーマで定義され、XML文書内で使用される前にその定義が存在している必要があります。
> > α（アルファ）は一般的に使用されるエンティティで、通常、DTDやXMLスキーマで定義されているはずです。しかし、エンティティが定義されていないか、XML文書でそれに言及していない場合にこのエラーが発生します。

### CDATAとはなんですか

> ChatGPT
> > CDATA（Character Data）は、XML文書内で特定のデータをマークアップから除外し、そのデータがそのまま扱われるよう指示するためのセクションです。CDATAセクションは、特にテキストデータに対して使用されます。RSSフィード内でCDATAが使用されることがあります。
> > CDATAセクション内では、通常のXMLマークアップが無視され、その中のテキストがそのままの形で解釈されます。RSSフィードでCDATAが使用される主な理由は、テキストデータに特殊文字やHTMLタグが含まれている場合でも、それらをそのまま保持して解釈されないようにするためです。これにより、フィードを解析する際に特殊文字やHTMLタグが正確に維持され、表示されるコンテンツが意図通りになります。

```rss
<![CDATA[ここにはマークアップされないテキストが入ります]]>
```
