import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import "./Invertir.css";

const SCENARIOS = [
  {
    label: "Conservador", tag: "PRIMERA INVERSIÓN",
    type: "Apartamento 1 dorm / 50m²", price: 175000,
    gross: 9.1, net: 4.9, appreciation: 6.4, total: 11.3,
    income: 16000, expenses: 7500, netIncome: 8500,
    payback: 21, color: "hsl(var(--success))",
    note: "Ideal para primer contacto con el mercado. Gestión mínima.",
  },
  {
    label: "Estándar", tag: "MÁS POPULAR",
    type: "Apartamento 2 dorm / 65m²", price: 220000,
    gross: 13.2, net: 6.1, appreciation: 6.4, total: 12.5,
    income: 29000, expenses: 14150, netIncome: 14850,
    payback: 15, color: "hsl(var(--primary))",
    note: "El modelo más replicado en Frigiliana. ROI verificado con datos reales.",
  },
  {
    label: "Premium", tag: "MÁXIMO RETORNO",
    type: "Casa rural 3 dorm / 120m²", price: 420000,
    gross: 12.4, net: 6.8, appreciation: 6.4, total: 13.2,
    income: 52000, expenses: 23500, netIncome: 28500,
    payback: 15, color: "hsl(var(--destructive))",
    note: "Alto volumen, alta gestión. Para inversores con experiencia en STR.",
  },
];

