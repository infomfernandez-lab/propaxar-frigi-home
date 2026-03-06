import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import "./Alquilar.css";

const MONTHS = [
  { m: "Ene", score: "⚡", label: "Ideal", tip: "Mejores precios del año. Propietarios más negociadores. Sin competencia.", color: "hsl(var(--success))", bg: "hsl(var(--success) / 0.08)", bar: "hsl(var(--success))", pct: 95 },
  { m: "Feb", score: "⚡", label: "Ideal", tip: "Aún temporada baja. Propiedades que no se alquilaron en verano salen al mercado.", color: "hsl(var(--success))", bg: "hsl(var(--success) / 0.08)", bar: "hsl(var(--success))", pct: 90 },
  { m: "Mar", score: "✓", label: "Bueno", tip: "El mercado empieza a activarse. Buenos precios todavía.", color: "hsl(var(--primary))", bg: "hsl(var(--primary) / 0.06)", bar: "hsl(var(--primary))", pct: 75 },
  { m: "Abr", score: "✓", label: "Bueno", tip: "Aún hay margen de negociación antes del verano.", color: "hsl(var(--primary))", bg: "hsl(var(--primary) / 0.06)", bar: "hsl(var(--primary))", pct: 65 },
  { m: "May", score: "⚠", label: "Difícil", tip: "Los propietarios empiezan a preferir alquiler vacacional. La oferta residencial cae.", color: "hsl(var(--secondary))", bg: "hsl(var(--secondary) / 0.08)", bar: "hsl(var(--secondary))", pct: 40 },
  { m: "Jun", score: "✗", label: "Muy difícil", tip: "Competencia directa con turistas. Precios inflados.", color: "hsl(var(--destructive))", bg: "hsl(var(--destructive) / 0.06)", bar: "hsl(var(--destructive))", pct: 20 },
  { m: "Jul", score: "✗", label: "Evitar", tip: "Temporada alta VUT. Alquilar en julio es casi imposible a precio razonable.", color: "hsl(var(--destructive))", bg: "hsl(var(--destructive) / 0.08)", bar: "hsl(var(--destructive))", pct: 10 },
  { m: "Ago", score: "✗", label: "Evitar", tip: "Pico absoluto. Solo para emergencias. Precio vacacional se multiplica x3.", color: "hsl(var(--destructive))", bg: "hsl(var(--destructive) / 0.1)", bar: "hsl(var(--destructive))", pct: 5 },
  { m: "Sep", score: "⚠", label: "Regular", tip: "El mercado empieza a relajarse. Octubre es mejor.", color: "hsl(var(--secondary))", bg: "hsl(var(--secondary) / 0.08)", bar: "hsl(var(--secondary))", pct: 45 },
  { m: "Oct", score: "✓", label: "Muy bueno", tip: "Propietarios buscan ingresos estables para el invierno. Excelente momento.", color: "hsl(var(--primary))", bg: "hsl(var(--primary) / 0.06)", bar: "hsl(var(--primary))", pct: 85 },
  { m: "Nov", score: "⚡", label: "Ideal", tip: "Mercado en mínimos de competencia. Mejor selección y precio del año.", color: "hsl(var(--success))", bg: "hsl(var(--success) / 0.08)", bar: "hsl(var(--success))", pct: 92 },
  { m: "Dic", score: "⚡", label: "Ideal", tip: "Los propietarios no quieren propiedades vacías en invierno. Tu mejor baza.", color: "hsl(var(--success))", bg: "hsl(var(--success) / 0.08)", bar: "hsl(var(--success))", pct: 90 },
];

