import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";


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
              ? <>Deja de buscar. Empieza a encontrar.</>
              : <>Stop searching. Start finding.</>
            }
          </h1>

          <p className="text-[18px] md:text-[22px] font-medium text-white/90 leading-[1.5] mb-8 opacity-0 animate-fade-in-up animation-delay-100">
            {language === 'es'
              ? 'El mercado de alquiler y compra en La Axarquía es opaco, rápido y difícil de leer desde fuera. Yo lo conozco desde dentro. Frigiliana, Nerja y toda la Axarquía — cada propiedad, cada zona, cada precio real.'
              : 'The rental and buying market in La Axarquía is opaque, fast and hard to read from the outside. I know it from the inside. Frigiliana, Nerja and the whole Axarquía — every property, every area, every real price.'}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8 opacity-0 animate-fade-in-up animation-delay-200">
            <button
              onClick={handleCTAClick}
              className="btn-primary text-lg px-10 py-4"
              style={{ backgroundColor: '#fff', color: '#1E2535' }}
            >
              {language === 'es' ? 'Empezar ahora' : 'Start now'}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Trust items */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-[14px] text-white/70 opacity-0 animate-fade-in-up animation-delay-300">
            <span>✓ {language === 'es' ? 'Respuesta en menos de 2h' : 'Response in under 2h'}</span>
            <span>✓ {language === 'es' ? 'Hablo inglés, español y entiendo holandés' : 'I speak English, Spanish and understand Dutch'}</span>
            <span>✓ {language === 'es' ? 'Sin portales. Sin agencias. Solo yo.' : 'No portals. No agencies. Just me.'}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
