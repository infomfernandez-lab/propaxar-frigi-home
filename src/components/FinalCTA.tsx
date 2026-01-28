import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const FinalCTA = () => {
  const { t } = useLanguage();

  const handleCTAClick = () => {
    const formSection = document.getElementById("form-section");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="final-cta" className="bg-primary py-20 md:py-24">
      <div className="max-w-[900px] mx-auto px-5 text-center">
        {/* Headline */}
        <h2 className="text-3xl md:text-[42px] font-bold text-primary-foreground leading-tight mb-6">
          {t('finalCta.headline')}
        </h2>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-[600px] mx-auto">
          {t('finalCta.subheadline')}
        </p>

        {/* CTA Button */}
        <button onClick={handleCTAClick} className="btn-secondary text-xl px-12 py-5">
          {t('finalCta.button')}
          <ArrowRight className="w-6 h-6" />
        </button>

        {/* Micro-copy */}
        <p className="text-sm text-primary-foreground/70 mt-6">
          {t('finalCta.microcopy')}
        </p>
      </div>
    </section>
  );
};

export default FinalCTA;
