import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const HeroSection = () => {
  const { t } = useLanguage();

  const handleCTAClick = () => {
    const formSection = document.getElementById("form-section");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative">
      {/* Hero Background with Overlay */}
      <div 
        className="relative min-h-screen md:min-h-screen flex flex-col"
        style={{
          backgroundImage: `url(https://propaxar.com/wp-content/uploads/2026/01/Gemini_Generated_Image_wyt8u3wyt8u3wyt8.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Dark Overlay - 50% opacity */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Hero Content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center items-center px-5 pt-24 pb-8 md:pt-32 md:pb-16">
          <div className="max-w-[900px] mx-auto text-center">
            {/* New 3-Line Headline Structure */}
            <div className="mb-8 opacity-0 animate-fade-in-up">
              {/* Line 1 - Medium weight, smaller */}
              <p className="text-[28px] md:text-[42px] font-semibold text-white leading-tight mb-2">
                {t('hero.line1')}
              </p>
              {/* Line 2 - Medium weight, smaller */}
              <p className="text-[28px] md:text-[42px] font-semibold text-white leading-tight mb-2">
                {t('hero.line2')}
              </p>
              {/* Line 3 - Bold, larger, primary blue color */}
              <h1 className="text-[32px] md:text-[48px] font-bold text-primary leading-tight">
                {t('hero.line3')}
              </h1>
            </div>

            {/* Subheadline */}
            <p className="text-lg md:text-[22px] font-medium text-white/90 max-w-[600px] mx-auto mb-10 opacity-0 animate-fade-in-up animation-delay-100">
              {t('hero.subheadline')}
            </p>

            {/* Simple CTA Button */}
            <div className="opacity-0 animate-fade-in-up animation-delay-200">
              <button
                onClick={handleCTAClick}
                className="inline-flex items-center gap-3 bg-primary hover:bg-primary/90 text-primary-foreground text-2xl font-semibold px-[60px] py-5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
              >
                {t('hero.cta')}
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>

            {/* Micro-copy below button */}
            <p className="text-base text-white/80 mt-6 opacity-0 animate-fade-in-up animation-delay-300">
              {t('hero.microcopy')}
            </p>
          </div>
        </div>

        {/* Trust Bar */}
        <div className="relative z-10 bg-card/95 backdrop-blur-sm py-6 md:py-8">
          <div className="max-w-[900px] mx-auto px-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 opacity-0 animate-fade-in-up animation-delay-400">
              <div className="text-center">
                <div className="stat-number">{t('hero.stat1.number')}</div>
                <div className="stat-label">{t('hero.stat1.label')}</div>
              </div>
              <div className="text-center">
                <div className="stat-number">{t('hero.stat2.number')}</div>
                <div className="stat-label">{t('hero.stat2.label')}</div>
              </div>
              <div className="text-center">
                <div className="stat-number">{t('hero.stat3.number')}</div>
                <div className="stat-label">{t('hero.stat3.label')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
