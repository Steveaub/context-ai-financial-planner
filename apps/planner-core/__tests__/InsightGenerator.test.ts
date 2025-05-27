import { describe, it, expect } from "vitest";
import { generateInsight } from "../InsightGenerator";
import { UserProfile } from "../UserProfile";

// Mock determineFinancialTier output type
interface TierData {
  tier: "income" | "liquidity" | "investment";
  unmetNeeds: string[];
  nextAction: string;
  contextInsight: string;
}

describe("generateInsight", () => {
  it('handles users in the "income" tier with credit card debt', () => {
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

    const tierData: TierData = {
      tier: "income",
      unmetNeeds: ["Pay off outstanding credit card balances."],
      nextAction: "Focus on reducing credit card debt to free up cash flow.",
      contextInsight:
        "Carrying credit card debt makes saving harder and costs you in interest. Start by paying this down.",
    };

    const result = generateInsight(user, tierData);
    expect(result).toMatch(/income/);
    expect(result).toMatch(/reducing credit card debt/i);
  });

  it('handles users in the "liquidity" tier with 2 months of savings', () => {
    const user: UserProfile = {
      id: "2",
      name: "Saver",
      age: 32,
      householdSize: 2,
      monthlyIncome: 5000,
      monthlyExpenses: 3000,
      savings: 6000, // 2 months of savings
      accounts: [],
      financialGoals: [],
    };

    const tierData: TierData = {
      tier: "liquidity",
      unmetNeeds: ["Build an emergency fund of at least 6 months."],
      nextAction:
        "Increase your savings rate until you reach your emergency fund goal.",
      contextInsight:
        "You’ve saved less than 3 months of expenses—this is a good start, but there’s more to do.",
    };

    const result = generateInsight(user, tierData);
    expect(result).toMatch(/liquidity/);
    expect(result).toMatch(/less than 3 months/i);
  });

  it('handles users in the "liquidity" tier with 5 months of savings', () => {
    const user: UserProfile = {
      id: "3",
      name: "Almost There",
      age: 40,
      householdSize: 1,
      monthlyIncome: 8000,
      monthlyExpenses: 2500,
      savings: 12500, // 5 months of savings
      accounts: [],
      financialGoals: [],
    };

    const tierData: TierData = {
      tier: "liquidity",
      unmetNeeds: ["Build an emergency fund of at least 6 months."],
      nextAction:
        "Increase your savings rate until you reach your emergency fund goal.",
      contextInsight:
        "You’re making great progress on your emergency fund. Keep going to reach 6 months of savings.",
    };

    const result = generateInsight(user, tierData);
    expect(result).toMatch(/liquidity/);
    expect(result).toMatch(/great progress/i);
  });

  it('handles users in the "investment" tier with more than 12 months saved', () => {
    const user: UserProfile = {
      id: "4",
      name: "Investor",
      age: 50,
      householdSize: 2,
      monthlyIncome: 10000,
      monthlyExpenses: 4000,
      savings: 50000, // More than 12 months of savings
      accounts: [],
      financialGoals: [],
    };

    const tierData: TierData = {
      tier: "investment",
      unmetNeeds: [],
      nextAction:
        "Review your cash holdings—excess cash may be losing value to inflation.",
      contextInsight:
        "You’ve saved over 12 months of expenses. That’s extremely safe, but may reduce long-term returns.",
    };

    const result = generateInsight(user, tierData);
    expect(result).toMatch(/investment/);
    expect(result).toMatch(/over 12 months/i);
  });
});
