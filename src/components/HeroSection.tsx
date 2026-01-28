import { useState } from "react";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-frigiliana.jpg";

const HeroSection = () => {
  const [selectedType, setSelectedType] = useState("largo");

  const accommodationTypes = [
    { id: "largo", label: "Alquiler largo plazo" },
    { id: "vacacional", label: "Vacacional (1-3 meses)" },
    { id: "relocation", label: "Relocation completa" },
  ];

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
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Hero Content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center items-center px-5 pt-20 pb-8 md:pt-32 md:pb-16">
          <div className="max-w-[900px] mx-auto text-center">
            {/* Pre-headline */}
            <p className="text-sm uppercase tracking-[0.2em] font-medium text-secondary mb-6 opacity-0 animate-fade-in-up">
              Experto local en Frigiliana
            </p>

            {/* Main Headline */}
            <h1 className="text-[32px] md:text-[52px] font-bold text-white leading-tight mb-6 opacity-0 animate-fade-in-up animation-delay-100">
              Tu casa en Frigiliana en 7 días. <br className="hidden md:block" />
              <span className="text-secondary">Garantizado.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-[22px] font-medium text-white/90 max-w-[600px] mx-auto mb-10 opacity-0 animate-fade-in-up animation-delay-200">
              Acceso al 100% del mercado. Asesoría personal. Resultados rápidos.
            </p>

            {/* Search-Style CTA Box */}
            <div className="bg-card rounded-xl shadow-2xl p-4 md:p-6 max-w-[800px] mx-auto opacity-0 animate-fade-in-up animation-delay-300">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                {/* Left side - Radio options */}
                <div className="flex-1">
                  <label className="block text-sm font-medium text-foreground-muted mb-3 text-left">
                    ¿Qué tipo de alojamiento buscas?
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {accommodationTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setSelectedType(type.id)}
                        className={`chip-radio ${selectedType === type.id ? 'active' : ''}`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Right side - CTA Button */}
                <div className="md:w-auto">
                  <button
                    onClick={handleCTAClick}
                    className="btn-primary w-full md:w-auto whitespace-nowrap"
                  >
                    Empezar búsqueda
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Micro-copy below card */}
            <p className="text-[15px] text-white/80 mt-6 opacity-0 animate-fade-in-up animation-delay-400">
              ✓ Consulta gratuita  •  Sin compromiso  •  Respuesta en 24h
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
