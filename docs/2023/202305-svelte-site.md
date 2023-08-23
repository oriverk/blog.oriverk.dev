---
title: AstroとSvelteでStaticサイトを作って、GitHub Actions で定期的に情報を取得更新するようにした
create: "2023-05-04"
update: "2023-05-04"
tags: [Astro, Svelte, GitHubActions, CloudflarePages]
description: ""
published: true
---

## はじめに

趣味領域で作っている Next.js　StaticExport 製の静的サイトがあるのですが、ページ数が5000弱であること、Next.js の高い更新頻度に付いていくのが大変であるなどの理由から、リプレースを考えていました。その時にちょうど Astro が V2.2に達した Tweet を見かけたので、React で動いている[oriverk.dev](https://oriverk.dev)を Astro の Playground 代わりにしようと思いました。

- reference
  - [GitHub: oriverk/astro-site](https://github.com/oriverk/astro-site)
  - [Home | oriverk.dev](https://oriverk.dev/)

## Astroとは

> Astro is the all-in-one web framework designed for speed. Pull your content from anywhere and deploy everywhere, all powered by your favorite UI components and libraries.

速度重視で、他の UI フレームワークも使えるオールインワンの Web フレームワークです（意訳）。実際に Astro では SSG と SSR の両方を作ることが出来、React や Vue、Svelte なども混ぜて使うことができます。

コード先頭に markdown の frontmatter の様なものがあることを除けば、ぱっと見は Svelte や Vue の様で、if 文や繰り返し箇所は React の JSX の様な感じです。

<details>
<summary>index.astro</summary>

```astro:index.astro
---
import Layout from '../layouts/Layout.astro';
import Card from '../components/Card.astro';
---

<Layout title="Welcome to Astro.">
 <main>
  <h1>Welcome to <span class="text-gradient">Astro</span></h1>
  <ul role="list" class="link-card-grid">
   {[...Array(2)].map((_, i) => (
    <Card
     href={`https://astro.build/docs/${i === 0 ? '' : i}`}
     title={`Documentation ${i === 0 ? '' : i}`}
    />
   ))}
  </ul>
 </main>
</Layout>

<style>
 main {
  margin: auto;
  padding: 1.5rem;
  max-width: 60ch;
 }
 h1 {
  font-size: 3rem;
  font-weight: 800;
  margin: 0;
 }
