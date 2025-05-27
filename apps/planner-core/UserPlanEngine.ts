import { determineFinancialTier } from "./PyramidEngine";
import { detectBehaviorFlags } from "./BehaviorEngine";
import { buildLLMPromptFromInsight } from "../../shared/llm/promptTemplates";
import { UserProfile } from "./UserProfile";
import { generateInsight } from "./InsightGenerator";

/**
 * Builds a full plan summary for a user by combining financial tier, behavior flags,
 * coaching insights, and a natural-language prompt.
 *
 * @param userProfile - The user's financial profile.
 * @returns A summary object containing tier, unmet needs, behavior flags, insight, and prompt.
 */
export function buildUserPlanSummary(userProfile: UserProfile) {
  // Step 1: Determine the user's financial tier and unmet needs
  const tierData = determineFinancialTier(userProfile);

  // Step 2: Detect risky financial behaviors
  const behaviorFlags = detectBehaviorFlags(userProfile);

  // Step 3: Generate a coaching insight based on the user's profile and tier
  const insight = generateInsight(userProfile, tierData);

  // Step 4: Build a natural-language prompt for the user
  const prompt = buildLLMPromptFromInsight(
    insight,
    userProfile.name,
    tierData.tier,
    behaviorFlags
  );

  // Step 5: Return the full plan summary object
  return {
    tier: tierData.tier,
    unmetNeeds: tierData.unmetNeeds,
    behaviorFlags,
    insight,
    prompt,
  };
}
