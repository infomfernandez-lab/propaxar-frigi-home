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
    'form.headline': 'Empieza aquí (Gratis, 15 minutos)',
    'form.subheadline': 'Te llamo en las próximas 24 horas. Sin compromiso.',
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
    'faq.q1': '¿Por qué pagarte a ti si ya hay muchas inmobiliarias \'gratis\'?',
    'faq.a1': `En Frigiliana, lo 'gratis' te sale carísimo en tiempo perdido. Las agencias tradicionales representan al dueño; su objetivo es venderte lo que tienen en stock, te encaje o no.

Yo te represento a TI.

Mi trabajo es peinar el 100% del mercado: particulares, todas las agencias y propiedades off-market que nunca llegan a internet.

Conmigo no eliges entre lo que hay; consigues lo que realmente buscas.`,
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
    'faq.q6': '¿Qué gano pagando el Depósito de Activación (Retainer) de 200€?',
    'faq.a6': `Ganas un Escudo de Prioridad.

Este pago no es una cuota, es la activación de mi maquinaria de guerra para ti. Desbloquea mi red de contactos local y la creación de tu Tenant Profile VIP, el documento que garantiza tu solvencia y hace que los dueños te elijan a ti antes que a nadie.

Cobro por mi capacidad de ejecución y por mi tiempo de prospección exclusiva.

Si no estás listo para invertir en tu seguridad, no eres un cliente para Propaxar.`,
    'faq.q7': 'No puedo viajar a España ahora, ¿puedo alquilar a distancia?',
    'faq.a7': `Es mi especialidad.

El 80% de mis clientes cierran sus contratos desde su país de origen. Yo soy tus ojos y tus oídos.

Te enviaré videos reales, mediciones de velocidad de internet y un informe de 'honestidad radical' sobre la zona.

Cuando llegues, tu única ocupación será girar la llave y disfrutar.`,
    'faq.q8': '¿Me ayudas con los suministros y el desembarco (luz, agua, internet)?',
    'faq.a8': `Sí.

Con el paquete Lifestyle Complete, yo me encargo del 'trabajo sucio'. Cambio de titularidad de suministros, gestión de trámites y una inmersión local para que sepas dónde comprar, a quién llamar y cómo moverte.

Te ahorro meses de burocracia y errores de principiante.`,

    // Final CTA
    'finalCta.headline': '¿Listo para encontrar tu casa en Frigiliana?',
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
    'form.headline': 'Start here (Free, 15 minutes)',
    'form.subheadline': "I'll call you within 24 hours. No commitment.",
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
    'faq.q1': 'Why pay you when there are many \'free\' real estate agencies?',
    'faq.a1': `In Frigiliana, 'free' ends up costing you dearly in wasted time. Traditional agencies represent the landlord; their goal is to sell you what they have in stock, whether it fits you or not.

I represent YOU.

My job is to comb through 100% of the market: private listings, all agencies, and off-market properties that never make it to the internet.

With me, you don't choose from what's available; you get what you're really looking for.`,
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
    'faq.q6': 'What do I gain by paying the €200 Activation Deposit (Retainer)?',
    'faq.a6': `You gain a Priority Shield.

This payment isn't a fee, it's the activation of my war machine for you. It unlocks my local contact network and the creation of your VIP Tenant Profile, the document that guarantees your solvency and makes landlords choose you over anyone else.

I charge for my execution capacity and exclusive prospecting time.

If you're not ready to invest in your security, you're not a client for Propaxar.`,
    'faq.q7': 'I can\'t travel to Spain now, can I rent remotely?',
    'faq.a7': `It's my specialty.

80% of my clients close their contracts from their home country. I am your eyes and ears.

I'll send you real videos, internet speed measurements, and a 'radical honesty' report about the area.

When you arrive, your only task will be turning the key and enjoying.`,
    'faq.q8': 'Do you help with utilities and landing (electricity, water, internet)?',
    'faq.a8': `Yes.

With the Lifestyle Complete package, I handle the 'dirty work'. Transfer of utility ownership, paperwork management, and local immersion so you know where to shop, who to call, and how to get around.

I save you months of bureaucracy and beginner mistakes.`,

    // Final CTA
    'finalCta.headline': 'Ready to find your home in Frigiliana?',
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