</style>
```

</details>

## AstroとSvelteを使った感想

### よかったこと

- Astro 自体が非常に単純で理解しやすい（Next.js 比
- astro.Config で md ファイルの取り扱いが設定でき、あれやこれやと until function を書かずとも frontmatter を取得したり、html にコンパイルできる
- よいこととは実感してないけどリポジトリサイズが非常に小さい
  - 3.34MB: [oriverk/oriverk.dev](https://github.com/oriverk/oriverk.dev)
    - 593KB: [oriverk/astro-site](https://github.com/oriverk/astro-site)

### よくはなかったこと・ふつごうだったこと

- `.astro`での event handling には`document.querySelector`などと書く必要がある
  - [Scripts and Event Handling 🚀 Astro Documentation](https://docs.astro.build/en/guides/client-side-scripts/)
    - Svelte などの UI フレームワークを使う必要がある主因だと思う
- Astro の構文が React と Vue/Svelte の中間みたいで、if 文や each 文を書くときに困惑する
  - 経験により解消されるとは思う。
- `.astro`上で UI フレームワークコンポネントを呼び出す際に、両者との微妙な違いにより困ることがある。
- [GitHub](https://github.com/oriverk/astro-site/blob/main/src/layouts/Footer.astro)上で script や style 領域がハイライトされない
  - Svelte も Vue もされない

[![Image from Gyazo](https://i.gyazo.com/780048dd77cde1fb0e2fe92f48139092.png)](https://gyazo.com/780048dd77cde1fb0e2fe92f48139092)

## サイトについて

主に以下のような機能をもったサイトにしたいと考えました。

- Static Site である
- GitHub の Pinned Repos と Contribution Calendar(GitHub 草)を表示できる
- [blog.oriverk.dev](https://blog.oriverk.dev)のコンテンツを取得表示できる
- Cloudflare Pages にデプロイし、サイトデータを自動で更新できる

また、以前に[oriverk.dev](https://oriverk.dev)を React で作ったときの感じを踏襲したいとも考えていました。

- [GitHub | oriverk/oriverk.dev](https://github.com/oriverk/oriverk.dev)

[![Image from Gyazo](https://i.gyazo.com/16a69e04e9acc83746beaf173c26d8fd.png)](https://gyazo.com/16a69e04e9acc83746beaf173c26d8fd)

### 主に使用したもの

Astro だけでもサイトは作れますが、Astro と他 UI フレームワークを使った場合の感じを知りたかったので、軽量さに共通点を持つ Svelte を UI フレーム枠に採用しました。全体的な view？の/pages は astro ファイルで作り、components は svelte という風に使い分けました。

- [Astro](https://astro.build/)
- [Svelte • Cybernetically enhanced web apps](https://svelte.dev/)
- fetcher
  - [octokit/graphql.js: GitHub GraphQL API client for browsers and Node](https://github.com/octokit/graphql.js)
- linter
  - [Find and fix problems in your JavaScript code - ESLint - Pluggable JavaScript Linter](https://eslint.org/)
  - [Prettier · Opinionated Code Formatter](https://prettier.io/)
  - [commitlint - Lint commit messages](https://commitlint.js.org/#/)

### Init astro app

```shell
npm create astro@latest -- --template basics
```

Astro と Astronaut を掛けているのか、Houston という名前の顔文字が動いてて可愛いかったです。

![npm create astro@latest](https://user-images.githubusercontent.com/44029144/231638707-5afcf66c-2e6d-4bda-a69b-235e74507376.png)

![basics](https://user-images.githubusercontent.com/4677417/186188965-73453154-fdec-4d6b-9c34-cb35c248ae5b.png)

```shell
npm i -D npm-run-all
npm i -D @commitlint/{config-conventional,cli}
# echo '{"extends": ["@commitlint/config-conventional"]}' > .commitlintrc.json

npm install -D eslint @typescript-eslint/parser eslint-plugin-{astro,jsx-a11y,import} eslint-import-resolver-typescript
npm install -D prettier prettier-plugin-astro eslint-config-prettier
# echo {} > .prettierrc.json

npx husky-init && npm install
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'

npx astro add svelte

npm i sass cssnano autoprefixer
```

### code linterの設定

- [Editor Setup 🚀 Astro Documentation](https://docs.astro.build/en/editor-setup/#eslint)
  - [GitHub | ota-meshi/eslint-plugin-astro](https://github.com/ota-meshi/eslint-plugin-astro)
  - [GitHub | withastro/prettier-plugin-astro](https://github.com/withastro/prettier-plugin-astro)

Astro と Svelte を混ぜるので当然なのですが、両者用の設定が必要でした。なので、init svelte app の箇所に加えて

```shell!
npm i -D eslint-plugin-svelte3 prettier-plugin-svelte
```

#### ESLint Config

他レポジトリで使っていた svelte 用の Config と混ぜる形で作りました。Svelte は今年に入って触ったばかりなので、設定が正しい状態にあるかはわかりませんが、動いてます。

<details>
<summary>.eslintrc.yml</summary>

```yml:.eslintrc.yml
extends:
  - plugin:astro/recommended
  - plugin:jsx-a11y/recommended
  - plugin:import/recommended
  - plugin:import/typescript
  - prettier
overrides:
  - files:
      - '*.astro'
    parser: astro-eslint-parser
    parserOptions:
      parser: '@typescript-eslint/parser'
      extraFileExtensions:
        - .astro
    rules: {}
  - files:
    - '*.svelte'
    processor: svelte3/svelte3
    parserOptions:
      parser: '@typescript-eslint/parser'
      extraFileExtensions:
        - .svelte
    rules: {}
  settings:
      svelte3/typescript: true
parser: '@typescript-eslint/parser'
parserOptions:
  ecmaVersion: latest
  sourceType: module
