import { AppLayout } from "@/components/layout/AppLayout";
import { Seo } from "@/components/Seo";
import { DefinitionSection } from "@/components/sections/DefinitionSection";
import { OperatingLoopSection } from "@/components/sections/OperatingLoopSection";
import { UseCasesSection } from "@/components/sections/UseCasesSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { useT } from "@/i18n/I18nProvider";

export default function MethodPage() {
  const t = useT();

  return (
    <AppLayout>
      <Seo title={t.meta.methodTitle} description={t.meta.methodDesc} />
      <section className="relative overflow-hidden border-b had-hairline">
        <div aria-hidden className="absolute inset-0 had-bg-grid opacity-20 pointer-events-none" />
        <div className="had-wrap relative py-20 md:py-28">
          <div className="max-w-4xl">
            <span className="had-eyebrow mb-8 inline-flex">{t.methodReference.eyebrow}</span>
            <h1 className="had-display text-ink" style={{ fontSize: "clamp(44px, 6vw, 92px)" }}>
              {t.methodReference.title}
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink-2">{t.methodReference.lede}</p>
          </div>
        </div>
      </section>
      <DefinitionSection />
      <OperatingLoopSection />
      <UseCasesSection />
      <FaqSection />
    </AppLayout>
  );
}