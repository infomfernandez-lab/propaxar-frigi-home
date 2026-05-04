import { useLanguage } from "@/contexts/LanguageContext";

const HowItWorks = () => {
  const { language } = useLanguage();

  const steps = language === "es"
    ? [
        { n: 1, title: "Me escribes", desc: "WhatsApp o email. Me cuentas qué buscas. Te respondo en menos de 2 horas." },
        { n: 2, title: "Yo hago el trabajo", desc: "Busco en todo el mercado — portales, agencias, contactos directos, propiedades que no están publicadas. Analizo y selecciono lo que encaja con tu perfil exacto." },
        { n: 3, title: "Recibes tu informe y decides", desc: "Un documento privado con las mejores opciones, análisis honesto y mi recomendación. Sin presión. Tú decides." },
      ]
    : [
        { n: 1, title: "You write to me", desc: "WhatsApp or email. Tell me what you need. I respond in under 2 hours." },
        { n: 2, title: "I do the work", desc: "I search the whole market — portals, agencies, direct contacts, unlisted properties. I analyse and select what fits your exact profile." },
        { n: 3, title: "You receive your report and decide", desc: "A private document with the best options, honest analysis and my recommendation. No pressure. You decide." },
      ];

  return (
    <section id="how-it-works" className="bg-card py-16 md:py-20">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground font-heading mb-2">
            {language === "es" ? "Así funciona." : "How it works."}
          </h2>
          <p className="text-base md:text-lg text-foreground-muted">
            {language === "es" ? "Sin letra pequeña. Sin sorpresas." : "No small print. No surprises."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step) => (
            <div key={step.n} className="flex flex-col items-center text-center">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold text-white mb-5"
                style={{ backgroundColor: "hsl(222, 28%, 16%)" }}
              >
                {step.n}
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2 font-heading">{step.title}</h3>
              <p className="text-sm text-foreground-muted leading-relaxed max-w-[320px]">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
