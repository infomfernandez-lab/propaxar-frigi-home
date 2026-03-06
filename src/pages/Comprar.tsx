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
      <section className="relative min-h-[90vh] flex items-center justify-center pt-[60px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/comprar-hero.png')" }}
        />
        <div className="absolute inset-0" style={{ background: "rgba(17,24,39,0.65)" }} />
        <div className="relative z-10 max-w-4xl mx-auto px-5 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-white/60 mb-6">
            Comprar en Frigiliana · La Axarquía · Málaga
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Tu casa en el pueblo más bonito de España.
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            Frigiliana. Calles blancas, vistas al Mediterráneo, comunidad de expats consolidada.
            El pueblo que buscas — con alguien que lo conoce de verdad.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
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
        </div>
        {/* Hero stats strip */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-sm">
          <div className="max-w-5xl mx-auto px-5 py-5 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: "🏡", val: "374.000€", label: "Precio medio listado Frigiliana" },
              { icon: "📈", val: "+6,4% anual", label: "Revalorización 2025" },
              { icon: "🌍", val: "32,3% extranjeros", label: "Compradores Málaga provincia" },
              { icon: "✈️", val: "26,7M pasajeros", label: "Aeropuerto Málaga 2025" },
            ].map((s, i) => (
              <div key={i}>
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
      <section id="perfiles" className="py-20 bg-background">
        <div className="max-w-5xl mx-auto px-5">
          <p className="text-xs uppercase tracking-[0.2em] text-foreground-muted mb-3">¿Cuál eres tú?</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Tres compradores. Una misma pasión.</h2>
          <p className="text-foreground-muted mb-12 max-w-2xl">
            No todos buscan lo mismo. Cuéntame qué te trae a Frigiliana y en 24 horas te envío propiedades que encajan exactamente.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {["Residencia permanente", "Segunda residencia / vacaciones", "Inversión rentable"].map((title, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-8">
                <h3 className="font-bold text-foreground text-lg mb-2">{title}</h3>
                <p className="text-foreground-muted text-sm">Contenido próximamente.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. DATOS DE MERCADO */}
      <section className="py-20 bg-card">
        <div className="max-w-5xl mx-auto px-5">
          <p className="text-xs uppercase tracking-[0.2em] text-foreground-muted mb-3">Datos de mercado</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Los números que importan.</h2>
          <p className="text-foreground-muted mb-12 max-w-2xl">Contenido próximamente.</p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-border rounded-xl p-8 bg-background">
              <h3 className="font-bold text-foreground mb-2">Panel 1</h3>
              <p className="text-foreground-muted text-sm">Placeholder.</p>
            </div>
            <div className="border border-border rounded-xl p-8 bg-background">
              <h3 className="font-bold text-foreground mb-2">Panel 2</h3>
              <p className="text-foreground-muted text-sm">Placeholder.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. EL PROCESO */}
      <section id="proceso" className="py-20 bg-background">
        <div className="max-w-5xl mx-auto px-5">
          <p className="text-xs uppercase tracking-[0.2em] text-foreground-muted mb-3">El proceso</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">De la idea a las llaves.</h2>
          <p className="text-foreground-muted mb-12 max-w-2xl">Contenido próximamente.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(n => (
              <div key={n} className="bg-card border border-border rounded-xl p-8">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm mb-4" style={{ background: "hsl(222, 28%, 16%)" }}>
                  {n}
                </div>
                <h3 className="font-bold text-foreground mb-2">Paso {n}</h3>
                <p className="text-foreground-muted text-sm">Placeholder.</p>
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
