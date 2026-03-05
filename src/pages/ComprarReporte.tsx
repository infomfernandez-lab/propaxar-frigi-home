import { useSearchParams, Link } from 'react-router-dom';
import { useState } from 'react';

const STRIPE_URL = 'https://buy.stripe.com/bJe14pbo0drEebg6Q1gEg03';
const WHATSAPP_NUMBER = '34662317561';
const EMAIL = 'info@propaxar.com';
const PHONE = '+34 662 317 561';

type Lang = 'es' | 'en';

const t = {
  langToggleLabel: { es: 'EN', en: 'ES' },

  greeting: {
    es: (n: string) => `👋 Hola ${n}`,
    en: (n: string) => `👋 Hello ${n}`,
  },
  heroTitle: {
    es: 'Tu Reporte Personalizado\nEstá Listo Para Crearse',
    en: 'Your Personalised Report\nIs Ready to Be Created',
  },
  heroDesc: {
    es: 'Como acordamos en nuestra llamada, aquí está todo lo que incluye tu análisis profesional del mercado Frigiliana.',
    en: 'As we discussed on the phone, here is everything your professional Frigiliana market analysis includes.',
  },
  offerBadge:   { es: 'OFERTA ESPECIAL', en: 'SPECIAL OFFER' },
  refundBadge:  { es: 'REEMBOLSABLE', en: 'REFUNDABLE' },
  investLabel:  { es: 'INVERSIÓN ÚNICA', en: 'ONE-TIME INVESTMENT' },
  vatNote:      { es: 'IVA incluido · Sin cargos recurrentes · 6 meses soporte', en: 'VAT included · No recurring charges · 6 months support' },

  searchTitle:  { es: '📋 Tu Búsqueda Confirmada', en: '📋 Your Confirmed Search' },
  budgetLabel:  { es: 'Presupuesto', en: 'Budget' },
  bedroomLabel: { es: 'Dormitorios', en: 'Bedrooms' },
  petsLabel:    { es: 'Mascotas', en: 'Pets' },
  bedroomSuffix:{ es: ' mínimo', en: ' minimum' },
  petsYes:      { es: 'Sí permitidas', en: 'Allowed' },
  petsNo:       { es: 'No necesarias', en: 'Not needed' },

  includedLabel:{ es: 'TODO INCLUIDO', en: 'ALL INCLUDED' },
  includedTitle:{ es: 'Qué Incluye Tu Reporte', en: "What's Included in Your Report" },
  includedDesc: {
    es: 'No es un simple listado de propiedades. Es un análisis profesional completo del mercado adaptado a TI.',
    en: "It's not a simple property listing. It's a complete professional market analysis tailored to YOU.",
  },
  features: {
    es: [
      { icon: '🏘️', title: 'Propiedades Seleccionadas', desc: 'Escogidas manualmente para tu presupuesto, dormitorios, mascotas y fecha de entrada. Sin propiedades irrelevantes ni pérdida de tiempo.', tag: '✓ 100% relevantes para ti' },
      { icon: '📊', title: 'Análisis Honesto del Mercado', desc: 'Precios reales, disponibilidad actual e información privilegiada que solo un experto local con 10+ años conoce. Sin filtros ni marketing.', tag: '✓ Información que nadie más da' },
      { icon: '🎯', title: 'Recomendación Clara y Directa', desc: 'Qué propiedad se ajusta mejor a tu perfil y por qué. Ahorra horas de confusión y decisiones equivocadas. Te digo la verdad aunque no te guste.', tag: '✓ Sin ambigüedades' },
      { icon: '📦', title: 'Guía Logística Insider', desc: 'Campo vs pueblo, entrega de paquetes, sistemas de agua, recogida de basura. La verdad brutal que descubres cuando ya te mudaste... pero ANTES.', tag: '✓ Evita sorpresas desagradables' },
      { icon: '📅', title: '6 Meses de Seguimiento Activo', desc: 'Actualizaciones cada viernes con nuevas propiedades, cambios de precios e insights del mercado. Hasta que encuentres tu hogar. Yo trabajo, tú relajado.', tag: '✓ 24 actualizaciones incluidas' },
      { icon: '🎁', title: 'Reembolso Total Garantizado', desc: 'Si acabas alquilando una propiedad Propaxar Direct, reembolsamos los €180 completos. Literalmente no arriesgas nada. Solo ganas.', tag: '✓ Riesgo cero para ti', highlight: true },
    ],
    en: [
      { icon: '🏘️', title: 'Hand-Selected Properties', desc: 'Manually chosen to match your budget, bedrooms, pets and move-in date. No irrelevant listings, no wasted time.', tag: '✓ 100% relevant to you' },
      { icon: '📊', title: 'Honest Market Analysis', desc: 'Real prices, current availability and insider knowledge only a local expert with 10+ years holds. No filters, no marketing spin.', tag: '✓ Information nobody else shares' },
      { icon: '🎯', title: 'Clear, Direct Recommendation', desc: "Which property fits your profile best and why. Save hours of confusion and wrong decisions. I tell you the truth even if you don't like it.", tag: '✓ No ambiguity' },
      { icon: '📦', title: 'Insider Logistics Guide', desc: 'Country vs town, package delivery, water systems, waste collection. The brutal truth you discover after you move in… but BEFORE.', tag: '✓ Avoid nasty surprises' },
      { icon: '📅', title: '6 Months Active Follow-Up', desc: 'Every Friday: new properties, price changes and market insights. Until you find your home. I work, you relax.', tag: '✓ 24 updates included' },
      { icon: '🎁', title: 'Full Refund Guaranteed', desc: 'If you end up renting a Propaxar Direct property, we refund the full €180. Literally zero risk. You can only win.', tag: '✓ Zero risk for you', highlight: true },
    ],
  },

  timelineTitle:{ es: 'Qué Pasa Después del Pago', en: 'What Happens After Payment' },
  steps: {
    es: [
      { num: '1', title: 'Confirmación Inmediata (0-5 minutos)', desc: 'Recibes email de confirmación con recibo. Te confirmo personalmente por WhatsApp que empiezo tu reporte.' },
      { num: '2', title: 'Análisis y Creación (24-48 horas)', desc: 'Peino el mercado completo, verifico disponibilidad personalmente, selecciono propiedades y creo tu reporte con análisis detallado.' },
      { num: '3', title: 'Entrega de Tu Reporte Único', desc: 'Recibes tu URL personalizada por email y WhatsApp. Acceso inmediato, válido 6 meses. Bookmark y consulta cuando quieras.' },
      { num: '4', title: 'Actualizaciones Semanales (6 meses)', desc: 'Cada viernes actualizo tu reporte: propiedades nuevas, cambios de precio, insights del mercado. Si aparece LA casa perfecta, te aviso por WhatsApp.' },
    ],
    en: [
      { num: '1', title: 'Immediate Confirmation (0-5 minutes)', desc: 'You receive a confirmation email with receipt. I personally confirm via WhatsApp that I am starting your report.' },
      { num: '2', title: 'Analysis & Creation (24-48 hours)', desc: 'I scour the entire market, personally verify availability, select properties and build your report with detailed analysis.' },
      { num: '3', title: 'Delivery of Your Unique Report', desc: 'You receive your personalised URL by email and WhatsApp. Immediate access, valid for 6 months. Bookmark and check whenever you like.' },
      { num: '4', title: 'Weekly Updates (6 months)', desc: 'Every Friday I update your report: new properties, price changes, market insights. If THE perfect home appears, I alert you on WhatsApp.' },
    ],
  },

  guaranteesTitle:{ es: 'Garantías Que Te Protegen', en: 'Guarantees That Protect You' },
  guaranteesDesc: { es: 'No te pido fe ciega. Te doy garantías reales.', en: "I don't ask for blind faith. I give you real guarantees." },
  guarantees: {
    es: [
      { icon: '🔒', title: 'Pago 100% Seguro', desc: 'Procesado por Stripe. Tus datos protegidos.' },
      { icon: '💰', title: 'Reembolso Total', desc: 'Si alquilas Propaxar Direct: 100% devuelto. No satisfecho en 7 días: lo hablamos.' },
      { icon: '👤', title: 'Experto Local Real', desc: 'No eres un número. Soy Manuel, 10+ años Frigiliana. WhatsApp directo conmigo.' },
    ],
    en: [
      { icon: '🔒', title: '100% Secure Payment', desc: 'Processed by Stripe. Your data protected.' },
      { icon: '💰', title: 'Full Refund', desc: "If you rent Propaxar Direct: 100% back. Not satisfied in 7 days: let's talk." },
      { icon: '👤', title: 'Real Local Expert', desc: "You're not a number. I'm Manuel, 10+ years in Frigiliana. Direct WhatsApp access to me." },
    ],
  },

  ctaTitle:     { es: '¿Listo Para Tu Reporte?', en: 'Ready For Your Report?' },
  ctaDesc:      { es: 'Un click te separa de conocer el 100% del mercado', en: 'One click away from knowing 100% of the market' },
  discountBadge:{ es: '-60% DESCUENTO', en: '-60% DISCOUNT' },
  monthsBadge:  { es: '6 MESES INCLUIDOS', en: '6 MONTHS INCLUDED' },
  payOnce:      { es: 'Pago único · 24 actualizaciones · Reembolsable', en: 'One-time payment · 24 updates · Refundable' },
  ctaBtn:       { es: 'Proceder al Pago Seguro →', en: 'Proceed to Secure Payment →' },
  ctaTrustA:    { es: '✓ Pago Stripe seguro', en: '✓ Secure Stripe payment' },
  ctaTrustB:    { es: '✓ Sin suscripciones', en: '✓ No subscriptions' },
  ctaTrustC:    { es: '✓ Reembolsable', en: '✓ Refundable' },
  lastGuaranteeLabel:{ es: '💡 ÚLTIMA GARANTÍA', en: '💡 FINAL GUARANTEE' },
  lastGuaranteeText: {
    es: 'Si en las primeras 24 horas tras recibir tu reporte no estás satisfecho, contacta y lo solucionamos. Mi reputación depende de clientes felices.',
    en: 'If within the first 24 hours after receiving your report you are not satisfied, get in touch and we will sort it out. My reputation depends on happy clients.',
  },

  contactPre:   { es: '¿Prefieres hablar antes de comprar?', en: 'Prefer to talk before purchasing?' },
  whatsappBtn:  { es: `💬 WhatsApp: ${PHONE}`, en: `💬 WhatsApp: ${PHONE}` },
  emailBtn:     { es: `📧 ${EMAIL}`, en: `📧 ${EMAIL}` },
  termsText:    { es: 'Al proceder al pago, aceptas los', en: 'By proceeding to payment, you accept the' },
  termsLink:    { es: 'Términos y Condiciones', en: 'Terms & Conditions' },
};

