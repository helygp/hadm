import { AppLayout } from "@/components/layout/AppLayout";
import { Seo } from "@/components/Seo";
import { UseCaseSubmitSection } from "@/components/sections/ContributeSection";
import { useT } from "@/i18n/I18nProvider";
export default function CaseSubmitPage() {
  const t = useT();
  return (
    <AppLayout>
      <Seo title={t.meta.caseTitle} description={t.meta.caseDesc} />
      <UseCaseSubmitSection />
    </AppLayout>
  );
}
