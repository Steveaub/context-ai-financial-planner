/**
 * Represents a user profile for financial planning.
 * This structure supports personalized financial planning by allowing users to define their financial goals
 * in both structured and custom formats, enabling natural expression of their financial stories.
 */
export interface UserProfile {
  id: string; // Unique identifier for the user
  name: string; // User's full name
  age: number; // User's age
  householdSize: number; // Number of people in the user's household
  monthlyIncome: number; // Total monthly income
  monthlyExpenses: number; // Total monthly expenses
  savings: number; // Current savings amount
  accounts: Account[]; // List of financial accounts
  financialGoals: FinancialGoal[]; // List of financial goals
}

/**
 * Represents a financial account.
 * Supports various account types such as checking, savings, credit, and investment.
 */
export interface Account {
  id: string; // Unique identifier for the account
  type: "checking" | "savings" | "credit" | "investment"; // Type of account
  balance: number; // Current balance in the account
  institution?: string; // Optional name of the financial institution
}

/**
 * Represents a financial goal.
 * Supports both structured goal types and fully custom goals for flexibility.
 * The optional `priority` field helps modules like InsightGenerator or PlanPrioritizer
 * understand which goals matter most to the user.
 */
export interface FinancialGoal {
  id: string; // Unique identifier for the goal
  type: "retirement" | "education" | "home" | "debt" | "custom"; // Type of financial goal
  targetAmount: number; // Target amount to achieve the goal
  currentProgress: number; // Current progress towards the goal
  targetDate?: string; // Optional target date for the goal
  customLabel?: string; // Label for custom goals
  description?: string; // Description for custom goals
  notes?: string; // Additional notes for custom goals
  priority?: "low" | "medium" | "high"; // Optional priority level of the goal
}