export default function ComprarReporte() {
  const [searchParams] = useSearchParams();
  const [accepted, setAccepted] = useState(false);

  const nombre      = searchParams.get('n') || '';
  const presupuesto = searchParams.get('b') || '';
  const dormitorios = searchParams.get('d') || '';
  const mascotas    = searchParams.get('p') || '';
  const langParam   = searchParams.get('lang') || 'es';
  const lang: Lang  = langParam === 'en' ? 'en' : 'es';

  const hasSearch = presupuesto || dormitorios || mascotas;

  const langToggle = lang === 'es'
    ? `?${new URLSearchParams({ ...Object.fromEntries(searchParams.entries()), lang: 'en' }).toString()}`
    : `?${new URLSearchParams({ ...Object.fromEntries(searchParams.entries()), lang: 'es' }).toString()}`;

  const petsDisplay = (p: string) =>
    p === 'si' || p === 'yes' ? t.petsYes[lang] : t.petsNo[lang];

  /* ─── Shared styles ─────────────────────────────────────────────── */
  const cardStyle = { backgroundColor: '#ffffff', border: '1px solid #e5e7eb', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' };
  const bodyFont  = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

  return (
    <div style={{ fontFamily: bodyFont, backgroundColor: '#f5f5f5', color: '#1a1a1a', minHeight: '100vh' }}>

      {/* ── Top bar ── */}
      <div style={{ backgroundColor: '#2d3e4e', position: 'sticky', top: 0, zIndex: 50 }}>
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-end">
          <Link
            to={`/comprar-reporte${langToggle}`}
            style={{ border: '1px solid rgba(255,255,255,0.45)', color: 'white', borderRadius: '6px', padding: '6px 14px', fontSize: '13px', fontWeight: 600, textDecoration: 'none', transition: 'background 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            {t.langToggleLabel[lang]}
          </Link>
        </div>
      </div>

      {/* ── HERO ── */}
      <section
        className="relative text-white overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #2d3e4e 0%, #3d5a73 50%, #2d3e4e 100%)' }}
      >
        <div className="relative max-w-3xl mx-auto px-6 pt-16 pb-24 text-center">
          {nombre && (
            <div
              className="inline-block rounded-lg px-5 py-2 text-sm font-semibold mb-8"
              style={{ backgroundColor: 'rgba(255,255,255,0.12)' }}
            >
              {t.greeting[lang](nombre)}
            </div>
          )}

          <h1
            className="font-black leading-tight mb-5 whitespace-pre-line"
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', letterSpacing: '-0.025em', lineHeight: 1.1 }}
          >
            {t.heroTitle[lang]}
          </h1>

          <p className="text-lg mb-10 max-w-xl mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>
            {t.heroDesc[lang]}
          </p>

          {/* Price card */}
          <div
            className="mx-auto w-full max-w-sm rounded-lg px-8 py-7"
            style={{ backgroundColor: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.18)' }}
          >
            <div className="flex gap-2 justify-center mb-4">
              <span className="rounded-lg px-3 py-1 text-xs font-black tracking-wide" style={{ backgroundColor: '#f59e0b', color: '#78350f' }}>
                {t.offerBadge[lang]}
              </span>
              <span className="rounded-lg px-3 py-1 text-xs font-black tracking-wide" style={{ backgroundColor: '#4ade80', color: '#14532d' }}>
                {t.refundBadge[lang]}
              </span>
            </div>
            <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: 'rgba(255,255,255,0.55)' }}>{t.investLabel[lang]}</p>
            <div className="flex items-center justify-center gap-3 mb-2">
              <span className="line-through text-2xl font-bold" style={{ color: 'rgba(255,255,255,0.35)' }}>€450</span>
              <span className="text-5xl font-black">€180</span>
            </div>
            <p className="text-sm mb-5" style={{ color: 'rgba(255,255,255,0.55)' }}>{t.vatNote[lang]}</p>

            {/* T&C checkbox */}
            <label
              className={`flex items-start gap-3 cursor-pointer text-left mb-4 rounded-lg px-3 py-2.5 transition-all ${!accepted ? 'animate-pulse' : ''}`}
              style={{
                border: accepted ? '1px solid rgba(74,222,128,0.5)' : '1px dashed rgba(255,255,255,0.35)',
                backgroundColor: accepted ? 'rgba(74,222,128,0.12)' : 'rgba(255,255,255,0.08)',
              }}
            >
              <input
                type="checkbox"
                checked={accepted}
                onChange={e => setAccepted(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded flex-shrink-0"
                style={{ accentColor: '#4ade80' }}
              />
              <span className="text-xs leading-snug">
                {!accepted && (
                  <span className="block font-bold text-xs mb-0.5" style={{ color: '#fcd34d' }}>
                    👆 {lang === 'es' ? 'Marca esto para continuar' : 'Tick this to continue'}
                  </span>
                )}
                <span style={{ color: 'rgba(255,255,255,0.7)' }}>
                  {t.termsText[lang]}{' '}
                  <Link to="/terminos-finder" className="text-white underline hover:no-underline">
                    {t.termsLink[lang]}
                  </Link>
                </span>
              </span>
            </label>

            <button
              onClick={() => { if (accepted) window.location.href = STRIPE_URL; }}
              disabled={!accepted}
              className="w-full font-bold text-lg py-4 rounded-lg transition-all"
              style={{
                backgroundColor: accepted ? '#4ade80' : '#9ca3af',
                color: accepted ? '#14532d' : '#6b7280',
                cursor: accepted ? 'pointer' : 'not-allowed',
                opacity: accepted ? 1 : 0.65,
                boxShadow: accepted ? '0 4px 14px rgba(74,222,128,0.3)' : 'none',
                border: 'none',
              }}
            >
              {t.ctaBtn[lang]}
            </button>
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 48h1440V24C1200 0 960 48 720 24S240 0 0 24V48z" fill="#f5f5f5" />
          </svg>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-16">

        {/* ── SEARCH SUMMARY ── */}
        {hasSearch && (
          <section className="bg-white rounded-lg overflow-hidden" style={cardStyle}>
            <div className="px-6 py-4 border-b" style={{ backgroundColor: '#f0f4f8', borderColor: '#d1dde8' }}>
              <p className="font-bold text-base" style={{ color: '#2d3e4e' }}>{t.searchTitle[lang]}</p>
            </div>
            <div className="px-6 py-5 flex flex-wrap gap-4">
              {presupuesto && (
                <div className="flex items-center gap-3 rounded-lg px-4 py-3 flex-1 min-w-[140px]" style={{ backgroundColor: '#f5f5f5' }}>
                  <span className="text-2xl">💰</span>
                  <div>
                    <p className="text-xs uppercase font-semibold tracking-wide" style={{ color: '#9ca3af' }}>{t.budgetLabel[lang]}</p>
                    <p className="font-bold" style={{ color: '#1a1a1a' }}>€{presupuesto}/mes</p>
                  </div>
                </div>
              )}
              {dormitorios && (
                <div className="flex items-center gap-3 rounded-lg px-4 py-3 flex-1 min-w-[140px]" style={{ backgroundColor: '#f5f5f5' }}>
                  <span className="text-2xl">🛏️</span>
                  <div>
                    <p className="text-xs uppercase font-semibold tracking-wide" style={{ color: '#9ca3af' }}>{t.bedroomLabel[lang]}</p>
                    <p className="font-bold" style={{ color: '#1a1a1a' }}>{dormitorios}{t.bedroomSuffix[lang]}</p>
                  </div>
                </div>
              )}
              {mascotas && (
                <div className="flex items-center gap-3 rounded-lg px-4 py-3 flex-1 min-w-[140px]" style={{ backgroundColor: '#f5f5f5' }}>
                  <span className="text-2xl">🐕</span>
                  <div>
                    <p className="text-xs uppercase font-semibold tracking-wide" style={{ color: '#9ca3af' }}>{t.petsLabel[lang]}</p>
                    <p className="font-bold" style={{ color: '#1a1a1a' }}>{petsDisplay(mascotas)}</p>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* ── WHAT'S INCLUDED ── */}
        <section>
          <div className="text-center mb-12">
            <span
              className="inline-block text-xs font-black px-4 py-1.5 rounded-lg tracking-widest uppercase mb-4"
              style={{ backgroundColor: 'rgba(61,90,115,0.12)', color: '#2d3e4e' }}
            >
              {t.includedLabel[lang]}
            </span>
            <h2
              className="font-black mb-3"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', color: '#1a1a1a', letterSpacing: '-0.02em', lineHeight: 1.1 }}
            >
              {t.includedTitle[lang]}
            </h2>
            <p className="text-lg max-w-xl mx-auto" style={{ color: '#666666' }}>{t.includedDesc[lang]}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.features[lang].map((f, i) => (
              <div
                key={i}
                className="rounded-lg p-6 transition-transform hover:-translate-y-1"
                style={{
                  backgroundColor: '#fff',
                  border: f.highlight ? '2px solid #4ade80' : '1px solid #e5e7eb',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                }}
              >
                <span className="text-3xl mb-4 block">{f.icon}</span>
                <h3 className="font-bold text-base mb-2" style={{ color: '#1a1a1a' }}>{f.title}</h3>
                <p className="text-sm leading-relaxed mb-3" style={{ color: '#666666' }}>{f.desc}</p>
                <span
                  className="text-xs font-bold px-2.5 py-1 rounded-lg"
                  style={{
                    backgroundColor: f.highlight ? 'rgba(74,222,128,0.15)' : 'rgba(61,90,115,0.10)',
                    color: f.highlight ? '#15803d' : '#2d3e4e',
                  }}
                >
                  {f.tag}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── TIMELINE ── */}
        <section className="bg-white rounded-lg overflow-hidden" style={cardStyle}>
          <div className="px-8 py-6 text-white" style={{ backgroundColor: '#2d3e4e' }}>
            <h2 className="text-2xl font-black" style={{ letterSpacing: '-0.02em' }}>{t.timelineTitle[lang]}</h2>
          </div>
          <div className="px-8 py-8">
            <div className="relative">
              <div className="absolute left-5 top-6 bottom-6 w-0.5" style={{ backgroundColor: '#d1dde8' }} />
              <div className="space-y-8">
                {t.steps[lang].map((step, i) => (
                  <div key={i} className="flex gap-5">
                    <div
                      className="flex-shrink-0 w-10 h-10 rounded-full text-white flex items-center justify-center font-black text-base z-10"
                      style={{ backgroundColor: '#3d5a73' }}
                    >
                      {step.num}
                    </div>
                    <div className="pt-1.5">
                      <h3 className="font-bold mb-1" style={{ color: '#1a1a1a' }}>{step.title}</h3>
                      <p className="text-sm leading-relaxed" style={{ color: '#666666' }}>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── GUARANTEES ── */}
        <section className="text-center">
          <h2
            className="font-black mb-2"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: '#1a1a1a', letterSpacing: '-0.02em' }}
          >
            {t.guaranteesTitle[lang]}
          </h2>
          <p className="mb-10" style={{ color: '#666666' }}>{t.guaranteesDesc[lang]}</p>
          <div className="grid sm:grid-cols-3 gap-4">
            {t.guarantees[lang].map((g, i) => (
              <div key={i} className="bg-white rounded-lg p-6" style={cardStyle}>
                <span className="text-4xl block mb-3">{g.icon}</span>
                <h3 className="font-bold mb-2" style={{ color: '#1a1a1a' }}>{g.title}</h3>
                <p className="text-sm" style={{ color: '#666666' }}>{g.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section>
          <div
            className="rounded-lg overflow-hidden text-white"
            style={{ background: 'linear-gradient(135deg, #2d3e4e 0%, #3d5a73 50%, #2d3e4e 100%)' }}
          >
            <div className="px-8 py-10 text-center">
              <div
                className="mx-auto w-full max-w-sm rounded-lg p-8"
                style={{ backgroundColor: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.18)' }}
              >
                <div className="flex gap-2 justify-center mb-4">
                  <span className="rounded-lg px-3 py-1 text-xs font-black" style={{ backgroundColor: '#f59e0b', color: '#78350f' }}>
                    {t.discountBadge[lang]}
                  </span>
                  <span className="rounded-lg px-3 py-1 text-xs font-black" style={{ backgroundColor: '#4ade80', color: '#14532d' }}>
                    {t.monthsBadge[lang]}
                  </span>
                </div>

                <div className="flex items-center justify-center gap-3 mb-1">
                  <span className="line-through text-xl font-bold" style={{ color: 'rgba(255,255,255,0.35)' }}>€450</span>
                  <span className="text-5xl font-black">€180</span>
                </div>
                <p className="text-sm mb-5" style={{ color: 'rgba(255,255,255,0.55)' }}>{t.payOnce[lang]}</p>

                {/* T&C checkbox */}
                <label
                  className={`flex items-start gap-3 cursor-pointer text-left mb-4 rounded-lg px-3 py-2.5 transition-all ${!accepted ? 'animate-pulse' : ''}`}
                  style={{
                    border: accepted ? '1px solid rgba(74,222,128,0.5)' : '1px dashed rgba(255,255,255,0.35)',
                    backgroundColor: accepted ? 'rgba(74,222,128,0.12)' : 'rgba(255,255,255,0.08)',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={accepted}
                    onChange={e => setAccepted(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded flex-shrink-0"
                    style={{ accentColor: '#4ade80' }}
                  />
                  <span className="text-xs leading-snug">
                    {!accepted && (
                      <span className="block font-bold text-xs mb-0.5" style={{ color: '#fcd34d' }}>
                        👆 {lang === 'es' ? 'Marca esto para continuar' : 'Tick this to continue'}
                      </span>
                    )}
                    <span style={{ color: 'rgba(255,255,255,0.7)' }}>
                      {t.termsText[lang]}{' '}
                      <Link to="/terminos-finder" className="text-white underline hover:no-underline">
                        {t.termsLink[lang]}
                      </Link>
                    </span>
                  </span>
                </label>

                <button
                  onClick={() => { if (accepted) window.location.href = STRIPE_URL; }}
                  disabled={!accepted}
                  className="w-full font-bold text-xl py-5 rounded-lg transition-all mb-4"
                  style={{
                    backgroundColor: accepted ? '#4ade80' : '#9ca3af',
                    color: accepted ? '#14532d' : '#6b7280',
                    cursor: accepted ? 'pointer' : 'not-allowed',
                    opacity: accepted ? 1 : 0.65,
                    boxShadow: accepted ? '0 4px 14px rgba(74,222,128,0.3)' : 'none',
                    border: 'none',
                  }}
                >
                  {t.ctaBtn[lang]}
                </button>

                <div className="flex flex-wrap justify-center gap-3 text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  <span>{t.ctaTrustA[lang]}</span>
                  <span>·</span>
                  <span>{t.ctaTrustB[lang]}</span>
                  <span>·</span>
                  <span>{t.ctaTrustC[lang]}</span>
                </div>
              </div>

              <div
                className="mt-6 rounded-lg px-6 py-4 max-w-md mx-auto text-left"
                style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
              >
                <p className="text-xs font-black mb-1" style={{ color: '#fcd34d' }}>{t.lastGuaranteeLabel[lang]}</p>
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.75)' }}>{t.lastGuaranteeText[lang]}</p>
              </div>
            </div>

            {/* Contact strip */}
            <div
              className="border-t px-8 py-6 text-center"
              style={{ borderColor: 'rgba(255,255,255,0.15)', backgroundColor: 'rgba(0,0,0,0.12)' }}
            >
              <p className="text-sm font-semibold mb-4" style={{ color: 'rgba(255,255,255,0.7)' }}>{t.contactPre[lang]}</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    lang === 'es'
                      ? `Hola Manuel, tengo una pregunta sobre el Reporte de Mercado Frigiliana.${nombre ? ` Soy ${nombre}.` : ''}`
                      : `Hi Manuel, I have a question about the Frigiliana Market Report.${nombre ? ` I'm ${nombre}.` : ''}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white font-bold px-6 py-3 rounded-lg transition hover:opacity-90"
                  style={{ backgroundColor: '#22c55e' }}
                >
                  {t.whatsappBtn[lang]}
                </a>
                <a
                  href={`mailto:${EMAIL}`}
                  className="inline-flex items-center gap-2 text-white font-semibold px-6 py-3 rounded-lg transition hover:bg-white/20"
                  style={{ backgroundColor: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.2)' }}
                >
                  {t.emailBtn[lang]}
                </a>
              </div>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
                {t.termsText[lang]}{' '}
                <Link to="/terminos-finder" className="text-white underline hover:no-underline">
                  {t.termsLink[lang]}
                </Link>
              </p>
            </div>
          </div>
        </section>

      </div>

      <div className="h-10" />
    </div>
  );
}
