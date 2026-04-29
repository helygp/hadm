import { AppLayout } from "@/components/layout/AppLayout";
import { Seo } from "@/components/Seo";
import { CommunitySection } from "@/components/sections/CommunitySection";
export default function CommunityPage() {
  return (
    <AppLayout>
      <Seo title="Community — HAD Method" description="Apply to join the founding HAD Method community." />
      <CommunitySection />
    </AppLayout>
  );
}
