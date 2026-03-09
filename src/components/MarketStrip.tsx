import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const MarketStrip = () => {
  const { language } = useLanguage();

  return (
    <section className="px-5 md:px-8 py-6">
      <Link
        to="/mercado"
        className="block max-w-[1200px] mx-auto rounded-2xl p-8 md:p-12 transition-all hover:scale-[1.005] hover:shadow-2xl"
        style={{
          background: 'linear-gradient(135deg, hsl(222, 28%, 16%) 0%, hsl(222, 22%, 22%) 50%, hsl(222, 28%, 16%) 100%)',
        }}
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">📊</span>
              <span
                className="text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full"
                style={{ backgroundColor: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.9)' }}
              >
                {language === 'es' ? 'Gratis · Cada mes' : 'Free · Monthly'}
              </span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
              Market Report — Frigiliana
            </h3>
            <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-lg">
              {language === 'es'
                ? 'Datos reales de oferta, precios y tendencias del mercado inmobiliario de Frigiliana. Publicado el primer lunes de cada mes.'
                : 'Real supply, pricing, and trend data from the Frigiliana property market. Published the first Monday of each month.'}
            </p>
          </div>
          <span className="flex items-center gap-2 text-sm font-bold text-white bg-white/10 px-5 py-3 rounded-lg hover:bg-white/15 transition-colors">
            {language === 'es' ? 'Ver el informe' : 'View the report'} <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </Link>
    </section>
  );
};

export default MarketStrip;
