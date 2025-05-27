import { buildLLMPromptFromInsight } from "./promptTemplates";
import { describe, it, expect } from "vitest";

describe("buildLLMPromptFromInsight", () => {
  it("should generate a basic prompt with just name and insight", () => {
    const prompt = buildLLMPromptFromInsight(
      "You should focus on reducing debt.",
      "Alex"
    );
    expect(prompt).toMatch(/Hi Alex/);
    expect(prompt).toMatch(/based on your current financial tier/);
    expect(prompt).toMatch(/You should focus on reducing debt\./);
    expect(prompt).toMatch(/What would you like to work on next\?/);
  });

  it("should include the goal or tier if provided", () => {
    const prompt = buildLLMPromptFromInsight(
      "You should focus on reducing debt.",
      "Alex",
      "Stabilize cash flow"
    );
    expect(prompt).toMatch(/Hi Alex/);
    expect(prompt).toMatch(/Your current focus is: Stabilize cash flow\./);
  });

  it("should include behavior flags if provided", () => {
    const prompt = buildLLMPromptFromInsight(
      "You should focus on reducing debt.",
      "Alex",
      undefined,
      ["lifestyle-creep", "mental-accounting"]
    );
    expect(prompt).toMatch(/Hi Alex/);
    expect(prompt).toMatch(
      /We also noticed some patterns in your financial behavior: lifestyle-creep, mental-accounting\./
    );
  });

  it("should include all inputs: name, insight, goal/tier, and behavior flags", () => {
    const prompt = buildLLMPromptFromInsight(
      "You should focus on reducing debt.",
      "Alex",
      "Stabilize cash flow",
      ["lifestyle-creep", "mental-accounting"]
    );
    expect(prompt).toMatch(/Hi Alex/);
    expect(prompt).toMatch(/based on your current financial tier/);
    expect(prompt).toMatch(/You should focus on reducing debt\./);
    expect(prompt).toMatch(/Your current focus is: Stabilize cash flow\./);
    expect(prompt).toMatch(
      /We also noticed some patterns in your financial behavior: lifestyle-creep, mental-accounting\./
    );
    expect(prompt).toMatch(/What would you like to work on next\?/);
  });
});
