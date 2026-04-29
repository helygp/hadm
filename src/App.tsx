import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import ArtifactsPage from "./pages/ArtifactsPage";
import ToolkitsPage from "./pages/ToolkitsPage";
import ToolkitDetailPage from "./pages/ToolkitDetailPage";
import GeneratorPage from "./pages/GeneratorPage";
import CommunityPage from "./pages/CommunityPage";
import CaseSubmitPage from "./pages/CaseSubmitPage";
import ContributePage from "./pages/ContributePage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/artifacts" element={<ArtifactsPage />} />
            <Route path="/toolkits" element={<ToolkitsPage />} />
            <Route path="/toolkits/:toolId" element={<ToolkitDetailPage />} />
            <Route path="/generator" element={<GeneratorPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/cases/submit" element={<CaseSubmitPage />} />
            <Route path="/contribute" element={<ContributePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
