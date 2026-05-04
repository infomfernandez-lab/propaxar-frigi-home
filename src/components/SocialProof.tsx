const testimonials = [
  {
    quote: "Manuel found what I needed in less than 24 hours. I'd been searching for months from the UK.",
    name: "Sally H.",
    meta: "UK → Frigiliana",
  },
  {
    quote: "He knows every property and every owner. Nobody else could have found this house.",
    name: "Klaus & Maria",
    meta: "Germany → Frigiliana",
  },
  {
    quote: "Professional, honest, local. He saved us months of searching.",
    name: "Jan & Annika",
    meta: "Netherlands → Frigiliana",
  },
];

const SocialProof = () => {
  return (
    <section className="bg-background py-16 md:py-20">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-card rounded-lg p-6 border border-border">
              <div className="text-4xl leading-none text-foreground-muted mb-2 font-heading">"</div>
              <p className="text-base text-foreground leading-relaxed mb-4">{t.quote}</p>
              <p className="text-sm font-semibold text-foreground">{t.name}</p>
              <p className="text-xs text-foreground-muted">{t.meta}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
