# Context-Driven AI Financial Planner

## Overview

The **Context-Driven AI Financial Planner** is a modular, AI-powered platform designed to help users understand and manage their finances. By combining financial analysis engines with large language models (LLMs), the platform provides intuitive, visual, and conversational tools for personal financial planning. Users can explore their financial health, receive actionable insights, and create structured plans to achieve their goals.

## Features

- **Modular Financial Analysis Engines**:
  - `PyramidEngine`: Analyzes financial tiers (income, liquidity, investment).
  - `BehaviorEngine`: Detects risky financial behaviors (e.g., "lifestyle creep").
  - `InsightGenerator`: Generates coaching insights based on user profiles.
- **LLM-Based Prompt Generation**:
  - Generates natural-language prompts to guide users in financial decision-making.
- **Mock Data Support**:
  - Includes mock user profiles and behavior flags for testing and development.
- **Extensible Architecture**:
  - Modular design allows for easy integration of new features and engines.

## Folder Structure

```
context-ai-financial-planner/
├── apps/
│   ├── planner-core/
│   │   ├── BehaviorEngine.ts
│   │   ├── InsightGenerator.ts
│   │   ├── PyramidEngine.ts
│   │   ├── UserPlanEngine.ts
│   │   ├── UserProfile.ts
│   │   └── __tests__/
│   │       ├── BehaviorEngine.test.ts
│   │       ├── InsightGenerator.test.ts
│   │       ├── PyramidEngine.test.ts
│   │       └── UserPlanEngine.test.ts
├── data/
│   ├── mockBehaviorFlags.json
│   └── mockUserProfiles.json
├── planner/
│   └── docs/
│       └── system/
│           └── logic-spec.md
├── scripts/
│   └── renderPlan.ts
├── shared/
│   └── llm/
│       ├── promptTemplates.ts
│       └── promptTemplates.test.ts
├── types/
└── package.json
```

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm (v7 or later)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/context-ai-financial-planner.git
   cd context-ai-financial-planner
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

1. Execute the `renderPlan.ts` script to generate a financial plan summary:
   ```bash
   npx tsx scripts/renderPlan.ts
   ```

## Testing

![TypeScript](https://img.shields.io/badge/code-typescript-blue)
![Tests Passing](https://img.shields.io/badge/tests-100%25-brightgreen)

This project uses [Vitest](https://vitest.dev) for unit and integration tests. Run:

```bash
npx vitest run
```

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
