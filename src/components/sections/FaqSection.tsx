import { SectionHead } from "@/components/sections/WhyHadSection";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useT } from "@/i18n/I18nProvider";

export function FaqSection() {
  const t = useT();
  return (
    <section id="faq" className="had-section">
      <div className="had-wrap">
        <SectionHead num={t.faqSection.num} label={t.faqSection.label} title={t.faqSection.title} lede={t.faqSection.lede} />
        <Accordion type="single" collapsible className="border-t had-hairline">
          {t.faqs.map((f, i) => (
            <AccordionItem key={i} value={`q-${i}`} className="border-b had-hairline">
              <AccordionTrigger className="text-left py-6 font-display text-xl md:text-2xl text-ink tracking-tight hover:no-underline hover:text-accent transition-colors">
                <span className="flex items-start gap-6">
                  <span className="font-mono text-[10px] tracking-[0.18em] text-ink-4 mt-2 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{f.q}</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-8 pl-[44px] text-ink-2 text-base leading-relaxed">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
