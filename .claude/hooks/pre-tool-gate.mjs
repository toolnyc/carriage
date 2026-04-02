/**
 * Pre-tool gate — enforces build workflow discipline.
 *
 * Blocks new file creation in src/ without a feature-active sentinel.
 * Quick fixes to existing files (< 5 lines changed) are exempt.
 *
 * Clears verify-passed on any source edit (since the build is now stale).
 */

import { has, clear } from "./sentinels.mjs";
import { existsSync } from "fs";

const input = JSON.parse(process.argv[2] || "{}");
const tool = input.tool_name || "";
const toolInput = input.tool_input || {};

// Determine the file path being acted on
const filePath = toolInput.file_path || toolInput.command || "";

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
