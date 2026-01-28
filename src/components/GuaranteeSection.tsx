import { Shield } from "lucide-react";

const GuaranteeSection = () => {
  return (
    <section className="bg-background-blue-tint py-14 md:py-16">
      <div className="max-w-[800px] mx-auto px-5 text-center">
        {/* Icon */}
        <div className="text-6xl mb-6" role="img" aria-label="Guarantee">
          💯
        </div>

        {/* Headline */}
        <h2 className="text-2xl md:text-[28px] font-bold text-foreground mb-6">
          Garantía sin riesgo
        </h2>

        {/* Description */}
        <p className="text-lg text-foreground-muted leading-relaxed mb-6 max-w-[650px] mx-auto">
          Si no encuentras una casa que te encante dentro del plazo acordado, te devuelvo tu inversión completa. Sin preguntas. Sin letra pequeña.
        </p>
        
        <p className="text-lg text-foreground-muted leading-relaxed mb-8 max-w-[650px] mx-auto">
          En 4 años ayudando a familias, nunca he tenido que usar esta garantía.
        </p>

        {/* Trust Badge */}
        <div className="inline-flex items-center gap-2 bg-success/10 text-success px-5 py-2.5 rounded-full font-medium">
          <Shield className="w-5 h-5" />
          100% Money-Back Guarantee
        </div>
      </div>
    </section>
  );
};

export default GuaranteeSection;
