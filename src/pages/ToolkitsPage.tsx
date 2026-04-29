import { AppLayout } from "@/components/layout/AppLayout";
import { Seo } from "@/components/Seo";
import { ToolkitsSection } from "@/components/sections/ToolkitsSection";

export default function ToolkitsPage() {
  return (
    <AppLayout>
      <Seo title="AI Toolkits — HAD Method" description="Download tool-specific instructions for Claude, OpenAI, Gemini, Lovable, Cursor, GitHub Copilot, Windsurf, Replit and n8n." />
      <ToolkitsSection />
    </AppLayout>
  );
}
