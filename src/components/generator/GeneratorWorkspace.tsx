import { useMemo, useState } from "react";
import { Copy, Download, RefreshCw, Save, FileCode, Eye, ArrowRight, ArrowLeft, Sparkles, Check, AlertCircle, Info } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { toolkits } from "@/data/toolkits";
import { autonomyLevels, usageTypes, type AutonomyLevel, type UsageType } from "@/data/method";
import { buildInstruction, type GeneratorInput } from "@/lib/generator";
import { interpret } from "@/lib/interpret";
import { copyToClipboard, downloadText } from "@/lib/download";
import { saveFile } from "@/lib/starterKit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { useT } from "@/i18n/I18nProvider";

const EMPTY = {
  toolId: "claude",
  usageType: "Software creation" as UsageType,
  autonomyLevel: 2 as AutonomyLevel["level"],
  initiative: "", problem: "", users: "", value: "",
  risks: "", dataSensitivity: "", approvals: "",
  environment: "", tools: "",
  brief: "",
  autoFilled: {} as Record<string, boolean>,
};

type Step = 0 | 1 | 2 | 3;

export function GeneratorWorkspace() {
  const { toast } = useToast();
  const t = useT();
  const [s, setS] = useState(EMPTY);
  const [step, setStep] = useState<Step>(0);
  const [signals, setSignals] = useState<string[]>([]);

  const tool = toolkits.find((tk) => tk.id === s.toolId) ?? { id: "generic", name: t.generator.genericTool };
  const autonomy = autonomyLevels.find((a) => a.level === s.autonomyLevel)!;
  const tAuton = t.autonomy[String(autonomy.level)] ?? { name: autonomy.name, description: autonomy.description };

  const input: GeneratorInput = {
    toolId: tool.id, toolName: tool.name, usageType: s.usageType,
    autonomy: { level: autonomy.level, name: tAuton.name, description: tAuton.description },
    initiative: s.initiative, problem: s.problem, users: s.users, value: s.value,
    risks: s.risks, dataSensitivity: s.dataSensitivity, approvals: s.approvals,
    environment: s.environment, tools: s.tools,
  };
  const md = useMemo(() => buildInstruction(input), [input]);
  const filename = `had-${tool.id}-instructions.md`;

  // Track which interpreted fields are still empty
  const interpretFields = ["initiative", "problem", "users", "value", "risks", "dataSensitivity", "approvals", "environment"] as const;
  const missing = interpretFields.filter((k) => !String((s as any)[k] ?? "").trim());

  const handleInterpret = () => {
    const r = interpret(s.brief);
    const af: Record<string, boolean> = {};
    const next = { ...s };
    (interpretFields as readonly string[]).forEach((k) => {
      const v = (r as any)[k];
      if (v && !String((s as any)[k]).trim()) { (next as any)[k] = v; af[k] = true; }
    });
    if (r.tools && !s.tools.trim()) { next.tools = r.tools; af.tools = true; }
    next.usageType = r.usageType;
    next.autonomyLevel = r.autonomyLevel;
    next.autoFilled = af;
    setS(next);
    setSignals(r.detectedSignals);
    setStep(1);
  };

  const onCopy = async () => {
    const ok = await copyToClipboard(md);
    toast({ title: ok ? t.toasts.copied : t.toasts.copyFailed, variant: ok ? "default" : "destructive" });
  };
  const onDownload = () => { downloadText(filename, md); toast({ title: t.toasts.downloaded, description: filename }); };
  const onSave = () => { saveFile(filename, md); toast({ title: t.toasts.saved, description: filename }); };
  const onReset = () => { setS(EMPTY); setSignals([]); setStep(0); };

  const stepLabels = [t.generator.steps.tell, t.generator.steps.interpret, t.generator.steps.choose, t.generator.steps.review];
  const stepHints = [t.generator.stepHints.tell, t.generator.stepHints.interpret, t.generator.stepHints.choose, t.generator.stepHints.review];

  const canNext =
    step === 0 ? s.brief.trim().length >= 30 :
    step === 1 ? !!s.initiative.trim() :
    step === 2 ? !!s.toolId :
    true;

  return (
    <TooltipProvider delayDuration={150}>
    <div className="border had-hairline-2 bg-surface">
      {/* Stepper */}
      <div className="grid grid-cols-4 border-b had-hairline">
        {stepLabels.map((label, i) => {
          const active = i === step;
          const done = i < step;
          return (
            <button
              key={i}
              type="button"
              onClick={() => i < step && setStep(i as Step)}
              className={`px-4 md:px-6 py-4 text-left border-r last:border-r-0 had-hairline transition-colors ${
                active ? "bg-surface-2" : done ? "hover:bg-surface-2 cursor-pointer" : "opacity-60 cursor-default"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className={`font-mono text-[10px] tracking-[0.16em] ${active ? "text-accent" : done ? "text-ink-2" : "text-ink-3"}`}>
                  0{i + 1}
                </span>
                {done && <Check className="size-3 text-accent" />}
              </div>
              <div className={`mt-1 font-display text-[15px] tracking-tight ${active ? "text-ink" : "text-ink-2"}`}>{label}</div>
              <div className="mt-0.5 text-[11px] text-ink-3 leading-snug hidden md:block">{stepHints[i]}</div>
            </button>
          );
        })}
      </div>

      {/* Body */}
      <div className="p-7 md:p-10 min-h-[520px]">
        {step === 0 && (
          <div className="max-w-3xl">
            <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">{t.generator.tellTitle}</h2>
            <p className="mt-3 text-ink-2 leading-relaxed">{t.generator.tellLede}</p>
            <Textarea
              autoFocus
              rows={10}
              value={s.brief}
              onChange={(e) => setS({ ...s, brief: e.target.value })}
              placeholder={t.generator.tellPlaceholder}
              className="mt-6 had-input rounded-none resize-none text-[15px] leading-relaxed"
            />
            <div className="mt-2 font-mono text-[11px] text-ink-3">
              {s.brief.trim().length < 30 ? t.generator.tellMin : `${s.brief.trim().length} ${"·"}`}
            </div>
          </div>
        )}

        {step === 1 && (
          <div>
            <div className="max-w-3xl">
              <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">{t.generator.interpretTitle}</h2>
              <p className="mt-3 text-ink-2 leading-relaxed">{t.generator.interpretLede}</p>
            </div>

            {(signals.length > 0 || missing.length > 0) && (
              <div className="mt-6 grid gap-px md:grid-cols-2 bg-[hsla(0,0%,100%,0.08)] border had-hairline">
                <div className="bg-surface-2 p-4">
                  <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-3 flex items-center gap-2">
                    <Sparkles className="size-3 text-accent" /> {t.generator.detectedIntent}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {signals.length === 0 ? <span className="text-[12px] text-ink-3">—</span> :
                      signals.map((sig) => (
                        <span key={sig} className="font-mono text-[10px] uppercase tracking-[0.1em] px-2 py-1 border had-hairline-2 text-ink-2">{sig}</span>
                      ))}
                  </div>
                </div>
                <div className="bg-surface-2 p-4">
                  <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-3 flex items-center gap-2">
                    <AlertCircle className="size-3 text-warning" /> {t.generator.missingInfo}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {missing.length === 0 ? <span className="text-[12px] text-ink-3">{t.generator.allGood}</span> :
                      missing.map((k) => (
                        <span key={k} className="font-mono text-[10px] uppercase tracking-[0.1em] px-2 py-1 border had-hairline-2 text-warning">
                          {(t.generator as any)[k] ?? k}
                        </span>
                      ))}
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <FieldRow label={t.generator.initiative} af={s.autoFilled.initiative} required>
                <Input value={s.initiative} onChange={(e) => setS({ ...s, initiative: e.target.value, autoFilled: { ...s.autoFilled, initiative: false } })} className="had-input" />
              </FieldRow>
              <FieldRow label={t.generator.environment} af={s.autoFilled.environment}>
                <Input value={s.environment} onChange={(e) => setS({ ...s, environment: e.target.value, autoFilled: { ...s.autoFilled, environment: false } })} className="had-input" />
              </FieldRow>
              <FieldRow label={t.generator.problem} af={s.autoFilled.problem} className="md:col-span-2">
                <Textarea rows={2} value={s.problem} onChange={(e) => setS({ ...s, problem: e.target.value, autoFilled: { ...s.autoFilled, problem: false } })} className="had-input rounded-none resize-none" />
              </FieldRow>
              <FieldRow label={t.generator.users} af={s.autoFilled.users}>
                <Textarea rows={2} value={s.users} onChange={(e) => setS({ ...s, users: e.target.value, autoFilled: { ...s.autoFilled, users: false } })} className="had-input rounded-none resize-none" />
              </FieldRow>
              <FieldRow label={t.generator.value} af={s.autoFilled.value}>
                <Textarea rows={2} value={s.value} onChange={(e) => setS({ ...s, value: e.target.value, autoFilled: { ...s.autoFilled, value: false } })} className="had-input rounded-none resize-none" />
              </FieldRow>
              <FieldRow label={t.generator.risks} af={s.autoFilled.risks}>
                <Textarea rows={2} value={s.risks} onChange={(e) => setS({ ...s, risks: e.target.value, autoFilled: { ...s.autoFilled, risks: false } })} className="had-input rounded-none resize-none" />
              </FieldRow>
              <FieldRow label={t.generator.data} af={s.autoFilled.dataSensitivity}>
                <Textarea rows={2} value={s.dataSensitivity} onChange={(e) => setS({ ...s, dataSensitivity: e.target.value, autoFilled: { ...s.autoFilled, dataSensitivity: false } })} className="had-input rounded-none resize-none" />
              </FieldRow>
              <FieldRow label={t.generator.approvals} af={s.autoFilled.approvals}>
                <Textarea rows={2} value={s.approvals} onChange={(e) => setS({ ...s, approvals: e.target.value, autoFilled: { ...s.autoFilled, approvals: false } })} className="had-input rounded-none resize-none" />
              </FieldRow>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="max-w-4xl">
            <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">{t.generator.chooseTitle}</h2>
            <p className="mt-3 text-ink-2 leading-relaxed">{t.generator.chooseLede}</p>

            <div className="mt-8">
              <Label className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-3">{t.generator.tool}</Label>
              <div className="mt-3 grid gap-px bg-[hsla(0,0%,100%,0.08)] border had-hairline grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                {[...toolkits, { id: "generic", name: t.generator.genericTool }].map((tk) => {
                  const active = s.toolId === tk.id;
                  return (
                    <button
                      key={tk.id}
                      type="button"
                      onClick={() => setS({ ...s, toolId: tk.id })}
                      className={`bg-surface-2 px-4 py-4 text-left transition-colors ${active ? "outline outline-2 outline-accent z-10 bg-surface" : "hover:bg-surface"}`}
                    >
                      <div className={`font-display text-[15px] tracking-tight ${active ? "text-accent" : "text-ink"}`}>{tk.name}</div>
                      <div className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-3">{tk.id}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <div>
                <Label className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-3">{t.generator.usage}</Label>
                <Select value={s.usageType} onValueChange={(v) => setS({ ...s, usageType: v as UsageType })}>
                  <SelectTrigger className="had-input mt-2"><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-surface border had-hairline-2 rounded-none">
                    {usageTypes.map((u) => <SelectItem key={u} value={u} className="font-mono text-[12px]">{t.usageTypes[u] ?? u}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-3">{t.generator.autonomy} · {tAuton.name}</Label>
                <div className="mt-2 grid grid-cols-6 gap-1">
                  {autonomyLevels.map((a) => (
                    <button key={a.level} type="button" onClick={() => setS({ ...s, autonomyLevel: a.level })}
                      className={`h-10 border had-hairline-2 font-mono text-[11px] tracking-[0.06em] transition-colors ${
                        s.autonomyLevel === a.level ? "bg-accent text-accent-foreground border-accent" : "text-ink-2 hover:text-ink hover:border-ink-3"
                      }`}>L{a.level}</button>
                  ))}
                </div>
                <p className="text-[12px] text-ink-3 mt-2 leading-relaxed">{tAuton.description}</p>
              </div>
              <FieldRow label={t.generator.toolsInvolved} af={s.autoFilled.tools} className="md:col-span-2">
                <Textarea rows={2} value={s.tools} onChange={(e) => setS({ ...s, tools: e.target.value, autoFilled: { ...s.autoFilled, tools: false } })} className="had-input rounded-none resize-none" />
              </FieldRow>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <div className="max-w-3xl mb-6">
              <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">{t.generator.reviewTitle}</h2>
              <p className="mt-3 text-ink-2 leading-relaxed">{t.generator.reviewLede}</p>
            </div>

            <div className="grid gap-px md:grid-cols-3 bg-[hsla(0,0%,100%,0.08)] border had-hairline mb-6">
              <Summary k={t.generator.tool} v={tool.name} />
              <Summary k={t.generator.usage} v={t.usageTypes[s.usageType] ?? s.usageType} />
              <Summary k={t.generator.autonomy} v={tAuton.name} />
            </div>

            <div className="border had-hairline-2 bg-surface">
              <div className="flex items-center justify-between px-5 md:px-7 py-3 border-b had-hairline">
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3">{filename}</div>
                <div className="flex gap-1 flex-wrap">
                  <Button onClick={onCopy} variant="ghost" size="sm" className="rounded-none font-mono text-[10px] uppercase tracking-[0.14em] hover:bg-surface-2"><Copy className="size-3.5 mr-1.5" />{t.generator.copy}</Button>
                  <Button onClick={onDownload} variant="ghost" size="sm" className="rounded-none font-mono text-[10px] uppercase tracking-[0.14em] hover:bg-surface-2"><Download className="size-3.5 mr-1.5" />{t.generator.download}</Button>
                  <Button onClick={onSave} variant="ghost" size="sm" className="rounded-none font-mono text-[10px] uppercase tracking-[0.14em] hover:bg-surface-2"><Save className="size-3.5 mr-1.5" />{t.generator.save}</Button>
                </div>
              </div>
              <Tabs defaultValue="rendered" className="flex flex-col">
                <TabsList className="rounded-none bg-transparent border-b had-hairline justify-start px-5 md:px-7 h-10">
                  <TabsTrigger value="rendered" className="rounded-none font-mono text-[11px] uppercase tracking-[0.14em] data-[state=active]:bg-transparent data-[state=active]:text-accent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-accent"><Eye className="size-3.5 mr-1.5" />{t.generator.rendered}</TabsTrigger>
                  <TabsTrigger value="raw" className="rounded-none font-mono text-[11px] uppercase tracking-[0.14em] data-[state=active]:bg-transparent data-[state=active]:text-accent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-accent"><FileCode className="size-3.5 mr-1.5" />{t.generator.raw}</TabsTrigger>
                </TabsList>
                <TabsContent value="rendered" className="px-5 md:px-7 py-6 max-h-[600px] overflow-y-auto m-0">
                  <article className="prose prose-invert max-w-none text-ink-2 prose-headings:text-ink prose-headings:font-display prose-headings:tracking-tight prose-strong:text-ink prose-code:text-accent prose-a:text-accent">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{md}</ReactMarkdown>
                  </article>
                </TabsContent>
                <TabsContent value="raw" className="px-5 md:px-7 py-6 max-h-[600px] overflow-y-auto m-0">
                  <pre className="font-mono text-[12px] text-ink-2 whitespace-pre-wrap leading-relaxed">{md}</pre>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        )}
      </div>

      {/* Footer nav */}
      <div className="flex items-center justify-between border-t had-hairline px-5 md:px-7 py-4 bg-surface-2">
        <Button onClick={onReset} variant="ghost" size="sm" className="rounded-none font-mono text-[10px] uppercase tracking-[0.14em] text-danger hover:bg-surface">
          <RefreshCw className="size-3.5 mr-1.5" />{t.generator.startOver}
        </Button>
        <div className="flex gap-2">
          {step > 0 && (
            <Button onClick={() => setStep((step - 1) as Step)} variant="ghost" size="sm" className="rounded-none font-mono text-[10px] uppercase tracking-[0.14em] hover:bg-surface">
              <ArrowLeft className="size-3.5 mr-1.5" />{t.generator.back}
            </Button>
          )}
          {step < 3 && (
            <Button
              onClick={() => step === 0 ? handleInterpret() : setStep((step + 1) as Step)}
              disabled={!canNext}
              size="sm"
              className="rounded-none font-mono text-[10px] uppercase tracking-[0.14em] bg-accent text-accent-foreground hover:bg-accent/90"
            >
              {step === 0 ? <><Sparkles className="size-3.5 mr-1.5" />{t.generator.next}</> : <>{t.generator.next}<ArrowRight className="size-3.5 ml-1.5" /></>}
            </Button>
          )}
        </div>
      </div>
    </div>
    </TooltipProvider>
  );
}

function FieldRow({ label, children, af, required, hint, className = "" }: { label: string; children: React.ReactNode; af?: boolean; required?: boolean; hint?: string; className?: string }) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="flex items-center gap-2">
        <Label className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-3">
          {label}{required && <span className="text-danger ml-1">*</span>}
        </Label>
        {af && (
          <span className="font-mono text-[9px] uppercase tracking-[0.14em] px-1.5 py-0.5 border had-hairline-2 text-accent flex items-center gap-1">
            <Sparkles className="size-2.5" />HAD
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

function Summary({ k, v }: { k: string; v: string }) {
  return (
    <div className="bg-surface-2 p-4">
      <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-3">{k}</div>
      <div className="mt-1 font-display text-[15px] text-ink tracking-tight">{v}</div>
    </div>
  );
}
