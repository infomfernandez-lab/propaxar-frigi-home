import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronDown } from "lucide-react";

const HeroSection = () => {
  const { language } = useLanguage();

  return (
    <section className="relative min-h-screen flex flex-col">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(https://propaxar.com/wp-content/uploads/2026/01/Gemini_Generated_Image_wyt8u3wyt8u3wyt8.png)`,
        }}
      />
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(17,24,39,0.65)" }} />

      <div className="relative z-10 flex-1 flex flex-col justify-center items-center px-5 pt-24 pb-16">
        <div className="max-w-[820px] mx-auto text-center">
          <p className="text-xs md:text-sm font-semibold tracking-[0.18em] uppercase text-white/70 mb-6 opacity-0 animate-fade-in-up">
            PROPERTY FINDER · FRIGILIANA · LA AXARQUÍA · MÁLAGA
          </p>

          <h1 className="text-[34px] md:text-[54px] font-extrabold text-white leading-[1.1] mb-5 font-heading opacity-0 animate-fade-in-up animation-delay-100">
            {language === "es" ? (
              <>Deja de buscar.<br />Empieza a encontrar.</>
            ) : (
              <>Stop searching.<br />Start finding.</>
            )}
          </h1>

          <p className="text-[18px] md:text-[22px] font-medium text-white/90 leading-[1.5] mb-8 max-w-[680px] mx-auto opacity-0 animate-fade-in-up animation-delay-200">
            {language === "es"
              ? "Yo busco, visito y filtro todo el mercado de Frigiliana y La Axarquía. Tú recibes una sola recomendación: la correcta."
              : "I search, visit and filter the whole Frigiliana & Axarquía market. You get one recommendation: the right one."}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 opacity-0 animate-fade-in-up animation-delay-300">
            <a
              href="mailto:info@propaxar.com?subject=I'm%20ready"
              className="inline-flex items-center gap-2 text-base font-bold px-10 py-4 rounded-lg transition-opacity hover:opacity-90"
              style={{ backgroundColor: "hsl(222, 28%, 16%)", color: "#fff", border: "1px solid rgba(255,255,255,0.3)" }}
            >
              {language === "es" ? "Estoy listo" : "I'm ready"}
            </a>

            <a
              href="https://wa.me/34662317561"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-base font-bold px-10 py-4 rounded-lg transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#fff", color: "hsl(222, 28%, 16%)" }}
            >
              {language === "es" ? "Escríbeme por WhatsApp" : "Message me on WhatsApp"}
            </a>
          </div>

        </div>
      </div>

      <div className="relative z-10 flex justify-center pb-8">
        <ChevronDown className="w-6 h-6 text-white/50 animate-bounce" />
      </div>
    </section>
  );
};

export default HeroSection;
