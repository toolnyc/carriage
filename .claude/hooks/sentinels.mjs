/**
 * Sentinel state machine — manages ephemeral workflow state files.
 *
 * Sentinels live in .claude/state/ (git-ignored) and track where
 * the current session is in the build workflow.
 */

import { existsSync, writeFileSync, unlinkSync, mkdirSync } from "fs";
import { join } from "path";

const STATE_DIR = join(process.cwd(), ".claude", "state");

// Ensure state directory exists
if (!existsSync(STATE_DIR)) {
  mkdirSync(STATE_DIR, { recursive: true });
}

export function has(name) {
  return existsSync(join(STATE_DIR, name));
}

export function set(name) {
  writeFileSync(join(STATE_DIR, name), new Date().toISOString(), "utf-8");
}

export function clear(name) {
  const path = join(STATE_DIR, name);
  if (existsSync(path)) unlinkSync(path);
}

export function clearAll() {
  const sentinels = [
    "epic-created",
    "feature-active",
    "design-checked",
    "verify-passed",
  ];
  sentinels.forEach(clear);
}
