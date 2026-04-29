import { Link } from "react-router-dom";
import { BrandMark } from "@/components/visuals/Orbital";

export function Footer() {
  return (
    <footer className="border-t had-hairline mt-0">
      <div className="had-wrap py-16 grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5 font-mono text-[12px] uppercase tracking-[0.12em]">
            <BrandMark />
            <span className="text-ink font-semibold">HAD Method</span>
          </div>
          <p className="font-display text-2xl mt-6 leading-tight text-ink">
            Humans govern. <span className="text-warm italic">Agents conceive.</span><br />
            AI delivers. <span className="text-accent">Value validates.</span>
          </p>
          <p className="text-ink-3 text-sm mt-4 max-w-md">
            An open methodology for human-governed agentic delivery of digital value.
          </p>
        </div>
        <FooterCol title="Method" links={[
          { to: "/#method", label: "Why HAD" },
          { to: "/#loop", label: "Operating Loop" },
          { to: "/#faq", label: "FAQ" },
        ]} />
        <FooterCol title="Resources" links={[
          { to: "/artifacts", label: "Artifact Library" },
          { to: "/toolkits", label: "AI Toolkits" },
          { to: "/generator", label: "Instruction Generator" },
        ]} />
        <FooterCol title="Community" links={[
          { to: "/community", label: "Apply to Founding" },
          { to: "/cases/submit", label: "Suggest a Use Case" },
          { to: "/contribute", label: "Contribute" },
        ]} />
      </div>
      <div className="had-wrap pb-10 pt-6 border-t had-hairline flex flex-col md:flex-row gap-3 justify-between items-start md:items-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-4">
          © {new Date().getFullYear()} HAD Method · Open Community Methodology · v0.1
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-4">
          Built under HAD Method
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
