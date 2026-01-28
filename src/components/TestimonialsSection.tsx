import { Star } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "Manuel encontró nuestra casa en 5 días. Nos ahorró semanas de búsqueda caótica y negoció un mejor precio.",
      name: "Sarah & Tom",
      origin: "UK → Frigiliana",
      property: "Casa 2 dormitorios, €950/mes",
      avatar: "ST",
    },
    {
      quote: "Después de meses buscando desde Alemania sin éxito, Manuel lo resolvió en una semana. Increíble servicio.",
      name: "Klaus & Maria",
      origin: "Alemania → Frigiliana",
      property: "Apartamento con terraza, €850/mes",
      avatar: "KM",
    },
    {
      quote: "Profesional, honesto y conoce cada rincón de Frigiliana. La mejor inversión que hicimos.",
      name: "Jan & Annika",
      origin: "Países Bajos → Frigiliana",
      property: "Villa con vistas, €1,200/mes",
      avatar: "JA",
    },
  ];

  return (
    <section className="bg-background py-16 md:py-20">
      <div className="max-w-[1200px] mx-auto px-5">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Qué dicen quienes ya encontraron su casa
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
                "{testimonial.quote}"
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
                  {testimonial.property}
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
