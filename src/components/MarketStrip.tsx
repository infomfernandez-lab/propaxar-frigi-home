import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const MarketStrip = () => {
  const { language } = useLanguage();

  return (
    <section className="px-5 md:px-8">
      <Link
        to="/mercado"
        className="block max-w-[1200px] mx-auto rounded-xl p-6 md:p-8 transition-all hover:opacity-95"
        style={{ backgroundColor: 'hsl(222, 28%, 16%)' }}
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span
              className="text-xs font-semibold px-2.5 py-1 rounded-md"
              style={{ backgroundColor: 'hsl(210, 53%, 24%)', color: '#fff' }}
            >
              {language === 'es' ? 'Gratis · Mensual' : 'Free · Monthly'}
            </span>
            <p className="text-white/90 text-sm md:text-base font-medium">
              {language === 'es'
                ? 'Market Report — datos reales del mercado de Frigiliana. Primer lunes de cada mes.'
                : 'Market Report — real market data from Frigiliana. First Monday of each month.'}
            </p>
          </div>
          <span className="flex items-center gap-1 text-sm font-semibold" style={{ color: 'hsl(210, 56%, 55%)' }}>
            {language === 'es' ? 'Ver el informe' : 'View the report'} <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </Link>
    </section>
  );
};

export default MarketStrip;
