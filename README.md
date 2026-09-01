# Rust Agentic Skeleton

An industrial-grade standard architecture skeleton and AI agent collaboration system for Rust projects.

This repository provides a clean, robust foundation for high-performance backend services, a complete enterprise visual design specification for operator consoles, and self-regulating AI agent workflows.

---

## ⚡ Key Highlights

- **Multi-Tier AI Agent Collaboration**: Lightweight `AGENTS.md` system entry (<80 lines / 1200 tokens budget) with zero-sum updates to eliminate hallucinations and piggybacking.
- **Token-Efficient Skills System**: Domain workflows, local quality gates, and safety procedures separated into `.agents/skills/` (read on demand).
- **Enterprise Visual Design Specification**: `docs/design/` is **judgment** (reader jobs, named anti-patterns). It only binds if a React kit exists (`admin/` or `frontend/`). This skeleton ships **backend only** — UI tasks must scaffold the kit first (`scripts/check_ui_stack.sh` fail-closes Greenfield HTML).
- **Modern Rust 2024 Backend**: High-performance Axum 0.8 + Tokio + Sqlx + Tracing + Tower baseline with verified health checks.
- **1-Click Project Replication**: Automated scaffolding script (`init-project.sh`) for new projects and effortless injection into existing ones.

---

## 🚀 Quick Start

### Scenario A: Scaffold a Brand-New Project

Run the scaffolding script with your target directory:

```bash
# 1. Initialize your new project (copies files, updates crate names, inits fresh git)
/path/to/rust-agentic-sekleton/init-project.sh ../my-new-project

# 2. Enter the new project
cd ../my-new-project

# 3. Verify local quality gates
cargo test
```

---

### Scenario B: Adopt into an Existing Project

If you already have an existing project and want to adopt the AI agent collaboration system and visual design specifications, copy the core assets into your repository:

```bash
# From your existing project root directory:
SKELETON_DIR="/path/to/rust-agentic-sekleton"

# 1. Copy agent standing rules and engineering guidelines
cp "$SKELETON_DIR/AGENTS.md" ./
mkdir -p docs/ai/agents docs/architecture docs/design .agents/skills
cp -r "$SKELETON_DIR/docs/ai/agents/" docs/ai/agents/
cp "$SKELETON_DIR/docs/architecture.md" docs/
cp "$SKELETON_DIR/docs/architecture/module-boundaries.md" docs/architecture/

# 2. Copy the complete Visual Design Specification
cp "$SKELETON_DIR/docs/design.md" docs/
cp -r "$SKELETON_DIR/docs/design/" docs/design/

# 3. Copy standard agent skills and CI workflow
cp -r "$SKELETON_DIR/.agents/skills/" .agents/skills/
mkdir -p .github/workflows && cp "$SKELETON_DIR/.github/workflows/ci.yml" .github/workflows/
```

**Post-adoption adjustments (2 minutes):**
1. Check `AGENTS.md` and adjust the **Agent Reading Map** to match your project's domain modules.
2. Confirm the gate commands in `.agents/skills/pre-push-local-gates/SKILL.md` match your build targets.

---

## 🏛️ Architecture & Knowledge Tiering

| Directory / File | Tier & Purpose | Scope |
| :--- | :--- | :--- |
| **`AGENTS.md`** | **Standing Constraints & Route Map**: Lightweight agent entry (<80 lines / 1200 tokens budget). Enforces strict anti-hallucination and anti-piggybacking rules. | All Projects |
| **`.agents/skills/`** | **Reusable Workflows (Token Relief Valve)**:<br>• `pre-push-local-gates`: Full local verification before push<br>• `review`: Read-only critic review process<br>• `promote-lesson`: Rigorous lesson extraction & promotion<br>• `git-stash-safe`: Safe stash without dropping lockfiles<br>• `release`: Multi-touchpoint release promoter with hard approval stop<br>• `add-sql-migration`: Embedded Sqlx migration standards<br>• `admin-ui-change`: On-demand guidance for UI work<br>• `admin-domain-resource`: 4-tier domain abstraction | All Projects |
| **`docs/design.md`**<br>`docs/design/*` | **Visual Design Specification**: Complete UI baseline including 19 hard rules, semantic HSL tokens (`tokens.md`), layout stability (`layout.md`), quiet selection, and anti-patterns (`dos-donts.md`). | Web / Admin UI Projects |
| **`docs/ai/agents/`** | **General Engineering Guidelines**: Commit styles (`commit-style.md`), async safety and subprocess conventions (`engineering.md`), autonomous loop governance (`loop-charter.md`). | All Projects |
| **`src/`** | **Starter Codebase**: Rust 2024 Axum backend baseline with `/health` and `/api/v1/ping` endpoints. | New Projects |

---

## 🛡️ Verification & Local Quality Gates

Before pushing or submitting PRs, all changes must pass local gates equivalent to CI:

```bash
# Rust backend quality gate
cargo fmt --check
cargo clippy --all-targets -- -D warnings
cargo test --workspace
```

---

## 📄 License

Apache-2.0 / MIT.
