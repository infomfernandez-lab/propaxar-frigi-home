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
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          {/* Left Column - 60% (3/5) */}
          <div className="lg:col-span-3 self-start">
            {/* Headlines */}
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              {t('form.headline')}
            </h2>
            <p className="text-lg text-foreground-muted mb-8">
              {t('form.subheadline')}
            </p>

            {/* Native Forms Iframe */}
            <div className="form-container bg-card border border-border rounded-xl shadow-lg overflow-hidden p-10 pb-[100px] md:pb-10 box-border">
              <iframe 
                src="https://f.nativeforms.com/AevF1SW1jZmEWb5ZGOa1Db" 
                width="100%" 
                height="820" 
                frameBorder="0"
                scrolling="no"
                style={{ border: 'none', overflow: 'hidden', display: 'block', marginBottom: '50px' }}
                title="Contact Form"
              />
            </div>
            {/* Micro-copy below form */}
            <p className="text-center text-sm text-foreground-muted mt-4">
              {t('form.microcopy')}
            </p>
          </div>

          {/* Right Column - 40% (2/5) */}
          <div className="lg:col-span-2 self-start">
            <div className="bg-background-alt rounded-xl p-8 pt-[30px]">
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

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FormSection;
