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

const Index = () => (
  <AppLayout>
    <Seo
      title="HAD Method — Human-Governed Agentic Delivery"
      description="An open method for delivering digital value with AI agents under human governance. Download the Starter Kit, configure your AI tools, and join the founding community."
    />
    <h1 className="sr-only">HAD Method — Human-Governed Agentic Delivery</h1>
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

export default Index;
