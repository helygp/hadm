import { Check, Minus } from "lucide-react";
import { useT } from "@/i18n/I18nProvider";

export function WhyHadSection() {
  const t = useT();
  return (
    <section id="method" className="had-section">
      <div className="had-wrap">
        <SectionHead num={t.whyHad.num} label={t.whyHad.label} title={t.whyHad.title} lede={t.whyHad.lede} />
        <div className="grid grid-cols-1 md:grid-cols-2 had-hairline-2 border">
          <Column title={t.whyHad.agileTitle} kicker={t.whyHad.agileKicker} items={t.whyHad.agile} tone="muted" />
          <Column title={t.whyHad.hadTitle} kicker={t.whyHad.hadKicker} items={t.whyHad.had} tone="bright" />
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
