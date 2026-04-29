import { Check, Minus } from "lucide-react";

const agile = [
  "Human teams interpret requirements",
  "Backlogs guide execution",
  "Sprints organize effort",
  "Delivery depends on human production capacity",
  "Governance often comes late",
];
const had = [
  "Humans govern intent, risk and responsibility",
  "Agents can participate in conception and delivery",
  "Context guides autonomous execution",
  "Value is validated continuously",
  "Governance is embedded from the beginning",
];

export function WhyHadSection() {
  return (
    <section id="method" className="had-section">
      <div className="had-wrap">
        <SectionHead num="01" label="Why HAD" title="Agile organized humans. HAD organizes intelligence." lede="Agile was created for human teams delivering software. Today, AI agents can research, analyze, design, build, test, document and evolve digital products. The challenge is no longer only speed — it is governance, intent, trust and value validation." />
        <div className="grid grid-cols-1 md:grid-cols-2 had-hairline-2 border">
          <Column
            title="Traditional Agile"
            kicker="Human-driven"
            items={agile}
            tone="muted"
          />
          <Column
            title="HAD Method"
            kicker="Human-governed, agent-powered"
            items={had}
            tone="bright"
          />
        </div>
      </div>
    </section>
  );
}

export function SectionHead({ num, label, title, lede }: { num: string; label: string; title: string; lede: string; }) {
  return (
    <div className="grid gap-6 md:gap-12 md:grid-cols-[200px_1fr] mb-12 md:mb-16 items-start">
      <div className="md:sticky md:top-24">
        <div className="font-mono text-[11px] tracking-[0.14em] text-ink-4 mb-2">{num}</div>
        <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-2">{label}</div>
      </div>
      <div className="max-w-[780px]">
        <h2 className="had-display text-ink" style={{ fontSize: "clamp(34px, 5vw, 68px)" }}>{title}</h2>
        <p className="mt-6 text-lg text-ink-2 max-w-2xl leading-relaxed">{lede}</p>
      </div>
    </div>
  );
}

function Column({ title, kicker, items, tone }: { title: string; kicker: string; items: string[]; tone: "muted" | "bright" }) {
  const Icon = tone === "muted" ? Minus : Check;
  const iconColor = tone === "muted" ? "text-ink-4" : "text-warm";
  return (
    <div className="bg-surface p-8 md:p-10 border-r-0 md:[&:last-child]:border-l had-hairline border-b md:border-b-0 last:border-b-0">
      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3 mb-3">{kicker}</div>
      <h3 className="font-display text-3xl md:text-4xl text-ink mb-8 tracking-tight">{title}</h3>
      <ul className="flex flex-col gap-3.5">
        {items.map((it) => (
          <li key={it} className="grid grid-cols-[18px_1fr] gap-3 text-ink-2 items-start">
            <Icon className={`size-4 mt-1 ${iconColor}`} />
            <span className="leading-snug">{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
