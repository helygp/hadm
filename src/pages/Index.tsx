import { AppLayout } from "@/components/layout/AppLayout";
import { Seo } from "@/components/Seo";
import { HeroSection } from "@/components/sections/HeroSection";
import { WhyHadSection } from "@/components/sections/WhyHadSection";
import { DefinitionSection } from "@/components/sections/DefinitionSection";
import { OperatingLoopSection } from "@/components/sections/OperatingLoopSection";
import { ArtifactsSection } from "@/components/sections/ArtifactsSection";
import { ToolkitsSection } from "@/components/sections/ToolkitsSection";
import { UseCasesSection } from "@/components/sections/UseCasesSection";
import { CommunitySection } from "@/components/sections/CommunitySection";
import { ContributeSection, UseCaseSubmitSection } from "@/components/sections/ContributeSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { useT } from "@/i18n/I18nProvider";

const Index = () => {
  const t = useT();
  return (
    <AppLayout>
      <Seo title={t.meta.siteTitle} description={t.meta.siteDesc} />
      <h1 className="sr-only">{t.meta.siteTitle}</h1>
      <HeroSection />
      <WhyHadSection />
      <DefinitionSection />
      <OperatingLoopSection />
      <ArtifactsSection compact />
      <ToolkitsSection compact />
      <UseCasesSection />
      <CommunitySection />
      <UseCaseSubmitSection />
      <ContributeSection />
      <FaqSection />
    </AppLayout>
  );
};

export default Index;
