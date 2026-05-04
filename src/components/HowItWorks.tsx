import { useLanguage } from "@/contexts/LanguageContext";

const HowItWorks = () => {
  const { language } = useLanguage();

  const steps = [
    {
      number: 1,
      title: language === 'es' ? 'Me contactas' : 'You contact me',
      description: language === 'es'
        ? 'WhatsApp o email. Me cuentas qué buscas. Hablo inglés, español, entiendo holandés. Respondo en menos de 2 horas.'
        : 'WhatsApp or email. Tell me what you need. I speak English and Spanish. I respond in under 2 hours.',
    },
    {
      number: 2,
      title: language === 'es' ? 'Yo hago el trabajo' : 'I do the work',
      description: language === 'es'
        ? 'Busco, analizo y selecciono las mejores opciones del mercado completo — no solo lo que está publicado. Te entrego un informe escrito con mi análisis y recomendación.'
        : "I search, analyse and select the best options from the full market — not just what's published. I deliver a written report with my analysis and recommendation.",
    },
    {
      number: 3,
      title: language === 'es' ? 'Tú decides con información real' : 'You decide with real information',
      description: language === 'es'
        ? 'Sin presión. Sin comisiones ocultas. Si quieres visitar, te acompaño. Si quieres negociar, negocio por ti.'
        : 'No pressure. No hidden fees. If you want to visit, I come with you. If you want to negotiate, I negotiate for you.',
    },
  ];

  return (
    <section id="how-it-works" className="bg-card py-16 md:py-20">
      <div className="max-w-[1200px] mx-auto px-5">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground font-heading">
            {language === 'es' ? 'Así funciona. Sin letra pequeña.' : 'How it works. No small print.'}
          </h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
          {/* Connecting line - desktop only */}
          <div className="hidden md:block absolute top-[28px] left-[16.66%] right-[16.66%] h-[1px] bg-border" />

          {steps.map((step) => (
            <div key={step.number} className="flex flex-col items-center text-center relative">
              {/* Number Circle */}
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold text-white mb-5 relative z-10"
                style={{ backgroundColor: 'hsl(222, 28%, 16%)' }}
              >
                {step.number}
              </div>

              <h3 className="text-lg font-semibold text-foreground mb-2 font-heading">
                {step.title}
              </h3>

              <p className="text-sm text-foreground-muted leading-relaxed max-w-[300px]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
