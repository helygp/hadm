import { principles } from "@/data/method";
import { SectionHead } from "@/components/sections/WhyHadSection";

export function DefinitionSection() {
  return (
    <section id="definition" className="had-section">
      <div className="had-wrap">
        <SectionHead
          num="02"
          label="Definition"
          title="What is HAD Method?"
          lede="HAD Method is a human-governed agentic delivery methodology for creating digital value with AI agents. It helps organizations structure how humans and agents collaborate across discovery, conception, design, architecture, build, validation, delivery and continuous evolution."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border had-hairline-2">
          {principles.map((p, i) => (
            <article
              key={p.id}
              className={`bg-surface p-7 lg:p-8 relative ${
                i < principles.length - 1 ? "border-b lg:border-b-0 lg:border-r had-hairline" : ""
              }`}
            >
              <div aria-hidden className="absolute inset-0 opacity-50 pointer-events-none"
                style={{ background: i === 0
                  ? "radial-gradient(circle at 80% 0%, hsla(220, 100%, 83%, 0.08), transparent 60%)"
                  : i === 3
                  ? "radial-gradient(circle at 80% 0%, hsla(142, 76%, 58%, 0.06), transparent 60%)"
                  : "radial-gradient(circle at 80% 0%, hsla(187, 100%, 50%, 0.05), transparent 60%)" }} />
              <div className="relative">
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3 mb-6">{p.num}</div>
                <h3 className="font-display text-2xl text-ink mb-3 tracking-tight">{p.title}</h3>
                <p className="text-ink-2 text-[15px] leading-relaxed">{p.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
