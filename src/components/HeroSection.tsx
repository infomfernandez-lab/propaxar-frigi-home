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
            {/* Main Headline Structure */}
            <div className="mb-6 opacity-0 animate-fade-in-up">
              {/* Main Title - LARGEST */}
              <h1 className="text-[36px] md:text-[58px] font-extrabold text-white leading-[1.1]">
                {t('hero.line3')}
              </h1>
              {/* Subtitle - SMALLER */}
              <p className="text-[22px] md:text-[28px] font-medium text-white/90 leading-[1.4] mt-[15px]">
                {t('hero.line1')} {t('hero.line2')}
              </p>
            </div>

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

            {/* Two benefit lines below button */}
            <div className="mt-5 opacity-0 animate-fade-in-up animation-delay-300 space-y-2">
              <p className="text-[15px] text-white/80">
                {t('hero.microcopy')}
              </p>
              <p className="text-[15px] text-white/80">
                {t('hero.subheadline')}
              </p>
            </div>
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
