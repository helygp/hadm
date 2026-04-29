import { useMemo, useState } from "react";
import { Copy, Download, RefreshCw, Save, FileCode, Eye } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { toolkits } from "@/data/toolkits";
import { autonomyLevels, usageTypes, type AutonomyLevel, type UsageType } from "@/data/method";
import { buildInstruction, type GeneratorInput } from "@/lib/generator";
import { copyToClipboard, downloadText } from "@/lib/download";
import { saveFile } from "@/lib/starterKit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const GENERIC = { id: "generic", name: "Generic AI Tool" };

const EMPTY = {
  toolId: "claude",
  usageType: "Software creation" as UsageType,
  autonomyLevel: 2 as AutonomyLevel["level"],
  initiative: "", problem: "", users: "", value: "",
  risks: "", dataSensitivity: "", approvals: "",
  environment: "", tools: "",
};

export function GeneratorWorkspace() {
  const { toast } = useToast();
  const [s, setS] = useState(EMPTY);

  const tool = toolkits.find((t) => t.id === s.toolId) ?? GENERIC;
  const autonomy = autonomyLevels.find((a) => a.level === s.autonomyLevel)!;
  const input: GeneratorInput = {
    toolId: tool.id, toolName: tool.name, usageType: s.usageType, autonomy,
    initiative: s.initiative, problem: s.problem, users: s.users, value: s.value,
    risks: s.risks, dataSensitivity: s.dataSensitivity, approvals: s.approvals,
    environment: s.environment, tools: s.tools,
  };
  const md = useMemo(() => buildInstruction(input), [input]);
  const filename = `had-${tool.id}-instructions.md`;

  const onCopy = async () => {
    const ok = await copyToClipboard(md);
    toast({ title: ok ? "Copied" : "Copy failed", variant: ok ? "default" : "destructive" });
  };
  const onDownload = () => { downloadText(filename, md); toast({ title: "Downloaded", description: filename }); };
  const onSave = () => { saveFile(filename, md); toast({ title: "Saved to Starter Kit", description: filename }); };
  const onReset = () => setS(EMPTY);

  return (
    <div className="grid gap-px bg-[hsla(0,0%,100%,0.08)] border had-hairline-2 lg:grid-cols-2">
      {/* Form */}
      <div className="bg-surface p-7 md:p-9">
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3 mb-6">Configure</div>
        <div className="grid gap-5">
          <Row label="Tool">
            <Select value={s.toolId} onValueChange={(v) => setS({ ...s, toolId: v })}>
              <SelectTrigger className="had-input"><SelectValue /></SelectTrigger>
              <SelectContent className="bg-surface border had-hairline-2 rounded-none">
                {toolkits.map((t) => <SelectItem key={t.id} value={t.id} className="font-mono text-[12px]">{t.name}</SelectItem>)}
                <SelectItem value="generic" className="font-mono text-[12px]">Generic AI Tool</SelectItem>
              </SelectContent>
            </Select>
          </Row>
          <Row label="Usage type">
            <Select value={s.usageType} onValueChange={(v) => setS({ ...s, usageType: v as UsageType })}>
              <SelectTrigger className="had-input"><SelectValue /></SelectTrigger>
              <SelectContent className="bg-surface border had-hairline-2 rounded-none">
                {usageTypes.map((u) => <SelectItem key={u} value={u} className="font-mono text-[12px]">{u}</SelectItem>)}
              </SelectContent>
            </Select>
          </Row>
          <Row label={`Agent autonomy · ${autonomy.name}`}>
            <div className="grid grid-cols-6 gap-1">
              {autonomyLevels.map((a) => (
                <button key={a.level} type="button" onClick={() => setS({ ...s, autonomyLevel: a.level })}
                  className={`h-10 border had-hairline-2 font-mono text-[11px] tracking-[0.06em] transition-colors ${
                    s.autonomyLevel === a.level ? "bg-accent text-accent-foreground border-accent" : "text-ink-2 hover:text-ink hover:border-ink-3"
                  }`}>L{a.level}</button>
              ))}
            </div>
            <p className="text-[12px] text-ink-3 mt-2 leading-relaxed">{autonomy.description}</p>
          </Row>
          <div className="grid gap-4 md:grid-cols-2">
            <Row label="Initiative"><Input value={s.initiative} onChange={(e) => setS({ ...s, initiative: e.target.value })} className="had-input" /></Row>
            <Row label="Delivery environment"><Input value={s.environment} onChange={(e) => setS({ ...s, environment: e.target.value })} className="had-input" /></Row>
          </div>
          <Row label="Business problem"><Textarea rows={2} value={s.problem} onChange={(e) => setS({ ...s, problem: e.target.value })} className="had-input rounded-none resize-none" /></Row>
          <div className="grid gap-4 md:grid-cols-2">
            <Row label="Target users"><Textarea rows={2} value={s.users} onChange={(e) => setS({ ...s, users: e.target.value })} className="had-input rounded-none resize-none" /></Row>
            <Row label="Expected digital value"><Textarea rows={2} value={s.value} onChange={(e) => setS({ ...s, value: e.target.value })} className="had-input rounded-none resize-none" /></Row>
            <Row label="Main risks"><Textarea rows={2} value={s.risks} onChange={(e) => setS({ ...s, risks: e.target.value })} className="had-input rounded-none resize-none" /></Row>
            <Row label="Data sensitivity"><Textarea rows={2} value={s.dataSensitivity} onChange={(e) => setS({ ...s, dataSensitivity: e.target.value })} className="had-input rounded-none resize-none" /></Row>
            <Row label="Required human approvals"><Textarea rows={2} value={s.approvals} onChange={(e) => setS({ ...s, approvals: e.target.value })} className="had-input rounded-none resize-none" /></Row>
            <Row label="Tools involved"><Textarea rows={2} value={s.tools} onChange={(e) => setS({ ...s, tools: e.target.value })} className="had-input rounded-none resize-none" /></Row>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="bg-surface flex flex-col">
        <div className="flex items-center justify-between px-7 md:px-9 pt-7 md:pt-9 pb-4 border-b had-hairline">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3">{filename}</div>
          <div className="flex gap-1">
            <Button onClick={onCopy} variant="ghost" size="sm" className="rounded-none font-mono text-[10px] uppercase tracking-[0.14em] hover:bg-surface-2"><Copy className="size-3.5 mr-1.5" />Copy</Button>
            <Button onClick={onDownload} variant="ghost" size="sm" className="rounded-none font-mono text-[10px] uppercase tracking-[0.14em] hover:bg-surface-2"><Download className="size-3.5 mr-1.5" />Download</Button>
            <Button onClick={onSave} variant="ghost" size="sm" className="rounded-none font-mono text-[10px] uppercase tracking-[0.14em] hover:bg-surface-2"><Save className="size-3.5 mr-1.5" />Save</Button>
            <Button onClick={onReset} variant="ghost" size="sm" className="rounded-none font-mono text-[10px] uppercase tracking-[0.14em] hover:bg-surface-2 text-danger"><RefreshCw className="size-3.5 mr-1.5" />Reset</Button>
          </div>
        </div>
        <Tabs defaultValue="rendered" className="flex-1 flex flex-col">
          <TabsList className="rounded-none bg-transparent border-b had-hairline justify-start px-7 md:px-9 h-10">
            <TabsTrigger value="rendered" className="rounded-none font-mono text-[11px] uppercase tracking-[0.14em] data-[state=active]:bg-transparent data-[state=active]:text-accent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-accent"><Eye className="size-3.5 mr-1.5" />Rendered</TabsTrigger>
            <TabsTrigger value="raw" className="rounded-none font-mono text-[11px] uppercase tracking-[0.14em] data-[state=active]:bg-transparent data-[state=active]:text-accent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-accent"><FileCode className="size-3.5 mr-1.5" />Raw</TabsTrigger>
          </TabsList>
          <TabsContent value="rendered" className="px-7 md:px-9 py-7 max-h-[800px] overflow-y-auto m-0">
            <article className="prose prose-invert max-w-none text-ink-2 prose-headings:text-ink prose-headings:font-display prose-headings:tracking-tight prose-strong:text-ink prose-code:text-accent prose-a:text-accent">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{md}</ReactMarkdown>
            </article>
          </TabsContent>
          <TabsContent value="raw" className="px-7 md:px-9 py-7 max-h-[800px] overflow-y-auto m-0">
            <pre className="font-mono text-[12px] text-ink-2 whitespace-pre-wrap leading-relaxed">{md}</pre>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <Label className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-3">{label}</Label>
      {children}
    </div>
  );
}
