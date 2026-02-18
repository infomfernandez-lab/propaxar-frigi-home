import { useSearchParams, Link } from 'react-router-dom';

const STRIPE_URL = 'https://buy.stripe.com/00w14p63G5Zc5EKfmxgEg02';
const WHATSAPP_NUMBER = '34662317561';
const EMAIL = 'info@propaxar.com';

const content = {
  es: {
    title: 'Tu Reporte Personalizado',
    titleNamed: (n: string) => `Hola ${n} 👋`,
    subtitle: 'Como hablamos por teléfono',
    reportTitle: 'Reporte de Mercado Frigiliana',
    searchLabel: '📋 Tu Búsqueda:',
    budget: (b: string) => `💰 Presupuesto: €${b}/mes`,
    bedrooms: (d: string) => `🛏️ Dormitorios: ${d} mínimo`,
    pets: (p: string) => `🐕 Mascotas: ${p === 'si' || p === 'yes' ? 'Sí' : 'No'}`,
    features: [
      { icon: '✓', title: '4-8 Propiedades Seleccionadas', desc: 'Adaptadas a tu presupuesto y necesidades específicas' },
      { icon: '✓', title: 'Análisis Honesto del Mercado', desc: 'Sin filtros, información real y privilegiada' },
      { icon: '✓', title: 'Recomendación Profesional', desc: 'Qué propiedad encaja mejor y por qué' },
      { icon: '✓', title: 'Guía Logística Completa', desc: 'Campo vs pueblo, agua, basura, paquetes' },
      { icon: '✓', title: '6 Meses Seguimiento', desc: 'Actualizaciones semanales hasta que encuentres' },
      { icon: '🎁', title: 'Reembolso Total', desc: 'Si alquilas Propaxar Direct, 100% reembolso', highlight: true },
    ],
    investmentLabel: 'INVERSIÓN ÚNICA',
    vatNote: 'IVA incluido · Sin cargos recurrentes',
    cta: 'Pagar €250 Ahora →',
    secure: '🔒 Pago 100% seguro procesado por Stripe',
    afterLabel: '📦 Después del Pago:',
    afterSteps: [
      '✓ Confirmo recibo por WhatsApp',
      '✓ Creo tu reporte personalizado',
      '✓ Te envío URL única en 24-48h',
      '✓ Actualizaciones cada viernes × 6 meses',
    ],
    questions: '¿Alguna pregunta antes de comprar?',
    termsText: 'Al proceder al pago, aceptas los',
    termsLink: 'Términos y Condiciones',
    termsPath: '/terminos-finder',
    noindex: 'Reporte Personalizado Propaxar',
  },
  en: {
    title: 'Your Personalized Report',
    titleNamed: (n: string) => `Hello ${n} 👋`,
    subtitle: 'As we discussed on the phone',
    reportTitle: 'Frigiliana Market Report',
    searchLabel: '📋 Your Search:',
    budget: (b: string) => `💰 Budget: €${b}/month`,
    bedrooms: (d: string) => `🛏️ Bedrooms: ${d} minimum`,
    pets: (p: string) => `🐕 Pets: ${p === 'si' || p === 'yes' ? 'Yes' : 'No'}`,
    features: [
      { icon: '✓', title: '4-8 Hand-Selected Properties', desc: 'Tailored to your budget and specific needs' },
      { icon: '✓', title: 'Honest Market Analysis', desc: 'No filters, real insider information' },
      { icon: '✓', title: 'Professional Recommendation', desc: 'Which property fits best and why' },
      { icon: '✓', title: 'Complete Logistics Guide', desc: 'Country vs town, water, garbage, packages' },
      { icon: '✓', title: '6 Months Follow-Up', desc: 'Weekly updates until you find your home' },
      { icon: '🎁', title: 'Full Refund', desc: 'If you rent Propaxar Direct, 100% refund', highlight: true },
    ],
    investmentLabel: 'ONE-TIME INVESTMENT',
    vatNote: 'VAT included · No recurring charges',
    cta: 'Pay €250 Now →',
    secure: '🔒 100% secure payment processed by Stripe',
    afterLabel: '📦 After Payment:',
    afterSteps: [
      '✓ I confirm receipt via WhatsApp',
      '✓ I create your personalized report',
      '✓ You receive unique URL in 24-48h',
      '✓ Weekly updates every Friday × 6 months',
    ],
    questions: 'Questions before purchasing?',
    termsText: 'By proceeding to payment, you accept the',
    termsLink: 'Terms & Conditions',
    termsPath: '/terminos-finder',
    noindex: 'Personalized Propaxar Report',
  },
};

