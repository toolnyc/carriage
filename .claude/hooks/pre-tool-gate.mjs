/**
 * Pre-tool gate — enforces build workflow discipline.
 *
 * 1. Blocks new file creation in src/ without a feature-active sentinel.
 *    Quick fixes to existing files (< 5 lines changed) are exempt.
 * 2. Clears verify-passed on any source edit (since the build is now stale).
 * 3. Blocks documentation files (.md) in the repo — they belong in the
 *    Obsidian vault at ~/Dropbox/Notes/Obsidian/Carriage/
 */

import { has, clear } from "./sentinels.mjs";
import { existsSync } from "fs";
import { resolve } from "path";

const input = JSON.parse(process.argv[2] || "{}");
const tool = input.tool_name || "";
const toolInput = input.tool_input || {};

// Determine the file path being acted on
const filePath = toolInput.file_path || toolInput.command || "";

// --- Gate: docs belong in the Obsidian vault, not the repo ---
const VAULT = resolve(process.env.HOME, "Dropbox/Notes/Obsidian/Carriage");
const repoRoot = process.cwd();

if (
  (tool === "Write" || tool === "Edit") &&
  filePath.endsWith(".md") &&
  filePath.startsWith(repoRoot) &&
  !filePath.includes("/.claude/") &&
  !filePath.endsWith("CLAUDE.md") &&
  !filePath.endsWith("AGENTS.md") &&
  !filePath.endsWith("README.md")
) {
  console.error(
    `BLOCKED: Documentation files belong in the Obsidian vault.\n` +
      `Target: ${VAULT}/\n` +
      `Allowed repo .md files: CLAUDE.md, AGENTS.md, README.md, .claude/**`
  );
  process.exit(1);
}

// Only gate source file operations
const isSourceFile = filePath.includes("/src/");

if (isSourceFile) {
  // Clear verify-passed on any source edit
  clear("verify-passed");

  // Clear design-checked on TSX edits
  if (filePath.endsWith(".tsx")) {
    clear("design-checked");
  }

  // Gate: new files in src/ require feature-active
  if (tool === "Write" && !existsSync(filePath) && !has("feature-active")) {
    console.error(
      "BLOCKED: New files in src/ require an active feature.\n" +
        "Run /epic to plan, then /feature to start building."
    );
    process.exit(1);
  }
}
