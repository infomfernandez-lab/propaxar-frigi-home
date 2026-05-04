import { useLanguage } from "@/contexts/LanguageContext";
import { MessageCircle } from "lucide-react";

const WhatsAppCTA = () => {
  const { language } = useLanguage();

  return (
    <section className="py-16 md:py-20" style={{ backgroundColor: "hsl(222, 28%, 16%)" }}>
      <div className="max-w-[800px] mx-auto px-5 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold font-heading mb-2">
          {language === "es" ? "El mercado no espera." : "The market doesn't wait."}
        </h2>
        <h3 className="text-2xl md:text-3xl font-bold font-heading mb-6 text-white/80">
          {language === "es" ? "Tú tampoco deberías." : "Neither should you."}
        </h3>
        <p className="text-base md:text-lg text-white/70 mb-8 max-w-[560px] mx-auto">
          {language === "es"
            ? "Escríbeme ahora. Primera consulta gratis. Te respondo hoy."
            : "Write to me now. First consultation free. I'll respond today."}
        </p>

        <a
          href="https://wa.me/34662317561"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 text-base font-bold px-10 py-4 rounded-lg transition-opacity hover:opacity-90"
          style={{ backgroundColor: "#25D366", color: "#fff" }}
        >
          <MessageCircle className="w-5 h-5" />
          {language === "es" ? "Escribir por WhatsApp" : "Message on WhatsApp"}
        </a>

        <p className="text-sm text-white/50 mt-8">
          +34 662 317 561 · info@propaxar.es · Frigiliana, Málaga
        </p>
      </div>
    </section>
  );
};

export default WhatsAppCTA;
