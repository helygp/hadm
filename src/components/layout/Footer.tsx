import { Link } from "react-router-dom";
import { BrandMark } from "@/components/visuals/Orbital";
import { useT } from "@/i18n/I18nProvider";

export function Footer() {
  const t = useT();
  return (
    <footer className="border-t had-hairline mt-0">
      <div className="had-wrap py-16 grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5 font-mono text-[12px] uppercase tracking-[0.12em]">
            <BrandMark />
            <span className="text-ink font-semibold">HAD Method</span>
          </div>
          <p className="font-display text-2xl mt-6 leading-tight text-ink">
            {t.footer.tagA} <span className="text-warm italic">{t.footer.tagB}</span><br />
            {t.footer.tagC} <span className="text-accent">{t.footer.tagD}</span>
          </p>
          <p className="text-ink-3 text-sm mt-4 max-w-md">{t.footer.intro}</p>
        </div>
        <FooterCol title={t.footer.methodCol} links={[
          { to: "/#method", label: t.footer.whyHad },
          { to: "/#loop", label: t.footer.loop },
          { to: "/#faq", label: t.footer.faq },
        ]} />
        <FooterCol title={t.footer.resourcesCol} links={[
          { to: "/artifacts", label: t.footer.artifactLib },
          { to: "/toolkits", label: t.footer.aiTools },
          { to: "/generator", label: t.footer.instr },
        ]} />
        <FooterCol title={t.footer.communityCol} links={[
          { to: "/community", label: t.footer.applyFounding },
          { to: "/cases/submit", label: t.footer.suggestCase },
          { to: "/contribute", label: t.footer.contribute },
        ]} />
      </div>
      <div className="had-wrap pb-10 pt-6 border-t had-hairline flex flex-col md:flex-row gap-3 justify-between items-start md:items-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-4">
          © {new Date().getFullYear()} HAD Method · {t.footer.copy} · v0.1
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-4">
          {t.footer.built}
        </p>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { to: string; label: string }[] }) {
  return (
    <div>
      <h4 className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3 mb-4">{title}</h4>
      <ul className="flex flex-col gap-2.5">
        {links.map((l) => (
          <li key={l.to + l.label}>
            <Link to={l.to} className="text-sm text-ink-2 hover:text-ink transition-colors">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
