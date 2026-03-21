import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import "./Mercado.css";
const WHATSAPP_NUMBER = '34662317561';
const EMAIL = 'info@propaxar.com';
const PHONE = '+34 662 317 561';

const AXARQUIA = [
  { name: "Nerja", price: 4354, rent: "1.300–1.800€", trend: "+8,2%", vut: "76%", highlight: false },
  { name: "Rincón de la Victoria", price: 4029, rent: "900–1.200€", trend: "+9,1%", vut: "71%", highlight: false },
  { name: "Torre del Mar", price: 3427, rent: "850–1.100€", trend: "+7,4%", vut: "68%", highlight: false },
  { name: "Frigiliana ★", price: 3295, rent: "1.100–1.400€", trend: "+6,4%", vut: "72%", highlight: true },
  { name: "Torrox", price: 3214, rent: "750–1.000€", trend: "+5,8%", vut: "65%", highlight: false },
  { name: "Vélez-Málaga", price: 2666, rent: "600–900€", trend: "+4,2%", vut: "58%", highlight: false },
  { name: "Cómpeta", price: 1543, rent: "500–700€", trend: "+2,8%", vut: "61%", highlight: false },
];

const SEASON = [
  { m: "E", occ: 38, c: "#6b7b8d" }, { m: "F", occ: 44, c: "#6b7b8d" },
  { m: "M", occ: 52, c: "#4d6a7a" }, { m: "A", occ: 68, c: "#4d6a7a" },
  { m: "M", occ: 74, c: "#3d5a73" }, { m: "J", occ: 83, c: "#3d5a73" },
  { m: "J", occ: 94, c: "#2d3e4e" }, { m: "A", occ: 98, c: "#2d3e4e" },
  { m: "S", occ: 87, c: "#3d5a73" }, { m: "O", occ: 72, c: "#4d6a7a" },
  { m: "N", occ: 48, c: "#6b7b8d" }, { m: "D", occ: 40, c: "#6b7b8d" },
];

const TICKER = [
  "Frigiliana 3.295 €/m² ▲+6,4%",
  "Aeropuerto Málaga 2025: 26,7M pasajeros — récord histórico",
  "Compradores extranjeros Málaga: 32,3% del total",
  "IPV España Q3 2025: +12,8% — máximo histórico",
  "Compraventas España 2025: 705.000 — récord desde 2008",
  "Turistas Frigiliana 2024: 54.745 (+5,8%)",
  "ADR Airbnb Frigiliana agosto: 251€/noche",
  "VUT Frigiliana: 901 activos — ocupación 72% media anual",
];

