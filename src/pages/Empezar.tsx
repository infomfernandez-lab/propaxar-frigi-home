import { useState, useEffect } from "react";
import { ArrowRight, ArrowDown, Check, X, Shield, Clock, MessageCircle, Star, MapPin, Home } from "lucide-react";
import { Helmet } from "react-helmet-async";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Lang = "es" | "en";

const STRIPE_LINK = "https://buy.stripe.com/bJe6oJ9fS73gffkdepgEg05";
const WHATSAPP_ES = "https://wa.me/34662317561?text=Hola%20Manuel%2C%20tengo%20una%20pregunta%20sobre%20el%20reporte";
const WHATSAPP_EN = "https://wa.me/34662317561?text=Hello%20Manuel%2C%20I%20have%20a%20question%20about%20the%20report";
const TERMS_HREF = "/terminos-finder";

const t = {
  es: {
    metaTitle: "Encuentra Tu Casa en Frigiliana | Propaxar",
    metaDesc: "Reporte de mercado personalizado para encontrar tu vivienda ideal en Frigiliana. Experto local, entrega en 24-48h, garantía de reembolso.",
    heroH1: "ENCUENTRA TU CASA PERFECTA EN FRIGILIANA",
    heroSub: "Sin perder tiempo. Sin propiedades ya alquiladas. Con experto local nacido aquí.",
    heroCta: "Ver Cómo Funciona",
    problemTitle: "¿Cansado de esto?",
    pains: [
      "Buscar durante semanas sin encontrar nada que encaje",
      "Propiedades que ya están alquiladas cuando llamas",
      "Fotos engañosas que no coinciden con la realidad",
      "No conocer los precios reales de la zona",
      "Perder tiempo visitando pisos que no merecen la pena",
    ],
    betterWay: "Hay una forma mejor",
    solutionLabel: "La Solución",
    solutionTitle: "REPORTE COMPLETO DEL MERCADO",
    solutionSub: "Personalizado para ti",
    benefits: [
      "Análisis de todas las propiedades disponibles",
      "Precios reales verificados por experto local",
      "Fotos actualizadas y descripción honesta",
      "Comparativa de barrios y ubicaciones",
      "Contacto directo con propietarios",
      "6 meses de seguimiento incluido",
    ],
    priceNote: "Pago único · Reembolsable si alquilas una propiedad mía",
    viewDemo: "Ver Ejemplo Real",
    demoTitle: "VE EXACTAMENTE QUÉ RECIBES",
    demoSub: "Hemos preparado un reporte de demostración para que veas la calidad y el nivel de detalle.",
    demoLabel: "Reporte Demo Disponible",
    demoHint: "Mira el formato real antes de comprar",
    viewFullDemo: "Ver Reporte Completo Demo",
    trustTitle: "POR QUÉ CONFIAR EN MÍ",
    trustBio: "Fundador de Propaxar. Nacido y criado en Frigiliana. Más de 10 años ayudando a familias a encontrar su hogar ideal en la Axarquía.",
    trustStats: [
      { text: "Nacido en Frigiliana" },
      { text: "+10 años de experiencia" },
      { text: "+200 familias ayudadas" },
      { text: "Conocimiento local profundo" },
    ],
    howTitle: "ASÍ DE FÁCIL",
    steps: [
      { title: "Compra el reporte", desc: "Pago seguro con Stripe. Recibirás confirmación inmediata." },
      { title: "Hablamos 15 min", desc: "Te llamo para entender exactamente qué buscas." },
      { title: "Recibes tu reporte", desc: "En 24-48h, análisis completo del mercado personalizado." },
    ],
    ctaMain: "Empezar Ahora — €180",
    termsNote: "Al comprar aceptas los",
    termsLink: "términos y condiciones",
    guaranteeTitle: "GARANTÍA DE REEMBOLSO",
    guaranteeText: 'Si finalmente alquilas una propiedad de las que te presento, los €180 del reporte se descuentan íntegramente de mi comisión.',
    guaranteeBold: "Riesgo cero para ti.",
    badges: ["Pago seguro Stripe", "Reporte en 24-48h", "Soporte por WhatsApp"],
    faqTitle: "PREGUNTAS FRECUENTES",
    faqs: [
      { q: "¿Por qué debería pagar €180 por un reporte?", a: "Porque te ahorra semanas de búsqueda ineficiente. Recibes un análisis profesional del mercado completo, verificado por un experto local que conoce cada calle de Frigiliana. Además, si alquilas una propiedad mía, te devuelvo los €180." },
      { q: "¿Qué pasa si no encuentro nada que me guste?", a: "El reporte incluye 6 meses de seguimiento. Si no hay nada que encaje ahora, te aviso en cuanto aparezca algo nuevo que cumpla tus criterios. El mercado cambia constantemente." },
      { q: "¿Cuánto tarda en llegar el reporte?", a: "Entre 24 y 48 horas después de nuestra llamada inicial de 15 minutos. Primero necesito entender bien qué buscas para personalizar el análisis." },
      { q: "¿Puedo ver un ejemplo antes de comprar?", a: "Sí, tenemos un reporte de demostración disponible con datos reales (parcialmente anonimizados). Puedes verlo antes de decidir." },
    ],
    whatsappCta: "¿Más preguntas? Escríbeme por WhatsApp",
    finalTitle: "¿LISTO PARA ENCONTRAR TU CASA?",
    finalSub: "Deja de buscar a ciegas. Recibe tu reporte personalizado en 24-48h.",
    finalCta: "Comprar Reporte Ahora — €180",
    stickyCta: "Comprar Reporte — €180",
  },
  en: {
    metaTitle: "Find Your Home in Frigiliana | Propaxar",
    metaDesc: "Personalised market report to find your ideal property in Frigiliana. Local expert, 24-48h delivery, money-back guarantee.",
    heroH1: "FIND YOUR PERFECT HOME IN FRIGILIANA",
    heroSub: "No wasted time. No already-rented properties. With a local expert born here.",
    heroCta: "See How It Works",
    problemTitle: "Tired of this?",
    pains: [
      "Searching for weeks without finding anything that fits",
      "Properties already rented by the time you call",
      "Misleading photos that don't match reality",
      "Not knowing the real prices in the area",
      "Wasting time visiting flats that aren't worth it",
    ],
    betterWay: "There's a better way",
    solutionLabel: "The Solution",
    solutionTitle: "COMPLETE MARKET REPORT",
    solutionSub: "Personalised for you",
    benefits: [
      "Analysis of all available properties",
      "Real prices verified by local expert",
      "Updated photos and honest descriptions",
      "Neighbourhood and location comparison",
      "Direct contact with landlords",
      "6 months of follow-up included",
    ],
    priceNote: "One-time payment · Refundable if you rent one of my properties",
    viewDemo: "See Real Example",
    demoTitle: "SEE EXACTLY WHAT YOU GET",
    demoSub: "We've prepared a demo report so you can see the quality and level of detail.",
    demoLabel: "Demo Report Available",
    demoHint: "See the real format before buying",
    viewFullDemo: "View Full Demo Report",
    trustTitle: "WHY TRUST ME",
    trustBio: "Founder of Propaxar. Born and raised in Frigiliana. Over 10 years helping families find their ideal home in the Axarquía.",
    trustStats: [
      { text: "Born in Frigiliana" },
      { text: "+10 years experience" },
      { text: "+200 families helped" },
      { text: "Deep local knowledge" },
    ],
    howTitle: "IT'S THAT EASY",
    steps: [
      { title: "Buy the report", desc: "Secure payment via Stripe. Instant confirmation." },
      { title: "We talk for 15 min", desc: "I call you to understand exactly what you're looking for." },
      { title: "Receive your report", desc: "In 24-48h, a full personalised market analysis." },
    ],
    ctaMain: "Get Started — €180",
    termsNote: "By purchasing you accept the",
    termsLink: "terms and conditions",
    guaranteeTitle: "MONEY-BACK GUARANTEE",
    guaranteeText: "If you end up renting one of the properties I present, the €180 report fee is fully deducted from my commission.",
    guaranteeBold: "Zero risk for you.",
    badges: ["Secure Stripe payment", "Report in 24-48h", "WhatsApp support"],
    faqTitle: "FREQUENTLY ASKED QUESTIONS",
    faqs: [
      { q: "Why should I pay €180 for a report?", a: "Because it saves you weeks of inefficient searching. You get a professional analysis of the full market, verified by a local expert who knows every street in Frigiliana. Plus, if you rent one of my properties, I refund the €180." },
      { q: "What if I don't find anything I like?", a: "The report includes 6 months of follow-up. If nothing fits now, I'll notify you as soon as something new meets your criteria. The market changes constantly." },
      { q: "How long until I receive the report?", a: "Between 24 and 48 hours after our initial 15-minute call. I need to understand what you're looking for to personalise the analysis." },
      { q: "Can I see an example before buying?", a: "Yes, we have a demo report available with real data (partially anonymised). You can view it before deciding." },
    ],
    whatsappCta: "More questions? Message me on WhatsApp",
    finalTitle: "READY TO FIND YOUR HOME?",
    finalSub: "Stop searching blindly. Get your personalised report in 24-48h.",
    finalCta: "Buy Report Now — €180",
    stickyCta: "Buy Report — €180",
  },
};

