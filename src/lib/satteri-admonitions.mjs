// Docusaurus 平迁文章里的 :::note / :::info / :::caution 容器，
// 由 Sätteri 的 directive 特性解析（astro.config.mjs 开启），这里转成
// <aside class="admonition …">，样式在 global.css。默认标题用中文：现有文章正文全部是中文。
const TYPES = new Map([
  ['note', '备注'],
  ['info', '信息'],
  ['tip', '提示'],
  ['caution', '注意'],
  ['warning', '注意'],
  ['danger', '危险'],
]);

export default {
  name: 'admonitions',

  containerDirective(node, ctx) {
    if (!TYPES.has(node.name)) return;
    ctx.setProperty(node, 'data', {
      hName: 'aside',
      hProperties: { className: ['admonition', `admonition-${node.name}`] },
    });
    // :::info[自定义标题] 的标题段落带 directiveLabel 标记；没有就补默认标题
    const label = node.children[0];
    if (label?.type === 'paragraph' && label.data?.directiveLabel) {
      ctx.setProperty(label, 'data', {
        directiveLabel: true,
        hName: 'p',
        hProperties: { className: ['admonition-title'] },
      });
    } else {
      ctx.prependChild(node, {
        type: 'paragraph',
        data: { hName: 'p', hProperties: { className: ['admonition-title'] } },
        children: [{ type: 'text', value: TYPES.get(node.name) }],
      });
    }
  },

  // 安全网：正文里 :hover 这类裸冒号文本若被当成行内/单行指令，就还原成字面文本，
  // 防止内容被吞（已知 3 处 CSS 选择器已在迁移时包了反引号）
  textDirective(node, ctx) {
    ctx.replaceNode(node, { type: 'text', value: `:${node.name}${ctx.textContent(node)}` });
  },
  leafDirective(node, ctx) {
    ctx.replaceNode(node, {
      type: 'paragraph',
      children: [{ type: 'text', value: `::${node.name}${ctx.textContent(node)}` }],
    });
  },
};
