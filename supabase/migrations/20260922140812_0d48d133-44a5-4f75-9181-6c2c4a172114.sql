CREATE TABLE public.api_access_waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  language text NOT NULL DEFAULT 'en' CHECK (language IN ('en', 'pt', 'es')),
  source text NOT NULL DEFAULT 'hero',
  status text NOT NULL DEFAULT 'requested',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT api_access_waitlist_email_key UNIQUE (email),
  CONSTRAINT api_access_waitlist_email_format CHECK (email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$')
);

GRANT INSERT ON public.api_access_waitlist TO anon, authenticated;
GRANT ALL ON public.api_access_waitlist TO service_role;

ALTER TABLE public.api_access_waitlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can request API access"
ON public.api_access_waitlist
FOR INSERT
TO anon, authenticated
WITH CHECK (
  source = 'hero'
  AND status = 'requested'
  AND language IN ('en', 'pt', 'es')
);

CREATE OR REPLACE FUNCTION public.set_api_access_waitlist_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER set_api_access_waitlist_updated_at
BEFORE UPDATE ON public.api_access_waitlist
FOR EACH ROW
EXECUTE FUNCTION public.set_api_access_waitlist_updated_at();