---
name: pre-push-local-gates
description: Push 前必须在本地跑满与 CI 等效的门禁(Rust fmt/clippy/tests、admin tsc/lint/vitest),禁止把 CI 当本地沙盒。Use before every git push touching src/, tests/, or admin/.
---

# Pre-push local gates（推送前本地门禁）

## Symptom / misjudgment
把 CI 当本地沙盒:推送后才发现 eslint 未用导入、rustfmt 残差、ENOSPC、测试失败,
形成「推 → 挂 → 本地修 → 再推」的慢循环——污染提交历史、烧掉 runner 配额、
还可能在失败窗口内阻塞他人合入。

## Rule
`git push` 之前,以下命令必须**全部本地通过**(与 `.github/workflows/ci.yml` 等效):

```bash
# Rust
cargo fmt -p xrouter --check
cargo clippy -p xrouter --lib --tests -- -D warnings
cargo test --lib
cargo test --test <本次改动的集成套件>   # 全量改动时逐套件跑完

# Admin(admin/ 目录)
npx tsc -b --noEmit
npm run lint
npx vitest run
```

UI 页面改动另跑对应 e2e spec;`workflow_dispatch` 部署 / 打 tag 前,转入 skill
[`release`](../release/SKILL.md) 执行完整发版流程(三查 + 人工批准硬停)。

## Scope
- 大重构允许中间 commit 不全跑,但 **push 前最后一次提交必须全绿**。
- 本地跑不动整个集成矩阵时,至少覆盖:① 与改动同模块的套件;② 随机抽 1 个
  跨模块套件作哨兵。
- CI 挂了不算完:修复后本地先复现该失败的等价命令并确认通过,再推。
