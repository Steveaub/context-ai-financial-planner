import { detectBehaviorFlags } from "../BehaviorEngine";
import { UserProfile } from "../UserProfile";
import { describe, it, expect } from "vitest";

describe("detectBehaviorFlags", () => {
  it("should detect 'mental-accounting' for a user with $8,000 in credit card debt and $10,000 in savings", () => {
    const user: UserProfile = {
      accounts: [
        { type: "savings", balance: 10000 },
        { type: "credit", balance: 8000 },
      ],
      monthlyIncome: 0,
      monthlyExpenses: 0,
      savings: 10000,
    };

    const flags = detectBehaviorFlags(user);
    expect(flags).toContain("mental-accounting");
  });

  it("should detect 'lifestyle-creep' for a user earning $6,000/month and spending $5,500/month", () => {
    const user: UserProfile = {
      accounts: [],
      monthlyIncome: 6000,
      monthlyExpenses: 5500,
      savings: 0,
    };

    const flags = detectBehaviorFlags(user);
    expect(flags).toContain("lifestyle-creep");
  });

  it("should detect 'under-saving' for a user earning $7,000/month but with less than $3,000 in savings", () => {
    const user: UserProfile = {
      accounts: [],
      monthlyIncome: 7000,
      monthlyExpenses: 3000,
      savings: 2000,
    };

    const flags = detectBehaviorFlags(user);
    expect(flags).toContain("under-saving");
  });

  it("should detect 'overconfidence' for a user investing heavily but with no emergency savings", () => {
    const user: UserProfile = {
      accounts: [{ type: "investment", balance: 20000 }],
      monthlyIncome: 0,
      monthlyExpenses: 3000,
      savings: 0,
    };

    const flags = detectBehaviorFlags(user);
    expect(flags).toContain("overconfidence");
  });
});
