import { createContext } from "react";
import type { Dict, Lang } from "./types";

export interface I18nCtxValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Dict;
}

export const I18nCtx = createContext<I18nCtxValue | null>(null);
