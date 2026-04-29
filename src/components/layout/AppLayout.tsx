import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TweaksPanel } from "@/components/layout/TweaksPanel";

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <TweaksPanel />
    </div>
  );
}
