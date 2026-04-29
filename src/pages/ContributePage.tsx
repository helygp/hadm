import { AppLayout } from "@/components/layout/AppLayout";
import { Seo } from "@/components/Seo";
import { ContributeSection } from "@/components/sections/ContributeSection";
export default function ContributePage() {
  return (
    <AppLayout>
      <Seo title="Contribute — HAD Method" description="Help shape the HAD Method by contributing artifacts, agent roles, case studies and translations." />
      <ContributeSection />
    </AppLayout>
  );
}
