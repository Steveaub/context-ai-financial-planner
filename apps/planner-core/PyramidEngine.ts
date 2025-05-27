export function determineFinancialTier(userProfile: UserProfile): {
  tier: "income" | "liquidity" | "investment";
  unmetNeeds: string[];
  nextAction: string;
  contextInsight: string;
} {
  const unmetNeeds: string[] = [];

  // Top Layer – Most Fragile
  // This tier represents users who are struggling with cash flow due to outstanding credit card debt.
  // The focus here is on stabilizing cash flow by reducing high-interest debt.
  const hasOutstandingCredit = userProfile.accounts.some(
    (account) => account.type === "credit" && account.balance > 0
  );
  if (hasOutstandingCredit) {
    unmetNeeds.push("Pay off outstanding credit card balances.");
    return {
      tier: "income",
      unmetNeeds,
      nextAction: "Focus on reducing credit card debt to free up cash flow.",
      contextInsight:
        "Carrying credit card debt makes saving harder and costs you in interest. Start by paying this down.",
    };
  }

  // Middle Layer – Stability Zone
  // This tier focuses on building an emergency fund to provide financial stability.
  // Users in this stage are working towards saving enough to cover unexpected expenses.
  const targetMonths = userProfile.emergencyFundTargetMonths ?? 6;
  const emergencyFundTarget = userProfile.monthlyExpenses * targetMonths;
  const actualMonthsSaved = userProfile.savings / userProfile.monthlyExpenses;

  if (userProfile.savings < emergencyFundTarget) {
    unmetNeeds.push(
      `Build an emergency fund of at least ${targetMonths} months.`
    );

    let insight = "";
    if (actualMonthsSaved < 3) {
      insight =
        "You’ve saved less than 3 months of expenses—this is a good start, but may not be enough if you lose your job.";
    } else if (actualMonthsSaved < 6) {
      insight =
        "You’re making progress on your emergency fund. Most financial planners recommend 6 months of expenses as a solid cushion.";
    } else {
      insight = `You've saved ${Math.round(
        actualMonthsSaved
      )} months of expenses—great progress, but not yet at your chosen target of ${targetMonths} months.`;
    }

    return {
      tier: "liquidity",
      unmetNeeds,
      nextAction:
        "Increase your savings rate until you reach your emergency fund goal.",
      contextInsight: insight,
    };
  }

  // Base Layer – Foundation for Wealth Building
  // This tier is for users who have achieved financial stability and are ready to grow their wealth through investments.
  // The focus here is on optimizing investment strategies and reallocating excess cash.
  if (actualMonthsSaved > 12) {
    return {
      tier: "investment",
      unmetNeeds,
      nextAction:
        "Review your cash holdings—excess cash may be losing value to inflation.",
      contextInsight:
        "You’ve saved over 12 months of expenses. That’s extremely safe, but may reduce long-term returns. Consider reallocating some of it to investment or goal-based savings.",
    };
  }

  return {
    tier: "investment",
    unmetNeeds,
    nextAction: "You’re ready to focus on building long-term wealth.",
    contextInsight:
      "You’ve met your emergency savings goal. Now is a great time to optimize your investment strategy.",
  };

  // This tier framework mirrors real-world financial progression:
  // 1. Stabilize cash flow by addressing high-interest debt (income stage).
  // 2. Build emergency savings to create a financial safety net (liquidity stage).
  // 3. Grow wealth through strategic investments (investment stage).
}