const cardStyle: React.CSSProperties = { backgroundColor: '#ffffff', border: '1px solid #e5e7eb', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' };

export default function MercadoPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ nombre: "", email: "", perfil: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.email) setSubmitted(true);
  };

  const tickerText = [...TICKER, ...TICKER].map((t, i) => (
    <span key={i}>
      {i > 0 && i !== TICKER.length ? <span className="ribbon-sep"> · </span> : null}
      {t}
    </span>
  ));

  return (
    <div className="mercado-page">
      <Navigation />
      <Helmet>
        <title>Mercado Inmobiliario Frigiliana — Datos Mensuales | Propaxar</title>
        <meta name="description" content="Reporte mensual gratuito del mercado inmobiliario de Frigiliana y Axarquía. Precios, turismo, regulación y rentabilidad. Datos de 18 fuentes oficiales." />
      </Helmet>

      {/* TICKER */}
      <div className="mercado-ribbon">
        <div className="ribbon-inner">{tickerText}</div>
      </div>

      {/* ── HERO ── */}
      <section
        className="relative text-white overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #2d3e4e 0%, #3d5a73 50%, #2d3e4e 100%)' }}
      >
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-24">
          <div className="grid md:grid-cols-5 gap-10 items-center">
            {/* Left */}
            <div className="md:col-span-3">
              <div className="flex items-center gap-3 mb-6">
                <span
                  className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-lg"
                  style={{ backgroundColor: 'rgba(255,255,255,0.12)' }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  Marzo 2026
                </span>
                <span className="text-xs font-semibold px-3 py-1.5 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
                  Edición mensual gratuita
                </span>
              </div>

              <h1
                className="font-black leading-tight mb-5"
                style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', letterSpacing: '-0.025em', lineHeight: 1.08 }}
              >
                No es solo un informe<br />de mercado.
                <span style={{ color: 'rgba(255,255,255,0.5)' }}> Es tu ventaja</span><br />
                para encontrar casa.
              </h1>

              <p className="text-base leading-relaxed mb-8 max-w-lg" style={{ color: 'rgba(255,255,255,0.65)' }}>
                Propiedades reales analizadas una a una. Precios verificados. Información privilegiada que ningún portal publica. 
                Cada primer lunes del mes, en tu bandeja de entrada.
              </p>

              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
                Por <strong style={{ color: 'rgba(255,255,255,0.7)' }}>Manuel C. Fernández Ramírez</strong> · Propaxar Frigiliana · 40 años de conocimiento local
              </p>
            </div>

            {/* Right — KPI cards */}
            <div className="md:col-span-2 grid grid-cols-2 gap-3">
              {[
                { label: '€/m² Frigiliana', val: '3.295', sub: 'Idealista dic. 2025', badge: '▲ +6,4%' },
                { label: 'Pasajeros 2025', val: '26,7M', sub: 'Récord histórico', badge: '▲ +7,4%' },
                { label: 'Extranjeros', val: '32,3%', sub: 'De compraventas', badge: '2ª provincia' },
                { label: 'Ingresos VUT', val: '29k€', sub: 'Media anual', badge: '72% ocup.' },
              ].map((k, i) => (
                <div
                  key={i}
                  className="rounded-lg p-4"
                  style={{ backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
                >
                  <div className="text-[9px] font-bold uppercase tracking-widest mb-2" style={{ color: 'rgba(255,255,255,0.45)' }}>{k.label}</div>
                  <div className="text-2xl font-black mb-1">{k.val}</div>
                  <div className="text-[10px] mb-1.5" style={{ color: 'rgba(255,255,255,0.45)' }}>{k.sub}</div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded" style={{ backgroundColor: 'rgba(74,222,128,0.15)', color: '#4ade80' }}>{k.badge}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 48h1440V24C1200 0 960 48 720 24S240 0 0 24V48z" fill="#f5f5f5" />
          </svg>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-14">

        {/* ── THREE INSIGHTS ── */}
        <section>
          <div className="text-center mb-10">
            <span className="inline-block text-xs font-black px-4 py-1.5 rounded-lg tracking-widest uppercase mb-4" style={{ backgroundColor: 'rgba(61,90,115,0.12)', color: '#2d3e4e' }}>
              DATOS EXCLUSIVOS
            </span>
            <h2 className="font-black mb-2" style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', color: '#1a1a1a', letterSpacing: '-0.02em' }}>
              Lo que ningún portal te cuenta
            </h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: '#666' }}>
              Información verificada de 18 fuentes oficiales. No opiniones: hechos.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { stat: '18:1', label: 'Turistas / vivienda', title: 'El dato que nadie publica', desc: 'Frigiliana: 54.745 turistas con pernoctación en 2024. 62,5% internacionales. Con 3.041 viviendas, el ratio es de 18 turistas por vivienda.' },
              { stat: '355', label: 'VUT activas', title: 'Ventaja Frigiliana', desc: 'Málaga capital bloqueó nuevas licencias VUT (2024–2027). Frigiliana no está afectada. Mientras el mercado vecino se contrae, aquí la oferta puede crecer.' },
              { stat: '+7,4%', label: 'Crecimiento aeropuerto', title: 'El aeropuerto no para', desc: '26,7 millones de pasajeros en 2025. Récord absoluto. UK envió 6,1M de personas. Cada vuelo es demanda potencial para Frigiliana.' },
            ].map((c, i) => (
              <div key={i} className="rounded-lg p-6 hover:-translate-y-1 transition-transform" style={cardStyle}>
                <div className="text-3xl font-black mb-1" style={{ color: '#2d3e4e' }}>{c.stat}</div>
                <div className="text-[10px] font-bold uppercase tracking-widest mb-4" style={{ color: '#9ca3af' }}>{c.label}</div>
                <h3 className="font-bold text-base mb-2" style={{ color: '#1a1a1a' }}>{c.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#666' }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── MACRO STATS ── */}
        <section className="rounded-lg overflow-hidden" style={cardStyle}>
          <div className="px-6 py-4 text-white" style={{ backgroundColor: '#2d3e4e' }}>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold bg-white/15 px-2.5 py-1 rounded">01</span>
              <h2 className="text-lg font-black">España & Málaga — Indicadores clave 2025</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-200">
            {[
              { l: "Compraventas España", v: "705.000", s: "Récord desde 2008", d: "+10,4% anual" },
              { l: "IPV España Q3 2025", v: "+12,8%", s: "Máximo histórico INE", d: "2ª mano +13,4%" },
              { l: "Extranjeros compradores", v: "97.300", s: "Nuevo máximo absoluto", d: "+5% vs 2024" },
              { l: "Precio medio España", v: "2.354€", s: "Por m² — Registradores", d: "+9,5% anual" },
              { l: "Málaga: extranjeros", v: "32,3%", s: "De todas las compras", d: "2ª prov. España" },
              { l: "Precio Málaga provincia", v: "3.232€", s: "Por m² — cierre 2025", d: "+15,5% anual" },
              { l: "Hipotecas España 2025", v: "367.715", s: "Acumulado sept. 2025", d: "+13,4% anual" },
              { l: "IRAV — tope alquiler", v: "+2,2%", s: "Actualización contratos", d: "Ley 12/2023" },
            ].map((s, i) => (
              <div key={i} className="bg-white p-5 hover:bg-gray-50 transition-colors">
                <div className="text-[9px] font-bold uppercase tracking-widest mb-2" style={{ color: '#9ca3af' }}>{s.l}</div>
                <div className="text-2xl font-black mb-1" style={{ color: '#2d3e4e' }}>{s.v}</div>
                <div className="text-xs mb-1" style={{ color: '#666' }}>{s.s}</div>
                <span className="text-[10px] font-bold" style={{ color: '#22c55e' }}>▲ {s.d}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── AXARQUÍA TABLE ── */}
        <section className="rounded-lg overflow-hidden" style={cardStyle}>
          <div className="px-6 py-4 text-white" style={{ backgroundColor: '#2d3e4e' }}>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold bg-white/15 px-2.5 py-1 rounded">02</span>
              <h2 className="text-lg font-black">Comparativa Axarquía — Precios 2025</h2>
            </div>
          </div>

          {/* Exclusive callout */}
          <div className="px-6 py-5" style={{ backgroundColor: 'rgba(61,90,115,0.04)', borderBottom: '1px solid #e5e7eb' }}>
            <div className="flex items-start gap-3">
              <span className="text-lg">★</span>
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: '#2d3e4e' }}>Dato exclusivo Propaxar</div>
                <p className="text-sm leading-relaxed" style={{ color: '#666' }}>
                  Frigiliana cotiza un 24% por debajo de Nerja con rentabilidad vacacional comparable (72% vs 76% ocupación).
                  Para el mismo presupuesto, en Frigiliana obtienes un <strong style={{ color: '#1a1a1a' }}>32% más de metros cuadrados</strong>.
                </p>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                  {['Municipio', '€/m² venta', 'Alquiler LT/mes', 'Ocup. VUT', 'Tend. anual'].map(h => (
                    <th key={h} className={`px-5 py-3 text-[10px] font-bold uppercase tracking-widest ${h !== 'Municipio' ? 'text-right' : 'text-left'}`} style={{ color: '#9ca3af' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {AXARQUIA.map((r, i) => (
                  <tr
                    key={i}
                    className="hover:bg-gray-50 transition-colors"
                    style={{
                      borderBottom: '1px solid #f3f4f6',
                      backgroundColor: r.highlight ? 'rgba(61,90,115,0.06)' : undefined,
                    }}
                  >
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
        </section>

        {/* ── AIRPORT + SEASONALITY ── */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Airport */}
          <div className="rounded-lg overflow-hidden" style={cardStyle}>
            <div className="px-6 py-4" style={{ borderBottom: '1px solid #e5e7eb', backgroundColor: '#f9fafb' }}>
              <h3 className="font-bold text-base" style={{ color: '#2d3e4e' }}>Mercados emisores — Málaga 2025</h3>
            </div>
            <div className="p-5 space-y-2">
              {[
                { flag: "🇬🇧", name: "Reino Unido", pax: "6.149.697 pax", d: "+7,1%" },
                { flag: "🇩🇪", name: "Alemania", pax: "2.012.019 pax", d: "+8,3%" },
                { flag: "🇳🇱", name: "Países Bajos", pax: "1.631.525 pax", d: "+9,2%" },
                { flag: "🇮🇹", name: "Italia", pax: "1.397.672 pax", d: "+11,4%" },
                { flag: "🇦🇪", name: "Emiratos Árabes", pax: "Emergente", d: "+75,7% 🔥" },
                { flag: "🇮🇸", name: "Islandia", pax: "Emergente", d: "+59,2% 🔥" },
                { flag: "🇨🇿", name: "R. Checa", pax: "Emergente", d: "+32,4%" },
                { flag: "🇫🇷", name: "Francia", pax: "1.386.610 pax", d: "+8,9%" },
              ].map((n, i) => (
                <div key={i} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <span className="text-xl">{n.flag}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold" style={{ color: '#1a1a1a' }}>{n.name}</div>
                    <div className="text-xs" style={{ color: '#9ca3af' }}>{n.pax}</div>
                  </div>
                  <span className="text-xs font-bold" style={{ color: '#22c55e' }}>{n.d}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Seasonality */}
          <div className="rounded-lg overflow-hidden" style={cardStyle}>
            <div className="px-6 py-4" style={{ borderBottom: '1px solid #e5e7eb', backgroundColor: '#f9fafb' }}>
              <h3 className="font-bold text-base" style={{ color: '#2d3e4e' }}>Estacionalidad vacacional — Frigiliana</h3>
            </div>
            <div className="p-5">
              <div className="text-xs mb-4" style={{ color: '#9ca3af' }}>Ocupación mensual — Airbtics 2024</div>
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
                {[
                  { a: "Agosto pico", b: "251€/noche", c: "#ef4444" },
                  { a: "Media anual", b: "124€/noche", c: "#2d3e4e" },
                  { a: "263 noches", b: "reservadas/año", c: "#9ca3af" },
                ].map((d, i) => (
                  <div key={i} className="pl-3" style={{ borderLeft: `2px solid ${d.c}` }}>
                    <div className="text-[10px] font-bold" style={{ color: d.c }}>{d.a}</div>
                    <div className="text-xs" style={{ color: '#666' }}>{d.b}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── REGULATION ── */}
        <section className="rounded-lg overflow-hidden" style={cardStyle}>
          <div className="px-6 py-4 text-white" style={{ backgroundColor: '#2d3e4e' }}>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold bg-white/15 px-2.5 py-1 rounded">03</span>
              <h2 className="text-lg font-black">Marco regulatorio — Lo que cambia en 2025</h2>
            </div>
          </div>
          <div className="divide-y divide-gray-100">
            {[
              { date: "Ene 2025", title: "Registro VUT obligatorio (RD 1312/2024)", detail: "Todas las viviendas turísticas deben inscribirse en el Registro Único. Plazo regularización: julio 2025.", tag: "OBLIGATORIO", tagBg: "rgba(239,68,68,0.1)", tagColor: "#ef4444" },
              { date: "2024–2027", title: "Moratoria VUT Málaga capital — Frigiliana NO afectada", detail: "Suspensión 3 años de nuevas licencias VUT en Málaga capital. Frigiliana queda fuera: ventaja estructural para inversores.", tag: "VENTAJA", tagBg: "rgba(34,197,94,0.1)", tagColor: "#22c55e" },
              { date: "2025", title: "IRAV — Tope actualización renta +2,2%", detail: "El nuevo Índice de Referencia para Actualización de Renta sustituye al IPC. Aplica a contratos firmados desde mayo 2023.", tag: "RESTRICTIVO", tagBg: "rgba(245,158,11,0.1)", tagColor: "#f59e0b" },
              { date: "Abr 2025", title: "Comunidades pueden limitar VUT por mayoría 3/5", detail: "Art. 17.12 LPH: las comunidades de propietarios pueden restringir o prohibir VUT con mayoría cualificada.", tag: "RIESGO", tagBg: "rgba(107,114,128,0.1)", tagColor: "#6b7280" },
            ].map((r, i) => (
              <div key={i} className="px-6 py-5 flex gap-4 hover:bg-gray-50 transition-colors">
                <div className="text-[10px] font-medium pt-0.5 min-w-[70px]" style={{ color: '#9ca3af' }}>{r.date}</div>
                <div>
                  <div className="font-semibold text-sm mb-1" style={{ color: '#1a1a1a' }}>{r.title}</div>
                  <div className="text-xs leading-relaxed mb-2" style={{ color: '#666' }}>{r.detail}</div>
                  <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded" style={{ backgroundColor: r.tagBg, color: r.tagColor }}>{r.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── UPSELL: PERSONALIZED REPORT ── */}
        <section>
          <div className="text-center mb-8">
            <span className="inline-block text-xs font-black px-4 py-1.5 rounded-lg tracking-widest uppercase mb-4" style={{ backgroundColor: 'rgba(61,90,115,0.12)', color: '#2d3e4e' }}>
              REPORTE PERSONALIZADO
            </span>
            <h2 className="font-black mb-3" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', color: '#1a1a1a', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              Este es el informe público.<br />El tuyo es diferente.
            </h2>
            <p className="text-base max-w-xl mx-auto mb-6" style={{ color: '#666' }}>
              Los datos de arriba son el mercado general. Tu reporte incluye propiedades reales, seleccionadas para ti, con análisis que ningún portal ofrece.
            </p>
            <Link
              to="/market-report"
              className="inline-flex items-center gap-2 text-sm font-bold px-7 py-3.5 rounded-lg transition-all hover:-translate-y-0.5 active:scale-[0.97]"
              style={{ backgroundColor: '#2d3e4e', color: '#fff' }}
            >
              Ver mi reporte personalizado →
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {[
              { icon: '🏘️', title: 'Propiedades Seleccionadas', desc: 'Escogidas manualmente para tu presupuesto y requisitos. Sin listados irrelevantes.', tag: '✓ 100% relevantes' },
              { icon: '📊', title: 'Análisis Honesto', desc: 'Precios reales, disponibilidad actual e información que solo un experto local con 10+ años conoce.', tag: '✓ Info exclusiva' },
              { icon: '🎯', title: 'Recomendación Directa', desc: 'Qué propiedad se ajusta mejor a tu perfil y por qué. Sin ambigüedades.', tag: '✓ Decisión clara' },
              { icon: '📦', title: 'Guía Logística Insider', desc: 'Campo vs pueblo, agua, paquetería, basuras. La verdad que descubres cuando ya te mudaste.', tag: '✓ Sin sorpresas' },
              { icon: '📅', title: '6 Meses de Seguimiento', desc: 'Actualizaciones cada viernes con nuevas propiedades y cambios de precio.', tag: '✓ 24 updates' },
              { icon: '🎁', title: 'Reembolso Garantizado', desc: 'Si acabas alquilando una propiedad Propaxar Direct, reembolsamos los 180€ completos.', tag: '✓ Riesgo cero', highlight: true },
            ].map((f, i) => (
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
                <p className="text-sm leading-relaxed mb-3" style={{ color: '#666' }}>{f.desc}</p>
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

          {/* CTA BLOCK — Contact only */}
          <div
            className="rounded-lg overflow-hidden text-white"
            style={{ background: 'linear-gradient(135deg, #2d3e4e 0%, #3d5a73 50%, #2d3e4e 100%)' }}
          >
            <div className="px-8 py-10 text-center">
              <h3 className="text-2xl font-black mb-3">¿Quieres tu reporte personalizado?</h3>
              <p className="text-sm max-w-md mx-auto mb-8" style={{ color: 'rgba(255,255,255,0.65)' }}>
                Escríbeme y te explico qué incluye, cómo funciona y si tiene sentido para tu situación. Sin compromiso.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hola Manuel, me interesa el Reporte Personalizado de Frigiliana. ¿Me puedes dar más información?')}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white font-bold px-6 py-3.5 rounded-lg transition hover:opacity-90" style={{ backgroundColor: '#22c55e' }}>
                  💬 WhatsApp: {PHONE}
                </a>
                <a href={`mailto:${EMAIL}?subject=${encodeURIComponent('Reporte Personalizado Frigiliana')}`} className="inline-flex items-center gap-2 text-white font-semibold px-6 py-3.5 rounded-lg transition hover:bg-white/20" style={{ backgroundColor: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.2)' }}>
                  📧 {EMAIL}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── NEWSLETTER CAPTURE ── */}
        <section className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="text-[10px] font-black uppercase tracking-widest mb-3" style={{ color: '#2d3e4e' }}>Suscripción gratuita</div>
            <h2 className="font-black mb-3" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: '#1a1a1a', letterSpacing: '-0.02em', lineHeight: 1.15 }}>
              El primer lunes de cada mes. En tu bandeja de entrada. Sin coste.
            </h2>
            <p className="text-sm leading-relaxed mb-5" style={{ color: '#666' }}>
              Precios actualizados, análisis de mercado, cambios regulatorios y propiedades destacadas. La inteligencia que necesitas antes de tomar decisiones.
            </p>
            <ul className="space-y-2">
              {[
                'Precios €/m² actualizados Frigiliana y Axarquía',
                'Datos aeropuerto y turismo mensual',
                'Cambios regulatorios que afectan a tu propiedad',
                'Sin spam. Baja cuando quieras. Solo datos.',
              ].map((li, i) => (
                <li key={i} className="flex items-start gap-2 text-sm" style={{ color: '#666' }}>
                  <span style={{ color: '#2d3e4e', fontWeight: 600 }}>→</span> {li}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg p-6" style={cardStyle}>
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="font-bold text-base mb-1" style={{ color: '#1a1a1a' }}>Recibir el informe mensual</div>
                <div className="text-xs mb-4" style={{ color: '#9ca3af' }}>Gratis · Sin compromiso · Datos reales</div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color: '#9ca3af' }}>Nombre</label>
                  <input className="w-full border rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-gray-300" style={{ borderColor: '#e5e7eb' }} placeholder="Tu nombre" value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color: '#9ca3af' }}>Email *</label>
                  <input className="w-full border rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-gray-300" style={{ borderColor: '#e5e7eb' }} type="email" placeholder="tu@email.com" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color: '#9ca3af' }}>Perfil</label>
                  <select className="w-full border rounded-lg px-4 py-3 text-sm outline-none bg-white" style={{ borderColor: '#e5e7eb' }} value={form.perfil} onChange={e => setForm({ ...form, perfil: e.target.value })}>
                    <option value="">¿Qué te describe mejor?</option>
                    <option>Comprador — quiero vivir aquí</option>
                    <option>Inquilino — busco alquiler</option>
                    <option>Propietario — tengo una propiedad</option>
                    <option>Curiosidad general</option>
                  </select>
                </div>
                <button type="submit" className="w-full font-bold py-3.5 rounded-lg text-white text-sm transition-all hover:opacity-90" style={{ backgroundColor: '#2d3e4e' }}>
                  Suscribirme al Market Report →
                </button>
                <p className="text-[10px]" style={{ color: '#9ca3af' }}>
                  Al suscribirte aceptas recibir el informe mensual. Datos tratados conforme al RGPD. Baja inmediata con un clic.
                </p>
              </form>
            ) : (
              <div className="text-center py-10">
                <div className="text-4xl mb-3" style={{ color: '#22c55e' }}>✓</div>
                <div className="font-bold text-lg mb-2" style={{ color: '#1a1a1a' }}>Suscripción confirmada</div>
                <p className="text-sm" style={{ color: '#666' }}>
                  Recibirás el próximo informe el <strong style={{ color: '#2d3e4e' }}>primer lunes de abril.</strong>
                </p>
              </div>
            )}
          </div>
        </section>

        {/* SOURCES */}
        <div className="flex items-center gap-3 flex-wrap py-4">
          <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color: '#9ca3af' }}>Fuentes</span>
          {["INE", "Registradores", "Aena", "Idealista", "Airbtics", "Banco de España", "CaixaBank Research", "Turismo Costa del Sol", "Diputación Málaga", "Kyero", "RealAdvisor", "Likibu", "MIVAU", "Ayto. Frigiliana"].map(s => (
            <span key={s} className="text-[9px] px-2 py-1 rounded" style={{ backgroundColor: '#e5e7eb', color: '#666' }}>{s}</span>
          ))}
        </div>

      </div>

      <Footer />
    </div>
  );
}
