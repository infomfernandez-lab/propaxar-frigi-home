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
    'howItWorks.step2.description': 'Reviso el 100% del mercado (todas las agencias + propietarios directos). Te presento las 3-5 mejores opciones.',
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
    'faq.subheadline': 'Todo lo que necesitas saber antes de empezar',
    'faq.q1': '¿Cuánto cuesta el servicio?',
    'faq.a1': `El precio varía según tus necesidades específicas:

• Búsqueda de alquiler largo plazo: €400-600
• Alquiler vacacional (1-3 meses): €200-350
• Relocation completa (vivienda + trámites): €700-1,000

Después de nuestra consulta gratuita (15 min), te envío propuesta personalizada con precio exacto y qué incluye.

Pago en 2 fases:
• Retainer (25-30%) al firmar contrato
• Balance (70-75%) cuando seleccionas tu casa`,
    'faq.q2': '¿Cómo funciona el pago?',
    'faq.a2': `1. Consulta gratuita (sin pagar nada)
2. Si decides seguir: Firmas contrato digital (vía email)
3. Pagas retainer online (Stripe seguro, tarjetas internacionales)
4. Empiezo búsqueda inmediatamente
5. Cuando encuentras tu casa: Pagas balance
6. Todo online, rápido, seguro.

Aceptamos: Visa, Mastercard, Amex. Sin efectivo.`,
    'faq.q3': '¿En qué zonas de Frigiliana trabajas?',
    'faq.a3': `Toda Frigiliana y pueblos cercanos:

• Frigiliana (casco antiguo y zona baja)
• Nerja (si prefieres más servicios)
• Torrox (opción más económica)
• Cómpeta (rural, montaña)

Mi expertise principal es Frigiliana donde nací, pero conozco toda la Axarquía.`,
    'faq.q4': '¿Trabajas solo con alquileres o también ventas?',
    'faq.a4': `Principalmente alquileres:

• Largo plazo (6+ meses)
• Vacacional (1-6 meses)
• Temporal (relocations empresariales)

También puedo ayudar con compra/venta si me lo solicitas, pero mi especialidad es alquiler.`,
    'faq.q5': '¿Hablas inglés/alemán?',
    'faq.a5': `Inglés: Fluido (nivel C1)
Alemán: Básico conversacional
Español: Nativo

Si necesitas otro idioma, puedo coordinar con traductores profesionales (incluido en el servicio de relocation completa).`,
    'faq.q6': '¿Qué pasa si no encuentro nada que me guste?',
    'faq.a6': `Garantía simple: Si no encuentras casa que te encante en el plazo acordado (normalmente 7-10 días), te devuelvo tu retainer 100%.

Sin letra pequeña. Sin excusas.

En 4 años, nunca he tenido que usar esta garantía. Pero está ahí para tu tranquilidad.`,
    'faq.q7': '¿Necesito venir a Frigiliana antes de contratar?',
    'faq.a7': `NO necesariamente.

Proceso típico:
1. Consulta inicial por videollamada (15 min)
2. Te envío propuesta + contrato por email
3. Firmas y pagas online
4. Empiezo búsqueda
5. ENTONCES vienes para visitas coordinadas (1-2 días)

Muchos clientes hacen todo remoto hasta las visitas finales. Más eficiente.`,
    'faq.q8': '¿Eres agente inmobiliario? ¿Tienes licencia?',
    'faq.a8': `NO soy agencia inmobiliaria.

Soy CONSULTOR de vivienda.

Diferencia:
• Agencias: Gestionan propiedades, contratos con propietarios
• Yo: Asesoro a CLIENTES (no a propietarios), conecto con las agencias

Trabajo CON las agencias locales, no contra ellas. Cuando encuentro tu casa perfecta, te conecto con la agencia que la gestiona. Ellos hacen el contrato oficial.

Legal, transparente, colaborativo.`,
    'faq.q9': '¿Qué incluye exactamente tu servicio?',
    'faq.a9': `Depende del paquete, pero básico incluye:

✓ Consulta personalizada (entender tus necesidades)
✓ Búsqueda exhaustiva 100% mercado (todas agencias + directos)
✓ Pre-selección 3-5 mejores opciones (ahorro 20-30h de tu tiempo)
✓ Coordinación visitas en 1 día optimizado
✓ Acompañamiento a visitas (traducción + asesoría)
✓ Negociación de precio
✓ Revisión educativa de contrato
✓ Conexiones locales (abogado, utilidades, etc. si necesitas)

Paquete Relocation añade: Gestión NIE, empadronamiento, utilidades, tour pueblo, soporte primer mes.`,
    'faq.q10': '¿Puedo cancelar después de pagar el retainer?',
    'faq.a10': `Política de cancelación:

• Antes de empezar búsqueda: Reembolso 100%
• Durante búsqueda (primeros 3 días): Reembolso 50%
• Después de presentar opciones: No reembolsable (trabajo ya hecho)

PERO: Si no encuentras nada que te guste = reembolso 100% garantizado (ver FAQ 6).`,

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
    'howItWorks.step2.description': 'I review 100% of the market (all agencies + direct landlords). I present you the 3-5 best options.',
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
    'faq.subheadline': 'Everything you need to know before getting started',
    'faq.q1': 'How much does the service cost?',
    'faq.a1': `The price varies according to your specific needs:

• Long-term rental search: €400-600
• Vacation rental (1-3 months): €200-350
• Complete relocation (housing + paperwork): €700-1,000

After our free consultation (15 min), I send you a personalized proposal with exact price and what's included.

Payment in 2 phases:
• Retainer (25-30%) when signing contract
• Balance (70-75%) when you select your home`,
    'faq.q2': 'How does payment work?',
    'faq.a2': `1. Free consultation (no payment)
2. If you decide to proceed: Sign digital contract (via email)
3. Pay retainer online (secure Stripe, international cards)
4. I start searching immediately
5. When you find your home: Pay balance
6. Everything online, fast, secure.

We accept: Visa, Mastercard, Amex. No cash.`,
    'faq.q3': 'What areas of Frigiliana do you work in?',
    'faq.a3': `All of Frigiliana and nearby towns:

• Frigiliana (old town and lower area)
• Nerja (if you prefer more services)
• Torrox (more affordable option)
• Cómpeta (rural, mountains)

My main expertise is Frigiliana where I was born, but I know all of the Axarquía.`,
    'faq.q4': 'Do you only work with rentals or also sales?',
    'faq.a4': `Mainly rentals:

• Long-term (6+ months)
• Vacation (1-6 months)
• Temporary (corporate relocations)

I can also help with buying/selling if you request it, but my specialty is rentals.`,
    'faq.q5': 'Do you speak English/German?',
    'faq.a5': `English: Fluent (C1 level)
German: Basic conversational
Spanish: Native

If you need another language, I can coordinate with professional translators (included in the complete relocation service).`,
    'faq.q6': "What if I don't find anything I like?",
    'faq.a6': `Simple guarantee: If you don't find a home you love within the agreed timeframe (usually 7-10 days), I refund your retainer 100%.

No fine print. No excuses.

In 4 years, I've never had to use this guarantee. But it's there for your peace of mind.`,
    'faq.q7': 'Do I need to come to Frigiliana before hiring?',
    'faq.a7': `NOT necessarily.

Typical process:
1. Initial consultation via video call (15 min)
2. I send proposal + contract by email
3. You sign and pay online
4. I start searching
5. THEN you come for coordinated visits (1-2 days)

Many clients do everything remote until the final visits. More efficient.`,
    'faq.q8': 'Are you a real estate agent? Do you have a license?',
    'faq.a8': `I am NOT a real estate agency.

I am a housing CONSULTANT.

Difference:
• Agencies: Manage properties, contracts with landlords
• Me: I advise CLIENTS (not landlords), connect with agencies

I work WITH local agencies, not against them. When I find your perfect home, I connect you with the agency that manages it. They do the official contract.

Legal, transparent, collaborative.`,
    'faq.q9': 'What exactly does your service include?',
    'faq.a9': `Depends on the package, but basic includes:

✓ Personalized consultation (understand your needs)
✓ Exhaustive search 100% market (all agencies + direct)
✓ Pre-selection of 3-5 best options (saving 20-30h of your time)
✓ Coordinated visits in 1 optimized day
✓ Accompaniment to visits (translation + advice)
✓ Price negotiation
✓ Educational contract review
✓ Local connections (lawyer, utilities, etc. if you need)

Relocation package adds: NIE management, registration, utilities, town tour, first month support.`,
    'faq.q10': 'Can I cancel after paying the retainer?',
    'faq.a10': `Cancellation policy:

• Before starting search: 100% refund
• During search (first 3 days): 50% refund
• After presenting options: Non-refundable (work already done)

BUT: If you don't find anything you like = 100% guaranteed refund (see FAQ 6).`,

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
