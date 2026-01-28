import { Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const TestimonialsSection = () => {
  const { t } = useLanguage();

  const testimonials = [
    {
      quote: "Manuel encontró nuestra casa en 5 días. Nos ahorró semanas de búsqueda caótica y negoció un mejor precio.",
      quoteEn: "Manuel found our house in 5 days. He saved us weeks of chaotic searching and negotiated a better price.",
      name: "Sarah & Tom",
      origin: "UK → Frigiliana",
      property: "Casa 2 dormitorios, €950/mes",
      propertyEn: "2-bedroom house, €950/month",
      avatar: "ST",
    },
    {
      quote: "Después de meses buscando desde Alemania sin éxito, Manuel lo resolvió en una semana. Increíble servicio.",
      quoteEn: "After months of searching from Germany without success, Manuel solved it in a week. Incredible service.",
      name: "Klaus & Maria",
      origin: "Germany → Frigiliana",
      property: "Apartamento con terraza, €850/mes",
      propertyEn: "Apartment with terrace, €850/month",
      avatar: "KM",
    },
    {
      quote: "Profesional, honesto y conoce cada rincón de Frigiliana. La mejor inversión que hicimos.",
      quoteEn: "Professional, honest and knows every corner of Frigiliana. The best investment we made.",
      name: "Jan & Annika",
      origin: "Netherlands → Frigiliana",
      property: "Villa con vistas, €1,200/mes",
      propertyEn: "Villa with views, €1,200/month",
      avatar: "JA",
    },
  ];

  return (
    <section id="testimonials" className="bg-background py-16 md:py-20">
      <div className="max-w-[1200px] mx-auto px-5">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            {t('testimonials.headline')}
          </h2>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              {/* Avatar - alternating colors: blue, gold, blue */}
              <div 
                className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold mb-6 ${
                  index % 2 === 0 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-secondary text-secondary-foreground'
                }`}
              >
                {testimonial.avatar}
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-foreground-muted italic leading-relaxed mb-6">
                "{t('testimonials.headline').includes('What') ? testimonial.quoteEn : testimonial.quote}"
              </blockquote>

              {/* Author Info */}
              <div className="border-t border-border pt-4">
                <p className="font-semibold text-foreground">
                  {testimonial.name}
                </p>
                <p className="text-sm text-foreground-subtle mb-1">
                  {testimonial.origin}
                </p>
                <p className="text-sm text-primary font-medium">
                  {t('testimonials.headline').includes('What') ? testimonial.propertyEn : testimonial.property}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
