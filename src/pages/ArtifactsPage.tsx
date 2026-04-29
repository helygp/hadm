import { AppLayout } from "@/components/layout/AppLayout";
import { Seo } from "@/components/Seo";
import { ArtifactsSection } from "@/components/sections/ArtifactsSection";

export default function ArtifactsPage() {
  return (
    <AppLayout>
      <Seo title="Artifact Library — HAD Method" description="Browse, preview and download every HAD Method artifact: manifesto, canvas, prompts, agents, checklists and templates." />
      <ArtifactsSection />
    </AppLayout>
  );
}
