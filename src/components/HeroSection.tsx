import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  const handleCTAClick = () => {
    const formSection = document.getElementById("form-section");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative">
      {/* Hero Background with Overlay */}
      <div 
        className="relative min-h-screen md:min-h-screen flex flex-col"
        style={{
          backgroundImage: `url(https://propaxar.com/wp-content/uploads/2026/01/Gemini_Generated_Image_wyt8u3wyt8u3wyt8.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Dark Overlay - 50% opacity */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Hero Content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center items-center px-5 pt-20 pb-8 md:pt-32 md:pb-16">
          <div className="max-w-[900px] mx-auto text-center">
            {/* Pre-headline */}
            <p className="text-sm uppercase tracking-[0.2em] font-medium text-secondary mb-6 opacity-0 animate-fade-in-up">
              Experto local en Frigiliana
            </p>

            {/* Main Headline - 58px desktop, 38px mobile */}
            <h1 className="text-[38px] md:text-[58px] font-bold text-white leading-tight mb-6 opacity-0 animate-fade-in-up animation-delay-100">
              Tu casa en Frigiliana en 7 días. <br className="hidden md:block" />
              <span className="text-secondary">Garantizado.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-[22px] font-medium text-white/90 max-w-[600px] mx-auto mb-10 opacity-0 animate-fade-in-up animation-delay-200">
              Acceso al 100% del mercado. Asesoría personal. Resultados rápidos.
            </p>

            {/* Simple CTA Button */}
            <div className="opacity-0 animate-fade-in-up animation-delay-300">
              <button
                onClick={handleCTAClick}
                className="inline-flex items-center gap-3 bg-primary hover:bg-primary/90 text-primary-foreground text-2xl font-semibold px-[60px] py-5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
              >
                Empezar ahora
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>

            {/* Micro-copy below button */}
            <p className="text-base text-white/80 mt-6 opacity-0 animate-fade-in-up animation-delay-400">
              ✓ Consulta gratuita 15 min  •  Sin compromiso  •  Respuesta en 24h
            </p>
          </div>
        </div>

        {/* Trust Bar */}
        <div className="relative z-10 bg-card/95 backdrop-blur-sm py-6 md:py-8">
          <div className="max-w-[900px] mx-auto px-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 opacity-0 animate-fade-in-up animation-delay-500">
              <div className="text-center">
                <div className="stat-number">127</div>
                <div className="stat-label">Familias reubicadas</div>
              </div>
              <div className="text-center">
                <div className="stat-number">7 días</div>
                <div className="stat-label">Tiempo promedio</div>
              </div>
              <div className="text-center">
                <div className="stat-number">100%</div>
                <div className="stat-label">Cobertura mercado</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
