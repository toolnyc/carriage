---
name: feature
description: Build a feature from an epic, sets feature-active sentinel
user_invocable: true
---

# /feature — Build from Epic

Build a feature using a planned epic as the guide.

## Steps

1. Accept an epic slug (e.g., `/feature auth-flow`)
2. Read the epic from `.claude/epics/<slug>.md`
3. Set the `feature-active` sentinel (enables file creation in `src/`)
4. Follow the epic's steps to implement the feature
5. Run tests as you go

## Requirements

- An epic must exist (check for `epic-created` sentinel or the epic file)
- Follow the steps in order
- Create tests alongside implementation
- Do not skip steps or add unplanned scope
