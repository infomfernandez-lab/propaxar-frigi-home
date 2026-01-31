import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from "@/contexts/LanguageContext";

// Helper to render text with clickable phone numbers
const renderWithPhoneLinks = (text: string) => {
  const phoneRegex = /(\+34\s?662\s?317\s?561)/g;
  const parts = text.split(phoneRegex);
  
  return parts.map((part, index) => {
    if (part.match(phoneRegex)) {
      return (
        <a
          key={index}
          href="tel:+34662317561"
          className="text-[#E8B44F] hover:underline font-medium"
        >
          {part}
        </a>
      );
    }
    return part;
  });
};

const FAQSection = () => {
  const { t } = useLanguage();

  const faqs = [
    { question: t('faq.q1'), answer: t('faq.a1') },   // 1. Who is behind Propaxar?
    { question: t('faq.q3'), answer: t('faq.a3') },   // 2. Why use local expert?
    { question: t('faq.q2'), answer: t('faq.a2') },   // 3. What's included?
    { question: t('faq.q9'), answer: t('faq.a9') },   // 4. How does consultation work?
    { question: t('faq.q10'), answer: t('faq.a10') }, // 5. What to prepare?
    { question: t('faq.q5'), answer: t('faq.a5') },   // 6. Protection from scams?
    { question: t('faq.q6'), answer: t('faq.a6') },   // 7. Rent remotely?
    { question: t('faq.q7'), answer: t('faq.a7') },   // 8. Utilities help?
    { question: t('faq.q8'), answer: t('faq.a8') },   // 9. Next step?
  ];

  return (
    <section id="faq-section" className="bg-background py-16 md:py-20">
      <div className="max-w-[900px] mx-auto px-5">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('faq.headline')}
          </h2>
          <p className="text-lg text-foreground-muted">
            {t('faq.subheadline')}
          </p>
        </div>

        {/* Accordion FAQs */}
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`faq-${index}`}
              className="bg-card border border-border rounded-xl px-6 shadow-sm"
            >
              <AccordionTrigger className="text-left text-foreground font-semibold text-base md:text-lg hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-foreground-muted leading-relaxed whitespace-pre-line">
                {renderWithPhoneLinks(faq.answer)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
