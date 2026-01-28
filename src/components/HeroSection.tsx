import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  const handleCTAClick = () => {
    const formSection = document.getElementById("form-section");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="bg-background">
      {/* Hero Content */}
      <div className="px-5 pt-16 pb-12 md:pt-28 md:pb-20">
        <div className="max-w-[900px] mx-auto text-center">
          {/* Pre-headline */}
          <p className="text-sm uppercase tracking-widest font-medium text-secondary mb-6 opacity-0 animate-fade-in-up">
            Experto local en Frigiliana
          </p>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-[54px] font-bold text-foreground leading-tight mb-6 opacity-0 animate-fade-in-up animation-delay-100">
            Acceso al 100% del mercado inmobiliario de Frigiliana
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl font-medium text-foreground-muted mb-8 opacity-0 animate-fade-in-up animation-delay-200">
            Tu facilitador local para encontrar casa sin estrés
          </p>

          {/* Description */}
          <p className="text-lg text-foreground-muted max-w-[700px] mx-auto mb-10 leading-relaxed opacity-0 animate-fade-in-up animation-delay-300">
            Nacido aquí. 40 años conociendo cada propiedad, cada propietario, cada calle. 
            Una llamada conmigo = todo el mercado a tu disposición. Casa encontrada en 7 días.
          </p>

          {/* CTA Button */}
          <div className="mb-5 opacity-0 animate-fade-in-up animation-delay-400">
            <button 
              onClick={handleCTAClick} 
              className="btn-primary w-full max-w-[400px] md:w-auto"
            >
              Empezar ahora
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Micro-copy */}
          <p className="text-[15px] text-foreground-subtle mb-16 opacity-0 animate-fade-in-up animation-delay-400">
            ✓ Consulta gratuita 15 min  •  Sin compromiso  •  Respuesta en 24h
          </p>

          {/* Visual Divider */}
          <div className="border-t border-border max-w-[600px] mx-auto mb-12 opacity-0 animate-fade-in-up animation-delay-500" />

          {/* Trust Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-[600px] mx-auto opacity-0 animate-fade-in-up animation-delay-500">
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
    </section>
  );
};

export default HeroSection;
