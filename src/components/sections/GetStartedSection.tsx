import { Link } from "react-router-dom";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { ApiAccessDialog } from "@/components/ApiAccessDialog";
import { Button } from "@/components/ui/button";
import { SectionHead } from "@/components/sections/WhyHadSection";
import { useT } from "@/i18n/I18nProvider";

export function GetStartedSection() {
  const [open, setOpen] = useState(false);
  const t = useT();

  return (
    <section id="get-started" className="had-section">
      <div className="had-wrap">
        <SectionHead num={t.getStarted.num} label={t.getStarted.label} title={t.getStarted.title} lede={t.getStarted.lede} />
        <div className="grid border had-hairline-2 md:grid-cols-2">
          <article className="bg-surface p-8 had-hairline border-b md:border-b-0 md:border-r md:p-10">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent mb-4">01</div>
            <h3 className="font-display text-3xl text-ink tracking-tight">{t.getStarted.useTitle}</h3>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-2">{t.getStarted.useBody}</p>
            <Link
              to="/generator"
              className="mt-8 inline-flex h-11 items-center gap-2 border had-hairline-2 px-5 font-mono text-[11px] uppercase tracking-[0.12em] text-ink transition-colors hover:border-ink"
            >
              {t.getStarted.useButton}
              <ArrowRight className="size-4" />
            </Link>
          </article>
          <article className="bg-surface p-8 md:p-10">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent mb-4">02</div>
            <h3 className="font-display text-3xl text-ink tracking-tight">{t.getStarted.apiTitle}</h3>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-2">{t.getStarted.apiBody}</p>
            <Button
              onClick={() => setOpen(true)}
              className="mt-8 h-11 rounded-none bg-accent px-5 font-mono text-[11px] uppercase tracking-[0.12em] text-accent-foreground hover:bg-ink hover:text-background"
            >
              {t.getStarted.apiButton}
              <ArrowRight className="size-4" />
            </Button>
          </article>
        </div>
      </div>
      <ApiAccessDialog open={open} onOpenChange={setOpen} />
    </section>
  );
}