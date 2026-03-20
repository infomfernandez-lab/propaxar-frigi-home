import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function ComprarPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ nombre: "", email: "", pais: "", tipo: "", presupuesto: "", cuando: "", nota: "" });

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Comprar en Frigiliana — Tu Casa en La Axarquía | Propaxar</title>
        <meta name="description" content="Compra tu propiedad en Frigiliana con un especialista local. Datos reales de mercado, gestión NIE y proceso completo. Consulta gratuita." />
      </Helmet>

      <Navigation />

      {/* 1. HERO */}
      <section className="relative min-h-screen flex items-center justify-center pt-[64px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://propaxar.com/wp-content/uploads/2026/01/Gemini_Generated_Image_wyt8u3wyt8u3wyt8.png')" }}
        />
        <div className="absolute inset-0" style={{ background: "rgba(17,24,39,0.65)" }} />
        <div className="relative z-10 max-w-4xl mx-auto px-5 text-center pb-32">
          <p className="inline-block text-[11px] uppercase tracking-[0.2em] text-white/40 border border-white/20 rounded-full px-5 py-2 mb-8">
            Comprar en Frigiliana · La Axarquía · Málaga
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Tu casa en el pueblo más bonito de España.
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-[560px] mx-auto mb-10 leading-relaxed">
            Frigiliana. Calles blancas, vistas al Mediterráneo,
            comunidad de expats consolidada. El pueblo que buscas
            — con alguien que lo conoce de verdad.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <button
              onClick={() => document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-3 rounded-[7px] bg-white font-semibold text-sm"
              style={{ color: "hsl(222, 28%, 16%)" }}
            >
              Empezar mi búsqueda
            </button>
            <button
              onClick={() => document.getElementById("proceso")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-3 rounded-[7px] border border-white/40 text-white font-semibold text-sm hover:bg-white/10 transition"
            >
              Ver el proceso →
            </button>
          </div>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-1 text-white/50 text-xs">
            <span>✓ Consulta gratuita · Sin compromiso</span>
            <span>✓ Respuesta en 24h</span>
            <span>✓ EN · ES</span>
          </div>
        </div>
        {/* Hero stats strip */}
        <div className="absolute bottom-0 left-0 right-0" style={{ background: "rgba(17,24,39,0.85)" }}>
          <div className="max-w-5xl mx-auto px-5 py-5 grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10 text-center">
            {[
              { icon: "🏡", val: "374.000€", label: "Precio medio listado Frigiliana" },
              { icon: "📈", val: "+6,4% anual", label: "Revalorización 2026" },
              { icon: "🌍", val: "32,3% extranjeros", label: "Compradores Málaga provincia" },
              { icon: "✈️", val: "26,7M pasajeros", label: "Aeropuerto Málaga 2025" },
            ].map((s, i) => (
              <div key={i} className="px-4">
                <div className="text-2xl mb-1">{s.icon}</div>
                <div className="text-white font-bold text-lg">{s.val}</div>
                <div className="text-white/60 text-xs">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. TRUST BAR */}
      <section className="bg-card py-5 border-b border-border">
        <div className="max-w-6xl mx-auto px-5 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-foreground-muted">
          {[
            "40 años viviendo en Frigiliana",
            "Propiedades antes de publicarse",
            "Gestión completa: NIE, gestoría, notaría",
            "Servicio bilingüe EN / ES",
            "Sin sorpresas en los costes",
          ].map((t, i) => (
            <span key={i} className="flex items-center gap-2">
              {i > 0 && <span className="text-foreground-muted/40">·</span>}
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* 4. DATOS DE MERCADO */}
      <section className="py-24 bg-card">
        <div className="max-w-5xl mx-auto px-5">
          <p className="text-xs uppercase tracking-[0.2em] text-foreground-muted mb-3">El mercado en datos</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Por qué 2026 es el momento de comprar en Frigiliana</h2>
          <p className="text-foreground-muted mb-12 max-w-2xl">
            Los datos no mienten. Frigiliana combina revalorización sostenida, demanda internacional creciente y un mercado aún accesible comparado con la Costa del Sol occidental.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Price by bedrooms */}
            <div className="bg-background border border-border rounded-[14px] p-7">
              <h3 className="font-bold text-foreground mb-4">Precio medio por dormitorios</h3>
              <div className="space-y-3">
                {[
                  { beds: "1 dormitorio", price: "185.000€", range: "120–250k€" },
                  { beds: "2 dormitorios", price: "275.000€", range: "180–380k€" },
                  { beds: "3 dormitorios", price: "420.000€", range: "280–600k€" },
                  { beds: "4+ dormitorios", price: "580.000€", range: "400–900k€" },
                ].map((r, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                    <span className="text-sm text-foreground">{r.beds}</span>
                    <div className="text-right">
                      <span className="font-bold text-foreground">{r.price}</span>
                      <span className="text-xs text-foreground-muted ml-2">{r.range}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Buyer demographics */}
            <div className="bg-background border border-border rounded-[14px] p-7">
              <h3 className="font-bold text-foreground mb-4">¿Quién compra en la Axarquía?</h3>
              <div className="space-y-3">
                {[
                  { country: "🇬🇧 Reino Unido", pct: "28%" },
                  { country: "🇳🇱 Países Bajos", pct: "14%" },
                  { country: "🇧🇪 Bélgica", pct: "11%" },
                  { country: "🇩🇰 Dinamarca / Suecia", pct: "9%" },
                  { country: "🇩🇪 Alemania", pct: "8%" },
                  { country: "🇪🇸 España (otras provincias)", pct: "30%" },
                ].map((r, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                    <span className="text-sm text-foreground">{r.country}</span>
                    <span className="font-bold text-foreground">{r.pct}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PROCESO DE COMPRA */}
      <section id="proceso" className="py-24 bg-background">
        <div className="max-w-5xl mx-auto px-5">
          <p className="text-xs uppercase tracking-[0.2em] text-foreground-muted mb-3">El proceso</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">De la búsqueda a las llaves. Paso a paso.</h2>
          <p className="text-foreground-muted mb-12 max-w-2xl">
            Te acompaño en cada fase. Sin sorpresas, sin letra pequeña. Cada paso tiene un timing claro y una gestión profesional detrás.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: "01", title: "NIE + Cuenta bancaria", time: "2–4 semanas", desc: "Gestión completa del NIE y apertura de cuenta bancaria española. Sin desplazamientos innecesarios." },
              { step: "02", title: "Búsqueda personalizada", time: "1–4 semanas", desc: "Selección de propiedades según tu perfil exacto. Incluyendo las que no están publicadas en portales." },
              { step: "03", title: "Visitas guiadas", time: "2–3 días", desc: "Visitas organizadas y acompañadas. Te cuento lo que no se ve en las fotos: vecinos, humedades, orientación real." },
              { step: "04", title: "Contrato de arras", time: "1 semana", desc: "Negociación del precio y redacción del contrato de arras. Revisión legal incluida." },
              { step: "05", title: "Due diligence", time: "3–6 semanas", desc: "Verificación registral, cargas, deudas de comunidad, licencias urbanísticas. Todo antes de firmar." },
              { step: "06", title: "Escritura y llaves", time: "1 día", desc: "Firma ante notario y entrega de llaves. Alta de suministros y gestión post-venta si la necesitas." },
            ].map((s, i) => (
              <div key={i} className="bg-card border border-border rounded-[14px] p-7">
                <div className="text-xs font-mono text-foreground-muted mb-2">{s.step}</div>
                <h3 className="font-bold text-foreground text-lg mb-1">{s.title}</h3>
                <span className="inline-block text-[10px] font-semibold px-2.5 py-1 rounded-full bg-background text-foreground-muted border border-border mb-3">{s.time}</span>
                <p className="text-foreground-muted text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. COSTES DE COMPRA */}
      <section className="py-24 bg-card">
        <div className="max-w-3xl mx-auto px-5">
          <p className="text-xs uppercase tracking-[0.2em] text-foreground-muted mb-3">Transparencia total</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Los costes reales de comprar en Andalucía</h2>
          <p className="text-foreground-muted mb-10 max-w-2xl">
            Además del precio de la propiedad, hay costes obligatorios. Aquí los tienes, sin letra pequeña.
          </p>
          <div className="bg-background border border-border rounded-[14px] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left px-6 py-4 text-xs uppercase tracking-wider text-foreground-muted">Concepto</th>
                    <th className="text-right px-6 py-4 text-xs uppercase tracking-wider text-foreground-muted">%</th>
                    <th className="text-right px-6 py-4 text-xs uppercase tracking-wider text-foreground-muted">En 300.000€</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { concept: "ITP (Impuesto Transmisiones)", pct: "7%", amount: "21.000€" },
                    { concept: "Notaría", pct: "~0,8%", amount: "2.400€" },
                    { concept: "Registro de la Propiedad", pct: "~0,4%", amount: "1.200€" },
                    { concept: "Gestoría", pct: "~0,3%", amount: "900€" },
                    { concept: "Total costes adicionales", pct: "~8,5%", amount: "25.500€" },
                  ].map((r, i) => (
                    <tr key={i} className={`border-b border-border last:border-0 ${i === 4 ? 'font-bold bg-card' : ''}`}>
                      <td className="px-6 py-3 text-foreground">{r.concept}</td>
                      <td className="px-6 py-3 text-right text-foreground">{r.pct}</td>
                      <td className="px-6 py-3 text-right text-foreground">{r.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="px-6 py-4 text-xs text-foreground-muted border-t border-border">
              * Para vivienda nueva el IVA es 10% en lugar de ITP 7%. Importes orientativos. Siempre solicitamos presupuesto notarial exacto antes de la firma.
            </p>
          </div>
        </div>
      </section>


      <section id="contacto" className="py-24 bg-card">
        <div className="max-w-5xl mx-auto px-5 grid md:grid-cols-[5fr_4fr] gap-12">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-foreground-muted mb-3">Empezar la búsqueda</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Cuéntame qué buscas. Yo me encargo del resto.</h2>
            <p className="text-foreground-muted mb-8 leading-relaxed">
              Completa el formulario. En 24 horas laborables te envío una selección de propiedades que encajan, incluyendo las que no están publicadas.
            </p>
            <ul className="space-y-3 mb-10">
              {[
                "Acceso a propiedades fuera del mercado público",
                "Análisis de precio: ¿está bien valorada?",
                "Gestión NIE, gestoría, notaría desde el inicio",
                "Acompañamiento total hasta escritura y llaves",
                "Sin coste para el comprador — honorarios al vendedor",
              ].map((item, i) => (
                <li key={i} className="flex gap-2 text-sm text-foreground-muted">
                  <span style={{ color: "hsl(160, 84%, 39%)" }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="space-y-2 text-sm text-foreground-muted">
              <p>📱 <strong className="text-foreground">WhatsApp: +34 662 317 561</strong> (ES / EN)</p>
              <p>✉️ <strong className="text-foreground">Email: info@propaxar.es</strong></p>
              <p>📅 <strong className="text-foreground">Videollamada disponible:</strong> Lunes a Viernes</p>
            </div>
          </div>

          <div className="bg-background border border-border rounded-[14px] p-7 shadow-sm">
            {!sent ? (
              <>
                <h3 className="font-bold text-foreground text-lg mb-1">Iniciar búsqueda de propiedad</h3>
                <p className="text-foreground-muted text-xs font-mono mb-6">Sin compromiso · Respuesta en &lt;24h · EN / ES</p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-foreground-muted mb-1">Nombre *</label>
                    <input className="w-full border border-border rounded-lg px-4 py-3 text-sm bg-card text-foreground" placeholder="Tu nombre completo" value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-foreground-muted mb-1">País de origen</label>
                    <select className="w-full border border-border rounded-lg px-4 py-3 text-sm bg-card text-foreground" value={form.pais} onChange={e => setForm({ ...form, pais: e.target.value })}>
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
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-foreground-muted mb-1">Email *</label>
                    <input className="w-full border border-border rounded-lg px-4 py-3 text-sm bg-card text-foreground" type="email" placeholder="tu@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-foreground-muted mb-1">Tipo de propiedad</label>
                    <select className="w-full border border-border rounded-lg px-4 py-3 text-sm bg-card text-foreground" value={form.tipo} onChange={e => setForm({ ...form, tipo: e.target.value })}>
                      <option value="">Seleccionar</option>
                      <option>Apartamento</option>
                      <option>Casa</option>
                      <option>Villa</option>
                      <option>Casa rural</option>
                      <option>Terreno</option>
                      <option>Indiferente</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-foreground-muted mb-1">Presupuesto</label>
                    <select className="w-full border border-border rounded-lg px-4 py-3 text-sm bg-card text-foreground" value={form.presupuesto} onChange={e => setForm({ ...form, presupuesto: e.target.value })}>
                      <option value="">Seleccionar</option>
                      <option>Hasta 150.000€</option>
                      <option>150–250k€</option>
                      <option>250–400k€</option>
                      <option>400–600k€</option>
                      <option>Más de 600k€</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-foreground-muted mb-1">¿Cuándo piensas comprar?</label>
                    <select className="w-full border border-border rounded-lg px-4 py-3 text-sm bg-card text-foreground" value={form.cuando} onChange={e => setForm({ ...form, cuando: e.target.value })}>
                      <option value="">Seleccionar</option>
                      <option>Ahora mismo</option>
                      <option>En los próximos 3 meses</option>
                      <option>En 3–12 meses</option>
                      <option>Más de un año</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-foreground-muted mb-1">¿Qué más debo saber?</label>
                    <textarea className="w-full border border-border rounded-lg px-4 py-3 text-sm bg-card text-foreground" rows={3} placeholder="Dormitorios, uso previsto, zonas preferidas, requisitos especiales..." value={form.nota} onChange={e => setForm({ ...form, nota: e.target.value })} />
                  </div>
                  <button
                    className="w-full py-3 rounded-[7px] text-white font-semibold text-sm"
                    style={{ background: "hsl(222, 28%, 16%)" }}
                    onClick={() => { if (form.nombre && form.email) setSent(true); }}
                  >
                    Enviar — empezar mi búsqueda →
                  </button>
                  <p className="text-[10px] text-foreground-muted text-center">
                    Sin coste para compradores. Honorarios exclusivamente al vendedor. RGPD — datos no compartidos con terceros.
                  </p>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-5">🏡</div>
                <h3 className="font-bold text-foreground text-xl mb-3">¡Búsqueda iniciada!</h3>
                <p className="text-foreground-muted text-sm leading-relaxed">
                  Hola {form.nombre}. He recibido tu solicitud.
                  Mañana por la mañana te escribo con propiedades
                  seleccionadas — incluyendo las fuera del mercado público.
                  <br /><br />
                  <strong className="text-foreground">Manuel · Propaxar Frigiliana</strong>
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
