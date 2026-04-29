---
name: design-check
description: Validate component design patterns and conventions
user_invocable: true
---

# /design-check — Component Design Validation

Review components for design pattern compliance.

## Checks

1. **Server-first**: Components are server components unless `'use client'` is needed
2. **Single responsibility**: One component per file
3. **Naming**: Kebab-case filenames, PascalCase exports
4. **Styling**: Tailwind utility classes only — no inline styles, no CSS modules
5. **Accessibility**: Semantic HTML, proper ARIA attributes
6. **TypeScript**: No `any` types, proper prop typing

## Steps

1. Identify all changed or new `.tsx` files
2. Review each against the checks above
3. Report any violations
4. If all pass, set the `design-checked` sentinel
