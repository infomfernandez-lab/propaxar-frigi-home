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
        { question: '¿Qué hace exactamente Propaxar?', answer: 'Soy Manuel Fernández, especialista inmobiliario exclusivo en Frigiliana y La Axarquía. Gestiono alquileres de larga temporada, ayudo a compradores a encontrar su propiedad y asesoro a inversores con datos reales del mercado. Trabajo como autónomo — tratas directamente conmigo en cada paso, no con un equipo de comerciales.' },
        { question: '¿Por qué Frigiliana específicamente y no toda la Costa del Sol?', answer: 'Porque la especialización es la ventaja. Conozco cada propiedad, cada propietario y cada rincón del mercado local desde hace 40 años. Un agente generalista que cubre toda la Costa del Sol no puede ofrecerte eso. Si buscas en Frigiliana, necesitas a alguien que viva y trabaje aquí.' },
        { question: '¿Cuánto cuesta trabajar contigo?', answer: 'Depende del servicio. Para inquilinos: el Reporte de Mercado personalizado cuesta €180 (reembolsable si alquilas una propiedad Propaxar Direct). Para compradores e inversores: la consulta inicial es gratuita, sin compromiso. Los honorarios se acuerdan antes de empezar — sin sorpresas.' },
        { question: '¿En qué idiomas trabajas?', answer: 'Español, inglés y algo de neerlandés. El 70%+ de mis clientes son internacionales — británicos, neerlandeses, alemanes, daneses, belgas. Todos los contratos y documentos pueden prepararse en español e inglés.' },
        { question: '¿Cómo es el proceso desde el primer contacto?', answer: 'Consulta gratuita de 15 minutos para entender qué buscas → propuesta personalizada el mismo día → coordinación de visitas → acompañamiento en negociación y cierre. Sin formularios interminables, sin presión.' },
      ],
    },
    {
      title: 'Alquiler y compra',
      faqs: [
        { question: '¿Tenéis propiedades que no están en Idealista o Fotocasa?', answer: 'Sí. Una parte importante del inventario son propiedades Propaxar Direct — propietarios que gestionamos directamente y que no publican en portales públicos. Para acceder a ellas necesitas el Reporte de Mercado personalizado.' },
        { question: '¿Qué es el Reporte de Mercado personalizado?', answer: 'Un análisis completo del mercado de alquiler de Frigiliana adaptado a tu perfil: presupuesto, zona preferida, número de habitaciones, fecha de entrada, mascotas, etc. Incluye las propiedades reales disponibles (incluyendo las no publicadas), análisis honesto de precios, guía logística campo vs pueblo, y 6 meses de seguimiento activo. Cuesta €180. Si acabas alquilando una propiedad Propaxar Direct, te los reembolsamos íntegros.' },
        { question: '¿Cuánto tiempo tarda encontrar alquiler en Frigiliana?', answer: 'El mercado de larga temporada en Frigiliana es limitado — hay aproximadamente 3.041 viviendas en el municipio y la demanda supera la oferta en temporada alta. Con el Reporte tienes ventaja: acceso a propiedades antes de que se publiquen y una recomendación clara de cuál encaja contigo. El tiempo medio desde el reporte hasta contrato firmado es de 2-4 semanas.' },
        { question: '¿Trabajáis también con compradores internacionales?', answer: 'Es el perfil más habitual. Más del 30% de compradores en la provincia de Málaga son extranjeros. Gestiono todo el proceso: búsqueda, visitas, negociación, NIE, apertura de cuenta bancaria española, conexión con abogado local si es necesario.' },
      ],
    },
    {
      title: 'Inversión y propietarios',
      faqs: [
        { question: '¿Es Frigiliana buena opción para invertir en VUT (alquiler vacacional)?', answer: 'Los datos lo respaldan: 72% de ocupación media, ~€29.000 de ingresos anuales estimados, aeropuerto de Málaga con récord de 26,7 millones de pasajeros en 2025 y una moratoria de nuevas licencias VUT en Málaga capital que desvía demanda hacia municipios como Frigiliana. Es uno de los mercados más sólidos de La Axarquía. Tengo los cálculos de ROI por escenario disponibles — pídemelos en la consulta gratuita.' },
        { question: 'Tengo una propiedad en Frigiliana. ¿Cómo funciona la gestión?', answer: 'Gestiono tu propiedad en alquiler de larga temporada o vacacional: captación de inquilinos/huéspedes, contratos, cobros, mantenimiento coordinado. El objetivo es ocupación máxima con cero gestiones para ti. Hablamos de tu caso concreto en una llamada — sin compromiso.' },
        { question: '¿Colaboráis con otras agencias?', answer: 'Sí. Trabajo con agencias de la Costa del Sol y La Axarquía en modelo de colaboración 50/50. Si tienes un cliente que busca en Frigiliana, contacta directamente: info@propaxar.es o +34 662 317 561.' },
      ],
    },
  ] : [
    {
      title: 'About the service',
      faqs: [
        { question: 'What exactly does Propaxar do?', answer: "I'm Manuel Fernández, an exclusive real estate specialist in Frigiliana and La Axarquía. I manage long-term rentals, help buyers find their property, and advise investors with real market data. I work independently — you deal directly with me at every step, not with a team of salespeople." },
        { question: 'Why Frigiliana specifically and not the whole Costa del Sol?', answer: "Because specialization is the advantage. I know every property, every owner, and every corner of the local market for the past 40 years. A generalist agent covering the entire Costa del Sol can't offer you that. If you're looking in Frigiliana, you need someone who lives and works here." },
        { question: 'How much does it cost to work with you?', answer: 'It depends on the service. For tenants: the personalized Market Report costs €180 (refundable if you rent a Propaxar Direct property). For buyers and investors: the initial consultation is free, no commitment. Fees are agreed before starting — no surprises.' },
        { question: 'What languages do you work in?', answer: 'Spanish, English, and some Dutch. 70%+ of my clients are international — British, Dutch, German, Danish, Belgian. All contracts and documents can be prepared in Spanish and English.' },
        { question: 'What does the process look like from first contact?', answer: 'Free 15-minute consultation to understand what you need → personalized proposal the same day → visit coordination → support through negotiation and closing. No endless forms, no pressure.' },
      ],
    },
    {
      title: 'Renting and buying',
      faqs: [
        { question: 'Do you have properties not listed on Idealista or Fotocasa?', answer: "Yes. A significant part of our inventory are Propaxar Direct properties — owners we manage directly who don't list on public portals. To access them you need the personalized Market Report." },
        { question: 'What is the personalized Market Report?', answer: "A complete analysis of Frigiliana's rental market tailored to your profile: budget, preferred area, number of bedrooms, move-in date, pets, etc. It includes real available properties (including unlisted ones), honest price analysis, countryside vs village logistics guide, and 6 months of active follow-up. It costs €180. If you end up renting a Propaxar Direct property, we refund it in full." },
        { question: 'How long does it take to find a rental in Frigiliana?', answer: "The long-term rental market in Frigiliana is limited — there are approximately 3,041 homes in the municipality and demand exceeds supply in high season. With the Report you have an advantage: access to properties before they're listed and a clear recommendation on which one fits you. Average time from report to signed contract is 2-4 weeks." },
        { question: 'Do you also work with international buyers?', answer: "It's the most common profile. Over 30% of buyers in Málaga province are foreigners. I manage the entire process: search, visits, negotiation, NIE, opening a Spanish bank account, connection with a local lawyer if needed." },
      ],
    },
    {
      title: 'Investment and property owners',
      faqs: [
        { question: 'Is Frigiliana a good option for VUT (vacation rental) investment?', answer: "The data backs it up: 72% average occupancy, ~€29,000 estimated annual income, Málaga airport with a record 26.7 million passengers in 2025, and a moratorium on new VUT licenses in Málaga city that diverts demand to municipalities like Frigiliana. It's one of the strongest markets in La Axarquía. I have ROI calculations by scenario available — ask me in the free consultation." },
        { question: 'I own a property in Frigiliana. How does management work?', answer: 'I manage your property for long-term or vacation rental: tenant/guest acquisition, contracts, collections, coordinated maintenance. The goal is maximum occupancy with zero hassle for you. Let\'s discuss your specific case on a call — no commitment.' },
        { question: 'Do you collaborate with other agencies?', answer: 'Yes. I work with agencies on the Costa del Sol and La Axarquía on a 50/50 collaboration model. If you have a client looking in Frigiliana, contact directly: info@propaxar.es or +34 662 317 561.' },
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
