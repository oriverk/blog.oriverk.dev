<div align='center'>
  <img src='https://user-images.githubusercontent.com/44029144/82922646-d08c3280-9fb4-11ea-8cc0-3d4c5b03c723.gif' alt='screen shot of this site'>
</div>

<h2 align="center">My portfolio site with tech blog</h2>

<p align="center">
  <a href="https://ja.reactjs.org/">
    <img src="https://user-images.githubusercontent.com/44029144/83879483-a4bd3980-a778-11ea-94eb-8c04c8fb406e.jpg"
          style="margin-right: .5%; max-width: 178px; max-height: 100px; width: 40%;" />
  <a href="https://nextjs.org/">
    <img src="https://user-images.githubusercontent.com/44029144/83879519-b69edc80-a778-11ea-9094-8081f547f15d.jpg"
          style="margin-left: .5%; max-width: 190px; max-height: 100px; width: 40%;" />
  </a>
</p>

## Site URL
**https://oriverk.dev**

## Usage
**please use `yarn` instead of `npm`.**
**Attention. This repo uses mjs to generate some file, so you need nodejs v13 at least! (But Vercel support only LTS ver. So be carefull)**

```bash
yarn install
yarn dev

yarn build
yarn start
```

You can give it try to use npm. Actually I prohibited the use of `npm` with `package.json` and `.npmrc`.

## Learn More
To lean what this site is like, the following post is good.

- [Qiita: Next.jsでポートフォリオサイトを作成した](https://oriverk.dev/posts/20200526-next-portfolio) 

You can check out [the Next.js GitHub repository](https://github.com/oriverk/next-portfolio)

## Author
- [Github](https://github.com/oriverk)
- [Twitter](https://twitter.com/not_you_die)
- [Qiita](https://qiita.com/OriverK)


## To do
- [ ] implement `/tags/[tag]` page
- [ ] render `lang` above the code-block
- [ ] improve Syntax-Highlight
- [ ] integrate CSS( module.css or styled-jsx ...)
- [x] implement sitemap.xml
- [x] implement RSS, Atom, Sitemap
- [ ] implement AMP : [next/amp](https://nextjs.org/docs/api-reference/next/amp)
- [x] TypeScript
- [x] implement PWA
- [x] Google Analytics
- [x] Custom dmain
- [ ] implement Search function
- [ ] implement toc for post page
- [ ] implement dynamic og:image generation for post
- [ ] implement i18n