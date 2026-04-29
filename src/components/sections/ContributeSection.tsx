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

export function ContributeSection() {
  const [active, setActive] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const path = contributionPaths.find((p) => p.id === active);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.message) {
      toast({ title: "Email and message are required", variant: "destructive" });
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
        <SectionHead
          num="10"
          label="Contribute"
          title="Help shape the method."
          lede="HAD is an open community methodology. Pick a contribution path and propose your input — every accepted contribution is credited."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[hsla(0,0%,100%,0.08)] border had-hairline-2">
          {contributionPaths.map((p, i) => (
            <button
              key={p.id}
              onClick={() => { setActive(p.id); setDone(false); setForm({ name: "", email: "", message: "" }); }}
              className="bg-surface p-7 text-left hover:bg-surface-2 transition-colors group"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3 mb-4">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="font-display text-xl text-ink mb-2 tracking-tight group-hover:text-accent transition-colors">{p.title}</h3>
              <p className="text-ink-2 text-sm leading-relaxed">{p.desc}</p>
            </button>
          ))}
        </div>
      </div>

      <Dialog open={!!active} onOpenChange={(v) => !v && setActive(null)}>
        <DialogContent className="bg-surface border had-hairline-2 rounded-none max-w-lg">
          <DialogHeader>
            <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-3 mb-2">Contribute</div>
            <DialogTitle className="font-display text-2xl text-ink tracking-tight">{path?.title}</DialogTitle>
          </DialogHeader>
          {done ? (
            <SuccessCard title="Thanks for contributing" body="We've received your proposal and will reach out from the working group." onReset={() => setActive(null)} />
          ) : (
            <form onSubmit={onSubmit} className="grid gap-4 mt-2">
              <Field label="Your name"><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="had-input" /></Field>
              <Field label="Email" required><Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="had-input" /></Field>
              <Field label="Your proposal" required><Textarea rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="had-input rounded-none resize-none" /></Field>
              <Button type="submit" disabled={busy} className="rounded-none h-11 bg-accent text-accent-foreground hover:bg-ink hover:text-background font-mono text-[11px] uppercase tracking-[0.12em]">
                {busy ? "Submitting…" : "Submit contribution"}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

export function UseCaseSubmitSection() {
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const { toast } = useToast();
  const [form, setForm] = useState({ title: "", industry: "", problem: "", agentHelp: "", governanceConcerns: "", expectedValue: "" });
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.problem) { toast({ title: "Title and problem are required", variant: "destructive" }); return; }
    setBusy(true);
    try { await submitUseCase(form); setDone(true); } finally { setBusy(false); }
  };
  return (
    <section id="suggest-case" className="had-section bg-bg-2">
      <div className="had-wrap">
        <SectionHead
          num="09"
          label="Use Case"
          title="Suggest a use case."
          lede="Help us map where HAD applies. Submit a real or hypothetical use case and we'll consider it for a published case study."
        />
        <div className="bg-surface border had-hairline-2 p-7 md:p-10 max-w-3xl">
          {done ? (
            <SuccessCard title="Use case submitted" body="Thanks. We may reach out for a case-study collaboration." onReset={() => { setDone(false); setForm({ title:"", industry:"", problem:"", agentHelp:"", governanceConcerns:"", expectedValue:"" }); }} />
          ) : (
            <form onSubmit={onSubmit} className="grid gap-5 md:grid-cols-2">
              <Field label="Use case title" required className="md:col-span-2"><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="had-input" /></Field>
              <Field label="Industry"><Input value={form.industry} onChange={(e) => setForm({ ...form, industry: e.target.value })} className="had-input" /></Field>
              <Field label="Expected value"><Input value={form.expectedValue} onChange={(e) => setForm({ ...form, expectedValue: e.target.value })} className="had-input" /></Field>
              <Field label="Problem" required className="md:col-span-2"><Textarea rows={3} value={form.problem} onChange={(e) => setForm({ ...form, problem: e.target.value })} className="had-input rounded-none resize-none" /></Field>
              <Field label="How AI agents could help" className="md:col-span-2"><Textarea rows={3} value={form.agentHelp} onChange={(e) => setForm({ ...form, agentHelp: e.target.value })} className="had-input rounded-none resize-none" /></Field>
              <Field label="Governance concerns" className="md:col-span-2"><Textarea rows={3} value={form.governanceConcerns} onChange={(e) => setForm({ ...form, governanceConcerns: e.target.value })} className="had-input rounded-none resize-none" /></Field>
              <div className="md:col-span-2 pt-3 border-t had-hairline flex justify-end">
                <Button type="submit" disabled={busy} className="rounded-none h-11 px-6 bg-accent text-accent-foreground hover:bg-ink hover:text-background font-mono text-[11px] uppercase tracking-[0.12em]">
                  {busy ? "Submitting…" : "Submit use case"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
