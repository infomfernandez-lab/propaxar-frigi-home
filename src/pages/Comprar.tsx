import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function ComprarPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ nombre: "", email: "", perfil: "", presupuesto: "", cuando: "", nota: "" });

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
              { icon: "📈", val: "+6,4% anual", label: "Revalorización 2025" },
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

      {/* 3. PERFILES DE COMPRADOR */}
      <section id="perfiles" className="py-24 bg-background">
        <div className="max-w-5xl mx-auto px-5">
          <p className="text-xs uppercase tracking-[0.2em] text-foreground-muted mb-3">¿Cuál eres tú?</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Tres compradores. Una misma pasión.</h2>
          <p className="text-foreground-muted mb-12 max-w-2xl">
            No todos buscan lo mismo. Cuéntame qué te trae a Frigiliana y en 24 horas te envío propiedades que encajan exactamente con lo que buscas.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                color: "#2563EB",
                bgBadge: "bg-blue-50 text-blue-700",
                icon: "👨‍👩‍👧",
                label: "Perfil A",
                title: "La familia que busca raíces",
                origin: "🇬🇧 Reino Unido / Irlanda",
                budget: "250–450k€",
                items: [
                  "Casa con terraza o jardín, 2–3 dormitorios",
                  "Casco histórico o vistas al mar",
                  "Reforma aceptable si el precio es justo",
                  "Colegios internacionales Nerja/Vélez",
                  "Plan: residencia permanente en 3–5 años",
                ],
              },
              {
                color: "#059669",
                bgBadge: "bg-emerald-50 text-emerald-700",
                icon: "💼",
                label: "Perfil B",
                title: "El nómada digital",
                origin: "🇳🇱 Países Bajos / 🇩🇰 Dinamarca",
                budget: "150–280k€",
                items: [
                  "Apartamento o estudio bien acondicionado",
                  "Fibra óptica, espacio de trabajo",
                  "Cerca del centro, sin coche obligatorio",
                  "Alquiler largo plazo o compra para base",
                  "Presupuesto ajustado, alta exigencia en calidad",
                ],
              },
              {
                color: "#C9A84C",
                bgBadge: "bg-amber-50 text-amber-700",
                icon: "🌿",
                label: "Perfil C",
                title: "El inversor con estilo",
                origin: "🇧🇪 Bélgica / 🇸🇪 Suecia",
                budget: "300–600k€",
                items: [
                  "Casa tradicional andaluza auténtica",
                  "Potencial VUT + uso propio en verano",
                  "Terraza con vistas, patio interior",
                  "Reforma llave en mano si es necesario",
                  "Rentabilidad secundaria al disfrute personal",
                ],
              },
            ].map((card, i) => (
              <div
                key={i}
                className="bg-card border border-border rounded-[14px] p-7 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                style={{ borderTop: `3px solid ${card.color}` }}
              >
                <div className="text-3xl mb-3">{card.icon}</div>
                <p className="text-[10px] uppercase tracking-[0.15em] text-foreground-muted mb-1">{card.label}</p>
                <h3 className="font-bold text-foreground text-lg mb-2">{card.title}</h3>
                <p className="text-foreground-muted text-sm mb-1">{card.origin}</p>
                <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-5 ${card.bgBadge}`}>
                  {card.budget}
                </span>
                <ul className="space-y-2">
                  {card.items.map((item, j) => (
                    <li key={j} className="text-foreground-muted text-sm flex gap-2">
                      <span className="text-foreground-muted/50">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. DATOS DE MERCADO */}
      <section className="py-24 bg-card">
        <div className="max-w-5xl mx-auto px-5">
          <p className="text-xs uppercase tracking-[0.2em] text-foreground-muted mb-3">El mercado en datos</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Por qué 2025 es el momento de comprar en Frigiliana</h2>
          <p className="text-foreground-muted mb-12 max-w-2xl">
            Datos verificados de fuentes oficiales. Actualizados mensualmente en el Market Report.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Panel precios */}
            <div className="border border-border rounded-xl p-7 bg-background">
              <h3 className="font-bold text-foreground text-lg mb-1">Precios Frigiliana 2025</h3>
              <p className="text-foreground-muted text-xs mb-6">Fuentes verificadas · Dic. 2025</p>
              <div className="space-y-4">
                {[
                  { label: "€/m² medio", val: "3.295€", delta: "▲ +6,4%" },
                  { label: "1 dormitorio", val: "~239.000€", delta: "Desde 130k" },
                  { label: "2 dormitorios", val: "~365.000€", delta: "El más demandado" },
                  { label: "3 dormitorios", val: "~480.000€", delta: "Casa típica" },
                  { label: "4+ dormitorios", val: "~790.000€", delta: "Premium con vistas" },
                  { label: "Precio máximo", val: "3.899€/m²", delta: "Nov. 2025" },
                ].map((r, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-foreground-muted text-sm">{r.label}</span>
                    <div className="text-right">
                      <span className="font-bold text-foreground mr-3">{r.val}</span>
                      <span className="text-xs" style={{ color: "hsl(160, 84%, 39%)" }}>{r.delta}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Panel compradores */}
            <div className="border border-border rounded-xl p-7 bg-background">
              <h3 className="font-bold text-foreground text-lg mb-1">Compradores extranjeros Málaga</h3>
              <p className="text-foreground-muted text-xs mb-6">32,3% del total · Registradores 2025</p>
              <div className="space-y-3">
                {[
                  { flag: "🇬🇧", country: "Reino Unido", pct: 15, badge: null },
                  { flag: "🇳🇱", country: "Países Bajos", pct: 8, badge: null },
                  { flag: "🇸🇪", country: "Suecia", pct: 8, badge: null },
                  { flag: "🇩🇪", country: "Alemania", pct: 7.5, badge: null },
                  { flag: "🇧🇪", country: "Bélgica", pct: 6.5, badge: null },
                  { flag: "🇩🇰", country: "Dinamarca", pct: 5.5, badge: null },
                  { flag: "🇮🇪", country: "Irlanda", pct: 4, badge: null },
                  { flag: "🇺🇸", country: "Estados Unidos", pct: 3.5, badge: "🔥 +26%" },
                ].map((r, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-foreground-muted">{r.flag} {r.country}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-foreground text-sm">{r.pct}%</span>
                        {r.badge && (
                          <span className="text-[10px] bg-red-50 text-red-600 font-semibold px-2 py-0.5 rounded-full">{r.badge}</span>
                        )}
                      </div>
                    </div>
                    <div className="w-full h-2 bg-border rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${(r.pct / 15) * 100}%`, background: "hsl(222, 28%, 16%)" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. EL PROCESO */}
      <section id="proceso" className="py-24 bg-background">
        <div className="max-w-5xl mx-auto px-5">
          <p className="text-xs uppercase tracking-[0.2em] text-foreground-muted mb-3">El proceso</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Paso a paso. Sin sorpresas.</h2>
          <p className="text-foreground-muted mb-12 max-w-2xl">
            Comprar en España siendo extranjero tiene pasos específicos. Los gestionamos todos. Tú solo decides qué propiedad te gusta.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { n: "01", title: "NIE + Cuenta bancaria", text: "El primer trámite obligatorio antes de cualquier operación. Gestionamos la cita y te acompañamos si estás en España.", time: "1–2 semanas (previo)" },
              { n: "02", title: "Búsqueda y propuestas", text: "Te enviamos propiedades que encajan con tu perfil, incluyendo las que no están publicadas.", time: "Desde día 1" },
              { n: "03", title: "Visitas y negociación", text: "Organizamos visitas presenciales o videollamada 360°. Negociamos el precio y condiciones. Redactamos la oferta.", time: "1–3 semanas" },
              { n: "04", title: "Contrato de arras", text: "Reserva del 10% del precio. Contrato privado que protege a ambas partes. Revisión legal incluida.", time: "Semana 3–4" },
              { n: "05", title: "Due diligence", text: "Verificamos cargas, deudas, cédula de habitabilidad. Todo antes de firmar ante notario.", time: "2–4 semanas" },
              { n: "06", title: "Escritura y llaves", text: "Firma ante notario en Nerja o Málaga. Registro de la propiedad. Cambio de suministros. Las llaves son tuyas.", time: "Mes 2–3 desde inicio" },
            ].map((step, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-7 relative">
                <div className="text-5xl font-black text-border/60 absolute top-4 right-5 leading-none">{step.n}</div>
                <h3 className="font-bold text-foreground text-lg mb-2 mt-1">{step.title}</h3>
                <p className="text-foreground-muted text-sm leading-relaxed mb-4">{step.text}</p>
                <span className="inline-block text-[11px] font-semibold px-3 py-1 rounded-full text-white" style={{ background: "hsl(222, 28%, 16%)" }}>
                  ⏱ {step.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. COSTES DE COMPRA */}
      <section className="py-20 bg-card">
        <div className="max-w-5xl mx-auto px-5">
          <p className="text-xs uppercase tracking-[0.2em] text-foreground-muted mb-3">Costes de compra</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Lo que cuesta comprar aquí — de verdad.</h2>
          <p className="text-foreground-muted mb-12 max-w-2xl">Contenido próximamente.</p>
          <div className="border border-border rounded-xl p-8 bg-background">
            <p className="text-foreground-muted text-sm">Tabla de costes placeholder.</p>
          </div>
        </div>
      </section>

      {/* 7. BIO MANUEL */}
      <section className="py-20" style={{ background: "hsl(222, 28%, 16%)" }}>
        <div className="max-w-4xl mx-auto px-5 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Manuel Fernández</h2>
          <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">Contenido próximamente.</p>
          <div className="grid grid-cols-3 gap-8">
            {[
              { val: "40 años", label: "En Frigiliana" },
              { val: "100+", label: "Propiedades gestionadas" },
              { val: "70%+", label: "Clientes internacionales" },
            ].map((s, i) => (
              <div key={i}>
                <div className="text-2xl font-bold text-white">{s.val}</div>
                <div className="text-white/50 text-xs mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FORMULARIO DE CONTACTO */}
      <section id="contacto" className="py-20 bg-background">
        <div className="max-w-5xl mx-auto px-5 grid md:grid-cols-2 gap-12">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-foreground-muted mb-3">Contacto</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Cuéntame qué buscas.</h2>
            <p className="text-foreground-muted mb-6">Contenido próximamente.</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-8">
            {!sent ? (
              <>
                <h3 className="font-bold text-foreground text-lg mb-1">Buscar mi propiedad</h3>
                <p className="text-foreground-muted text-xs mb-6">Gratis · Sin compromiso · Bilingüe EN / ES</p>
                <div className="space-y-4">
                  <input className="w-full border border-border rounded-lg px-4 py-3 text-sm bg-background text-foreground" placeholder="Tu nombre *" value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} />
                  <input className="w-full border border-border rounded-lg px-4 py-3 text-sm bg-background text-foreground" type="email" placeholder="Email *" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                  <select className="w-full border border-border rounded-lg px-4 py-3 text-sm bg-background text-foreground" value={form.perfil} onChange={e => setForm({ ...form, perfil: e.target.value })}>
                    <option value="">¿Qué tipo de comprador eres?</option>
                    <option>Residencia permanente</option>
                    <option>Segunda residencia</option>
                    <option>Inversión</option>
                  </select>
                  <select className="w-full border border-border rounded-lg px-4 py-3 text-sm bg-background text-foreground" value={form.presupuesto} onChange={e => setForm({ ...form, presupuesto: e.target.value })}>
                    <option value="">Presupuesto</option>
                    <option>Hasta 200.000€</option>
                    <option>200.000 – 350.000€</option>
                    <option>350.000 – 500.000€</option>
                    <option>Más de 500.000€</option>
                  </select>
                  <textarea className="w-full border border-border rounded-lg px-4 py-3 text-sm bg-background text-foreground" rows={3} placeholder="¿Algo más que deba saber?" value={form.nota} onChange={e => setForm({ ...form, nota: e.target.value })} />
                  <button
                    className="w-full py-3 rounded-[7px] text-white font-semibold text-sm"
                    style={{ background: "hsl(222, 28%, 16%)" }}
                    onClick={() => { if (form.nombre && form.email) setSent(true); }}
                  >
                    Enviar consulta →
                  </button>
                  <p className="text-[11px] text-foreground-muted text-center">Datos tratados conforme al RGPD. Respuesta en 24h.</p>
                </div>
              </>
            ) : (
              <div className="text-center py-10">
                <div className="text-5xl mb-4" style={{ color: "hsl(160, 84%, 39%)" }}>✓</div>
                <h3 className="font-bold text-foreground text-lg mb-2">Consulta recibida</h3>
                <p className="text-foreground-muted text-sm">
                  Hola {form.nombre}. Revisaré tu perfil y te contacto en menos de 24h.
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
