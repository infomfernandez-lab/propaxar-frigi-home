import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import PropertyFinder from "./pages/PropertyFinder";
import TerminosFinder from "./pages/TerminosFinder";
import ReporteTest from "./pages/ReporteTest";
import ReportePropaxar from "./pages/ReportePropaxar";
import ReporteKatinkaEN from "./pages/ReporteKatinkaEN";
import ReporteNadiaEN from "./pages/ReporteNadiaEN";
import ComprarReporte from "./pages/ComprarReporte";
import DemoReporte from "./pages/DemoReporte";
import Empezar from "./pages/Empezar";
import Mercado from "./pages/Mercado";
import Invertir from "./pages/Invertir";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <LanguageProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/finder" element={<PropertyFinder />} />
              <Route path="/terminos-finder" element={<TerminosFinder />} />
              <Route path="/reporte-test" element={<ReporteTest />} />
              <Route path="/reporte-propaxar" element={<ReportePropaxar />} />
              <Route path="/reporte/:slug" element={<ReportePropaxar />} />
              <Route path="/reporte/katinka-durkstra-a7k9m2-en" element={<ReporteKatinkaEN />} />
              <Route path="/reporte/nadia-horsted-n-b4x9k2-en" element={<ReporteNadiaEN />} />
              <Route path="/comprar-reporte" element={<ComprarReporte />} />
              <Route path="/demo-reporte" element={<DemoReporte />} />
              <Route path="/empezar" element={<Empezar />} />
              <Route path="/mercado" element={<Mercado />} />
              <Route path="/invertir" element={<Invertir />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </LanguageProvider>
  </HelmetProvider>
);

export default App;
