// Lightweight, multilingual heuristic interpreter to bootstrap the
// generator inputs from a free-form description written by the user.

import type { UsageType } from "@/data/method";

export interface Interpreted {
  initiative: string;
  problem: string;
  users: string;
  value: string;
  risks: string;
  dataSensitivity: string;
  approvals: string;
  environment: string;
  tools: string;
  usageType: UsageType;
  autonomyLevel: 0 | 1 | 2 | 3 | 4 | 5;
  detectedSignals: string[];
}

const lower = (s: string) => s.toLowerCase();
const has = (t: string, words: string[]) => words.some((w) => lower(t).includes(w));

function firstSentence(text: string): string {
  const m = text.trim().match(/^[\s\S]{0,180}?[.!?](\s|$)/);
  return (m ? m[0] : text.trim().slice(0, 160)).trim();
}

function pickInitiative(text: string): string {
  const s = firstSentence(text).replace(/\s+/g, " ");
  // strip leading verbs in PT/ES/EN
  return s
    .replace(/^(quero|gostaria|preciso|necesito|quiero|i want to|i need to|we need to|we want to|i'd like to|build|create|construir|criar)\s+/i, "")
    .replace(/[.!?]+$/, "")
    .slice(0, 120);
}

export function interpret(text: string): Interpreted {
  const t = text.trim();
  const signals: string[] = [];

  // ---- Usage type ----
  let usageType: UsageType = "Software creation";
  if (has(t, ["automa", "workflow", "fluxo", "n8n", "zapier", "pipeline"])) {
    usageType = "Automation workflow"; signals.push("automation");
  } else if (has(t, ["arquitet", "architecture", "arquitec", "infra", "microserv"])) {
    usageType = "Architecture"; signals.push("architecture");
  } else if (has(t, ["descobrir", "discovery", "descubrir", "research", "pesquisa", "investiga"])) {
    usageType = "Product discovery"; signals.push("discovery");
  } else if (has(t, ["estratég", "estrateg", "strategy", "roadmap"])) {
    usageType = "Product strategy"; signals.push("strategy");
  } else if (has(t, ["ux", "experiência", "experiencia", "design de", "interface", "ui "])) {
    usageType = "UX design"; signals.push("ux");
  } else if (has(t, ["código", "code", "codigo", "função", "function", "api", "endpoint"])) {
    usageType = "Code generation"; signals.push("code");
  } else if (has(t, ["governanç", "gobernan", "governance", "compliance", "auditoria", "audit"])) {
    usageType = "Governance review"; signals.push("governance");
  } else if (has(t, ["validar valor", "validate value", "métrica", "metricas", "metrics", "kpi"])) {
    usageType = "Value validation"; signals.push("value");
  } else if (has(t, ["portal", "site", "app ", "produto", "product", "aplicación", "aplicação", "platform", "plataforma"])) {
    usageType = "Software creation"; signals.push("software");
  }

  // ---- Autonomy ----
  let autonomyLevel: Interpreted["autonomyLevel"] = 2;
  if (has(t, ["sensível", "sensible", "sensitive", "lgpd", "gdpr", "hipaa", "pii", "privac", "financeiro", "saúde", "salud", "health", "público", "publico", "public sector"])) {
    autonomyLevel = 1; signals.push("low autonomy (sensitive)");
  } else if (has(t, ["autônomo", "autonomo", "autonom", "sem revisão", "without review", "sin revisión", "sin revision"])) {
    autonomyLevel = 4; signals.push("high autonomy");
  } else if (has(t, ["aprov", "approval", "revisão", "review", "humano decide", "human decides"])) {
    autonomyLevel = 2; signals.push("draft + human approval");
  } else if (has(t, ["executar", "execute", "rodar", "run automatically", "automatic"])) {
    autonomyLevel = 3; signals.push("execute with review");
  }

  // ---- Users ----
  const userMatches: string[] = [];
  const userMap: Record<string, string[]> = {
    employees: ["colaborador", "funcionário", "funcionario", "empleado", "employee", "staff"],
    customers: ["cliente", "customer", "consumidor"],
    "internal teams": ["time interno", "internal team", "equipo interno", "área de", "area de"],
    citizens: ["cidadão", "ciudadano", "citizen"],
    "developers": ["desenvolvedor", "developer", "desarrollador", "engenheiro", "engineer"],
    "HR": ["rh", "rrhh", "recursos humanos", "hr "],
  };
  for (const [k, kws] of Object.entries(userMap)) if (has(t, kws)) userMatches.push(k);

  // ---- Risks / data ----
  const risks: string[] = [];
  if (has(t, ["lgpd", "gdpr", "pii", "privac"])) risks.push("data privacy");
  if (has(t, ["financ", "pagament", "payment", "pago"])) risks.push("financial impact");
  if (has(t, ["saúde", "salud", "health", "hipaa"])) risks.push("regulated health data");
  if (has(t, ["público", "publico", "public", "cidadão", "ciudadano"])) risks.push("public accountability");
  if (has(t, ["produção", "produccion", "production"])) risks.push("production impact");

  let dataSensitivity = "";
  if (has(t, ["lgpd", "gdpr", "pii", "dados pessoais", "personal data", "datos personales"])) dataSensitivity = "Personal data (LGPD/GDPR)";
  else if (has(t, ["financ", "pagament", "payment"])) dataSensitivity = "Financial data";
  else if (has(t, ["saúde", "salud", "health"])) dataSensitivity = "Health data";
  else if (has(t, ["interno", "internal"])) dataSensitivity = "Internal-only";

  // ---- Tools mentioned ----
  const toolNames = ["claude", "openai", "chatgpt", "gemini", "lovable", "cursor", "copilot", "windsurf", "replit", "n8n", "zapier", "servicenow", "supabase", "stripe"];
  const toolsFound = toolNames.filter((tn) => lower(t).includes(tn));

  // ---- Environment ----
  let environment = "";
  if (has(t, ["servicenow"])) environment = "ServiceNow";
  else if (has(t, ["web", "site", "portal", "saas"])) environment = "Web application";
  else if (has(t, ["mobile", "app móvel", "app movil"])) environment = "Mobile";
  else if (has(t, ["interno", "internal"])) environment = "Internal tool";

  // ---- Approvals ----
  let approvals = "";
  if (has(t, ["aprov", "approval", "revis"])) approvals = "Human approval before production releases";
  else if (autonomyLevel <= 2) approvals = "Human approval on each delivered artifact";

  // ---- Value ----
  let value = "";
  if (has(t, ["reduzir tempo", "reduce time", "reducir tiempo", "mais rápido", "faster"])) value = "Reduce delivery / response time";
  if (has(t, ["custo", "cost"])) value = (value ? value + "; " : "") + "Cost reduction";
  if (has(t, ["satisf", "experiência", "experiencia", "experience"])) value = (value ? value + "; " : "") + "Better user experience";
  if (has(t, ["escala", "scale"])) value = (value ? value + "; " : "") + "Scale operations";

  // ---- Problem ----
  // try to find a sentence with problem markers
  const sentences = t.split(/(?<=[.!?])\s+/);
  const probSent = sentences.find((s) => /problema|problem|dor|pain|dificuldad|dificultad|issue|gargalo|bottleneck/i.test(s));
  const problem = probSent?.trim() || (sentences.length > 1 ? sentences.slice(0, 2).join(" ").trim() : "");

  return {
    initiative: pickInitiative(t),
    problem,
    users: userMatches.join(", "),
    value,
    risks: risks.join(", "),
    dataSensitivity,
    approvals,
    environment,
    tools: toolsFound.join(", "),
    usageType,
    autonomyLevel,
    detectedSignals: signals,
  };
}
