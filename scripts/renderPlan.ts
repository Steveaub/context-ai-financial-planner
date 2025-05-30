/**
 * This script imports a mock UserProfile, processes it through the buildUserPlanSummary function,
 * and prints a clean terminal summary of the user's financial plan.
 *
 * The summary includes:
 * - User name
 * - Financial tier
 * - Unmet needs
 * - Behavior flags
 * - Coaching insight
 * - Natural-language prompt
 */

import { buildUserPlanSummary } from "../apps/planner-core/UserPlanEngine";
import mockUserProfiles from "../data/mockUserProfiles.json";

// Import chalk for color formatting, fallback to plain text if unavailable
let chalk;
try {
  chalk = await import("chalk");
} catch {
  chalk = null;
}

// Select a specific mock user profile (e.g., user ID "1")
const userProfile = mockUserProfiles.find((user) => user.id === 1);

if (!userProfile) {
  console.error("User profile with ID 1 not found.");
  process.exit(1);
}

// Process the user profile through the buildUserPlanSummary function
const planSummary = buildUserPlanSummary(userProfile);

// Helper function for color formatting or fallback
const format = (text, color) => (chalk ? chalk.default[color](text) : text);

// Print the terminal summary
console.log(format("\n=== Financial Plan Summary ===\n", "cyan"));
console.log(format(`User Name: ${userProfile.name}`, "green"));
console.log(format(`Tier: ${planSummary.tier}`, "blue"));
console.log(format("\nUnmet Needs:", "yellow"));
planSummary.unmetNeeds.forEach((need) => console.log(`- ${need}`));
console.log(format("\nBehavior Flags:", "red"));
planSummary.behaviorFlags.forEach((flag) => console.log(`- ${flag}`));
console.log(format("\nInsight:", "magenta"));
console.log(planSummary.insight);
console.log(format("\nPrompt:", "cyan"));
console.log(planSummary.prompt);