const WOW_CARDS = [
  { n: "01", icon: "📅", title: "El calendario que ningún portal publica", text: "En julio es casi imposible alquilar a precio justo — los propietarios prefieren VUT a 251€/noche. Enero, noviembre y diciembre son el momento ideal. Ese dato vale semanas de búsqueda.", stat: "98%", sl: "Ocupación turística agosto — competencia directa" },
  { n: "02", icon: "🏘️", title: "Residencial vs turístico: dos mercados distintos", text: "El precio de Airbnb (124€/noche media) no tiene nada que ver con el alquiler residencial (1.100–1.400€/mes). Pero en temporada alta compiten por el mismo stock de viviendas.", stat: "1.100–1.400€", sl: "Alquiler residencial típico 2/3 dorm" },
  { n: "03", icon: "🤝", title: "Propiedades que no están en Idealista", text: "Los propietarios con quien tengo relación de años no publican en portales. Me llaman directamente. Eso significa que algunas de las mejores propiedades nunca aparecen online.", stat: "40 años", sl: "Red de propietarios directos en Frigiliana" },
  { n: "04", icon: "📊", title: "El coste real — con todos los gastos", text: "El portal te dice el precio de alquiler. Nadie te dice lo que cuesta el agua, la comunidad si aplica, o si la calefacción es por leña o eléctrica. Aquí lo sabes antes de llamar.", stat: "200–400€", sl: "Gastos adicionales típicos mensuales" },
  { n: "05", icon: "📡", title: "Conectividad real — no la que promete el anuncio", text: "El casco histórico de Frigiliana tiene cobertura fibra limitada. La parte nueva tiene mejor conexión. Para nómadas digitales, esto puede ser la diferencia.", stat: "100–600Mb", sl: "Rango real según zona del pueblo" },
  { n: "06", icon: "📋", title: "Contratos que te protegen legalmente", text: "En Frigiliana existen alquileres de temporada que los propietarios presentan como residenciales — sin los derechos que te corresponden por la LAU.", stat: "LAU 2023", sl: "Derechos reales que pocos inquilinos conocen" },
];

