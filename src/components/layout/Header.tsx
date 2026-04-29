import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, Moon, Sun, Download } from "lucide-react";
import { BrandMark } from "@/components/visuals/Orbital";
import { useTheme } from "@/components/ThemeProvider";
import { useI18n, useT } from "@/i18n/I18nProvider";
import { downloadStarterKit } from "@/lib/starterKitZip";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export function Header() {
  const { theme, toggle } = useTheme();
  const { lang, setLang } = useI18n();
  const t = useT();
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const navLinks = [
    { id: "method", label: t.nav.method },
    { id: "loop", label: t.nav.loop },
    { id: "artifacts", label: t.nav.artifacts },
    { id: "toolkits", label: t.nav.toolkits },
    { id: "community", label: t.nav.community },
    { id: "cases", label: t.nav.cases },
    { id: "faq", label: t.nav.faq },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleDownloadKit = async () => {
    toast({ title: t.toasts.building });
    try {
      await downloadStarterKit();
      toast({ title: t.toasts.ready, description: t.toasts.readyDesc });
    } catch {
      toast({ title: t.toasts.failed, variant: "destructive" });
    }
  };

  const linkHref = (id: string) => (pathname === "/" ? `#${id}` : `/#${id}`);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-colors ${
        scrolled ? "had-hairline-2" : "had-hairline"
      }`}
      style={{
        backdropFilter: "blur(14px) saturate(140%)",
        WebkitBackdropFilter: "blur(14px) saturate(140%)",
        backgroundColor: "hsla(var(--background) / 0.78)",
      }}
    >
      <div className="had-wrap grid grid-cols-[auto_1fr_auto] items-center gap-8 py-3.5">
        <Link to="/" className="flex items-center gap-2.5 font-mono text-[12px] uppercase tracking-[0.12em]">
          <BrandMark />
          <span className="text-ink font-semibold">HAD</span>
          <span className="text-ink-3 hidden sm:inline">Method</span>
        </Link>
        <nav className="hidden lg:flex items-center justify-center gap-6">
          {navLinks.map((l) => (
            <a
              key={l.id}
              href={linkHref(l.id)}
              className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-2 hover:text-ink transition-colors py-2"
            >
              {l.label}
            </a>
          ))}
          <NavLink
            to="/generator"
            className={({ isActive }) =>
              `font-mono text-[11px] uppercase tracking-[0.12em] py-2 transition-colors ${
                isActive ? "text-accent" : "text-ink-2 hover:text-ink"
              }`
            }
          >
            {t.nav.generator}
          </NavLink>
        </nav>
        <div className="flex items-center gap-2">
          <div
            role="group"
            aria-label={t.header.lang}
            className="hidden sm:inline-flex border had-hairline-2 rounded-full overflow-hidden font-mono text-[10px] tracking-[0.14em]"
          >
            <button
              onClick={() => setLang("pt")}
              className={`px-2.5 h-9 transition-colors ${lang === "pt" ? "bg-ink text-background" : "text-ink-2 hover:text-ink"}`}
              aria-pressed={lang === "pt"}
            >
              PT
            </button>
            <button
              onClick={() => setLang("es")}
              className={`px-2.5 h-9 transition-colors ${lang === "es" ? "bg-ink text-background" : "text-ink-2 hover:text-ink"}`}
              aria-pressed={lang === "es"}
            >
              ES
            </button>
          </div>
          <button
            onClick={toggle}
            aria-label={t.header.toggleTheme}
            className="size-9 grid place-items-center border had-hairline-2 rounded-full text-ink-2 hover:text-ink hover:had-hairline-2 transition-colors"
          >
            {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
          <Button
            onClick={handleDownloadKit}
            className="hidden md:inline-flex bg-accent text-accent-foreground hover:bg-ink hover:text-background rounded-none h-9 px-4 font-mono text-[11px] uppercase tracking-[0.12em]"
          >
            <Download className="size-3.5 mr-2" /> {t.header.starterKit}
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                aria-label={t.header.openMenu}
                className="lg:hidden size-9 grid place-items-center border had-hairline-2 rounded-full text-ink-2"
              >
                <Menu className="size-4" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background border-l had-hairline-2 w-[88vw] max-w-[360px]">
              <div className="flex flex-col gap-1 mt-8">
                <div className="sm:hidden inline-flex border had-hairline-2 rounded-full overflow-hidden font-mono text-[10px] tracking-[0.14em] mb-3 self-start">
                  <button onClick={() => setLang("pt")} className={`px-3 h-8 ${lang === "pt" ? "bg-ink text-background" : "text-ink-2"}`}>PT</button>
                  <button onClick={() => setLang("es")} className={`px-3 h-8 ${lang === "es" ? "bg-ink text-background" : "text-ink-2"}`}>ES</button>
                </div>
                {navLinks.map((l) => (
                  <a
                    key={l.id}
                    href={linkHref(l.id)}
                    onClick={() => setOpen(false)}
                    className="font-mono text-[12px] uppercase tracking-[0.14em] text-ink-2 hover:text-ink py-3 border-b had-hairline"
                  >
                    {l.label}
                  </a>
                ))}
                <NavLink
                  to="/generator"
                  onClick={() => setOpen(false)}
                  className="font-mono text-[12px] uppercase tracking-[0.14em] text-accent py-3 border-b had-hairline"
                >
                  {t.nav.generator}
                </NavLink>
                <NavLink
                  to="/toolkits"
                  onClick={() => setOpen(false)}
                  className="font-mono text-[12px] uppercase tracking-[0.14em] text-ink-2 hover:text-ink py-3 border-b had-hairline"
                >
                  {t.nav.allToolkits}
                </NavLink>
                <NavLink
                  to="/artifacts"
                  onClick={() => setOpen(false)}
                  className="font-mono text-[12px] uppercase tracking-[0.14em] text-ink-2 hover:text-ink py-3 border-b had-hairline"
                >
                  {t.nav.library}
                </NavLink>
                <Button
                  onClick={() => { setOpen(false); handleDownloadKit(); }}
                  className="mt-4 bg-accent text-accent-foreground hover:bg-ink hover:text-background rounded-none font-mono text-[11px] uppercase tracking-[0.12em]"
                >
                  <Download className="size-3.5 mr-2" /> {t.header.downloadStarterKit}
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
