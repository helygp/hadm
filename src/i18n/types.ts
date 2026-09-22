export type Lang = "pt" | "es" | "en";

export interface LoopStepT { name: string; blurb: string; detail: string }
export interface PrincipleT { title: string; description: string }
export interface AutonomyT { name: string; description: string }
export interface UseCaseT { name: string; tag: string; body: string }
export interface FaqT { q: string; a: string }
export interface ContribT { title: string; desc: string }
export interface ArtifactT { title: string; description: string }
export interface ToolkitT { blurb: string; setup: string[] }

export interface Dict {
  meta: {
    siteTitle: string;
    siteDesc: string;
    artifactsTitle: string;
    artifactsDesc: string;
    toolkitsTitle: string;
    toolkitsDesc: string;
    generatorTitle: string;
    generatorDesc: string;
    communityTitle: string;
    communityDesc: string;
    contributeTitle: string;
    contributeDesc: string;
    caseTitle: string;
    caseDesc: string;
  };
  nav: { howItWorks: string; method: string; loop: string; artifacts: string; toolkits: string; community: string; cases: string; faq: string; generator: string; allToolkits: string; library: string };
  header: { starterKit: string; toggleTheme: string; openMenu: string; downloadStarterKit: string; lang: string };
  toasts: { building: string; ready: string; readyDesc: string; failed: string; downloaded: string; copied: string; copyFailed: string; saved: string; submitting: string; required: string };
  hero: {
    eyebrow: string;
    titleA: string;
    titleAgentic: string;
    titleB: string;
    lede: string;
    pillars: { humans: string; agents: string; ai: string; value: string };
    requestAccess: string;
    download: string;
    configure: string;
    join: string;
    statMethod: string;
    statArtifacts: string;
    statToolkits: string;
  };
  accessRequest: {
    title: string; description: string; email: string; emailPlaceholder: string;
    submit: string; submitting: string; success: string; successBody: string;
    invalidEmail: string; duplicate: string; failed: string;
  };
  howItWorks: {
    num: string; label: string; status: string; title: string; lede: string;
    steps: { send: { title: string; description: string }; decide: { title: string; description: string }; act: { title: string; description: string } };
    requestAccess: string;
  };
  autonomySection: { num: string; label: string; title: string; lede: string; level: string; boundary: string };
  whyHad: {
    num: string; label: string; title: string; lede: string;
    agileTitle: string; agileKicker: string; agile: string[];
    hadTitle: string; hadKicker: string; had: string[];
  };
  definition: { num: string; label: string; title: string; lede: string };
  loop: { num: string; label: string; title: string; lede: string; humanGov: string; steps: Record<string, LoopStepT> };
  principles: Record<string, PrincipleT>;
  autonomy: Record<string, AutonomyT>;
  artifactsSection: { num: string; label: string; title: string; lede: string; search: string; preview: string; download: string; copy: string; openLib: string; comingSoon: string; noMatch: string; allFilter: string; downloadBtn: string; copyMd: string };
  artifactKinds: Record<string, string>;
  artifacts: Record<string, ArtifactT>;
  toolkitsSection: { num: string; label: string; title: string; lede: string; allBtn: string; files: string; openGuide: string; recommended: string; downloads: string; back: string; notFound: string };
  toolkits: Record<string, ToolkitT>;
  useCasesSection: { num: string; label: string; title: string; lede: string };
  useCases: Record<string, UseCaseT>;
  faqSection: { num: string; label: string; title: string; lede: string };
  faqs: FaqT[];
  community: { num: string; label: string; title: string; lede: string; intro: string; benefits: string[]; openForm: string; success: string; successBody: string; submitAnother: string; apply: string; submitting: string; fields: { name: string; email: string; linkedin: string; role: string; company: string; country: string; interest: string; interestPh: string; contributeAs: string }; roles: string[]; required: string };
  contribute: { num: string; label: string; title: string; lede: string; modalTitle: string; thanks: string; thanksBody: string; yourName: string; yourEmail: string; yourProposal: string; submit: string };
  contributionPaths: Record<string, ContribT>;
  caseSection: { num: string; label: string; title: string; lede: string; success: string; successBody: string; fields: { title: string; industry: string; problem: string; agentHelp: string; gov: string; value: string }; submit: string };
  generator: {
    title: string; lede: string; configure: string;
    tool: string; usage: string; autonomy: string;
    initiative: string; environment: string; problem: string;
    users: string; value: string; risks: string; data: string; approvals: string; toolsInvolved: string;
    rendered: string; raw: string; copy: string; download: string; save: string; reset: string;
    genericTool: string;
    // guided journey
    steps: { tell: string; interpret: string; choose: string; review: string };
    stepHints: { tell: string; interpret: string; choose: string; review: string };
    tellTitle: string; tellLede: string; tellPlaceholder: string; tellMin: string;
    interpretTitle: string; interpretLede: string; interpretedFrom: string;
    chooseTitle: string; chooseLede: string;
    reviewTitle: string; reviewLede: string;
    next: string; back: string; startOver: string;
    autoFilled: string; pleaseFill: string;
    suggestions: string; useSuggestion: string;
    detectedIntent: string; missingInfo: string; allGood: string;
    hints: Record<string, string>;
    placeholders: Record<string, string>;
  };
  usageTypes: Record<string, string>;
  footer: { tagA: string; tagB: string; tagC: string; tagD: string; intro: string; methodCol: string; resourcesCol: string; communityCol: string; copy: string; built: string; whyHad: string; loop: string; faq: string; artifactLib: string; aiTools: string; instr: string; applyFounding: string; suggestCase: string; contribute: string };
  notFound: { title: string; subtitle: string; back: string };
  tweaks: { title: string; hue: string; contrast: string; density: string; radius: string; motion: string; reset: string; note: string };
  orbital: { human: string; governance: string; core: string; valueFlow: string; discover: string; conceive: string; deliver: string; validate: string };
}
