---
sidebar_position: 1
---

# 教程介绍

让我们**花 5 分钟时间探索 Docusaurus**。

## 准备开始

你可以**创建一个新的网站**。

或者用 **[docusaurus.new](https://docusaurus.new) 立即体验 Docusaurus**。

### 准备工作

- [Node.js](https://nodejs.org/en/download/) 16.14 或更高版本：
  - 在安装 Node.js 时，建议你勾选所有相关依赖项。

## 生成一个新的站点

用**经典模板**生成一个新的 Docusaurus 站点。

运行下列命令后，经典模板将会自动被添加到你的工程中：

```bash
npm init docusaurus@latest my-website classic
```

You can type this command into Command Prompt, Powershell, Terminal, or any other integrated terminal of your code editor.

The command also installs all necessary dependencies you need to run Docusaurus.

## Start your site

Run the development server:

```bash
cd my-website
npm run start
```

The `cd` command changes the directory you're working with. In order to work with your newly created Docusaurus site, you'll need to navigate the terminal there.

The `npm run start` command builds your website locally and serves it through a development server, ready for you to view at http://localhost:3000/.

Open `docs/intro.md` (this page) and edit some lines: the site **reloads automatically** and displays your changes.
