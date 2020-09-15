---
create: '2020-02-03'
update: '2020-09-15'
author: Kawano Yudai
title: 'Build FrontEnd environment on Ubuntu'
tags: [ubuntu, node]
---

from [Gist: oriverk/InstallLanguage2Ubuntu.md](https://gist.github.com/oriverk/5d0352c7ca673883d9326e5ce0fb2ae1)

## Setup
### Nodejs
*rails6 uses webpacker, which needs nodejs

```sh
sudo apt install -y nodejs npm
# install n-package
sudo npm install n -g
# confirm stable nodejs ver
n --stable
# confirm latest nodejs ver
n --latest
# by n-package, install node
sudo n stable( or latest )
# uninstal old nodejs and npm, and re-login
sudo apt purge -y nodejs npm
exec $SHELL -l

# confirm
node -v
```

### yarn
```sh
sudo curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
sudo sh -c "echo 'deb https://dl.yarnpkg.com/debian/ stable main' >> /etc/apt/sources.list"
sudo apt update && sudo apt install yarn
yarn --version
```

### create-react-app
```sh
npm install -g craete-react-app
```

#### create react-apps
```sh
yarn create react-app my-app
# or
npm init reacta-pp my-app
# or
npx create-react-app my-app
```

#### create next-app
```sh
yarn create next-app
# or
npx create-next-app
```

#### not to use npm (or yarn)
```.npmrc
engine-strict=true
```

```json
{
  "engines": {
    "npm": "please_use_yarn_instead"
  },
  "name": {}
{
```

## Reference
- [npmjs.com](https://www.npmjs.com/)
- [nodejs.org](https://nodejs.org/ja/)
- [yarn - how to install yarn on ubuntu debian](https://classic.yarnpkg.com/ja/docs/install#debian-stable)

## Others
- [create react app - getting start](https://create-react-app.dev/docs/getting-started)
-[nextjs getting started](https://nextjs.org/docs/getting-started)
- [package.jsonに"engines"を設定すると「このバージョンのNode.jsでしか動かない」を表明できる](https://qiita.com/suin/items/994458418c737cc9c3e8)
- [yarnを使うプロジェクトでnpm installを禁止する方法](https://qiita.com/suin/items/a7bf214f48eb9b2d9afc)

