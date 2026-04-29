---
name: epic
description: Plan a feature and produce an epic markdown document
user_invocable: true
---

# /epic — Feature Planning

Plan a feature before building it. Produces a structured epic document.

## Steps

1. Accept a feature description from the user
2. Research the codebase to understand where the feature fits
3. Write a structured epic to `.claude/epics/<slug>.md` with:
   - **Goal**: What the feature accomplishes
   - **Scope**: What's in and out of scope
   - **Files**: Which files will be created or modified
   - **Steps**: Ordered implementation steps
   - **Tests**: What tests are needed
   - **Risks**: Anything that could go wrong
4. Set the `epic-created` sentinel

## Epic Template

```markdown
# Epic: <Title>

## Goal

<What this feature accomplishes>

## Scope

- IN: <what's included>
- OUT: <what's excluded>

## Files

- CREATE: <new files>
- MODIFY: <existing files>

## Steps

1. <step>
2. <step>

## Tests

- <test case>

## Risks

- <risk>
```
