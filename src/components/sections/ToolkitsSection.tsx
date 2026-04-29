import { Link } from "react-router-dom";
import { ArrowRight, Download, Copy } from "lucide-react";
import { toolkits, type Toolkit } from "@/data/toolkits";
import { resolveToolFile } from "@/lib/toolFiles";
import { copyToClipboard, downloadText } from "@/lib/download";
import { SectionHead } from "@/components/sections/WhyHadSection";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface Props { compact?: boolean; }

export function ToolkitsSection({ compact }: Props) {
  const list = compact ? toolkits.slice(0, 6) : toolkits;
  return (
    <section id="toolkits" className="had-section bg-bg-2">
      <div className="had-wrap">
        <SectionHead
          num="05"
          label="AI Tool Configuration"
          title="Make your AI tools work through HAD Method."
          lede="Download tool-specific instruction files and configure your AI assistants, coding agents and software builders to operate under Human-Governed Agentic Delivery."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[hsla(0,0%,100%,0.08)] border had-hairline-2">
          {list.map((t) => <ToolkitCard key={t.id} t={t} />)}
        </div>
        {compact && (
          <div className="mt-10 flex justify-center">
            <Button asChild variant="outline" className="rounded-none h-11 px-6 border had-hairline-2 font-mono text-[11px] uppercase tracking-[0.14em] bg-transparent">
              <Link to="/toolkits">All toolkits <ArrowRight className="size-4 ml-2" /></Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

function ToolkitCard({ t }: { t: Toolkit }) {
  const { toast } = useToast();
  const dl = (file: typeof t.files[number]) => {
    downloadText(file.name, resolveToolFile(t, file));
    toast({ title: "Downloaded", description: file.name });
  };
  const cp = async (file: typeof t.files[number]) => {
    const ok = await copyToClipboard(resolveToolFile(t, file));
    toast({ title: ok ? "Copied" : "Copy failed", description: file.name, variant: ok ? "default" : "destructive" });
  };
  return (
    <article className="bg-surface p-7 flex flex-col">
      <div className="flex items-start justify-between mb-5">
        <div>
          <div className="size-12 grid place-items-center bg-surface-2 border had-hairline-2 font-mono text-xs tracking-[0.12em] text-accent mb-4">
            {t.mark}
          </div>
          <h3 className="font-display text-2xl text-ink tracking-tight">{t.name}</h3>
        </div>
      </div>
      <p className="text-ink-2 text-[15px] leading-relaxed">{t.blurb}</p>
      <div className="mt-5 pt-4 border-t had-hairline">
        <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-3 mb-3">Files</div>
        <ul className="flex flex-col gap-2">
          {t.files.map((f) => (
            <li key={f.name} className="flex items-center justify-between gap-2 group">
              <span className="font-mono text-[12px] text-ink-2 truncate">{f.name}</span>
              <span className="flex gap-1 shrink-0">
                <button onClick={() => cp(f)} className="size-7 grid place-items-center text-ink-3 hover:text-ink hover:bg-surface-2 transition-colors" aria-label={`Copy ${f.name}`}>
                  <Copy className="size-3.5" />
                </button>
                <button onClick={() => dl(f)} className="size-7 grid place-items-center text-ink-3 hover:text-accent hover:bg-surface-2 transition-colors" aria-label={`Download ${f.name}`}>
                  <Download className="size-3.5" />
                </button>
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-5 pt-4 border-t had-hairline flex items-center justify-between">
        <Link
          to={`/toolkits/${t.id}`}
          className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-2 hover:text-accent inline-flex items-center gap-2"
        >
          Open guide <ArrowRight className="size-3.5" />
        </Link>
      </div>
    </article>
  );
}
