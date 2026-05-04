import { useLanguage } from "@/contexts/LanguageContext";

const HowItWorks = () => {
  const { language } = useLanguage();

  const steps = language === "es"
    ? [
        { n: 1, title: "Me dices qué buscas", desc: "Un mensaje. WhatsApp o email. Te respondo el mismo día." },
        { n: 2, title: "Yo hago el trabajo", desc: "Busco en todo el mercado. Visito. Analizo. Filtro. Tú no haces nada." },
        { n: 3, title: "Recibes la respuesta correcta", desc: "Un informe privado con las mejores opciones y una recomendación clara. Tú decides." },
      ]
    : [
        { n: 1, title: "You tell me what you need", desc: "One message. WhatsApp or email. I respond the same day." },
        { n: 2, title: "I do the work", desc: "I search the whole market. I visit. I analyse. I filter. You don't lift a finger." },
        { n: 3, title: "You get the right answer", desc: "A private report with the best options and one clear recommendation. Then you decide." },
      ];

  return (
    <section id="how-it-works" className="bg-card py-16 md:py-20">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground font-heading mb-2">
            {language === "es" ? "Así funciona." : "How it works."}
          </h2>
          <p className="text-base md:text-lg text-foreground-muted">
            {language === "es" ? "Sin letra pequeña. Sin sorpresas. Sin perder el tiempo." : "No small print. No surprises. No wasted time."}
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
