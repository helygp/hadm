import { AppLayout } from "@/components/layout/AppLayout";
import { Seo } from "@/components/Seo";
import { ArtifactsSection } from "@/components/sections/ArtifactsSection";
import { useT } from "@/i18n/I18nProvider";

export default function ArtifactsPage() {
  const t = useT();
  return (
    <AppLayout>
      <Seo title={t.meta.artifactsTitle} description={t.meta.artifactsDesc} />
      <ArtifactsSection />
    </AppLayout>
  );
}
