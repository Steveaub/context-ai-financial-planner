import { UserProfile } from "./UserProfile";
import { determineFinancialTier } from "./PyramidEngine";

/**
 * Generates a natural-language insight based on the user's financial tier and profile.
 *
 * @param userProfile - The user's financial profile.
 * @param tierData - The output of determineFinancialTier, including tier, unmetNeeds, nextAction, and contextInsight.
 * @returns A motivational and empathetic summary of the user's financial situation and next steps.
 */
export function generateInsight(
  userProfile: UserProfile,
  tierData: {
    tier: "income" | "liquidity" | "investment";
    unmetNeeds: string[];
    nextAction: string;
    contextInsight: string;
  }
): string {
  const { tier, unmetNeeds, nextAction, contextInsight } = tierData;

  let progressMessage = "";

  // Calculate progress based on emergency fund savings vs. expenses
  const monthsSaved = userProfile.savings / userProfile.monthlyExpenses;
  if (tier === "liquidity") {
    if (monthsSaved < 3) {
      progressMessage =
        "You’ve saved less than 3 months of expenses—this is a good start, but there’s more to do.";
    } else if (monthsSaved < 6) {
      progressMessage =
        "You’re making great progress on your emergency fund. Keep going to reach 6 months of savings.";
    } else {
      progressMessage = `You’ve saved ${Math.round(
        monthsSaved
      )} months of expenses—almost there!`;
    }
  } else if (tier === "investment") {
    progressMessage =
      "You’ve built a solid foundation. Now is a great time to focus on growing your wealth.";
  } else if (tier === "income") {
    progressMessage =
      "Reducing high-interest debt will free up cash flow and make saving easier.";
  }

  // Construct the final insight message
  return `You are currently in the ${tier} stage of your financial journey. ${contextInsight} ${progressMessage} ${nextAction}`;
}
