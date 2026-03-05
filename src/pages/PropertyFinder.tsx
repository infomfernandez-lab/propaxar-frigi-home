import { useState, useEffect, useRef } from "react";

type Lang = "es" | "en";

const STRIPE_PAYMENT_LINK = "https://buy.stripe.com/bJe14pbo0drEebg6Q1gEg03";
const WHATSAPP_BASE = "https://wa.me/34662317561";
const EMAIL = "info@propaxar.com";
const PHONE = "+34 662 317 561";

// ─── translations ──────────────────────────────────────────────────────────────
const t = {
  // header
  headerSub: {
    es: "Tu Consultor Personal de Vivienda en La Axarquía",
    en: "Your Personal Housing Consultant in La Axarquía",
  },

  // hero
  heroLabel:  { es: "REPORTE DE MERCADO PROPAXAR", en: "PROPAXAR MARKET REPORT" },
  heroTitle:  { es: "Tu Análisis Personalizado de Alquileres en Frigiliana", en: "Your Personalised Rental Analysis in Frigiliana" },
  heroDesc:   { es: "Deja de perder tiempo con propiedades irrelevantes. Recibe un reporte profesional adaptado a TU búsqueda.", en: "Stop wasting time on irrelevant properties. Receive a professional report tailored to YOUR search." },
  heroPill1:  { es: "€180 · Pago único", en: "€180 · One-time payment" },
  heroPill2:  { es: "Entrega 24-48h", en: "Delivered in 24-48h" },
  heroPill3:  { es: "6 meses de seguimiento incluido", en: "6 months follow-up included" },
  heroCTA:    { es: "SOLICITA TU REPORTE →", en: "GET YOUR REPORT →" },

  // what's included
  includedTitle: { es: "Qué Incluye Tu Reporte", en: "What's Included in Your Report" },
  includedItems: {
    es: [
      { icon: "🔍", title: "Análisis Personalizado (4-8 propiedades)", desc: "Propiedades seleccionadas manualmente que encajan con TU presupuesto, dormitorios, mascotas y fecha de entrada. Sin listados genéricos." },
      { icon: "📊", title: "Realidad Honesta del Mercado", desc: "Precios reales, disponibilidad e información privilegiada que solo un experto local conoce. Sin filtros." },
      { icon: "⭐", title: "Recomendación Profesional", desc: "Orientación clara sobre qué propiedad se ajusta mejor a TU perfil y por qué. Ahorra horas de confusión." },
      { icon: "🗺️", title: "Guía Logística", desc: "Vida campo vs pueblo, entrega de paquetes, sistemas de agua, recogida de basura — la verdad que nadie más te cuenta." },
      { icon: "🔄", title: "Seguimiento 6 Meses", desc: "Actualizaciones semanales con nuevas propiedades, cambios de precios e insights del mercado hasta que encuentres tu hogar." },
      { icon: "💚", title: "Reembolso Total si Alquilas con Nosotros", desc: "Si acabas alquilando una propiedad Propaxar Direct, reembolsamos el 100% del coste del reporte." },
    ],
    en: [
      { icon: "🔍", title: "Personalised Analysis (4-8 properties)", desc: "Hand-picked properties matching YOUR budget, bedrooms, pets and move-in date. No generic listings." },
      { icon: "📊", title: "Honest Market Reality", desc: "Real prices, availability and insider knowledge only a local expert holds. No filters." },
      { icon: "⭐", title: "Professional Recommendation", desc: "Clear guidance on which property best suits YOUR profile and why. Save hours of confusion." },
      { icon: "🗺️", title: "Logistics Guide", desc: "Country vs town living, package delivery, water systems, waste collection — the truth nobody else tells you." },
      { icon: "🔄", title: "6-Month Follow-up", desc: "Weekly updates with new properties, price changes and market insights until you find your home." },
      { icon: "💚", title: "Full Refund if You Rent with Us", desc: "If you end up renting a Propaxar Direct property, we refund 100% of the report cost." },
    ],
  },

  // how it works
  howTitle: { es: "Proceso Simple en 3 Pasos", en: "Simple 3-Step Process" },
  howSteps: {
    es: [
      { num: "1", icon: "💳", title: "Compra y Cuéntanos Tus Necesidades", desc: "Completa el pago y rellena el formulario rápido: presupuesto, dormitorios, mascotas, fecha de entrada, preferencias." },
      { num: "2", icon: "🏡", title: "Creamos Tu Reporte Personalizado", desc: "Yo personalmente analizo el mercado, selecciono propiedades, verifico disponibilidad y construyo tu reporte. Entrega en 24-48h." },
      { num: "3", icon: "📬", title: "Recibe y Obtén Actualizaciones Semanales", desc: "Tu URL personalizada permanece activa 6 meses. Cada viernes la actualizo con nuevas propiedades y cambios del mercado." },
    ],
    en: [
      { num: "1", icon: "💳", title: "Purchase & Tell Us Your Needs", desc: "Complete the payment and fill in the quick form: budget, bedrooms, pets, move-in date, preferences." },
      { num: "2", icon: "🏡", title: "We Build Your Personalised Report", desc: "I personally analyse the market, select properties, verify availability and build your report. Delivered in 24-48h." },
      { num: "3", icon: "📬", title: "Receive & Get Weekly Updates", desc: "Your personalised URL stays active for 6 months. Every Friday I update it with new properties and market changes." },
    ],
  },

  // pricing
  pricingTitle:   { es: "Inversión", en: "Investment" },
  pricingAmount:  { es: "€180", en: "€180" },
  pricingOnce:    { es: "Pago Único · Sin cargos recurrentes", en: "One-time Payment · No recurring charges" },
  othersLabel:    { es: "Lo Que Cobran Otros:", en: "What Others Charge:" },
  othersItems: {
    es: [
      "❌ Portales genéricos: €0 (pero horas perdidas)",
      "❌ Agencias tradicionales: \"Gratis\" (pero costes ocultos, presión)",
      "❌ Investigación DIY: Semanas de tu tiempo + frustración",
    ],
    en: [
      "❌ Generic portals: €0 (but hours wasted)",
      "❌ Traditional agencies: \"Free\" (but hidden costs, pressure)",
      "❌ DIY research: Weeks of your time + frustration",
    ],
  },
  youGetLabel:  { es: "Lo Que Obtienes Con Propaxar:", en: "What You Get with Propaxar:" },
  youGetItems: {
    es: [
      "✅ Análisis profesional adaptado a TI",
      "✅ Entrega en 24-48h",
      "✅ 6 meses de soporte activo",
      "✅ Conocimiento local privilegiado",
      "✅ Reembolso total si alquilas nuestra propiedad",
    ],
    en: [
      "✅ Professional analysis tailored to YOU",
      "✅ Delivered in 24-48h",
      "✅ 6 months of active support",
      "✅ Insider local knowledge",
      "✅ Full refund if you rent our property",
    ],
  },
  pricingSpecial: {
    es: "ESPECIAL: Si acabas alquilando una propiedad gestionada por Propaxar Direct, reembolsamos los €180 completos. Literalmente no arriesgas nada.",
    en: "SPECIAL: If you end up renting a Propaxar Direct property, we refund the full €180. Literally zero risk.",
  },
  pricingCTA: { es: "SOLICITA TU REPORTE - €180 →", en: "GET YOUR REPORT - €180 →" },

  // testimonials
  testimonialsTitle: { es: "Qué Dicen los Clientes", en: "What Clients Say" },
  testimonials: {
    es: [
      { quote: "Este reporte me ahorró semanas. Habría mirado 10+ casas equivocadas. Manuel me mostró exactamente qué encajaba con mi presupuesto y necesidades.", name: "Katinka D.", origin: "Países Bajos · Mudada a Frigiliana Feb 2026" },
      { quote: "Estaba lista para pagar €1,600 por una casa que ni siquiera me gustaba. El reporte me ayudó a encontrar una mejor a €900. Vale cada euro.", name: "Cliente Verificada", origin: "Europa · Feb 2026" },
      { quote: "Solo la sección de logística vale €180. Nadie te habla de entrega de paquetes, sistemas de agua o recogida de basura hasta que ya estás mudado y batallando.", name: "Cliente Verificado", origin: "Europa · Ene 2026" },
    ],
    en: [
      { quote: "This report saved me weeks. I would have viewed 10+ wrong houses. Manuel showed me exactly what matched my budget and needs.", name: "Katinka D.", origin: "Netherlands · Moved to Frigiliana Feb 2026" },
      { quote: "I was about to pay €1,600 for a house I didn't even like. The report helped me find a better one at €900. Worth every cent.", name: "Verified Client", origin: "Europe · Feb 2026" },
      { quote: "The logistics section alone is worth €180. Nobody tells you about package delivery, water systems or waste collection until you're already moved in and struggling.", name: "Verified Client", origin: "Europe · Jan 2026" },
    ],
  },

  // faq
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

  // form
  formTitle:     { es: "Solicita Tu Reporte Personalizado", en: "Request Your Personalised Report" },
  formSubtitle:  { es: "Completa el formulario y serás redirigido al pago seguro.", en: "Fill in the form and you'll be redirected to secure payment." },
  labelName:     { es: "Nombre Completo", en: "Full Name" },
  labelEmail:    { es: "Email", en: "Email" },
  labelPhone:    { es: "Teléfono (WhatsApp)", en: "Phone (WhatsApp)" },
  labelLang:     { es: "Idioma Preferido", en: "Preferred Language" },
  labelBudget:   { es: "Presupuesto mensual (€/mes)", en: "Monthly budget (€/month)" },
  labelBeds:     { es: "Dormitorios mínimos", en: "Minimum bedrooms" },
  labelPets:     { es: "¿Mascotas?", en: "Pets?" },
  labelMovein:   { es: "Fecha de entrada (aprox.)", en: "Move-in date (approx.)" },
  labelNotes:    { es: "Otras preferencias o notas", en: "Other preferences or notes" },
  labelTerms:    { es: "Acepto los", en: "I accept the" },
  termsLink:     { es: "Términos y Condiciones", en: "Terms & Conditions" },
  termsError:    { es: "Debes aceptar los términos para continuar", en: "You must accept the terms to continue" },
  submitBtn:     { es: "PAGAR €180 →", en: "PAY €180 →" },
  submitNote:    { es: "🔒 Pago 100% seguro con Stripe", en: "🔒 100% secure payment with Stripe" },
  yesLabel:      { es: "Sí", en: "Yes" },
  noLabel:       { es: "No", en: "No" },
  esLabel:       { es: "Español", en: "Spanish" },
  enLabel:       { es: "Inglés", en: "English" },

  // final cta
  finalTitle: { es: "¿Listo Para Dejar de Perder Tiempo?", en: "Ready to Stop Wasting Time?" },
  finalDesc:  { es: "Recibe tu reporte personalizado de mercado Frigiliana en 24-48h.", en: "Receive your personalised Frigiliana market report in 24-48h." },
  finalCTA:   { es: "SOLICITA TU REPORTE - €180 →", en: "GET YOUR REPORT - €180 →" },
  finalNote:  { es: "Pago seguro vía Stripe · Sin cargos recurrentes · Tarifa única", en: "Secure payment via Stripe · No recurring charges · One-time fee" },
  finalQ:     { es: "¿Preguntas?", en: "Questions?" },
  finalOr:    { es: "o email:", en: "or email:" },

  // footer
  footerRights: { es: "Todos los derechos reservados.", en: "All rights reserved." },
  footerSub:    { es: "Especialistas en Frigiliana · La Axarquía · Costa del Sol", en: "Specialists in Frigiliana · La Axarquía · Costa del Sol" },
};

