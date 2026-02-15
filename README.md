# Digital Garden

![Status](https://img.shields.io/badge/status-active-success?style=flat-square)
![Maintainer](https://img.shields.io/badge/maintainer-@sheepix-blue?style=flat-square)
![Stack](https://img.shields.io/badge/built%20with-Astro%20Starlight-orange?style=flat-square)
![CDT Enabled](https://img.shields.io/badge/managed%20by-CDT%20Team-blueviolet?style=flat-square)

> A curated space for thoughts, knowledge, and digital exploration.
> **Not a blog, but a garden.**

---

## 1. Project Vision

欢迎来到我的 **Digital Garden**。

与传统的线性博客不同，这个项目遵循 "Digital Gardening" 的理念。在这里，内容不再是以时间为维度的“流”，而是以关联度和成熟度为维度的“网”。

- **Seeds (种子)**: 稍纵即逝的想法，未成形的片段。
- **Saplings (树苗)**: 正在发展中的笔记，可能还在持续迭代。
- **Evergreens (常青树)**: 深度思考后的沉淀，结构完整的知识体系。

这个站点的核心目标是建立一个**公开的第二大脑**，由 **CDT (ClawDev Team)** 协同驱动，实现知识的零摩擦发布与长期演进。

## 2. Tech Stack

本项目采用 "Documentation-as-Code" 的思路构建，追求极致的性能与极简的维护成本。

| Component | Technology | Reasoning |
| :--- | :--- | :--- |
| **Framework** | [Astro](https://astro.build/) | 零 JS 默认输出，极致的加载速度 (Islands Architecture)。 |
| **Theme Engine** | [Starlight](https://starlight.astro.build/) | 专为文档/知识库设计的 Astro 集成，提供优秀的阅读体验。 |
| **Styling** | TailwindCSS | 原子化 CSS，用于实现精密排版。 |
| **Deployment** | Cloudflare Pages | 全球边缘网络分发，秒级构建与部署。 |
| **Automation** | **OpenClaw CDT** | 由 TechLead & Librion 协同完成从云端 Vault 到 Git 的自动化同步。 |

## 3. Content Structure

内容目录与云端（Obsidian/Notion）仓库结构保持一致，通过路由映射实现无缝展示：

```tree
src/content/docs/
├── stream/           # [Thought Stream] 碎片化想法
├── wiki/             # [Knowledge Base]
│   ├── dev/          # 技术文档与笔记
│   ├── reading/      # 阅读清单与书戴
│   └── design/       # 设计灵感与原则
└── meta/             # [Meta] 站点元信息
```

## 4. Roadmap

### Phase 1: Foundation (Complete)
- [x] 初始化 Astro Starlight 项目骨架。
- [x] 配置 Cloudflare Pages 自动化部署。
- [x] 基础 UI 定制（Linear-style typography）。

### Phase 2: Pipeline (Current)
- [x] **CDT Sync Workflow**: 实现通过 Librion 自动检索并同步云端笔记。
- [ ] **ClawCollector**: 浏览器内容采集插件开发中。
- [ ] 编写自定义 Astro 组件支持 WikiLinks。

### Phase 3: Enhancement
- [ ] 增加 "Graph View" (知识图谱) 可视化组件。
- [ ] 集成 Giscus 评论系统。
- [ ] SEO 优化与 RSS Feed。

## 5. Workflow: CDT Managed

本花园内容现在由 **CDT (ClawDev Team)** 托管：
1. **采集**: 通过 **ClawCollector** 插件或直接发送标题给 Librion。
2. **检索**: **Librion** 从 Google Drive / Notion 提取 Markdown 原文。
3. **发布**: **TechLead** (Titan) 自动提交并由 Cloudflare 完成部署。
