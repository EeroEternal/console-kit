# Admin UI kit

Copied from xrouter `admin/src/components/ui` + tokens in `src/index.css`.

This is the **vocabulary** `docs/design.md` binds to. Agents must implement product UI here (React), never as Greenfield HTML.

Sidebar entries live in `src/lib/nav.ts`. Add a page = add a nav item + `pages/*.tsx` + a route in `App.tsx`. Do not invent a second menu.

```bash
cd admin && npm install && npm run dev
```
