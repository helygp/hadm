import { supabase } from "@/integrations/supabase/client";
import type { Lang } from "@/i18n/types";

export async function requestApiAccess(email: string, language: Lang) {
  const { error } = await supabase.from("api_access_waitlist").insert({
    email: email.trim().toLowerCase(),
    language,
    source: "hero",
  });

  if (!error) return { ok: true as const };
  if (error.code === "23505") return { ok: false as const, reason: "duplicate" as const };
  return { ok: false as const, reason: "failed" as const };
}