import { describe, it, expect } from "vitest";
import { execSync } from "child_process";

function grep(pattern: string, path: string): string[] {
  try {
    const result = execSync(
      `grep -rn "${pattern}" ${path} --include="*.ts" --include="*.tsx" || true`,
      { encoding: "utf-8" }
    );
    return result
      .split("\n")
      .filter(Boolean)
      .filter((line) => !line.includes("architecture.test.ts"));
  } catch {
    return [];
  }
}

describe("architecture conventions", () => {
  it("does not use any types", () => {
    const matches = grep(": any", "src/");
    expect(matches).toEqual([]);
  });

  it("does not use inline styles", () => {
    const matches = grep("style={{", "src/").filter((line) => !line.includes(".test."));
    expect(matches).toEqual([]);
  });
});
