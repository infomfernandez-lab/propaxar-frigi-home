import { useState, useEffect } from "react";

type Lang = "es" | "en";

const translations = {
  header: { es: "Tu Consultor Personal de Vivienda en La Axarquía", en: "Your Personal Housing Consultant in La Axarquía" },
  heroTitle: { es: "Property Finder Service", en: "Property Finder Service" },
  heroDesc: { es: "Encuentra tu casa perfecta en La Axarquía. Sin perder tiempo. Sin visitar propiedades incorrectas.", en: "Find your perfect home in La Axarquía. No wasted time. No wrong properties." },
  initialPayment: { es: "Pago inicial · No reembolsable*", en: "Initial payment · Non-refundable*" },
  initialPaymentNote: { es: "*Excepto si alquilas propiedad gestionada por Propaxar (ver detalles abajo)", en: "*Except if you rent a property managed by Propaxar (see details below)" },
  plusRent: { es: "+ €220 cuando alquiles una de nuestras propiedades", en: "+ €220 when you rent one of our properties" },
  orFree: { es: "o €0 si alquilas propiedad Propaxar", en: "or €0 if you rent Propaxar property" },
  benefits: {
    es: [
      { icon: "🔍", title: "Búsqueda Exhaustiva del Mercado", description: "Rastreamos TODO: Idealista, Fotocasa, agencias locales, y propiedades off-market que nadie más conoce." },
      { icon: "⭐", title: "Solo las MEJORES Propiedades", description: "No pierdes tiempo viendo casas incorrectas. Te muestro solo las mejores que cumplen tus criterios." },
      { icon: "🗓️", title: "Coordinación Completa de Visitas", description: "Yo organizo todo con propietarios y agentes. Tú solo vienes y ves las mejores opciones." },
      { icon: "🏆", title: "10 Años de Experiencia Local", description: "Conozco cada rincón, cada calle, cada oportunidad. Te evito errores costosos que un extranjero no ve." },
      { icon: "⚡", title: "Resultados en 48-72 Horas", description: "Recibes tu selección de propiedades en 2-3 días. Nada de esperar semanas para ver opciones." },
    ],
    en: [
      { icon: "🔍", title: "Exhaustive Market Search", description: "We search EVERYTHING: Idealista, Fotocasa, local agencies, and off-market properties nobody else knows about." },
      { icon: "⭐", title: "Only the BEST Properties", description: "No wasting time viewing wrong homes. We show you only the best ones that match your criteria." },
      { icon: "🗓️", title: "Full Visit Coordination", description: "We organise everything with owners and agents. You just come and see the best options." },
      { icon: "🏆", title: "10 Years of Local Experience", description: "We know every corner, every street, every opportunity. We help you avoid costly mistakes foreigners don't see." },
      { icon: "⚡", title: "Results in 48-72 Hours", description: "You receive your property selection in 2-3 days. No waiting weeks to see options." },
    ],
  },
  pricingTitle: { es: "Cómo Funciona el Pago", en: "How Payment Works" },
  pricingStep1Title: { es: "PASO 1: €180 al contratar", en: "STEP 1: €180 upon booking" },
  pricingStep1Note: { es: "(No reembolsable, cubre búsqueda exhaustiva)", en: "(Non-refundable, covers exhaustive search)" },
  pricingStep2Title: { es: "PASO 2: Depende de qué propiedad alquilas", en: "STEP 2: Depends on which property you rent" },
  pricingOptionA: { es: "Opción A - Propiedad de TERCEROS:", en: "Option A - THIRD-PARTY Property:" },
  pricingOptionADetail: { es: "+ €220 adicionales = €400 TOTAL", en: "+ €220 additional = €400 TOTAL" },
  pricingOptionB: { es: "Opción B - Propiedad PROPAXAR:", en: "Option B - PROPAXAR Property:" },
  pricingOptionBDetail: { es: "€0 adicionales (reembolso de €180) = GRATIS ✨", en: "€0 additional (€180 refund) = FREE ✨" },
  pricingOptionC: { es: "Opción C - No alquilas ninguna:", en: "Option C - You don't rent any:" },
  pricingOptionCDetail: { es: "Solo €180 (búsqueda ya realizada)", en: "Only €180 (search already completed)" },
  pricingFootnote: { es: "Algunas de las mejores propiedades de La Axarquía las gestionamos directamente. Si tu casa perfecta es una de estas, el servicio te sale GRATIS.", en: "Some of the best properties in La Axarquía are managed directly by us. If your perfect home is one of these, the service is FREE." },
  advantageTitle: { es: "✨ VENTAJA EXCLUSIVA PROPAXAR", en: "✨ EXCLUSIVE PROPAXAR ADVANTAGE" },
  advantageDesc: { es: "Si encuentras tu casa perfecta entre nuestras propiedades gestionadas directamente:", en: "If you find your perfect home among our directly managed properties:" },
  advantageFree: { es: "💰 SERVICIO COMPLETAMENTE GRATIS", en: "💰 COMPLETELY FREE SERVICE" },
  advantageRefund: { es: "(Reembolso íntegro de los €180)", en: "(Full refund of €180)" },
  advantageNote: { es: "Gestionamos algunas de las mejores propiedades de Frigiliana, Nerja y Cómpeta sin intermediarios.", en: "We manage some of the best properties in Frigiliana, Nerja and Cómpeta without intermediaries." },
  ctaTitle: { es: "Reserva Tu Servicio Ahora", en: "Book Your Service Now" },
  termsLabel: { es: "He leído y acepto los", en: "I have read and accept the" },
  termsLink: { es: "Términos del Servicio", en: "Terms of Service" },
  termsError: { es: "Debes aceptar los términos del servicio", en: "You must accept the terms of service" },
  ctaButton: { es: "RESERVAR MI BÚSQUEDA - €180", en: "BOOK MY SEARCH - €180" },
  securePay: { es: "🔒 Pago 100% seguro con Stripe · Procesamiento instantáneo", en: "🔒 100% secure payment with Stripe · Instant processing" },
  contactTitle: { es: "¿Dudas Antes de Contratar?", en: "Have Questions Before Booking?" },
  contactSub: { es: "Habla conmigo directamente", en: "Talk to me directly" },
  footerRights: { es: "Todos los derechos reservados.", en: "All rights reserved." },
};

