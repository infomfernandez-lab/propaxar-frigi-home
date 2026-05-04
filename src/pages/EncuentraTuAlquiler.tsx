import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ArrowRight, Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const txt = {
  es: {
    eyebrow: "Alquiler residencial · Frigiliana · La Axarquía",
    heroTitle: "Encuentra tu alquiler en Frigiliana. Sin buscar.",
    heroSub: "Cuéntame qué buscas. Reviso mi portfolio actual y te envío opciones en menos de 24 horas — incluyendo propiedades que no están publicadas.",
    ctaPrimary: "Ver qué tengo disponible",
    ctaSecondary: "¿Cómo funciona el Reporte? →",
    pills: ["✓ Sin coste para el inquilino", "✓ Respuesta en 24h", "✓ EN · ES"],

    step1Label: "Paso 1",
    step1Title: "¿Tienes algo para mí?",
    step1Sub: "Comparte lo que buscas. Reviso mi portfolio y te digo honestamente en 24h si tengo algo que encaje — o no.",
    labelRooms: "Mínimo de habitaciones",
    labelBudget: "Presupuesto máximo/mes",
    labelEntry: "¿Cuándo quieres entrar?",
    labelPets: "¿Tienes mascotas?",
    labelName: "Nombre *",
    labelEmail: "Email *",
    labelNotes: "¿Algo más que deba saber?",
    phName: "Tu nombre",
    phEmail: "tu@email.com",
    phNotes: "Zona preferida, teletrabajo, requisitos especiales...",
    select: "Seleccionar",
    rooms: ["Estudio o 1 hab", "2 hab", "3 hab", "4+ hab"],
    budgets: ["Hasta 800€", "800–1.200€", "1.200–1.600€", "1.600–2.000€", "Más de 2.000€"],
    entries: ["Lo antes posible", "En 1–2 meses", "En 3–6 meses", "Explorando opciones"],
    pets: ["No", "Sí — perro pequeño", "Sí — perro grande", "Sí — gato"],
    submit: "Enviar — revisar portfolio disponible",
    formNote: "Sin compromiso. Te respondo antes de 24h con lo que tengo — o te digo honestamente si no tengo nada que encaje ahora mismo.",
    sentTitle: "Recibido",
    sentText: "Reviso mi portfolio hoy y te escribo antes de 24h con lo que tengo disponible.",

    step2Label: "Paso 2 — Si no encaja nada del portfolio",
    step2Title: "Accede a todo el mercado. No solo a lo que tengo yo.",
    step2Sub: "El Reporte de Mercado Personalizado analiza todas las propiedades disponibles en Frigiliana según tu perfil exacto — y te da una recomendación clara de cuál es la tuya.",
    includesLabel: "Qué incluye",
    includes: [
      "Análisis de todas las propiedades disponibles según tu perfil exacto",
      "Recomendación profesional — cuál es la mejor opción y por qué",
      "Precios reales del mercado — sin inflación",
      "Guía logística: campo vs pueblo, conectividad, gastos reales",
      "6 meses de seguimiento activo con actualizaciones",
      "Si alquilas una propiedad de mi portfolio directo, te devuelvo el importe íntegro",
    ],
    reportCardLabel: "Reporte de Mercado Personalizado",
    reportCardTitle: "Tu análisis privado del mercado de alquiler",
    reportCardSub: "Entrega en 24–48h. Acceso privado por URL única. Incluye propiedades fuera del mercado público.",
    reportCardPrice: "180€",
    reportCardPriceNote: "pago único · sin suscripción",
    reportCardCta: "Conocer el Reporte →",
    reportCardDisclaimer: "Pago seguro · RGPD · Garantía de reembolso",

    alertEyebrow: "¿Todavía no es el momento?",
    alertTitle: "Te aviso cuando salga algo que encaje.",
    alertSub: "Deja tu email. Cuando entre una propiedad que coincida con lo que buscas, eres el primero en saberlo.",
    alertSent: "✓ Anotado. Te escribo cuando aparezca algo.",
    alertCta: "Avisarme",
    alertDisclaimer: "Sin spam. Solo cuando haya algo relevante para ti.",
  },
  en: {
    eyebrow: "Residential rental · Frigiliana · La Axarquía",
    heroTitle: "Find your rental in Frigiliana. Without searching.",
    heroSub: "Tell me what you're looking for. I'll review my current portfolio and send you options within 24 hours — including unlisted properties.",
    ctaPrimary: "See what I have available",
    ctaSecondary: "How does the Report work? →",
    pills: ["✓ No cost for tenants", "✓ Response within 24h", "✓ EN · ES"],

    step1Label: "Step 1",
    step1Title: "Do I have something for you?",
    step1Sub: "Share what you're looking for. I'll review my portfolio and honestly tell you within 24h if I have something that fits — or not.",
    labelRooms: "Minimum bedrooms",
    labelBudget: "Max budget/month",
    labelEntry: "When do you want to move in?",
    labelPets: "Do you have pets?",
    labelName: "Name *",
    labelEmail: "Email *",
    labelNotes: "Anything else I should know?",
    phName: "Your name",
    phEmail: "you@email.com",
    phNotes: "Preferred area, remote work, special requirements...",
    select: "Select",
    rooms: ["Studio or 1 bed", "2 beds", "3 beds", "4+ beds"],
    budgets: ["Up to €800", "€800–1,200", "€1,200–1,600", "€1,600–2,000", "More than €2,000"],
    entries: ["As soon as possible", "In 1–2 months", "In 3–6 months", "Exploring options"],
    pets: ["No", "Yes — small dog", "Yes — large dog", "Yes — cat"],
    submit: "Send — review available portfolio",
    formNote: "No commitment. I'll respond within 24h with what I have — or honestly tell you if nothing fits right now.",
    sentTitle: "Received",
    sentText: "I'll review my portfolio today and write to you within 24h with what's available.",

    step2Label: "Step 2 — If nothing from the portfolio fits",
    step2Title: "Access the entire market. Not just what I have.",
    step2Sub: "The Personalised Market Report analyses all available properties in Frigiliana based on your exact profile — and gives you a clear recommendation on which one is yours.",
    includesLabel: "What's included",
    includes: [
      "Analysis of all available properties based on your exact profile",
      "Professional recommendation — which is the best option and why",
      "Real market prices — no inflation",
      "Logistics guide: countryside vs village, connectivity, real costs",
      "6 months of active follow-up with updates",
      "If you rent a property from my direct portfolio, I refund the full amount",
    ],
    reportCardLabel: "Personalised Market Report",
    reportCardTitle: "Your private rental market analysis",
    reportCardSub: "Delivered in 24–48h. Private access via unique URL. Includes off-market properties.",
    reportCardPrice: "€180",
    reportCardPriceNote: "one-time payment · no subscription",
    reportCardCta: "Learn about the Report →",
    reportCardDisclaimer: "Secure payment · GDPR · Refund guarantee",

    alertEyebrow: "Not the right time yet?",
    alertTitle: "I'll let you know when something fits.",
    alertSub: "Leave your email. When a property that matches what you're looking for comes in, you'll be the first to know.",
    alertSent: "✓ Noted. I'll write when something comes up.",
    alertCta: "Notify me",
    alertDisclaimer: "No spam. Only when there's something relevant for you.",
  },
};

