import { describe, it, expect } from "vitest";

import { buildUserPlanSummary } from "../UserPlanEngine";
import { UserProfile } from "../UserProfile";
import { describe, it, expect } from "vitest";

describe("buildUserPlanSummary", () => {
  it("should generate a valid plan summary for a user with financial challenges", () => {
    // Mock user profile
    const userProfile: UserProfile = {
      name: "Test User",
      monthlyIncome: 4000,
      monthlyExpenses: 3800,
      savings: 2000,
      accounts: [
        { id: 1, type: "checking", balance: 1500 },
        { id: 2, type: "savings", balance: 500 },
        { id: 3, type: "credit", balance: 3000 },
        { id: 4, type: "investment", balance: 0 },
      ],
      emergencyFundTargetMonths: 6,
    };

    // Run the function
    const result = buildUserPlanSummary(userProfile);

    // Assertions
    expect(result.tier).toMatch(/income|liquidity/);
    expect(result.unmetNeeds.length).toBeGreaterThan(0);
    expect(result.behaviorFlags.length).toBeGreaterThan(0);
    expect(result.insight).toMatch(/emergency fund|credit card/);
    expect(result.prompt).toContain("Test User");
  });
});
