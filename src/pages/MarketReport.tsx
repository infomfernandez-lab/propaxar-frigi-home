import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const STRIPE_URL = 'https://buy.stripe.com/bJe6oJ9fS73gffkdepgEg05';
const WHATSAPP_NUMBER = '34662317561';
const EMAIL = 'info@propaxar.es';
const PHONE = '+34 662 317 561';

type Lang = 'es' | 'en';

/* ── TRANSLATIONS ── */
const t = {
  meta: {
    es: { title: 'Tu Reporte de Mercado Personalizado — Frigiliana | Propaxar', desc: 'Análisis profesional del mercado inmobiliario de Frigiliana adaptado a tu perfil. Propiedades reales, precios verificados, 6 meses de seguimiento. €180.' },
    en: { title: 'Your Personalised Market Report — Frigiliana | Propaxar', desc: 'Professional Frigiliana real estate market analysis tailored to your profile. Real properties, verified prices, 6 months follow-up. €180.' },
  },
  heroTag: { es: 'REPORTE PERSONALIZADO', en: 'PERSONALISED REPORT' },
  heroTitle: {
    es: 'El 100% del mercado\nde Frigiliana.\nAnalizado para ti.',
    en: 'The 100% of Frigiliana\'s\nmarket.\nAnalysed for you.',
  },
  heroDesc: {
    es: 'Propiedades reales seleccionadas para tu perfil. Precios verificados. Información privilegiada que ningún portal publica. Todo en un reporte profesional único.',
    en: 'Real properties selected for your profile. Verified prices. Insider information no portal publishes. All in a unique professional report.',
  },
  heroAuthor: {
    es: 'Por Manuel C. Fernández Ramírez · 40 años de conocimiento local',
    en: 'By Manuel C. Fernández Ramírez · 40 years of local knowledge',
  },

  // Price block
  offerBadge: { es: '-60% DESCUENTO', en: '-60% DISCOUNT' },
  refundBadge: { es: 'REEMBOLSABLE', en: 'REFUNDABLE' },
  investLabel: { es: 'INVERSIÓN ÚNICA', en: 'ONE-TIME INVESTMENT' },
  vatNote: { es: 'IVA incluido · Sin cargos recurrentes · 6 meses soporte', en: 'VAT included · No recurring charges · 6 months support' },

  // Data section
  dataTag: { es: 'RESPALDADO POR DATOS', en: 'DATA-BACKED' },
  dataTitle: { es: 'No es opinión. Son hechos.', en: "It's not opinion. It's facts." },
  dataDesc: {
    es: 'Tu reporte se construye con la misma inteligencia de mercado de 18 fuentes oficiales que usamos internamente.',
    en: 'Your report is built with the same market intelligence from 18 official sources we use internally.',
  },
  kpis: {
    es: [
      { label: '€/m² Frigiliana', val: '3.295', sub: 'Idealista dic. 2025', badge: '▲ +6,4%' },
      { label: 'Pasajeros 2025', val: '26,7M', sub: 'Récord histórico', badge: '▲ +7,4%' },
      { label: 'Extranjeros', val: '32,3%', sub: 'De compraventas', badge: '2ª provincia' },
      { label: 'Ingresos VUT', val: '29k€', sub: 'Media anual', badge: '72% ocup.' },
      { label: 'Compraventas España', val: '705.000', sub: 'Récord desde 2008', badge: '▲ +10,4%' },
      { label: 'Turistas Frigiliana', val: '54.745', sub: 'Pernoctación 2024', badge: '▲ +5,8%' },
    ],
    en: [
      { label: '€/m² Frigiliana', val: '3,295', sub: 'Idealista Dec 2025', badge: '▲ +6.4%' },
      { label: 'Passengers 2025', val: '26.7M', sub: 'All-time record', badge: '▲ +7.4%' },
      { label: 'Foreign buyers', val: '32.3%', sub: 'Of all purchases', badge: '2nd province' },
      { label: 'VUT income', val: '29k€', sub: 'Annual average', badge: '72% occ.' },
      { label: 'Sales Spain', val: '705,000', sub: 'Record since 2008', badge: '▲ +10.4%' },
      { label: 'Tourists Frigiliana', val: '54,745', sub: 'Overnight stays 2024', badge: '▲ +5.8%' },
    ],
  },

  // Exclusive insight
  insightTitle: { es: 'Dato exclusivo Propaxar', en: 'Propaxar exclusive insight' },
  insightText: {
    es: 'Frigiliana cotiza un 24% por debajo de Nerja con rentabilidad vacacional comparable (72% vs 76% ocupación). Para el mismo presupuesto, en Frigiliana obtienes un <strong>32% más de metros cuadrados</strong>.',
    en: 'Frigiliana is priced 24% below Nerja with comparable vacation rental yields (72% vs 76% occupancy). For the same budget, in Frigiliana you get <strong>32% more square metres</strong>.',
  },

  // What's included
  includedTag: { es: 'QUÉ RECIBES', en: 'WHAT YOU GET' },
  includedTitle: { es: 'No es un listado.\nEs una consultoría.', en: "It's not a listing.\nIt's a consultancy." },
  includedDesc: {
    es: 'Un análisis profesional completo adaptado a tu perfil, presupuesto y necesidades reales.',
    en: 'A complete professional analysis tailored to your profile, budget and real needs.',
  },
  features: {
    es: [
      { icon: '🏘️', title: 'Propiedades Seleccionadas', desc: 'Escogidas manualmente para tu presupuesto, dormitorios, mascotas y fecha de entrada. Sin propiedades irrelevantes.', tag: '✓ 100% relevantes para ti' },
      { icon: '📊', title: 'Análisis Honesto del Mercado', desc: 'Precios reales, disponibilidad actual e información privilegiada que solo un experto local con 40 años conoce.', tag: '✓ Info que nadie más da' },
      { icon: '🎯', title: 'Recomendación Clara y Directa', desc: 'Qué propiedad se ajusta mejor a tu perfil y por qué. Te digo la verdad aunque no te guste.', tag: '✓ Sin ambigüedades' },
      { icon: '📦', title: 'Guía Logística Insider', desc: 'Campo vs pueblo, paquetería, agua, basuras. La verdad brutal que descubres cuando ya te mudaste… pero ANTES.', tag: '✓ Evita sorpresas' },
      { icon: '📅', title: '6 Meses de Seguimiento Activo', desc: 'Cada viernes: nuevas propiedades, cambios de precios, insights. Hasta que encuentres tu hogar.', tag: '✓ 24 actualizaciones' },
      { icon: '🎁', title: 'Reembolso Total Garantizado', desc: 'Si alquilas una propiedad Propaxar Direct, reembolsamos los €180 completos. Riesgo cero.', tag: '✓ Riesgo cero', highlight: true },
    ],
    en: [
      { icon: '🏘️', title: 'Hand-Selected Properties', desc: 'Manually chosen to match your budget, bedrooms, pets and move-in date. No irrelevant listings.', tag: '✓ 100% relevant to you' },
      { icon: '📊', title: 'Honest Market Analysis', desc: 'Real prices, current availability and insider knowledge only a local expert with 40 years holds.', tag: '✓ Info nobody else shares' },
      { icon: '🎯', title: 'Clear, Direct Recommendation', desc: "Which property fits your profile best and why. I tell you the truth even if you don't like it.", tag: '✓ No ambiguity' },
      { icon: '📦', title: 'Insider Logistics Guide', desc: 'Country vs town, package delivery, water systems, waste collection. The truth you discover after moving… but BEFORE.', tag: '✓ Avoid surprises' },
      { icon: '📅', title: '6 Months Active Follow-Up', desc: 'Every Friday: new properties, price changes, market insights. Until you find your home.', tag: '✓ 24 updates included' },
      { icon: '🎁', title: 'Full Refund Guaranteed', desc: 'If you rent a Propaxar Direct property, we refund the full €180. Zero risk.', tag: '✓ Zero risk', highlight: true },
    ],
  },

  // Axarquía table
  tableTag: { es: 'COMPARATIVA', en: 'COMPARISON' },
  tableTitle: { es: 'Frigiliana vs La Axarquía', en: 'Frigiliana vs La Axarquía' },
  tableDesc: {
    es: 'Estos son los datos reales que verás analizados en profundidad dentro de tu reporte.',
    en: 'These are the real data points you will see analysed in depth inside your report.',
  },
  tableCols: {
    es: ['Municipio', '€/m²', 'Alquiler/mes', 'Ocup. VUT', 'Tend.'],
    en: ['Municipality', '€/m²', 'Rent/month', 'VUT Occ.', 'Trend'],
  },

  // Seasonality
  seasonTitle: { es: 'Estacionalidad vacacional — Frigiliana', en: 'Vacation seasonality — Frigiliana' },
  seasonSub: { es: 'Ocupación mensual — Airbtics 2024', en: 'Monthly occupancy — Airbtics 2024' },
  seasonStats: {
    es: [
      { a: 'Agosto pico', b: '251€/noche' },
      { a: 'Media anual', b: '124€/noche' },
      { a: '263 noches', b: 'reservadas/año' },
    ],
    en: [
      { a: 'August peak', b: '€251/night' },
      { a: 'Annual average', b: '€124/night' },
      { a: '263 nights', b: 'booked/year' },
    ],
  },

  // Timeline
  timelineTag: { es: 'EL PROCESO', en: 'THE PROCESS' },
  timelineTitle: { es: 'Qué pasa después del pago', en: 'What happens after payment' },
  steps: {
    es: [
      { num: '1', title: 'Confirmación inmediata', time: '0-5 min', desc: 'Recibes email de confirmación. Te confirmo personalmente por WhatsApp que empiezo tu reporte.' },
      { num: '2', title: 'Análisis y creación', time: '24-48h', desc: 'Peino el mercado completo, verifico disponibilidad, selecciono propiedades y creo tu reporte con análisis detallado.' },
      { num: '3', title: 'Entrega de tu reporte', time: 'Día 2-3', desc: 'Recibes tu URL personalizada por email y WhatsApp. Acceso inmediato, válido 6 meses.' },
      { num: '4', title: 'Seguimiento semanal', time: '6 meses', desc: 'Cada viernes actualizo tu reporte: nuevas propiedades, cambios de precio. Si aparece LA casa perfecta, te aviso.' },
    ],
    en: [
      { num: '1', title: 'Immediate confirmation', time: '0-5 min', desc: 'You receive a confirmation email. I personally confirm via WhatsApp that I am starting your report.' },
      { num: '2', title: 'Analysis & creation', time: '24-48h', desc: 'I scour the entire market, verify availability, select properties and build your report with detailed analysis.' },
      { num: '3', title: 'Report delivery', time: 'Day 2-3', desc: 'You receive your personalised URL by email and WhatsApp. Immediate access, valid for 6 months.' },
      { num: '4', title: 'Weekly follow-up', time: '6 months', desc: 'Every Friday I update your report: new properties, price changes. If THE perfect home appears, I alert you.' },
    ],
  },

  // Guarantees
  guaranteesTitle: { es: 'Garantías que te protegen', en: 'Guarantees that protect you' },
  guaranteesDesc: { es: 'No te pido fe ciega. Te doy garantías reales.', en: "I don't ask for blind faith. I give you real guarantees." },
  guarantees: {
    es: [
      { icon: '🔒', title: 'Pago 100% Seguro', desc: 'Procesado por Stripe. Tus datos protegidos.' },
      { icon: '💰', title: 'Reembolso Total', desc: 'Si alquilas Propaxar Direct: 100% devuelto. No satisfecho en 7 días: lo hablamos.' },
      { icon: '👤', title: 'Experto Local Real', desc: 'No eres un número. Soy Manuel, 40 años en Frigiliana. WhatsApp directo conmigo.' },
    ],
    en: [
      { icon: '🔒', title: '100% Secure Payment', desc: 'Processed by Stripe. Your data protected.' },
      { icon: '💰', title: 'Full Refund', desc: "If you rent Propaxar Direct: 100% back. Not satisfied in 7 days: let's talk." },
      { icon: '👤', title: 'Real Local Expert', desc: "You're not a number. I'm Manuel, 40 years in Frigiliana. Direct WhatsApp access." },
    ],
  },

  // Preview section
  previewTag: { es: 'EJEMPLO REAL', en: 'REAL EXAMPLE' },
  previewTitle: { es: 'Así es tu reporte por dentro', en: 'This is your report inside' },
  previewDesc: {
    es: 'Un reporte real creado para un cliente satisfecho. Nombre anonimizado por privacidad.',
    en: 'A real report created for a satisfied client. Name anonymised for privacy.',
  },
  previewCards: {
    es: [
      { title: 'Resumen de búsqueda', desc: 'Tu perfil, presupuesto y propiedades encontradas de un vistazo.' },
      { title: 'Análisis de propiedad', desc: 'Pros, contras, puntuación profesional, fotos y tests in situ.' },
      { title: 'Info insider exclusiva', desc: 'Datos del propietario, historial y mapa de vecinos.' },
      { title: 'Recomendación del experto', desc: 'La propiedad que mejor encaja contigo y por qué.' },
    ],
    en: [
      { title: 'Search summary', desc: 'Your profile, budget and properties found at a glance.' },
      { title: 'Property analysis', desc: 'Pros, cons, professional rating, photos and on-site tests.' },
      { title: 'Exclusive insider info', desc: 'Owner details, history and neighbour map.' },
      { title: 'Expert recommendation', desc: 'The property that best fits you and why.' },
    ],
  },
  previewCta: { es: 'Ver reporte demo completo →', en: 'See full demo report →' },
  previewNote: { es: 'El tuyo será personalizado para tu perfil y presupuesto', en: 'Yours will be personalised for your profile and budget' },

  // CTA
  ctaTitle: { es: '¿Listo para tu reporte?', en: 'Ready for your report?' },
  ctaDesc: { es: 'Un click te separa de conocer el 100% del mercado', en: 'One click away from knowing 100% of the market' },
  ctaBtn: { es: 'Proceder al Pago Seguro →', en: 'Proceed to Secure Payment →' },
  payOnce: { es: 'Pago único · 24 actualizaciones · Reembolsable', en: 'One-time payment · 24 updates · Refundable' },
  ctaTrustA: { es: '✓ Pago Stripe seguro', en: '✓ Secure Stripe payment' },
  ctaTrustB: { es: '✓ Sin suscripciones', en: '✓ No subscriptions' },
  ctaTrustC: { es: '✓ Reembolsable', en: '✓ Refundable' },
  termsText: { es: 'Al proceder al pago, aceptas los', en: 'By proceeding to payment, you accept the' },
  termsLink: { es: 'Términos y Condiciones', en: 'Terms & Conditions' },
  tickMark: { es: 'Marca esto para continuar', en: 'Tick this to continue' },
  lastGuaranteeLabel: { es: '💡 ÚLTIMA GARANTÍA', en: '💡 FINAL GUARANTEE' },
  lastGuaranteeText: {
    es: 'Si en las primeras 24 horas tras recibir tu reporte no estás satisfecho, contacta y lo solucionamos. Mi reputación depende de clientes felices.',
    en: 'If within the first 24 hours after receiving your report you are not satisfied, get in touch and we will sort it out. My reputation depends on happy clients.',
  },
  contactPre: { es: '¿Prefieres hablar antes de comprar?', en: 'Prefer to talk before purchasing?' },
  whatsappBtn: { es: `💬 WhatsApp: ${PHONE}`, en: `💬 WhatsApp: ${PHONE}` },
  emailBtn: { es: `📧 ${EMAIL}`, en: `📧 ${EMAIL}` },

  // How it actually works section
  howTag: { es: 'CÓMO FUNCIONA', en: 'HOW IT WORKS' },
  howTitle: { es: 'Qué recibes exactamente', en: 'What you actually get' },
  howSub: { es: 'No solo mis propiedades. Todo el mercado de alquiler de Frigiliana.', en: 'Not just my listings. The entire Frigiliana rental market.' },
  howIntro: {
    es: 'La mayoría de búsquedas de vivienda en Frigiliana empiezan y terminan con lo que una sola agencia tiene disponible. Este reporte es diferente.',
    en: 'Most property searches in Frigiliana start and end with whatever one agency happens to have available. This report is different.',
  },
  howBlocks: {
    es: [
      { icon: '🏘️', title: 'Todas las propiedades del mercado', desc: 'Tu reporte incluye alquileres disponibles de todas las agencias y propietarios particulares de Frigiliana — no solo las que yo gestiono. Si existe, está en tu reporte.' },
      { icon: '🤝', title: 'Te conecto con quien la gestione', desc: 'Si te interesa una propiedad que no es de mi cartera, te pongo en contacto directo con la agencia o propietario que la lleva. Sin intermediarios innecesarios.' },
      { icon: '💰', title: 'Reembolso total si alquilas conmigo', desc: 'Si al final alquilas una propiedad de mi cartera directa, te devuelvo el 100% del coste del reporte. El servicio te habrá salido completamente gratis.' },
    ],
    en: [
      { icon: '🏘️', title: 'Every property on the market', desc: 'Your report includes available rentals from all agencies and private landlords in Frigiliana — not just the ones I manage. If it exists, it\'s in your report.' },
      { icon: '🤝', title: 'I connect you with whoever manages it', desc: 'If you\'re interested in a property outside my portfolio, I put you in direct contact with the agency or landlord who manages it. No unnecessary middlemen.' },
      { icon: '💰', title: 'Full refund if you rent with me', desc: 'If you end up renting a property from my direct portfolio, I refund the full cost of the report. The service will have been completely free.' },
    ],
  },
  howClose: {
    es: 'Un reporte. Todo el mercado. Entregado personalmente.',
    en: 'One report. The whole market. Delivered to you personally.',
  },
  howCta: { es: 'Quiero mi reporte →', en: 'Get my report →' },

  // FAQ
  faqTag: { es: 'PREGUNTAS FRECUENTES', en: 'FAQ' },
  faqTitle: { es: 'Dudas antes de decidir', en: 'Questions before you decide' },
  faqs: {
    es: [
      { q: '¿Las propiedades son solo las que tú gestionas?', a: 'No. El reporte incluye propiedades de todas las agencias inmobiliarias de Frigiliana y también de propietarios particulares. Peino el mercado completo — no solo mi cartera.' },
      { q: '¿Qué pasa si me gusta una propiedad que no es tuya?', a: 'Te pongo en contacto directo con la agencia o propietario que la gestiona. Tu reporte incluye toda la información de contacto necesaria. Yo no me interpongo.' },
      { q: '¿Y si al final alquilo una de tus propiedades?', a: 'Te devuelvo los €180 completos. El servicio del reporte te habrá salido 100% gratis. Es mi manera de recompensarte por confiar en el proceso.' },
      { q: '¿Cuántas propiedades incluye el reporte?', a: 'Depende del mercado en ese momento. Normalmente entre 1 y 8 propiedades que encajan con tu perfil. Solo incluyo las que realmente tienen sentido — nada de relleno.' },
      { q: '¿Con qué frecuencia se actualiza?', a: 'Cada viernes durante 6 meses. Si aparece una nueva propiedad que encaja contigo, la incluyo inmediatamente y te aviso personalmente.' },
      { q: '¿Y si no estoy satisfecho con el reporte?', a: 'Tienes 7 días de garantía de satisfacción. Si no te convence la calidad, hablamos y lo solucionamos. Mi reputación depende de clientes felices.' },
    ],
    en: [
      { q: 'Are the properties only the ones you manage?', a: 'No. The report includes properties from all real estate agencies in Frigiliana and also from private landlords. I scour the entire market — not just my portfolio.' },
      { q: 'What if I like a property that isn\'t yours?', a: 'I put you in direct contact with the agency or landlord who manages it. Your report includes all necessary contact information. I don\'t get in the way.' },
      { q: 'What if I end up renting one of your properties?', a: 'I refund the full €180. The report service will have been 100% free. It\'s my way of rewarding you for trusting the process.' },
      { q: 'How many properties does the report include?', a: 'It depends on the market at that moment. Usually between 1 and 8 properties that match your profile. I only include those that truly make sense — no filler.' },
      { q: 'How often is it updated?', a: 'Every Friday for 6 months. If a new property appears that fits you, I include it immediately and notify you personally.' },
      { q: 'What if I\'m not satisfied with the report?', a: 'You have a 7-day satisfaction guarantee. If the quality doesn\'t convince you, we talk and sort it out. My reputation depends on happy clients.' },
    ],
  },

  // Sources
  sourcesLabel: { es: 'Fuentes', en: 'Sources' },
};

