import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import LanguageDropdown from "./components/LanguageDropdown";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import BlogPost from "./components/BlogPost";
import NotFound from "./pages/NotFound";
import ExcelDownloader from "./pages/ExcelDownloader";
import LiveBreakglass from "./pages/LiveBreakglass";

/** Routes that are English-only and carry their own bottom bar, so the floating language picker stays off. */
const NO_LANGUAGE_PICKER = new Set(["/breakglass"]);

const LanguagePicker = () => {
  const { pathname } = useLocation();
  return NO_LANGUAGE_PICKER.has(pathname.replace(/\/$/, "")) ? null : <LanguageDropdown />;
};

const queryClient = new QueryClient();

const AppContent = () => {
  const { language } = useLanguage();
  
  // Set language attribute on document element
  React.useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/payments-report" element={<ExcelDownloader />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/breakglass" element={<LiveBreakglass />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <LanguagePicker />
      </BrowserRouter>
    </TooltipProvider>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
