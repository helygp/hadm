import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Download, Copy, Eye, ArrowRight, Search } from "lucide-react";
import { artifacts, ARTIFACT_KINDS, type Artifact } from "@/data/artifacts";
import { artifactBodies } from "@/content/artifactBodies";
import { SectionHead } from "@/components/sections/WhyHadSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { copyToClipboard, downloadText } from "@/lib/download";
import { downloadStarterKit } from "@/lib/starterKitZip";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Props { compact?: boolean; }

export function ArtifactsSection({ compact }: Props) {
  const [filter, setFilter] = useState<string>("All");
  const [q, setQ] = useState("");
  const [preview, setPreview] = useState<Artifact | null>(null);
  const { toast } = useToast();

  const list = useMemo(() => {
    let l = artifacts;
    if (filter !== "All") l = l.filter((a) => a.kind === filter);
    if (q.trim()) {
      const t = q.toLowerCase();
      l = l.filter((a) => a.title.toLowerCase().includes(t) || a.description.toLowerCase().includes(t));
    }
    return compact ? l.slice(0, 6) : l;
  }, [filter, q, compact]);

  const handleDownload = (a: Artifact) => {
    if (a.id === "starter-kit") {
      toast({ title: "Building Starter Kit…" });
      downloadStarterKit().then(() =>
        toast({ title: "Starter Kit ready", description: "HAD-Starter-Kit.zip downloaded." })
      );
      return;
    }
    const body = artifactBodies[a.bodyKey] ?? "";
    downloadText(`${a.id}.md`, body);
    toast({ title: "Downloaded", description: `${a.id}.md` });
  };
  const handleCopy = async (a: Artifact) => {
    const body = artifactBodies[a.bodyKey] ?? "";
    const ok = await copyToClipboard(body);
    toast({ title: ok ? "Copied to clipboard" : "Copy failed", variant: ok ? "default" : "destructive" });
  };

  return (
    <section id="artifacts" className="had-section">
      <div className="had-wrap">
        <SectionHead
          num="04"
          label="Artifact Library"
          title="Open artifacts. Ready to use."
          lede="Manifesto, canvas, prompts, agents, checklists and templates. Everything you need to operate under the HAD Method, downloadable as Markdown, PDF or as a complete Starter Kit."
        />
        <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between mb-8">
          <div className="flex flex-wrap gap-2">
            {["All", ...ARTIFACT_KINDS].map((k) => (
              <button
                key={k}
                onClick={() => setFilter(k)}
                className={`had-chip transition-colors ${
                  filter === k ? "border-ink text-ink" : "hover:border-ink-3"
                }`}
              >
                {k}
              </button>
            ))}
          </div>
          <div className="relative max-w-xs w-full">
            <Search className="size-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-ink-3" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search artifacts"
              className="pl-9 h-10 rounded-none bg-surface border had-hairline-2 font-mono text-[12px] tracking-[0.04em]"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[hsla(0,0%,100%,0.08)] border had-hairline-2">
          {list.length === 0 && (
            <div className="bg-surface p-12 text-center text-ink-3 col-span-full font-mono text-[12px] uppercase tracking-[0.14em]">
              No artifacts match.
            </div>
          )}
          {list.map((a) => (
            <article key={a.id} className="bg-surface p-7 flex flex-col">
              <div className="flex items-start justify-between gap-4 mb-5">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-3 mb-2">
                    {a.kind} · {a.version}
                  </div>
                  <h3 className="font-display text-2xl text-ink tracking-tight leading-tight">{a.title}</h3>
                </div>
              </div>
              <p className="text-ink-2 text-[15px] leading-relaxed flex-1">{a.description}</p>
              <div className="flex flex-wrap gap-1.5 mt-5">
                {a.formats.map((f) => (
                  <span key={f} className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-3 border had-hairline-2 px-2 py-1">
                    {f}
                  </span>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-2 mt-6 pt-5 border-t had-hairline">
                <Button onClick={() => setPreview(a)} variant="ghost"
                  className="rounded-none h-9 font-mono text-[10px] uppercase tracking-[0.14em] hover:bg-surface-2">
                  <Eye className="size-3.5 mr-1.5" /> Preview
                </Button>
                <Button onClick={() => handleDownload(a)} variant="ghost"
                  className="rounded-none h-9 font-mono text-[10px] uppercase tracking-[0.14em] hover:bg-surface-2">
                  <Download className="size-3.5 mr-1.5" /> Download
                </Button>
                <Button onClick={() => handleCopy(a)} variant="ghost"
                  className="rounded-none h-9 font-mono text-[10px] uppercase tracking-[0.14em] hover:bg-surface-2">
                  <Copy className="size-3.5 mr-1.5" /> Copy
                </Button>
              </div>
            </article>
          ))}
        </div>
        {compact && (
          <div className="mt-10 flex justify-center">
            <Button asChild variant="outline" className="rounded-none h-11 px-6 border had-hairline-2 font-mono text-[11px] uppercase tracking-[0.14em] bg-transparent">
              <Link to="/artifacts">Open full library <ArrowRight className="size-4 ml-2" /></Link>
            </Button>
          </div>
        )}
      </div>

      <Dialog open={!!preview} onOpenChange={(v) => !v && setPreview(null)}>
        <DialogContent className="bg-surface border had-hairline-2 max-w-3xl max-h-[85vh] overflow-y-auto rounded-none">
          {preview && (
            <>
              <DialogHeader>
                <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-3 mb-2">
                  {preview.kind} · {preview.version}
                </div>
                <DialogTitle className="font-display text-3xl text-ink tracking-tight">
                  {preview.title}
                </DialogTitle>
              </DialogHeader>
              <article className="prose prose-invert max-w-none mt-4 text-ink-2 prose-headings:text-ink prose-headings:font-display prose-headings:tracking-tight prose-strong:text-ink prose-code:text-accent prose-a:text-accent">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {artifactBodies[preview.bodyKey] ?? "_Coming soon._"}
                </ReactMarkdown>
              </article>
              <div className="flex gap-2 mt-6 pt-5 border-t had-hairline">
                <Button onClick={() => handleDownload(preview)} className="rounded-none bg-accent text-accent-foreground font-mono text-[11px] uppercase tracking-[0.12em]">
                  <Download className="size-3.5 mr-2" /> Download
                </Button>
                <Button onClick={() => handleCopy(preview)} variant="outline" className="rounded-none border had-hairline-2 font-mono text-[11px] uppercase tracking-[0.12em] bg-transparent">
                  <Copy className="size-3.5 mr-2" /> Copy Markdown
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
