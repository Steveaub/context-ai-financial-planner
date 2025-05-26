# Context-Driven AI Financial Planning Platform

## 🧠 Product Logic & UX Specification

---

### 1. Core Philosophy

* **Numbers without context are meaningless**
* **Most people express financial goals as stories, not spreadsheets**
* **The platform should feel like a human coach—with execution power**
* **Designed for automation, not micromanagement**

---

### 2. Key User Experience Principles

* Users start by *talking*, not filling out forms
* Financial plans adapt to behavior and evolve over time
* Context-aware chat allows users to ask about anything they see
* Multiple people (household members) can plan together

---

### 3. Primary User Journey (Flow)

#### Step 1: Entry & Intent Discovery

* Landing page shows:

  * SSO and login at top-right (minimal presence)
  * Large prompt: **"Your story is your strategy"**
  * Subtext: *"Numbers without context are meaningless. Tell us what's going on financially."*
  * Multi-select prompt chips: e.g., “I want to retire early,” “I’m paying off debt”
  * User can:

    * Click chips → auto-fill chat
    * Type free-form
    * Use speech-to-text

#### Step 2: Account Linking

* Prompt user to link accounts via **Plaid, MX, or Yodlee**
* Retrieve:

  * Bank balances, credit cards, loans
  * Investments, 401k, IRAs
  * Transaction history

#### Step 3: Profile Construction

* System constructs:

  * Net worth
  * Cash flow history
  * Monthly expense breakdown
  * Savings & debt profile
  * Risk & behavior profile

#### Step 4: Core Dashboard Views

##### A. Personal Balance Sheet

* Assets vs liabilities
* Net worth total (color-coded)
* Grouped by type: cash, investment, debt

##### B. Net Worth Over Time

* Bar chart with overlaid line
* Stack segments by account (401k, Roth, checking)
* Askable: "Which account caused the drop in March?"

##### C. Cash Flow (Sankey Diagram)

* Visualizes: income → categories → merchant levels
* Users can click any flow → context-aware chat explains it

##### D. Asset Allocation

* Pie chart + list view (stocks, bonds, real estate)
* Drill-down to sectors, fund types, risk zones
* Chat: “Am I overexposed to tech?”

#### Step 5: Context-Aware LLM Chat

* Click any chart element → auto-generates prompt
* LLM receives structured context:

```json
{
  "currentPage": "Net Worth",
  "element": { "label": "Roth IRA", "value": 34800 },
  "trend": "-8% this month"
}
```

* Chat responds with:

  * Contextual insight ("Market drop in tech-heavy ETF")
  * Follow-up options ("Want to rebalance?")

#### Step 6: Behavioral Insight & Simulation

* Bias simulations:

  * Lifestyle creep
  * Mental accounting
  * Loss aversion
* “What if?” projections:

  * Saving \$200 more/month
  * Delaying retirement
  * Taking a 6-month sabbatical

#### Step 7: Financial Pyramid Model

* Top: income, expenses, credit
* Middle: liquidity (emergency fund, HELOC)
* Base: investments, DCA
* System overlays:

  * Where the user currently stands
  * What’s needed to stabilize the next level

#### Step 8: Personalized Financial Plan

* Natural language summary:

  > "You’re on track to retire at 65. But increasing investment by \$250/month could shave off 2 years."
* Checklist of actions
* Optional automation setup (auto-transfer, payoff plan)

#### Step 9: Household Support (if enabled)

* Create or join a household
* Invite others via SSO
* Pool or tag accounts by user
* Plan together:

  * Shared budget, emergency fund
  * Split goals (e.g., parent + child education savings)

#### Step 10: Ongoing Monitoring + Alerts

* Detect raises, spending spikes, budget drift
* Nudges:

  * "Your discretionary spending rose \$400 this month. Want to review?"
  * "You’re 90% to your 6-month reserve. Ready to start investing?"

---

### 4. Key Modules

* **PyramidEngine**: Detects user’s financial stage
* **BehaviorEngine**: Detects and flags destructive habits
* **InsightGenerator**: Creates personalized coaching from data
* **AutomationEngine**: Recommends and schedules financial transitions
* **AskAboutThisChat**: Turns visual UI into interactive chat layer
* **HouseholdPlanner**: Supports multi-user planning logic

---

### 5. Visualizations & UI Components

* Bar chart (net worth over time)
* Sankey diagram (cash flow map)
* Pie chart + list (asset allocation)
* Gauge chart (emergency fund, debt payoff progress)
* Interactive financial pyramid (current vs target tier)

---

### 6. Optional & Future Features

* SSA import for retirement projections
* Group savings model (SOL/SOSU-style rotational funds)
* Smart tax estimator (Taxee.io, April)
* Execution modules (HomePilot, DebtDestroyer, CollegePlan)
* Marketplace of AI agents for specific tasks (rate shopping, legal review)

---

### 7. Technology Stack

* Frontend: React, Tailwind, TypeScript
* Backend: Node.js, Supabase, Express
* State: Zustand
* Data Viz: Recharts, D3 (Sankey), ECharts (advanced)
* LLM: OpenAI or Azure OpenAI (via RAG + structured prompts)
* Auth: SSO (Google, Apple, Microsoft)
* Data: Plaid (MVP), Yodlee (optional)

---

This document can now be reviewed by Gemini or used as the foundation for task mapping, development scoping, and Copilot Agent prompt conditioning.
