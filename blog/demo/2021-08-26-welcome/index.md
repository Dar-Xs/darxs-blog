---
slug: welcome
title: 欢迎使用
authors: [slorber, yangshun, Dar-Xs]
tags: [hello, docusaurus, welcome, config]
---

[Docusaurus 的博客特性](https://docusaurus.io/docs/blog) 由 [blog 插件](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-blog)所提供。

你可以直接在 `website/blog/` 文件夹下添加 Markdown 文件或者文件夹。

你可以将常用的博文作者可以添加到 `authors.yml` 中。

博文的日期将由文件名获取，例如：

- `2019-05-30-welcome.md`
- `2019-05-30-welcome/index.md`

博文文件夹可以用于方便地定位博文中的图片:

![Docusaurus Plushie](./docusaurus-plushie-banner.jpeg)

博文也支持标签！

**同时，如果你不需要博客功能**：直接删除这个目录，然后在 Docusaurus 的配置中添加 `blog: false`。
