import { ArrowRight } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      icon: "📞",
      title: "Consulta gratuita",
      description: "15 minutos para entender qué buscas. Te explico mi proceso.",
    },
    {
      number: 2,
      icon: "🔍",
      title: "Búsqueda exhaustiva",
      description: "Reviso el 100% del mercado (todas las agencias + propietarios directos). Te presento las 3-5 mejores opciones.",
    },
    {
      number: 3,
      icon: "🏡",
      title: "Tu nueva casa",
      description: "Coordino visitas, te acompaño, negocio por ti. Firma y mudanza en 7 días.",
    },
  ];

  const handleCTAClick = () => {
    const formSection = document.getElementById("form-section");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="bg-background py-16 md:py-20">
      <div className="max-w-[1200px] mx-auto px-5">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Cómo funciona
          </h2>
          <p className="text-lg text-foreground-muted max-w-[700px] mx-auto">
            De la primera llamada a tu nueva casa en menos de una semana
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12">
          {steps.map((step, index) => (
            <div 
              key={step.number} 
              className="process-card"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className="process-icon" role="img" aria-label={step.title}>
                {step.icon}
              </div>

              {/* Number Badge */}
              <div className="process-badge">
                {step.number}
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-foreground-muted leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <button onClick={handleCTAClick} className="btn-primary">
            Empezar ahora
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
