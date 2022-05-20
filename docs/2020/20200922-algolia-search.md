---
create: '2020-09-22'
title: 'Algoliaでサイト内検索を実装する'
tags: [nextjs, algolia]
published: false
---

## First

投稿記事内の検索に Algolia を利用した。Algolia は高速な検索が可能な全文検索 API サービスで、ブログ用に利用するには無料で且つ簡単に利用できる。

"content"はブログ投稿物から日本語等を除いて用意した。もう少し正規表現で操作して、アルファベット 1 文字や記号、page などの一般 Word を除去したい。

```json
{
    "id": "20200526-next-portfolio",
    "title": "Next.js でポートフォリオサイトを作成した",
    "create": "2020-05-26",
    "update": "2020-07-14",
    "tags": ["next", "react", "remark", "typescript"],
    "content": " Ruby Jekyll GihubPages Vue JS JS React from mizchi s blog JavaScript cpp st..."
  },
```

- 参照
  - [algolia](https://www.algolia.com)
  - [algolia community](https://community.algolia.com/)
  - [algolia Conditional Requests](https://www.algolia.com/doc/guides/building-search-ui/going-further/conditional-requests/react/)
