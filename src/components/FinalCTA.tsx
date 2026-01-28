import { ArrowRight } from "lucide-react";

const FinalCTA = () => {
  const handleCTAClick = () => {
    const formSection = document.getElementById("form-section");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="bg-primary py-20 md:py-24">
      <div className="max-w-[900px] mx-auto px-5 text-center">
        {/* Headline */}
        <h2 className="text-3xl md:text-[42px] font-bold text-primary-foreground leading-tight mb-6">
          ¿Listo para encontrar tu casa en Frigiliana?
        </h2>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-[600px] mx-auto">
          La próxima semana podrías estar en tu nueva casa
        </p>

        {/* CTA Button */}
        <button onClick={handleCTAClick} className="btn-secondary text-xl px-12 py-5">
          Empezar búsqueda gratuita
          <ArrowRight className="w-6 h-6" />
        </button>

        {/* Micro-copy */}
        <p className="text-sm text-primary-foreground/70 mt-6">
          Consulta 15 min  •  Sin compromiso  •  Te llamo hoy
        </p>
      </div>
    </section>
  );
};

export default FinalCTA;
