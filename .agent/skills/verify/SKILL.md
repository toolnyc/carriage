---
name: verify
description: Run full lint + test + build quality gate
user_invocable: true
---

# /verify — Quality Gate

Run the full quality gate: lint, test, and build.

## Steps

1. Run `pnpm lint` (ESLint + TypeScript)
2. Run `pnpm test` (Vitest — unit + architecture tests)
3. Run `pnpm build` (Next.js production build)
4. If all three pass, set the `verify-passed` sentinel
5. If any fail, report the failure and do NOT set the sentinel

## On Failure

- Fix the issue
- Re-run `/verify`
- Do not manually set `verify-passed`
