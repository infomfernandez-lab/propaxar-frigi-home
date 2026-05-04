import { useLanguage } from "@/contexts/LanguageContext";

const QualificationCards = () => {
  const { language } = useLanguage();

  const columns = [
    {
      icon: '🔍',
      title: language === 'es' ? 'Busco en todo el mercado' : 'I search the whole market',
      text: language === 'es'
        ? 'Portales, agencias, contactos directos, fuera de mercado. Cada opción que existe.'
        : 'Portals, agencies, direct contacts, off-market. Every option that exists.',
    },
    {
      icon: '📊',
      title: language === 'es' ? 'Analizo y filtro por ti' : 'I analyse and filter for you',
      text: language === 'es'
        ? 'Precios reales, acceso, vecinos, historial. Cosas que no encuentras online.'
        : 'Real prices, access, neighbours, history. Things you cannot find online.',
    },
    {
      icon: '📋',
      title: language === 'es' ? 'Recibes un informe completo' : 'You get a full written report',
      text: language === 'es'
        ? 'Propiedades seleccionadas para tu perfil exacto. Mi recomendación profesional incluida.'
        : 'Properties selected for your exact profile. My professional recommendation included.',
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="max-w-[1200px] mx-auto px-5">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground font-heading max-w-[900px] mx-auto">
            {language === 'es'
              ? 'Un solo servicio. Un solo experto. Un solo objetivo: que encuentres lo que buscas.'
              : 'One service. One expert. One goal: find exactly what you need.'}
          </h2>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1000px] mx-auto">
          {columns.map((col, i) => (
            <div key={i} className="text-center md:text-left">
              <div className="text-4xl mb-4">{col.icon}</div>
              <h3 className="text-lg font-semibold text-foreground mb-2 font-heading">{col.title}</h3>
              <p className="text-sm text-foreground-muted leading-relaxed">{col.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QualificationCards;
