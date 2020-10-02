---
create: '2020-09-22'
update: ''
author: Kawano Yudai
title: 'Algoliaでサイト内検索を実装する'
tags: [react, nextjs, algolia]
image: '/assets/posts/202009/algolia1.jpg'
---

## First
投稿記事内の検索に Algolia を利用した。Algoliaは高速な検索が可能な全文検索APIサービスで、フリープランがあり、ブログ用に利用する分には無料で且つ簡単に利用できるという事で使いました。また検索に必要になったデータは、元々 sitemap.mxl 等で用意していた postsMap.json をほぼそのまま利用する事が出来たので、使用感としては最高でした。

<details><summary>投入した postsMap.json のデータ構造例<summary><div>

"content"はブログ投稿物から日本語等を除いて用意した。もう少し正規表現で操作して、アルファベット1文字や記号、pageなどの一般ワードを除去したい。

```json
{
    "id": "20200526-next-portfolio",
    "title": "Next.js でポートフォリオサイトを作成した",
    "create": "2020-05-26",
    "update": "2020-07-14",
    "tags": [
      "next",
      "react",
      "remark",
      "typescript"
    ],
    "content": " Ruby Jekyll GihubPages Vue JS JS React from mizchi s blog JavaScript cpp stay home React Next js tutorial docs React Next js GithubPages Qiita Gist Markdonw Github this site React js Next js remarkjs reamrk mdx-js mdx highlight js UI Material-UI mui-org material-ui vm virtualbox vagrant OS Ubuntu bionic node -v v yarn -v yarn create next-app Example from the Next js repo amp amp amp-story amp-first AMP from AMP google analytics with-google-analytics with-google-analytics-amp aws with-aws-amplify with-aws-amplify-typescript api custome server preact Github zeit next js example Default starter app React Next js default yarn dev React Component React Fragment Material-UI material-ui permanent swipeable drawer Grid Material-UI top material-ui examples nextjs Icon from material-ui Icon create src pages index jsx src pages src components Layout jsx Layout jsx ` material-ui` permanent-drawer swipeable-drawer src components Layout jsx pages index jsx React ..."
  },
```

</div></details>

- 参照
  - [algolia](https://www.algolia.com)
  - [algolia community](https://community.algolia.com/)
  - [algolia Conditional Requests](https://www.algolia.com/doc/guides/building-search-ui/going-further/conditional-requests/react/)