const STRIPE_PAYMENT_LINK = "https://buy.stripe.com/4gw9E38Tn3sQ2Oc6oo";

const PropertyFinder = () => {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showTermsError, setShowTermsError] = useState(false);
  const [lang, setLang] = useState<Lang>(() => {
    try {
      const saved = localStorage.getItem("finder-lang");
      return saved === "en" ? "en" : "es";
    } catch { return "es"; }
  });

  const t = (key: keyof typeof translations) => (translations[key] as Record<Lang, string>)[lang];

  useEffect(() => {
    localStorage.setItem("finder-lang", lang);
  }, [lang]);

  const benefits = translations.benefits[lang];
  const termsHref = lang === "en" ? "/terminos-finder?lang=en" : "/terminos-finder";

  const handleBooking = () => {
    if (!termsAccepted) {
      setShowTermsError(true);
      return;
    }
    window.location.href = STRIPE_PAYMENT_LINK;
  };

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
      {/* Header */}
      <header className="bg-white border-b border-[#e5e7eb] py-6">
        <div className="max-w-[800px] mx-auto px-5 flex items-center justify-between">
          <a href="https://propaxar.es" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img
              src="https://propaxar.com/wp-content/uploads/2024/08/logo_small_icon_only_inverted_orDKnNi.png"
              alt="Propaxar"
              className="h-10 w-auto"
            />
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-[#2c5282] tracking-tight">PROPAXAR</h1>
              <p className="text-[#666] mt-1 text-base">{t("header")}</p>
            </div>
          </a>
          {/* Language Selector */}
          <div className="flex items-center gap-1 text-sm font-medium text-[#333] shrink-0">
            <button
              onClick={() => setLang("es")}
              className={`px-2 py-1 transition-colors ${lang === "es" ? "text-[#2c5282] underline underline-offset-4 font-bold" : "hover:text-[#2c5282]"}`}
            >
              🇪🇸 ES
            </button>
            <span className="text-[#ccc]">|</span>
            <button
              onClick={() => setLang("en")}
              className={`px-2 py-1 transition-colors ${lang === "en" ? "text-[#2c5282] underline underline-offset-4 font-bold" : "hover:text-[#2c5282]"}`}
            >
              🇬🇧 EN
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-[#f5f5f5] py-12 md:py-16">
        <div className="max-w-[800px] mx-auto px-5 text-center">
          <span className="text-5xl md:text-6xl block mb-4" role="img" aria-label="house">🏠</span>
          <h2 className="text-2xl md:text-3xl font-bold text-[#333] mb-3">{t("heroTitle")}</h2>
          <p className="text-[#666] text-lg max-w-[600px] mx-auto mb-8">{t("heroDesc")}</p>
          <a href="#cta-section" className="inline-block bg-white rounded-xl shadow-lg px-8 py-6 cursor-pointer hover:-translate-y-1 hover:shadow-xl transition-all duration-200">
            <p className="text-[36px] md:text-[48px] font-extrabold text-[#48bb78] leading-none">€180</p>
            <p className="text-[#666] text-sm mt-2 font-medium">{t("initialPayment")}</p>
            <p className="text-[#999] text-xs mt-1">{t("plusRent")}</p>
            <p className="text-[#48bb78] text-xs mt-1 font-medium">{t("orFree")}</p>
            <p className="text-[#999] text-[10px] mt-2 max-w-[250px] mx-auto leading-tight">{t("initialPaymentNote")}</p>
          </a>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12 md:py-16">
        <div className="max-w-[800px] mx-auto px-5">
          <div className="space-y-8">
            {benefits.map((b, i) => (
              <div key={i} className="flex gap-5 items-start">
                <span className="text-3xl md:text-4xl shrink-0 mt-0.5">{b.icon}</span>
                <div>
                  <h3 className="text-lg font-bold text-[#333] mb-1">{b.title}</h3>
                  <p className="text-[#666] leading-relaxed">{b.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Model */}
      <section className="py-12 md:py-16 bg-[#f5f5f5]">
        <div className="max-w-[800px] mx-auto px-5">
          <div className="bg-[#fffbeb] border-2 border-[#ffd700] rounded-xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-3xl">💰</span>
              <h3 className="text-xl md:text-2xl font-bold text-[#333]">{t("pricingTitle")}</h3>
            </div>
            <div className="space-y-5 text-[#333]">
              {/* Step 1 */}
              <div>
                <p className="font-bold text-lg">{t("pricingStep1Title")}</p>
                <p className="text-[#666] text-sm">{t("pricingStep1Note")}</p>
              </div>

              <hr className="border-[#ffd700]/50" />

              {/* Step 2 */}
              <div>
                <p className="font-bold text-lg mb-3">{t("pricingStep2Title")}</p>
                <div className="space-y-3 ml-2">
                  <div className="bg-white/60 rounded-lg p-3">
                    <p className="font-semibold text-[#333]">{t("pricingOptionA")}</p>
                    <p className="text-[#666]">{t("pricingOptionADetail")}</p>
                  </div>
                  <div className="bg-[#f0fff4] rounded-lg p-3 border border-[#48bb78]/30">
                    <p className="font-semibold text-[#48bb78]">{t("pricingOptionB")}</p>
                    <p className="text-[#48bb78] font-bold">{t("pricingOptionBDetail")}</p>
                  </div>
                  <div className="bg-white/60 rounded-lg p-3">
                    <p className="font-semibold text-[#333]">{t("pricingOptionC")}</p>
                    <p className="text-[#666]">{t("pricingOptionCDetail")}</p>
                  </div>
                </div>
              </div>

              <hr className="border-[#ffd700]/50" />

              <p className="text-[#666] text-sm italic text-center">{t("pricingFootnote")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Exclusive Advantage */}
      <section className="py-12 md:py-16">
        <div className="max-w-[800px] mx-auto px-5">
          <div className="bg-[#f0fff4] border-2 border-[#48bb78] rounded-xl p-6 md:p-8 text-center">
            <h3 className="text-xl md:text-2xl font-bold text-[#333] mb-3">{t("advantageTitle")}</h3>
            <p className="text-[#666] mb-4">{t("advantageDesc")}</p>
            <p className="text-2xl md:text-3xl font-extrabold text-[#48bb78] mb-1">{t("advantageFree")}</p>
            <p className="text-[#48bb78] font-medium mb-4">{t("advantageRefund")}</p>
            <p className="text-[#666] text-sm">{t("advantageNote")}</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta-section" className="py-12 md:py-16" style={{ background: "linear-gradient(135deg, #667eea, #764ba2)" }}>
        <div className="max-w-[800px] mx-auto px-5 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">{t("ctaTitle")}</h3>

          <div className="bg-white/15 backdrop-blur-sm rounded-lg p-5 inline-block mb-6">
            <label className="flex items-center gap-3 cursor-pointer text-white select-none">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => {
                  setTermsAccepted(e.target.checked);
                  if (e.target.checked) setShowTermsError(false);
                }}
                className="w-5 h-5 rounded accent-[#48bb78] cursor-pointer"
              />
              <span className="text-sm md:text-base">
                {t("termsLabel")}{" "}
                <a
                  href={termsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline font-medium hover:text-[#ffd700] transition-colors"
                >
                  {t("termsLink")}
                </a>
              </span>
            </label>
          </div>

          {showTermsError && (
            <p className="text-[#ff6b6b] text-sm font-medium mb-4">{t("termsError")}</p>
          )}

          <div>
            <button
              onClick={handleBooking}
              className={`text-white text-lg md:text-xl font-bold px-10 py-5 rounded-xl shadow-lg transition-all duration-200 ${
                termsAccepted
                  ? "bg-[#48bb78] hover:bg-[#38a169] hover:-translate-y-0.5 hover:shadow-xl cursor-pointer"
                  : "bg-gray-400 cursor-not-allowed opacity-60"
              }`}
            >
              {t("ctaButton")}
            </button>
          </div>

          <p className="text-white/80 text-sm mt-5">{t("securePay")}</p>
        </div>
      </section>

      {/* Contact */}
      <section className="py-12 md:py-16 bg-[#f7fafc]">
        <div className="max-w-[800px] mx-auto px-5 text-center">
          <h3 className="text-2xl font-bold text-[#333] mb-2">{t("contactTitle")}</h3>
          <p className="text-[#666] mb-6">{t("contactSub")}</p>
          <a
            href="https://wa.me/34662317561?text=Hola%20Manuel,%20tengo%20preguntas%20sobre%20el%20Property%20Finder"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25d366] hover:bg-[#1da851] text-white text-lg font-bold px-8 py-4 rounded-full shadow-lg transition-all duration-200 hover:-translate-y-0.5"
          >
            📱 WhatsApp {lang === "es" ? "Directo" : "Direct"}
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-[#999] text-sm border-t border-[#e5e7eb]">
        <p>© {new Date().getFullYear()} Propaxar. {t("footerRights")}</p>
        <p className="mt-1">Property Finder Service · La Axarquía, Costa del Sol, Málaga, {lang === "es" ? "España" : "Spain"}</p>
      </footer>
    </div>
  );
};

export default PropertyFinder;
