import { Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const TestimonialsSection = () => {
  const { t } = useLanguage();

  const testimonials = [
    {
      quote: "Los servicios de Manolo son excelentes. Es honesto y comprometido conmigo como cliente, no solo en la búsqueda de vivienda sino negociando términos y ayudándome con todos los extras que implica mudarse. Fue la única persona que se tomó el tiempo de entender exactamente lo que buscaba y cuáles eran mis prioridades. ¡Luego encontró mi casa perfecta en menos de 24 horas! Recomiendo mucho sus servicios. Tienen un precio muy razonable y me ahorraron un estrés enorme y búsquedas.",
      quoteEn: "Manolo's services are excellent. He is honest and committed to me as a client, not only in property finding but negotiating terms and supporting me with all the extras that moving house involves. He is the one person who took time to find out exactly what I was looking for and what were my priorities. Then he found my perfect home in less than 24 hours! I highly recommend his services. They are very reasonably priced and saved me enormous stress and searching.",
      name: "Sally H.",
      origin: "UK → Frigiliana",
      property: "Casa perfecta en 24h",
      propertyEn: "Perfect home in 24h",
      avatar: "SH",
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
