import { useLanguage } from "@/contexts/LanguageContext";

const WhatsAppCTA = () => {
  const { language } = useLanguage();

  return (
    <section className="py-16 md:py-20" style={{ backgroundColor: "hsl(222, 28%, 16%)" }}>
      <div className="max-w-[800px] mx-auto px-5 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold font-heading mb-2">
          {language === "es" ? "Ya has buscado suficiente." : "You've been searching long enough."}
        </h2>
        <h3 className="text-2xl md:text-3xl font-bold font-heading mb-6 text-white/80">
          {language === "es" ? "Acabemos con esto hoy." : "Let's end it today."}
        </h3>
        <p className="text-base md:text-lg text-white/70 mb-8 max-w-[560px] mx-auto">
          {language === "es"
            ? "Primera consulta gratis. Respondo hoy. En tu idioma."
            : "First consultation free. I respond today. In your language."}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="mailto:info@propaxar.com?subject=I'm%20ready"
            className="inline-flex items-center gap-3 text-base font-bold px-10 py-4 rounded-lg transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#fff", color: "hsl(222, 28%, 16%)" }}
          >
            {language === "es" ? "Estoy listo" : "I'm ready"}
          </a>

          <a
            href="https://wa.me/34662317561"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-base font-bold px-10 py-4 rounded-lg transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#fff", color: "hsl(222, 28%, 16%)" }}
          >
            {language === "es" ? "Escríbeme por WhatsApp" : "Message me on WhatsApp"}
          </a>
        </div>

        <p className="text-sm text-white/50 mt-8">
          +34 662 317 561 · info@propaxar.com · Frigiliana, Málaga
        </p>
      </div>
    </section>
  );
};

export default WhatsAppCTA;
