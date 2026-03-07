import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const QualificationCards = () => {
  const { language } = useLanguage();

  const cards = [
    {
      icon: '🏡',
      borderColor: '#374151',
      linkColor: '#374151',
      title: language === 'es' ? 'Quiero alquilar en Frigiliana' : 'I want to rent in Frigiliana',
      text: language === 'es'
        ? 'Larga temporada o segunda residencia. Acceso a propiedades seleccionadas, incluyendo las que no están en portales.'
        : 'Long-term or second residence. Access to selected properties, including those not listed on portals.',
      link: language === 'es' ? 'Cómo funciona' : 'How it works',
      href: '/encuentra-tu-alquiler',
    },
    {
      icon: '🔑',
      borderColor: '#2563EB',
      linkColor: '#2563EB',
      title: language === 'es' ? 'Quiero comprar en Frigiliana' : 'I want to buy in Frigiliana',
      text: language === 'es'
        ? 'Tu hogar permanente o segunda residencia. Con criterio y datos reales antes de comprometer ninguna decisión.'
        : 'Your permanent home or second residence. With judgment and real data before committing to any decision.',
      link: language === 'es' ? 'Cómo funciona' : 'How it works',
      href: '/comprar',
    },
    {
      icon: '📊',
      borderColor: '#059669',
      linkColor: '#059669',
      title: language === 'es' ? 'Quiero invertir con criterio' : 'I want to invest wisely',
      text: language === 'es'
        ? 'Análisis por escenario, ROI real. Datos verificados, no proyecciones optimistas.'
        : 'Scenario analysis, real ROI. Verified data, not optimistic projections.',
      link: language === 'es' ? 'Ver análisis' : 'View analysis',
      href: '/invertir',
    },
    {
      icon: '🏢',
      borderColor: '#C9A84C',
      linkColor: '#C9A84C',
      title: language === 'es' ? 'Tengo una propiedad en Frigiliana' : 'I own a property in Frigiliana',
      text: language === 'es'
        ? 'Gestión integral de tu inmueble. Alquiler de larga temporada o vacacional. Ocupación máxima, sin gestiones para ti.'
        : 'Full property management. Long-term or vacation rental. Maximum occupancy, zero hassle for you.',
      link: language === 'es' ? 'Conocer el servicio' : 'Learn more',
      href: '/propietarios',
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="max-w-[1200px] mx-auto px-5">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-foreground-muted mb-3">
            {language === 'es' ? '¿Qué estás buscando?' : 'What are you looking for?'}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground font-heading">
            {language === 'es'
              ? 'Dime qué necesitas. Te encuentro la solución.'
              : 'Tell me what you need. I\'ll find the solution.'}
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {cards.map((card, i) => (
            <Link
              key={i}
              to={card.href}
              className="group bg-card border border-border rounded-xl p-7 transition-all hover:shadow-md hover:-translate-y-0.5"
              style={{ borderTopWidth: '3px', borderTopColor: card.borderColor }}
            >
              <div className="text-4xl mb-4">{card.icon}</div>
              <h3 className="text-lg font-semibold text-foreground mb-2 font-heading">{card.title}</h3>
              <p className="text-sm text-foreground-muted leading-relaxed mb-4">{card.text}</p>
              <span
                className="inline-flex items-center gap-1 text-sm font-semibold group-hover:gap-2 transition-all"
                style={{ color: card.linkColor }}
              >
                {card.link} <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QualificationCards;
