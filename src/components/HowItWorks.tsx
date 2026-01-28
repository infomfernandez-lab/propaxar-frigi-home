import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const HowItWorks = () => {
  const { t } = useLanguage();

  const steps = [
    {
      number: 1,
      icon: "📞",
      title: t('howItWorks.step1.title'),
      description: t('howItWorks.step1.description'),
    },
    {
      number: 2,
      icon: "🔍",
      title: t('howItWorks.step2.title'),
      description: t('howItWorks.step2.description'),
    },
    {
      number: 3,
      icon: "🏡",
      title: t('howItWorks.step3.title'),
      description: t('howItWorks.step3.description'),
    },
  ];

  const handleCTAClick = () => {
    const formSection = document.getElementById("form-section");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="how-it-works" className="bg-background py-16 md:py-20">
      <div className="max-w-[1200px] mx-auto px-5">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('howItWorks.headline')}
          </h2>
          <p className="text-lg text-foreground-muted max-w-[700px] mx-auto">
            {t('howItWorks.subheadline')}
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12">
          {steps.map((step, index) => (
            <div 
              key={step.number} 
              className="process-card"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className="process-icon" role="img" aria-label={step.title}>
                {step.icon}
              </div>

              {/* Number Badge */}
              <div className="process-badge">
                {step.number}
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-foreground-muted leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <button onClick={handleCTAClick} className="btn-primary">
            {t('howItWorks.cta')}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
