import { Link } from "react-router-dom";
import { ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Orbital } from "@/components/visuals/Orbital";
import { downloadStarterKit } from "@/lib/starterKitZip";
import { useToast } from "@/hooks/use-toast";
import { useT } from "@/i18n/I18nProvider";

export function HeroSection() {
  const { toast } = useToast();
  const t = useT();
  const onDownload = async () => {
    toast({ title: t.toasts.building });
    await downloadStarterKit();
    toast({ title: t.toasts.ready, description: t.toasts.readyDesc });
  };
  return (
    <section className="relative overflow-hidden border-b had-hairline">
      <div aria-hidden className="absolute inset-0 had-glow opacity-80 pointer-events-none" />
      <div aria-hidden className="absolute inset-0 had-bg-grid opacity-30 pointer-events-none" />
      <div className="had-wrap relative pt-24 md:pt-32 pb-20 md:pb-28">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div className="anim-fade-up">
            <span className="had-eyebrow mb-8 inline-flex">{t.hero.eyebrow}</span>
            <h1 className="had-display text-foreground" style={{ fontSize: "clamp(48px, 7.5vw, 116px)" }}>
              {t.hero.titleA}{" "}
              <span className="text-warm italic font-display font-normal">{t.hero.titleAgentic}</span>{" "}
              {t.hero.titleB}
            </h1>
            <p className="mt-8 max-w-xl text-lg md:text-xl text-ink-2 leading-relaxed">
              {t.hero.lede}
            </p>
            <div className="mt-7 py-4 border-y had-hairline flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-2">
              <span className="flex items-center gap-2"><Dot color="warm" /> {t.hero.pillars.humans}</span>
              <span className="flex items-center gap-2"><Dot color="accent" /> {t.hero.pillars.agents}</span>
              <span className="flex items-center gap-2"><Dot color="accent2" /> {t.hero.pillars.ai}</span>
              <span className="flex items-center gap-2"><Dot color="good" /> {t.hero.pillars.value}</span>
            </div>
            <div className="mt-9 flex flex-wrap gap-3 items-center">
              <Button
                onClick={onDownload}
                className="rounded-none h-12 px-6 bg-accent text-accent-foreground hover:bg-ink hover:text-background font-mono text-[12px] uppercase tracking-[0.12em]"
              >
                <Download className="size-4 mr-2" /> {t.hero.download}
              </Button>
              <Button asChild variant="outline" className="rounded-none h-12 px-6 border had-hairline-2 hover:border-ink font-mono text-[12px] uppercase tracking-[0.12em] bg-transparent">
                <Link to="/generator">{t.hero.configure} <ArrowRight className="size-4 ml-2" /></Link>
              </Button>
              <Link
                to="/community"
                className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-2 hover:text-ink py-3 inline-flex items-center gap-2"
              >
                {t.hero.join} <ArrowRight className="size-3.5" />
              </Link>
            </div>
            <div className="mt-16 grid grid-cols-3 border-t had-hairline">
              <Stat k={t.hero.statMethod} v="v0.1" />
              <Stat k={t.hero.statArtifacts} v="08" />
              <Stat k={t.hero.statToolkits} v="09" />
            </div>
          </div>
          <div className="relative w-full max-w-[560px] ml-auto aspect-square">
            <Orbital className="w-full h-full" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Dot({ color }: { color: "warm" | "accent" | "accent2" | "good" }) {
  const map = {
    warm: "hsl(var(--warm))",
    accent: "hsl(var(--accent))",
    accent2: "hsl(var(--accent-2))",
    good: "hsl(var(--good))",
  } as const;
  return <span className="block size-1.5 rounded-full" style={{ background: map[color] }} />;
}
function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="py-5 pr-5 border-r had-hairline last:border-r-0">
      <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-3">{k}</div>
      <div className="font-display text-3xl md:text-4xl mt-2 leading-none tracking-tight text-ink">{v}</div>
    </div>
  );
}
