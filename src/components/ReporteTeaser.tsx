import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

const ReporteTeaser = () => {
  const { language } = useLanguage();

  const items = language === "es"
    ? [
        { icon: "🏠", text: "3 a 6 propiedades. Seleccionadas para tu perfil exacto." },
        { icon: "📍", text: "Zona, acceso, vecinos, gastos reales. Todo lo que no encuentras online." },
        { icon: "💬", text: "Mi recomendación profesional. Cuál es la tuya y por qué." },
        { icon: "🔒", text: "Acceso privado. Tu URL. Nadie más lo ve." },
      ]
    : [
        { icon: "🏠", text: "3 to 6 properties. Hand-picked for your exact profile." },
        { icon: "📍", text: "Area, access, neighbours, real costs. Everything you can't find online." },
        { icon: "💬", text: "My professional recommendation. Which one is yours and why." },
        { icon: "🔒", text: "Private access. Your URL. Nobody else sees it." },
      ];

  return (
    <section className="bg-card py-16 md:py-20">
      <div className="max-w-[900px] mx-auto px-5 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground font-heading mb-4">
          {language === "es" ? "Esto es lo que recibes." : "This is what you get."}
        </h2>
        <p className="text-base md:text-lg text-foreground-muted mb-8 max-w-[640px] mx-auto">
          {language === "es"
            ? "Un reporte real. Para un cliente real. Entregado en 48 horas. Así será el tuyo."
            : "A real report. Prepared for a real client. Delivered in 48 hours. This is what yours will look like."}
        </p>

        <Link
          to="/demo-reporte"
          className="inline-block text-base font-semibold text-primary hover:underline mb-10"
        >
          {language === "es" ? "Ver un ejemplo real →" : "See a real example →"}
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
