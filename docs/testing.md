# Testing

## Tools

| Tool            | Purpose             | Config                 |
| --------------- | ------------------- | ---------------------- |
| Vitest          | Unit + integration  | `vitest.config.ts`     |
| Playwright      | End-to-end          | `playwright.config.ts` |
| Testing Library | Component rendering | Via Vitest setup       |

## Conventions

- **Colocate tests**: `button.tsx` → `button.test.tsx`
- **Test behavior**: Assert what users see, not implementation details
- **Architecture tests**: `src/test/architecture.test.ts` enforces conventions mechanically

## Running Tests

```bash
pnpm test          # All unit + architecture tests
pnpm test:watch    # Watch mode
pnpm e2e           # Playwright end-to-end
pnpm e2e:ui        # Playwright with visual UI
```

## Coverage

- Provider: v8
- Thresholds: 50% (lines, functions, branches, statements)
- Excludes: node_modules, test setup, type definitions, mock files
