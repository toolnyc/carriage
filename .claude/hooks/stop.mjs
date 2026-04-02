/**
 * Stop hook — runs when a session ends.
 * Warns if sentinels indicate unfinished work.
 */

import { has } from "./sentinels.mjs";

if (has("feature-active") && !has("verify-passed")) {
  console.log(
    "WARNING: feature-active is set but verify-passed is not.\n" +
      "Consider running /verify before ending the session."
  );
}
