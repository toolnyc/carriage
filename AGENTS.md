# Carriage — Agent Instructions

> **This file is the single source of truth for all AI agents.**
> Claude Code, Cursor, Windsurf, and GitHub Copilot all reference this file.

---

## Tech Stack

| Layer       | Technology                        |
| ----------- | --------------------------------- |
| Framework   | Next.js 16 (App Router)           |
| Language    | TypeScript 5 (strict)             |
| Runtime     | Node 22                           |
| Styling     | Tailwind CSS v4                   |
| Testing     | Vitest + Playwright               |
| Package Mgr | pnpm 9                            |
| Deployment  | Vercel                            |
| CI          | GitHub Actions                    |
| Linting     | ESLint 9 (flat config) + Prettier |

---

## CLI Commands

```bash
pnpm dev              # Local dev server
pnpm build            # Production build
pnpm lint             # ESLint + tsc --noEmit
pnpm test             # Vitest (unit + architecture)
pnpm e2e              # Playwright end-to-end
pnpm test:pre-deploy  # Lint + test gate
```

---

## Project Structure

```
src/
  app/          # Next.js App Router — routes and pages only (thin)
  components/   # React components — presentation layer
    ui/         # Design primitives (button, card, input, etc.)
  lib/          # Shared logic — business rules, data access, utilities
  hooks/        # Client-side React hooks
  types/        # Shared TypeScript types
  styles/       # CSS custom properties and theme tokens
  test/         # Test setup and architecture enforcement
e2e/            # Playwright end-to-end tests
docs/           # Architecture reference
scripts/        # Utility scripts
```

---

## Conventions

### Components

- Server components by default; add `'use client'` only for interactivity
- One component per file, kebab-case filenames
- Tests colocated: `button.tsx` + `button.test.tsx`
- Client page components use `-client` suffix

### Styling

- Tailwind utility classes only — no CSS modules, no inline styles
- Design tokens as CSS custom properties in `styles/tokens.css`
- Long `className` strings broken across lines for readability

### TypeScript

- Strict mode, no `any` types (use `unknown` and narrow)
- Path alias: `@/*` → `src/*`

### Testing

- Test behavior, not implementation
- Architecture tests enforce conventions mechanically
- Colocate tests with source files

### Git

- Branches: `feat/`, `fix/`, `chore/`
- Commits: imperative, lowercase, no trailing period
- PRs target `develop` → `main` for production

---

## Architecture Enforcement (Mechanical)

These are tested in `src/test/architecture.test.ts` — no exceptions:

- No `any` types
- No inline styles (Tailwind only)
- Kebab-case file naming in components

---

## Agentic Build System

### Sentinels (`.claude/state/`, git-ignored)

Ephemeral files that track workflow state:

| Sentinel         | Set by          | Cleared by                    |
| ---------------- | --------------- | ----------------------------- |
| `epic-created`   | `/epic`         | `/feature` (consumed)         |
| `feature-active` | `/feature`      | `/verify` or `/session-close` |
| `design-checked` | `/design-check` | TSX edits                     |
| `verify-passed`  | `/verify`       | Any source edit               |

### Build Gate

The pre-tool gate (`.claude/hooks/pre-tool-gate.mjs`) blocks new file creation
in `src/` without a `feature-active` sentinel. Quick fixes to existing files
(< 5 lines) are exempt.

### Feature Development Flow

```
/epic "describe feature"  →  produces .claude/epics/<slug>.md
/feature <slug>           →  reads epic, sets feature-active, builds
/verify                   →  lint + test + build, sets verify-passed
/session-close            →  captures learnings, clears sentinels
```

---

## Skills Reference

| Skill            | Purpose                                    |
| ---------------- | ------------------------------------------ |
| `/epic`          | Plan feature, produce epic markdown        |
| `/feature`       | Build from epic, sets feature-active       |
| `/verify`        | Full lint + test + build loop              |
| `/design-check`  | Component design validation                |
| `/session-close` | End-of-session capture, clears sentinels   |
| `/docs-sync`     | Sync CLAUDE.md → other editor entry points |

---

## Environment Variables

```bash
# .env.local (git-ignored)
# Add project-specific variables here as needed
```

---

## Platform Constraints

- **Vercel**: Serverless function timeout 300s, Fluid Compute enabled
- **Node 22**: LTS runtime
- **pnpm**: Required — do not use npm or yarn
