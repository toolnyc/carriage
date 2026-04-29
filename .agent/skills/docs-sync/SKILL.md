---
name: docs-sync
description: Sync AGENTS.md content to all editor entry points
user_invocable: true
---

# /docs-sync — Instruction Sync

Sync the authoritative instructions to all editor entry points.

## Files to Sync

- `CLAUDE.md` — Claude Code entry point
- `.cursorrules` — Cursor entry point
- `.windsurfrules` — Windsurf entry point
- `.github/copilot-instructions.md` — GitHub Copilot entry point

## Rules

- `AGENTS.md` is the single source of truth
- All entry points should reference `AGENTS.md`, not duplicate it
- Keep entry points thin — just a pointer and quick reference
- Run `pnpm sync-instructions` if the script exists
