import { autonomyLevels } from "@/data/method";
import { SectionHead } from "@/components/sections/WhyHadSection";
import { useT } from "@/i18n/I18nProvider";

export function AutonomyLevelsSection() {
  const t = useT();

  return (
    <section id="autonomy" className="had-section">
      <div className="had-wrap">
        <SectionHead num={t.autonomySection.num} label={t.autonomySection.label} title={t.autonomySection.title} lede={t.autonomySection.lede} />
        <div className="border had-hairline-2">
          <div className="hidden grid-cols-[120px_280px_1fr] border-b px-7 py-4 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-3 had-hairline md:grid">
            <span>{t.autonomySection.level}</span><span>{t.autonomySection.label}</span><span>{t.autonomySection.boundary}</span>
          </div>
          {autonomyLevels.map((item) => {
            const localized = t.autonomy[String(item.level)] ?? item;
            const name = localized.name.replace(/^L\d\s*·\s*/, "");
            return (
              <article key={item.level} className="grid gap-3 border-b p-6 last:border-b-0 had-hairline md:grid-cols-[120px_280px_1fr] md:items-center md:px-7">
                <div className="font-display text-3xl text-accent">L{item.level}</div>
                <h3 className="font-display text-xl text-ink">{name}</h3>
                <p className="text-[15px] leading-relaxed text-ink-2">{localized.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}