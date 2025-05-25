# Project Name: Context-Driven AI Financial Planning Platform

## Project Description

This is a modular, AI-powered personal financial planning platform. It combines large language models (LLMs) with financial data APIs to turn real-world goals (like “I want to buy a home”) into structured plans, behavior-aware coaching, and scenario-based simulations. The core of the experience is a visual pyramid that maps the user’s financial life: top (cash flow), middle (liquidity), and base (investments).

The platform separates core reasoning logic (planner-core) from modular execution flows (HomePilot, DebtDestroyer, CollegePlan, etc.).

## Preferred Language

TypeScript

## Frameworks & Libraries

* React (frontend UI)
* Tailwind CSS (styling)
* Zustand (state management)
* Vite (build tooling)
* Node.js + Express (for backend endpoints)

## Coding Style

* Modular and logic-first: one component/function/module per concern.
* Use TypeScript interfaces/types throughout.
* Comment behavioral logic or financial heuristics clearly.
* Place modules in logical folders: `/apps/planner-core`, `/shared/llm`, `/shared/types`.
* Favor readability and explicitness over cleverness.
* Scaffold using latest stable versions only.

## Tools

* ESLint (Airbnb or logic-first config)
* Prettier
* Vitest (unit tests)
* React Testing Library (UI testing only when needed)
* GitHub Copilot Agent (GPT-4 with workspace awareness)

## Copilot Behavior

* Use latest stable versions of all dependencies and tools (check npm if unsure).
* Never scaffold outdated boilerplate or deprecated packages.
* Focus suggestions on planner-core logic only (e.g. `PyramidEngine`, `BehaviorEngine`, `UserProfile`, `InsightGenerator`).
* Do not create UI components or integrations unless explicitly prompted.
* Output should be testable and include mock data examples if possible.
* Use clean, descriptive filenames and separate reusable logic into shared modules.
* If the logic is abstract or multi-step, include explanatory inline comments.

## Project Phase

We are in the **context modeling and system architecture phase**.

Before writing features, all logic and flows should be defined clearly in markdown or prompts. Copilot should assist with:

* Creating logic modules (without UI)
* Writing prompt files or structured logic flows
* Generating mock data for behavioral testing

Execution modules and external APIs will be added **after the planner-core logic is finalized.**

## Testing Philosophy

* All modules must include at least one mock-based test or scenario example.
* Prioritize unit testing for logic correctness and behavior edge cases.
* Favor human-readable test inputs and outputs (don’t overengineer tests early).

## Data Modeling Guidance

* Use normalized TypeScript interfaces for profiles, behaviors, and goals.
* Prefer structured JSON objects with clear field definitions.
* Keep data flexible but strongly typed.

## Tone & Voice for Generated Content

* Direct, empathetic, and educational—never robotic or vague.
* Use plain language when describing finance to the user.
* Code comments should read like guidance from a helpful technical co-pilot.

## Current Focus

We are currently **not building features**.
We are:

* Writing clear instructions for Copilot and the Agent
* Structuring the file system
* Planning logic and user flows on paper
* Building prompt files to simulate reasoning modules

Copilot should support thinking and modeling first, and only suggest code when asked to.
