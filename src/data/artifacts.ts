export type ArtifactKind =
  | "Manifesto" | "Canvas" | "Prompt" | "Agent"
  | "Checklist" | "Template" | "Toolkit"
  | "Software Builder Guide" | "Governance";

export type ArtifactFormat = "PDF" | "Markdown" | "ZIP" | "DOC" | "Miro" | "FigJam";

export interface Artifact {
  id: string;
  title: string;
  kind: ArtifactKind;
  formats: ArtifactFormat[];
  description: string;
  version: string;
  bodyKey: string; // key into content/artifacts
}

export const ARTIFACT_KINDS: ArtifactKind[] = [
  "Manifesto", "Canvas", "Prompt", "Agent",
  "Checklist", "Template", "Toolkit",
  "Software Builder Guide", "Governance",
];

export const artifacts: Artifact[] = [
  {
    id: "manifesto",
    title: "HAD Manifesto",
    kind: "Manifesto",
    formats: ["PDF", "Markdown"],
    description: "The foundational principles behind Human-Governed Agentic Delivery.",
    version: "v0.1",
    bodyKey: "manifesto",
  },
  {
    id: "canvas",
    title: "HAD Canvas",
    kind: "Canvas",
    formats: ["PDF", "Markdown"],
    description: "A one-page canvas to structure human governance, agentic opportunities, delivery scope and value validation.",
    version: "v0.1",
    bodyKey: "canvas",
  },
  {
    id: "master-prompt",
    title: "HAD Master Prompt",
    kind: "Prompt",
    formats: ["Markdown"],
    description: "A system instruction to make AI tools reason through the HAD Method.",
    version: "v0.1",
    bodyKey: "master-prompt",
  },
  {
    id: "agent-pack",
    title: "HAD Agent Pack",
    kind: "Agent",
    formats: ["Markdown"],
    description: "Prebuilt agent instructions for Product Strategist, Discovery Agent, Delivery Architect, Governance Reviewer and Value Validator.",
    version: "v0.1",
    bodyKey: "agent-pack",
  },
  {
    id: "governance-checklist",
    title: "HAD Governance Checklist",
    kind: "Checklist",
    formats: ["PDF", "Markdown"],
    description: "A checklist to review risk, autonomy, data, security, auditability and human accountability.",
    version: "v0.1",
    bodyKey: "governance-checklist",
  },
  {
    id: "product-brief",
    title: "HAD Product Brief Template",
    kind: "Template",
    formats: ["Markdown", "DOC"],
    description: "A structured template for transforming business intent into agent-ready delivery instructions.",
    version: "v0.1",
    bodyKey: "product-brief",
  },
  {
    id: "agents-md",
    title: "HAD AGENTS.md",
    kind: "Software Builder Guide",
    formats: ["Markdown"],
    description: "A repository-ready instruction file for coding agents and AI development environments.",
    version: "v0.1",
    bodyKey: "agents-md",
  },
  {
    id: "starter-kit",
    title: "HAD Starter Kit",
    kind: "Toolkit",
    formats: ["ZIP"],
    description: "The complete package with manifesto, canvas, prompts, agents, checklists and tool-specific guides.",
    version: "v0.1",
    bodyKey: "starter-kit",
  },
];
