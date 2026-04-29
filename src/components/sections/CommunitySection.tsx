import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { SectionHead } from "@/components/sections/WhyHadSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { submitCommunityApplication } from "@/lib/repositories";
import { useToast } from "@/hooks/use-toast";

const ROLES = ["Practitioner", "Researcher", "Product Leader", "Agile Expert", "AI Builder", "Governance Specialist", "Sponsor", "Community Member"];

export function CommunitySection() {
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const { toast } = useToast();
  const [form, setForm] = useState({
    name: "", email: "", linkedin: "", role: "", company: "", country: "", interest: "", contributionType: "Practitioner",
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      toast({ title: "Name and email are required", variant: "destructive" });
      return;
    }
    setBusy(true);
    try {
      await submitCommunityApplication(form);
      setDone(true);
    } finally { setBusy(false); }
  };

  return (
    <section id="community" className="had-section bg-bg-2">
      <div className="had-wrap">
        <SectionHead
          num="08"
          label="Community"
          title="Join the founding community."
          lede="A professional community for leaders, builders, consultants and researchers exploring human-governed agentic delivery."
        />
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] items-start">
          <div>
            <p className="text-ink-2 text-base leading-relaxed">
              Apply to help shape the method, contribute artifacts, share use cases and host local discussions.
              Founding members receive direct access to the working group.
            </p>
            <ul className="mt-6 flex flex-col gap-2.5 text-ink-2 text-[15px]">
              {["Co-author the method", "Early access to artifacts", "Local chapters & roundtables", "Direct input on roadmap"].map((b) => (
                <li key={b} className="grid grid-cols-[18px_1fr] gap-3 items-start">
                  <Check className="size-4 mt-0.5 text-warm" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/community"
              className="mt-7 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-2 hover:text-ink"
            >
              Open the full application form <ArrowRight className="size-3.5" />
            </Link>
          </div>
          <div className="bg-surface border had-hairline-2 p-7 md:p-9">
            {done ? (
              <SuccessCard title="Application received" body="Thanks for applying. We'll be in touch from the founding working group within a few days." onReset={() => { setDone(false); setForm({ name:"", email:"", linkedin:"", role:"", company:"", country:"", interest:"", contributionType:"Practitioner" }); }} />
            ) : (
              <form onSubmit={onSubmit} className="grid gap-5 md:grid-cols-2">
                <Field label="Name" required><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="had-input" /></Field>
                <Field label="Email" required><Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="had-input" /></Field>
                <Field label="LinkedIn URL"><Input value={form.linkedin} onChange={(e) => setForm({ ...form, linkedin: e.target.value })} className="had-input" placeholder="https://linkedin.com/in/…" /></Field>
                <Field label="Role"><Input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="had-input" /></Field>
                <Field label="Company"><Input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="had-input" /></Field>
                <Field label="Country"><Input value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} className="had-input" /></Field>
                <Field label="Area of interest" className="md:col-span-2"><Input value={form.interest} onChange={(e) => setForm({ ...form, interest: e.target.value })} className="had-input" placeholder="e.g. agentic delivery in financial services" /></Field>
                <Field label="I want to contribute as" className="md:col-span-2">
                  <Select value={form.contributionType} onValueChange={(v) => setForm({ ...form, contributionType: v })}>
                    <SelectTrigger className="had-input"><SelectValue /></SelectTrigger>
                    <SelectContent className="bg-surface border had-hairline-2 rounded-none">
                      {ROLES.map((r) => <SelectItem key={r} value={r} className="font-mono text-[12px]">{r}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </Field>
                <div className="md:col-span-2 pt-3 border-t had-hairline flex justify-end">
                  <Button type="submit" disabled={busy} className="rounded-none h-11 px-6 bg-accent text-accent-foreground hover:bg-ink hover:text-background font-mono text-[11px] uppercase tracking-[0.12em]">
                    {busy ? "Submitting…" : "Apply to founding community"}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Field({ label, required, children, className }: { label: string; required?: boolean; children: React.ReactNode; className?: string; }) {
  return (
    <div className={`flex flex-col gap-2 ${className ?? ""}`}>
      <Label className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-3">
        {label}{required && <span className="text-accent ml-1">*</span>}
      </Label>
      {children}
    </div>
  );
}
export function SuccessCard({ title, body, onReset }: { title: string; body: string; onReset?: () => void; }) {
  return (
    <div className="text-center py-10">
      <div className="size-12 grid place-items-center mx-auto bg-warm/10 border border-warm rounded-full mb-5">
        <Check className="size-5 text-warm" />
      </div>
      <h3 className="font-display text-2xl text-ink mb-2 tracking-tight">{title}</h3>
      <p className="text-ink-2 max-w-sm mx-auto">{body}</p>
      {onReset && (
        <Button onClick={onReset} variant="outline" className="mt-6 rounded-none border had-hairline-2 font-mono text-[11px] uppercase tracking-[0.12em] bg-transparent">
          Submit another
        </Button>
      )}
    </div>
  );
}
