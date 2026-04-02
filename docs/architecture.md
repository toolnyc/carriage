# Architecture

## Directory Layout

```
src/
  app/          Routes and pages — thin, delegates to lib/ and components/
  components/   Presentation layer — React components organized by domain
    ui/         Design primitives (button, card, input, modal, etc.)
  lib/          Business logic, data access, utilities
  hooks/        Client-side React hooks
  types/        Shared TypeScript type definitions
  styles/       CSS custom properties and theme tokens
  test/         Test setup and architecture enforcement
```

## Principles

1. **Server-first**: Components are React Server Components by default
2. **Thin routes**: `app/` contains routing only — logic lives in `lib/`
3. **Domain organization**: Group by domain, not by technical layer
4. **Colocated tests**: Tests live next to the code they test
5. **Mechanical enforcement**: Conventions are tested, not just documented

## Import Rules

- `app/` may import from `components/`, `lib/`, `hooks/`, `types/`
- `components/` may import from `lib/`, `hooks/`, `types/`, `components/ui/`
- `lib/` may import from `types/` only
- `hooks/` may import from `lib/`, `types/`
- No circular dependencies

## Styling

- Tailwind utility classes exclusively
- Design tokens as CSS custom properties in `styles/tokens.css`
- No CSS modules, no styled-components, no inline styles
