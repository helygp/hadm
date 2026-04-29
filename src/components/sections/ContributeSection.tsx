import { useState } from "react";
import { contributionPaths } from "@/data/method";
import { SectionHead } from "@/components/sections/WhyHadSection";
import { Field, SuccessCard } from "@/components/sections/CommunitySection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { submitContribution, submitUseCase } from "@/lib/repositories";
import { useToast } from "@/hooks/use-toast";
import { useT } from "@/i18n/I18nProvider";

export function ContributeSection() {
  const t = useT();
  const [active, setActive] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const path = contributionPaths.find((p) => p.id === active);
  const tp = path ? (t.contributionPaths[path.id] ?? { title: path.title, desc: path.desc }) : null;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.message) {
      toast({ title: t.toasts.required, variant: "destructive" });
      return;
    }
    setBusy(true);
    try {
      await submitContribution({ pathId: active!, ...form });
      setDone(true);
    } finally { setBusy(false); }
  };

  return (
    <section id="contribute" className="had-section">
      <div className="had-wrap">
        <SectionHead num={t.contribute.num} label={t.contribute.label} title={t.contribute.title} lede={t.contribute.lede} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[hsla(0,0%,100%,0.08)] border had-hairline-2">
          {contributionPaths.map((p, i) => {
            const tt = t.contributionPaths[p.id] ?? { title: p.title, desc: p.desc };
            return (
              <button
                key={p.id}
                onClick={() => { setActive(p.id); setDone(false); setForm({ name: "", email: "", message: "" }); }}
                className="bg-surface p-7 text-left hover:bg-surface-2 transition-colors group"
              >
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3 mb-4">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="font-display text-xl text-ink mb-2 tracking-tight group-hover:text-accent transition-colors">{tt.title}</h3>
                <p className="text-ink-2 text-sm leading-relaxed">{tt.desc}</p>
              </button>
            );
          })}
        </div>
      </div>

      <Dialog open={!!active} onOpenChange={(v) => !v && setActive(null)}>
        <DialogContent className="bg-surface border had-hairline-2 rounded-none max-w-lg">
          <DialogHeader>
            <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-3 mb-2">{t.contribute.modalTitle}</div>
            <DialogTitle className="font-display text-2xl text-ink tracking-tight">{tp?.title}</DialogTitle>
          </DialogHeader>
          {done ? (
            <SuccessCard title={t.contribute.thanks} body={t.contribute.thanksBody} />
          ) : (
            <form onSubmit={onSubmit} className="grid gap-4 mt-2">
              <Field label={t.contribute.yourName}><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="had-input" /></Field>
              <Field label={t.contribute.yourEmail} required><Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="had-input" /></Field>
              <Field label={t.contribute.yourProposal} required><Textarea rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="had-input rounded-none resize-none" /></Field>
              <Button type="submit" disabled={busy} className="rounded-none h-11 bg-accent text-accent-foreground hover:bg-ink hover:text-background font-mono text-[11px] uppercase tracking-[0.12em]">
                {busy ? t.toasts.submitting : t.contribute.submit}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

export function UseCaseSubmitSection() {
  const t = useT();
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const { toast } = useToast();
  const [form, setForm] = useState({ title: "", industry: "", problem: "", agentHelp: "", governanceConcerns: "", expectedValue: "" });
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.problem) { toast({ title: t.toasts.required, variant: "destructive" }); return; }
    setBusy(true);
    try { await submitUseCase(form); setDone(true); } finally { setBusy(false); }
  };
  return (
    <section id="suggest-case" className="had-section bg-bg-2">
      <div className="had-wrap">
        <SectionHead num={t.caseSection.num} label={t.caseSection.label} title={t.caseSection.title} lede={t.caseSection.lede} />
        <div className="bg-surface border had-hairline-2 p-7 md:p-10 max-w-3xl">
          {done ? (
            <SuccessCard title={t.caseSection.success} body={t.caseSection.successBody} />
          ) : (
            <form onSubmit={onSubmit} className="grid gap-5 md:grid-cols-2">
              <Field label={t.caseSection.fields.title} required className="md:col-span-2"><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="had-input" /></Field>
              <Field label={t.caseSection.fields.industry}><Input value={form.industry} onChange={(e) => setForm({ ...form, industry: e.target.value })} className="had-input" /></Field>
              <Field label={t.caseSection.fields.value}><Input value={form.expectedValue} onChange={(e) => setForm({ ...form, expectedValue: e.target.value })} className="had-input" /></Field>
              <Field label={t.caseSection.fields.problem} required className="md:col-span-2"><Textarea rows={3} value={form.problem} onChange={(e) => setForm({ ...form, problem: e.target.value })} className="had-input rounded-none resize-none" /></Field>
              <Field label={t.caseSection.fields.agentHelp} className="md:col-span-2"><Textarea rows={3} value={form.agentHelp} onChange={(e) => setForm({ ...form, agentHelp: e.target.value })} className="had-input rounded-none resize-none" /></Field>
              <Field label={t.caseSection.fields.gov} className="md:col-span-2"><Textarea rows={3} value={form.governanceConcerns} onChange={(e) => setForm({ ...form, governanceConcerns: e.target.value })} className="had-input rounded-none resize-none" /></Field>
              <div className="md:col-span-2 pt-3 border-t had-hairline flex justify-end">
                <Button type="submit" disabled={busy} className="rounded-none h-11 px-6 bg-accent text-accent-foreground hover:bg-ink hover:text-background font-mono text-[11px] uppercase tracking-[0.12em]">
                  {busy ? t.toasts.submitting : t.caseSection.submit}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
