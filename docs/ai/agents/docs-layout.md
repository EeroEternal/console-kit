# Documentation Layout & Lifecycle

This document describes the structure and lifecycle of the `docs/` tree.

## Directory Structure

- `docs/architecture.md`: High-level system architecture and domain models.
- `docs/design.md`: Single source of truth for UI/UX design specifications.
- `docs/design/`: Detailed design chapters (tokens, colors, typography, layout, components).
- `docs/changelog.md`: Keep a Changelog + SemVer. Notable work lands in `[Unreleased]`; a version cut promotes that section. Rules: skill [`release`](../../../.agents/skills/release/SKILL.md).
- `docs/ai/agents/`: Engineering guidelines, commit standards, and agent governance.

Current version and recent work: `Cargo.toml` + `git log` + `docs/changelog.md`. Do not keep a second project-status snapshot.

## Document Lifecycle Discipline

1. **No Phantom Capabilities**: Never document skeleton-only or hypothetical features as ready.
2. **Deterministic Verification**: SQL schemas and code snippets inside documentation must be executable and verified.
3. **Landed work**: write the conclusion into `docs/changelog.md` (and a stable entry if needed), then delete the stale draft. Do not leave “done” proposals as the source of truth.
