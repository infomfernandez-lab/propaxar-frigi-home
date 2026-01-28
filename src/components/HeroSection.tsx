import { ArrowRight, Zap } from "lucide-react";

const HeroSection = () => {
  const handleCTAClick = () => {
    const formSection = document.getElementById("form-section");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-12 lg:py-20">
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            {/* Main Headline */}
            <div className="opacity-0 animate-fade-in-up">
              <h1 className="text-hero-mobile lg:text-hero text-foreground">
                Tu casa en Frigiliana.
                <br />
                <span className="text-terracotta">En 7 días.</span>
              </h1>
            </div>

            {/* Subheadline */}
            <p className="text-subhead text-muted-foreground max-w-lg opacity-0 animate-fade-in-up animation-delay-100">
              Nacido aquí. Conozco cada propiedad, cada propietario, cada calle.
            </p>

            {/* Value Proposition */}
            <p className="text-value-prop text-primary opacity-0 animate-fade-in-up animation-delay-200">
              Una llamada conmigo = Acceso al 100% del mercado.
            </p>

            {/* Guarantee */}
            <p className="text-lg italic text-olive opacity-0 animate-fade-in-up animation-delay-300">
              "Si no encuentras nada que te encante, te devuelvo el dinero."
            </p>

            {/* Trust Stats */}
            <div className="flex flex-wrap gap-8 lg:gap-12 py-4 opacity-0 animate-fade-in-up animation-delay-400">
              <div className="text-center">
                <div className="stat-number">127</div>
                <div className="stat-label">familias reubicadas</div>
              </div>
              <div className="text-center">
                <div className="stat-number">7 días</div>
                <div className="stat-label">promedio</div>
              </div>
              <div className="text-center">
                <div className="stat-number">100%</div>
                <div className="stat-label">del mercado</div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="space-y-4 opacity-0 animate-fade-in-up animation-delay-500">
              <button onClick={handleCTAClick} className="btn-hero group">
                Encuentra tu casa ahora
                <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
              </button>

              {/* Micro-copy */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Zap className="w-4 h-4 text-secondary" />
                <span>Consulta gratuita 15 min · Sin compromiso · Te llamo en 24h</span>
              </div>
            </div>
          </div>

          {/* Right Column - Hero Image */}
          <div className="opacity-0 animate-fade-in-up animation-delay-600 order-first lg:order-last">
            <div className="hero-image-container aspect-square lg:aspect-[4/5]">
              <img
                src="/hero-consultant.jpg"
                alt="Manuel Fernández - Expert local housing consultant Frigiliana"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
