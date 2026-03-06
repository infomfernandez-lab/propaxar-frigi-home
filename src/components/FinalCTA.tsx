import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const FinalCTA = () => {
  const { language } = useLanguage();

  const handleCTAClick = () => {
    const el = document.getElementById("form-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="final-cta" className="py-20 md:py-24" style={{ backgroundColor: 'hsl(222, 28%, 16%)' }}>
      <div className="max-w-[800px] mx-auto px-5 text-center">
        <h2 className="text-3xl md:text-[40px] font-bold text-white leading-tight mb-4 font-heading">
          {language === 'es' ? (
            <>¿Listo para <span style={{ color: 'hsl(210, 56%, 55%)' }}>encontrar</span> lo que buscas?</>
          ) : (
            <>Ready to <span style={{ color: 'hsl(210, 56%, 55%)' }}>find</span> what you're looking for?</>
          )}
        </h2>

        <p className="text-base md:text-lg text-white/70 mb-10">
          {language === 'es'
            ? 'Cuéntame qué necesitas. Te respondo antes de 24h.'
            : 'Tell me what you need. I\'ll respond within 24h.'}
        </p>

        <button onClick={handleCTAClick} className="btn-primary text-lg px-12 py-4">
          {language === 'es' ? 'Empezar ahora' : 'Start now'}
          <ArrowRight className="w-5 h-5" />
        </button>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-8 text-[14px] text-white/50">
          <span>✓ {language === 'es' ? 'Consulta gratuita' : 'Free consultation'}</span>
          <span>✓ {language === 'es' ? 'Sin compromiso' : 'No commitment'}</span>
          <span>✓ {language === 'es' ? 'Hablamos en inglés si necesitas' : 'We speak English if needed'}</span>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
