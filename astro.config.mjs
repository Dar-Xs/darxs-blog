// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import icon from 'astro-icon';
import { satteri } from '@astrojs/markdown-satteri';
import admonitions from './src/lib/satteri-admonitions.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://darxs.cn',

  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },

  i18n: {
    defaultLocale: 'zh',
    locales: ['zh', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },

  markdown: {
    // 平迁的 Docusaurus 文章里有 :::note/info/caution 容器
    processor: satteri({
      features: { directive: true },
      mdastPlugins: [admonitions],
    }),
    // 代码块双主题：暗色切换的 CSS 在 global.css（--shiki-dark 变量方案）
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [icon()],
});