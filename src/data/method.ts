export interface LoopStep {
  id: string;
  num: string;
  name: string;
  role: "Human" | "Hybrid" | "Agent" | "Value";
  blurb: string;
  detail: string;
}

export const operatingLoop: LoopStep[] = [
  { id: "govern", num: "01", name: "Govern", role: "Human", blurb: "Define intent, boundaries, risk, autonomy levels and human decision points.", detail: "Humans set the perimeter before agents begin. Govern is where intent becomes contract: scope, risk thresholds, ethical limits, escalation rules, and explicit human decision points." },
  { id: "discover", num: "02", name: "Discover", role: "Hybrid", blurb: "Use humans and agents to understand context, users, data, pain points and opportunities.", detail: "Humans frame the problem; agents accelerate research, synthesis and pattern detection across user signals, data and competitive context." },
  { id: "conceive", num: "03", name: "Conceive", role: "Agent", blurb: "Agents generate hypotheses, journeys, features, prototypes and solution options.", detail: "Agents propose. Humans curate. Multiple solution hypotheses are generated in parallel — journeys, features, prototypes, alternative models." },
  { id: "design", num: "04", name: "Design", role: "Hybrid", blurb: "Shape experiences, flows, data structures, interfaces and operating models.", detail: "From hypothesis to specification. Experience flows, IA, interface logic, data contracts and operating models, drafted by agents and decided by humans." },
  { id: "deliver", num: "05", name: "Deliver", role: "Agent", blurb: "Use AI agents and delivery tools to build, test, document and deploy.", detail: "Agentic delivery: code, tests, documentation, automations, integrations, deployment. Humans review traceability, security and architectural fit." },
  { id: "validate", num: "06", name: "Validate", role: "Value", blurb: "Measure value, trust, user adoption, risk, quality and business outcomes.", detail: "Validation is a discipline. Real users, business metrics and risk evidence determine whether what was delivered is actually valuable." },
  { id: "evolve", num: "07", name: "Evolve", role: "Hybrid", blurb: "Continuously learn from usage, feedback, metrics and agent recommendations.", detail: "The loop closes. Usage data, feedback, agent observations and validation evidence feed the next governance cycle." },
];

export interface Principle {
  id: string;
  num: string;
  title: string;
  description: string;
}
export const principles: Principle[] = [
  { id: "governance", num: "01", title: "Human Governance", description: "Humans define purpose, limits, risk boundaries, ethics and accountability." },
  { id: "conception", num: "02", title: "Agentic Conception", description: "AI agents can research, analyze, propose solutions, design journeys and create product hypotheses." },
  { id: "delivery", num: "03", title: "AI-Powered Delivery", description: "Agents and AI tools can build, test, document, automate and prepare releases." },
  { id: "value", num: "04", title: "Value Validation", description: "Users, business stakeholders and evidence validate whether real value was delivered." },
];

export interface AutonomyLevel {
  level: 0 | 1 | 2 | 3 | 4 | 5;
  name: string;
  description: string;
}
export const autonomyLevels: AutonomyLevel[] = [
  { level: 0, name: "L0 · Inert", description: "No autonomy. AI only answers questions." },
  { level: 1, name: "L1 · Suggest", description: "AI suggests, human decides." },
  { level: 2, name: "L2 · Draft", description: "AI drafts artifacts, human approves." },
  { level: 3, name: "L3 · Execute", description: "AI executes controlled tasks with human review." },
  { level: 4, name: "L4 · Workflow", description: "AI executes workflows under predefined boundaries." },
  { level: 5, name: "L5 · Autonomous", description: "AI operates autonomously with monitoring and audit." },
];

export const usageTypes = [
  "Product discovery", "Product strategy", "Software creation",
  "UX design", "Architecture", "Code generation",
  "Automation workflow", "Governance review", "Value validation",
  "Full delivery lifecycle",
] as const;
export type UsageType = (typeof usageTypes)[number];

export interface UseCase {
  id: string;
  name: string;
  tag: string;
  body: string;
}
export const useCases: UseCase[] = [
  { id: "enterprise", name: "Enterprise Digital Transformation", tag: "Enterprise", body: "Govern AI agents that build workflows, portals, automations and integrations across business units." },
  { id: "servicenow", name: "ServiceNow Delivery", tag: "Platform", body: "Guide agentic conception and delivery of catalogs, portals, flows, integrations and governance artifacts." },
  { id: "startup", name: "Startup MVPs", tag: "Startup", body: "Move from idea to validated product using AI agents without losing human accountability." },
  { id: "internal", name: "Internal Tools", tag: "Internal", body: "Create internal applications, automations and dashboards with clear governance and ownership." },
  { id: "ai-products", name: "AI Products", tag: "AI-native", body: "Design products where AI agents are part of the value proposition itself, with explicit autonomy contracts." },
  { id: "csc", name: "Shared Services / CSC", tag: "Operations", body: "Rethink service delivery, intake, triage, automation and digital experience for shared service centers." },
  { id: "hr", name: "HR & Recruitment", tag: "People", body: "Design AI-assisted journeys with human oversight, fairness and ethical boundaries." },
  { id: "public", name: "Public Sector Digital Services", tag: "Public", body: "Balance automation, accessibility, transparency and public accountability in citizen services." },
];

export interface Faq { q: string; a: string; }
export const faqs: Faq[] = [
  { q: "Is HAD Method a replacement for Agile?", a: "No. HAD Method extends delivery thinking for a world where AI agents can participate in conception, production and evolution." },
  { q: "Is this only for software development?", a: "No. HAD can be applied to digital products, automation, service portals, AI workflows, internal tools, enterprise platforms and transformation initiatives." },
  { q: "Does HAD remove humans from delivery?", a: "No. HAD shifts humans toward governance, accountability, value validation and strategic decision-making." },
  { q: "Can agents really conceive products?", a: "Agents can research, synthesize, generate hypotheses, map journeys, propose solutions and create artifacts. Humans must define boundaries and approve critical decisions." },
  { q: "What is the first artifact I should use?", a: "Start with the HAD Canvas and the HAD Master Prompt." },
  { q: "How do I use HAD with software creation tools?", a: "Download the specific .md instruction file for your tool, add it as project instructions, custom agent instructions, repository instructions or system prompt, then provide your project context using the HAD Product Brief." },
  { q: "Can I use HAD with Lovable?", a: "Yes. Use the Lovable HAD Builder Instructions and the HAD Product Brief Template to guide Lovable with business intent, user value, governance boundaries, delivery expectations and validation criteria." },
];

export const contributionPaths = [
  { id: "artifact", title: "Submit artifact improvement", desc: "Refine an existing canvas, prompt, checklist or template." },
  { id: "agent-role", title: "Propose a new agent role", desc: "Define a new agent with purpose, scope, autonomy and outputs." },
  { id: "case-study", title: "Share a case study", desc: "Document how HAD Method shaped a real delivery." },
  { id: "governance", title: "Review governance principles", desc: "Help evolve the governance, ethics and risk principles." },
  { id: "translate", title: "Translate materials", desc: "Translate the manifesto, canvas and toolkits to your language." },
  { id: "host", title: "Host a local discussion", desc: "Host a workshop, roundtable or local chapter meetup." },
];

export const navLinks = [
  { id: "method", label: "Method" },
  { id: "loop", label: "Loop" },
  { id: "artifacts", label: "Artifacts" },
  { id: "toolkits", label: "Toolkits" },
  { id: "community", label: "Community" },
  { id: "cases", label: "Cases" },
  { id: "faq", label: "FAQ" },
];
