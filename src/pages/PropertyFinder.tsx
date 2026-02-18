import { useState, useEffect } from "react";

type Lang = "es" | "en";

const STRIPE_PAYMENT_LINK = "https://buy.stripe.com/00w14p63G5Zc5EKfmxgEg02";
const EMAIL = "info@propaxar.com";
const PHONE = "+34 662 317 561";

// ─── translations ──────────────────────────────────────────────────────────────
const t = {
  headerSub: {
    es: "Tu Consultor Personal de Vivienda en La Axarquía",
    en: "Your Personal Housing Consultant in La Axarquía",
  },
  heroLabel:  { es: "REPORTE DE MERCADO PROPAXAR", en: "PROPAXAR MARKET REPORT" },
  heroTitle:  { es: "Tu Análisis Personalizado de Alquileres en Frigiliana", en: "Your Personalised Rental Analysis in Frigiliana" },
  heroDesc:   { es: "Deja de perder tiempo con propiedades irrelevantes. Recibe un análisis profesional adaptado a TU búsqueda específica.", en: "Stop wasting time on irrelevant properties. Receive a professional analysis tailored to YOUR specific search." },
  heroPill1:  { es: "Pago único €250", en: "One-time €250" },
  heroPill2:  { es: "Entrega 24-48h", en: "Delivered 24-48h" },
  heroPill3:  { es: "6 meses de seguimiento", en: "6 months follow-up" },
  heroCTA:    { es: "Proceder al Pago Seguro →", en: "Proceed to Secure Payment →" },
  heroSecure: { es: "🔒 Pago seguro procesado por Stripe", en: "🔒 Secure payment processed by Stripe" },

  investTitle: { es: "INVERSIÓN ÚNICA", en: "ONE-TIME INVESTMENT" },
  investVAT:   { es: "IVA incluido · Sin cargos recurrentes", en: "VAT included · No recurring charges" },

  includedTitle: { es: "Qué Incluye Tu Reporte", en: "What's Included in Your Report" },
  includedItems: {
    es: [
      { icon: "🔍", title: "4-8 Propiedades Seleccionadas", desc: "Escogidas manualmente para tu presupuesto, dormitorios, mascotas y fecha de entrada. Sin propiedades irrelevantes." },
      { icon: "📊", title: "Análisis Honesto del Mercado", desc: "Precios reales, disponibilidad actual e información privilegiada que solo un experto local conoce." },
      { icon: "⭐", title: "Recomendación Clara", desc: "Qué propiedad se ajusta mejor a tu perfil y por qué. Ahorra horas de confusión y decisiones equivocadas." },
      { icon: "🗺️", title: "Guía Logística Completa", desc: "Vida campo vs pueblo, entrega de paquetes, sistemas de agua, recogida de basura. La verdad que nadie cuenta." },
      { icon: "🔄", title: "6 Meses de Seguimiento", desc: "Actualizaciones semanales con nuevas propiedades, cambios de precios e insights del mercado hasta que encuentres." },
      { icon: "🎁", title: "Reembolso Total Garantizado", desc: "Si alquilas una propiedad Propaxar Direct, reembolsamos los €250 completos. Literalmente no arriesgas nada." },
    ],
    en: [
      { icon: "🔍", title: "4-8 Hand-Selected Properties", desc: "Chosen manually for your budget, bedrooms, pets, and move-in date. No irrelevant listings." },
      { icon: "📊", title: "Honest Market Analysis", desc: "Real prices, current availability, and insider information only a local expert knows." },
      { icon: "⭐", title: "Clear Recommendation", desc: "Which property fits your profile best and why. Save hours of confusion and wrong decisions." },
      { icon: "🗺️", title: "Complete Logistics Guide", desc: "Country vs town living, package delivery, water systems, waste collection. The truth nobody tells you." },
      { icon: "🔄", title: "6 Months Follow-Up", desc: "Weekly updates with new properties, price changes, and market insights until you find your home." },
      { icon: "🎁", title: "Full Refund Guaranteed", desc: "If you rent a Propaxar Direct property, we refund the full €250. You literally risk nothing." },
    ],
  },

  guaranteeTitle: { es: "Garantía de Satisfacción", en: "Satisfaction Guarantee" },
  guaranteeDesc:  {
    es: "Si no estás satisfecho con la calidad del reporte, contáctame en los primeros 7 días y lo resolveremos. Mi reputación depende de clientes felices, no de ventas forzadas.",
    en: "If you're not satisfied with the report quality, contact me within the first 7 days and we'll make it right. My reputation depends on happy clients, not forced sales.",
  },
  guaranteeAuthor: { es: "Manuel Fernandez · 10+ años viviendo en Frigiliana · Experto local en mercado inmobiliario rural", en: "Manuel Fernandez · 10+ years living in Frigiliana · Local expert in rural real estate market" },

  testimonialsTitle: { es: "Qué Dicen los Clientes", en: "What Clients Say" },
  testimonials: {
    es: [
      { quote: "Este reporte me ahorró semanas. Habría mirado 10+ casas equivocadas. Manuel me mostró exactamente qué encajaba con mi presupuesto y necesidades.", name: "Katinka D.", origin: "Países Bajos · Mudada a Frigiliana Feb 2026" },
      { quote: "Estaba lista para pagar €1,600 por una casa que ni siquiera me gustaba. El reporte me ayudó a encontrar una mejor a €900. Vale cada euro.", name: "Cliente Verificada", origin: "Europa · Feb 2026" },
      { quote: "Solo la sección de logística vale €250. Nadie te habla de entrega de paquetes, sistemas de agua o recogida de basura hasta que ya estás mudado y batallando.", name: "Cliente Verificado", origin: "Europa · Ene 2026" },
    ],
    en: [
      { quote: "This report saved me weeks. I would have viewed 10+ wrong houses. Manuel showed me exactly what matched my budget and needs.", name: "Katinka D.", origin: "Netherlands · Moved to Frigiliana Feb 2026" },
      { quote: "I was about to pay €1,600 for a house I didn't even like. The report helped me find a better one at €900. Worth every cent.", name: "Verified Client", origin: "Europe · Feb 2026" },
      { quote: "The logistics section alone is worth €250. Nobody tells you about package delivery, water systems or waste collection until you're already moved in and struggling.", name: "Verified Client", origin: "Europe · Jan 2026" },
    ],
  },

  faqTitle: { es: "Preguntas Frecuentes", en: "Frequently Asked Questions" },
  faqs: {
    es: [
      { q: "¿Cuánto tarda?", a: "24-48 horas después de la compra. Entrega urgente disponible si necesitas antes." },
      { q: "¿Y si no encuentro nada en el reporte?", a: "Por eso incluimos 6 meses de seguimiento. Actualizaré tu reporte cada semana con nuevas propiedades hasta que encuentres tu hogar." },
      { q: "¿Y si ninguna propiedad encaja con mi presupuesto?", a: "Te diré la verdad sobre la realidad del mercado. Si tu presupuesto es poco realista, lo sabrás antes de perder tiempo. El reporte te ayuda a ajustar expectativas o presupuesto en consecuencia." },
      { q: "¿Es solo para Frigiliana?", a: "Sí. Me especializo exclusivamente en Frigiliana y zonas rurales circundantes (Axarquía). El conocimiento local profundo es lo que hace esto valioso." },
      { q: "¿Cuál es la política de reembolso?", a: "Si alquilas una propiedad gestionada Propaxar Direct, reembolso completo. Si no estás contento con la calidad del reporte, lo resolveremos. Mi reputación depende de clientes felices." },
      { q: "¿Tengo que usar Propaxar para alquilar?", a: "No. El reporte es tuyo. Puedes usarlo como quieras. Solo espero que cuando veas el valor, elijas trabajar conmigo para el alquiler." },
    ],
    en: [
      { q: "How long does it take?", a: "24-48 hours after purchase. Express delivery available if you need it sooner." },
      { q: "What if I don't find anything in the report?", a: "That's why we include 6 months of follow-up. I'll update your report every week with new properties until you find your home." },
      { q: "What if no property fits my budget?", a: "I'll tell you the truth about market reality. If your budget is unrealistic, you'll know before wasting time. The report helps you adjust expectations or budget accordingly." },
      { q: "Is it only for Frigiliana?", a: "Yes. I specialise exclusively in Frigiliana and surrounding rural areas (Axarquía). Deep local knowledge is what makes this valuable." },
      { q: "What is the refund policy?", a: "If you rent a Propaxar Direct managed property, full refund. If you're unhappy with the report quality, we'll sort it out. My reputation depends on happy clients." },
      { q: "Do I have to use Propaxar to rent?", a: "No. The report is yours. Use it however you want. I just hope that once you see the value, you'll choose to work with me for the rental." },
    ],
  },

  finalTitle:    { es: "¿Listo Para Tu Reporte Personalizado?", en: "Ready for Your Personalised Report?" },
  finalDesc:     { es: "Entrega en 24-48h · Soporte 6 meses incluido · Sin suscripciones", en: "Delivered in 24-48h · 6 months support included · No subscriptions" },
  finalCTA:      { es: "Pagar €250 Ahora →", en: "Pay €250 Now →" },
  finalSecure:   { es: "🔒 Pago 100% seguro vía Stripe · Sin suscripciones", en: "🔒 100% secure payment via Stripe · No subscriptions" },
  finalQuestion: { es: "¿Preguntas antes de comprar?", en: "Questions before purchasing?" },
  finalTerms:    { es: "Al proceder al pago, aceptas los", en: "By proceeding to payment, you accept the" },
  finalTermsLink:{ es: "Términos y Condiciones", en: "Terms & Conditions" },

  footerRights: { es: "Todos los derechos reservados.", en: "All rights reserved." },
  footerSub:    { es: "Especialistas en Frigiliana · La Axarquía · Costa del Sol", en: "Specialists in Frigiliana · La Axarquía · Costa del Sol" },
};