export default function AlquilarPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ nombre: "", email: "", tipo: "", presupuesto: "", cuando: "", habitaciones: "", nota: "" });
  const [activeMonth, setActiveMonth] = useState<number | null>(null);

  return (
    <div className="alquilar-page pt-[60px]">
      <Helmet>
        <title>Alquilar en Frigiliana — Precios Reales y Datos Exclusivos | Propaxar</title>
        <meta name="description" content="Encuentra alquiler residencial en Frigiliana a precio justo. Datos reales de coste de vida, calendario de mercado y propiedades off-market. Consulta gratuita." />
      </Helmet>

      <Navigation />

      {/* HERO */}
      <section className="alq-hero">
        <div>
          <div className="alq-hero-tag">
            <span className="alq-hero-tag-dot" />
            Alquiler residencial Frigiliana — datos reales
          </div>
          <h1 className="alq-hero-h1">
            Vivir en Frigiliana<br />
            <em>sin pagar precio</em><br />
            de <strong>turista.</strong>
          </h1>
          <p className="alq-hero-sub">
            El mercado de alquiler de Frigiliana tiene dos caras: la de los portales —
            y la real. La diferencia puede ser de <strong>600€/mes</strong> y de saber
            exactamente cuándo y cómo buscar.
          </p>
          <div className="alq-hero-actions">
            <button className="alq-btn-primary" onClick={() => document.getElementById('buscar')?.scrollIntoView({ behavior: 'smooth' })}>
              Buscar con Manuel
            </button>
            <button className="alq-btn-ghost" onClick={() => document.getElementById('calendario')?.scrollIntoView({ behavior: 'smooth' })}>
              Ver cuándo buscar →
            </button>
          </div>
        </div>

        {/* PANEL */}
        <div className="alq-hero-panel">
          <div className="alq-panel-header">
            <span className="alq-panel-header-title">Mercado residencial Frigiliana</span>
            <span className="alq-panel-header-badge">2025</span>
          </div>
          <div className="alq-panel-body">
            {[
              { label: "Alquiler típico 2/3 dorm (larga temporada)", val: "1.100–1.400€", sub: "POR MES — RESIDENCIAL", c: "hsl(var(--primary))" },
              { label: "Precio Airbnb media anual (misma propiedad)", val: "124€/noche", sub: "× 30 = 3.720€/MES VACACIONAL", c: "hsl(var(--destructive))" },
              { label: "Diferencia propietario prefiere turístico", val: "×2,5–×3", sub: "EN TEMPORADA ALTA — JULIO/AGOSTO", c: "hsl(var(--destructive))" },
              { label: "Mejor mes para encontrar alquiler residencial", val: "Nov–Dic–Ene", sub: "MENOS COMPETENCIA, MÁS NEGOCIACIÓN", c: "hsl(var(--success))" },
              { label: "Ocupación VUT agosto (competencia directa)", val: "98%", sub: "SIN VIVIENDAS DISPONIBLES RESIDENCIAL", c: "hsl(var(--destructive))" },
            ].map((s, i) => (
              <div className="alq-panel-stat" key={i}>
                <span className="alq-panel-stat-label">{s.label}</span>
                <div>
                  <div className="alq-panel-stat-val" style={{ color: s.c }}>{s.val}</div>
                  <div className="alq-panel-stat-sub">{s.sub}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="alq-panel-exclusive">
            <strong>★ Dato exclusivo Propaxar</strong>
            En invierno, un propietario de Frigiliana con VUT activa puede preferir
            un inquilino de larga temporada antes que el piso vacío — si encuentras
            el momento y tienes el contacto directo. Eso es lo que ofrezco.
          </div>
        </div>
      </section>

      {/* TRUST */}
      <div className="alq-trust">
        {[
          { icon: "🔍", strong: "Propiedades off-market", text: "Que no están en Idealista ni Fotocasa" },
          { icon: "📋", strong: "Revisión de contrato", text: "LAU vs temporada — que sepas lo que firmas" },
          { icon: "📅", strong: "Timing de mercado", text: "Cuándo salen más propiedades residenciales" },
          { icon: "💬", strong: "Negociación directa", text: "Con propietarios que llevan años de relación" },
          { icon: "🌐", strong: "EN / ES / NL", text: "Comunicación en tu idioma" },
        ].map((t, i) => (
          <div className="alq-trust-item" key={i}>
            <span className="alq-trust-icon">{t.icon}</span>
            <span className="alq-trust-text">
              <strong>{t.strong}</strong>
              {t.text}
            </span>
          </div>
        ))}
      </div>

      {/* WOW */}
      <section className="alq-wow-section">
        <div className="alq-wow-eyebrow">Inteligencia local exclusiva</div>
        <h2 className="alq-wow-title">
          Lo que ningún portal<br /><em>sabe explicarte.</em>
        </h2>
        <p className="alq-wow-lead">
          Idealista te da el precio. Fotocasa te da las fotos.
          Ninguno te dice cuándo buscar, qué contratos evitar, qué zonas tienen fibra real,
          o que hay propiedades que nunca se publican.
        </p>
        <div className="alq-wow-cards">
          {WOW_CARDS.map(c => (
            <div className="alq-wow-card" key={c.n}>
              <div className="alq-wow-card-num">#{c.n}</div>
              <span className="alq-wow-card-icon">{c.icon}</span>
              <h3 className="alq-wow-card-title">{c.title}</h3>
              <p className="alq-wow-card-text">{c.text}</p>
              <div className="alq-wow-card-stat">{c.stat}</div>
              <div className="alq-wow-card-stat-label">{c.sl}</div>
            </div>
          ))}
        </div>
      </section>

      {/* COSTE DE VIDA */}
      <section className="alq-cost-section">
        <div className="alq-section-eyebrow">Presupuesto real</div>
        <h2 className="alq-section-title">
          Lo que te cuesta vivir aquí —<br /><em>de verdad.</em>
        </h2>
        <p className="alq-section-lead">
          El alquiler es solo una parte. Estos son los gastos reales mensuales en Frigiliana,
          basados en propiedades típicas del casco histórico y zona nueva.
        </p>
        <div className="alq-cost-grid">
          {/* Casco histórico */}
          <div className="alq-cost-panel">
            <h3 className="alq-cost-panel-title">Apartamento 2 dorm — Casco histórico</h3>
            <div className="alq-cost-panel-sub">Estimación mensual real · 2025</div>
            {[
              { icon: "🏠", label: "Alquiler residencial", val: "1.200€", note: "Rango 1.100–1.400€" },
              { icon: "💧", label: "Agua (pueblo antiguo — tuberías antiguas)", val: "60–90€", note: "Más alto que zona nueva" },
              { icon: "⚡", label: "Electricidad", val: "80–130€", note: "Calefacción eléctrica en invierno" },
              { icon: "📡", label: "Internet fibra (si disponible)", val: "30–45€", note: "Cobertura limitada en casco" },
              { icon: "🅿️", label: "Parking (si no incluido)", val: "50–80€", note: "En calles estrechas, necesario" },
              { icon: "🏘️", label: "Comunidad (si aplica)", val: "0–60€", note: "Varía mucho según edificio" },
            ].map((r, i) => (
              <div className="alq-cost-row" key={i}>
                <span className="alq-cost-row-label"><span className="alq-cost-row-icon">{r.icon}</span>{r.label}</span>
                <div>
                  <div className="alq-cost-row-val">{r.val}</div>
                  <div className="alq-cost-row-note">{r.note}</div>
                </div>
              </div>
            ))}
            <div className="alq-cost-total">
              <span className="alq-cost-total-label">Total mensual estimado</span>
              <span className="alq-cost-total-val">1.420–1.745€</span>
            </div>
            <div className="alq-insight-box">
              <div className="alq-insight-box-eyebrow">💡 Lo que nadie te dice</div>
              <p className="alq-insight-box-text">
                Las casas del casco histórico tienen muros de 60cm — en verano no necesitan aire acondicionado.
                En invierno la calefacción es el gasto más variable. Siempre pregunta <strong>qué sistema tiene la propiedad</strong> antes de negociar.
              </p>
            </div>
          </div>

          {/* Zona nueva */}
          <div className="alq-cost-panel">
            <h3 className="alq-cost-panel-title">Apartamento 2 dorm — Zona nueva / urbanización</h3>
            <div className="alq-cost-panel-sub">Estimación mensual real · 2025</div>
            {[
              { icon: "🏠", label: "Alquiler residencial", val: "1.100€", note: "Ligeramente inferior al casco" },
              { icon: "💧", label: "Agua", val: "30–50€", note: "Red más moderna, consumo normal" },
              { icon: "⚡", label: "Electricidad", val: "70–110€", note: "Similar, mejor aislamiento térmico" },
              { icon: "📡", label: "Internet fibra", val: "30–40€", note: "Mejor cobertura que casco histórico" },
              { icon: "🅿️", label: "Parking", val: "0€", note: "Generalmente incluido en urbanización" },
              { icon: "🏘️", label: "Comunidad", val: "40–80€", note: "Piscina comunitaria si tiene" },
            ].map((r, i) => (
              <div className="alq-cost-row" key={i}>
                <span className="alq-cost-row-label"><span className="alq-cost-row-icon">{r.icon}</span>{r.label}</span>
                <div>
                  <div className="alq-cost-row-val">{r.val}</div>
                  <div className="alq-cost-row-note">{r.note}</div>
                </div>
              </div>
            ))}
            <div className="alq-cost-total">
              <span className="alq-cost-total-label">Total mensual estimado</span>
              <span className="alq-cost-total-val">1.270–1.480€</span>
            </div>
            <div className="alq-insight-box">
              <div className="alq-insight-box-eyebrow">💡 Ventajas zona nueva</div>
              <p className="alq-insight-box-text">
                Mejor fibra y acceso en coche. Si trabajas online o tienes familia con coche,
                la zona nueva puede ser más práctica — aunque pierde el encanto del <strong>casco histórico</strong> y las vistas inmediatas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MARKET CALENDAR */}
      <section className="alq-calendar-section" id="calendario">
        <div className="alq-section-eyebrow" style={{ color: "hsl(var(--primary))" }}>Timing del mercado</div>
        <h2 className="alq-section-title">
          Cuándo buscar —<br /><em>la guía que nadie publica.</em>
        </h2>
        <p className="alq-section-lead">
          El mercado de alquiler residencial de Frigiliana tiene ritmos muy marcados.
          Buscar en el momento equivocado puede costarte meses de espera o 400€/mes de más.
        </p>
        <div className="alq-calendar-grid">
          <div>
            <div className="alq-months-visual">
              {MONTHS.map((m, i) => (
                <div
                  className="alq-month-cell"
                  key={i}
                  style={{ background: m.bg }}
                  onClick={() => setActiveMonth(activeMonth === i ? null : i)}
                >
                  <div className="alq-month-name">{m.m}</div>
                  <div className="alq-month-score" style={{ color: m.color, fontSize: m.pct > 80 ? 22 : 18 }}>{m.score}</div>
                  <div className="alq-month-label">{m.label}</div>
                  <div className="alq-month-bar" style={{ background: m.bar, width: `${m.pct}%` }} />
                </div>
              ))}
            </div>
            {activeMonth !== null && (
              <div className="alq-month-tip">
                <div className="alq-month-tip-title">
                  {MONTHS[activeMonth].m} — {MONTHS[activeMonth].label}
                </div>
                <p className="alq-month-tip-text">{MONTHS[activeMonth].tip}</p>
              </div>
            )}
            <div className="alq-calendar-legend">
              {[["⚡", "hsl(var(--success))", "Ideal"], ["✓", "hsl(var(--primary))", "Bueno"], ["⚠", "hsl(var(--secondary))", "Regular/Difícil"], ["✗", "hsl(var(--destructive))", "Evitar"]].map(([s, c, l]) => (
                <div className="alq-legend-item" key={l}>
                  <div className="alq-legend-dot" style={{ background: c }} />
                  <span>{s} {l}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="alq-insight-cards">
            <div className="alq-insight-card" style={{ borderLeftColor: "hsl(var(--success))" }}>
              <div className="alq-insight-card-title">⚡ La ventana de oro: Nov–Ene</div>
              <p className="alq-insight-card-text">
                Cuando el verano termina, los propietarios con VUT activa buscan
                ingresos estables para el invierno. Es el único momento donde
                tienes poder de negociación real. Muchos aceptan contratos anuales
                a precios hasta un 15% inferiores a los de primavera.
              </p>
            </div>
            <div className="alq-insight-card" style={{ borderLeftColor: "hsl(var(--secondary))" }}>
              <div className="alq-insight-card-title">📋 Temporada vs. residencial: la trampa legal</div>
              <p className="alq-insight-card-text">
                Muchos propietarios en Frigiliana ofrecen contratos de "temporada"
                (Art. 3.2 LAU) incluso para estancias de 12 meses. Eso te priva de
                la protección de la LAU residencial: prórroga automática, límite de
                subida de renta, y derechos de desahucio. Revisamos cada contrato.
              </p>
            </div>
            <div className="alq-insight-card" style={{ borderLeftColor: "hsl(var(--destructive))" }}>
              <div className="alq-insight-card-title">⚠️ Jun–Sep: el mercado casi desaparece</div>
              <p className="alq-insight-card-text">
                Con Airbnb a 251€/noche en agosto, un propietario prefiere 3 semanas
                de turistas a todo un mes de alquiler residencial. Si buscas en verano
                para mudarte en otoño, empieza la búsqueda en mayo.
              </p>
            </div>
            <div className="alq-insight-card" style={{ borderLeftColor: "hsl(var(--primary))" }}>
              <div className="alq-insight-card-title">💡 El contacto directo vale meses de búsqueda</div>
              <p className="alq-insight-card-text">
                Las mejores propiedades en Frigiliana nunca llegan a Idealista.
                Un propietario con quien tengo relación de años me llama antes de
                publicar. Eso es lo que ningún portal puede darte.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* RESIDENCIAL VS TURÍSTICO */}
      <section className="alq-comparison-section">
        <div className="alq-section-eyebrow" style={{ color: "hsl(var(--primary))" }}>Los dos mercados</div>
        <h2 className="alq-section-title">
          Residencial vs. turístico —<br /><em>en los mismos metros cuadrados.</em>
        </h2>
        <p className="alq-section-lead">
          La misma propiedad puede ser tu hogar estable o un negocio vacacional.
          Entender la diferencia te ayuda a negociar mejor y elegir el contrato correcto.
        </p>
        <div className="alq-vs-grid">
          <div className="alq-vs-col">
            <h3 className="alq-vs-title">Alquiler residencial</h3>
            <div className="alq-vs-sub">Contrato LAU — Larga temporada</div>
            {[
              ["Precio típico 2 dorm", "1.100–1.400€/mes"],
              ["Contrato mínimo", "12 meses + prórroga LAU"],
              ["Actualización renta", "Máx. +2,2% (IRAV 2025)"],
              ["Desahucio protección", "Alta — proceso largo"],
              ["Para el propietario", "Ingreso estable, gestión mínima"],
              ["Para el inquilino", "Seguridad legal, derechos completos"],
              ["Disponibilidad", "Alta en Oct–Mar, baja Jun–Sep"],
            ].map(([l, v]) => (
              <div className="alq-vs-row" key={l}>
                <span className="alq-vs-row-label">{l}</span>
                <span className="alq-vs-row-val" style={{ color: "hsl(var(--primary))" }}>{v}</span>
              </div>
            ))}
            <div className="alq-vs-verdict" style={{ background: "hsl(var(--success) / 0.06)", color: "hsl(var(--success))" }}>
              ✓ Ideal si buscas estabilidad, tienes familia o trabajas desde aquí a largo plazo.
            </div>
          </div>
          <div className="alq-vs-divider">
            <div className="alq-vs-badge">VS</div>
          </div>
          <div className="alq-vs-col right">
            <h3 className="alq-vs-title">Alquiler vacacional (VUT)</h3>
            <div className="alq-vs-sub">Airbnb / Booking — Corta estancia</div>
            {[
              ["Precio verano", "200–251€/noche (julio-ago)"],
              ["Precio invierno", "78–95€/noche (ene-feb)"],
              ["Duración típica", "3–14 noches por reserva"],
              ["Ingreso propietario (media)", "29.000€/año brutos"],
              ["Gestión", "Alta — limpieza, check-in, etc."],
              ["Protección inquilino", "Ninguna — no es vivienda habitual"],
              ["Disponibilidad residente", "Muy baja en temporada alta"],
            ].map(([l, v]) => (
              <div className="alq-vs-row" key={l}>
                <span className="alq-vs-row-label">{l}</span>
                <span className="alq-vs-row-val" style={{ color: "hsl(var(--destructive))" }}>{v}</span>
              </div>
            ))}
            <div className="alq-vs-verdict" style={{ background: "hsl(var(--destructive) / 0.06)", color: "hsl(var(--destructive))" }}>
              ⚠ No es alquiler residencial. Si un propietario te ofrece "alquiler" con precios de Airbnb, revisa qué contrato firmas.
            </div>
          </div>
        </div>
      </section>

      {/* PROPAXAR ADVANTAGE */}
      <section className="alq-advantage-section">
        <div className="alq-advantage-eyebrow">Por qué trabajar con Propaxar</div>
        <h2 className="alq-advantage-title">
          La diferencia entre buscar<br />
          en un portal y buscar con alguien que <em>conoce el pueblo.</em>
        </h2>
        <p className="alq-advantage-lead">
          Soy Manuel. Vivo en Frigiliana desde hace 40 años. Conozco cada propietario,
          cada calle, cada propiedad que entra y sale del mercado. Eso no está en ninguna app.
        </p>
        <div className="alq-advantage-list">
          {[
            { icon: "🏡", title: "Propiedades off-market", text: "Antes de que aparezcan en Idealista. Propietarios que confían en mí para encontrar buenos inquilinos directamente." },
            { icon: "⚖️", title: "Revisión legal del contrato", text: "LAU residencial vs temporada. Que sepas exactamente qué derechos tienes antes de firmar." },
            { icon: "📅", title: "Estrategia de timing", text: "Te digo cuándo y cómo buscar para maximizar tu poder de negociación y acceso al mejor stock." },
            { icon: "💬", title: "Negociación directa", text: "Con propietarios con quien tengo relación de años. El precio de lista no siempre es el precio final." },
          ].map((a, i) => (
            <div className="alq-advantage-item" key={i}>
              <div className="alq-advantage-item-icon">{a.icon}</div>
              <h3 className="alq-advantage-item-title">{a.title}</h3>
              <p className="alq-advantage-item-text">{a.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MARKET REPORT BRIDGE */}
      <section className="alq-bridge-section">
        <div>
          <div className="alq-bridge-eyebrow">Complemento con el Market Report</div>
          <h2 className="alq-bridge-title">
            Entiende el mercado antes<br />de <em>negociar tu alquiler.</em>
          </h2>
          <p className="alq-bridge-body">
            El Market Report mensual de Propaxar te da el contexto completo: evolución de precios,
            cuántos compradores extranjeros hay en el mercado, datos del aeropuerto, y análisis de regulación.
            Un inquilino que entiende el mercado negocia mejor. Es gratis.
          </p>
        </div>
        <div className="alq-bridge-cta-box">
          <div className="alq-bridge-cta-val">3.295€/m²</div>
          <div className="alq-bridge-cta-label">Precio venta Frigiliana<br />+6,4% anual · 18 fuentes</div>
          <button className="alq-btn-white" onClick={() => window.location.href = '/mercado'}>
            Ver Market Report gratuito →
          </button>
        </div>
      </section>

      {/* LEAD FORM */}
      <section className="alq-form-section" id="buscar">
        <div>
          <div className="alq-form-intro-eyebrow">Iniciar búsqueda de alquiler</div>
          <h2 className="alq-form-intro-title">
            Cuéntame qué necesitas.<br />Yo te <em>encuentro la propiedad.</em>
          </h2>
          <p className="alq-form-intro-body">
            Completa el formulario. En 24 horas laborables te envío opciones
            que encajan con tu perfil — incluyendo propiedades que no están
            publicadas en ningún portal.
          </p>
          <ul className="alq-promise-list">
            <li>Propiedades residenciales a precio justo — no precio vacacional</li>
            <li>Off-market: propietarios directos que no publican en portales</li>
            <li>Revisión del contrato incluida — que firmes con seguridad</li>
            <li>Consejo de timing: cuándo tienes más poder de negociación</li>
            <li>Sin coste para el inquilino</li>
          </ul>
          <div className="alq-contact-block">
            <div className="alq-contact-line">📱 <strong>WhatsApp: +34 662 317 561</strong> (EN/ES/NL)</div>
            <div className="alq-contact-line">✉️ <strong>Email: info@propaxar.com</strong></div>
            <div className="alq-contact-line">⏱ Respuesta en menos de 24h laborables</div>
          </div>
        </div>

        <div className="alq-form-card">
          {!sent ? (
            <>
              <div className="alq-form-card-title">Buscar mi alquiler en Frigiliana</div>
              <div className="alq-form-card-sub">Gratis · Sin compromiso · Bilingüe EN/ES/NL</div>
              <div className="alq-field-row">
                <div className="alq-field">
                  <label>Tu nombre *</label>
                  <input placeholder="Nombre completo" value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} required />
                </div>
                <div className="alq-field">
                  <label>Email *</label>
                  <input type="email" placeholder="tu@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
                </div>
              </div>
              <div className="alq-field-row">
                <div className="alq-field">
                  <label>Tipo de alquiler</label>
                  <select value={form.tipo} onChange={e => setForm({ ...form, tipo: e.target.value })}>
                    <option value="">¿Qué buscas?</option>
                    <option>Larga temporada — residencia</option>
                    <option>Media temporada (3–6 meses)</option>
                    <option>Nómada digital — mínimo 1 mes</option>
                    <option>Indiferente — necesito opciones</option>
                  </select>
                </div>
                <div className="alq-field">
                  <label>Habitaciones</label>
                  <select value={form.habitaciones} onChange={e => setForm({ ...form, habitaciones: e.target.value })}>
                    <option value="">¿Cuántas?</option>
                    <option>Estudio / 1 habitación</option>
                    <option>2 habitaciones</option>
                    <option>3 habitaciones</option>
                    <option>4+ habitaciones</option>
                  </select>
                </div>
              </div>
              <div className="alq-field-row">
                <div className="alq-field">
                  <label>Presupuesto máximo/mes</label>
                  <select value={form.presupuesto} onChange={e => setForm({ ...form, presupuesto: e.target.value })}>
                    <option value="">Seleccionar</option>
                    <option>Hasta 800€</option>
                    <option>800 – 1.200€</option>
                    <option>1.200 – 1.600€</option>
                    <option>1.600 – 2.000€</option>
                    <option>Más de 2.000€</option>
                  </select>
                </div>
                <div className="alq-field">
                  <label>¿Cuándo quieres mudarte?</label>
                  <select value={form.cuando} onChange={e => setForm({ ...form, cuando: e.target.value })}>
                    <option value="">Seleccionar</option>
                    <option>Lo antes posible</option>
                    <option>En 1–2 meses</option>
                    <option>En 3–6 meses</option>
                    <option>Estoy explorando opciones</option>
                  </select>
                </div>
              </div>
              <div className="alq-field">
                <label>¿Algo más que deba saber?</label>
                <textarea rows={3} placeholder="Mascotas, teletrabajo, zona preferida, requisitos especiales..." value={form.nota} onChange={e => setForm({ ...form, nota: e.target.value })} />
              </div>
              <button className="alq-submit-btn" onClick={() => { if (form.nombre && form.email) setSent(true); }}>
                Enviar búsqueda →
              </button>
              <div className="alq-form-legal">
                Datos tratados conforme al RGPD. No compartimos información con terceros. Respuesta garantizada en 24h laborables.
              </div>
            </>
          ) : (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <div style={{ fontSize: 56, marginBottom: 20, color: "hsl(var(--success))" }}>✓</div>
              <div className="alq-form-card-title" style={{ textAlign: "center" }}>Búsqueda recibida</div>
              <p style={{ fontSize: 14, color: "hsl(var(--foreground-muted))", lineHeight: 1.8, marginTop: 10 }}>
                Hola {form.nombre || ""}. Revisaré tu perfil y<br />te envío opciones antes de 24h.<br /><br />
                <strong style={{ color: "hsl(var(--primary))" }}>Manuel · Propaxar Frigiliana</strong>
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
