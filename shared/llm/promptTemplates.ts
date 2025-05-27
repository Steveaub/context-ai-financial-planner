export function buildLLMPromptFromInsight(
  insight: string,
  name: string,
  goalOrTier?: string,
  behaviorFlags?: string[]
): string {
  // Start with a personalized intro
  let prompt = `Hi ${name}, based on your current financial tier, here's a quick breakdown: ${insight}.`;

  // Include current focus if provided
  if (goalOrTier) {
    prompt += ` Your current focus is: ${goalOrTier}.`;
  }

  // Add any detected behavior flags
  if (behaviorFlags && behaviorFlags.length > 0) {
    prompt += ` We also noticed some patterns in your financial behavior: ${behaviorFlags.join(", ")}.`;
  }

  // Encourage user to take action
  prompt += " What would you like to work on next?";

  return prompt;
}