const tr = (key: keyof typeof t, lang: Lang): string => {
  const entry = t[key] as Record<Lang, string>;
  return entry[lang] ?? "";
};

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-[#e5e7eb] rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left font-semibold text-[#333] hover:bg-[#f8faff] transition-colors"
      >
        <span>{q}</span>
        <span className={`text-[#2c5282] text-xl transition-transform duration-200 ${open ? "rotate-45" : ""}`}>+</span>
      </button>
      {open && (
        <div className="px-6 pb-5 text-[#555] leading-relaxed border-t border-[#e5e7eb] pt-4 bg-[#fafbff]">
          {a}
        </div>
      )}
    </div>
  );
}

// ─── main component ──────────────────────────────────────────────────────────
const PropertyFinder = () => {
  const [lang, setLang] = useState<Lang>(() => {
    try { return localStorage.getItem("finder-lang") === "en" ? "en" : "es"; }
    catch { return "es"; }
  });

  useEffect(() => {
    try { localStorage.setItem("finder-lang", lang); } catch {}
  }, [lang]);

  const handlePay = () => {
    window.location.href = STRIPE_PAYMENT_LINK;
  };

  const termsHref = lang === "en" ? "/terminos-finder?lang=en" : "/terminos-finder";
  const includedItems = t.includedItems[lang];
  const testimonials = t.testimonials[lang];
  const faqs = t.faqs[lang];

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>

      {/* ── HEADER ──────────────────────────────────────────────────────────── */}
      <header className="bg-white border-b border-[#e5e7eb] py-4 sticky top-0 z-50 shadow-sm">
        <div className="max-w-[900px] mx-auto px-5 flex items-center justify-between">
          <a href="https://propaxar.es" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img
              src="https://propaxar.com/wp-content/uploads/2024/08/logo_small_icon_only_inverted_orDKnNi.png"
              alt="Propaxar"
              className="h-9 w-auto"
            />
            <div>
              <p className="text-2xl font-bold text-[#2c5282] tracking-tight leading-tight">PROPAXAR</p>
              <p className="text-[#666] text-xs">{tr("headerSub", lang)}</p>
            </div>
          </a>

          <div className="flex items-center gap-3">
            {/* Pay CTA in header */}
            <button
              onClick={handlePay}
              className="hidden sm:inline-block bg-[#48bb78] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#38a169] transition-colors"
            >
              {lang === "es" ? "Pagar €250 →" : "Pay €250 →"}
            </button>
            {/* Language selector */}
            <div className="flex items-center gap-0.5 text-sm font-medium text-[#333] shrink-0 border border-[#e5e7eb] rounded-lg overflow-hidden">
              <button
                onClick={() => setLang("es")}
                className={`px-3 py-1.5 transition-colors ${lang === "es" ? "bg-[#2c5282] text-white" : "hover:bg-[#f0f4ff]"}`}
              >
                🇪🇸 ES
              </button>
              <button
                onClick={() => setLang("en")}
                className={`px-3 py-1.5 transition-colors ${lang === "en" ? "bg-[#2c5282] text-white" : "hover:bg-[#f0f4ff]"}`}
              >
                🇬🇧 EN
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24" style={{ background: "linear-gradient(135deg, #1e3a5f 0%, #2c5282 60%, #3b6cb7 100%)" }}>
        <div className="max-w-[900px] mx-auto px-5 text-center">
          <span className="inline-block bg-[#ffd700]/20 text-[#ffd700] text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6 border border-[#ffd700]/30">
            {tr("heroLabel", lang)}
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-5">
            {tr("heroTitle", lang)}
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-[620px] mx-auto mb-8 leading-relaxed">
            {tr("heroDesc", lang)}
          </p>
          {/* pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {[tr("heroPill1", lang), tr("heroPill2", lang), tr("heroPill3", lang)].map((pill, i) => (
              <span key={i} className="bg-white/15 backdrop-blur-sm text-white text-sm font-medium px-4 py-2 rounded-full border border-white/20">
                ✓ {pill}
              </span>
            ))}
          </div>

          {/* Price highlight */}
          <div className="inline-block bg-white/10 border border-white/20 rounded-2xl px-10 py-6 mb-8">
            <p className="text-white/70 text-xs font-bold tracking-widest uppercase mb-1">{tr("investTitle", lang)}</p>
            <p className="text-6xl font-extrabold text-white mb-1">€250</p>
            <p className="text-white/60 text-sm">{tr("investVAT", lang)}</p>
          </div>

          <div className="flex flex-col items-center gap-3">
            <button
              onClick={handlePay}
              className="bg-[#48bb78] hover:bg-[#38a169] text-white text-xl font-extrabold px-12 py-5 rounded-xl shadow-2xl hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(72,187,120,0.4)] transition-all duration-200"
            >
              {tr("heroCTA", lang)}
            </button>
            <p className="text-white/50 text-xs">{tr("heroSecure", lang)}</p>
          </div>
        </div>
      </section>

      {/* ── WHAT'S INCLUDED ─────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-[#f8faff]">
        <div className="max-w-[900px] mx-auto px-5">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a5f] text-center mb-12">{tr("includedTitle", lang)}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {includedItems.map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-[#e8f0fe] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                <div className="flex gap-4 items-start">
                  <span className="text-3xl shrink-0">{item.icon}</span>
                  <div>
                    <h3 className="font-bold text-[#1e3a5f] mb-1.5">{item.title}</h3>
                    <p className="text-[#555] text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GUARANTEE ───────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-[700px] mx-auto px-5">
          <div className="bg-[#f0fff4] border-2 border-[#48bb78]/40 rounded-2xl p-8 text-center">
            <div className="text-5xl mb-4">💯</div>
            <h2 className="text-2xl font-bold text-[#1e3a5f] mb-4">{tr("guaranteeTitle", lang)}</h2>
            <p className="text-[#555] leading-relaxed mb-6">{tr("guaranteeDesc", lang)}</p>
            <p className="text-[#2d6a4f] font-semibold text-sm">{tr("guaranteeAuthor", lang)}</p>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-[#f8faff]">
        <div className="max-w-[900px] mx-auto px-5">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a5f] text-center mb-10">{tr("testimonialsTitle", lang)}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-6 border border-[#e8f0fe]">
                <p className="text-[#333] text-sm leading-relaxed mb-4 italic">"{item.quote}"</p>
                <p className="font-bold text-[#2c5282] text-sm">— {item.name}</p>
                <p className="text-[#888] text-xs mt-0.5">{item.origin}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-[700px] mx-auto px-5">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a5f] text-center mb-10">{tr("faqTitle", lang)}</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => <FaqItem key={i} q={faq.q} a={faq.a} />)}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ───────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24" style={{ background: "linear-gradient(135deg, #1e3a5f, #2c5282)" }}>
        <div className="max-w-[700px] mx-auto px-5 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">{tr("finalTitle", lang)}</h2>
          <p className="text-white/70 mb-10 text-lg">{tr("finalDesc", lang)}</p>

          <button
            onClick={handlePay}
            className="bg-[#48bb78] hover:bg-[#38a169] text-white text-xl font-extrabold px-12 py-5 rounded-xl shadow-2xl hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(72,187,120,0.4)] transition-all duration-200 mb-4"
          >
            {tr("finalCTA", lang)}
          </button>

          <p className="text-white/50 text-sm mb-8">{tr("finalSecure", lang)}</p>

          {/* Contact */}
          <div className="border-t border-white/10 pt-8">
            <p className="text-white/60 text-sm mb-4">{tr("finalQuestion", lang)}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://wa.me/34662317561"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25d366] hover:bg-[#1ebe57] text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center gap-2 text-sm"
              >
                💬 WhatsApp: {PHONE}
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center gap-2 text-sm"
              >
                📧 {EMAIL}
              </a>
            </div>
          </div>

          {/* Terms */}
          <p className="text-white/30 text-xs mt-8">
            {tr("finalTerms", lang)}{" "}
            <a href={termsHref} target="_blank" rel="noopener noreferrer" className="underline hover:text-white/60">
              {tr("finalTermsLink", lang)}
            </a>
          </p>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────────── */}
      <footer className="py-8 bg-[#1a1a2e] text-center text-[#888] text-sm">
        <img
          src="https://propaxar.com/wp-content/uploads/2024/08/logo_small_icon_only_inverted_orDKnNi.png"
          alt="Propaxar"
          className="h-7 mx-auto mb-3 opacity-60"
        />
        <p className="text-[#ccc] font-semibold mb-0.5">PROPAXAR</p>
        <p className="text-[#666] text-xs mb-3">{tr("footerSub", lang)}</p>
        <p className="text-[#555] text-xs">
          <a href={`mailto:${EMAIL}`} className="hover:text-[#888]">{EMAIL}</a>
          {" · "}
          <a href="https://wa.me/34662317561" target="_blank" rel="noopener noreferrer" className="hover:text-[#888]">{PHONE}</a>
          {" · "}
          <a href="https://propaxar.es" target="_blank" rel="noopener noreferrer" className="hover:text-[#888]">propaxar.es</a>
        </p>
        <p className="mt-3 text-[#444] text-xs">© {new Date().getFullYear()} Propaxar. {tr("footerRights", lang)}</p>
      </footer>
    </div>
  );
};

export default PropertyFinder;
