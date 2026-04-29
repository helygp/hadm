import { AppLayout } from "@/components/layout/AppLayout";
import { Seo } from "@/components/Seo";
import { CommunitySection } from "@/components/sections/CommunitySection";
import { useT } from "@/i18n/I18nProvider";
export default function CommunityPage() {
  const t = useT();
  return (
    <AppLayout>
      <Seo title={t.meta.communityTitle} description={t.meta.communityDesc} />
      <CommunitySection />
    </AppLayout>
  );
}
