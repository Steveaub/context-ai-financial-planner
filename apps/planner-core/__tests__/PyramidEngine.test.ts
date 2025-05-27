import { describe, it, expect } from "vitest";
import { determineFinancialTier } from "../PyramidEngine";
import { UserProfile } from "../UserProfile";

describe("PyramidEngine", () => {
  it('returns "income" tier if user has credit card debt', () => {
    const user: UserProfile = {
      id: "1",
      name: "Debt User",
      age: 30,
      householdSize: 1,
      monthlyIncome: 4000,
      monthlyExpenses: 2000,
      savings: 1000,
      accounts: [{ id: "c1", type: "credit", balance: 1200 }],
      financialGoals: [],
    };

    const result = determineFinancialTier(user);
    expect(result.tier).toBe("income");
    expect(result.unmetNeeds[0]).toMatch(/credit card/i);
  });

  it('returns "liquidity" if emergency fund is under 3 months', () => {
    const user: UserProfile = {
      id: "2",
      name: "Saver",
      age: 32,
      householdSize: 2,
      monthlyIncome: 5000,
      monthlyExpenses: 3000,
      savings: 500, // Less than 1 month
      accounts: [],
      financialGoals: [],
    };

    const result = determineFinancialTier(user);
    expect(result.tier).toBe("liquidity");
    expect(result.contextInsight).toMatch(/less than 3 months/i);
  });

  it('returns "investment" when over 12 months of savings', () => {
    const user: UserProfile = {
      id: "3",
      name: "Over Saver",
      age: 40,
      householdSize: 1,
      monthlyIncome: 8000,
      monthlyExpenses: 2500,
      savings: 40000, // 16 months of expenses
      accounts: [],
      financialGoals: [],
    };

    const result = determineFinancialTier(user);
    expect(result.tier).toBe("investment");
    expect(result.contextInsight).toMatch(/over 12 months/i);
  });

  it("respects custom emergency fund targets", () => {
    const user: UserProfile = {
      id: "4",
      name: "Custom Target",
      age: 28,
      householdSize: 1,
      monthlyIncome: 4500,
      monthlyExpenses: 3000,
      savings: 9000, // Updated to match 3-month target
      emergencyFundTargetMonths: 3,
      accounts: [],
      financialGoals: [],
    };

    const result = determineFinancialTier(user);
    expect(result.tier).toBe("investment");
    expect(result.contextInsight).toMatch(/met your emergency savings goal/i);
  });
});
