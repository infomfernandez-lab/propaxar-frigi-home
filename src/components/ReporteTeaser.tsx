import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

const ReporteTeaser = () => {
  const { language } = useLanguage();

  const items = language === "es"
    ? [
        { icon: "🏠", text: "Todas las opciones disponibles. Analizadas y filtradas para ti." },
        { icon: "📍", text: "Lo que las fotos no muestran. Lo que solo sabe alguien de aquí." },
        { icon: "💬", text: "Una recomendación. No una lista. Una decisión." },
        { icon: "🔒", text: "Tu reporte. Tu URL. Solo tuyo." },
      ]
    : [
        { icon: "🏠", text: "Every available option. Analysed and filtered for you." },
        { icon: "📍", text: "The things photos don't show. The things only a local knows." },
        { icon: "💬", text: "One recommendation. Not a list. A decision." },
        { icon: "🔒", text: "Your report. Your URL. Yours alone." },
      ];

  return (
    <section className="bg-card py-16 md:py-20">
      <div className="max-w-[900px] mx-auto px-5 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground font-heading mb-4">
          {language === "es" ? "Así es cuando alguien deja de buscar." : "What it looks like when someone stops searching."}
        </h2>
        <p className="text-base md:text-lg text-foreground-muted mb-8 max-w-[640px] mx-auto">
          {language === "es"
            ? "Este es un reporte real preparado para un cliente real. En 48 horas supo exactamente cuál era su propiedad — y por qué. El tuyo será así."
            : "This is a real report prepared for a real client. In 48 hours he knew exactly which property was his — and why. Yours will look like this."}
        </p>

        <Link
          to="/demo-reporte"
          className="inline-block text-base font-semibold text-primary hover:underline mb-10"
        >
          {language === "es" ? "Verlo →" : "See it →"}
        </Link>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-[700px] mx-auto">
          {items.map((item, i) => (
            <div key={i} className="flex items-start gap-3 bg-background rounded-lg p-4 border border-border">
              <span className="text-2xl">{item.icon}</span>
              <p className="text-sm text-foreground leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReporteTeaser;
