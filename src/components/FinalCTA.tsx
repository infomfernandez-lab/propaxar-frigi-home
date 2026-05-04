import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const FinalCTA = () => {
  const { language } = useLanguage();

  return (
    <section id="final-cta" className="py-20 md:py-24" style={{ backgroundColor: 'hsl(222, 28%, 16%)' }}>
      <div className="max-w-[800px] mx-auto px-5 text-center">
        <h2 className="text-3xl md:text-[40px] font-bold text-white leading-tight mb-4 font-heading">
          {language === 'es'
            ? <>El mercado no espera. Tú tampoco deberías.</>
            : <>The market doesn't wait. Neither should you.</>}
        </h2>

        <p className="text-base md:text-lg text-white/70 mb-10">
          {language === 'es'
            ? 'Escríbeme ahora. Te respondo antes de que pase el día.'
            : "Write to me now. I'll reply before the day is out."}
        </p>

        <a
          href="https://wa.me/34662317561"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary text-lg px-12 py-4"
          style={{ backgroundColor: '#fff', color: '#1E2535' }}
        >
          {language === 'es' ? 'Escribir por WhatsApp' : 'Message on WhatsApp'}
          <ArrowRight className="w-5 h-5" />
        </a>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-8 text-[14px] text-white/50">
          <span>✓ {language === 'es' ? 'Sin compromiso' : 'No commitment'}</span>
          <span>✓ {language === 'es' ? 'Primera consulta gratis' : 'First consultation free'}</span>
          <span>✓ {language === 'es' ? 'En tu idioma' : 'In your language'}</span>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
