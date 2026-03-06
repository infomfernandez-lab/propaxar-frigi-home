import { Helmet } from "react-helmet-async";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ComprarPage() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Comprar en Frigiliana — Tu consultor personal | Propaxar</title>
        <meta name="description" content="Encuentra la casa perfecta en Frigiliana con asesoramiento profesional. Datos reales, conocimiento local y acompañamiento completo." />
      </Helmet>
      <Navigation />
      <main className="flex-1 flex items-center justify-center pt-[60px]">
        <div className="text-center px-5">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground font-heading mb-4">
            {language === 'es' ? 'Comprar en Frigiliana' : 'Buy in Frigiliana'}
          </h1>
          <p className="text-lg text-foreground-muted">
            {language === 'es' ? 'Próximamente — estamos preparando esta sección.' : 'Coming soon — we\'re preparing this section.'}
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
