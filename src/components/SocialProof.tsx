import { useLanguage } from "@/contexts/LanguageContext";

const SocialProof = () => {
  const { language } = useLanguage();

  const testimonials = [
    {
      quote: language === "es"
        ? "Meses buscando desde el ordenador. Manuel encontró la correcta en 48 horas. Ojalá le hubiera llamado antes."
        : "Months of searching from my laptop. Manuel found the right one in 48 hours. I wish I'd called him first.",
      name: "Sally H.",
      meta: "UK → Frigiliana",
    },
    {
      quote: language === "es"
        ? "Tenía miedo de equivocarme desde Alemania. Me dijo exactamente qué evitar y exactamente qué coger. Eso es todo lo que necesitaba."
        : "I was terrified of making the wrong decision from Germany. He told me exactly what to avoid and exactly what to take. That's all I needed.",
      name: "Klaus & Maria",
      meta: "Germany → Frigiliana",
    },
    {
      quote: language === "es"
        ? "Dejamos de buscar en el momento en que encontramos a Manuel. Dos semanas después teníamos las llaves."
        : "We stopped searching the moment we found Manuel. Two weeks later we had the keys.",
      name: "Jan & Annika",
      meta: "Netherlands → Frigiliana",
    },
  ];

  return (
    <section className="bg-background py-16 md:py-20">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-card rounded-lg p-6 border border-border">
              <div className="text-4xl leading-none text-foreground-muted mb-2 font-heading">"</div>
              <p className="text-base text-foreground leading-relaxed mb-4">{t.quote}</p>
              <p className="text-sm font-semibold text-foreground">{t.name}</p>
              <p className="text-xs text-foreground-muted">{t.meta}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