const AXARQUIA = [
  { name: 'Nerja', price: 4354, rent: '1.300–1.800€', trend: '+8,2%', vut: '76%', highlight: false },
  { name: 'Rincón de la Victoria', price: 4029, rent: '900–1.200€', trend: '+9,1%', vut: '71%', highlight: false },
  { name: 'Torre del Mar', price: 3427, rent: '850–1.100€', trend: '+7,4%', vut: '68%', highlight: false },
  { name: 'Frigiliana ★', price: 3295, rent: '1.100–1.400€', trend: '+6,4%', vut: '72%', highlight: true },
  { name: 'Torrox', price: 3214, rent: '750–1.000€', trend: '+5,8%', vut: '65%', highlight: false },
  { name: 'Vélez-Málaga', price: 2666, rent: '600–900€', trend: '+4,2%', vut: '58%', highlight: false },
  { name: 'Cómpeta', price: 1543, rent: '500–700€', trend: '+2,8%', vut: '61%', highlight: false },
];

const SEASON = [
  { m: 'E', occ: 38, c: '#6b7b8d' }, { m: 'F', occ: 44, c: '#6b7b8d' },
  { m: 'M', occ: 52, c: '#4d6a7a' }, { m: 'A', occ: 68, c: '#4d6a7a' },
  { m: 'M', occ: 74, c: '#3d5a73' }, { m: 'J', occ: 83, c: '#3d5a73' },
  { m: 'J', occ: 94, c: '#2d3e4e' }, { m: 'A', occ: 98, c: '#2d3e4e' },
  { m: 'S', occ: 87, c: '#3d5a73' }, { m: 'O', occ: 72, c: '#4d6a7a' },
  { m: 'N', occ: 48, c: '#6b7b8d' }, { m: 'D', occ: 40, c: '#6b7b8d' },
];

