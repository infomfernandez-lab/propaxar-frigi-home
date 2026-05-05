import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight, MessageCircle } from "lucide-react";

const WhatsAppCTA = () => {
  const { language } = useLanguage();

  const handleScrollToForm = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById("form-section");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="py-20 md:py-28" style={{ backgroundColor: "hsl(222, 28%, 16%)" }}>
      <div className="max-w-[760px] mx-auto px-5 text-center text-white">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="#form-section"
            onClick={handleScrollToForm}
            className="group inline-flex items-center justify-center gap-2 text-base font-bold px-10 py-4 rounded-lg transition-all hover:scale-[1.02] hover:shadow-xl w-full sm:w-auto"
            style={{ backgroundColor: "#fff", color: "hsl(222, 28%, 16%)" }}
          >
            {language === "es" ? "Empezar ahora" : "Start now"}
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </a>

          <a
            href="https://wa.me/34662317561"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 text-base font-bold px-10 py-4 rounded-lg transition-opacity hover:opacity-90 w-full sm:w-auto"
            style={{ backgroundColor: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.35)" }}
          >
            <MessageCircle className="w-5 h-5" />
            {language === "es" ? "WhatsApp directo" : "WhatsApp direct"}
          </a>
        </div>

        <p className="text-xs text-white/40 mt-6">
          +34 662 317 561 · info@propaxar.com · Frigiliana, Málaga
        </p>
      </div>
    </section>
  );
};

export default WhatsAppCTA;
