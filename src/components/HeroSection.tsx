import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const { language } = useLanguage();

  const handleCTAClick = () => {
    const el = document.getElementById("form-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex flex-col">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(https://propaxar.com/wp-content/uploads/2026/01/Gemini_Generated_Image_wyt8u3wyt8u3wyt8.png)`,
        }}
      />
      <div className="absolute inset-0" style={{ backgroundColor: 'rgba(17,24,39,0.65)' }} />

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center items-center px-5 pt-24 pb-16">
        <div className="max-w-[800px] mx-auto text-center">
          <h1 className="text-[34px] md:text-[54px] font-extrabold text-white leading-[1.1] mb-4 font-heading opacity-0 animate-fade-in-up">
            {language === 'es'
              ? <>Tu consultor personal de vivienda en Frigiliana</>
              : <>Your personal housing consultant in Frigiliana</>
            }
          </h1>

          <p className="text-[20px] md:text-[26px] font-medium text-white/90 leading-[1.4] mb-8 opacity-0 animate-fade-in-up animation-delay-100">
            {language === 'es' ? 'Deja de buscar. Empieza a encontrar.' : 'Stop searching. Start finding.'}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8 opacity-0 animate-fade-in-up animation-delay-200">
            <button
              onClick={handleCTAClick}
              className="btn-primary text-lg px-10 py-4"
            >
              {language === 'es' ? 'Empezar ahora' : 'Start now'}
              <ArrowRight className="w-5 h-5" />
            </button>
            <Link
              to="/mercado"
              className="btn-ghost text-lg px-10 py-4"
            >
              {language === 'es' ? 'Ver Market Report' : 'View Market Report'}
            </Link>
          </div>

          {/* Trust items */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-[14px] text-white/70 opacity-0 animate-fade-in-up animation-delay-300">
            <span>✓ {language === 'es' ? 'Consulta gratuita · Sin compromiso' : 'Free consultation · No commitment'}</span>
            <span>✓ {language === 'es' ? 'Respuesta en 24h' : 'Response in 24h'}</span>
            <span>✓ EN · ES · NL · DE</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
