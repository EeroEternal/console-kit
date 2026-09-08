# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Write bullets that a human can ship from: **what changed**, **who it affects**, **breaking or not**.
Do not paste commit titles, `misc`, or empty sections.

## [Unreleased]

### Added

- **User menu** (top-right after login): 32px avatar dropdown. Settings navigates to `/settings` (does not inline the Settings form). Logout clears the session and returns to `/login`. Change-own-password stays a user-menu Dialog when the product has local passwords. Spec: `docs/design/layout.md` → User menu.
- **Agent docs**: public Markdown (`/llms.txt`, `/docs/guide.md`) plus HTML `/help` that renders the same files. Login footer may link “Agent guide”; do not print raw paths on the branding panel. Spec: `docs/design/agent-docs.md`.

## [0.2.0] - 2026-09-07

### Added

- **Auth split login/register** (Admin `/login`, `/register`): xrouter-style full-height left branding + right form card, outside the sidebar shell. Login is email + password. Register is three steps in the same card — (1) email → send code, (2) code only, (3) password + confirm — not one tiled form. Left-panel copy is product-specific via `auth.productName` / `auth.branding*` / `auth.stat*`. Public auth routes stay out of `nav.ts`.
- **Outbound mail (`Mailer`)** in `src/mail.rs`: Cloudflare Email Sending first (`CF_ACCOUNT_ID`, `CF_EMAIL_TOKEN`, optional `CF_EMAIL_FROM`), then generic HTTP (`MAIL_ENDPOINT` / `MAIL_TOKEN`), then log fallback for local/tests. Core never speaks SMTP. Kit `server.rs` does not mount auth routes; the product handler for `POST /api/v1/auth/send-code` must call `Mailer::send_verification_code`.
- **Release changelog rule**: `docs/changelog.md` is Keep a Changelog + SemVer. Notable work lands under `[Unreleased]`; cutting `vX.Y.Z` promotes that section. Skill `release` rejects title-only or empty notes.

### Changed

- Auth form fields use shared `Input` / `Label` / `Button` (40px). Do not restyle to `h-12`, `rounded-xl`, `tracking-widest`, or `text-base`.
- Left branding headline is `text-3xl font-semibold` (not `text-5xl` / `font-bold`). Form title stays `text-page-title`.

### Fixed

- Verification-code placeholder no longer uses `tracking-widest`, which letter-spaced `6-digit code`.
- Auth layout no longer hardcodes the OpenHub product name.

### Removed

- **Breaking:** `Mailer::from_env()` no longer reads `OPENHUB_CF_*` or `OPENHUB_MAIL_*`. Use `CF_ACCOUNT_ID`, `CF_EMAIL_TOKEN`, `CF_EMAIL_FROM`, `MAIL_ENDPOINT`, and `MAIL_TOKEN`.
