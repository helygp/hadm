import { useCases } from "@/data/method";
import { SectionHead } from "@/components/sections/WhyHadSection";
import { useT } from "@/i18n/I18nProvider";

export function UseCasesSection() {
  const t = useT();
  return (
    <section id="cases" className="had-section">
      <div className="had-wrap">
        <SectionHead num={t.useCasesSection.num} label={t.useCasesSection.label} title={t.useCasesSection.title} lede={t.useCasesSection.lede} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[hsla(0,0%,100%,0.08)] border had-hairline-2">
          {useCases.map((u, i) => {
            const tu = t.useCases[u.id] ?? { name: u.name, tag: u.tag, body: u.body };
            return (
              <article key={u.id} className="bg-surface p-7 flex flex-col">
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3 mb-4">
                  {String(i + 1).padStart(2, "0")} · {tu.tag}
                </div>
                <h3 className="font-display text-xl text-ink tracking-tight mb-3">{tu.name}</h3>
                <p className="text-ink-2 text-sm leading-relaxed flex-1">{tu.body}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
