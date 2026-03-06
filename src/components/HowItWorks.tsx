import { useLanguage } from "@/contexts/LanguageContext";

const HowItWorks = () => {
  const { language } = useLanguage();

  const steps = [
    {
      number: 1,
      title: language === 'es' ? 'Consulta gratuita' : 'Free consultation',
      description: language === 'es'
        ? '15 minutos para entender qué buscas. Sin formularios — una conversación directa.'
        : '15 minutes to understand what you need. No forms — a direct conversation.',
    },
    {
      number: 2,
      title: language === 'es' ? 'Propuesta personalizada' : 'Personalized proposal',
      description: language === 'es'
        ? 'Te presento opciones que encajan con tu perfil real. Mismo día de la consulta.'
        : 'I present options that match your real profile. Same day as the consultation.',
    },
    {
      number: 3,
      title: language === 'es' ? 'Tú decides' : 'You decide',
      description: language === 'es'
        ? 'Coordino visitas, acompaño la negociación y gestiono el cierre. Sin sorpresas.'
        : 'I coordinate visits, accompany negotiation and manage closing. No surprises.',
    },
  ];

  return (
    <section id="how-it-works" className="bg-card py-16 md:py-20">
      <div className="max-w-[1200px] mx-auto px-5">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-foreground-muted mb-3">
            {language === 'es' ? 'Cómo funciona' : 'How it works'}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground font-heading">
            {language === 'es' ? 'De la primera llamada a tu nueva casa' : 'From first call to your new home'}
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
