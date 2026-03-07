import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ArrowRight, Check } from "lucide-react";

const EncuentraTuAlquiler = () => {
  // Qualification form state
  const [formData, setFormData] = useState({
    habitaciones: "",
    presupuesto: "",
    entrada: "",
    mascotas: "",
    nombre: "",
    email: "",
    notas: "",
  });
  const [formSent, setFormSent] = useState(false);

  // Email capture state
  const [alertEmail, setAlertEmail] = useState("");
  const [alertSent, setAlertSent] = useState(false);

  const handleFormSubmit = () => {
    if (!formData.nombre.trim() || !formData.email.trim()) return;
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "Lead");
    }
    setFormSent(true);
  };

  const handleAlertSubmit = () => {
    if (!alertEmail.trim()) return;
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "Lead");
    }
    setAlertSent(true);
  };

  const handleReporteClick = () => {
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "InitiateCheckout");
    }
    window.location.href = "https://propaxar.es/comprar-reporte";
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const selectClass =
    "w-full border border-gray-200 bg-white px-4 py-3 text-[13px] rounded-lg outline-none focus:border-[hsl(222,28%,16%)] transition-colors appearance-none";
  const inputClass =
    "w-full border border-gray-200 bg-white px-4 py-3 text-[13px] rounded-lg outline-none focus:border-[hsl(222,28%,16%)] transition-colors";

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Navigation />

      {/* ═══ 1. HERO ═══ */}
      <section
        className="relative flex items-center justify-center"
        style={{ minHeight: "85vh", paddingTop: 64 }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://propaxar.com/wp-content/uploads/2026/01/Gemini_Generated_Image_wyt8u3wyt8u3wyt8.png')",
          }}
        />
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(17,24,39,0.65)" }}
        />

        <div className="relative z-10 text-center px-5 max-w-[800px] mx-auto">
          {/* Eyebrow */}
          <span
            className="inline-block text-[10px] font-mono font-semibold uppercase tracking-[0.14em] px-4 py-1.5 rounded-full mb-6"
            style={{
              color: "rgba(255,255,255,0.7)",
              border: "1px solid rgba(255,255,255,0.3)",
            }}
          >
            Alquiler residencial · Frigiliana · La Axarquía
          </span>

          <h1
            className="font-bold text-white leading-[1.1] mb-5"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(36px, 5.5vw, 64px)",
            }}
          >
            Encuentra tu alquiler en Frigiliana. Sin buscar.
          </h1>

          <p
            className="text-[17px] md:text-[19px] leading-[1.6] mx-auto mb-8"
            style={{ color: "rgba(255,255,255,0.8)", maxWidth: 520 }}
          >
            Cuéntame qué buscas. Reviso mi portfolio actual y te envío opciones
            en menos de 24 horas — incluyendo propiedades que no están
            publicadas.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
            <button
              onClick={() => scrollTo("cualificar")}
              className="flex items-center gap-2 text-[14px] font-semibold px-8 py-3.5 rounded-lg transition-all"
              style={{
                backgroundColor: "#fff",
                color: "hsl(222, 28%, 16%)",
              }}
            >
              Ver qué tengo disponible
            </button>
            <button
              onClick={() => scrollTo("reporte")}
              className="flex items-center gap-1.5 text-[14px] font-medium px-8 py-3.5 rounded-lg transition-all text-white"
              style={{ border: "1px solid rgba(255,255,255,0.4)" }}
            >
              ¿Cómo funciona el Reporte? →
            </button>
          </div>

          {/* Trust pills */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-[13px]"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            <span>✓ Sin coste para el inquilino</span>
            <span>✓ Respuesta en 24h</span>
            <span>✓ EN · ES</span>
          </div>
        </div>
      </section>

      {/* ═══ 2. CUALIFICACIÓN ═══ */}
      <section id="cualificar" className="bg-white" style={{ padding: "96px 0" }}>
        <div className="max-w-[720px] mx-auto px-5 md:px-8">
          <span
            className="block text-[10px] font-mono font-bold uppercase tracking-[0.14em] mb-3"
            style={{ color: "hsl(222, 28%, 16%)" }}
          >
            Paso 1
          </span>
          <h2
            className="text-[28px] md:text-[38px] font-extrabold leading-[1.15] mb-3"
            style={{ color: "hsl(222, 28%, 16%)" }}
          >
            ¿Tienes algo para mí?
          </h2>
          <p
            className="text-[15px] leading-[1.7] mb-10"
            style={{ color: "#6B7280", maxWidth: 520 }}
          >
            Comparte lo que buscas. Reviso mi portfolio y te digo honestamente
            en 24h si tengo algo que encaje — o no.
          </p>

          {/* Form Card */}
          <div
            className="rounded-[14px] p-8 md:p-10"
            style={{
              backgroundColor: "#fff",
              border: "1px solid #E5E7EB",
              boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
            }}
          >
            {formSent ? (
              /* ── Sent state ── */
              <div className="text-center py-8">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: "hsl(160, 84%, 39%)" }}
                >
                  <Check className="w-6 h-6 text-white" />
                </div>
                <h3
                  className="text-[22px] font-bold mb-2"
                  style={{ color: "hsl(222, 28%, 16%)" }}
                >
                  Recibido, {formData.nombre}.
                </h3>
                <p className="text-[14px] leading-[1.7] mb-4" style={{ color: "#6B7280" }}>
                  Reviso mi portfolio hoy y te escribo antes de 24h con lo que
                  tengo disponible.
                </p>
                <p
                  className="text-[13px] font-medium mb-2"
                  style={{ color: "hsl(222, 28%, 16%)" }}
                >
                  Manuel · Propaxar Frigiliana
                </p>
                <p className="text-[13px]" style={{ color: "#9CA3AF" }}>
                  📱 +34 662 317 561 · ✉️ info@propaxar.es
                </p>
              </div>
            ) : (
              /* ── Form ── */
              <>
                {/* Row 1 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-[9px] font-semibold uppercase tracking-[0.1em] text-gray-400 mb-1.5">
                      Mínimo de habitaciones
                    </label>
                    <select
                      className={selectClass}
                      value={formData.habitaciones}
                      onChange={(e) =>
                        setFormData({ ...formData, habitaciones: e.target.value })
                      }
                    >
                      <option value="">Seleccionar</option>
                      <option>Estudio o 1 hab</option>
                      <option>2 hab</option>
                      <option>3 hab</option>
                      <option>4+ hab</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] font-semibold uppercase tracking-[0.1em] text-gray-400 mb-1.5">
                      Presupuesto máximo/mes
                    </label>
                    <select
                      className={selectClass}
                      value={formData.presupuesto}
                      onChange={(e) =>
                        setFormData({ ...formData, presupuesto: e.target.value })
                      }
                    >
                      <option value="">Seleccionar</option>
                      <option>Hasta 800€</option>
                      <option>800–1.200€</option>
                      <option>1.200–1.600€</option>
                      <option>1.600–2.000€</option>
                      <option>Más de 2.000€</option>
                    </select>
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-[9px] font-semibold uppercase tracking-[0.1em] text-gray-400 mb-1.5">
                      ¿Cuándo quieres entrar?
                    </label>
                    <select
                      className={selectClass}
                      value={formData.entrada}
                      onChange={(e) =>
                        setFormData({ ...formData, entrada: e.target.value })
                      }
                    >
                      <option value="">Seleccionar</option>
                      <option>Lo antes posible</option>
                      <option>En 1–2 meses</option>
                      <option>En 3–6 meses</option>
                      <option>Explorando opciones</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] font-semibold uppercase tracking-[0.1em] text-gray-400 mb-1.5">
                      ¿Tienes mascotas?
                    </label>
                    <select
                      className={selectClass}
                      value={formData.mascotas}
                      onChange={(e) =>
                        setFormData({ ...formData, mascotas: e.target.value })
                      }
                    >
                      <option value="">Seleccionar</option>
                      <option>No</option>
                      <option>Sí — perro pequeño</option>
                      <option>Sí — perro grande</option>
                      <option>Sí — gato</option>
                    </select>
                  </div>
                </div>

                {/* Row 3 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-[9px] font-semibold uppercase tracking-[0.1em] text-gray-400 mb-1.5">
                      Nombre *
                    </label>
                    <input
                      type="text"
                      className={inputClass}
                      placeholder="Tu nombre"
                      value={formData.nombre}
                      onChange={(e) =>
                        setFormData({ ...formData, nombre: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-semibold uppercase tracking-[0.1em] text-gray-400 mb-1.5">
                      Email *
                    </label>
                    <input
                      type="email"
                      className={inputClass}
                      placeholder="tu@email.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>
                </div>

                {/* Notes */}
                <div className="mb-6">
                  <label className="block text-[9px] font-semibold uppercase tracking-[0.1em] text-gray-400 mb-1.5">
                    ¿Algo más que deba saber?
                  </label>
                  <textarea
                    rows={2}
                    className={`${inputClass} resize-none`}
                    placeholder="Zona preferida, teletrabajo, requisitos especiales..."
                    value={formData.notas}
                    onChange={(e) =>
                      setFormData({ ...formData, notas: e.target.value })
                    }
                  />
                </div>

                {/* Submit */}
                <button
                  onClick={handleFormSubmit}
                  className="w-full text-[14px] font-semibold text-white py-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                  style={{ backgroundColor: "hsl(222, 28%, 16%)" }}
                >
                  Enviar — revisar portfolio disponible
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p
                  className="text-center text-[13px] mt-4 leading-[1.6]"
                  style={{ color: "#9CA3AF" }}
                >
                  Sin compromiso. Te respondo antes de 24h con lo que tengo — o
                  te digo honestamente si no tengo nada que encaje ahora mismo.
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ═══ 3. EL REPORTE ═══ */}
      <section
        id="reporte"
        style={{ backgroundColor: "#F4F6F8", padding: "96px 0" }}
      >
        <div className="max-w-[1000px] mx-auto px-5 md:px-8">
          <span
            className="block text-[10px] font-mono font-bold uppercase tracking-[0.14em] mb-3"
            style={{ color: "hsl(222, 28%, 16%)" }}
          >
            Paso 2 — Si no encaja nada del portfolio
          </span>
          <h2
            className="text-[28px] md:text-[38px] font-extrabold leading-[1.15] mb-3"
            style={{ color: "hsl(222, 28%, 16%)" }}
          >
            Accede a todo el mercado. No solo a lo que tengo yo.
          </h2>
          <p
            className="text-[15px] leading-[1.7] mb-12"
            style={{ color: "#6B7280", maxWidth: 580 }}
          >
            El Reporte de Mercado Personalizado analiza todas las propiedades
            disponibles en Frigiliana según tu perfil exacto — y te da una
            recomendación clara de cuál es la tuya.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {/* Left — features */}
            <div className="md:col-span-3">
              <p
                className="text-[12px] font-bold uppercase tracking-[0.08em] mb-5"
                style={{ color: "hsl(222, 28%, 16%)" }}
              >
                Qué incluye
              </p>
              <div className="flex flex-col gap-4">
                {[
                  "Análisis de todas las propiedades disponibles según tu perfil exacto",
                  "Recomendación profesional — cuál es la mejor opción y por qué",
                  "Precios reales del mercado — sin inflación",
                  "Guía logística: campo vs pueblo, conectividad, gastos reales",
                  "6 meses de seguimiento activo con actualizaciones",
                  "Si alquilas una propiedad de mi portfolio directo, te devuelvo el importe íntegro",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span
                      className="text-[14px] mt-0.5 flex-shrink-0"
                      style={{ color: "hsl(160, 84%, 39%)" }}
                    >
                      ✓
                    </span>
                    <span className="text-[14px] leading-[1.6]" style={{ color: "#374151" }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — CTA card */}
            <div
              className="md:col-span-2 rounded-[14px] p-8 md:p-9 flex flex-col"
              style={{ backgroundColor: "hsl(222, 28%, 16%)" }}
            >
              <span
                className="block text-[9px] font-mono font-semibold uppercase tracking-[0.12em] mb-3"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                Reporte de Mercado Personalizado
              </span>
              <h3
                className="text-[22px] font-bold text-white leading-[1.25] mb-3"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Tu análisis privado del mercado de alquiler
              </h3>
              <p
                className="text-[14px] leading-[1.65] mt-1 mb-6"
                style={{ color: "rgba(255,255,255,0.65)" }}
              >
                Entrega en 24–48h. Acceso privado por URL única. Incluye
                propiedades fuera del mercado público.
              </p>
              <div className="mt-auto">
                <button
                  onClick={handleReporteClick}
                  className="w-full text-[14px] font-semibold py-3.5 rounded-lg transition-colors"
                  style={{
                    backgroundColor: "#fff",
                    color: "hsl(222, 28%, 16%)",
                  }}
                >
                  Conocer el Reporte →
                </button>
                <p
                  className="text-center text-[11px] mt-3"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                >
                  Pago seguro · RGPD · Garantía de reembolso
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 4. CAPTURA EMAIL ═══ */}
      <section
        id="avisar"
        style={{ backgroundColor: "hsl(222, 28%, 16%)", padding: "72px 0" }}
      >
        <div className="max-w-[520px] mx-auto px-5 text-center">
          <span
            className="block text-[10px] font-mono font-semibold uppercase tracking-[0.14em] mb-3"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            ¿Todavía no es el momento?
          </span>
          <h2 className="text-[28px] font-extrabold text-white leading-[1.2] mb-3">
            Te aviso cuando salga algo que encaje.
          </h2>
          <p
            className="text-[15px] leading-[1.6] mb-8"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            Deja tu email. Cuando entre una propiedad que coincida con lo que
            buscas, eres el primero en saberlo.
          </p>

          {alertSent ? (
            <p className="text-[15px] font-medium text-white">
              ✓ Anotado. Te escribo cuando aparezca algo.
            </p>
          ) : (
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="tu@email.com"
                value={alertEmail}
                onChange={(e) => setAlertEmail(e.target.value)}
                className="flex-1 text-[14px] px-4 py-3.5 rounded-lg outline-none transition-colors text-white placeholder:text-white/40"
                style={{
                  backgroundColor: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              />
              <button
                onClick={handleAlertSubmit}
                className="text-[14px] font-semibold px-6 py-3.5 rounded-lg flex-shrink-0 transition-colors"
                style={{
                  backgroundColor: "#fff",
                  color: "hsl(222, 28%, 16%)",
                }}
              >
                Avisarme
              </button>
            </div>
          )}

          <p
            className="text-[11px] mt-4"
            style={{ color: "rgba(255,255,255,0.25)" }}
          >
            Sin spam. Solo cuando haya algo relevante para ti.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EncuentraTuAlquiler;
