import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useEffect } from "react";

const locations = ["Frigiliana", "Nerja", "Torrox"];

const HeroSection = () => {
  const { t, language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationPhase, setAnimationPhase] = useState<'fade-in' | 'white-to-gold' | 'gold' | 'gold-to-white' | 'fade-out'>('fade-in');

  useEffect(() => {
    // Timeline: fade-in (0.3s) -> white-to-gold (0.6s) -> gold (1s) -> gold-to-white (0.3s) -> fade-out (0.3s)
    const phases = [
      { phase: 'white-to-gold' as const, delay: 300 },
      { phase: 'gold' as const, delay: 600 },
      { phase: 'gold-to-white' as const, delay: 1000 },
      { phase: 'fade-out' as const, delay: 300 },
    ];

    let timeouts: NodeJS.Timeout[] = [];
    
    const runAnimation = () => {
      setAnimationPhase('fade-in');
      
      let accumulatedDelay = 0;
      phases.forEach(({ phase, delay }) => {
        accumulatedDelay += delay;
        const timeout = setTimeout(() => setAnimationPhase(phase), accumulatedDelay);
        timeouts.push(timeout);
      });

      // After fade-out, change word and restart
      const finalTimeout = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % locations.length);
        runAnimation();
      }, accumulatedDelay + 300);
      timeouts.push(finalTimeout);
    };

    runAnimation();

    return () => timeouts.forEach(clearTimeout);
  }, []);

  const getAnimationStyles = () => {
    switch (animationPhase) {
      case 'fade-in':
        return 'opacity-0 text-white';
      case 'white-to-gold':
        return 'opacity-100 text-white';
      case 'gold':
        return 'opacity-100 text-[#E8B44F]';
      case 'gold-to-white':
        return 'opacity-100 text-white';
      case 'fade-out':
        return 'opacity-0 text-white';
      default:
        return 'opacity-100 text-white';
    }
  };

  const handleCTAClick = () => {
    const formSection = document.getElementById("form-section");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Dynamic headline based on language
  const headlinePrefix = language === 'es' 
    ? 'Tu Consultor Personal de Vivienda en ' 
    : 'Your Personal Housing Consultant in ';

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
                {headlinePrefix}
                <span 
                  className={`inline-block min-w-[180px] md:min-w-[280px] transition-all duration-300 ${getAnimationStyles()}`}
                >
                  {locations[currentIndex]}
                </span>
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
            {/* Temporal Context with Rotating Location */}
            <p className="text-[14px] text-[#666666] font-normal italic text-center mt-[25px] mb-0 opacity-0 animate-fade-in-up animation-delay-500">
              {t('hero.temporalContextPrefix')}
              <span 
                className={`inline-block min-w-[80px] transition-all duration-300 ${getAnimationStyles().replace('text-white', 'text-[#666666]')}`}
                style={{ color: animationPhase === 'gold' ? '#E8B44F' : undefined }}
              >
                {locations[currentIndex]}
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