export default function ComprarReporte() {
  const [searchParams] = useSearchParams();

  const nombre = searchParams.get('n') || '';
  const presupuesto = searchParams.get('b') || '';
  const dormitorios = searchParams.get('d') || '';
  const mascotas = searchParams.get('p') || '';
  const langParam = searchParams.get('lang') || 'es';
  const lang = langParam === 'en' ? 'en' : 'es';

  const c = content[lang];
  const hasSearch = presupuesto || dormitorios || mascotas;

  const handleStripeCheckout = () => {
    window.location.href = STRIPE_URL;
  };

  const whatsappMsg = encodeURIComponent(
    lang === 'es'
      ? `Hola Manuel, quiero comprar el Reporte de Mercado Frigiliana.${nombre ? ` Soy ${nombre}.` : ''}${presupuesto ? ` Presupuesto: €${presupuesto}/mes.` : ''}${dormitorios ? ` Dormitorios: ${dormitorios}+.` : ''}${mascotas ? ` Mascotas: ${mascotas === 'si' || mascotas === 'yes' ? 'Sí' : 'No'}.` : ''}`
      : `Hi Manuel, I want to buy the Frigiliana Market Report.${nombre ? ` I'm ${nombre}.` : ''}${presupuesto ? ` Budget: €${presupuesto}/month.` : ''}${dormitorios ? ` Bedrooms: ${dormitorios}+.` : ''}${mascotas ? ` Pets: ${mascotas === 'si' || mascotas === 'yes' ? 'Yes' : 'No'}.` : ''}`
  );

  const langToggle = lang === 'es'
    ? `?${new URLSearchParams({ ...Object.fromEntries(searchParams.entries()), lang: 'en' }).toString()}`
    : `?${new URLSearchParams({ ...Object.fromEntries(searchParams.entries()), lang: 'es' }).toString()}`;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Lang toggle */}
      <div className="flex justify-end px-4 py-3 bg-white border-b border-gray-100">
        <Link
          to={`/comprar-reporte${langToggle}`}
          className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition px-3 py-1 rounded border border-blue-200 hover:border-blue-400"
        >
          {lang === 'es' ? 'EN' : 'ES'}
        </Link>
      </div>

      <div className="max-w-lg mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img
              src="/propaxar-vision.png"
              alt="Propaxar"
              className="h-10 object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {nombre ? c.titleNamed(nombre) : c.title}
          </h1>
          <p className="text-gray-500 text-base italic">{c.subtitle}</p>
        </div>

        {/* Main card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
          {/* Card header */}
          <div className="bg-blue-600 px-6 py-5 text-white text-center">
            <h2 className="text-xl font-bold">{c.reportTitle}</h2>
          </div>

          <div className="px-6 py-6 space-y-6">
            {/* Search summary */}
            {hasSearch && (
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                <p className="text-sm font-bold text-blue-700 mb-2">{c.searchLabel}</p>
                <div className="space-y-1">
                  {presupuesto && <p className="text-sm text-gray-700">{c.budget(presupuesto)}</p>}
                  {dormitorios && <p className="text-sm text-gray-700">{c.bedrooms(dormitorios)}</p>}
                  {mascotas && <p className="text-sm text-gray-700">{c.pets(mascotas)}</p>}
                </div>
              </div>
            )}

            {/* Features list */}
            <div className="space-y-4">
              {c.features.map((f, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <span
                    className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold ${
                      f.highlight
                        ? 'bg-amber-100 text-amber-600'
                        : 'bg-green-100 text-green-600'
                    }`}
                  >
                    {f.icon}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{f.title}</p>
                    <p className="text-sm text-gray-500">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Price */}
            <div className="text-center py-4 border-t border-b border-gray-100">
              <p className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-1">
                {c.investmentLabel}
              </p>
              <p className="text-5xl font-black text-gray-900">€250</p>
              <p className="text-sm text-gray-400 mt-1">{c.vatNote}</p>
            </div>

            {/* CTA Button */}
            <button
              onClick={handleStripeCheckout}
              className="w-full bg-green-500 hover:bg-green-600 active:bg-green-700 text-white text-xl font-bold py-5 px-6 rounded-xl transition-all duration-150 shadow-md hover:shadow-lg active:scale-[0.98]"
            >
              {c.cta}
            </button>

            <p className="text-center text-xs text-gray-400">{c.secure}</p>

            {/* After payment */}
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm font-bold text-gray-700 mb-3">{c.afterLabel}</p>
              <div className="space-y-2">
                {c.afterSteps.map((step, i) => (
                  <p key={i} className="text-sm text-gray-600">{step}</p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Contact footer */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-6 py-5 text-center space-y-3">
          <p className="text-sm font-semibold text-gray-700">{c.questions}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-lg font-semibold text-sm transition"
            >
              💬 WhatsApp: +34 662 317 561
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 border border-blue-200 hover:border-blue-400 px-5 py-3 rounded-lg font-semibold text-sm transition"
            >
              📧 {EMAIL}
            </a>
          </div>
          <p className="text-xs text-gray-400 pt-1">
            {c.termsText}{' '}
            <Link to={c.termsPath} className="text-blue-500 hover:underline">
              {c.termsLink}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