const EncuentraTuAlquiler = () => {
  const { language } = useLanguage();
  const t = txt[language];

  const [formData, setFormData] = useState({
    habitaciones: "", presupuesto: "", entrada: "", mascotas: "", nombre: "", email: "", notas: "",
  });
  const [formSent, setFormSent] = useState(false);
  const [alertEmail, setAlertEmail] = useState("");
  const [alertSent, setAlertSent] = useState(false);

  const handleFormSubmit = () => {
    if (!formData.nombre.trim() || !formData.email.trim()) return;
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "Lead");
    }
    setFormSent(true);
  };

  const handleAlertSubmit = () => {
    if (!alertEmail.trim()) return;
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "Lead");
    }
    setAlertSent(true);
  };

  const handleReporteClick = () => {
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "InitiateCheckout");
    }
    window.location.href = "https://propaxar.es/comprar-reporte";
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const selectClass =
    "w-full border border-gray-200 bg-white px-4 py-3 text-[13px] rounded-lg outline-none focus:border-[hsl(222,28%,16%)] transition-colors appearance-none";
  const inputClass =
    "w-full border border-gray-200 bg-white px-4 py-3 text-[13px] rounded-lg outline-none focus:border-[hsl(222,28%,16%)] transition-colors";

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Navigation />

      {/* ═══ 1. HERO ═══ */}
      <section
        className="relative flex items-center justify-center"
        style={{ minHeight: "85vh", paddingTop: 64 }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://propaxar.com/wp-content/uploads/2026/01/Gemini_Generated_Image_wyt8u3wyt8u3wyt8.png')",
          }}
        />
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(17,24,39,0.65)" }}
        />

        <div className="relative z-10 text-center px-5 max-w-[800px] mx-auto">
          <span
            className="inline-block text-[10px] font-mono font-semibold uppercase tracking-[0.14em] px-4 py-1.5 rounded-full mb-6"
            style={{
              color: "rgba(255,255,255,0.7)",
              border: "1px solid rgba(255,255,255,0.3)",
            }}
          >
            {t.eyebrow}
          </span>

          <h1
            className="font-bold text-white leading-[1.1] mb-5"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(36px, 5.5vw, 64px)",
            }}
          >
            {t.heroTitle}
          </h1>

          <p
            className="text-[17px] md:text-[19px] leading-[1.6] mx-auto mb-8"
            style={{ color: "rgba(255,255,255,0.8)", maxWidth: 520 }}
          >
            {t.heroSub}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
            <button
              onClick={() => scrollTo("cualificar")}
              className="flex items-center gap-2 text-[14px] font-semibold px-8 py-3.5 rounded-lg transition-all"
              style={{ backgroundColor: "#fff", color: "hsl(222, 28%, 16%)" }}
            >
              {t.ctaPrimary}
            </button>
            <button
              onClick={() => scrollTo("reporte")}
              className="flex items-center gap-1.5 text-[14px] font-medium px-8 py-3.5 rounded-lg transition-all text-white"
              style={{ border: "1px solid rgba(255,255,255,0.4)" }}
            >
              {t.ctaSecondary}
            </button>
          </div>

          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-[13px]"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            {t.pills.map((p, i) => <span key={i}>{p}</span>)}
          </div>
        </div>
      </section>

      {/* ═══ 2. CUALIFICACIÓN ═══ */}
      <section id="cualificar" className="bg-white" style={{ padding: "96px 0" }}>
        <div className="max-w-[720px] mx-auto px-5 md:px-8">
          <span
            className="block text-[10px] font-mono font-bold uppercase tracking-[0.14em] mb-3"
            style={{ color: "hsl(222, 28%, 16%)" }}
          >
            {t.step1Label}
          </span>
          <h2
            className="text-[28px] md:text-[38px] font-extrabold leading-[1.15] mb-3"
            style={{ color: "hsl(222, 28%, 16%)" }}
          >
            {t.step1Title}
          </h2>
          <p
            className="text-[15px] leading-[1.7] mb-10"
            style={{ color: "#6B7280", maxWidth: 520 }}
          >
            {t.step1Sub}
          </p>

          <div
            className="rounded-[14px] p-8 md:p-10"
            style={{
              backgroundColor: "#fff",
              border: "1px solid #E5E7EB",
              boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
            }}
          >
            {formSent ? (
              <div className="text-center py-8">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: "hsl(160, 84%, 39%)" }}
                >
                  <Check className="w-6 h-6 text-white" />
                </div>
                <h3
                  className="text-[22px] font-bold mb-2"
                  style={{ color: "hsl(222, 28%, 16%)" }}
                >
                  {t.sentTitle}, {formData.nombre}.
                </h3>
                <p className="text-[14px] leading-[1.7] mb-4" style={{ color: "#6B7280" }}>
                  {t.sentText}
                </p>
                <p
                  className="text-[13px] font-medium mb-2"
                  style={{ color: "hsl(222, 28%, 16%)" }}
                >
                  Manuel · Propaxar Frigiliana
                </p>
                <p className="text-[13px]" style={{ color: "#9CA3AF" }}>
                  📱 +34 662 317 561 · ✉️ info@propaxar.es
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-[9px] font-semibold uppercase tracking-[0.1em] text-gray-400 mb-1.5">
                      {t.labelRooms}
                    </label>
                    <select className={selectClass} value={formData.habitaciones} onChange={(e) => setFormData({ ...formData, habitaciones: e.target.value })}>
                      <option value="">{t.select}</option>
                      {t.rooms.map((r, i) => <option key={i}>{r}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] font-semibold uppercase tracking-[0.1em] text-gray-400 mb-1.5">
                      {t.labelBudget}
                    </label>
                    <select className={selectClass} value={formData.presupuesto} onChange={(e) => setFormData({ ...formData, presupuesto: e.target.value })}>
                      <option value="">{t.select}</option>
                      {t.budgets.map((b, i) => <option key={i}>{b}</option>)}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-[9px] font-semibold uppercase tracking-[0.1em] text-gray-400 mb-1.5">
                      {t.labelEntry}
                    </label>
                    <select className={selectClass} value={formData.entrada} onChange={(e) => setFormData({ ...formData, entrada: e.target.value })}>
                      <option value="">{t.select}</option>
                      {t.entries.map((e2, i) => <option key={i}>{e2}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] font-semibold uppercase tracking-[0.1em] text-gray-400 mb-1.5">
                      {t.labelPets}
                    </label>
                    <select className={selectClass} value={formData.mascotas} onChange={(e) => setFormData({ ...formData, mascotas: e.target.value })}>
                      <option value="">{t.select}</option>
                      {t.pets.map((p, i) => <option key={i}>{p}</option>)}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-[9px] font-semibold uppercase tracking-[0.1em] text-gray-400 mb-1.5">
                      {t.labelName}
                    </label>
                    <input type="text" className={inputClass} placeholder={t.phName} value={formData.nombre} onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-[9px] font-semibold uppercase tracking-[0.1em] text-gray-400 mb-1.5">
                      {t.labelEmail}
                    </label>
                    <input type="email" className={inputClass} placeholder={t.phEmail} value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-[9px] font-semibold uppercase tracking-[0.1em] text-gray-400 mb-1.5">
                    {t.labelNotes}
                  </label>
                  <textarea rows={2} className={`${inputClass} resize-none`} placeholder={t.phNotes} value={formData.notas} onChange={(e) => setFormData({ ...formData, notas: e.target.value })} />
                </div>

                <button
                  onClick={handleFormSubmit}
                  className="w-full text-[14px] font-semibold text-white py-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                  style={{ backgroundColor: "hsl(222, 28%, 16%)" }}
                >
                  {t.submit}
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-center text-[13px] mt-4 leading-[1.6]" style={{ color: "#9CA3AF" }}>
                  {t.formNote}
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ═══ 3. EL REPORTE ═══ */}
      <section id="reporte" style={{ backgroundColor: "#F4F6F8", padding: "96px 0" }}>
        <div className="max-w-[1000px] mx-auto px-5 md:px-8">
          <span
            className="block text-[10px] font-mono font-bold uppercase tracking-[0.14em] mb-3"
            style={{ color: "hsl(222, 28%, 16%)" }}
          >
            {t.step2Label}
          </span>
          <h2
            className="text-[28px] md:text-[38px] font-extrabold leading-[1.15] mb-3"
            style={{ color: "hsl(222, 28%, 16%)" }}
          >
            {t.step2Title}
          </h2>
          <p
            className="text-[15px] leading-[1.7] mb-12"
            style={{ color: "#6B7280", maxWidth: 580 }}
          >
            {t.step2Sub}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="md:col-span-3">
              <p
                className="text-[12px] font-bold uppercase tracking-[0.08em] mb-5"
                style={{ color: "hsl(222, 28%, 16%)" }}
              >
                {t.includesLabel}
              </p>
              <div className="flex flex-col gap-4">
                {t.includes.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-[14px] mt-0.5 flex-shrink-0" style={{ color: "hsl(160, 84%, 39%)" }}>✓</span>
                    <span className="text-[14px] leading-[1.6]" style={{ color: "#374151" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="md:col-span-2 rounded-[14px] p-8 md:p-9 flex flex-col"
              style={{ backgroundColor: "hsl(222, 28%, 16%)" }}
            >
              <span
                className="block text-[9px] font-mono font-semibold uppercase tracking-[0.12em] mb-3"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                {t.reportCardLabel}
              </span>
              <h3
                className="text-[22px] font-bold text-white leading-[1.25] mb-3"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {t.reportCardTitle}
              </h3>
              <p
                className="text-[14px] leading-[1.65] mt-1 mb-6"
                style={{ color: "rgba(255,255,255,0.65)" }}
              >
                {t.reportCardSub}
              </p>
              <div className="mt-auto">
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-[36px] font-bold text-white">{t.reportCardPrice}</span>
                  <span className="text-[12px]" style={{ color: "rgba(255,255,255,0.4)" }}>
                    {t.reportCardPriceNote}
                  </span>
                </div>
                <button
                  onClick={handleReporteClick}
                  className="w-full text-[14px] font-semibold py-3.5 rounded-lg transition-colors"
                  style={{ backgroundColor: "#fff", color: "hsl(222, 28%, 16%)" }}
                >
                  {t.reportCardCta}
                </button>
                <p
                  className="text-center text-[11px] mt-3"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                >
                  {t.reportCardDisclaimer}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 4. CAPTURA EMAIL ═══ */}
      <section id="avisar" style={{ backgroundColor: "hsl(222, 28%, 16%)", padding: "72px 0" }}>
        <div className="max-w-[520px] mx-auto px-5 text-center">
          <span
            className="block text-[10px] font-mono font-semibold uppercase tracking-[0.14em] mb-3"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            {t.alertEyebrow}
          </span>
          <h2 className="text-[28px] font-extrabold text-white leading-[1.2] mb-3">
            {t.alertTitle}
          </h2>
          <p
            className="text-[15px] leading-[1.6] mb-8"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            {t.alertSub}
          </p>

          {alertSent ? (
            <p className="text-[15px] font-medium text-white">{t.alertSent}</p>
          ) : (
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder={txt[language].phEmail}
                value={alertEmail}
                onChange={(e) => setAlertEmail(e.target.value)}
                className="flex-1 text-[14px] px-4 py-3.5 rounded-lg outline-none transition-colors text-white placeholder:text-white/40"
                style={{
                  backgroundColor: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              />
              <button
                onClick={handleAlertSubmit}
                className="text-[14px] font-semibold px-6 py-3.5 rounded-lg flex-shrink-0 transition-colors"
                style={{ backgroundColor: "#fff", color: "hsl(222, 28%, 16%)" }}
              >
                {t.alertCta}
              </button>
            </div>
          )}

          <p
            className="text-[11px] mt-4"
            style={{ color: "rgba(255,255,255,0.25)" }}
          >
            {t.alertDisclaimer}
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EncuentraTuAlquiler;
