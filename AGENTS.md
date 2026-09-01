# AGENTS.md — 代码代理协作规范

本文档是本仓库所有代码代理（AI Agent）的**高密度薄入口（注意力引导权重）**。目的是消灭幻觉、阻止夹带、保证 PR/commit 可复现。细则按主题拆在 [`docs/ai/agents/`](docs/ai/agents/) 与 `.agents/skills/`；**不要默认把所有分章读进上下文**。

## 元知识分层与预算纪律

| 层级 | 放什么 | 入口 |
| --- | --- | --- |
| 站立约束 | 跨任务始终成立的禁止项与必须项 | 本文件「始终生效」；展开见 [`docs/ai/agents/`](docs/ai/agents/) |
| 可复用流程 | 领域特定流程、步骤与验证命令（Token 泄洪阀） | `.agents/skills/*/SKILL.md`（唯一权威） |
| 厂商/环境薄桥 | 某工具或 Cloud VM 差异 | [`docs/ai/`](docs/ai/)（不得另起根文件分叉本规范） |
| 领域规范 | UI / 架构 / 数据抽象 | [`docs/design.md`](docs/design.md) + [`docs/architecture.md`](docs/architecture.md) |

- **Token 预算与零和更新**：本文件作为常驻系统权重，硬性体积上限为 **80 行 / 1200 Tokens**。接近上限时遵循**零和置换（进一退一）**。
- **反轶事与批处理门槛**：严禁因单次偶发会话失误随意追加全局规则。新规则提炼须满足 **≥ 2 个独立会话 Transcript 重复出现**，且经 skill [`promote-lesson`](.agents/skills/promote-lesson/SKILL.md) 提炼并由人类审核确认。

## 按需阅读地图

| 任务信号 | 必读入口 |
| --- | --- |
| Admin UI / 可见样式 / 交互组件 / i18n 文案 | skill [`admin-ui-change`](.agents/skills/admin-ui-change/SKILL.md) → [`docs/design.md`](docs/design.md)；细则 [`ui-entry.md`](docs/ai/agents/ui-entry.md) |
| Admin 领域模块新增 / 迁移 / API 契约分层 | skill [`admin-domain-resource`](.agents/skills/admin-domain-resource/SKILL.md) |
| `git stash` 操作 | skill [`git-stash-safe`](.agents/skills/git-stash-safe/SKILL.md) |
| 新增 SQL 迁移 (`migrations/NNN_*.sql`) | skill [`add-sql-migration`](.agents/skills/add-sql-migration/SKILL.md) |
| 写 `docs/` 设计稿 / DDL 验证 / Mermaid | skill [`verify-design-doc`](.agents/skills/verify-design-doc/SKILL.md) |
| 发版 / 打 tag / 生产部署 | skill [`release`](.agents/skills/release/SKILL.md) |
| 代码评审 / PR 复核 / 完成验收 | skill [`review`](.agents/skills/review/SKILL.md)（独立只读上下文） |
| 自主循环 / 定时任务（loop） | [`loop-charter.md`](docs/ai/agents/loop-charter.md) |
| `tokio::spawn` / daemon / 脚本改码 / 夹带变更 / 管道退出码 | [`engineering.md`](docs/ai/agents/engineering.md) |
| Commit message 规范 | [`commit-style.md`](docs/ai/agents/commit-style.md) |
| 跨模块边界 / 抽 crate / 跨模块 SQL join | [`module-boundaries.md`](docs/architecture/module-boundaries.md) |

## 始终生效（最高站立约束）

1. **禁止夹带**：commit/PR 不得夹带无关改动；生产调参、整库 fmt、无说明的 `#[allow]`、跨模块顺手 refactor 一律违规；违规则 `git reset --mixed HEAD~1` 拆分。
2. **禁止幻觉代码**：有定义必有调用；cache 字段必有 store；metric 正反双向；`TODO` 必挂 issue。设计文档严禁把仅有骨架的实现、不存在的字段当作既有能力引用。
3. **安全 stash**：诚实命名；stash 前 `git diff --stat`；stash 后必 `cargo check --tests`；严禁 stash `Cargo.toml` / `Cargo.lock` / 构建脚本。
4. **发布护栏**：本地闭环验证后向用户说明；**未经用户明确批准，严禁合并 main 分支或发版打 Tag**。
5. **UI 弹窗视口与布局边界**：弹窗最大宽高严格限制 `max-h-[85vh]` 并内嵌 `overflow-y-auto`；长内容与次要信息使用折叠栏或标签页组织，禁止平铺撑爆视口。全局配置只进 Admin「设置」页。
6. **Admin i18n 与语言纯洁性**：用户可见文案全部走 `t('namespace.key')` 并同步写入 `zh.ts` 与 `en.ts`；**严禁中英混杂**（除标准术语如 API Key / HTTP / JSON 外，禁止在中文后附加括号英文）。
7. **列表排序与检索一致性**：实体列表排序选项必须标明方向（如「创建时间（新→旧）」）；检索框 placeholder 必须真实准确说明可搜字段。
8. **核心面与扩展插件边界**：业务特定定制（鉴权装饰、脱敏、私有 header 等）**必须优先作为 Plugin/Middleware 实现**，禁止在核心数据流主干硬编码私有分支。
9. **发版 promoter 流程**：打 tag /发版必须走 skill [`release`](.agents/skills/release/SKILL.md)（门禁全量重跑 → 发版多重触点检查 → 人工批准硬停 → tag 部署验证）。
10. **Push 前本地门禁**：禁止把 CI 当本地沙盒；推送前按 skill [`pre-push-local-gates`](.agents/skills/pre-push-local-gates/SKILL.md) 本地跑满等效门禁（fmt/clippy/tests/admin），全绿才推。

## Skills 索引

权威 skill 统一放置于 `.agents/skills/`。

- [`git-stash-safe`](.agents/skills/git-stash-safe/SKILL.md)
- [`add-sql-migration`](.agents/skills/add-sql-migration/SKILL.md)
- [`promote-lesson`](.agents/skills/promote-lesson/SKILL.md)
- [`admin-ui-change`](.agents/skills/admin-ui-change/SKILL.md)
- [`admin-domain-resource`](.agents/skills/admin-domain-resource/SKILL.md)
- [`verify-design-doc`](.agents/skills/verify-design-doc/SKILL.md)
- [`pre-push-local-gates`](.agents/skills/pre-push-local-gates/SKILL.md)
- [`release`](.agents/skills/release/SKILL.md)
- [`review`](.agents/skills/review/SKILL.md)
