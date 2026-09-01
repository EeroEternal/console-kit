# Rust Agentic Skeleton

工业级标准 Rust AI 代理协作架构骨架（Agentic Standard Architecture Skeleton）。

本项目提炼自 **ParaTensor / xrouter** 的核心架构实践，提供开箱即用的：
- **AI 代理多层协作体系**（`AGENTS.md` + `.agents/skills/` + `docs/ai/`）
- **Rust 2024 Edition 核心后端**（Axum 0.8 + Tokio + Sqlx + Tracing + Tower）
- **高信号密度 Admin UI 规范基准**（`docs/design.md` + 4 层领域抽象）
- **一键项目脚手架复制脚本**（`init-project.sh`）

---

## 快速使用：基于本骨架创建新项目

```bash
# 复制骨架到新项目目录并自动替换包名
./init-project.sh ../my-new-ai-gateway

# 进入新项目
cd ../my-new-ai-gateway

# 验证门禁
cargo test
```

---

## 核心架构分层

| 目录/文件 | 作用与分层 |
| :--- | :--- |
| **`AGENTS.md`** | AI 代理高密度薄入口（常驻上下文 <80 行 / 1200 Tokens 预算，严格零和更新） |
| **`.agents/skills/`** | 领域特定流程与门禁（Token 泄洪阀，按需读取）：<br>• `pre-push-local-gates`：本地全量门禁<br>• `review`：只读 Critic 评审流程<br>• `promote-lesson`：经验反思与提炼闭环<br>• `git-stash-safe`：安全 stash 护栏<br>• `release`：发版与 tag promoter<br>• `add-sql-migration`：sqlx 迁移脚本规范 |
| **`docs/ai/agents/`** | 工程通用规范细则（`engineering.md`, `commit-style.md`, `loop-charter.md`） |
| **`docs/architecture.md`** | 系统分层与数据面/控制面边界 |
| **`docs/design.md`** | Admin 控制台设计基准（十六条硬性纪律 + 双语对称 + 语义 Token） |
| **`src/`** | Rust 2024 后端标准结构（`server`, `config`, `error`） |

---

## 本地门禁与验证

在提交或发起 PR 前，必须在本地通过等效门禁：

```bash
cargo fmt --check
cargo clippy --all-targets -- -D warnings
cargo test --workspace
```
