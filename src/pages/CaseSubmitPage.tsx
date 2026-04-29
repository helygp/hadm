import { AppLayout } from "@/components/layout/AppLayout";
import { Seo } from "@/components/Seo";
import { UseCaseSubmitSection } from "@/components/sections/ContributeSection";
export default function CaseSubmitPage() {
  return (
    <AppLayout>
      <Seo title="Suggest a Use Case — HAD Method" description="Submit a use case where HAD Method applies." />
      <UseCaseSubmitSection />
    </AppLayout>
  );
}