const TICKER_ES = [
  'Frigiliana 3.295 €/m² ▲+6,4%',
  'Aeropuerto Málaga 2025: 26,7M pasajeros — récord histórico',
  'Compradores extranjeros Málaga: 32,3% del total',
  'Turistas Frigiliana 2024: 54.745 (+5,8%)',
  'ADR Airbnb Frigiliana agosto: 251€/noche',
  'VUT Frigiliana: ocupación 72% media anual',
];
const TICKER_EN = [
  'Frigiliana 3,295 €/m² ▲+6.4%',
  'Málaga Airport 2025: 26.7M passengers — all-time record',
  'Foreign buyers Málaga: 32.3% of total',
  'Tourists Frigiliana 2024: 54,745 (+5.8%)',
  'ADR Airbnb Frigiliana August: €251/night',
  'VUT Frigiliana: 72% average annual occupancy',
];

const SOURCES = ['INE', 'Registradores', 'Aena', 'Idealista', 'Airbtics', 'Banco de España', 'CaixaBank Research', 'Turismo Costa del Sol', 'Diputación Málaga', 'Kyero', 'RealAdvisor', 'Likibu', 'MIVAU', 'Ayto. Frigiliana'];

const cardStyle: React.CSSProperties = { backgroundColor: '#ffffff', border: '1px solid #e5e7eb', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' };

/* ── Scroll reveal hook ── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, style: { opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(18px)', filter: visible ? 'blur(0)' : 'blur(4px)', transition: 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1), filter 0.7s cubic-bezier(0.16,1,0.3,1)' } as React.CSSProperties };
}

function RevealSection({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, style } = useReveal();
  return <div ref={ref} className={className} style={{ ...style, transitionDelay: `${delay}ms` }}>{children}</div>;
}

/* ── FAQ Accordion (avoids hooks-in-map) ── */
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-lg overflow-hidden transition-all" style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-6 py-4 text-left transition-colors hover:bg-gray-50 active:scale-[0.995]">
        <span className="font-semibold text-sm pr-4" style={{ color: '#1a1a1a' }}>{q}</span>
        <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs transition-transform" style={{ backgroundColor: 'rgba(61,90,115,0.1)', color: '#2d3e4e', transform: open ? 'rotate(45deg)' : 'rotate(0)' }}>+</span>
      </button>
      <div className="overflow-hidden transition-all" style={{ maxHeight: open ? 300 : 0, opacity: open ? 1 : 0, transition: 'max-height 0.35s ease, opacity 0.25s ease' }}>
        <p className="px-6 pb-5 text-sm leading-relaxed" style={{ color: '#666' }}>{a}</p>
      </div>
    </div>
  );
}

