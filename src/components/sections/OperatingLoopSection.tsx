import { useState } from "react";
import { operatingLoop, type LoopStep } from "@/data/method";
import { SectionHead } from "@/components/sections/WhyHadSection";

const ROLE_COLOR: Record<LoopStep["role"], string> = {
  Human: "hsl(var(--warm))",
  Agent: "hsl(var(--accent))",
  Hybrid: "hsl(var(--accent-2))",
  Value: "hsl(var(--good))",
};

export function OperatingLoopSection() {
  const [active, setActive] = useState<string>(operatingLoop[0].id);
  const current = operatingLoop.find((s) => s.id === active)!;
  const size = 480;
  const c = size / 2;
  const r = 180;
  const N = operatingLoop.length;

  return (
    <section id="loop" className="had-section bg-bg-2">
      <div className="had-wrap">
        <SectionHead
          num="03"
          label="Operating Loop"
          title="The HAD Operating Loop."
          lede="A continuous loop where humans govern, agents conceive, AI delivers and evidence validates. Seven stages with explicit ownership and autonomy contracts."
        />
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] items-start">
          <div className="relative w-full max-w-[520px] mx-auto aspect-square">
            <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full" aria-hidden="true">
              <circle cx={c} cy={c} r={r} fill="none" stroke="hsla(0,0%,100%,0.10)" strokeDasharray="2 6" />
              <circle cx={c} cy={c} r={60} fill="hsl(var(--surface))" stroke="hsl(var(--warm))" strokeWidth="1.5" />
              <text x={c} y={c - 4} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" letterSpacing="2" fill="hsl(var(--warm))">HUMAN</text>
              <text x={c} y={c + 10} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" letterSpacing="2" fill="hsl(var(--warm))">GOVERNANCE</text>
              {operatingLoop.map((s, i) => {
                const ang = (i / N) * 2 * Math.PI - Math.PI / 2;
                const x = c + Math.cos(ang) * r;
                const y = c + Math.sin(ang) * r;
                const isActive = s.id === active;
                return (
                  <g key={s.id} onClick={() => setActive(s.id)} style={{ cursor: "pointer" }}>
                    <circle cx={x} cy={y} r={isActive ? 14 : 10} fill={isActive ? ROLE_COLOR[s.role] : "hsl(var(--surface-2))"} stroke={ROLE_COLOR[s.role]} strokeWidth={isActive ? 0 : 1.5} />
                    <text x={x} y={y + 32} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" letterSpacing="2"
                      fill={isActive ? "hsl(var(--ink))" : "hsl(var(--ink-3))"}>
                      {s.num} · {s.name.toUpperCase()}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
          <div className="bg-surface border had-hairline-2 p-8 md:p-10 min-h-[420px]">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3 flex items-center gap-3">
              <span>{current.num}</span>
              <span className="size-1 rounded-full bg-ink-4" />
              <span style={{ color: ROLE_COLOR[current.role] }}>{current.role}</span>
            </div>
            <h3 className="font-display text-4xl md:text-5xl text-ink mt-3 tracking-tight">{current.name}</h3>
            <p className="text-ink-2 mt-5 text-lg leading-relaxed">{current.blurb}</p>
            <p className="text-ink-3 mt-4 text-[15px] leading-relaxed">{current.detail}</p>
            <div className="mt-8 flex flex-wrap gap-2">
              {operatingLoop.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActive(s.id)}
                  className={`had-chip transition-colors ${
                    s.id === active ? "border-ink text-ink" : "hover:border-ink-3"
                  }`}
                >
                  <span className="size-1.5 rounded-full" style={{ background: ROLE_COLOR[s.role] }} />
                  {s.num} {s.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
