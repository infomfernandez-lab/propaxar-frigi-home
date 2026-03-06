import { Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const TestimonialsSection = () => {
  const { language } = useLanguage();

  const testimonials = [
    {
      quote: language === 'es'
        ? 'Manuel fue la única persona que se tomó el tiempo de entender exactamente lo que buscaba. Encontró lo que necesitaba en menos de 24 horas.'
        : 'Manuel was the only person who took the time to understand exactly what I was looking for. He found what I needed in less than 24 hours.',
      name: 'Sally H.',
      meta: 'UK → Frigiliana',
      avatar: 'SH',
    },
    {
      quote: language === 'es'
        ? 'Después de meses buscando desde Alemania sin éxito, Manuel lo resolvió en una semana. Conoce cada propiedad y cada propietario.'
        : 'After months of searching from Germany without success, Manuel solved it in a week. He knows every property and every owner.',
      name: 'Klaus & Maria',
      meta: 'Germany → Frigiliana',
      avatar: 'KM',
    },
    {
      quote: language === 'es'
        ? 'Profesional, honesto y conoce cada rincón de Frigiliana. Nos ahorró meses de búsqueda y nos dio seguridad en cada paso.'
        : 'Professional, honest and knows every corner of Frigiliana. He saved us months of searching and gave us confidence at every step.',
      name: 'Jan & Annika',
      meta: 'Netherlands → Frigiliana',
      avatar: 'JA',
    },
  ];

  return (
    <section id="testimonials" className="bg-background py-16 md:py-20">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground font-heading">
            {language === 'es'
              ? 'Qué dicen quienes ya encontraron su casa'
              : 'What those who already found their home say'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="testimonial-card">
              {/* Avatar */}
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-base font-bold text-white mb-5"
                style={{ backgroundColor: 'hsl(222, 28%, 16%)' }}
              >
                {t.avatar}
              </div>

              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-sm text-foreground-muted leading-relaxed mb-6 italic">
                "{t.quote}"
              </blockquote>

              {/* Author */}
              <div className="border-t border-border pt-4">
                <p className="font-semibold text-foreground text-sm">{t.name}</p>
                <p className="text-xs text-foreground-subtle">{t.meta}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
