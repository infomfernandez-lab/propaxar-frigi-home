import { useState } from "react";
import { Helmet } from "react-helmet-async";
import "./Mercado.css";

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
  { m: "E", occ: 38, c: "#3A4A5E" }, { m: "F", occ: 44, c: "#3A4A5E" },
  { m: "M", occ: 52, c: "#3A6E5E" }, { m: "A", occ: 68, c: "#3A6E5E" },
  { m: "M", occ: 74, c: "#8B6E2A" }, { m: "J", occ: 83, c: "#8B6E2A" },
  { m: "J", occ: 94, c: "#C9A84C" }, { m: "A", occ: 98, c: "#C24B3A" },
  { m: "S", occ: 87, c: "#8B6E2A" }, { m: "O", occ: 72, c: "#3A6E5E" },
  { m: "N", occ: 48, c: "#3A4A5E" }, { m: "D", occ: 40, c: "#3A4A5E" },
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
      <Helmet>
        <title>Mercado Inmobiliario Frigiliana — Datos Mensuales | Propaxar</title>
        <meta name="description" content="Reporte mensual gratuito del mercado inmobiliario de Frigiliana y Axarquía. Precios, turismo, regulación y rentabilidad. Datos de 18 fuentes oficiales." />
      </Helmet>

      {/* MASTHEAD */}
      <header className="mercado-masthead">
        <div className="masthead-left">
          propaxar.es/mercado
        </div>
        <div className="masthead-center">
          <div className="masthead-logo">Propaxar</div>
          <div className="masthead-tagline">Market Intelligence · Frigiliana & Axarquía</div>
        </div>
        <div className="masthead-right">
          <span>Marzo 2026</span>
          <strong>Edición mensual gratuita</strong>
        </div>
      </header>

      {/* TICKER */}
      <div className="mercado-ribbon">
        <div className="ribbon-inner">{tickerText}</div>
      </div>

      {/* HERO EDITORIAL */}
      <section className="mercado-hero">
        <div className="hero-main">
          <div className="edition-tag">
            <span className="edition-dot" />
            Reporte Mensual — Marzo 2026
          </div>
          <h1 className="hero-headline">
            Frigiliana:<br />
            el mercado que ningún portal<br />
            <em>sabe explicar.</em>
          </h1>
          <p className="hero-deck">
            Precios, flujos turísticos, compradores internacionales y rentabilidad real —
            en un solo informe. Datos de 18 fuentes oficiales. Publicado cada primer lunes del mes.
            Sin coste. Sin trampa.
          </p>
          <p className="hero-byline">
            Por <strong>Manuel C. Fernández Ramírez</strong> · Propaxar Frigiliana ·
            40 años de conocimiento local
          </p>
        </div>

        {/* SIDEBAR KPIS */}
        <aside className="hero-sidebar">
          <div className="sidebar-section">
            <div className="sidebar-label">€/m² Frigiliana</div>
            <div className="sidebar-kpi">3.295</div>
            <div className="sidebar-kpi-sub">Idealista dic. 2025</div>
            <div className="sidebar-badge badge-up">▲ +6,4% anual</div>
          </div>
          <div className="sidebar-section">
            <div className="sidebar-label">Pasajeros aeropuerto 2025</div>
            <div className="sidebar-kpi">26,7M</div>
            <div className="sidebar-kpi-sub">Récord histórico — Aena</div>
            <div className="sidebar-badge badge-up">▲ +7,4% vs 2024</div>
          </div>
          <div className="sidebar-section">
            <div className="sidebar-label">Extranjeros en Málaga</div>
            <div className="sidebar-kpi">32,3%</div>
            <div className="sidebar-kpi-sub">De todas las compraventas</div>
            <div className="sidebar-badge badge-up">▲ 2ª provincia España</div>
          </div>
          <div className="sidebar-section">
            <div className="sidebar-label">Ingresos VUT Frigiliana</div>
            <div className="sidebar-kpi">29k€</div>
            <div className="sidebar-kpi-sub">Media anual — 65m² — Airbtics</div>
            <div className="sidebar-badge badge-up">▲ 72% ocupación</div>
          </div>
        </aside>
      </section>

      {/* THREE COLUMNS — CONTEXT */}
      <section className="mercado-columns">
        <div className="col">
          <h2 className="col-title">El dato que <em>nadie publica</em></h2>
          <div className="col-rule" />
          <p className="col-text">
            Frigiliana registró 54.745 turistas con pernoctación en 2024.
            El 62,5% eran internacionales — y crecieron un +20,2%.
            Con 3.041 viviendas construidas, el ratio es de 18 turistas alojados por cada vivienda del pueblo.
          </p>
          <div className="col-stat">18:1</div>
          <div className="col-stat-label">Turistas alojados / vivienda construida</div>
        </div>
        <div className="col">
          <h2 className="col-title">Moratoria VUT: ventaja <em>Frigiliana</em></h2>
          <div className="col-rule" />
          <p className="col-text">
            Málaga capital bloqueó nuevas licencias VUT durante 3 años (2024–2027).
            Frigiliana no está afectada.
            Mientras el mercado vecino se contrae, aquí la oferta puede crecer. Para inversores con visión,
            este dato vale decenas de miles de euros.
          </p>
          <div className="col-stat">355</div>
          <div className="col-stat-label">VUT activas — Nº1 rural de Málaga</div>
        </div>
        <div className="col">
          <h2 className="col-title">El aeropuerto <em>no para de crecer</em></h2>
          <div className="col-rule" />
          <p className="col-text">
            26,7 millones de pasajeros en 2025. Récord absoluto en 105 años de historia.
            Reino Unido envió 6,1 millones de personas.
            El Gobierno invierte 1.500M€ para ampliarlo. Cada vuelo es demanda potencial para Frigiliana.
          </p>
          <div className="col-stat">+7,4%</div>
          <div className="col-stat-label">Crecimiento aeropuerto 2025 — 4º España</div>
        </div>
      </section>

      {/* MACRO STATS */}
      <section className="data-section">
        <div className="section-flag">
          <div className="section-number">01</div>
          <h2 className="section-heading">España & Málaga — Indicadores clave <em>2025</em></h2>
        </div>
        <div className="stats-grid">
          {[
            { l: "Compraventas España", v: "705.000", s: "Récord desde 2008", d: "+10,4% anual", up: true },
            { l: "IPV España Q3 2025", v: "+12,8%", s: "Máximo histórico INE", d: "2ª mano +13,4%", up: true },
            { l: "Extranjeros compradores", v: "97.300", s: "Nuevo máximo absoluto", d: "+5% vs 2024", up: true },
            { l: "Precio medio España", v: "2.354€", s: "Por m² — Registradores", d: "+9,5% anual", up: true },
            { l: "Málaga: extranjeros", v: "32,3%", s: "De todas las compras", d: "2ª prov. España", up: true },
            { l: "Precio Málaga provincia", v: "3.232€", s: "Por m² — cierre 2025", d: "+15,5% anual", up: true },
            { l: "Hipotecas España 2025", v: "367.715", s: "Acumulado sept. 2025", d: "+13,4% anual", up: true },
            { l: "IRAV — tope alquiler", v: "+2,2%", s: "Actualización contratos", d: "Ley 12/2023", up: false },
          ].map((s, i) => (
            <div className="stat-cell" key={i}>
              <div className="stat-cell-label">{s.l}</div>
              <div className="stat-cell-val">{s.v}</div>
              <div className="stat-cell-sub">{s.s}</div>
              <div className={`stat-cell-delta ${s.up ? "delta-up" : "delta-neu"}`}>
                {s.up ? "▲" : "●"} {s.d}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AXARQUÍA TABLE */}
      <section className="data-section">
        <div className="section-flag">
          <div className="section-number">02</div>
          <h2 className="section-heading">Comparativa Axarquía completa — Precios <em>2025</em></h2>
        </div>

        <div className="exclusive">
          <div className="exclusive-eyebrow">★ Dato exclusivo Propaxar</div>
          <p className="exclusive-text">
            Frigiliana cotiza un 24% por debajo de Nerja con rentabilidad vacacional comparable (72% vs 76% ocupación).
            Para el mismo presupuesto, en Frigiliana obtienes un <strong>32% más de metros cuadrados</strong> de propiedad — con mayor potencial de revalorización.
          </p>
        </div>

        <table className="compare-table">
          <thead>
            <tr>
              <th>Municipio</th>
              <th>€/m² venta</th>
              <th>Alquiler LT/mes</th>
              <th>Ocup. VUT</th>
              <th>Tend. anual</th>
            </tr>
          </thead>
          <tbody>
            {AXARQUIA.map((r, i) => (
              <tr key={i} className={r.highlight ? "highlight-row" : ""}>
                <td>{r.name}</td>
                <td>{r.price.toLocaleString()}</td>
                <td>{r.rent}</td>
                <td>{r.vut}</td>
                <td className="td-up">{r.trend}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* AIRPORT + SEASONALITY */}
      <section className="mercado-columns" style={{ gridTemplateColumns: "1fr 1fr" }}>
        <div className="col">
          <h3 className="col-title">
            Mercados emisores aeropuerto <em>Málaga 2025</em>
          </h3>
          <div className="col-rule" />
          <div className="nations-grid">
            {[
              { flag: "🇬🇧", name: "Reino Unido", pax: "6.149.697 pax", d: "+7,1%", up: true },
              { flag: "🇩🇪", name: "Alemania", pax: "2.012.019 pax", d: "+8,3%", up: true },
              { flag: "🇳🇱", name: "Países Bajos", pax: "1.631.525 pax", d: "+9,2%", up: true },
              { flag: "🇮🇹", name: "Italia", pax: "1.397.672 pax", d: "+11,4%", up: true },
              { flag: "🇦🇪", name: "Emiratos Árabes", pax: "Mercado emergente", d: "+75,7% 🔥", up: true },
              { flag: "🇮🇸", name: "Islandia", pax: "Mercado emergente", d: "+59,2% 🔥", up: true },
              { flag: "🇨🇿", name: "R. Checa", pax: "Mercado emergente", d: "+32,4%", up: true },
              { flag: "🇫🇷", name: "Francia", pax: "1.386.610 pax", d: "+8,9%", up: true },
            ].map((n, i) => (
              <div className="nation-row" key={i}>
                <span className="nation-flag">{n.flag}</span>
                <div style={{ flex: 1 }}>
                  <div className="nation-name">{n.name}</div>
                  <div className="nation-pax">{n.pax}</div>
                </div>
                <span className={`nation-delta ${n.up ? "delta-up" : "delta-down"}`}>{n.d}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="col">
          <h3 className="col-title">
            Estacionalidad vacacional <em>Frigiliana</em>
          </h3>
          <div className="col-rule" />
          <div className="col-stat-label" style={{ marginBottom: 8 }}>Ocupación mensual — Airbtics 2024</div>
          <div className="season-wrap">
            {SEASON.map((s, i) => (
              <div className="s-col" key={i}>
                <span className="s-val" style={{ color: s.occ > 85 ? "#C24B3A" : s.occ > 65 ? "#C9A84C" : "var(--muted)" }}>{s.occ}%</span>
                <div className="s-bar" style={{ height: `${s.occ}%`, background: s.c }} />
                <span className="s-label">{s.m}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 16, marginTop: 20, flexWrap: "wrap" }}>
            {[
              ["Agosto pico", "251€/noche", "var(--red)"],
              ["Media anual", "124€/noche", "var(--gold)"],
              ["263 noches", "reservadas/año", "var(--muted)"],
            ].map(([a, b, c], i) => (
              <div key={i} style={{ borderLeft: `2px solid ${c}`, paddingLeft: 10 }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: c, fontWeight: 500 }}>{a}</div>
                <div style={{ fontSize: 12, color: "var(--warm)" }}>{b}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REGULATION */}
      <section className="data-section">
        <div className="section-flag">
          <div className="section-number">03</div>
          <h2 className="section-heading">Marco regulatorio — Lo que cambia en <em>2025</em></h2>
        </div>
        {[
          { date: "Ene 2025", title: "Registro VUT obligatorio (RD 1312/2024)", detail: "Todas las viviendas turísticas deben inscribirse en el Registro Único de Arrendamientos. Plazo regularización: julio 2025.", tag: "OBLIGATORIO", tc: "rgba(194,75,58,0.2)", color: "#EB8B7F" },
          { date: "2024–2027", title: "Moratoria VUT Málaga capital — Frigiliana NO afectada", detail: "Suspensión 3 años de nuevas licencias VUT en Málaga capital. Frigiliana queda fuera de la moratoria: ventaja estructural para inversores.", tag: "VENTAJA COMPETITIVA", tc: "rgba(74,158,107,0.2)", color: "#6FCF97" },
          { date: "2025", title: "IRAV — Tope actualización renta +2,2%", detail: "El nuevo Índice de Referencia para Actualización de Renta sustituye al IPC. Aplica a contratos firmados desde mayo 2023.", tag: "RESTRICTIVO PROPIETARIOS", tc: "rgba(201,168,76,0.15)", color: "var(--gold)" },
          { date: "Abr 2025", title: "Comunidades pueden limitar VUT por mayoría 3/5", detail: "Art. 17.12 LPH: las comunidades de propietarios pueden restringir o prohibir VUT con mayoría cualificada.", tag: "RIESGO MODERADO", tc: "rgba(122,130,153,0.15)", color: "var(--muted)" },
        ].map((r, i) => (
          <div className="reg-item" key={i}>
            <div className="reg-date">{r.date}</div>
            <div className="reg-content">
              <div className="reg-title">{r.title}</div>
              <div className="reg-detail">{r.detail}</div>
              <span className="reg-tag" style={{ background: r.tc, color: r.color }}>{r.tag}</span>
            </div>
          </div>
        ))}
      </section>

      {/* NEWSLETTER CAPTURE */}
      <section className="mercado-capture">
        <div className="capture-left">
          <div className="capture-edition">Suscripción gratuita — Market Report Propaxar</div>
          <h2 className="capture-title">
            El primer lunes de cada mes.<br />
            En tu bandeja de entrada.<br />
            <em>Sin coste.</em>
          </h2>
          <p className="capture-body">
            Cada mes: precios actualizados, análisis de mercado, cambios regulatorios
            y operaciones destacadas. La inteligencia de mercado que los inversores serios
            necesitan antes de tomar decisiones.
          </p>
          <ul className="capture-features">
            <li>Precios €/m² actualizados Frigiliana y Axarquía</li>
            <li>Datos aeropuerto y turismo mensual</li>
            <li>Cambios regulatorios que afectan a tu propiedad</li>
            <li>Análisis de rentabilidad VUT y larga temporada</li>
            <li>Sin spam. Baja cuando quieras. Solo datos.</li>
          </ul>
        </div>

        <div className="capture-form-wrap">
          {!submitted ? (
            <form className="capture-form" onSubmit={handleSubmit}>
              <div className="form-title">Recibir el informe mensual</div>
              <div className="form-sub">Gratis · Sin compromiso · Datos reales</div>
              <div className="form-field">
                <label className="form-label">Nombre</label>
                <input className="form-input" placeholder="Tu nombre" value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} />
              </div>
              <div className="form-field">
                <label className="form-label">Email *</label>
                <input className="form-input" type="email" placeholder="tu@email.com" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              </div>
              <div className="form-field">
                <label className="form-label">Perfil</label>
                <select className="form-select" value={form.perfil} onChange={e => setForm({ ...form, perfil: e.target.value })}>
                  <option value="">¿Qué describes mejor?</option>
                  <option>Inversor — busco rentabilidad</option>
                  <option>Comprador — quiero vivir aquí</option>
                  <option>Propietario — tengo una propiedad</option>
                  <option>Inquilino — busco alquiler</option>
                  <option>Curiosidad general</option>
                </select>
              </div>
              <button type="submit" className="form-btn">
                Suscribirme al Market Report →
              </button>
              <p className="form-disclaimer">
                Al suscribirte aceptas recibir el informe mensual de Propaxar.
                Datos tratados conforme al RGPD. Baja inmediata con un clic.
              </p>
            </form>
          ) : (
            <div className="capture-form" style={{ textAlign: "center", padding: "48px 32px" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>✓</div>
              <div className="form-title">Suscripción confirmada</div>
              <p style={{ fontSize: 14, color: "var(--warm)", marginTop: 12, lineHeight: 1.7 }}>
                Recibirás el próximo informe el<br />
                <strong style={{ color: "var(--gold)" }}>primer lunes de abril.</strong><br />
                Mientras tanto, explora los datos en esta página o contacta directamente con Manuel.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* SOURCES */}
      <div className="sources-bar">
        <span className="sources-label">Fuentes</span>
        {["INE", "Registradores", "Aena", "Idealista", "Airbtics", "Banco de España", "CaixaBank Research", "Turismo Costa del Sol", "Diputación Málaga", "Kyero", "RealAdvisor", "Likibu", "MIVAU", "Ayto. Frigiliana"].map(s => (
          <span className="source-chip" key={s}>{s}</span>
        ))}
      </div>

      {/* FOOTER */}
      <footer className="mercado-footer">
        <div className="footer-brand">Propaxar</div>
        <nav className="footer-links">
          <a href="/empezar" className="footer-link">Invertir</a>
          <a href="/empezar" className="footer-link">Comprar</a>
          <a href="/empezar" className="footer-link">Alquilar</a>
          <a href="/empezar" className="footer-link">Contacto</a>
        </nav>
        <div className="footer-legal">© 2026 Propaxar · Manuel C. Fernández Ramírez · Frigiliana</div>
      </footer>
    </div>
  );
}
