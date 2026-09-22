import { FormEvent, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useI18n, useT } from "@/i18n/I18nProvider";
import { requestApiAccess } from "@/lib/apiAccess";
import { useToast } from "@/hooks/use-toast";

interface ApiAccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ApiAccessDialog({ open, onOpenChange }: ApiAccessDialogProps) {
  const t = useT();
  const { lang } = useI18n();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleOpenChange = (nextOpen: boolean) => {
    onOpenChange(nextOpen);
    if (!nextOpen) {
      setEmail("");
      setError("");
      setSuccess(false);
    }
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    if (!event.currentTarget.checkValidity()) {
      setError(t.accessRequest.invalidEmail);
      return;
    }

    setSubmitting(true);
    const result = await requestApiAccess(email, lang);
    setSubmitting(false);
    if (result.ok) {
      setSuccess(true);
      toast({ title: t.accessRequest.success, description: t.accessRequest.successBody });
      return;
    }
    setError(result.reason === "duplicate" ? t.accessRequest.duplicate : t.accessRequest.failed);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-xl rounded-none border had-hairline-2 bg-background p-8 md:p-10">
        {success ? (
          <div className="py-5">
            <div className="mb-6 grid size-12 place-items-center border border-accent text-accent">
              <Check className="size-5" />
            </div>
            <DialogTitle className="font-display text-3xl text-ink">{t.accessRequest.success}</DialogTitle>
            <DialogDescription className="mt-4 text-base leading-relaxed text-ink-2">
              {t.accessRequest.successBody}
            </DialogDescription>
          </div>
        ) : (
          <>
            <DialogHeader>
              <div className="had-eyebrow mb-4">{t.howItWorks.status}</div>
              <DialogTitle className="font-display text-3xl text-ink">{t.accessRequest.title}</DialogTitle>
              <DialogDescription className="pt-3 text-base leading-relaxed text-ink-2">
                {t.accessRequest.description}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={onSubmit} className="mt-5 space-y-4" noValidate>
              <label htmlFor="api-access-email" className="block font-mono text-[10px] uppercase tracking-[0.16em] text-ink-3">
                {t.accessRequest.email}
              </label>
              <Input
                id="api-access-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder={t.accessRequest.emailPlaceholder}
                className="had-input h-12 rounded-none"
                aria-invalid={Boolean(error)}
                aria-describedby={error ? "api-access-error" : undefined}
              />
              {error && <p id="api-access-error" className="text-sm text-destructive" role="alert">{error}</p>}
              <Button
                type="submit"
                disabled={submitting}
                className="h-12 w-full rounded-none bg-accent px-6 font-mono text-[11px] uppercase tracking-[0.12em] text-accent-foreground hover:bg-ink hover:text-background"
              >
                {submitting ? t.accessRequest.submitting : t.accessRequest.submit}
                {!submitting && <ArrowRight className="size-4" />}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}