import { useSearchParams, Link } from 'react-router-dom';
import { useState } from 'react';

const STRIPE_URL = 'https://buy.stripe.com/00w14p63G5Zc5EKfmxgEg02';
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
      { icon: '🎁', title: 'Reembolso Total Garantizado', desc: 'Si acabas alquilando una propiedad Propaxar Direct, reembolsamos los €250 completos. Literalmente no arriesgas nada. Solo ganas.', tag: '✓ Riesgo cero para ti', highlight: true },
    ],
    en: [
      { icon: '🏘️', title: 'Hand-Selected Properties', desc: 'Manually chosen to match your budget, bedrooms, pets and move-in date. No irrelevant listings, no wasted time.', tag: '✓ 100% relevant to you' },
      { icon: '📊', title: 'Honest Market Analysis', desc: 'Real prices, current availability and insider knowledge only a local expert with 10+ years holds. No filters, no marketing spin.', tag: '✓ Information nobody else shares' },
      { icon: '🎯', title: 'Clear, Direct Recommendation', desc: "Which property fits your profile best and why. Save hours of confusion and wrong decisions. I tell you the truth even if you don't like it.", tag: '✓ No ambiguity' },
      { icon: '📦', title: 'Insider Logistics Guide', desc: 'Country vs town, package delivery, water systems, waste collection. The brutal truth you discover after you move in… but BEFORE.', tag: '✓ Avoid nasty surprises' },
      { icon: '📅', title: '6 Months Active Follow-Up', desc: 'Every Friday: new properties, price changes and market insights. Until you find your home. I work, you relax.', tag: '✓ 24 updates included' },
      { icon: '🎁', title: 'Full Refund Guaranteed', desc: 'If you end up renting a Propaxar Direct property, we refund the full €250. Literally zero risk. You can only win.', tag: '✓ Zero risk for you', highlight: true },
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
      { icon: '💰', title: 'Full Refund', desc: 'If you rent Propaxar Direct: 100% back. Not satisfied in 7 days: let\'s talk.' },
      { icon: '👤', title: 'Real Local Expert', desc: "You're not a number. I'm Manuel, 10+ years in Frigiliana. Direct WhatsApp access to me." },
    ],
  },

  ctaTitle:     { es: '¿Listo Para Tu Reporte?', en: 'Ready For Your Report?' },
  ctaDesc:      { es: 'Un click te separa de conocer el 100% del mercado', en: 'One click away from knowing 100% of the market' },
  discountBadge:{ es: '-44% DESCUENTO', en: '-44% DISCOUNT' },
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

  const whatsappMsg = encodeURIComponent(
    lang === 'es'
      ? `Hola Manuel, quiero comprar el Reporte de Mercado Frigiliana.${nombre ? ` Soy ${nombre}.` : ''}${presupuesto ? ` Presupuesto: €${presupuesto}/mes.` : ''}${dormitorios ? ` Dormitorios: ${dormitorios}+.` : ''}${mascotas ? ` Mascotas: ${mascotas === 'si' || mascotas === 'yes' ? 'Sí' : 'No'}.` : ''}`
      : `Hi Manuel, I want to buy the Frigiliana Market Report.${nombre ? ` I'm ${nombre}.` : ''}${presupuesto ? ` Budget: €${presupuesto}/month.` : ''}${dormitorios ? ` Bedrooms: ${dormitorios}+.` : ''}${mascotas ? ` Pets: ${mascotas === 'si' || mascotas === 'yes' ? 'Yes' : 'No'}.` : ''}`
  );

  const petsDisplay = (p: string) =>
    p === 'si' || p === 'yes' ? t.petsYes[lang] : t.petsNo[lang];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Top bar: lang toggle ── */}
      <div className="sticky top-0 z-50 bg-[#2d3e4e]/95 backdrop-blur border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <div />
          <Link
            to={`/comprar-reporte${langToggle}`}
            className="text-sm font-bold px-4 py-1.5 rounded-full border-2 border-white/50 text-white hover:bg-white hover:text-[#2d3e4e] transition"
          >
            {t.langToggleLabel[lang]}
          </Link>
        </div>
      </div>

      {/* ── HERO ── */}
      <section className="relative bg-gradient-to-br from-[#2d3e4e] via-[#3d5a73] to-[#2d3e4e] text-white overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none" />

        <div className="relative max-w-3xl mx-auto px-4 pt-14 pb-20 text-center">
          {nombre && (
            <div className="inline-block bg-white/15 backdrop-blur rounded-full px-5 py-2 text-base font-semibold mb-6">
              {t.greeting[lang](nombre)}
            </div>
          )}

          <h1 className="text-4xl md:text-5xl font-black leading-tight mb-5 whitespace-pre-line">
            {t.heroTitle[lang]}
          </h1>

          <p className="text-white/75 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            {t.heroDesc[lang]}
          </p>

        {/* Price callout */}
          <div className="inline-block bg-white/10 backdrop-blur border border-white/20 rounded-2xl px-8 py-6 w-full max-w-sm">
            <div className="flex gap-2 justify-center mb-3">
              <span className="bg-amber-400 text-amber-900 text-xs font-black px-3 py-1 rounded-full tracking-wide">
                {t.offerBadge[lang]}
              </span>
              <span className="bg-green-400 text-green-900 text-xs font-black px-3 py-1 rounded-full tracking-wide">
                {t.refundBadge[lang]}
              </span>
            </div>
            <p className="text-xs font-bold tracking-widest uppercase text-white/60 mb-1">{t.investLabel[lang]}</p>
            <div className="flex items-center justify-center gap-3 mb-2">
              <span className="text-white/40 line-through text-2xl font-bold">€450</span>
              <span className="text-5xl font-black">€250</span>
            </div>
            <p className="text-white/60 text-sm mb-4">{t.vatNote[lang]}</p>

            {/* T&C checkbox */}
            <label className={`flex items-start gap-3 cursor-pointer text-left mb-4 rounded-lg px-3 py-2.5 transition-all border ${
              accepted
                ? 'bg-green-400/15 border-green-400/40'
                : 'bg-white/10 border-white/30 border-dashed animate-pulse'
            }`}>
              <input
                type="checkbox"
                checked={accepted}
                onChange={e => setAccepted(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded accent-green-400 flex-shrink-0"
              />
               <span className="text-xs leading-snug">
                 {!accepted && <span className="block text-amber-300 font-bold text-xs mb-0.5">👆 {lang === 'es' ? 'Marca esto para continuar' : 'Tick this to continue'}</span>}
                 <span className="text-white/70">
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
              className={`w-full font-black text-lg py-4 rounded-xl transition-all shadow-lg ${
                accepted
                  ? 'bg-green-400 hover:bg-green-300 active:bg-green-500 text-green-900 active:scale-[0.98]'
                  : 'bg-gray-400 text-gray-600 cursor-not-allowed opacity-60'
              }`}
            >
              {t.ctaBtn[lang]}
            </button>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 48h1440V24C1200 0 960 48 720 24S240 0 0 24V48z" fill="#f9fafb" />
          </svg>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-14">

        {/* ── SEARCH SUMMARY ── */}
        {hasSearch && (
          <section className="bg-white rounded-2xl shadow-sm border border-[#3d5a73]/20 overflow-hidden">
            <div className="bg-[#3d5a73]/10 border-b border-[#3d5a73]/20 px-6 py-4">
              <p className="text-[#2d3e4e] font-bold text-base">{t.searchTitle[lang]}</p>
            </div>
            <div className="px-6 py-5 flex flex-wrap gap-4">
              {presupuesto && (
                <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 flex-1 min-w-[140px]">
                  <span className="text-2xl">💰</span>
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-semibold tracking-wide">{t.budgetLabel[lang]}</p>
                    <p className="font-bold text-gray-900">€{presupuesto}/mes</p>
                  </div>
                </div>
              )}
              {dormitorios && (
                <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 flex-1 min-w-[140px]">
                  <span className="text-2xl">🛏️</span>
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-semibold tracking-wide">{t.bedroomLabel[lang]}</p>
                    <p className="font-bold text-gray-900">{dormitorios}{t.bedroomSuffix[lang]}</p>
                  </div>
                </div>
              )}
              {mascotas && (
                <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 flex-1 min-w-[140px]">
                  <span className="text-2xl">🐕</span>
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-semibold tracking-wide">{t.petsLabel[lang]}</p>
                    <p className="font-bold text-gray-900">{petsDisplay(mascotas)}</p>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* ── WHAT'S INCLUDED ── */}
        <section>
          <div className="text-center mb-10">
            <span className="inline-block bg-[#3d5a73]/15 text-[#2d3e4e] text-xs font-black px-4 py-1.5 rounded-full tracking-widest uppercase mb-3">
              {t.includedLabel[lang]}
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">{t.includedTitle[lang]}</h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">{t.includedDesc[lang]}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {t.features[lang].map((f, i) => (
              <div
                key={i}
                className={`rounded-2xl p-6 border transition hover:-translate-y-1 hover:shadow-md ${
                  f.highlight
                    ? 'bg-gradient-to-br from-amber-50 to-green-50 border-amber-200'
                    : 'bg-white border-gray-100 shadow-sm'
                }`}
              >
                <span className="text-4xl mb-4 block">{f.icon}</span>
                <h3 className="font-bold text-gray-900 text-base mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-3">{f.desc}</p>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                  f.highlight ? 'bg-green-100 text-green-700' : 'bg-[#3d5a73]/10 text-[#2d3e4e]'
                }`}>{f.tag}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── TIMELINE ── */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-[#2d3e4e] px-8 py-6 text-white">
            <h2 className="text-2xl font-black">{t.timelineTitle[lang]}</h2>
          </div>
          <div className="px-8 py-8">
            <div className="relative">
              <div className="absolute left-5 top-6 bottom-6 w-0.5 bg-[#3d5a73]/20" />
              <div className="space-y-8">
                {t.steps[lang].map((step, i) => (
                  <div key={i} className="flex gap-5">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#3d5a73] text-white flex items-center justify-center font-black text-base z-10">
                      {step.num}
                    </div>
                    <div className="pt-1.5">
                      <h3 className="font-bold text-gray-900 mb-1">{step.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── GUARANTEES ── */}
        <section className="text-center">
          <h2 className="text-3xl font-black text-gray-900 mb-2">{t.guaranteesTitle[lang]}</h2>
          <p className="text-gray-500 mb-8">{t.guaranteesDesc[lang]}</p>
          <div className="grid sm:grid-cols-3 gap-5">
            {t.guarantees[lang].map((g, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <span className="text-4xl block mb-3">{g.icon}</span>
                <h3 className="font-bold text-gray-900 mb-2">{g.title}</h3>
                <p className="text-gray-500 text-sm">{g.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section>
          <div className="bg-gradient-to-br from-[#2d3e4e] via-[#3d5a73] to-[#2d3e4e] rounded-2xl overflow-hidden text-white">
            <div className="px-8 py-10 text-center">

              <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-8 max-w-sm mx-auto">
                <div className="flex gap-2 justify-center mb-4">
                  <span className="bg-amber-400 text-amber-900 text-xs font-black px-3 py-1 rounded-full">
                    {t.discountBadge[lang]}
                  </span>
                  <span className="bg-green-400 text-green-900 text-xs font-black px-3 py-1 rounded-full">
                    {t.monthsBadge[lang]}
                  </span>
                </div>

                <div className="flex items-center justify-center gap-3 mb-1">
                  <span className="text-white/40 line-through text-xl font-bold">€450</span>
                  <span className="text-5xl font-black">€250</span>
                </div>
                <p className="text-white/60 text-sm mb-5">{t.payOnce[lang]}</p>

                {/* T&C checkbox — duplicated here so user doesn't need to scroll up */}
                <label className={`flex items-start gap-3 cursor-pointer text-left mb-4 rounded-lg px-3 py-2.5 transition-all border ${
                  accepted
                    ? 'bg-green-400/15 border-green-400/40'
                    : 'bg-white/10 border-white/30 border-dashed animate-pulse'
                }`}>
                  <input
                    type="checkbox"
                    checked={accepted}
                    onChange={e => setAccepted(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded accent-green-400 flex-shrink-0"
                  />
                  <span className="text-xs leading-snug">
                    {!accepted && <span className="block text-amber-300 font-bold text-xs mb-0.5">👆 {lang === 'es' ? 'Marca esto para continuar' : 'Tick this to continue'}</span>}
                    <span className="text-white/70">
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
                  className={`w-full font-black text-xl py-5 rounded-xl transition-all shadow-lg mb-4 ${
                    accepted
                      ? 'bg-green-400 hover:bg-green-300 active:bg-green-500 text-green-900 active:scale-[0.98]'
                      : 'bg-gray-400 text-gray-600 cursor-not-allowed opacity-60'
                  }`}
                >
                  {t.ctaBtn[lang]}
                </button>

                <div className="flex flex-wrap justify-center gap-3 text-xs text-white/60">
                  <span>{t.ctaTrustA[lang]}</span>
                  <span>·</span>
                  <span>{t.ctaTrustB[lang]}</span>
                  <span>·</span>
                  <span>{t.ctaTrustC[lang]}</span>
                </div>
              </div>

              <div className="mt-6 bg-white/10 rounded-xl px-6 py-4 max-w-md mx-auto text-left">
                <p className="text-xs font-black text-amber-300 mb-1">{t.lastGuaranteeLabel[lang]}</p>
                <p className="text-sm text-white/75">{t.lastGuaranteeText[lang]}</p>
              </div>
            </div>

            {/* Contact strip */}
            <div className="border-t border-white/20 bg-black/10 px-8 py-6 text-center">
              <p className="text-white/70 text-sm font-semibold mb-4">{t.contactPre[lang]}</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    lang === 'es'
                      ? `Hola Manuel, tengo una pregunta sobre el Reporte de Mercado Frigiliana.${nombre ? ` Soy ${nombre}.` : ''}`
                      : `Hi Manuel, I have a question about the Frigiliana Market Report.${nombre ? ` I'm ${nombre}.` : ''}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white font-bold px-6 py-3 rounded-xl transition"
                >
                  {t.whatsappBtn[lang]}
                </a>
                <a
                  href={`mailto:${EMAIL}`}
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-xl transition border border-white/20"
                >
                  {t.emailBtn[lang]}
                </a>
              </div>
              <p className="text-xs text-blue-300">
                {t.termsText[lang]}{' '}
                <Link to="/terminos-finder" className="text-white underline hover:no-underline">
                  {t.termsLink[lang]}
                </Link>
              </p>
            </div>
          </div>
        </section>

      </div>

      {/* Bottom padding */}
      <div className="h-10" />
    </div>
  );
}
