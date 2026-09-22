import { Check } from "lucide-react";
import { SectionHead } from "@/components/sections/WhyHadSection";
import { useT } from "@/i18n/I18nProvider";

export function HomeWhySummarySection() {
  const t = useT();

  return (
    <section id="why-had" className="had-section bg-bg-2">
      <div className="had-wrap">
        <SectionHead num={t.homeWhy.num} label={t.homeWhy.label} title={t.homeWhy.title} lede={t.homeWhy.lede} />
        <div className="grid border had-hairline-2 md:grid-cols-3">
          {t.homeWhy.points.map((point, index) => (
            <article key={point} className="min-h-[180px] border-b p-7 had-hairline last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0 md:p-8">
              <div className="mb-8 flex items-center justify-between gap-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <Check className="size-4 text-warm" />
              </div>
              <p className="text-[15px] leading-relaxed text-ink-2">{point}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}