import { AppLayout } from "@/components/layout/AppLayout";
import { Seo } from "@/components/Seo";
import { GeneratorWorkspace } from "@/components/generator/GeneratorWorkspace";

export default function GeneratorPage() {
  return (
    <AppLayout>
      <Seo title="Instruction Generator — HAD Method" description="Generate a tool-specific .md instruction file to configure your AI tool under the HAD Method." />
      <section className="had-section">
        <div className="had-wrap">
          <div className="mb-10 max-w-3xl">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3 mb-3">Generator</div>
            <h1 className="had-display text-ink" style={{ fontSize: "clamp(40px,5.2vw,80px)" }}>
              Tool-specific instruction generator.
            </h1>
            <p className="mt-6 text-lg text-ink-2 leading-relaxed">
              Choose your tool, define autonomy, describe the project. Get a ready-to-use Markdown instruction file aligned with the HAD Method.
            </p>
          </div>
          <GeneratorWorkspace />
        </div>
      </section>
    </AppLayout>
  );
}
