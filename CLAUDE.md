# Carriage — Claude Code Entry Point

> **Read `AGENTS.md` first** — it is the authoritative source for all agents.

## Quick Reference

- `pnpm dev` / `pnpm build` / `pnpm lint` / `pnpm test`
- TypeScript strict, Tailwind only, no `any`, no inline styles
- Path alias: `@/*` → `src/*`

## Build Gate System

Sentinels in `.claude/state/` enforce workflow discipline:

1. `/epic` → plan before building
2. `/feature` → sets `feature-active`, enables file creation in `src/`
3. `/verify` → lint + test + build, sets `verify-passed`
4. `/session-close` → capture learnings, clear sentinels

The pre-tool gate blocks new files in `src/` without `feature-active`.
Quick fixes (< 5 lines, existing files) are exempt.

## Available Skills

- `/epic` — Plan a feature
- `/feature` — Build from an epic
- `/verify` — Full quality gate
- `/design-check` — Component design validation
- `/session-close` — End session cleanly
- `/docs-sync` — Sync instructions to all editor entry points

## Session Workflow

```
Work → /verify → /session-close
```
