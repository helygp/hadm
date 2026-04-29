import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Copy, Download } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Seo } from "@/components/Seo";
import { getToolkit } from "@/data/toolkits";
import { resolveToolFile } from "@/lib/toolFiles";
import { copyToClipboard, downloadText } from "@/lib/download";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useT } from "@/i18n/I18nProvider";

export default function ToolkitDetailPage() {
  const { toolId } = useParams();
  const t = useT();
  const tk = getToolkit(toolId ?? "");
  const { toast } = useToast();
  if (!tk) {
    return (
      <AppLayout>
        <div className="had-wrap py-32 text-center">
          <p className="font-mono text-ink-3">{t.toolkitsSection.notFound}</p>
          <Link to="/toolkits" className="mt-4 inline-block text-accent">{t.toolkitsSection.back}</Link>
        </div>
      </AppLayout>
    );
  }
  const tt = t.toolkits[tk.id] ?? { blurb: tk.blurb, setup: tk.setup };
  const dl = (f: typeof tk.files[number]) => { downloadText(f.name, resolveToolFile(tk, f)); toast({ title: t.toasts.downloaded, description: f.name }); };
  const cp = async (f: typeof tk.files[number]) => { const ok = await copyToClipboard(resolveToolFile(tk, f)); toast({ title: ok ? t.toasts.copied : t.toasts.copyFailed, description: f.name }); };
  return (
    <AppLayout>
      <Seo title={`${tk.name} — HAD Toolkit`} description={tt.blurb} />
      <section className="had-section">
        <div className="had-wrap">
          <Link to="/toolkits" className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-3 hover:text-ink inline-flex items-center gap-2 mb-8">
            <ArrowLeft className="size-3.5" /> {t.toolkitsSection.back}
          </Link>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] items-start">
            <div>
              <div className="size-16 grid place-items-center bg-surface-2 border had-hairline-2 font-mono text-sm tracking-[0.12em] text-accent mb-6">{tk.mark}</div>
              <h1 className="had-display text-ink" style={{ fontSize: "clamp(40px,5vw,72px)" }}>{tk.name}</h1>
              <p className="text-ink-2 text-lg mt-6 max-w-md leading-relaxed">{tt.blurb}</p>
              <div className="mt-10">
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3 mb-4">{t.toolkitsSection.recommended}</div>
                <ol className="flex flex-col gap-3">
                  {tt.setup.map((s, i) => (
                    <li key={i} className="grid grid-cols-[28px_1fr] gap-3 text-ink-2 leading-relaxed">
                      <span className="font-mono text-[10px] tracking-[0.14em] text-ink-4 mt-1.5">{String(i + 1).padStart(2, "0")}</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="bg-surface border had-hairline-2 p-7 md:p-9">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3 mb-5">{t.toolkitsSection.downloads}</div>
              <ul className="flex flex-col">
                {tk.files.map((f) => (
                  <li key={f.name} className="flex items-center justify-between gap-3 py-4 border-b had-hairline last:border-b-0">
                    <span className="font-mono text-[13px] text-ink truncate">{f.name}</span>
                    <span className="flex gap-1">
                      <Button onClick={() => cp(f)} variant="ghost" size="sm" className="rounded-none font-mono text-[10px] uppercase tracking-[0.14em]"><Copy className="size-3.5 mr-1.5" />{t.artifactsSection.copy}</Button>
                      <Button onClick={() => dl(f)} variant="ghost" size="sm" className="rounded-none font-mono text-[10px] uppercase tracking-[0.14em] text-accent"><Download className="size-3.5 mr-1.5" />{t.artifactsSection.download}</Button>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </AppLayout>
  );
}
