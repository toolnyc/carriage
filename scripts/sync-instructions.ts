/**
 * Sync instruction entry points to ensure they all reference AGENTS.md.
 *
 * Usage: npx ts-node scripts/sync-instructions.ts
 */

import { writeFileSync } from "fs";
import { join } from "path";

const root = join(__dirname, "..");

const entryPoints = [
  {
    path: ".cursorrules",
    content: `## Carriage — Cursor Instructions

Read \`AGENTS.md\` for the full, authoritative set of instructions.
All conventions, structure, and tooling are documented there.
`,
  },
  {
    path: ".windsurfrules",
    content: `## Carriage — Windsurf Instructions

Read \`AGENTS.md\` for the full, authoritative set of instructions.
All conventions, structure, and tooling are documented there.
`,
  },
  {
    path: ".github/copilot-instructions.md",
    content: `## Carriage — GitHub Copilot Instructions

Read \`AGENTS.md\` for the full, authoritative set of instructions.
All conventions, structure, and tooling are documented there.
`,
  },
];

for (const ep of entryPoints) {
  const fullPath = join(root, ep.path);
  writeFileSync(fullPath, ep.content, "utf-8");
  console.log(`Synced: ${ep.path}`);
}

console.log("Done — all entry points synced.");
