# Architecture & Domain Boundaries

This document defines the system architectural model, core component boundaries, and data flow principles.

## 1. Architecture Overview

```text
[ Client / Admin Console ]
           │
           ▼
[ Axum HTTP / WS Transport Layer ]
           │
           ▼
[ Domain Layer / Dispatcher / Service Logic ]
           │
           ▼
[ Storage Layer (Sqlx / Cache) ]
```

## 2. Layering & Invocation Rules

1. **Transport Layer (`src/server.rs`)**:
   - Handles route mounting, middleware attachment (CORS, Trace, Auth), and HTTP serialization.
   - Strictly prohibited from containing database queries and core business logic.
2. **Domain Service Layer**:
   - Encapsulates business entities, state transitions, and scheduling algorithms.
3. **Storage Layer**:
   - Uses `sqlx` for type-safe asynchronous SQL interactions.
   - Database schema changes are strictly driven by `migrations/NNN_*.sql`.

## 3. Plugin-First Principle

All custom business adaptations (such as dynamic headers, auth decoration, vendor protocol adaptors, and data masking) must be implemented as modular middleware or plugins, never hardcoded into the core data plane.

## 4. Outbound mail (verification codes)

Canonical: `src/mail.rs` (`Mailer`). Register send-code in the Admin UI is not a second mail client.

- **Core never speaks SMTP.** No `lettre`, no local MTA, no product-specific SMTP helper in the data plane.
- `Mailer::from_env()` picks one backend, in this order:
  1. **Cloudflare Email Sending API** when `CF_ACCOUNT_ID` and `CF_EMAIL_TOKEN` are set. Optional `CF_EMAIL_FROM` (default `noreply@example.com`). `POST https://api.cloudflare.com/client/v4/accounts/{account_id}/email/sending/send` with bearer token.
  2. **Generic HTTP** when `MAIL_ENDPOINT` and `MAIL_TOKEN` are set.
  3. **Log fallback** (`Mailer::log()`, `skips_email() == true`) when credentials are missing — local/dev/tests.
- Register step 1 calls product route `POST /api/v1/auth/send-code`. The kit starter **does not** mount that route (`src/server.rs` is `/health` + `/api/v1/ping` only). The product handler must call `Mailer::send_verification_code(to, code)`.
- `send_verify_email` is for magic-link flows. Kit register uses a 6-digit code, not a link.
- Transactional HTML is outside Admin tokens. Do not add `OPENHUB_*` or other product env aliases in the kit.
