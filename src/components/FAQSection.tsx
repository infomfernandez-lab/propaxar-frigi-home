import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from "@/contexts/LanguageContext";

// Helper to render text with clickable phone numbers and emails
const renderWithLinks = (text: string) => {
  const phoneRegex = /(\+34\s?662\s?317\s?561)/g;
  const emailRegex = /(info@propaxar\.es)/g;
  
  // Split by phone first
  const parts = text.split(phoneRegex);
  
  return parts.map((part, index) => {
    if (part.match(phoneRegex)) {
      return (
        <a key={`phone-${index}`} href="tel:+34662317561" className="text-[#E8B44F] hover:underline font-medium">
          {part}
        </a>
      );
    }
    // Check for email within non-phone parts
    const emailParts = part.split(emailRegex);
    return emailParts.map((ep, ei) => {
      if (ep.match(emailRegex)) {
        return (
          <a key={`email-${index}-${ei}`} href="mailto:info@propaxar.es" className="text-[#E8B44F] hover:underline font-medium">
            {ep}
          </a>
        );
      }
      return ep;
    });
  });
};

const FAQSection = () => {
  const { language } = useLanguage();

  const sections = language === 'es' ? [
    {
      title: 'Sobre el servicio',
      faqs: [
        { question: '¿Qué hace exactamente Propaxar?', answer: 'Soy Manuel Fernández, especialista inmobiliario exclusivo en Frigiliana y La Axarquía. Gestiono alquileres de larga temporada, ayudo a compradores a encontrar su propiedad y asesoro a inversores con datos reales del mercado. Trabajas directamente conmigo en cada paso — no con un equipo de comerciales.' },
        { question: '¿Por qué Frigiliana específicamente?', answer: 'Porque la especialización es la ventaja. Conozco cada propiedad, cada propietario y cada rincón del mercado local desde hace 40 años. Si buscas en Frigiliana, necesitas a alguien que viva y trabaje aquí.' },
        { question: '¿Cuánto cuesta trabajar contigo?', answer: 'Depende de lo que necesites. La consulta inicial siempre es gratuita y sin compromiso. Los honorarios se acuerdan antes de empezar — sin sorpresas.' },
        { question: '¿En qué idiomas trabajas?', answer: 'Español e inglés. El 70%+ de mis clientes son internacionales — británicos, neerlandeses, alemanes, daneses, belgas. Todos los documentos pueden prepararse en ambos idiomas.' },
        { question: '¿Cómo es el proceso desde el primer contacto?', answer: 'Consulta gratuita de 15 minutos para entender qué buscas → propuesta personalizada el mismo día → coordinación de visitas → acompañamiento en negociación y cierre. Sin formularios, sin presión.' },
      ],
    },
    {
      title: 'Alquiler y compra',
      faqs: [
        { question: '¿Qué es el Reporte de Mercado personalizado?', answer: 'Un análisis completo del mercado de alquiler de Frigiliana adaptado a tu perfil: presupuesto, zona, habitaciones, fecha de entrada, mascotas. Incluye propiedades reales disponibles, análisis honesto de precios, guía logística campo vs pueblo y 6 meses de seguimiento activo.' },
        { question: '¿Cuánto tiempo tarda encontrar alquiler en Frigiliana?', answer: 'El mercado de larga temporada es limitado y la demanda supera la oferta en temporada alta. Con el Reporte tienes ventaja: acceso a propiedades antes de que se publiquen y una recomendación clara de cuál encaja contigo. El tiempo medio desde el reporte hasta contrato firmado es de 2-4 semanas.' },
        { question: '¿Trabajáis también con compradores internacionales?', answer: 'Es el perfil más habitual. Gestiono todo el proceso: búsqueda, visitas, negociación, NIE, apertura de cuenta bancaria española, conexión con abogado local si es necesario.' },
        { question: '¿Puedo visitar propiedades antes de decidir?', answer: 'Por supuesto. Coordino todas las visitas y te acompaño personalmente. Mi objetivo es que tomes la decisión con información completa, no con presión.' },
      ],
    },
    {
      title: 'Inversión y propietarios',
      faqs: [
        { question: '¿Es Frigiliana buena opción para invertir en alquiler vacacional?', answer: 'Los datos lo respaldan: 72% de ocupación media, ~€29.000 de ingresos anuales estimados, aeropuerto de Málaga con récord de 26,7 millones de pasajeros en 2025. Es uno de los mercados más sólidos de La Axarquía. Tengo los cálculos de ROI por escenario — pídemelos en la consulta gratuita.' },
        { question: 'Tengo una propiedad en Frigiliana. ¿Cómo funciona la gestión?', answer: 'Gestiono tu propiedad en alquiler de larga temporada o vacacional: captación de inquilinos, contratos, cobros, mantenimiento coordinado. Objetivo: ocupación máxima con cero gestiones para ti. Hablamos en una llamada sin compromiso.' },
        { question: '¿Colaboráis con otras agencias?', answer: 'Sí. Trabajo con agencias de la Costa del Sol y La Axarquía en modelo de colaboración. Si tienes un cliente que busca en Frigiliana, contacta directamente: info@propaxar.es o +34 662 317 561.' },
      ],
    },
  ] : [
    {
      title: 'About the service',
      faqs: [
        { question: 'What exactly does Propaxar do?', answer: "I'm Manuel Fernández, an exclusive real estate specialist in Frigiliana and La Axarquía. I manage long-term rentals, help buyers find their property, and advise investors with real market data. You deal directly with me at every step — not with a team of salespeople." },
        { question: 'Why Frigiliana specifically?', answer: "Because specialization is the advantage. I know every property, every owner, and every corner of the local market for the past 40 years. If you're looking in Frigiliana, you need someone who lives and works here." },
        { question: 'How much does it cost to work with you?', answer: 'It depends on what you need. The initial consultation is always free and no commitment. Fees are agreed before starting — no surprises.' },
        { question: 'What languages do you work in?', answer: 'Spanish and English. 70%+ of my clients are international — British, Dutch, German, Danish, Belgian. All documents can be prepared in both languages.' },
        { question: 'What does the process look like from first contact?', answer: 'Free 15-minute consultation to understand what you need → personalized proposal the same day → visit coordination → support through negotiation and closing. No forms, no pressure.' },
      ],
    },
    {
      title: 'Renting and buying',
      faqs: [
        { question: 'What is the personalized Market Report?', answer: "A complete analysis of Frigiliana's rental market tailored to your profile: budget, area, bedrooms, move-in date, pets. It includes real available properties, honest price analysis, countryside vs village logistics guide, and 6 months of active follow-up." },
        { question: 'How long does it take to find a rental in Frigiliana?', answer: "The long-term rental market is limited and demand exceeds supply in high season. With the Report you have an advantage: access to properties before they're listed and a clear recommendation on which one fits you. Average time from report to signed contract is 2-4 weeks." },
        { question: 'Do you also work with international buyers?', answer: "It's the most common profile. I manage the entire process: search, visits, negotiation, NIE, opening a Spanish bank account, connection with a local lawyer if needed." },
        { question: 'Can I visit properties before deciding?', answer: 'Of course. I coordinate all visits and accompany you personally. My goal is for you to make your decision with complete information, not with pressure.' },
      ],
    },
    {
      title: 'Investment and property owners',
      faqs: [
        { question: 'Is Frigiliana a good option for vacation rental investment?', answer: "The data backs it up: 72% average occupancy, ~€29,000 estimated annual income, Málaga airport with a record 26.7 million passengers in 2025. It's one of the strongest markets in La Axarquía. I have ROI calculations by scenario — ask me in the free consultation." },
        { question: 'I own a property in Frigiliana. How does management work?', answer: 'I manage your property for long-term or vacation rental: tenant acquisition, contracts, collections, coordinated maintenance. Goal: maximum occupancy with zero hassle for you. Let\'s talk on a call — no commitment.' },
        { question: 'Do you collaborate with other agencies?', answer: 'Yes. I work with agencies on the Costa del Sol and La Axarquía on a collaboration model. If you have a client looking in Frigiliana, contact directly: info@propaxar.es or +34 662 317 561.' },
      ],
    },
  ];

  return (
    <section id="faq-section" className="bg-background py-16 md:py-20">
      <div className="max-w-[900px] mx-auto px-5">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {language === 'es' ? 'Preguntas frecuentes' : 'Frequently asked questions'}
          </h2>
          <p className="text-lg text-foreground-muted">
            {language === 'es' ? 'Todo lo que necesitas saber antes de dar el primer paso.' : 'Everything you need to know before taking the first step.'}
          </p>
        </div>

        {/* Grouped FAQ Sections */}
        <div className="space-y-10">
          {sections.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <h3 className="text-lg md:text-xl font-bold text-foreground uppercase tracking-wide mb-4 border-b-2 border-accent pb-2">
                {section.title}
              </h3>

              <Accordion type="single" collapsible className="space-y-4">
                {section.faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`faq-${sectionIndex}-${index}`}
                    className="bg-card border border-border rounded-xl px-6 shadow-sm"
                  >
                    <AccordionTrigger className="text-left text-foreground font-semibold text-base md:text-lg hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-foreground-muted leading-relaxed whitespace-pre-line">
                      {renderWithLinks(faq.answer)}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