export default function InvertirPage() {
  const [selected, setSelected] = useState(1);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ nombre: "", email: "", telefono: "", presupuesto: "", pais: "", nota: "" });
  const sc = SCENARIOS[selected];

  return (
    <div className="invertir-page">
      <Helmet>
        <title>Invertir en Frigiliana — ROI 12-14% Verificado | Propaxar</title>
        <meta name="description" content="Modelos de inversión inmobiliaria en Frigiliana con rentabilidad verificada. Datos reales de 901 propiedades VUT. Consulta gratuita con experto local." />
      </Helmet>

      {/* NAV */}
      <nav className="inv-nav">
        <a href="/" className="inv-nav-logo">Propaxar</a>
        <div className="inv-nav-links">
          <a href="/mercado" className="inv-nav-link">Market Report</a>
          <a href="/invertir" className="inv-nav-link active">Invertir</a>
          <a href="/empezar" className="inv-nav-link">Comprar</a>
          <a href="/empezar" className="inv-nav-link">Alquilar</a>
        </div>
        <button className="inv-nav-cta" onClick={() => document.getElementById('consulta')?.scrollIntoView({ behavior: 'smooth' })}>
          Consulta gratuita
        </button>
      </nav>

      {/* HERO */}
      <section className="inv-hero">
        <div className="inv-hero-bg" />
        <div className="inv-hero-grid-lines" />
        <div className="inv-hero-eyebrow">Inversión inmobiliaria — Frigiliana, Costa del Sol</div>
        <h1 className="inv-hero-h1">
          12–14% de retorno.<br />
          <em>Verificado.</em> Cada año.
        </h1>
        <p className="inv-hero-sub">
          Rentabilidad neta VUT + revalorización anual en el mercado más exclusivo de la Axarquía.
          Datos reales de 901 propiedades activas. Sin estimaciones. Sin promesas vacías.
        </p>
        <div className="inv-hero-actions">
          <button className="inv-btn-primary" onClick={() => document.getElementById('consulta')?.scrollIntoView({ behavior: 'smooth' })}>
            Analizar mi inversión
          </button>
          <button className="inv-btn-ghost" onClick={() => document.getElementById('roi')?.scrollIntoView({ behavior: 'smooth' })}>
            Ver modelos ROI →
          </button>
          <span className="inv-hero-note">Consulta gratuita · Sin compromiso</span>
        </div>

        {/* STRIP */}
        <div className="inv-hero-strip">
          {[
            { v: "3.295€/m²", l: "Precio Frigiliana", d: "+6,4% anual" },
            { v: "72%", l: "Ocupación VUT media", d: "98% en agosto" },
            { v: "29.000€", l: "Ingresos brutos/año", d: "Propiedad 65m²" },
            { v: "26,7M", l: "Pasajeros Málaga 2025", d: "Récord histórico" },
          ].map((s, i) => (
            <div className="inv-strip-cell" key={i}>
              <span className="inv-strip-val">{s.v}</span>
              <span className="inv-strip-label">{s.l}</span>
              <span className="inv-strip-delta">▲ {s.d}</span>
            </div>
          ))}
        </div>
      </section>

      {/* PROOF */}
      <div className="inv-proof-bar">
        {[
          { icon: "✓", text: <><strong>40 años</strong> de conocimiento local en Frigiliana</> },
          { icon: "✓", text: <><strong>18 fuentes</strong> de datos verificadas, actualizadas mensualmente</> },
          { icon: "✓", text: <><strong>Nº1 VUT rural</strong> Málaga — 355 establecimientos registrados</> },
          { icon: "✓", text: <><strong>32,3%</strong> compradores extranjeros en Málaga provincia</> },
        ].map((p, i) => (
          <div className="inv-proof-item" key={i}>
            <span className="inv-proof-icon">{p.icon}</span>
            <span className="inv-proof-text">{p.text}</span>
          </div>
        ))}
      </div>

      {/* ROI CALCULATOR */}
      <section className="inv-section" id="roi">
        <div className="inv-section-eyebrow">Modelos de inversión</div>
        <h2 className="inv-section-title">
          Elige tu escenario.<br />
          Todos son <em>reales.</em>
        </h2>
        <p className="inv-section-lead">
          Tres modelos basados en propiedades reales de Frigiliana.
          Ingresos Airbnb verificados con datos de 901 listings activos.
          Gastos calculados con operadores locales.
        </p>

        <div className="inv-roi-grid">
          {SCENARIOS.map((s, i) => (
            <div className={`inv-roi-card${selected === i ? " selected" : ""}`} key={i} onClick={() => setSelected(i)}>
              <div className="inv-roi-tag" style={{ color: s.color, borderColor: s.color }}>{s.tag}</div>
              <div className="inv-roi-type">{s.type}</div>
              <div className="inv-roi-price">{s.price.toLocaleString()}€</div>
              <div className="inv-roi-metrics">
                {[
                  ["Rent. bruta VUT", `${s.gross}%`],
                  ["Rent. neta", `${s.net}%`],
                  ["Revalorización", `+${s.appreciation}%`],
                  ["Retorno total", `${s.total}%`, s.color],
                ].map(([l, v, c]) => (
                  <div className="inv-roi-metric" key={l as string}>
                    <span className="inv-roi-metric-label">{l}</span>
                    <span className="inv-roi-metric-val" style={{ color: (c as string) || "hsl(var(--foreground))" }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* DETAIL */}
        <div className="inv-detail-panel">
          <div className="inv-detail-grid">
            <div>
              <div className="inv-detail-cell-label">Ingresos brutos/año</div>
              <div className="inv-detail-cell-val" style={{ color: "hsl(var(--success))" }}>+{sc.income.toLocaleString()}€</div>
              <div className="inv-detail-cell-sub">Airbnb/Booking estimado</div>
            </div>
            <div>
              <div className="inv-detail-cell-label">Gastos operativos</div>
              <div className="inv-detail-cell-val" style={{ color: "hsl(var(--destructive))" }}>-{sc.expenses.toLocaleString()}€</div>
              <div className="inv-detail-cell-sub">Gestión + plataformas + IBI</div>
            </div>
            <div>
              <div className="inv-detail-cell-label">Ingreso neto anual</div>
              <div className="inv-detail-cell-val" style={{ color: "hsl(var(--foreground))" }}>{sc.netIncome.toLocaleString()}€</div>
              <div className="inv-detail-cell-sub">Después de todos los gastos</div>
            </div>
            <div>
              <div className="inv-detail-cell-label">Retorno total anual</div>
              <div className="inv-detail-cell-val" style={{ color: "hsl(var(--primary))" }}>{sc.total}%</div>
              <div className="inv-detail-cell-sub">Neto + revalorización {sc.appreciation}%</div>
            </div>
          </div>
          <div className="inv-detail-breakdown">
            <div className="inv-breakdown-title">Desglose de gastos estimados</div>
            {[
              ["Plataformas (Airbnb/Booking 15%)", -Math.round(sc.income * 0.15)],
              ["Gestión integral (20% ingresos)", -Math.round(sc.income * 0.20)],
              ["IBI + Seguro responsabilidad civil", -Math.round(sc.income * 0.06)],
              ["Suministros + Comunidad + Mantenimiento", -Math.round(sc.income * 0.07)],
            ].map(([l, v]) => (
              <div className="inv-breakdown-row" key={l as string}>
                <span className="label">{l}</span>
                <span className="val-neg">{(v as number).toLocaleString()}€</span>
              </div>
            ))}
            <div className="inv-breakdown-row">
              <span className="label">Ingreso neto anual</span>
              <span className="val-total">+{sc.netIncome.toLocaleString()}€</span>
            </div>
          </div>
          <p style={{ fontSize: 11, color: "hsl(var(--foreground-subtle))", marginTop: 20, lineHeight: 1.6 }}>
            Nota: {sc.note} · Fuentes: Airbtics, AirDNA, operadores locales Frigiliana · Los gastos de compra (ITP 7% + notaría ~1,5% + gestoría ~1,5%) no están incluidos en el modelo de retorno.
          </p>
        </div>
      </section>

      {/* WHY FRIGILIANA */}
      <section className="inv-section">
        <div className="inv-section-eyebrow">Por qué Frigiliana</div>
        <h2 className="inv-section-title">6 razones que los números <em>confirman</em></h2>
        <p className="inv-section-lead">No es marketing. Son datos verificables. Cada punto tiene fuente oficial.</p>
        <div className="inv-why-grid">
          {[
            { n: "01", icon: "✈️", title: "26,7 millones de puertas de entrada", text: "El aeropuerto de Málaga cerró 2025 con récord histórico absoluto. +7,4% en pasajeros, inversión aprobada de 1.500M€ para ampliar. Reino Unido solo envió 6,1 millones de personas.", stat: "26,7M pax 2025", sl: "Aena — récord histórico" },
            { n: "02", icon: "🏛️", title: "Moratoria VUT: ventaja exclusiva", text: "Málaga capital suspendió nuevas licencias VUT 3 años. Frigiliana no está afectada. Mientras la competencia se contrae, tu propiedad puede operar y obtener licencia.", stat: "Frigiliana libre", sl: "Moratoria NO aplica aquí" },
            { n: "03", icon: "📊", title: "Oferta estructuralmente limitada", text: "3.041 viviendas construidas totales. Crecimiento urbanístico muy restringido por normativa de Parque Natural. La escasez no es circunstancial — es permanente.", stat: "3.041 viviendas", sl: "Stock total — oferta inelástica" },
            { n: "04", icon: "🌍", title: "32,3% de compradores son extranjeros", text: "En toda la provincia de Málaga. Británicos, holandeses, suecos, belgas llevan décadas comprando en la Axarquía. Mercado internacionalizado y maduro.", stat: "32,3% extranjeros", sl: "Registradores 2025" },
            { n: "05", icon: "⭐", title: "Top 4 Pueblos más bonitos de España", text: "Reconocimiento oficial de Pueblos Más Bonitos España. Top 23 mundial según Travel & Leisure USA. 54.745 turistas con pernoctación en 2024. No es un secreto — pero aún no está sobreexplotado.", stat: "Top 4 España", sl: "Pueblos Más Bonitos España" },
            { n: "06", icon: "📈", title: "+12,8% IPV nacional — ciclo alcista confirmado", text: "El Índice de Precios de Vivienda alcanzó en Q3 2025 su máximo histórico. 705.000 compraventas en España — récord desde 2008. El ciclo expansivo tiene base sólida.", stat: "+12,8% IPV", sl: "INE Q3 2025 — máximo histórico" },
          ].map(w => (
            <div className="inv-why-card" key={w.n}>
              <div className="inv-why-number">{w.n}</div>
              <div className="inv-why-icon">{w.icon}</div>
              <h3 className="inv-why-title">{w.title}</h3>
              <p className="inv-why-text">{w.text}</p>
              <div className="inv-why-stat">{w.stat}</div>
              <div className="inv-why-stat-label">{w.sl}</div>
            </div>
          ))}
        </div>
      </section>

      {/* LEAD FORM */}
      <section className="inv-lead-section" id="consulta">
        <div>
          <div className="inv-section-eyebrow">Consulta gratuita</div>
          <h2 className="inv-lead-title">
            Cuéntame tu inversión.<br />
            Te digo si <em>tiene sentido.</em>
          </h2>
          <p className="inv-lead-body">
            Soy Manuel. Llevo 40 años en Frigiliana. Conozco cada calle, cada propietario,
            cada propiedad que sale al mercado antes de publicarse.
            En 30 minutos te digo si tu objetivo es alcanzable con el presupuesto que tienes.
          </p>
          <ul className="inv-lead-promise">
            <li>Análisis de rentabilidad personalizado con tus datos</li>
            <li>Propiedades que encajan con tu perfil — antes de que salgan al mercado</li>
            <li>Estimación de gastos reales: compra, reforma, gestión</li>
            <li>Asesoramiento sobre VUT, regulación y gestoría local</li>
            <li>Sin compromiso. Si no encaja, te lo digo.</li>
          </ul>
        </div>
        <div className="inv-form-box">
          {!sent ? (
            <>
              <div className="inv-form-box-title">Solicitar análisis gratuito</div>
              <div className="inv-form-box-sub">Respondo en menos de 24h · Manuel C. Fernández</div>
              <div className="inv-field-row">
                <div className="inv-field">
                  <label>Nombre *</label>
                  <input placeholder="Tu nombre" value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} required />
                </div>
                <div className="inv-field">
                  <label>País de residencia</label>
                  <select value={form.pais} onChange={e => setForm({ ...form, pais: e.target.value })}>
                    <option value="">Seleccionar</option>
                    <option>Reino Unido</option>
                    <option>Países Bajos</option>
                    <option>Bélgica</option>
                    <option>Dinamarca</option>
                    <option>Suecia</option>
                    <option>Alemania</option>
                    <option>Irlanda</option>
                    <option>Estados Unidos</option>
                    <option>España</option>
                    <option>Otro</option>
                  </select>
                </div>
              </div>
              <div className="inv-field">
                <label>Email *</label>
                <input type="email" placeholder="tu@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
              </div>
              <div className="inv-field-row">
                <div className="inv-field">
                  <label>Teléfono / WhatsApp</label>
                  <input placeholder="+34 600 000 000" value={form.telefono} onChange={e => setForm({ ...form, telefono: e.target.value })} />
                </div>
                <div className="inv-field">
                  <label>Presupuesto aproximado</label>
                  <select value={form.presupuesto} onChange={e => setForm({ ...form, presupuesto: e.target.value })}>
                    <option value="">Seleccionar</option>
                    <option>Hasta 150.000€</option>
                    <option>150.000 – 250.000€</option>
                    <option>250.000 – 400.000€</option>
                    <option>400.000 – 600.000€</option>
                    <option>Más de 600.000€</option>
                  </select>
                </div>
              </div>
              <div className="inv-field">
                <label>¿Qué buscas exactamente?</label>
                <textarea rows={3} placeholder="Describe tu objetivo de inversión..." value={form.nota} onChange={e => setForm({ ...form, nota: e.target.value })} />
              </div>
              <button className="inv-submit-btn" onClick={() => { if (form.nombre && form.email) setSent(true); }}>
                Enviar consulta gratuita →
              </button>
              <div className="inv-form-legal">Datos tratados conforme al RGPD. No compartimos información con terceros. Respuesta garantizada en 24h laborables.</div>
            </>
          ) : (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <div style={{ fontSize: 56, marginBottom: 20, color: "hsl(var(--success))" }}>✓</div>
              <div className="inv-form-box-title" style={{ textAlign: "center" }}>Consulta recibida</div>
              <p style={{ fontSize: 14, color: "hsl(var(--foreground-muted))", lineHeight: 1.8, marginTop: 10 }}>
                Hola {form.nombre || ""}. Revisaré tu caso esta tarde<br />y te escribo antes de 24h.<br /><br />
                <strong style={{ color: "hsl(var(--primary))" }}>Manuel · Propaxar Frigiliana</strong>
              </p>
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="inv-footer">
        <div className="inv-footer-brand">Propaxar</div>
        <nav className="inv-footer-nav">
          <a href="/mercado">Market Report</a>
          <a href="/empezar">Comprar</a>
          <a href="/empezar">Alquilar</a>
          <a href="/empezar">Contacto</a>
        </nav>
        <div className="inv-footer-copy">© 2026 Propaxar · Frigiliana, Málaga · Manuel C. Fernández Ramírez</div>
      </footer>
    </div>
  );
}
