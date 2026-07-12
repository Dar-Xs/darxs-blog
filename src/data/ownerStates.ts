// 首页第四拍轮换库
// - 中文格式：四字修饰 + 的 + 残星（与前三拍七字对仗）；首条为默认项（无 JS / SEO 兜底）
// - 中英各自维护，不逐条对译（谦辞与双关翻不过去；英文严禁 "still learning" 类求职叙事）
// - 有新状态随手加一行即可
export const ownerStates: Record<'zh' | 'en', string[]> = {
  zh: [
    // 「曙光初现」弃用:是 K 线形态术语(piercing pattern),有炒股歧义
    '黎明将至的残星',
    '东方欲晓的残星',
    '正在练琴的残星',
    '正在工作的残星',
    '头脑风暴的残星',
    '正在折腾的残星',
    '手闲不住的残星',
    '学疏才浅的残星',
  ],
  en: [
    'DarXs, light before dawn',
    'DarXs, still up at dawn',
    'DarXs, at the piano',
    'DarXs, deep in work',
    'DarXs, brainstorming',
    'DarXs, tinkering away',
    'DarXs, hands never idle',
  ],
};
