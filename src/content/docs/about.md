---
title: 关于这座花园
description: 这座数字花园是什么、怎么来的、怎么逛。
---

## 是什么
把 Obsidian 里打了 `digital-garden` 标签的笔记，同步成一个公开可读的站点。
区别于正式文章，这里的笔记可能是半成品、碎片，会不断被修改。

## 怎么逛
- 左侧按目录浏览全部笔记
- 页面内的双向链接可以跳转到相关笔记
- 页面底部会列出反向链接与标签，方便顺藤摸瓜

## 怎么更新
1. 在 Obsidian 笔记的 frontmatter 里加标签：`tags: [digital-garden]`
2. 本地执行 `npm run sync` 拉取笔记
3. 提交并 push，站点自动重新构建
