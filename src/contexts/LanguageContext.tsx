// Language context for bilingual support (ES/EN)
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'es' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  es: {
    // Navigation
    'nav.howItWorks': 'Cómo funciona',
    'nav.services': 'Servicios',
    'nav.testimonials': 'Testimonios',
    'nav.faq': 'FAQ',
    'nav.contact': 'Contacto',
    'nav.start': 'Empezar',
    'nav.subtitle': 'Housing Consultant',

    // Hero
    'hero.line1': 'Deja de buscar.',
    'hero.line2': 'Empieza a encontrar.',
    'hero.line3': 'Tu Consultor Personal de Vivienda en Frigiliana.',
    'hero.subheadline': '✓ Acceso al 100% del mercado  •  ✓ Asesoría personal  •  ✓ Resultados rápidos',
    'hero.cta': 'Empezar ahora',
    'hero.microcopy': '✓ Consulta gratuita 15 min  •  Sin compromiso  •  Respuesta en 24h',
    'hero.stat1.number': '127',
    'hero.stat1.label': 'Familias reubicadas',
    'hero.stat2.number': '7 días',
    'hero.stat2.label': 'Tiempo promedio',
    'hero.stat3.number': '100%',
    'hero.stat3.label': 'Cobertura mercado',
    'hero.temporalContext': 'Desde 2020 ayudando a personas de todo el mundo a encontrar su hogar en Frigiliana',

    // How It Works
    'howItWorks.headline': 'Cómo funciona',
    'howItWorks.subheadline': 'De la primera llamada a tu nueva casa en menos de una semana',
    'howItWorks.step1.title': 'Consulta gratuita',
    'howItWorks.step1.description': '15 minutos para entender qué buscas. Te explico mi proceso.',
    'howItWorks.step2.title': 'Búsqueda exhaustiva',
    'howItWorks.step2.description': 'Reviso el 100% del mercado. Te presento las mejores opciones.',
    'howItWorks.step3.title': 'Tu nueva casa',
    'howItWorks.step3.description': 'Coordino visitas, te acompaño, negocio por ti. Firma y mudanza en 7 días.',
    'howItWorks.cta': 'Empezar ahora',

    // Form Section
    'form.headline': '¿Listo para empezar?',
    'form.subheadline': 'Completa el formulario (2 min) y te llamo para una consulta gratuita de 15 minutos.',
    'form.microcopy': '✓ Te contacto en 24h  •  Sin compromiso  •  Hablamos en inglés si necesitas',
    'form.placeholder': '[Formulario de contacto]',
    'form.placeholderNote': 'This is a placeholder. Replace with your Native Forms shortcode.',
    'form.timelineTitle': '¿Qué pasa después?',
    'form.step1.title': 'En 1 minuto',
    'form.step1.description': 'Recibes email de confirmación',
    'form.step2.title': 'En 24 horas',
    'form.step2.description': 'Te llamo para entender qué necesitas',
    'form.step3.title': 'Mismo día',
    'form.step3.description': 'Te envío propuesta personalizada + precio',
    'form.step4.title': 'Si decides seguir',
    'form.step4.description': 'Firmas contrato online + Pago retainer',
    'form.step5.title': 'En 7 días',
    'form.step5.description': 'Estás en tu nueva casa 🏡',
    'form.guaranteeTitle': '💯 Mi garantía',
    'form.guaranteeText': 'Si no encuentras casa que te encante en el plazo acordado, te devuelvo tu retainer completo.',
    'form.guaranteeNote': 'En 4 años, nunca he tenido que hacerlo.',

    // Testimonials
    'testimonials.headline': 'Qué dicen quienes ya encontraron su casa',

    // FAQ
    'faq.headline': 'Preguntas Frecuentes',
    'faq.subheadline': 'Velocidad, Control y Resultados',
    'faq.q1': '¿Qué incluye exactamente tu servicio?',
    'faq.a1': `Depende de tu caso, pero siempre incluye:

CORE (Todos los servicios):
✓ Consulta personalizada detallada
✓ Acceso 100% mercado (agencias + directos + off-market)
✓ Pre-selección de mejores opciones
✓ Dossier con análisis honesto de cada propiedad
✓ Auditoría técnica (problemas ocultos, zona real, vecinos)
✓ Coordinación de todas las visitas
✓ Acompañamiento presencial (traducción si necesario)
✓ Negociación de precio/condiciones
✓ Revisión de contrato de alquiler/compra
✓ Conexión con profesionales (abogado, gestor, si necesitas)

ADICIONALES (Según tu necesidad):
✓ Gestión NIE y empadronamiento
✓ Alta de suministros (luz, agua, internet, móvil)
✓ Tour de inmersión local
✓ Soporte post-mudanza (30 días)

Todo personalizado según lo que necesites.
La inversión varía según servicios incluidos.
Lo discutimos en la consulta inicial.`,
    'faq.q2': '¿De verdad eres más rápido que buscar yo mismo en portales?',
    'faq.a2': `Infinitamente más rápido.

Si buscas por tu cuenta, tendrás que contarle tu historia a diez agencias distintas, esperar días a que te contesten (si lo hacen) y lidiar con anuncios de casas que ya están alquiladas o que ni siquiera existen.

Conmigo, solo hablas una vez. Yo ya conozco el terreno, sé qué casas están libres de verdad y ejecuto la búsqueda en horas, no en semanas.

Mientras otros esperan un email, tú ya estás visitando la casa ideal.`,
    'faq.q3': '¿Es legal que me cobres a mí como inquilino?',
    'faq.a3': `Es 100% legal y transparente.

La ley prohíbe que la agencia del dueño te cobre por gestionar la casa del dueño. Yo no soy la agencia del dueño; soy tu Consultor de Búsqueda y representante exclusivo.

Tú no pagas una comisión de alquiler, pagas por un servicio profesional de localización, auditoría y blindaje legal.

Es la diferencia entre usar un servicio público o contratar a un experto privado para que proteja tus intereses.`,
    'faq.q4': 'Tengo mascotas, ¿es imposible encontrar algo en Frigiliana?',
    'faq.a4': `Es difícil, pero no imposible si sabes a quién llamar.

Las agencias suelen decir 'no' por sistema para no complicarse. Yo, al ser nativo del pueblo y conocer personalmente a los propietarios, puedo negociar cara a cara.

Sé qué dueños son flexibles y cómo presentar tu perfil para que tu mascota no sea un problema, sino un detalle más de un inquilino excelente.`,
    'faq.q5': '¿Cómo me proteges de estafas o engaños?',
    'faq.a5': `El mercado inmobiliario online está lleno de trampas: fotos retocadas, ubicaciones falsas o 'vicios ocultos' (humedades, ruidos insoportables, mala conexión).

Yo realizo una Auditoría Técnica real. Si una casa tiene un problema, te lo diré al instante.

Mi lealtad es contigo, no con la venta. Te prevengo de cualquier intento de engaño porque conozco cada calle y cada historial de las viviendas del pueblo.`,
    'faq.q6': 'No puedo viajar a España ahora, ¿puedo alquilar a distancia?',
    'faq.a6': `Es mi especialidad.

El 80% de mis clientes cierran sus contratos desde su país de origen. Yo soy tus ojos y tus oídos.

Te enviaré videos reales, mediciones de velocidad de internet y un informe de 'honestidad radical' sobre la zona.

Cuando llegues, tu única ocupación será girar la llave y disfrutar.`,
    'faq.q7': '¿Me ayudas con los suministros y el desembarco (luz, agua, internet)?',
    'faq.a7': `Sí.

Con el paquete Lifestyle Complete, yo me encargo del 'trabajo sucio'. Cambio de titularidad de suministros, gestión de trámites y una inmersión local para que sepas dónde comprar, a quién llamar y cómo moverte.

Te ahorro meses de burocracia y errores de principiante.`,
    'faq.q8': '¿Cuál es el siguiente paso?',
    'faq.a8': `Simple:

1. Completa el formulario arriba (2 minutos)
   O llámame/escríbeme directo: +34 662 317 561

2. Agendamos consulta inicial (15-30 min, gratis)
   Según tu disponibilidad.

3. En la consulta:
   • Entiendo tu situación
   • Evalúo si puedo ayudarte
   • Te explico cómo trabajaría en tu caso

4. Si encajamos:
   • Te envío propuesta personalizada
   • Incluye servicios, inversión, timeline
   • Decides si seguimos o no

Sin presión. Sin compromiso hasta que tú decidas.
La mayoría de mis clientes deciden seguir después de la consulta porque ven claramente el valor.

¿Hablamos?`,

    // Final CTA
    'finalCta.headline': 'Tu casa en Frigiliana te espera. Empieza ahora.',
    'finalCta.subheadline': 'La próxima semana podrías estar en tu nueva casa',
    'finalCta.button': 'Empezar búsqueda gratuita',
    'finalCta.microcopy': 'Consulta 15 min  •  Sin compromiso  •  Te llamo hoy',
  },
  en: {
    // Navigation
    'nav.howItWorks': 'How it works',
    'nav.services': 'Services',
    'nav.testimonials': 'Testimonials',
    'nav.faq': 'FAQ',
    'nav.contact': 'Contact',
    'nav.start': 'Start',
    'nav.subtitle': 'Housing Consultant',

    // Hero
    'hero.line1': 'Stop searching.',
    'hero.line2': 'Start finding.',
    'hero.line3': 'Your Personal Housing Consultant in Frigiliana.',
    'hero.subheadline': '✓ 100% market access  •  ✓ Personal guidance  •  ✓ Fast results',
    'hero.cta': 'Start now',
    'hero.microcopy': '✓ Free 15-min consultation  •  No commitment  •  Response in 24h',
    'hero.stat1.number': '127',
    'hero.stat1.label': 'Families relocated',
    'hero.stat2.number': '7 days',
    'hero.stat2.label': 'Average time',
    'hero.stat3.number': '100%',
    'hero.stat3.label': 'Market coverage',
    'hero.temporalContext': 'Since 2020 helping people from all over the world find their home in Frigiliana',

    // How It Works
    'howItWorks.headline': 'How it works',
    'howItWorks.subheadline': 'From first call to your new home in less than a week',
    'howItWorks.step1.title': 'Free consultation',
    'howItWorks.step1.description': '15 minutes to understand what you need. I explain my process.',
    'howItWorks.step2.title': 'Exhaustive search',
    'howItWorks.step2.description': 'I review 100% of the market. I present you the best options.',
    'howItWorks.step3.title': 'Your new home',
    'howItWorks.step3.description': 'I coordinate visits, accompany you, negotiate for you. Signing and moving in 7 days.',
    'howItWorks.cta': 'Start now',

    // Form Section
    'form.headline': 'Ready to Start?',
    'form.subheadline': "Complete the form (2 min) and I'll call you for a free 15-minute consultation.",
    'form.microcopy': '✓ Response within 24h  •  No commitment  •  English spoken',
    'form.placeholder': '[Contact form]',
    'form.placeholderNote': 'This is a placeholder. Replace with your Native Forms shortcode.',
    'form.timelineTitle': 'What happens next?',
    'form.step1.title': 'In 1 minute',
    'form.step1.description': 'You receive confirmation email',
    'form.step2.title': 'Within 24 hours',
    'form.step2.description': 'I call to understand your needs',
    'form.step3.title': 'Same day',
    'form.step3.description': 'I send personalized proposal + pricing',
    'form.step4.title': 'If you proceed',
    'form.step4.description': 'Sign contract online + Pay retainer',
    'form.step5.title': 'In 7 days',
    'form.step5.description': "You're in your new home 🏡",
    'form.guaranteeTitle': '💯 My guarantee',
    'form.guaranteeText': "If you don't find a home you love within the agreed timeframe, I refund your retainer completely.",
    'form.guaranteeNote': "In 4 years, I've never had to do it.",

    // Testimonials
    'testimonials.headline': 'What people who already found their home say',

    // FAQ
    'faq.headline': 'Frequently Asked Questions',
    'faq.subheadline': 'Speed, Control and Results',
    'faq.q1': "What's included in your service?",
    'faq.a1': `Depends on your case, but always includes:

CORE (All services):
✓ Detailed personalized consultation
✓ 100% market access (agencies + direct owners + off-market)
✓ Pre-selection of best options
✓ Dossier with honest analysis of each property
✓ Technical audit (hidden issues, real neighborhood, neighbors)
✓ Coordination of all viewings
✓ In-person accompaniment (translation if needed)
✓ Price/terms negotiation
✓ Rental/purchase contract review
✓ Connection to professionals (lawyer, gestor, if needed)

ADDITIONAL (Based on your needs):
✓ NIE and registration management
✓ Utilities setup (electricity, water, internet, mobile)
✓ Local immersion tour
✓ Post-move support (30 days)

Everything customized to what you need.
Investment varies based on services included.
We discuss it in the initial consultation.`,
    'faq.q2': 'Are you really faster than searching myself on portals?',
    'faq.a2': `Infinitely faster.

If you search on your own, you'll have to tell your story to ten different agencies, wait days for them to respond (if they do), and deal with ads for houses that are already rented or don't even exist.

With me, you only speak once. I already know the terrain, I know which houses are truly available, and I execute the search in hours, not weeks.

While others wait for an email, you're already visiting your ideal home.`,
    'faq.q3': 'Is it legal for you to charge me as a tenant?',
    'faq.a3': `It's 100% legal and transparent.

The law prohibits the landlord's agency from charging you to manage the landlord's property. I'm not the landlord's agency; I'm your Search Consultant and exclusive representative.

You're not paying a rental commission, you're paying for professional localization, audit, and legal protection services.

It's the difference between using a public service or hiring a private expert to protect your interests.`,
    'faq.q4': 'I have pets, is it impossible to find something in Frigiliana?',
    'faq.a4': `It's difficult, but not impossible if you know who to call.

Agencies usually say 'no' systematically to avoid complications. Being a local and personally knowing the landlords, I can negotiate face to face.

I know which owners are flexible and how to present your profile so your pet isn't a problem, but just another detail of an excellent tenant.`,
    'faq.q5': 'How do you protect me from scams or deception?',
    'faq.a5': `The online real estate market is full of traps: retouched photos, fake locations, or 'hidden defects' (humidity, unbearable noise, bad connection).

I perform a real Technical Audit. If a house has a problem, I'll tell you instantly.

My loyalty is with you, not with the sale. I prevent any attempt at deception because I know every street and every property history in town.`,
    'faq.q6': "I can't travel to Spain now, can I rent remotely?",
    'faq.a6': `It's my specialty.

80% of my clients close their contracts from their home country. I am your eyes and ears.

I'll send you real videos, internet speed measurements, and a 'radical honesty' report about the area.

When you arrive, your only task will be turning the key and enjoying.`,
    'faq.q7': 'Do you help with utilities and landing (electricity, water, internet)?',
    'faq.a7': `Yes.

With the Lifestyle Complete package, I handle the 'dirty work'. Transfer of utility ownership, paperwork management, and local immersion so you know where to shop, who to call, and how to get around.

I save you months of bureaucracy and beginner mistakes.`,
    'faq.q8': "What's the next step?",
    'faq.a8': `Simple:

1. Complete the form above (2 minutes)
   Or call/text me directly: +34 662 317 561

2. We schedule initial consultation (15-30 min, free)
   According to your availability.

3. In the consultation:
   • I understand your situation
   • I evaluate if I can help you
   • I explain how I would work on your case

4. If we're a fit:
   • I send you personalized proposal
   • Includes services, investment, timeline
   • You decide if we proceed or not

No pressure. No commitment until you decide.
Most of my clients decide to proceed after the consultation because they clearly see the value.

Shall we talk?`,

    // Final CTA
    'finalCta.headline': 'Your home in Frigiliana is waiting. Start now.',
    'finalCta.subheadline': 'Next week you could be in your new home',
    'finalCta.button': 'Start free search',
    'finalCta.microcopy': "15-min consultation  •  No commitment  •  I'll call you today",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('propaxar-language');
      return (stored === 'en' || stored === 'es') ? stored : 'es';
    }
    return 'es';
  });

  useEffect(() => {
    localStorage.setItem('propaxar-language', language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['es']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
