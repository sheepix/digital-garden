# Digital Garden

![Status](https://img.shields.io/badge/status-active-success?style=flat-square)
![Maintainer](https://img.shields.io/badge/maintainer-@sheepix-blue?style=flat-square)
![Stack](https://img.shields.io/badge/built%20with-Astro%20Starlight-orange?style=flat-square)

> A curated space for thoughts, knowledge, and digital exploration.
> **Not a blog, but a garden.**

---

## 1. Project Vision

欢迎来到我的 **Digital Garden**。

与传统的线性博客不同，这个项目遵循 "Digital Gardening" 的理念。在这里，内容不再是以时间为维度的“流”，而是以关联度和成熟度为维度的“网”。

- **Seeds (种子)**: 稍纵即逝的想法，未成形的片段。
- **Saplings (树苗)**: 正在发展中的笔记，可能还在持续迭代。
- **Evergreens (常青树)**: 深度思考后的沉淀，结构完整的知识体系。

这个站点的核心目标是建立一个**公开的第二大脑**，利用现代化的 Web 技术栈，实现知识的零摩擦发布与长期演进。

## 2. Tech Stack

本项目采用 "Documentation-as-Code" 的思路构建，追求极致的性能与极简的维护成本。

| Component | Technology | Reasoning |
| :--- | :--- | :--- |
| **Framework** | [Astro](https://astro.build/) | 零 JS 默认输出，极致的加载速度 (Islands Architecture)。 |
| **Theme Engine** | [Starlight](https://starlight.astro.build/) | 专为文档/知识库设计的 Astro 集成，提供优秀的阅读体验 and 搜索功能。 |
| **Styling** | TailwindCSS | 原子化 CSS，用于实现 Linear/Vercel 风格的精密排版。 |
| **Deployment** | Cloudflare Pages | 全球边缘网络分发，秒级构建与部署。 |
| **CMS** | Obsidian | 本地 Markdown 编辑器，通过 Git 驱动内容更新。 |

## 3. Content Structure

内容目录与 Obsidian 本地仓库结构保持一致，通过路由映射实现无缝展示：

```tree
src/content/docs/
├── stream/           # [Thought Stream]
│   └── ...           # 碎片化想法，类似微博/推特的短内容
├── wiki/             # [Knowledge Base]
│   ├── dev/          # 技术文档与笔记
│   ├── reading/      # 阅读清单与书摘
│   └── design/       # 设计灵感与原则
└── meta/             # [Meta]
    ├── about.md      # 关于我
    └── changelog.md  # 站点变更日志
```

## 4. Roadmap

### Phase 1: Foundation (Current)
- [x] 初始化 Astro Starlight 项目骨架。
- [x] 配置 Cloudflare Pages 自动化部署流程。
- [ ] 完成基础 UI 定制（Linear-style typography, dark mode 微调）。

### Phase 2: Pipeline
- [ ] 建立 Obsidian Vault 与 Git 仓库的同步工作流。
- [ ] 编写自定义 Astro 组件以支持 Callout、Embeds 等富文本增强。

### Phase 3: Enhancement
- [ ] 集成 Giscus 或类似评论系统。
- [ ] 增加 "Graph View" (知识图谱) 可视化组件。
- [ ] SEO 优化与 RSS Feed 生成。

## 5. Workflow: Obsidian Sync

本花园的内容通过 Obsidian 的 `obsidian-git` 插件进行全自动同步。

### 配置步骤
1. 克隆仓库至本地。
2. 使用 Obsidian 打开。
3. 配置 Obsidian Git 插件进行定时同步。
