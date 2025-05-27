import { UserProfile } from "./UserProfile";

// Placeholder for modeling money biases

export function detectBehaviorFlags(userProfile: UserProfile): string[] {
  const behaviorFlags: string[] = [];

  // Rule: "mental-accounting"
  // Triggered if the user has more than $5,000 in savings but unpaid credit card debt.
  const hasHighSavingsAndDebt =
    userProfile.accounts.some(
      (account) => account.type === "savings" && account.balance > 5000
    ) &&
    userProfile.accounts.some(
      (account) => account.type === "credit" && account.balance > 0
    );
  if (hasHighSavingsAndDebt) {
    behaviorFlags.push("mental-accounting");
  }

  // Rule: "lifestyle-creep"
  // Triggered if the user's expenses are more than 80% of their income.
  const expenseToIncomeRatio =
    userProfile.monthlyExpenses / userProfile.monthlyIncome;
  if (expenseToIncomeRatio > 0.8) {
    behaviorFlags.push("lifestyle-creep");
  }

  // Rule: "under-saving"
  // Triggered if the user earns more than $5,000/month but has less than 1 month of savings.
  const oneMonthSavings = userProfile.monthlyExpenses;
  if (
    userProfile.monthlyIncome > 5000 &&
    userProfile.savings < oneMonthSavings
  ) {
    behaviorFlags.push("under-saving");
  }

  // Rule: "overconfidence"
  // Triggered if the user has investments but no emergency fund.
  const hasInvestments = userProfile.accounts.some(
    (account) => account.type === "investment" && account.balance > 0
  );
  const hasNoEmergencyFund = userProfile.savings < oneMonthSavings;
  if (hasInvestments && hasNoEmergencyFund) {
    behaviorFlags.push("overconfidence");
  }

  return behaviorFlags;
}
