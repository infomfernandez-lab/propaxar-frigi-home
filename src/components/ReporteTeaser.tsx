import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

const ReporteTeaser = () => {
  const { language } = useLanguage();

  const items = language === "es"
    ? [
        { icon: "🏠", text: "3–6 propiedades seleccionadas para tu perfil exacto" },
        { icon: "📍", text: "Análisis de zona, acceso y vecindario" },
        { icon: "💬", text: "Mi recomendación profesional incluida" },
        { icon: "🔒", text: "Acceso privado por URL única" },
      ]
    : [
        { icon: "🏠", text: "3–6 properties selected for your exact profile" },
        { icon: "📍", text: "Zone, access and neighbourhood analysis" },
        { icon: "💬", text: "My professional recommendation included" },
        { icon: "🔒", text: "Private access via unique URL" },
      ];

  return (
    <section className="bg-card py-16 md:py-20">
      <div className="max-w-[900px] mx-auto px-5 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground font-heading mb-4">
          {language === "es" ? "Esto es lo que recibes." : "This is what you get."}
        </h2>
        <p className="text-base md:text-lg text-foreground-muted mb-8 max-w-[640px] mx-auto">
          {language === "es"
            ? "Un reporte privado, preparado para ti en 24–48h. Este es un ejemplo real (nombre cambiado)."
            : "A private report, prepared for you in 24–48h. This is a real example (name changed)."}
        </p>

        <Link
          to="/demo-reporte"
          className="inline-block text-base font-semibold text-primary hover:underline mb-10"
        >
          {language === "es" ? "Ver ejemplo real →" : "See real example →"}
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
