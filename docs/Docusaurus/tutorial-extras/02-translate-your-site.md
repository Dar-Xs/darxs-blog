---
sidebar_position: 2
---

# 翻译你的网站

让我们来将 `docs/intro.md` 翻译成法语。

## 配置 i18n

修改 `docusaurus.config.js` 以支持 `fr` 地区:

```js title="docusaurus.config.js"
module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr'],
  },
};
```

## 翻译文档

复制 `docs/intro.md` 文件到 `i18n/fr` 文件夹:

```bash
mkdir -p i18n/fr/docusaurus-plugin-content-docs/current/

cp docs/intro.md i18n/fr/docusaurus-plugin-content-docs/current/intro.md
```

将 `i18n/fr/docusaurus-plugin-content-docs/current/intro.md` 翻译为法语。

## 启动你的本地化站点

在法国区域启动你的站点：

```bash
npm run start -- --locale fr
```

你的本地化站点可以在 [http://localhost:3000/fr/](http://localhost:3000/fr/) 访问到，并 `Getting Started` 页面也被翻译了。

:::caution

在开发环境中，你一次只能同时启用一个地区。

:::

## 添加本地化下拉菜单

为了流畅地在各种语言中导航，请添加一个本地化下拉菜单。

修改 `docusaurus.config.js` 文件:

```js title="docusaurus.config.js"
module.exports = {
  themeConfig: {
    navbar: {
      items: [
        // highlight-start
        {
          type: 'localeDropdown',
        },
        // highlight-end
      ],
    },
  },
};
```

现在本地化下拉菜单已经出现在你的导航栏中了：

![本地化下拉菜单](./img/localeDropdown.png)

## 构建记得本地化网站

为特定的地区构建你的站点：

```bash
npm run build -- --locale fr
```

或者一次性构建所有地区的站点：

```bash
npm run build
```