function FAQAccordion({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="space-y-3">
      {items.map((faq, i) => <FAQItem key={i} q={faq.q} a={faq.a} />)}
    </div>
  );
}

/* ── Stripe CTA Block ── */
function StripeCTA({ lang, compact = false }: { lang: Lang; compact?: boolean }) {
  const [accepted, setAccepted] = useState(false);
  return (
    <div className={`mx-auto w-full ${compact ? 'max-w-sm' : 'max-w-md'} rounded-lg ${compact ? 'p-6' : 'p-8'}`} style={{ backgroundColor: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.18)' }}>
      <div className="flex gap-2 justify-center mb-4">
        <span className="rounded-lg px-3 py-1 text-xs font-black" style={{ backgroundColor: '#f59e0b', color: '#78350f' }}>{t.offerBadge[lang]}</span>
        <span className="rounded-lg px-3 py-1 text-xs font-black" style={{ backgroundColor: '#4ade80', color: '#14532d' }}>{t.refundBadge[lang]}</span>
      </div>
      <p className="text-xs font-bold tracking-widest uppercase mb-2 text-center" style={{ color: 'rgba(255,255,255,0.55)' }}>{t.investLabel[lang]}</p>
      <div className="flex items-center justify-center gap-3 mb-1">
        <span className="line-through text-xl font-bold" style={{ color: 'rgba(255,255,255,0.35)' }}>€450</span>
        <span className="text-5xl font-black">€180</span>
      </div>
      <p className="text-sm mb-5 text-center" style={{ color: 'rgba(255,255,255,0.55)' }}>{t.vatNote[lang]}</p>
      <label className={`flex items-start gap-3 cursor-pointer text-left mb-4 rounded-lg px-3 py-2.5 transition-all ${!accepted ? 'animate-pulse' : ''}`} style={{ border: accepted ? '1px solid rgba(74,222,128,0.5)' : '1px dashed rgba(255,255,255,0.35)', backgroundColor: accepted ? 'rgba(74,222,128,0.12)' : 'rgba(255,255,255,0.08)' }}>
        <input type="checkbox" checked={accepted} onChange={e => setAccepted(e.target.checked)} className="mt-0.5 h-4 w-4 rounded flex-shrink-0" style={{ accentColor: '#4ade80' }} />
        <span className="text-xs leading-snug">
          {!accepted && <span className="block font-bold text-xs mb-0.5" style={{ color: '#fcd34d' }}>👆 {t.tickMark[lang]}</span>}
          <span style={{ color: 'rgba(255,255,255,0.7)' }}>{t.termsText[lang]}{' '}<Link to="/terminos-finder" className="text-white underline hover:no-underline">{t.termsLink[lang]}</Link></span>
        </span>
      </label>
      <button onClick={() => { if (accepted) window.location.href = STRIPE_URL; }} disabled={!accepted} className="w-full font-bold text-lg py-4 rounded-lg transition-all active:scale-[0.97]" style={{ backgroundColor: accepted ? '#4ade80' : '#9ca3af', color: accepted ? '#14532d' : '#6b7280', cursor: accepted ? 'pointer' : 'not-allowed', opacity: accepted ? 1 : 0.65, boxShadow: accepted ? '0 4px 14px rgba(74,222,128,0.3)' : 'none', border: 'none' }}>
        {t.ctaBtn[lang]}
      </button>
      <div className="flex flex-wrap justify-center gap-3 text-xs mt-3" style={{ color: 'rgba(255,255,255,0.6)' }}>
        <span>{t.ctaTrustA[lang]}</span><span>·</span><span>{t.ctaTrustB[lang]}</span><span>·</span><span>{t.ctaTrustC[lang]}</span>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════
   MAIN PAGE
   ════════════════════════════════════════════════════════════════════ */
export default function MarketReport() {
  const [lang, setLang] = useState<Lang>(() => {
    const stored = localStorage.getItem('finder-lang');
    if (stored === 'en') return 'en';
    return 'es';
  });

  useEffect(() => { localStorage.setItem('finder-lang', lang); }, [lang]);

  const ticker = lang === 'es' ? TICKER_ES : TICKER_EN;
  const tickerText = [...ticker, ...ticker].map((txt, i) => (
    <span key={i}>{i > 0 && i !== ticker.length ? <span style={{ opacity: 0.35 }}> · </span> : null}{txt}</span>
  ));

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', backgroundColor: '#f5f5f5', color: '#1a1a1a', minHeight: '100vh' }}>
      <Navigation />
      <Helmet>
        <title>{t.meta[lang].title}</title>
        <meta name="description" content={t.meta[lang].desc} />
      </Helmet>

      {/* ── TICKER ── */}
      <div style={{ backgroundColor: '#2d3e4e', color: 'rgba(255,255,255,0.85)', fontSize: 11, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', padding: '9px 0', overflow: 'hidden', whiteSpace: 'nowrap', display: 'flex', marginTop: 60 }}>
        <div style={{ display: 'flex', gap: 48, animation: 'mercado-ticker 35s linear infinite' }} className="hover:[animation-play-state:paused]">
          {tickerText}
        </div>
      </div>

      {/* ── HERO ── */}
      <section className="relative text-white overflow-hidden" style={{ background: 'linear-gradient(135deg, #2d3e4e 0%, #3d5a73 50%, #2d3e4e 100%)' }}>
        <div className="relative max-w-5xl mx-auto px-6 pt-16 pb-24">
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            {/* Left */}
            <div className="lg:col-span-3">
              <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-lg mb-6" style={{ backgroundColor: 'rgba(255,255,255,0.12)' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                {t.heroTag[lang]}
              </span>
              <h1 className="font-black leading-tight mb-6 whitespace-pre-line" style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', letterSpacing: '-0.025em', lineHeight: 1.08 }}>
                {t.heroTitle[lang]}
              </h1>
              <p className="text-base leading-relaxed mb-8 max-w-lg" style={{ color: 'rgba(255,255,255,0.65)' }}>
                {t.heroDesc[lang]}
              </p>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{t.heroAuthor[lang]}</p>
            </div>

            {/* Right — Price + CTA */}
            <div className="lg:col-span-2">
              <StripeCTA lang={lang} compact />
            </div>
          </div>

          {/* Lang toggle */}
          <button onClick={() => setLang(l => l === 'es' ? 'en' : 'es')} className="absolute top-6 right-6 text-white text-sm font-semibold px-4 py-2 rounded-lg transition hover:bg-white/10" style={{ border: '1px solid rgba(255,255,255,0.3)' }}>
            {lang === 'es' ? 'EN' : 'ES'}
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full"><path d="M0 48h1440V24C1200 0 960 48 720 24S240 0 0 24V48z" fill="#f5f5f5" /></svg>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-16">

        {/* ── HOW IT WORKS — 3 pillars ── */}
        <RevealSection>
          <div className="text-center mb-10">
            <span className="inline-block text-xs font-black px-4 py-1.5 rounded-lg tracking-widest uppercase mb-4" style={{ backgroundColor: 'rgba(61,90,115,0.12)', color: '#2d3e4e' }}>{t.howTag[lang]}</span>
            <h2 className="font-black mb-3" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', color: '#1a1a1a', letterSpacing: '-0.02em', lineHeight: 1.1 }}>{t.howTitle[lang]}</h2>
            <p className="text-lg font-semibold mb-2" style={{ color: '#2d3e4e' }}>{t.howSub[lang]}</p>
            <p className="text-base max-w-xl mx-auto" style={{ color: '#666' }}>{t.howIntro[lang]}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {t.howBlocks[lang].map((b, i) => (
              <RevealSection key={i} delay={i * 100}>
                <div className="rounded-lg p-7 h-full transition-transform hover:-translate-y-1" style={{ backgroundColor: '#fff', border: i === 2 ? '2px solid #4ade80' : '1px solid #e5e7eb', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                  <span className="text-4xl block mb-4">{b.icon}</span>
                  <h3 className="font-bold text-base mb-3" style={{ color: '#1a1a1a' }}>{b.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#666' }}>{b.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>
          <div className="text-center mt-10">
            <p className="text-base font-medium italic mb-5" style={{ color: '#9ca3af', maxWidth: 520, margin: '0 auto' }}>{t.howClose[lang]}</p>
            <a href="#cta-final" className="inline-flex items-center gap-2 text-sm font-bold px-7 py-3.5 rounded-lg transition-all hover:-translate-y-0.5 active:scale-[0.97]" style={{ backgroundColor: '#2d3e4e', color: '#fff' }}>
              {t.howCta[lang]}
            </a>
          </div>
        </RevealSection>

        {/* ── DATA CREDIBILITY ── */}
        <RevealSection>
          <div className="text-center mb-10">
            <span className="inline-block text-xs font-black px-4 py-1.5 rounded-lg tracking-widest uppercase mb-4" style={{ backgroundColor: 'rgba(61,90,115,0.12)', color: '#2d3e4e' }}>{t.dataTag[lang]}</span>
            <h2 className="font-black mb-2" style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', color: '#1a1a1a', letterSpacing: '-0.02em' }}>{t.dataTitle[lang]}</h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: '#666' }}>{t.dataDesc[lang]}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {t.kpis[lang].map((k, i) => (
              <div key={i} className="rounded-lg p-5 hover:-translate-y-0.5 transition-transform" style={cardStyle}>
                <div className="text-[9px] font-bold uppercase tracking-widest mb-2" style={{ color: '#9ca3af' }}>{k.label}</div>
                <div className="text-2xl font-black mb-1" style={{ color: '#2d3e4e' }}>{k.val}</div>
                <div className="text-[10px] mb-1.5" style={{ color: '#666' }}>{k.sub}</div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded" style={{ backgroundColor: 'rgba(74,222,128,0.15)', color: '#4ade80' }}>{k.badge}</span>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <a href="#cta-final" className="inline-flex items-center gap-2 text-sm font-bold px-7 py-3.5 rounded-lg transition-all hover:-translate-y-0.5 active:scale-[0.97]" style={{ backgroundColor: '#2d3e4e', color: '#fff' }}>
              {t.howCta[lang]}
            </a>
          </div>
        </RevealSection>

        {/* ── EXCLUSIVE INSIGHT ── */}
        <RevealSection>
          <div className="rounded-lg overflow-hidden" style={cardStyle}>
            <div className="px-6 py-5" style={{ backgroundColor: 'rgba(61,90,115,0.04)', borderBottom: '1px solid #e5e7eb' }}>
              <div className="flex items-start gap-3">
                <span className="text-lg">★</span>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: '#2d3e4e' }}>{t.insightTitle[lang]}</div>
                  <p className="text-sm leading-relaxed" style={{ color: '#666' }} dangerouslySetInnerHTML={{ __html: t.insightText[lang] }} />
                </div>
              </div>
            </div>
          </div>
        </RevealSection>

        {/* ── WHAT'S INCLUDED ── */}
        <RevealSection>
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-black px-4 py-1.5 rounded-lg tracking-widest uppercase mb-4" style={{ backgroundColor: 'rgba(61,90,115,0.12)', color: '#2d3e4e' }}>{t.includedTag[lang]}</span>
            <h2 className="font-black mb-3 whitespace-pre-line" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', color: '#1a1a1a', letterSpacing: '-0.02em', lineHeight: 1.1 }}>{t.includedTitle[lang]}</h2>
            <p className="text-lg max-w-xl mx-auto" style={{ color: '#666' }}>{t.includedDesc[lang]}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.features[lang].map((f, i) => (
              <div key={i} className="rounded-lg p-6 transition-transform hover:-translate-y-1" style={{ backgroundColor: '#fff', border: f.highlight ? '2px solid #4ade80' : '1px solid #e5e7eb', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                <span className="text-3xl mb-4 block">{f.icon}</span>
                <h3 className="font-bold text-base mb-2" style={{ color: '#1a1a1a' }}>{f.title}</h3>
                <p className="text-sm leading-relaxed mb-3" style={{ color: '#666' }}>{f.desc}</p>
                <span className="text-xs font-bold px-2.5 py-1 rounded-lg" style={{ backgroundColor: f.highlight ? 'rgba(74,222,128,0.15)' : 'rgba(61,90,115,0.10)', color: f.highlight ? '#15803d' : '#2d3e4e' }}>{f.tag}</span>
              </div>
            ))}
          </div>
        </RevealSection>

        {/* ── REPORT PREVIEW ── */}
        <RevealSection>
          <div className="text-center mb-10">
            <span className="inline-block text-xs font-black px-4 py-1.5 rounded-lg tracking-widest uppercase mb-4" style={{ backgroundColor: 'rgba(61,90,115,0.12)', color: '#2d3e4e' }}>{t.previewTag[lang]}</span>
            <h2 className="font-black mb-3" style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', color: '#1a1a1a', letterSpacing: '-0.02em' }}>{t.previewTitle[lang]}</h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: '#666' }}>{t.previewDesc[lang]}</p>
          </div>

          {/* Browser mockup frame */}
          <div className="rounded-xl overflow-hidden" style={{ border: '1px solid #d1d5db', boxShadow: '0 8px 40px rgba(0,0,0,0.12)' }}>
            {/* Title bar */}
            <div className="flex items-center gap-2 px-4 py-2.5" style={{ backgroundColor: '#f3f4f6', borderBottom: '1px solid #e5e7eb' }}>
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#ef4444' }} />
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#f59e0b' }} />
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#22c55e' }} />
              </div>
              <div className="flex-1 mx-3">
                <div className="rounded px-3 py-1 text-[10px] text-center truncate" style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', color: '#9ca3af' }}>
                  propaxar.es/reporte/sarah-m-demo
                </div>
              </div>
            </div>

            {/* Report content preview */}
            <div style={{ backgroundColor: '#fafafa' }}>
              {/* Mini hero */}
              <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a2a3a 0%, #2d3e4e 100%)', height: 120 }}>
                <div className="absolute inset-0 flex items-center justify-center text-center text-white">
                  <div>
                    <p className="text-[10px] tracking-widest uppercase opacity-50 mb-1">PERSONALISED PROPERTY REPORT</p>
                    <p className="text-lg font-bold">Sarah M.</p>
                    <p className="text-[11px] opacity-60">Frigiliana · Spring 2026</p>
                  </div>
                </div>
              </div>

              {/* Search summary mini cards */}
              <div className="px-5 py-4">
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[
                    { icon: '🔍', num: '47', label: lang === 'es' ? 'Propiedades analizadas' : 'Properties analysed' },
                    { icon: '✅', num: '4', label: lang === 'es' ? 'Seleccionadas' : 'Selected' },
                    { icon: '🎯', num: '1', label: lang === 'es' ? 'Dentro del presupuesto' : 'Within budget' },
                  ].map((s, i) => (
                    <div key={i} className="rounded-lg p-3 text-center" style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb' }}>
                      <span className="text-lg">{s.icon}</span>
                      <p className="text-xl font-black mt-1" style={{ color: '#2d3e4e' }}>{s.num}</p>
                      <p className="text-[9px]" style={{ color: '#9ca3af' }}>{s.label}</p>
                    </div>
                  ))}
                </div>

                {/* Property card preview */}
                <div className="rounded-lg overflow-hidden mb-3" style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb' }}>
                  <div className="flex">
                    <div className="w-28 h-24 flex-shrink-0 relative">
                      <img src="/images/properties/IMG_4099.jpg" alt="Villa Patricia preview" className="w-full h-full object-cover" loading="lazy" />
                      <span className="absolute top-1.5 left-1.5 text-[8px] font-bold px-1.5 py-0.5 rounded text-white" style={{ backgroundColor: '#22c55e' }}>✅ {lang === 'es' ? 'DENTRO PRESUPUESTO' : 'WITHIN BUDGET'}</span>
                    </div>
                    <div className="p-3 flex-1 min-w-0">
                      <p className="text-sm font-bold" style={{ color: '#2d3e4e' }}>Villa Patricia</p>
                      <p className="text-[11px]" style={{ color: '#666' }}>€900/month · 2 beds · 2 baths · 90m²</p>
                      <div className="flex gap-0.5 mt-1">
                        {[1,2,3,4,5].map(i => (
                          <span key={i} className="text-[10px]" style={{ color: '#f59e0b' }}>★</span>
                        ))}
                        <span className="text-[9px] ml-1" style={{ color: '#666' }}>5/5 match</span>
                      </div>
                      <div className="flex gap-1 mt-1.5">
                        <span className="text-[8px] px-1.5 py-0.5 rounded" style={{ backgroundColor: 'rgba(34,197,94,0.1)', color: '#15803d' }}>✓ {lang === 'es' ? 'Mascotas' : 'Pets'}</span>
                        <span className="text-[8px] px-1.5 py-0.5 rounded" style={{ backgroundColor: 'rgba(61,90,115,0.1)', color: '#2d3e4e' }}>📷 6 {lang === 'es' ? 'fotos' : 'photos'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Blurred locked properties */}
                <div className="relative">
                  <div className="space-y-2" style={{ filter: 'blur(6px)', pointerEvents: 'none', userSelect: 'none' }}>
                    {['Casa del Campo', 'Casa Fabi', 'Casa Loma Cruz'].map((name, i) => (
                      <div key={i} className="rounded-lg p-3 flex items-center gap-3" style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb' }}>
                        <div className="w-12 h-12 rounded bg-gray-200 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-bold" style={{ color: '#2d3e4e' }}>{name}</p>
                          <p className="text-[10px]" style={{ color: '#9ca3af' }}>€1,600/month · 3 beds</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center px-4 py-3 rounded-lg" style={{ backgroundColor: 'rgba(45,62,78,0.92)' }}>
                      <span className="text-white text-lg">🔒</span>
                      <p className="text-white text-xs font-bold mt-1">{lang === 'es' ? '+3 propiedades más en tu reporte' : '+3 more properties in your report'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-8">
            {t.previewCards[lang].map((c, i) => (
              <div key={i} className="rounded-lg p-4 transition-transform hover:-translate-y-0.5" style={cardStyle}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3 text-sm font-black text-white" style={{ backgroundColor: '#3d5a73' }}>{i + 1}</div>
                <h4 className="text-sm font-bold mb-1" style={{ color: '#1a1a1a' }}>{c.title}</h4>
                <p className="text-xs leading-relaxed" style={{ color: '#666' }}>{c.desc}</p>
              </div>
            ))}
          </div>

          {/* Demo link */}
          <div className="text-center mt-8 space-y-3">
            <Link to="/demo-reporte" className="inline-flex items-center gap-2 text-sm font-bold px-6 py-3 rounded-lg transition-all hover:-translate-y-0.5 active:scale-[0.97]" style={{ backgroundColor: '#2d3e4e', color: '#fff' }}>
              {t.previewCta[lang]}
            </Link>
            <p className="text-xs" style={{ color: '#9ca3af' }}>{t.previewNote[lang]}</p>
          </div>
        </RevealSection>

        {/* ── AXARQUÍA TABLE ── */}
        <RevealSection>
          <div className="text-center mb-8">
            <span className="inline-block text-xs font-black px-4 py-1.5 rounded-lg tracking-widest uppercase mb-4" style={{ backgroundColor: 'rgba(61,90,115,0.12)', color: '#2d3e4e' }}>{t.tableTag[lang]}</span>
            <h2 className="font-black mb-2" style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2rem)', color: '#1a1a1a', letterSpacing: '-0.02em' }}>{t.tableTitle[lang]}</h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: '#666' }}>{t.tableDesc[lang]}</p>
          </div>
          <div className="rounded-lg overflow-hidden" style={cardStyle}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                    {t.tableCols[lang].map((h, i) => (
                      <th key={h} className={`px-5 py-3 text-[10px] font-bold uppercase tracking-widest ${i > 0 ? 'text-right' : 'text-left'}`} style={{ color: '#9ca3af' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {AXARQUIA.map((r, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors" style={{ borderBottom: '1px solid #f3f4f6', backgroundColor: r.highlight ? 'rgba(61,90,115,0.06)' : undefined }}>
                      <td className="px-5 py-3 font-semibold" style={{ color: r.highlight ? '#2d3e4e' : '#1a1a1a' }}>{r.name}</td>
                      <td className="px-5 py-3 text-right font-medium" style={{ color: '#1a1a1a' }}>{r.price.toLocaleString()}</td>
                      <td className="px-5 py-3 text-right" style={{ color: '#666' }}>{r.rent}</td>
                      <td className="px-5 py-3 text-right" style={{ color: '#666' }}>{r.vut}</td>
                      <td className="px-5 py-3 text-right font-semibold" style={{ color: '#22c55e' }}>{r.trend}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </RevealSection>

        {/* ── SEASONALITY ── */}
        <RevealSection>
          <div className="rounded-lg overflow-hidden" style={cardStyle}>
            <div className="px-6 py-4" style={{ borderBottom: '1px solid #e5e7eb', backgroundColor: '#f9fafb' }}>
              <h3 className="font-bold text-base" style={{ color: '#2d3e4e' }}>{t.seasonTitle[lang]}</h3>
            </div>
            <div className="p-5">
              <div className="text-xs mb-4" style={{ color: '#9ca3af' }}>{t.seasonSub[lang]}</div>
              <div className="flex items-end gap-2 h-28 mb-4">
                {SEASON.map((s, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-[9px] font-bold" style={{ color: s.occ > 85 ? '#ef4444' : s.occ > 65 ? '#2d3e4e' : '#9ca3af' }}>{s.occ}%</span>
                    <div className="w-full rounded-t" style={{ height: `${s.occ}%`, background: s.c, minHeight: 3 }} />
                    <span className="text-[9px]" style={{ color: '#9ca3af' }}>{s.m}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-4 flex-wrap">
                {t.seasonStats[lang].map((d, i) => (
                  <div key={i} className="pl-3" style={{ borderLeft: `2px solid ${i === 0 ? '#ef4444' : i === 1 ? '#2d3e4e' : '#9ca3af'}` }}>
                    <div className="text-[10px] font-bold" style={{ color: i === 0 ? '#ef4444' : i === 1 ? '#2d3e4e' : '#9ca3af' }}>{d.a}</div>
                    <div className="text-xs" style={{ color: '#666' }}>{d.b}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </RevealSection>

        {/* ── TIMELINE ── */}
        <RevealSection>
          <div className="text-center mb-8">
            <span className="inline-block text-xs font-black px-4 py-1.5 rounded-lg tracking-widest uppercase mb-4" style={{ backgroundColor: 'rgba(61,90,115,0.12)', color: '#2d3e4e' }}>{t.timelineTag[lang]}</span>
            <h2 className="font-black mb-2" style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2rem)', color: '#1a1a1a', letterSpacing: '-0.02em' }}>{t.timelineTitle[lang]}</h2>
          </div>
          <div className="bg-white rounded-lg overflow-hidden" style={cardStyle}>
            <div className="px-8 py-8">
              <div className="relative">
                <div className="absolute left-5 top-6 bottom-6 w-0.5" style={{ backgroundColor: '#d1dde8' }} />
                <div className="space-y-8">
                  {t.steps[lang].map((step, i) => (
                    <div key={i} className="flex gap-5">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full text-white flex items-center justify-center font-black text-base z-10" style={{ backgroundColor: '#3d5a73' }}>{step.num}</div>
                      <div className="pt-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold" style={{ color: '#1a1a1a' }}>{step.title}</h3>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded" style={{ backgroundColor: 'rgba(61,90,115,0.10)', color: '#2d3e4e' }}>{step.time}</span>
                        </div>
                        <p className="text-sm leading-relaxed" style={{ color: '#666' }}>{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </RevealSection>

        {/* ── GUARANTEES ── */}
        <RevealSection>
          <div className="text-center mb-8">
            <h2 className="font-black mb-2" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: '#1a1a1a', letterSpacing: '-0.02em' }}>{t.guaranteesTitle[lang]}</h2>
            <p style={{ color: '#666' }}>{t.guaranteesDesc[lang]}</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {t.guarantees[lang].map((g, i) => (
              <div key={i} className="bg-white rounded-lg p-6" style={cardStyle}>
                <span className="text-4xl block mb-3">{g.icon}</span>
                <h3 className="font-bold mb-2" style={{ color: '#1a1a1a' }}>{g.title}</h3>
                <p className="text-sm" style={{ color: '#666' }}>{g.desc}</p>
              </div>
            ))}
          </div>
        </RevealSection>

        {/* ── FAQ ── */}
        <RevealSection>
          <div className="text-center mb-10">
            <span className="inline-block text-xs font-black px-4 py-1.5 rounded-lg tracking-widest uppercase mb-4" style={{ backgroundColor: 'rgba(61,90,115,0.12)', color: '#2d3e4e' }}>{t.faqTag[lang]}</span>
            <h2 className="font-black mb-2" style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2rem)', color: '#1a1a1a', letterSpacing: '-0.02em' }}>{t.faqTitle[lang]}</h2>
          </div>
          <FAQAccordion items={t.faqs[lang]} />
        </RevealSection>

        {/* ── FINAL CTA ── */}
        <RevealSection>
          <div id="cta-final" className="rounded-lg overflow-hidden text-white" style={{ background: 'linear-gradient(135deg, #2d3e4e 0%, #3d5a73 50%, #2d3e4e 100%)' }}>
            <div className="px-8 py-12 text-center">
              <h2 className="text-2xl md:text-3xl font-black mb-2">{t.ctaTitle[lang]}</h2>
              <p className="text-sm mb-8" style={{ color: 'rgba(255,255,255,0.6)' }}>{t.ctaDesc[lang]}</p>

              <StripeCTA lang={lang} />

              <div className="mt-6 rounded-lg px-6 py-4 max-w-md mx-auto text-left" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
                <p className="text-xs font-black mb-1" style={{ color: '#fcd34d' }}>{t.lastGuaranteeLabel[lang]}</p>
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.75)' }}>{t.lastGuaranteeText[lang]}</p>
              </div>
            </div>

            <div className="border-t px-8 py-6 text-center" style={{ borderColor: 'rgba(255,255,255,0.15)', backgroundColor: 'rgba(0,0,0,0.12)' }}>
              <p className="text-sm font-semibold mb-4" style={{ color: 'rgba(255,255,255,0.7)' }}>{t.contactPre[lang]}</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lang === 'es' ? 'Hola Manuel, me interesa el Reporte Personalizado de Frigiliana.' : 'Hi Manuel, I am interested in the Frigiliana Personalised Report.')}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white font-bold px-6 py-3.5 rounded-lg transition hover:opacity-90 active:scale-[0.97]" style={{ backgroundColor: '#22c55e' }}>
                  {t.whatsappBtn[lang]}
                </a>
                <a href={`mailto:${EMAIL}?subject=${encodeURIComponent(lang === 'es' ? 'Reporte Personalizado Frigiliana' : 'Personalised Frigiliana Report')}`} className="inline-flex items-center gap-2 text-white font-semibold px-6 py-3.5 rounded-lg transition hover:bg-white/20 active:scale-[0.97]" style={{ backgroundColor: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.2)' }}>
                  {t.emailBtn[lang]}
                </a>
              </div>
            </div>
          </div>
        </RevealSection>

        {/* ── SOURCES ── */}
        <div className="flex items-center gap-3 flex-wrap py-4">
          <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color: '#9ca3af' }}>{t.sourcesLabel[lang]}</span>
          {SOURCES.map(s => (
            <span key={s} className="text-[9px] px-2 py-1 rounded" style={{ backgroundColor: '#e5e7eb', color: '#666' }}>{s}</span>
          ))}
        </div>

      </div>

      <Footer />

      <style>{`
        @keyframes mercado-ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
