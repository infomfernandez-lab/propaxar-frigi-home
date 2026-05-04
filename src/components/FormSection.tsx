import { useLanguage } from "@/contexts/LanguageContext";

const FormSection = () => {
  const { language } = useLanguage();

  const timelineSteps = [
    {
      number: 1,
      title: language === 'es' ? 'Recibo tu mensaje' : 'I receive your message',
      description: language === 'es'
        ? 'Te confirmo que lo he recibido en menos de 2 horas.'
        : 'I confirm receipt within 2 hours.',
    },
    {
      number: 2,
      title: language === 'es' ? 'Hablamos 15 minutos' : 'We talk for 15 minutes',
      description: language === 'es'
        ? 'Una llamada rápida para entender exactamente qué necesitas.'
        : 'A quick call to understand exactly what you need.',
    },
    {
      number: 3,
      title: language === 'es' ? 'Busco y analizo' : 'I search and analyse',
      description: language === 'es'
        ? 'Reviso el mercado completo y preparo tu informe personalizado.'
        : 'I review the full market and prepare your personalised report.',
    },
    {
      number: 4,
      title: language === 'es' ? 'Recibes tu informe' : 'You receive your report',
      description: language === 'es'
        ? 'Propiedades seleccionadas, análisis honesto y mi recomendación clara.'
        : 'Selected properties, honest analysis and my clear recommendation.',
    },
  ];

  return (
    <section id="form-section" className="bg-background py-16 md:py-20">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          {/* Left Column - 60% (3/5) */}
          <div className="lg:col-span-3 self-start">
            {/* Headlines */}
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              {t('form.headline')}
            </h2>
            <p className="text-lg text-foreground-muted mb-8">
              {t('form.subheadline')}
            </p>

            {/* Native Forms Iframe */}
            <div className="form-container bg-background-alt md:bg-card border border-border rounded-xl shadow-lg p-10 pb-6 md:pb-10 box-border overflow-visible md:overflow-hidden min-h-0">
              <iframe 
                src="https://f.nativeforms.com/AevF1SW1jZmEWb5ZGOa1Db" 
                width="100%" 
                height="820" 
                frameBorder="0"
                scrolling="no"
                style={{ border: 'none', overflow: 'hidden', display: 'block' }}
                title="Contact Form"
              />
            </div>
            {/* Gradient fade on mobile to blend into next section */}
            <div className="block md:hidden h-16 -mt-4 bg-gradient-to-b from-background to-background-alt pointer-events-none" />
            {/* Micro-copy below form */}
            <p className="text-center text-sm text-foreground-muted mt-4">
              {t('form.microcopy')}
            </p>
          </div>

          {/* Right Column - 40% (2/5) */}
          <div className="lg:col-span-2 self-start">
            <div className="bg-background-alt rounded-xl p-8 pt-[30px]">
              {/* Timeline Title */}
              <h3 className="text-xl font-bold text-foreground mb-6">
                {t('form.timelineTitle')}
              </h3>

              {/* Timeline Steps */}
              <div className="space-y-6">
                {timelineSteps.map((step, index) => (
                  <div key={index} className="flex gap-4">
                    {/* Number Circle */}
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
                      {step.number}
                    </div>
                    {/* Content */}
                    <div>
                      <p className="font-semibold text-foreground">
                        {step.title}
                      </p>
                      <p className="text-[15px] text-foreground-muted">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FormSection;
