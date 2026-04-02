/**
 * Session start hook — runs on session init.
 * Ensures state directory exists and reports current sentinel state.
 */

import { has } from "./sentinels.mjs";

const sentinels = ["epic-created", "feature-active", "design-checked", "verify-passed"];
const active = sentinels.filter(has);

if (active.length > 0) {
  console.log(`# Active sentinels: ${active.join(", ")}`);
} else {
  console.log("# Clean session — no active sentinels");
}
