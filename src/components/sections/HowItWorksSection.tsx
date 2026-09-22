import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { ApiAccessDialog } from "@/components/ApiAccessDialog";
import { Button } from "@/components/ui/button";
import { SectionHead } from "@/components/sections/WhyHadSection";
import { useT } from "@/i18n/I18nProvider";

export function HowItWorksSection() {
  const t = useT();
  const [open, setOpen] = useState(false);
  const steps = [t.howItWorks.steps.send, t.howItWorks.steps.decide, t.howItWorks.steps.act];

  return (
    <section id="how-it-works" className="had-section bg-bg-2">
      <div className="had-wrap">
        <div className="mb-7 inline-flex border border-accent px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
          {t.howItWorks.status}
        </div>
        <SectionHead num={t.howItWorks.num} label={t.howItWorks.label} title={t.howItWorks.title} lede={t.howItWorks.lede} />
        <div className="grid border had-hairline-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <article key={step.title} className="min-h-[220px] border-b p-7 had-hairline lg:border-b-0 lg:border-r lg:last:border-r-0 md:p-9">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">0{index + 1}</div>
              <h3 className="mt-8 font-display text-2xl text-ink">{step.title}</h3>
              <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-ink-2">{step.description}</p>
            </article>
          ))}
        </div>
        <div className="grid border-x border-b had-hairline-2 lg:grid-cols-[1fr_auto] lg:items-end">
          <pre className="overflow-x-auto p-7 font-mono text-xs leading-7 text-ink-2 md:p-9 md:text-sm"><code><span className="text-accent">POST</span> /gate{"\n"}{'{ "state": {...}, "autonomy_level": "L3" }'}{"\n\n"}<span className="text-warm">→</span> {'{ "decision": "escalate", "confidence": 0.81 }'}</code></pre>
          <div className="border-t p-7 had-hairline lg:border-l lg:border-t-0 md:p-9">
            <Button onClick={() => setOpen(true)} className="h-11 rounded-none bg-accent px-5 font-mono text-[11px] uppercase tracking-[0.12em] text-accent-foreground hover:bg-ink hover:text-background">
              {t.howItWorks.requestAccess}<ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>
      <ApiAccessDialog open={open} onOpenChange={setOpen} />
    </section>
  );
}