// ─── helpers ────────────────────────────────────────────────────────────────
const tr = (key: keyof typeof t, lang: Lang): string => {
  const entry = t[key] as Record<Lang, string>;
  return entry[lang] ?? "";
};

// ─── sub-components ─────────────────────────────────────────────────────────
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

  const pricingSectionRef = useRef<HTMLElement>(null);
  const scrollToPricing = () => pricingSectionRef.current?.scrollIntoView({ behavior: "smooth" });

  const termsHref = lang === "en" ? "/terminos-finder?lang=en" : "/terminos-finder";
  const includedItems = t.includedItems[lang];
  const howSteps = t.howSteps[lang];
  const othersItems = t.othersItems[lang];
  const youGetItems = t.youGetItems[lang];
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
            {/* scroll to form CTA (sm+) */}
            <button
              onClick={scrollToPricing}
              className="hidden sm:inline-block bg-[#2c5282] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#1e3a5f] transition-colors"
            >
              {lang === "es" ? "Solicitar →" : "Get Report →"}
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
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {[tr("heroPill1", lang), tr("heroPill2", lang), tr("heroPill3", lang)].map((pill, i) => (
              <span key={i} className="bg-white/15 backdrop-blur-sm text-white text-sm font-medium px-4 py-2 rounded-full border border-white/20">
                ✓ {pill}
              </span>
            ))}
          </div>
          <a
            href={STRIPE_PAYMENT_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#48bb78] hover:bg-[#38a169] text-white text-xl font-extrabold px-10 py-5 rounded-xl shadow-2xl hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(72,187,120,0.4)] transition-all duration-200"
          >
            {tr("heroCTA", lang)}
          </a>
          <p className="text-white/50 text-xs mt-2">
            <a href={termsHref} target="_blank" rel="noopener noreferrer" className="underline hover:text-white/70">
              {tr("termsLink", lang)}
            </a>
          </p>
          <p className="text-white/50 text-xs mt-4">🔒 {lang === "es" ? "Pago 100% seguro con Stripe" : "100% secure payment with Stripe"}</p>
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

      {/* ── HOW IT WORKS ────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-[900px] mx-auto px-5">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a5f] text-center mb-12">{tr("howTitle", lang)}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howSteps.map((step, i) => (
              <div key={i} className="text-center">
                <div className="relative inline-block mb-5">
                  <span className="text-5xl">{step.icon}</span>
                  <span className="absolute -top-1 -right-3 bg-[#2c5282] text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                    {step.num}
                  </span>
                </div>
                <h3 className="font-bold text-[#1e3a5f] mb-2">{step.title}</h3>
                <p className="text-[#555] text-sm leading-relaxed">{step.desc}</p>
                {i < howSteps.length - 1 && (
                  <div className="hidden md:block absolute translate-x-full top-1/2 text-[#2c5282] text-2xl">→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ─────────────────────────────────────────────────────────── */}
      <section ref={pricingSectionRef} className="py-16 md:py-20 bg-[#f8faff]">
        <div className="max-w-[900px] mx-auto px-5">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a5f] text-center mb-10">{tr("pricingTitle", lang)}</h2>
          <div className="max-w-[680px] mx-auto bg-white rounded-2xl shadow-xl border-2 border-[#2c5282] overflow-hidden">
            {/* price band */}
            <div className="bg-[#2c5282] py-8 text-center">
              <p className="text-6xl font-extrabold text-white mb-1">{tr("pricingAmount", lang)}</p>
              <p className="text-white/70 text-sm">{tr("pricingOnce", lang)}</p>
            </div>
            {/* comparison */}
            <div className="p-8 grid md:grid-cols-2 gap-8">
              <div>
                <p className="font-bold text-[#333] mb-3">{tr("othersLabel", lang)}</p>
                <ul className="space-y-2">
                  {othersItems.map((item, i) => (
                    <li key={i} className="text-sm text-[#555]">{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-bold text-[#333] mb-3">{tr("youGetLabel", lang)}</p>
                <ul className="space-y-2">
                  {youGetItems.map((item, i) => (
                    <li key={i} className="text-sm text-[#333] font-medium">{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            {/* special note */}
            <div className="mx-8 mb-8 bg-[#f0fff4] border border-[#48bb78]/40 rounded-xl p-4 text-sm text-[#2d6a4f]">
              💚 {tr("pricingSpecial", lang)}
            </div>
            <div className="px-8 pb-8 text-center">
              <a
                href={STRIPE_PAYMENT_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-block text-center bg-[#48bb78] hover:bg-[#38a169] text-white text-lg font-extrabold py-4 rounded-xl shadow-lg hover:-translate-y-0.5 transition-all duration-200"
              >
                {tr("pricingCTA", lang)}
              </a>
              <p className="text-[#888] text-xs mt-2">
                <a href={termsHref} target="_blank" rel="noopener noreferrer" className="text-[#2c5282] underline hover:text-[#1e3a5f]">
                  {tr("termsLink", lang)}
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-[900px] mx-auto px-5">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a5f] text-center mb-10">{tr("testimonialsTitle", lang)}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-[#f8faff] rounded-xl p-6 border border-[#e8f0fe]">
                <p className="text-[#333] text-sm leading-relaxed mb-4 italic">"{t.quote}"</p>
                <p className="font-bold text-[#2c5282] text-sm">— {t.name}</p>
                <p className="text-[#888] text-xs mt-0.5">{t.origin}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-[#f8faff]">
        <div className="max-w-[700px] mx-auto px-5">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a5f] text-center mb-10">{tr("faqTitle", lang)}</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => <FaqItem key={i} q={faq.q} a={faq.a} />)}
          </div>
        </div>
      </section>


      {/* ── FINAL CTA ───────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20" style={{ background: "linear-gradient(135deg, #1e3a5f, #2c5282)" }}>
        <div className="max-w-[700px] mx-auto px-5 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{tr("finalTitle", lang)}</h2>
          <p className="text-white/80 mb-8 text-lg">{tr("finalDesc", lang)}</p>
          <a
            href={STRIPE_PAYMENT_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#48bb78] hover:bg-[#38a169] text-white text-xl font-extrabold px-10 py-5 rounded-xl shadow-2xl hover:-translate-y-0.5 transition-all duration-200 mb-2"
          >
            {tr("finalCTA", lang)}
          </a>
          <p className="text-white/50 text-xs mb-4">
            <a href={termsHref} target="_blank" rel="noopener noreferrer" className="underline hover:text-white/70">
              {tr("termsLink", lang)}
            </a>
          </p>
          <p className="text-white/60 text-sm mb-6">{tr("finalNote", lang)}</p>
          <p className="text-white/80 text-sm">
            {tr("finalQ", lang)}{" "}
            <a href={`https://wa.me/34662317561`} target="_blank" rel="noopener noreferrer" className="underline hover:text-[#ffd700]">
              WhatsApp {PHONE}
            </a>
            {" "}· {tr("finalOr", lang)}{" "}
            <a href={`mailto:${EMAIL}`} className="underline hover:text-[#ffd700]">{EMAIL}</a>
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
