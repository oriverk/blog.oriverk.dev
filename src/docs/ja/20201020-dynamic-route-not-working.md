---
title: 'Next.js: AMP hybrid と getStaticPaths は現状併用できない'
create: '2020-10-20'
update: '2020-10-20'
tags: [nextjs, amp] 
image: '/assets/posts/202010/hybridError.png'
---

## too long to read
2020年10月現在、Next.js AMP Hybrid モードと getStaticPaths 等の dynamic router の併用には問題を多く抱えている模様。。

## Introduction
### Environment

```sh
react: 16.13.1
Next.js: v9.5.5
```

## introduction
### related issues of next.js in github
- [Incremental Static Regeneration replaces `.amp` with `?amp=1` #14251](https://github.com/vercel/next.js/issues/14251)
- [SSG with fallback doesn't generate AMP page dynamically #14256](https://github.com/vercel/next.js/issues/14256)

## Main
### Behavior
hybrid amp と getStaticPaths / getStaticProps を併用すると、手元の dev や build では動いてるように見えるが、実際に vercel等に上げてみると下の様にエラーを起こす。エラー文を見る限り、json の中の null が原因の様だが、実際には　hybrid amp 時の　params の変化によるものの様だ。

![](/assets/posts/202010/hybridError.png)

`tags/[tag]` は動的ルートのページを静的生成し、 例えば `{params: {tag: 'hello'}}` だと `tags/hello/` となる。そして、hybrid amp の際は `{params: {tag: 'hello', amp: 1}}` として、`tags/hello?amp=1` となる事になっている。この url の変化により、getStaticPaths 等がエラーを起こす様だ。なお、`amp: true` は出力するのが amp ページのみなので、url は変わらず、エラーも起きない。

### solution
- hybrid 下での getStaticPaths 等を止める
- hybrid を止め、`amp: true` とする。

## conclusion
元々AMPに技術に完全に乗っかるのは？と思いつつも、amp hybrid を進めてきましたが、自分がしたかったものは現状できない様なので https://oriverk.dev は AMP を採用しないことにした。AMP はその他の playground や趣味ブログに適用予定。