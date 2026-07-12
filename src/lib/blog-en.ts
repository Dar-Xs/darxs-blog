import { getCollection, type CollectionEntry } from 'astro:content';

/** 英文侧一条博客列表项的去向（三态解析） */
export interface EnListing {
  post: CollectionEntry<'blog'>;
  href: string;
  title: string;
  description: string;
  /** 站外链接（如译文的英文原作），需 ExternalLink 处理 */
  external: boolean;
  /** 只有中文正文，列表需标「· 中文」 */
  zhOnly: boolean;
}

/** 英文列表/英文首页共用：有 index.en.md 用英文版，有 enExternal 链原作，否则回落中文原文 */
export async function getEnListings(): Promise<EnListing[]> {
  const [zhPosts, enPosts] = await Promise.all([getCollection('blog'), getCollection('blogEn')]);
  const enById = new Map(enPosts.map((e) => [e.id, e]));
  return zhPosts
    .filter((p) => !p.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
    .map((post) => {
      const en = enById.get(post.id);
      if (en) {
        return {
          post,
          href: `/en/blog/${post.id}`,
          title: en.data.title,
          description: en.data.description,
          external: false,
          zhOnly: false,
        };
      }
      if (post.data.enExternal) {
        const { href, title, description } = post.data.enExternal;
        return { post, href, title, description, external: true, zhOnly: false };
      }
      return {
        post,
        href: `/blog/${post.id}`,
        title: post.data.title,
        description: post.data.description,
        external: false,
        zhOnly: true,
      };
    });
}
