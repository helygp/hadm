import { useCases } from "@/data/method";
import { SectionHead } from "@/components/sections/WhyHadSection";

export function UseCasesSection() {
  return (
    <section id="cases" className="had-section">
      <div className="had-wrap">
        <SectionHead
          num="06"
          label="Use Cases"
          title="Where HAD Method applies."
          lede="From enterprise transformation to startup MVPs, HAD provides a shared operating model wherever AI agents participate in delivery."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[hsla(0,0%,100%,0.08)] border had-hairline-2">
          {useCases.map((u, i) => (
            <article key={u.id} className="bg-surface p-7 flex flex-col">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3 mb-4">
                {String(i + 1).padStart(2, "0")} · {u.tag}
              </div>
              <h3 className="font-display text-xl text-ink tracking-tight mb-3">{u.name}</h3>
              <p className="text-ink-2 text-sm leading-relaxed flex-1">{u.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
