import { AppLayout } from "@/components/layout/AppLayout";
import { Seo } from "@/components/Seo";
import { ToolkitsSection } from "@/components/sections/ToolkitsSection";
import { useT } from "@/i18n/I18nProvider";

export default function ToolkitsPage() {
  const t = useT();
  return (
    <AppLayout>
      <Seo title={t.meta.toolkitsTitle} description={t.meta.toolkitsDesc} />
      <ToolkitsSection />
    </AppLayout>
  );
}
