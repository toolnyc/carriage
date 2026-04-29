---
name: session-close
description: End-of-session capture and sentinel cleanup
user_invocable: true
---

# /session-close — End Session

Cleanly end a working session.

## Steps

1. Summarize what was accomplished in this session
2. Note any unfinished work or open questions
3. Clear all sentinels (`feature-active`, `epic-created`, `design-checked`, `verify-passed`)
4. Remind the user to commit if there are uncommitted changes

## Output

Provide a brief session summary:

- **Done**: What was completed
- **Open**: What remains
- **Next**: Suggested next steps