plugins:
  - svelte3
  - '@typescript-eslint'
ignorePatterns:
  - './dist/**/*'
settings: {}
```

</details>

#### Prettier Config

```yml:.prettierrc.yml
trailingComma: es5
tabWidth: 2
semi: false
singleQuote: true
plugins:
  - prettier-plugin-astro
  - prettier-plugin-svelte
pluginSearchDirs: false
```

### ChatGPTとGitHub GraphQL API

- [Introducing ChatGPT](https://openai.com/blog/chatgpt)
- [GitHub GraphQL API documentation - GitHub Docs](https://docs.github.com/en/graphql)
- [Explorer - GitHub Docs](https://docs.github.com/en/graphql/overview/explorer)

GitHub API は以前に何度か利用したことがあって、ドキュメントが割と重く長いことを覚えていたので、時間節約のために ChatGPT を利用しました。ChatGPT に尋ねたところ、ChatGPT のバージョンは3.5でデータは2021年9月までのものらしく、例えば21年10月以降に変わった内容については正確には答えることができません。なので、ChatGPT が出力したクエリを GitHub GraphQl API Explorer で試して正常に動くかを確認し、クエリを調整することにしました。

```text
GitHub GraphQL API を用いて、ユーザ名oriverkのpinned repository と contribution calendar のデータを取得せよ
```

<details>
<summary>ChatGPT-3.5 出力結果</summary>

```javascript
query {
  user(login: "oriverk") {
    pinnedItems(first: 6) {
      nodes {
        ... on Repository {
          name
          description
          url
          stargazers {
            totalCount
          }
          forkCount
        }
      }
    }
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            contributionCount
            date
          }
        }
      }
    }
  }
}
```

</details>

Explorer で問題なく動くことを検証し、必要/不必要なデータを取得するために公式ドキュメントを片手に適宜クエリを修正し、利用しました。

### Contribution Calendar(GitHub草)

[![Image from Gyazo](https://i.gyazo.com/56267525938e32ee550ce93a29c9d51a.png)](https://gyazo.com/56267525938e32ee550ce93a29c9d51a)

描画するための Svelte ライブラリは複数ありましたが、その多くが更新を止めていました。なので、ライブラリを使わずに作ることにしました。

- code
  - [astro-site/src/components/ActivityCalendar at main · oriverk/astro-site · GitHub](https://github.com/oriverk/astro-site/tree/main/src/components/ActivityCalendar)

### RSS fetcher

基本的に CatNose 氏の下記「RSS 集約サイト」に倣いました。なので割愛します。

- [チーム個々人のテックブログをRSSで集約するサイトを作った（Next.js）](https://zenn.dev/catnose99/articles/cb72a73368a547756862#next.js%E3%81%A7%E9%9D%99%E7%9A%84%E3%82%B5%E3%82%A4%E3%83%88%E3%82%92%E3%83%93%E3%83%AB%E3%83%89%E3%81%99%E3%82%8B)
- [catnose99/team-blog-hub: RSS based blog starter kit for teams](https://github.com/catnose99/team-blog-hub)
- [catnose99/timeline: catnose's timeline](https://github.com/catnose99/timeline)

### GitHub ActionsによるCloudflare Pagesへの定期的デプロイ

GitHub GraphQL API へのアクセスを少なするために、prebuild にて GitHub のユーザー情報と別レポジトリからの履歴書用 md ファイル、[oriverk.dev](https://oriverk.dev)の RSS を取得して、`/contents`下に json ファイルとして保存し、これら json ファイルを利用して build しています。

```json:package.json
{
 "scripts": {
    "dev": "astro dev --project tsconfig.json",
    "start": "astro dev",
    "prebuild": "run-s prebuild:*",
    "build": "astro build",
    "preview": "astro preview",
 }
}
```

GitHub Actions でもこれを利用するようにしました。

<details>
<summary>workflows/deploy.yml</summary>

```yml:deploy.yml
name: continuous-deployment
on:
  push:
    branches:
      - main
      - dev
  schedule:
    - cron: "0 2 * * *"
  workflow_dispatch:

