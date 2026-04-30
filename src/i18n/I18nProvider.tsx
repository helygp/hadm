import { useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { pt } from "./pt";
import { es } from "./es";
import { en } from "./en";
import type { Dict, Lang } from "./types";
import { I18nCtx, type I18nCtxValue } from "./context";

const KEY = "had:lang";

function detect(): Lang {
  if (typeof window === "undefined") return "en";
  try {
    const saved = localStorage.getItem(KEY) as Lang | null;
    if (saved === "pt" || saved === "es" || saved === "en") return saved;
  } catch { /* noop */ }
  const langs = (navigator.languages?.length ? navigator.languages : [navigator.language]) ?? [];
  for (const l of langs) {
    const code = (l ?? "").toLowerCase();
    if (code.startsWith("pt")) return "pt";
    if (code.startsWith("es")) return "es";
    if (code.startsWith("en")) return "en";
  }
  return "en";
}

const DICTS: Record<Lang, Dict> = { pt, es, en };

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => detect());
  useEffect(() => {
    try { localStorage.setItem(KEY, lang); } catch { /* noop */ }
    document.documentElement.lang = lang;
  }, [lang]);
  const value = useMemo<I18nCtxValue>(() => ({
    lang,
    setLang: (l) => setLangState(l),
    t: DICTS[lang],
  }), [lang]);
  return <I18nCtx.Provider value={value}>{children}</I18nCtx.Provider>;
}

export function useI18n(): I18nCtxValue {
  const ctx = useContext(I18nCtx);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

export function useT(): Dict {
  return useI18n().t;
}
