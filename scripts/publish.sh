#!/usr/bin/env bash
# 同步 Obsidian 笔记 -> 提交 -> 推送（push 后由 CI/Cloudflare Pages 自动部署）
set -euo pipefail
cd "$(dirname "$0")/.."

npm run sync

if [ -z "$(git status --porcelain)" ]; then
  echo "[publish] 没有变化，跳过"
  exit 0
fi

git add -A
git commit -m "garden: sync notes $(date '+%Y-%m-%d %H:%M')"
git push origin main
echo "[publish] 已推送，等待站点重新构建"