const trustIcons = [MapPin, Clock, Home, Star];
const badgeIcons = [Shield, Clock, MessageCircle];

const Empezar = () => {
  const [lang, setLang] = useState<Lang>(() => {
    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get("lang");
    if (urlLang === "en" || urlLang === "es") return urlLang;
    return (localStorage.getItem("finder-lang") as Lang) || "es";
  });

  useEffect(() => {
    localStorage.setItem("finder-lang", lang);
  }, [lang]);

  const c = t[lang];
  const whatsapp = lang === "en" ? WHATSAPP_EN : WHATSAPP_ES;

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Helmet>
        <title>{c.metaTitle}</title>
        <meta name="description" content={c.metaDesc} />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Language toggle */}
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={() => setLang(lang === "es" ? "en" : "es")}
            className="bg-white/90 backdrop-blur-sm text-foreground text-sm font-semibold px-4 py-2 rounded-full shadow-lg border border-border hover:bg-white transition-colors"
          >
            {lang === "es" ? "EN" : "ES"}
          </button>
        </div>

        {/* ═══════════════════ HERO ═══════════════════ */}
        <section
          className="relative min-h-[90vh] flex items-center justify-center"
          style={{
            backgroundImage: `url(https://propaxar.com/wp-content/uploads/2026/01/Gemini_Generated_Image_wyt8u3wyt8u3wyt8.png)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/55" />
          <div className="relative z-10 max-w-[800px] mx-auto px-5 text-center py-20">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white/90 text-sm font-medium px-4 py-2 rounded-full mb-6">
              <MapPin className="w-4 h-4" /> Frigiliana · Nerja · Torrox
            </div>
            <h1 className="text-[32px] md:text-[54px] font-extrabold text-white leading-[1.08] mb-5">
              {c.heroH1}
            </h1>
            <p className="text-[18px] md:text-[22px] text-white/90 leading-relaxed mb-8 max-w-[650px] mx-auto">
              {c.heroSub}
            </p>
            <button
              onClick={() => scrollTo("problema")}
              className="inline-flex items-center gap-3 bg-white text-foreground text-lg font-semibold px-10 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
            >
              {c.heroCta}
              <ArrowDown className="w-5 h-5" />
            </button>
          </div>
        </section>

        {/* ═══════════════════ PROBLEM ═══════════════════ */}
        <section id="problema" className="py-16 md:py-24 bg-background">
          <div className="max-w-[700px] mx-auto px-5">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-10">
              {c.problemTitle}
            </h2>
            <div className="space-y-5">
              {c.pains.map((pain, i) => (
                <div key={i} className="flex items-start gap-4 bg-destructive/5 border border-destructive/20 rounded-xl p-5">
                  <X className="w-6 h-6 text-destructive shrink-0 mt-0.5" />
                  <p className="text-foreground text-[17px] leading-relaxed">{pain}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <button
                onClick={() => scrollTo("solucion")}
                className="inline-flex items-center gap-2 text-primary font-semibold text-lg hover:underline"
              >
                {c.betterWay} <ArrowDown className="w-5 h-5" />
              </button>
            </div>
          </div>
        </section>

        {/* ═══════════════════ SOLUTION ═══════════════════ */}
        <section id="solucion" className="py-16 md:py-24 bg-card">
          <div className="max-w-[800px] mx-auto px-5">
            <div className="text-center mb-12">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">{c.solutionLabel}</p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{c.solutionTitle}</h2>
              <p className="text-xl text-foreground-muted">{c.solutionSub}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
              {c.benefits.map((benefit, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-background rounded-xl">
                  <div className="w-7 h-7 rounded-full bg-success/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-success" />
                  </div>
                  <p className="text-foreground text-[16px]">{benefit}</p>
                </div>
              ))}
            </div>

            <div className="text-center bg-background border-2 border-primary/20 rounded-2xl p-8">
              <p className="text-4xl md:text-5xl font-extrabold text-foreground mb-2">€180</p>
              <p className="text-foreground-muted text-lg mb-6">{c.priceNote}</p>
              <a href="/demo-reporte" className="inline-flex items-center gap-2 btn-primary text-lg">
                {c.viewDemo} <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </section>

        {/* ═══════════════════ DEMO VISUAL ═══════════════════ */}
        <section className="py-16 md:py-24 bg-background">
          <div className="max-w-[800px] mx-auto px-5 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{c.demoTitle}</h2>
            <p className="text-lg text-foreground-muted mb-10 max-w-[550px] mx-auto">{c.demoSub}</p>

            <div className="relative rounded-2xl overflow-hidden border border-border shadow-xl mb-8 mx-auto max-w-[600px]">
              <div className="bg-card p-8 md:p-12 space-y-4">
                <div className="h-6 bg-primary/20 rounded w-3/4 mx-auto" />
                <div className="h-4 bg-primary/10 rounded w-full" />
                <div className="h-4 bg-primary/10 rounded w-5/6" />
                <div className="h-40 bg-primary/5 rounded-xl mt-4" />
                <div className="h-4 bg-primary/10 rounded w-2/3" />
                <div className="h-4 bg-primary/10 rounded w-4/5" />
                <div className="h-32 bg-primary/5 rounded-xl" />
              </div>
              <div className="absolute inset-0 backdrop-blur-[6px] bg-white/30 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Home className="w-8 h-8 text-primary" />
                  </div>
                  <p className="text-foreground font-bold text-xl mb-2">{c.demoLabel}</p>
                  <p className="text-foreground-muted text-sm">{c.demoHint}</p>
                </div>
              </div>
            </div>

            <a href="/demo-reporte" className="inline-flex items-center gap-2 btn-primary text-lg">
              {c.viewFullDemo} <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </section>

        {/* ═══════════════════ AUTHORITY ═══════════════════ */}
        <section className="py-16 md:py-24 bg-card">
          <div className="max-w-[800px] mx-auto px-5">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{c.trustTitle}</h2>
            </div>

            <div className="flex flex-col md:flex-row gap-10 items-center">
              <div className="shrink-0">
                <div className="w-[200px] h-[200px] rounded-full bg-primary/10 flex items-center justify-center overflow-hidden border-4 border-primary/20">
                  <img
                    src="https://propaxar.com/wp-content/uploads/2024/12/Manuel-Fernandez.jpg"
                    alt="Manuel Fernández, fundador de Propaxar"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="space-y-5">
                <h3 className="text-2xl font-bold text-foreground">Manuel Fernández</h3>
                <p className="text-foreground-muted text-[17px] leading-relaxed">{c.trustBio}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {c.trustStats.map((stat, i) => {
                    const Icon = trustIcons[i];
                    return (
                      <div key={i} className="flex items-center gap-3">
                        <Icon className="w-5 h-5 text-primary shrink-0" />
                        <span className="text-foreground text-[15px]">{stat.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════ HOW IT WORKS ═══════════════════ */}
        <section id="como-funciona" className="py-16 md:py-24 bg-background">
          <div className="max-w-[800px] mx-auto px-5">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">{c.howTitle}</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {["💳", "📞", "📋"].map((icon, i) => (
                <div key={i} className="text-center p-6">
                  <div className="text-5xl mb-4">{icon}</div>
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-bold mx-auto mb-4">
                    {i + 1}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{c.steps[i].title}</h3>
                  <p className="text-foreground-muted leading-relaxed">{c.steps[i].desc}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <a
                href={STRIPE_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 btn-primary text-xl px-12 py-5"
              >
                {c.ctaMain} <ArrowRight className="w-6 h-6" />
              </a>
              <p className="text-sm text-foreground-muted mt-3">
                {c.termsNote}{" "}
                <a href={TERMS_HREF} target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">
                  {c.termsLink}
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* ═══════════════════ GUARANTEE ═══════════════════ */}
        <section className="py-16 md:py-24 bg-card">
          <div className="max-w-[700px] mx-auto px-5 text-center">
            <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
              <Shield className="w-10 h-10 text-success" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{c.guaranteeTitle}</h2>
            <p className="text-lg text-foreground-muted leading-relaxed mb-8 max-w-[550px] mx-auto">
              {c.guaranteeText} <strong className="text-foreground">{c.guaranteeBold}</strong>
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              {c.badges.map((label, i) => {
                const Icon = badgeIcons[i];
                return (
                  <div key={i} className="flex items-center gap-2 text-foreground-muted text-sm">
                    <Icon className="w-4 h-4 text-primary" />
                    {label}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════════════════ FAQ ═══════════════════ */}
        <section className="py-16 md:py-24 bg-background">
          <div className="max-w-[700px] mx-auto px-5">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-10">{c.faqTitle}</h2>

            <Accordion type="single" collapsible className="space-y-4">
              {c.faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="bg-card border border-border rounded-xl px-6 shadow-sm"
                >
                  <AccordionTrigger className="text-left text-foreground font-semibold text-base md:text-lg hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-foreground-muted leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="text-center mt-8">
              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
              >
                <MessageCircle className="w-5 h-5" />
                {c.whatsappCta}
              </a>
            </div>
          </div>
        </section>

        {/* ═══════════════════ FINAL CTA ═══════════════════ */}
        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="max-w-[600px] mx-auto px-5 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{c.finalTitle}</h2>
            <p className="text-primary-foreground/80 text-lg mb-8">{c.finalSub}</p>

            <a
              href={STRIPE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white text-foreground text-xl font-bold px-12 py-5 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-0.5 mb-4"
            >
              {c.finalCta} <ArrowRight className="w-6 h-6" />
            </a>

            <p className="text-sm text-primary-foreground/70 mb-6">
              {c.termsNote}{" "}
              <a href={TERMS_HREF} target="_blank" rel="noopener noreferrer" className="underline hover:text-white">
                {c.termsLink}
              </a>
            </p>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-primary-foreground/70">
              <span className="flex items-center gap-1.5"><Shield className="w-4 h-4" /> {c.badges[0]} 🔒</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {c.badges[1]} ⚡</span>
            </div>
          </div>
        </section>

        {/* ═══════════════════ STICKY MOBILE CTA ═══════════════════ */}
        <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-card/95 backdrop-blur-sm border-t border-border p-3 text-center">
          <a
            href={STRIPE_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full btn-primary text-lg py-4"
          >
            {c.stickyCta}
          </a>
          <a href={TERMS_HREF} target="_blank" rel="noopener noreferrer" className="text-xs text-foreground-muted underline mt-1 inline-block">
            {c.termsLink}
          </a>
        </div>

        <div className="h-24 md:hidden" />
      </div>
    </>
  );
};

export default Empezar;
