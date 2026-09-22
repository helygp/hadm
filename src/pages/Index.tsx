import { AppLayout } from "@/components/layout/AppLayout";
import { Seo } from "@/components/Seo";
import { HeroSection } from "@/components/sections/HeroSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { AutonomyLevelsSection } from "@/components/sections/AutonomyLevelsSection";
import { HomeWhySummarySection } from "@/components/sections/HomeWhySummarySection";
import { GetStartedSection } from "@/components/sections/GetStartedSection";
import { useT } from "@/i18n/I18nProvider";

const Index = () => {
  const t = useT();
  return (
    <AppLayout>
      <Seo title={t.meta.siteTitle} description={t.meta.siteDesc} />
      <h1 className="sr-only">{t.meta.siteTitle}</h1>
      <HeroSection />
      <HowItWorksSection />
      <AutonomyLevelsSection />
      <HomeWhySummarySection />
      <GetStartedSection />
    </AppLayout>
  );
};

export default Index;
