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
    'nav.rent': 'Alquilar',
    'nav.buy': 'Comprar',
    'nav.invest': 'Invertir',

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
    'hero.temporalContextPrefix': 'Con más de 10 años de experiencia ayudando a personas de todo el mundo a encontrar su hogar en ',

    // How It Works
    'howItWorks.headline': 'Cómo funciona',
    'howItWorks.subheadline': 'De la primera llamada a tu nueva casa en menos de una semana',
    'howItWorks.step1.title': 'Consulta gratuita',
    'howItWorks.step1.description': '15 minutos para entender qué buscas. Te explico mi proceso.',
    'howItWorks.step2.title': 'Búsqueda exhaustiva',
    'howItWorks.step2.description': 'Reviso el 100% del mercado. Te presento las mejores opciones.',
    'howItWorks.step3.title': 'Tu nueva casa',
    'howItWorks.step3.description': 'Coordino visitas, te acompaño, te asesoro. Del primer contacto a las llaves en tiempo récord.',
    'howItWorks.cta': 'Empezar ahora',

    // Form Section
    'form.headline': '¿Listo para empezar?',
    'form.subheadline': 'Completa el formulario (2 min) y te llamo para una consulta gratuita de 15 minutos.',
    'form.microcopy': '✓ Te contacto en 24h  •  Sin compromiso  •  Hablamos en inglés si necesitas',
    'form.placeholder': '[Formulario de contacto]',
    'form.placeholderNote': 'This is a placeholder. Replace with your Native Forms shortcode.',
    'form.timelineTitle': '¿Qué pasa después?',
    'form.step1.title': 'Ahora',
    'form.step1.description': 'Recibes email de confirmación',
    'form.step2.title': 'En 24h',
    'form.step2.description': 'Hablamos 15-30 min',
    'form.step3.title': 'Mismo día',
    'form.step3.description': 'Te envío mi propuesta por email',
    'form.step4.title': 'Tú decides',
    'form.step4.description': 'Si te convence la propuesta, empezamos',
    'form.guaranteeTitle': '💯 Mi garantía',
    'form.guaranteeText': 'Si no encuentras casa que te encante en el plazo acordado, te devuelvo tu retainer completo.',
    'form.guaranteeNote': 'En 4 años, nunca he tenido que hacerlo.',

    // Testimonials
    'testimonials.headline': 'Qué dicen quienes ya encontraron su casa',

    // FAQ
    'faq.headline': 'Preguntas Frecuentes',
    'faq.subheadline': 'Velocidad, Control y Resultados',
    'faq.section1.title': 'Lo que realmente importa',
    'faq.section2.title': 'Cómo funciona esto',
    'faq.section3.title': 'Confianza y decisión',

    'faq.q1': '¿Por qué necesito ayuda para encontrar casa?',
    'faq.a1': `No la necesitas. Puedes hacerlo solo. Pero la pregunta real es: ¿tienes tiempo para revisar 200 anuncios, viajar 3 veces, ver 15 casas equivocadas, y descubrir después que la calle tiene problemas de agua?

Yo llevo 10 años viviendo esto cada día. Conozco qué funciona y qué no. Te ahorro el camino largo. Tú decides si prefieres el atajo o el camino completo.`,
    'faq.q2': '¿Qué gano exactamente contratándote?',
    'faq.a2': `Tres cosas concretas:

- Tiempo: De 3 meses buscando a 1 semana con resultados
- Dinero: Te ahorras viajes innecesarios y evitas casas problema
- Tranquilidad: Alguien que conoce cada calle te dice "sí, esto funciona" o "no, esto no"

No se trata de encontrar UNA casa. Se trata de encontrar LA casa.`,
    'faq.q3': '¿La consulta es gratis? ¿Hay trampa?',
    'faq.a3': `Es gratis. Sin trampa.

Hablamos 15 minutos. Entiendo qué buscas. Te digo si puedo ayudarte. Si tiene sentido trabajar juntos, te explico cómo. Si no, te digo la verdad y no perdemos tiempo.

Prefiero 10 clientes buenos que 50 clientes equivocados.`,
    'faq.q4': '¿Me vas a vender algo que no necesito?',
    'faq.a4': `No puedo.

Mi negocio es recomendaciones. Si te vendo basura, me dejas mala reseña en Google y pierdo 10 clientes futuros.

Prefiero decirte "esto no es lo que buscas" que venderte algo equivocado. A largo plazo, la honestidad me da más dinero que el cortoplacismo.`,
    'faq.q5': '¿Cuánto cuesta trabajar contigo?',
    'faq.a5': `Depende de cómo trabajemos juntos. Hay diferentes formas de colaborar según tu situación.

En la consulta inicial te explico las opciones con precios claros. Tú decides si tiene sentido. Cero sorpresas, todo transparente ANTES de empezar.`,

    'faq.q6': '¿Qué pasa después de rellenar el formulario?',
    'faq.a6': `Simple:

Hoy: Rellenas formulario (2 minutos)
En 5 minutos: Email confirmación con detalles
En 24 horas: Te llamo (o WhatsApp, tú eliges)
15 minutos después: Sabes exactamente qué sigue

No hay misterio. No hay esperas eternas. Todo directo.`,
    'faq.q7': '¿Necesito viajar a España ya mismo?',
    'faq.a7': `No.

Primero hablamos, entiendo qué buscas, y cuando tengamos opciones que realmente encajan, ENTONCES vienes.

La mayoría de mis clientes hacen 1 solo viaje y firman. Nada de venir "a explorar" sin plan. Eso es perder tiempo y dinero.`,
    'faq.q8': '¿Puedo seguir buscando por mi cuenta mientras tanto?',
    'faq.a8': `Claro.

No hay exclusividad. Si encuentras algo bueno por tu cuenta, perfecto. Si yo encuentro algo mejor, genial.

El objetivo es que consigas tu casa. No importa cómo.`,
    'faq.q9': '¿Necesito hablar español?',
    'faq.a9': `No.

Hablo inglés fluido. Toda la comunicación puede ser en inglés: llamadas, emails, contratos, visitas. También traduzco documentos si necesitas.

Pero vivir aquí sin español básico es complicado. Te recomiendo aprender lo esencial si vienes a largo plazo.`,

    'faq.q10': '¿Quién eres exactamente?',
    'faq.a10': `Manuel Fernández. Agente inmobiliario. 10 años de experiencia en Frigiliana, Nerja y Torrox. Vivo aquí.

No soy una agencia con 20 agentes que rotan cada mes. Soy yo quien te busca, quien te llama, quien te acompaña. Siempre la misma persona del principio al final.`,
    'faq.q11': '¿Cómo sé que puedo confiar en ti?',
    'faq.a11': `No lo sabes hasta que hablamos.

Lee los testimonios arriba si quieres. Búscame en Google si quieres. Pero la realidad es: hablas conmigo 15 minutos y decides si te genera confianza.

La consulta es gratis precisamente para eso. Sin riesgo.`,
    'faq.q12': '¿Qué necesito preparar antes de llamar?',
    'faq.a12': `Solo 4 cosas:

- Cuándo quieres mudarte (mes aproximado)
- Cuánto quieres gastar al mes (rango está bien)
- Dónde (Frigiliana/Nerja/Torrox/Cómpeta)
- 3 cosas imprescindibles de tu casa ideal

Eso es todo. El resto lo hablamos en la llamada. No necesitas preparar presentación PowerPoint de tu vida.`,

    // Final CTA
    'finalCta.headlinePrefix': 'Tu casa en ',
    'finalCta.headlineSuffix': ' te espera. Empieza ahora.',
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
    'hero.temporalContextPrefix': 'With over 10 years of experience helping people from all over the world find their home in ',

    // How It Works
    'howItWorks.headline': 'How it works',
    'howItWorks.subheadline': 'From first call to your new home in less than a week',
    'howItWorks.step1.title': 'Free consultation',
    'howItWorks.step1.description': '15 minutes to understand what you need. I explain my process.',
    'howItWorks.step2.title': 'Exhaustive search',
    'howItWorks.step2.description': 'I review 100% of the market. I present you the best options.',
    'howItWorks.step3.title': 'Your new home',
    'howItWorks.step3.description': 'I coordinate visits, accompany you, advise you. From first contact to keys in record time.',
    'howItWorks.cta': 'Start now',

    // Form Section
    'form.headline': 'Ready to Start?',
    'form.subheadline': "Complete the form (2 min) and I'll call you for a free 15-minute consultation.",
    'form.microcopy': '✓ Response within 24h  •  No commitment  •  English spoken',
    'form.placeholder': '[Contact form]',
    'form.placeholderNote': 'This is a placeholder. Replace with your Native Forms shortcode.',
    'form.timelineTitle': 'What happens next?',
    'form.step1.title': 'Now',
    'form.step1.description': 'You receive confirmation email',
    'form.step2.title': 'Within 24h',
    'form.step2.description': 'We talk 15-30 min',
    'form.step3.title': 'Same day',
    'form.step3.description': 'I send you my proposal by email',
    'form.step4.title': 'You decide',
    'form.step4.description': 'If the proposal works for you, we start',
    'form.guaranteeTitle': '💯 My guarantee',
    'form.guaranteeText': "If you don't find a home you love within the agreed timeframe, I refund your retainer completely.",
    'form.guaranteeNote': "In 4 years, I've never had to do it.",

    // Testimonials
    'testimonials.headline': 'What people who already found their home say',

    // FAQ
    'faq.headline': 'Frequently Asked Questions',
    'faq.subheadline': 'Speed, Control and Results',
    'faq.section1.title': 'What really matters',
    'faq.section2.title': 'How this works',
    'faq.section3.title': 'Trust and decision',

    'faq.q1': 'Why do I need help finding a home?',
    'faq.a1': `You don't. You can do it alone. But the real question is: do you have time to review 200 listings, travel 3 times, see 15 wrong homes, and then discover the street has water problems?

I've been living this every day for 10 years. I know what works and what doesn't. I save you the long road. You decide if you prefer the shortcut or the full journey.`,
    'faq.q2': 'What do I actually gain by hiring you?',
    'faq.a2': `Three concrete things:

- Time: From 3 months searching to 1 week with results
- Money: You save on unnecessary trips and avoid problem houses
- Peace of mind: Someone who knows every street tells you "yes, this works" or "no, this doesn't"

It's not about finding A home. It's about finding THE home.`,
    'faq.q3': 'Is the consultation free? Is there a catch?',
    'faq.a3': `It's free. No catch.

We talk for 15 minutes. I understand what you're looking for. I tell you if I can help. If it makes sense to work together, I explain how. If not, I tell you the truth and we don't waste time.

I prefer 10 good clients over 50 wrong ones.`,
    'faq.q4': 'Are you going to sell me something I don\'t need?',
    'faq.a4': `I can't.

My business is referrals. If I sell you garbage, you leave me a bad Google review and I lose 10 future clients.

I'd rather tell you "this isn't what you're looking for" than sell you something wrong. In the long run, honesty makes me more money than short-termism.`,
    'faq.q5': 'How much does it cost to work with you?',
    'faq.a5': `It depends on how we work together. There are different ways to collaborate depending on your situation.

In the initial consultation I explain the options with clear pricing. You decide if it makes sense. Zero surprises, everything transparent BEFORE we start.`,

    'faq.q6': 'What happens after I fill out the form?',
    'faq.a6': `Simple:

Today: You fill out the form (2 minutes)
In 5 minutes: Confirmation email with details
Within 24 hours: I call you (or WhatsApp, your choice)
15 minutes later: You know exactly what's next

No mystery. No endless waiting. Everything direct.`,
    'faq.q7': 'Do I need to travel to Spain right now?',
    'faq.a7': `No.

First we talk, I understand what you're looking for, and when we have options that truly fit, THEN you come.

Most of my clients make 1 single trip and sign. No coming "to explore" without a plan. That's wasting time and money.`,
    'faq.q8': 'Can I keep searching on my own in the meantime?',
    'faq.a8': `Of course.

There's no exclusivity. If you find something good on your own, perfect. If I find something better, great.

The goal is for you to get your home. Doesn't matter how.`,
    'faq.q9': 'Do I need to speak Spanish?',
    'faq.a9': `No.

I speak fluent English. All communication can be in English: calls, emails, contracts, viewings. I also translate documents if needed.

But living here without basic Spanish is complicated. I recommend learning the essentials if you're coming long-term.`,

    'faq.q10': 'Who are you exactly?',
    'faq.a10': `Manuel Fernández. Real estate agent. 10 years of experience in Frigiliana, Nerja and Torrox. I live here.

I'm not an agency with 20 agents who rotate every month. I'm the one who searches for you, who calls you, who accompanies you. Always the same person from start to finish.`,
    'faq.q11': 'How do I know I can trust you?',
    'faq.a11': `You don't until we talk.

Read the testimonials above if you want. Look me up on Google if you want. But the reality is: you talk to me for 15 minutes and decide if I generate trust.

The consultation is free precisely for that. No risk.`,
    'faq.q12': 'What do I need to prepare before calling?',
    'faq.a12': `Just 4 things:

- When you want to move (approximate month)
- How much you want to spend per month (a range is fine)
- Where (Frigiliana/Nerja/Torrox/Cómpeta)
- 3 must-haves for your ideal home

That's it. We discuss the rest on the call. You don't need to prepare a PowerPoint presentation of your life.`,

    // Final CTA
    'finalCta.headlinePrefix': 'Your home in ',
    'finalCta.headlineSuffix': ' is waiting. Start now.',
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
