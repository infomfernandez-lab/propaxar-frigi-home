import { useLanguage } from "@/contexts/LanguageContext";

const FormSection = () => {
  const { t } = useLanguage();

  const timelineSteps = [
    {
      number: 1,
      title: t('form.step1.title'),
      description: t('form.step1.description'),
    },
    {
      number: 2,
      title: t('form.step2.title'),
      description: t('form.step2.description'),
    },
    {
      number: 3,
      title: t('form.step3.title'),
      description: t('form.step3.description'),
    },
    {
      number: 4,
      title: t('form.step4.title'),
      description: t('form.step4.description'),
    },
    {
      number: 5,
      title: t('form.step5.title'),
      description: t('form.step5.description'),
    },
  ];

  return (
    <section id="form-section" className="bg-background py-16 md:py-20">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Left Column - 60% (3/5) */}
          <div className="lg:col-span-3">
            {/* Headlines */}
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              {t('form.headline')}
            </h2>
            <p className="text-lg text-foreground-muted mb-8">
              {t('form.subheadline')}
            </p>

            {/* Form Placeholder Box */}
            <div className="bg-card border border-border rounded-xl shadow-lg p-10 min-h-[600px] flex flex-col items-center justify-center">
              <div className="text-center text-foreground-muted">
                <p className="text-base mb-4">
                  {"<!-- Native Forms Shortcode Goes Here -->"}
                </p>
                <p className="text-lg font-medium text-foreground-subtle">
                  {t('form.placeholder')}
                </p>
              </div>
              <p className="text-sm text-foreground-subtle mt-8">
                {t('form.placeholderNote')}
              </p>
            </div>
          </div>

          {/* Right Column - 40% (2/5) */}
          <div className="lg:col-span-2">
            <div className="bg-background-alt rounded-xl p-6 md:p-8">
              {/* Timeline Title */}
              <h3 className="text-xl font-bold text-foreground mb-6">
                {t('form.timelineTitle')}
              </h3>

              {/* Timeline Steps */}
              <div className="space-y-6">
                {timelineSteps.map((step, index) => (
                  <div key={index} className="flex gap-4">
                    {/* Number Circle */}
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
                      {step.number}
                    </div>
                    {/* Content */}
                    <div>
                      <p className="font-semibold text-foreground">
                        {step.title}
                      </p>
                      <p className="text-[15px] text-foreground-muted">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Guarantee Box */}
              <div className="mt-8 bg-success/10 rounded-lg p-5">
                <p className="font-semibold text-foreground mb-2">
                  {t('form.guaranteeTitle')}
                </p>
                <p className="text-[15px] text-foreground-muted leading-relaxed">
                  {t('form.guaranteeText')}
                </p>
                <p className="text-sm text-foreground-subtle mt-2 italic">
                  {t('form.guaranteeNote')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FormSection;
