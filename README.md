# darxs.cn

站点 [darxs.cn](https://darxs.cn) 是我的个人博客、玩具和一些笔记。

该站点的其他别名为:
[darxs.com.cn](https://darxs.com.cn),
[www.darxs.cn](https://www.darxs.cn),
[darxs.com](https://darxs.com)

站长在准备购买域名 `darxs.com` 时, 发现其在两个月前已经被海外的一家商业公司所购买; 因此在这里提醒大家: 如果非常看重自己的 网名/品牌/IP 还请早点行动.
(显然后面又给蹲回来了 👀)

站点由 Docusaurus 构建, 托管在 Netlify 上,
构建状态:
[![Netlify Status](https://api.netlify.com/api/v1/badges/e62cdcbc-1862-42a8-bb23-3aa2203003ab/deploy-status)](https://app.netlify.com/sites/darxs/deploys)

### Installation

```
$ yarn
```

### Local Development

```
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Using SSH:

```
$ USE_SSH=true yarn deploy
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

### Translation

Translate the original text into the corresponding language in this folder: `i18n`
