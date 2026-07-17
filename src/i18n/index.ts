// 全站双语：共享 UI 字符串走这里的字典，
// 页面正文仍按 Astro 官方方案整页分文件（src/pages/ 中文，src/pages/en/ 英文）
export type Lang = 'zh' | 'en';

export const defaultLang: Lang = 'zh';

// 命名体系：站名「DarXs 微分 / DarXs Differential」；
// 花名 残星（中）= DarXs（英），站内叙述用花名；本名 熊若晗 在首页与 about 锚定
export const ui: Record<Lang, Record<string, string>> = {
  zh: {
    'site.name': 'DarXs 微分',
    'nav.cases': '案例',
    'nav.blog': '博客',
    'nav.lab': '实验室',
    'nav.about': '关于',
    'site.description': '残星（DarXs）的个人网站',
    'footer.friends': '朋友们',
    'category.log': '开发日志',
    'category.vol': '随笔',
    'category.translation': '译文',
    'a11y.backToTop': '回到顶部',
    'theme.toggle': '切换深浅',
    'theme.system': '跟随系统',
    'theme.light': '浅色',
    'theme.dark': '深色',
  },
  en: {
    'site.name': 'DarXs',
    'nav.cases': 'Cases',
    'nav.blog': 'Blog',
    'nav.lab': 'Lab',
    'nav.about': 'About',
    'site.description': 'Personal site of DarXs (Ruohan Xiong)',
    'footer.friends': 'Friends',
    'category.log': 'Dev log',
    'category.vol': 'Essay',
    'category.translation': 'Translation',
    'a11y.backToTop': 'Back to top',
    'theme.toggle': 'Toggle theme',
    'theme.system': 'System',
    'theme.light': 'Light',
    'theme.dark': 'Dark',
  },
};

export function getLangFromPath(pathname: string): Lang {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'zh';
}

export function useTranslations(lang: Lang) {
  return (key: string) => ui[lang][key] ?? ui[defaultLang][key] ?? key;
}

/** 同一页面的另一语言版本路径：'/lab' ↔ '/en/lab','/' ↔ '/en/' */
export function getCounterpart(pathname: string): string {
  const norm = pathname !== '/' && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
  if (norm === '/en') return '/';
  if (norm.startsWith('/en/')) return norm.slice(3);
  return norm === '/' ? '/en/' : '/en' + norm;
}
