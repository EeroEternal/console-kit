# Rust Agentic Skeleton

工业级标准 Rust AI 代理协作架构骨架（Agentic Standard Architecture Skeleton）。

本项目提炼自 **ParaTensor / xrouter** 的核心架构实践，提供开箱即用的：
- **AI 代理多层协作体系**（`AGENTS.md` + `.agents/skills/` + `docs/ai/`）
- **完整视觉设计规范系统**（`docs/design.md` + `docs/design/*` + 语义 Token）
- **Rust 2024 Edition 核心后端基准**（Axum 0.8 + Tokio + Sqlx + Tracing + Tower）
- **React 19 + Tailwind + Radix UI 控制台基准**（`admin/` 目录）
- **一键项目脚手架与现有项目注入脚本**（`init-project.sh`）

---

## 快速指南：如何在新项目中使用？

针对 **「从零创建全新项目」** 与 **「向已有项目中引入本体系」** 两种场景，使用方式如下：

### 场景 A：从零初始化一个全新项目 (Scaffold New Project)

在新项目计划存放的父目录下，运行 `init-project.sh` 脚本：

```bash
# 1. 运行初始化脚本（自动复制全套代码、规范、并重命名包名与初始化全新 git）
/path/to/rust-agentic-sekleton/init-project.sh ../my-new-ai-gateway

# 2. 进入新项目目录
cd ../my-new-ai-gateway

# 3. 验证本地门禁
cargo test
cd admin && npm install && npm run build
```

---

### 场景 B：向已有现有项目中引入 Agent 规范与设计系统 (Adopt into Existing Project)

如果你的项目已经存在代码，只需引入这套 **AI 代理协作规范 + 设计规范**，推荐按需同步以下核心层：

#### 1. 命令行快速同步核心资产
在你的**已有项目根目录**下执行：

```bash
# 假设当前位于你的现有项目根目录下，且骨架仓库位于同级目录
SKELETON_DIR="../rust-agentic-sekleton"

# 1. 引入 AI 协作核心规范薄入口与工程细则
cp "$SKELETON_DIR/AGENTS.md" ./
mkdir -p docs/ai/agents docs/architecture docs/design .agents/skills
cp -r "$SKELETON_DIR/docs/ai/agents/" docs/ai/agents/
cp "$SKELETON_DIR/docs/architecture.md" docs/
cp "$SKELETON_DIR/docs/architecture/module-boundaries.md" docs/architecture/

# 2. 引入全套视觉设计规范 (Visual Design Specification)
cp "$SKELETON_DIR/docs/design.md" docs/
cp -r "$SKELETON_DIR/docs/design/" docs/design/

# 3. 引入通用 Agent Skills (门禁、Review、发版、迁移等)
cp -r "$SKELETON_DIR/.agents/skills/" .agents/skills/
```

#### 2. 对已有项目进行两分钟简单微调
- **微调 `AGENTS.md`**：根据已有项目的实际核心模块名，调整「按需阅读地图」中的 2~3 行索引。
- **配置本地门禁 `.agents/skills/pre-push-local-gates/SKILL.md`**：检查其中的验证命令是否与已有项目的测试/CI 脚本一致。

---

## 核心资产与分层说明

| 目录/文件 | 作用与分层 | 适用场景 |
| :--- | :--- | :--- |
| **`AGENTS.md`** | AI 代理高密度薄入口（常驻上下文 <80 行 / 1200 Tokens 预算，严格零和更新） | 所有项目必选 |
| **`.agents/skills/`** | 领域特定流程与门禁（Token 泄洪阀，按需读取）：<br>• `pre-push-local-gates`：本地全量门禁<br>• `review`：只读 Critic 独立评审流程<br>• `promote-lesson`：经验反思与提炼闭环<br>• `git-stash-safe`：安全 stash 护栏<br>• `release`：发版与多触点验证<br>• `add-sql-migration`：sqlx 迁移脚本规范<br>• `admin-ui-change`：前端设计规范按需引导<br>• `admin-domain-resource`：4 层领域抽象规范 | 所有项目必选 |
| **`docs/design.md`**<br>`docs/design/*` | **全套视觉设计规范体系（Visual Design Specification）**：<br>• 19 条硬性设计纪律<br>• HSL 语义 Token、暗黑模式变量映射表 (`tokens.md`, `colors.md`)<br>• Master-Detail 分栏、防布局跳动、Quiet Selection 规范 (`components.md`, `layout.md`)<br>• 反面模式清单 (`dos-donts.md`) 与设计图集 (`visual-specification.pdf`) | 涉及 Web / Admin UI 项目 |
| **`docs/ai/agents/`** | 工程通用纪律（`engineering.md`, `commit-style.md`, `loop-charter.md`） | 所有项目必选 |
| **`src/` & `admin/`** | 工业级 Rust 2024 后端骨架与 React 19 + Tailwind 控制台模板代码 | 从零初始化新项目 |

---

## 本地门禁与验证

在提交或发起 PR 前，遵循规范在本地运行等效门禁：

```bash
# Rust 后端门禁
cargo fmt --check
cargo clippy --all-targets -- -D warnings
cargo test --workspace

# 前端门禁 (如有 Admin)
cd admin && npm run lint && npm run build
```
