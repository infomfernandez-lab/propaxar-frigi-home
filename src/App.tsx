import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import MarketReport from "./pages/MarketReport";
import Comprar from "./pages/Comprar";
import TerminosFinder from "./pages/TerminosFinder";
import ReporteKatinkaEN from "./pages/ReporteKatinkaEN";
import ReporteNadiaEN from "./pages/ReporteNadiaEN";
import ReporteHenriEN from "./pages/ReporteHenriEN";
import ComprarReporte from "./pages/ComprarReporte";
import DemoReporte from "./pages/DemoReporte";
import Mercado from "./pages/Mercado";
import Invertir from "./pages/Invertir";
import Alquilar from "./pages/Alquilar";
import EncuentraTuAlquiler from "./pages/EncuentraTuAlquiler";
import PisoFrigiliana from "./pages/PisoFrigiliana";
import VillaFrigiliana from "./pages/VillaFrigiliana";
import VillaVistas from "./pages/VillaVistas";
import VillaPatricia from "./pages/VillaPatricia";
import VillaCelia from "./pages/VillaCelia";
import CasaRural from "./pages/CasaRural";
import VillaPanorama from "./pages/VillaPanorama";
import CasaFrigiliana from "./pages/CasaFrigiliana";
import Propiedades from "./pages/Propiedades";
import ReportePublico from "./pages/ReportePublico";
import DevReporteSource from "./pages/DevReporteSource";
import PropiedadPublica from "./pages/PropiedadPublica";
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
              <Route path="/market-report" element={<MarketReport />} />
              {/* <Route path="/terminos-finder" element={<TerminosFinder />} /> hidden temporarily */}
              <Route path="/reporte/katinka-durkstra-a7k9m2-en" element={<ReporteKatinkaEN />} />
              <Route path="/reporte/nadia-horsted-n-b4x9k2-en" element={<ReporteNadiaEN />} />
              <Route path="/reporte/henri-gloudemans-h3v7p9-en" element={<ReporteHenriEN />} />
              <Route path="/comprar-reporte" element={<ComprarReporte />} />
              <Route path="/demo-reporte" element={<DemoReporte />} />
              <Route path="/comprar" element={<Comprar />} />
              <Route path="/mercado" element={<Mercado />} />
              <Route path="/invertir" element={<Invertir />} />
              <Route path="/alquilar" element={<Alquilar />} />
              <Route path="/encuentra-tu-alquiler" element={<EncuentraTuAlquiler />} />
              <Route path="/property/pisoenfrigiliana" element={<PisoFrigiliana />} />
              <Route path="/property/villaenfrigiliana" element={<VillaFrigiliana />} />
              <Route path="/property/villavistas" element={<VillaVistas />} />
              <Route path="/property/villaolivos" element={<VillaPatricia />} />
              <Route path="/property/villacelia" element={<VillaCelia />} />
              <Route path="/property/casarural" element={<CasaRural />} />
              <Route path="/property/villapanorama" element={<VillaPanorama />} />
              <Route path="/property/casaenfrigiliana" element={<CasaFrigiliana />} />
              <Route path="/propiedades" element={<Propiedades />} />
              <Route path="/r/:slug" element={<ReportePublico />} />
              {import.meta.env.DEV && (
                <Route path="/dev/reporte-source" element={<DevReporteSource />} />
              )}
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
