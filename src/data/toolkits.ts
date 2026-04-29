export interface ToolFile {
  name: string;
  description?: string;
  template: "method-guide" | "master-prompt" | "agent-pack" | "canvas"
    | "tool-instructions" | "product-brief" | "governance-checklist"
    | "agents-md" | "delivery-architect" | "delivery-review-prompt"
    | "risk-boundaries" | "validation-evidence" | "n8n-workflow"
    | "cursor-rules";
}

export interface Toolkit {
  id: string;
  name: string;
  mark: string;
  blurb: string;
  setup: string[];
  files: ToolFile[];
}

export const toolkits: Toolkit[] = [
  {
    id: "claude",
    name: "Claude",
    mark: "CL",
    blurb: "Configure a Claude Project with HAD Method instructions, project knowledge and artifact templates.",
    setup: [
      "Create a new Claude Project named “HAD Delivery Lab”.",
      "Paste the project instructions from claude-project-instructions.md.",
      "Upload had-method-guide.md, had-agent-pack.md and had-canvas.md as project knowledge.",
      "Open a chat and provide your HAD Product Brief as the first message.",
    ],
    files: [
      { name: "claude-project-instructions.md", template: "tool-instructions" },
      { name: "had-method-guide.md", template: "method-guide" },
      { name: "had-agent-pack.md", template: "agent-pack" },
      { name: "had-canvas.md", template: "canvas" },
    ],
  },
  {
    id: "openai",
    name: "OpenAI / ChatGPT",
    mark: "GPT",
    blurb: "Create a Custom GPT or Project Assistant using HAD Master Prompt, agent roles and starter kit knowledge files.",
    setup: [
      "In ChatGPT, create a new Custom GPT or Project.",
      "Paste openai-custom-gpt-instructions.md as the system instructions.",
      "Upload had-master-prompt.md, had-method-guide.md and had-agent-pack.md as knowledge.",
      "Pin the GPT and start by sending your HAD Product Brief.",
    ],
    files: [
      { name: "openai-custom-gpt-instructions.md", template: "tool-instructions" },
      { name: "had-master-prompt.md", template: "master-prompt" },
      { name: "had-method-guide.md", template: "method-guide" },
      { name: "had-agent-pack.md", template: "agent-pack" },
    ],
  },
  {
    id: "gemini",
    name: "Google Gemini",
    mark: "GM",
    blurb: "Create a Gemini Gem configured with HAD principles, tool instructions and product delivery templates.",
    setup: [
      "Open Gemini and create a new Gem.",
      "Paste gemini-gem-instructions.md into the Gem instructions.",
      "Attach had-master-prompt.md and had-product-brief-template.md as references.",
      "Test with a real product context before sharing the Gem.",
    ],
    files: [
      { name: "gemini-gem-instructions.md", template: "tool-instructions" },
      { name: "had-master-prompt.md", template: "master-prompt" },
      { name: "had-product-brief-template.md", template: "product-brief" },
    ],
  },
  {
    id: "lovable",
    name: "Lovable",
    mark: "LV",
    blurb: "Use HAD Product Brief and HAD Software Builder Instructions to guide Lovable in building products with governance, intent, user value and delivery evidence.",
    setup: [
      "Open a new Lovable project.",
      "Paste lovable-had-builder-instructions.md as your first message.",
      "Follow with your filled had-product-brief-template.md.",
      "Use had-governance-checklist.md before publishing or going live.",
    ],
    files: [
      { name: "lovable-had-builder-instructions.md", template: "tool-instructions" },
      { name: "had-product-brief-template.md", template: "product-brief" },
      { name: "had-governance-checklist.md", template: "governance-checklist" },
    ],
  },
  {
    id: "cursor",
    name: "Cursor",
    mark: "CR",
    blurb: "Configure Cursor rules and project instructions to make coding agents follow HAD Method during software creation.",
    setup: [
      "Create .cursor/rules/had.mdc in your repo.",
      "Paste cursor-rules.md content.",
      "Add AGENTS.md to the repo root.",
      "Reference had-delivery-architect.md when starting architectural work.",
    ],
    files: [
      { name: "cursor-rules.md", template: "cursor-rules" },
      { name: "AGENTS.md", template: "agents-md" },
      { name: "had-delivery-architect.md", template: "delivery-architect" },
    ],
  },
  {
    id: "copilot",
    name: "GitHub Copilot",
    mark: "GH",
    blurb: "Add repository-level instructions and prompt files to guide Copilot through HAD Method.",
    setup: [
      "Add AGENTS.md to your repository root.",
      "Create .github/copilot-instructions.md from the template.",
      "Add had-delivery-review.prompt.md as a reusable prompt.",
      "Open Copilot Chat and reference the prompt file before reviews.",
    ],
    files: [
      { name: "AGENTS.md", template: "agents-md" },
      { name: "copilot-instructions.md", template: "tool-instructions" },
      { name: "had-delivery-review.prompt.md", template: "delivery-review-prompt" },
    ],
  },
  {
    id: "windsurf",
    name: "Windsurf",
    mark: "WS",
    blurb: "Configure Windsurf with HAD agentic delivery instructions, coding boundaries and governance checklist.",
    setup: [
      "Open Windsurf settings → Cascade rules.",
      "Paste windsurf-instructions.md as global rules.",
      "Add AGENTS.md and had-governance-checklist.md to the workspace.",
      "Run governance review before any production-impacting action.",
    ],
    files: [
      { name: "windsurf-instructions.md", template: "tool-instructions" },
      { name: "AGENTS.md", template: "agents-md" },
      { name: "had-governance-checklist.md", template: "governance-checklist" },
    ],
  },
  {
    id: "replit",
    name: "Replit",
    mark: "RP",
    blurb: "Use HAD software builder instructions to guide Replit Agent from intent to validated delivery.",
    setup: [
      "In Replit, open the Agent and set custom instructions.",
      "Paste replit-agent-instructions.md.",
      "Provide your filled had-product-brief-template.md as initial context.",
      "Require the Agent to summarize delivery evidence before publishing.",
    ],
    files: [
      { name: "replit-agent-instructions.md", template: "tool-instructions" },
      { name: "had-product-brief-template.md", template: "product-brief" },
    ],
  },
  {
    id: "n8n",
    name: "n8n",
    mark: "N8",
    blurb: "Use HAD to define automation agents, escalation boundaries, human approvals and validation evidence.",
    setup: [
      "Document each automation with n8n-agentic-workflow-guide.md.",
      "Define escalation paths using had-risk-boundaries.md.",
      "Capture validation evidence using had-validation-evidence-template.md.",
      "Review autonomy levels for each AI Agent node.",
    ],
    files: [
      { name: "n8n-agentic-workflow-guide.md", template: "n8n-workflow" },
      { name: "had-risk-boundaries.md", template: "risk-boundaries" },
      { name: "had-validation-evidence-template.md", template: "validation-evidence" },
    ],
  },
];

export function getToolkit(id: string): Toolkit | undefined {
  return toolkits.find((t) => t.id === id);
}