jobs:
  publish:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      deployments: write
    name: build and deploy to Cloudflare Pages
    steps:
      - name: checkout
        uses: actions/checkout@v3

      # Run a build step here if your project requires
      - name: setup node
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: install packages and build
        run: |
          npm install
          npm run build
        env:
          MODE: production
          SECRET_GITHUB_PERSONAL_ACCESS_TOKEN: ${{ secrets.SECRET_GITHUB_PERSONAL_ACCESS_TOKEN }}
          PUBLIC_GA_MEASUREMENT_ID: ${{ secrets.PUBLIC_GA_MEASUREMENT_ID }}

      - name: deploy to Cloudflare Pages
        uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: astro-site
          directory: dist
```

</details>

- [astro-site/deploy.yml at main · oriverk/astro-site · GitHub](https://github.com/oriverk/astro-site/blob/main/.github/workflows/deploy.yml)
- [Cloudflare Pages GitHub Action · Actions · GitHub Marketplace](https://github.com/marketplace/actions/cloudflare-pages-github-action)

[![Image from Gyazo](https://i.gyazo.com/d37ba7a48b06d30d59d42ce6196870e6.png)](https://gyazo.com/d37ba7a48b06d30d59d42ce6196870e6)

### AstroでGoogle Analytics

- [【Astro】Google Analyticsを導入する - Qiita](https://qiita.com/asahina820/items/db06b71b53a8d167243f)
- [Add google analytics to Astro with Partytown](https://www.kevinzunigacuellar.com/blog/google-analytics-in-astro/)

### エラー類

Astro とその他の UI フレームワーク（今回は Svelte）を混ぜる構成なので、どちらに起因するか見極める必要性があり、また両者の組み合わせによるエラーは公式ドキュメントには当然書いてないので、そういったところは大変だなあと感じました。

#### date-fns/locale

svelte と date-fns

- [import locale in SvelteKit/NodeJS · Issue #2964 · date-fns/date-fns](https://github.com/date-fns/date-fns/issues/2964)

```text
Directory import '/home/oriverk/Codes/oriverk/astro-site/node_modules/date-fns/locale/ja' is not supported resolving ES modules imported from /home/oriverk/Codes/oriverk/astro-site/dist/entry.mjs
Did you mean to import date-fns/locale/ja/index.js?
```

```diff:typescript
- import { ja } from 'date-fns/locale'
+ import ja from 'date-fns/locale/ja/index.js'
```

#### CSS Logical Media Query error

Media Queries Level 4からの下記の様な書き方は、Svelte においては次のバージョンから使える模様。

```css
@media (max-width: 30em) { ... }
```

- [メディアクエリーの使用 - CSS: カスケーディングスタイルシート | MDN](https://developer.mozilla.org/ja/docs/Web/CSS/Media_Queries/Using_media_queries#level_4_%E3%81%A7%E3%81%AE%E6%A7%8B%E6%96%87%E3%81%AE%E6%8B%A1%E5%BC%B5)
- [CSS Logical Media Query error · Issue #8324 · sveltejs/svelte](https://github.com/sveltejs/svelte/issues/8324)
  - [feat: media query range syntax & single value function support via css-tree extension by typhonrt · Pull Request #8430 · sveltejs/svelte](https://github.com/sveltejs/svelte/pull/8430)

## サイトキャプチャ

[![Image from Gyazo](https://i.gyazo.com/8ee5c8b47f78d4b7c56c030f7e397569.png "Hero")](https://gyazo.com/8ee5c8b47f78d4b7c56c030f7e397569)

[![Image from Gyazo](https://i.gyazo.com/231d1a6cd101c41e1709cfdc09c4e738.png "GitHub")](https://gyazo.com/231d1a6cd101c41e1709cfdc09c4e738)

[![Image from Gyazo](https://i.gyazo.com/24d1022f06f042f67bedc1fd4e2096a2.png "Feed")](https://gyazo.com/24d1022f06f042f67bedc1fd4e2096a2)
