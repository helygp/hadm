import { useEffect, useState } from "react";
import { Settings2, RefreshCw } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useT } from "@/i18n/I18nProvider";

interface Tweaks {
  hue: number;          // shifts accent hue
  contrast: number;     // 0.85–1.15
  density: number;      // 0.85–1.2 affects --pad-x via clamp
  radius: number;       // px for --radius-lg
  motion: number;       // 0–1 motion intensity (multiplier)
}

const DEFAULTS: Tweaks = { hue: 187, contrast: 1, density: 1, radius: 2, motion: 1 };
const KEY = "had:tweaks";

function apply(t: Tweaks) {
  const root = document.documentElement;
  root.style.setProperty("--accent", `${t.hue} 100% 50%`);
  root.style.setProperty("--ring", `${t.hue} 100% 50%`);
  root.style.setProperty("--radius-lg", `${t.radius}px`);
  root.style.setProperty("--pad-x", `clamp(${20 * t.density}px, ${4 * t.density}vw, ${56 * t.density}px)`);
  root.style.setProperty("filter", t.contrast === 1 ? "" : `contrast(${t.contrast})`);
  root.style.setProperty("--motion-mult", String(t.motion));
}

export function TweaksPanel() {
  const tr = useT();
  const [open, setOpen] = useState(false);
  const [t, setT] = useState<Tweaks>(() => {
    if (typeof window === "undefined") return DEFAULTS;
    try { return { ...DEFAULTS, ...JSON.parse(localStorage.getItem(KEY) ?? "{}") }; }
    catch { return DEFAULTS; }
  });
  useEffect(() => { apply(t); localStorage.setItem(KEY, JSON.stringify(t)); }, [t]);
  const reset = () => setT(DEFAULTS);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          aria-label="Open tweaks panel"
          className="fixed bottom-5 right-5 z-40 size-11 grid place-items-center bg-surface border had-hairline-2 rounded-full text-ink-2 hover:text-accent hover:border-accent transition-colors shadow-xl"
          style={{ boxShadow: "var(--shadow-xl)" }}
        >
          <Settings2 className="size-4" />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="bg-background border-l had-hairline-2 w-[92vw] max-w-[380px]">
        <SheetHeader>
          <SheetTitle className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3">
            {tr.tweaks.title}
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-7 mt-6">
          <Field label={`${tr.tweaks.hue} · ${t.hue}°`}>
            <Slider value={[t.hue]} min={150} max={260} step={1}
              onValueChange={([v]) => setT({ ...t, hue: v })} />
          </Field>
          <Field label={`${tr.tweaks.contrast} · ${t.contrast.toFixed(2)}`}>
            <Slider value={[t.contrast * 100]} min={85} max={115} step={1}
              onValueChange={([v]) => setT({ ...t, contrast: v / 100 })} />
          </Field>
          <Field label={`${tr.tweaks.density} · ${t.density.toFixed(2)}`}>
            <Slider value={[t.density * 100]} min={85} max={120} step={1}
              onValueChange={([v]) => setT({ ...t, density: v / 100 })} />
          </Field>
          <Field label={`${tr.tweaks.radius} · ${t.radius}px`}>
            <Slider value={[t.radius]} min={0} max={16} step={1}
              onValueChange={([v]) => setT({ ...t, radius: v })} />
          </Field>
          <Field label={`${tr.tweaks.motion} · ${Math.round(t.motion * 100)}%`}>
            <Slider value={[t.motion * 100]} min={0} max={100} step={5}
              onValueChange={([v]) => setT({ ...t, motion: v / 100 })} />
          </Field>
          <Button variant="outline" onClick={reset} className="rounded-none font-mono text-[11px] uppercase tracking-[0.12em] mt-2">
            <RefreshCw className="size-3.5 mr-2" /> {tr.tweaks.reset}
          </Button>
          <p className="text-[11px] text-ink-4 leading-relaxed">
            {tr.tweaks.note}
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <Label className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-3">{label}</Label>
      {children}
    </div>
  );
}
