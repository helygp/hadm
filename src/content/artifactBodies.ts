export const artifactBodies: Record<string, string> = {
  manifesto: `# HAD Manifesto

## Human-Governed Agentic Delivery

Agile was created for human teams delivering software. HAD Method is designed for human-governed AI agents delivering digital value.

**Humans govern. Agents conceive. AI delivers. Value validates.**

## Principles

1. Human accountability cannot be outsourced.
2. Agents may conceive, but humans govern boundaries.
3. Speed without governance creates accelerated risk.
4. Value is validated by evidence, not by output volume.
5. Intent is the new delivery language.
6. Context is infrastructure.
7. Every agentic delivery needs traceability.
8. Autonomy must be explicit, limited and reviewable.
9. The user is not removed from the process.
10. Digital delivery becomes coordination of intelligence.

## Commitment

We commit to deliver digital value with AI agents under human governance, with evidence over volume, and with humans accountable for purpose, risk and outcome.
`,
  canvas: `# HAD Canvas

A one-page canvas to structure human governance, agentic opportunities, delivery scope and value validation.

## 1. Intent
- Business intent
- Strategic outcome
- Sponsor

## 2. Human Governance
- Decision points requiring human approval
- Risk thresholds
- Ethical and legal boundaries
- Accountability owners

## 3. Agentic Opportunities
- Where can agents conceive?
- Where can agents deliver?
- Where must humans remain?

## 4. Autonomy Contract
- Selected autonomy level (L0–L5)
- Reviewable by
- Audit trail location

## 5. Delivery Scope
- Minimum viable scope
- Tools involved
- Delivery environment

## 6. Validation
- Value hypotheses
- Evidence required
- Metrics
- Validators (users, business, risk)

## 7. Evolution
- Feedback channels
- Retrospective cadence
- Next governance cycle
`,
  "master-prompt": `# HAD Master Prompt

You are operating under the HAD Method: Human-Governed Agentic Delivery.

HAD is a delivery methodology where humans govern intent, risk and accountability while AI agents may discover, conceive, design, build, validate and evolve digital products.

Core principle: **Humans govern. Agents conceive. AI delivers. Value validates.**

For every request, structure outputs as:

1. Problem understanding
2. Human governance boundaries
3. Agentic opportunities
4. Solution hypotheses
5. Recommended delivery path
6. Required artifacts
7. Risks and controls
8. Validation plan
9. Next best actions

Rules:
- Never remove human accountability from critical decisions.
- Always state autonomy limits.
- Always connect delivery to measurable value.
- Always identify what evidence is needed before production use.
`,
  "agent-pack": `# HAD Agent Pack

Prebuilt agent instructions ready to paste into your AI tool.

## Product Strategist Agent
Reframe business intent into measurable digital value hypotheses. Output: opportunity statements, target outcomes, validation criteria.

## Discovery Agent
Synthesize users, data, context, signals and constraints. Output: insight brief, jobs-to-be-done, opportunity map.

## Delivery Architect
Design buildable solutions: components, data, integrations, autonomy. Output: architecture brief, delivery plan, risk register.

## Governance Reviewer
Audit every delivery against autonomy, ethics, security, accountability, auditability. Output: governance review with required actions.

## Value Validator
Define and run the validation plan. Output: evidence pack with user signals, business metrics and risk findings.
`,
  "governance-checklist": `# HAD Governance Checklist

Use before any agentic delivery moves to production.

## Accountability
- [ ] Named human accountable for outcome
- [ ] Sponsor explicitly approves autonomy level

## Autonomy
- [ ] Selected autonomy level documented (L0–L5)
- [ ] Decisions requiring human approval listed
- [ ] Escalation path defined

## Risk
- [ ] Risk register reviewed
- [ ] Reversibility assessed
- [ ] Blast radius bounded

## Data
- [ ] Data sensitivity classified
- [ ] Privacy and consent reviewed
- [ ] Retention defined

## Security
- [ ] Access boundaries enforced
- [ ] Secrets handling reviewed
- [ ] Audit log enabled

## Auditability
- [ ] Agent prompts and outputs traceable
- [ ] Versioning of instructions in place

## Validation
- [ ] Evidence required before production use defined
- [ ] User validation plan exists
`,
  "product-brief": `# HAD Product Brief

## Initiative
- Name:
- Sponsor:
- Date:

## Business Problem
Describe the business problem in plain language.

## Target Users
Who benefits and what they currently struggle with.

## Expected Digital Value
What measurable outcome must this delivery produce.

## Main Risks
Operational, ethical, regulatory, reputational risks.

## Data Sensitivity
Classify data involved and constraints.

## Required Human Approvals
Decisions that must remain with humans.

## Delivery Environment
Where this will run, integrate and be operated.

## Tools Involved
AI tools, platforms, agents, integrations, frameworks.

## Validation Plan
What evidence is required to consider this delivered.
`,
  "agents-md": `# AGENTS.md

Repository-level instructions for coding agents operating under the HAD Method.

## Method
You are a coding agent operating under HAD Method. Humans govern. You may deliver under explicit autonomy.

## Before Coding
1. Restate the delivery intent and user value.
2. Surface unknowns; ask before assuming.
3. Propose a minimal implementation plan.
4. Identify data, security, access and integration constraints.

## While Coding
- Keep code modular, typed and tested.
- Avoid irreversible operations without human approval.
- Document non-obvious decisions.
- Prefer additive change over rewrites.

## Before Delivery
- Produce delivery evidence: tests, screenshots, logs.
- Run the HAD Governance Checklist.
- Summarize risks and required approvals.

## Never
- Bypass auth, RLS or access boundaries.
- Touch production data without explicit approval.
- Treat AI as only a coding assistant — agents may also discover, conceive, design and validate.
`,
  "starter-kit": `# HAD Starter Kit

The HAD Starter Kit packages every artifact required to operate under the HAD Method.

Included files:
- HAD-Manifesto.md
- HAD-Canvas.md
- HAD-Master-Prompt.md
- HAD-Agent-Pack.md
- HAD-Governance-Checklist.md
- HAD-Product-Brief-Template.md
- AGENTS.md
- Tool-specific instruction files for Claude, OpenAI, Gemini, Lovable, Cursor, GitHub Copilot, Windsurf, Replit and n8n.

Download the kit to bootstrap a complete HAD-compliant delivery environment.
`,
};
