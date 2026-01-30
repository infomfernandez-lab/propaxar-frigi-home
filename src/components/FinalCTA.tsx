import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useEffect } from "react";

const locations = ["Frigiliana", "Nerja", "Torrox"];

const FinalCTA = () => {
  const { t } = useLanguage();
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
        return 'opacity-0';
      case 'white-to-gold':
        return 'opacity-100';
      case 'gold':
        return 'opacity-100 text-[#E8B44F]';
      case 'gold-to-white':
        return 'opacity-100';
      case 'fade-out':
        return 'opacity-0';
      default:
        return 'opacity-100';
    }
  };

  const handleCTAClick = () => {
    const formSection = document.getElementById("form-section");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="final-cta" className="bg-primary py-20 md:py-24">
      <div className="max-w-[900px] mx-auto px-5 text-center">
        {/* Headline with Rotating Location */}
        <h2 className="text-3xl md:text-[42px] font-bold text-primary-foreground leading-tight mb-6">
          {t('finalCta.headlinePrefix')}
          <span 
            className={`inline-block min-w-[140px] md:min-w-[180px] transition-all duration-300 ${getAnimationStyles()}`}
          >
            {locations[currentIndex]}
          </span>
          {t('finalCta.headlineSuffix')}
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
