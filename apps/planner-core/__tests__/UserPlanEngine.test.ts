import { describe, it, expect } from "vitest";

import { buildUserPlanSummary } from "../UserPlanEngine";
import { UserProfile } from "../UserProfile";

describe("buildUserPlanSummary", () => {
  it("should generate a valid plan summary for a user with financial challenges", () => {
    // Mock user profile
    const userProfile: UserProfile = {
      id: "test-user-1",
      name: "Test User",
      age: 30,
      householdSize: 1,
      monthlyIncome: 4000,
      monthlyExpenses: 3800,
      savings: 2000,
      accounts: [
        { id: "1", type: "checking", balance: 1500 },
        { id: "2", type: "savings", balance: 500 },
        { id: "3", type: "credit", balance: 3000 },
        { id: "4", type: "investment", balance: 0 },
      ],
      financialGoals: [
        {
          id: "goal-1",
          type: "debt",
          targetAmount: 5000,
          currentProgress: 2000,
          customLabel: "Pay off credit card debt",
        },
        {
          id: "goal-2",
          type: "custom",
          targetAmount: 10000,
          currentProgress: 500,
          customLabel: "Build emergency fund",
        },
      ],
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
