import { useState, useEffect } from "react";

const benefits = [
  {
    icon: "🔍",
    title: "Búsqueda Exhaustiva del Mercado",
    description: "Rastreamos TODO: Idealista, Fotocasa, agencias locales, y propiedades off-market que nadie más conoce.",
  },
  {
    icon: "⭐",
    title: "Solo las 10 MEJORES Propiedades",
    description: "No pierdes tiempo viendo 30 casas incorrectas. Te muestro solo las 10 mejores que cumplen 100% tus criterios.",
  },
  {
    icon: "🗓️",
    title: "Coordinación Completa de Visitas",
    description: "Yo organizo todo con propietarios y agentes. Tú solo vienes y ves las mejores opciones.",
  },
  {
    icon: "🏆",
    title: "40+ Años de Experiencia Local",
    description: "Conozco cada rincón, cada calle, cada oportunidad. Te evito errores costosos que un extranjero no ve.",
  },
  {
    icon: "⚡",
    title: "Resultados en 48-72 Horas",
    description: "Recibes tu selección de propiedades en 2-3 días. Nada de esperar semanas para ver opciones.",
  },
];

const PropertyFinder = () => {
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Load Stripe Buy Button script
  useEffect(() => {
    if (document.querySelector('script[src="https://js.stripe.com/v3/buy-button.js"]')) return;
    const script = document.createElement("script");
    script.src = "https://js.stripe.com/v3/buy-button.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
      {/* Header */}
      <header className="bg-white border-b border-[#e5e7eb] py-6">
        <div className="max-w-[800px] mx-auto px-5 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-[#2c5282] tracking-tight">PROPAXAR</h1>
          <p className="text-[#666] mt-1 text-base">Your Personal Housing Consultant in La Axarquía</p>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-[#f5f5f5] py-12 md:py-16">
        <div className="max-w-[800px] mx-auto px-5 text-center">
          <span className="text-5xl md:text-6xl block mb-4" role="img" aria-label="house">🏠</span>
          <h2 className="text-2xl md:text-3xl font-bold text-[#333] mb-3">Property Finder Service</h2>
          <p className="text-[#666] text-lg max-w-[600px] mx-auto mb-8">
            Encuentra tu casa perfecta en La Axarquía. Sin perder tiempo. Sin visitar propiedades incorrectas.
          </p>
          <div className="inline-block bg-white rounded-xl shadow-lg px-8 py-6">
            <p className="text-[36px] md:text-[48px] font-extrabold text-[#48bb78] leading-none">€180</p>
            <p className="text-[#666] text-sm mt-2 font-medium">Pago inicial · No reembolsable</p>
            <p className="text-[#999] text-xs mt-1">+ €220 cuando alquiles una de nuestras propiedades</p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12 md:py-16">
        <div className="max-w-[800px] mx-auto px-5">
          <div className="space-y-8">
            {benefits.map((b, i) => (
              <div key={i} className="flex gap-5 items-start">
                <span className="text-3xl md:text-4xl shrink-0 mt-0.5">{b.icon}</span>
                <div>
                  <h3 className="text-lg font-bold text-[#333] mb-1">{b.title}</h3>
                  <p className="text-[#666] leading-relaxed">{b.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Model */}
      <section className="py-12 md:py-16 bg-[#f5f5f5]">
        <div className="max-w-[800px] mx-auto px-5">
          <div className="bg-[#fffbeb] border-2 border-[#ffd700] rounded-xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-3xl">💰</span>
              <h3 className="text-xl md:text-2xl font-bold text-[#333]">Cómo Funciona el Pago</h3>
            </div>
            <div className="space-y-4 text-[#333]">
              <div>
                <p className="font-bold">PAGO 1: €180 al contratar <span className="font-normal text-[#666]">(no reembolsable)</span></p>
                <p className="text-[#666] mt-1">Este pago cubre la búsqueda exhaustiva del mercado y coordinación de visitas.</p>
              </div>
              <div>
                <p className="font-bold">PAGO 2: €220 cuando alquiles</p>
                <p className="text-[#666] mt-1">Si decides alquilar una de las propiedades que te presentamos, pagas €220 adicionales.</p>
              </div>
              <hr className="border-[#ffd700]/50" />
              <div className="text-center">
                <p className="text-xl font-bold text-[#2c5282]">TOTAL SERVICIO COMPLETO: €400</p>
                <p className="text-[#666] text-sm mt-1">(Solo si alquilas una de nuestras propiedades)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16" style={{ background: "linear-gradient(135deg, #667eea, #764ba2)" }}>
        <div className="max-w-[800px] mx-auto px-5 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">Reserva Tu Servicio Ahora</h3>

          <div className="bg-white/15 backdrop-blur-sm rounded-lg p-5 inline-block mb-6">
            <label className="flex items-center gap-3 cursor-pointer text-white select-none">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="w-5 h-5 rounded accent-[#48bb78] cursor-pointer"
              />
              <span className="text-sm md:text-base">
                He leído y acepto los{" "}
                <a
                  href="https://propaxar.es/terminos-property-finder"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline font-medium hover:text-[#ffd700] transition-colors"
                >
                  Términos del Servicio
                </a>
              </span>
            </label>
          </div>

          <div className={`transition-opacity duration-200 ${!termsAccepted ? "opacity-50 pointer-events-none" : ""}`}>
            {/* @ts-ignore */}
            <stripe-buy-button
              buy-button-id="buy_btn_1SyAqmRr8mv99h3kKtozGHTl"
              publishable-key="pk_live_51QhILbRr8mv99h3kmartLlSlZMtvYX3bXDFHLVfNmn34jh6aWDoUQt2H7qxzKOlHRqVYAUj3CVCznUiNepY6oXqR00iDrVqBTK"
            />
          </div>

          <p className="text-white/80 text-sm mt-5">
            🔒 Pago 100% seguro con Stripe · Procesamiento instantáneo
          </p>
        </div>
      </section>

      {/* Contact */}
      <section className="py-12 md:py-16 bg-[#f7fafc]">
        <div className="max-w-[800px] mx-auto px-5 text-center">
          <h3 className="text-2xl font-bold text-[#333] mb-2">¿Dudas Antes de Contratar?</h3>
          <p className="text-[#666] mb-6">Habla conmigo directamente</p>
          <a
            href="https://wa.me/34662317561?text=Hola%20Manuel,%20tengo%20preguntas%20sobre%20el%20Property%20Finder"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25d366] hover:bg-[#1da851] text-white text-lg font-bold px-8 py-4 rounded-full shadow-lg transition-all duration-200 hover:-translate-y-0.5"
          >
            📱 WhatsApp Directo
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-[#999] text-sm border-t border-[#e5e7eb]">
        © {new Date().getFullYear()} Propaxar. Todos los derechos reservados.
      </footer>
    </div>
  );
};

export default PropertyFinder;
