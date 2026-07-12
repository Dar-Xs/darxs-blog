import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 博客平迁自 Docusaurus：
// 目录名即旧站 frontmatter 里的 slug，entry id 直接用作 URL（/blog/<id>），保住旧链接
const blog = defineCollection({
  loader: glob({
    pattern: '**/index.md',
    base: './src/content/blog',
    generateId: ({ entry }) => entry.replace(/\/index\.md$/, ''),
  }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string(),
    // 沿自旧站的编辑分类（blog/ 下的目录名）：开发日志 / 随笔 / 译文，展示名在 src/i18n/ 字典
    category: z.enum(['log', 'vol', 'translation']),
    tags: z.array(z.string()).default([]),
    // 草稿（施工中）：不进列表/首页/英文列表，页面仍生成（旧 URL 保住）但 noindex
    draft: z.boolean().default(false),
    // 英文版为站外原文时（如译文的原作）直链外部，英文列表用
    enExternal: z
      .object({ title: z.string(), href: z.string().url(), description: z.string() })
      .optional(),
  }),
});

// 英文版正文：同目录兄弟文件 index.en.md，id 与中文条目一致；
// 只带会随语言变化的字段（title/description），date/category/tags 以中文条目为准，防两处漂移
const blogEn = defineCollection({
  loader: glob({
    pattern: '**/index.en.md',
    base: './src/content/blog',
    generateId: ({ entry }) => entry.replace(/\/index\.en\.md$/, ''),
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
  }),
});

export const collections = { blog, blogEn };
