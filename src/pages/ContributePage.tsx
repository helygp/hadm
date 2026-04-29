import { AppLayout } from "@/components/layout/AppLayout";
import { Seo } from "@/components/Seo";
import { ContributeSection } from "@/components/sections/ContributeSection";
import { useT } from "@/i18n/I18nProvider";
export default function ContributePage() {
  const t = useT();
  return (
    <AppLayout>
      <Seo title={t.meta.contributeTitle} description={t.meta.contributeDesc} />
      <ContributeSection />
    </AppLayout>
  );
}
