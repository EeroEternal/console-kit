---
name: release
description: 发版（打 tag）完整 promoter 流程：本地门禁全量重跑、发版三查（版本号/changelog/帮助中心四触点/文档生命周期）、人工批准硬停、tag 部署与验证。Use before cutting any vX.Y.Z tag or running a production deploy.
---

# Release（发版 promoter 流程）

## Symptom / misjudgment
`v*` tag push 直通生产部署（`deploy-xgateway-cn.yml` 由 tag 触发），而发版知识散落在
AGENTS.md、pre-push-local-gates 与个人记忆中。真实后果：v3.14.0–v3.15.2 连续四个版本
漏更新帮助中心「最新版本」横幅（`help.recentUpdatesTitle` 停在 v3.13.0），用户看到的
版本说明落后实际版本四档。**工作未完成，直到被正确地传达出去。**

## Procedure

### Phase 0 门禁（tag 前全量重跑）
按 skill [`pre-push-local-gates`](../pre-push-local-gates/SKILL.md) 全量执行（fmt /
clippy / `cargo test --lib` + 改动套件 / admin tsc + lint + vitest）。tag 即生产部署，
不允许只跑增量。

### Phase 1 发版三查（逐项勾选）
1. **版本号一致**：`Cargo.toml` 与 `crates/xr/Cargo.toml` 同步改为目标版本，`cargo
   check` 刷新 `Cargo.lock`（admin/package.json 版本独立演进，不随发版）。
2. **changelog 转正**：`docs/changelog.md` 的 `## [Unreleased]` 改为
   `## [X.Y.Z] - <当日日期>`，其上重建空的 `## [Unreleased]`。
3. **帮助中心四触点**（`admin/src/lib/i18n/locales/zh.ts` 与 `en.ts` 双语同步）：
   - `help.docsSections.changelog.summary`：以新版本开头的一行摘要；
   - `help.docsSections.changelog.content`：头部插入新版块（`### vX.Y.Z (日期)`）；
   - `help.recentUpdatesTitle` / `recentUpdatesSummary`：「最新版本」横幅；
   - 本版次用户可见新功能 ↔ `docsSections` 对应章节或 `docs/manual/` 的对应关系，缺则补。
4. **文档生命周期**：跑 `scripts/check_docs_lifecycle.sh`，逐项裁决其输出（删落地草案 /
   归位常设引用），已裁决保留项更新脚本内白名单。

机械检查（应零差异通过）：

```bash
scripts/check_release_sync.sh
scripts/check_docs_lifecycle.sh
```

### Phase 2 硬停：人工批准
向用户逐项汇报三查结果（含两个机械检查的输出），**获得明确批准前不得打 tag**
（AGENTS.md 站立约束 5：未经用户明确批准严禁发版打 Tag）。

### Phase 3 bump / tag / 部署
bump commit 只含三查产物，不得夹带功能代码；tag 打在 bump commit 上：

```bash
git commit -m "chore(release): bump version to vX.Y.Z"
git tag vX.Y.Z
git push origin main vX.Y.Z     # tag 触发 deploy-xgateway-cn.yml
gh run list --workflow deploy-xgateway-cn.yml --limit 1   # 确认部署绿
```

部署后人工核对线上 Admin 帮助中心横幅与版本动态页。

### Phase 4 事后
无——homebrew 分发线已于 2026-08-29 退役（tap 停止更新，无分发产物流水线）。
若未来重启 brew 分发，需先建 tag 触发的产物构建工作流，再恢复本节。

## Scope
- 仅在用户明确要求发版时进入本 skill；`workflow_dispatch` 手动部署同样执行 Phase 0–2。
- 本 skill 不覆盖版本号选择；语义化版本由用户或 changelog 条目规模决定。
