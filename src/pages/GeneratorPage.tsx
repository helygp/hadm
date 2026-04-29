import { AppLayout } from "@/components/layout/AppLayout";
import { Seo } from "@/components/Seo";
import { GeneratorWorkspace } from "@/components/generator/GeneratorWorkspace";
import { useT } from "@/i18n/I18nProvider";

export default function GeneratorPage() {
  const t = useT();
  return (
    <AppLayout>
      <Seo title={t.meta.generatorTitle} description={t.meta.generatorDesc} />
      <section className="had-section">
        <div className="had-wrap">
          <div className="mb-10 max-w-3xl">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3 mb-3">{t.nav.generator}</div>
            <h1 className="had-display text-ink" style={{ fontSize: "clamp(40px,5.2vw,80px)" }}>
              {t.generator.title}
            </h1>
            <p className="mt-6 text-lg text-ink-2 leading-relaxed">{t.generator.lede}</p>
          </div>
          <GeneratorWorkspace />
        </div>
      </section>
    </AppLayout>
  );
}
