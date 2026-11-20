---
title: "SLI、SLO 与错误预算"
description: ""
tags: ["digital-garden"]
created: "2026-10-09"
updated: "2026-10-09"
---服务目标把“够可靠”转成可衡量、可协商的标准。

## 官方资料要点

- SLI：定义明确的服务表现指标；SLO：该指标的目标；SLA：带约定后果的服务协议。代理指标与用户体验可能存在差距。[官方原文](https://sre.google/sre-book/service-level-objectives/)
- 错误预算让产品开发与运行团队用共同度量讨论风险和发布速度。[官方原文](https://sre.google/sre-book/embracing-risk/)
- 基于好事件占比的 SLI，预算比例为 `1 − SLO`。目标须获得相关方认可、工程团队认为可实现，并配套预算政策与持续修订流程；否则容易只成为报表。[官方原文](https://sre.google/workbook/implementing-slos/)

## 计算示例与边界

以下为笔记计算示例：同一窗口有 100,000 个有效事件，SLO 为 99.9%，允许 100 个坏事件。需明确有效事件、成功条件、排除项与窗口；请求预算不能直接换算停机分钟。零事件或数据缺失不能默认为 100% 成功。

## 应用建议（非 Google 原文）

先为一个关键步骤形成 SLI 草案和数据口径，再协商阈值及超预算处理。参见 [以用户目标衡量产品可靠性]、[SRE 监控与可行动告警]。

## 来源记录

- [Google SRE 来源 - Service Level Objectives]
- [Google SRE 来源 - Embracing Risk]
- [Google SRE 来源 - Implementing SLOs]
