import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type Lang = "es" | "en";

const PHONE = "+34 662 317 561";
const EMAIL = "info@propaxar.com";

const FinderSuccess = () => {
  const [lang, setLang] = useState<Lang>(() => {
    try { return localStorage.getItem("finder-lang") === "en" ? "en" : "es"; }
    catch { return "es"; }
  });

  const navigate = useNavigate();

  const content = {
    es: {
      badge: "PAGO COMPLETADO",
      title: "¡Pago Exitoso!",
      subtitle: "Tu reporte personalizado estará listo en las próximas 24-48 horas.",
      stepsTitle: "Próximos pasos:",
      steps: [
        "Recibirás email de confirmación con recibo en los próximos minutos",
        "Te contactaré vía WhatsApp para confirmar detalles de tu búsqueda",
        "Crearé tu reporte personalizado con las mejores propiedades",
        "Recibirás tu URL única en 24-48h con acceso completo al reporte",
        "Seguimiento semanal durante 6 meses hasta que encuentres tu hogar",
      ],
      contactTitle: "¿Preguntas urgentes?",
      whatsapp: "💬 WhatsApp: " + PHONE,
      email: "📧 " + EMAIL,
      backBtn: "← Volver al inicio",
    },
    en: {
      badge: "PAYMENT COMPLETED",
      title: "Payment Successful!",
      subtitle: "Your personalised report will be ready within the next 24-48 hours.",
      stepsTitle: "Next steps:",
      steps: [
        "You'll receive a confirmation email with receipt within the next few minutes",
        "I'll contact you via WhatsApp to confirm your search details",
        "I'll build your personalised report with the best matching properties",
        "You'll receive your unique URL in 24-48h with full access to the report",
        "Weekly follow-up for 6 months until you find your home",
      ],
      contactTitle: "Urgent questions?",
      whatsapp: "💬 WhatsApp: " + PHONE,
      email: "📧 " + EMAIL,
      backBtn: "← Back to home",
    },
  };

  const c = content[lang];

  return (
    <div className="min-h-screen bg-[#f8faff] flex flex-col" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>

      {/* Header */}
      <header className="bg-white border-b border-[#e5e7eb] py-4 shadow-sm">
        <div className="max-w-[900px] mx-auto px-5 flex items-center justify-between">
          <a href="https://propaxar.es" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img
              src="https://propaxar.com/wp-content/uploads/2024/08/logo_small_icon_only_inverted_orDKnNi.png"
              alt="Propaxar"
              className="h-9 w-auto"
            />
            <div>
              <p className="text-2xl font-bold text-[#2c5282] tracking-tight leading-tight">PROPAXAR</p>
              <p className="text-[#666] text-xs">{lang === "es" ? "Tu Consultor Personal de Vivienda en La Axarquía" : "Your Personal Housing Consultant in La Axarquía"}</p>
            </div>
          </a>
          <div className="flex items-center gap-0.5 text-sm font-medium border border-[#e5e7eb] rounded-lg overflow-hidden">
            <button onClick={() => setLang("es")} className={`px-3 py-1.5 transition-colors ${lang === "es" ? "bg-[#2c5282] text-white" : "hover:bg-[#f0f4ff]"}`}>🇪🇸 ES</button>
            <button onClick={() => setLang("en")} className={`px-3 py-1.5 transition-colors ${lang === "en" ? "bg-[#2c5282] text-white" : "hover:bg-[#f0f4ff]"}`}>🇬🇧 EN</button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center py-16 px-5">
        <div className="max-w-[600px] w-full">

          {/* Success Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-[#e8f0fe] overflow-hidden">

            {/* Green top band */}
            <div className="bg-[#48bb78] py-10 text-center px-6">
              <div className="text-6xl mb-4">✅</div>
              <span className="inline-block bg-white/20 text-white text-xs font-bold tracking-widest uppercase px-4 py-1 rounded-full mb-4">
                {c.badge}
              </span>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white">{c.title}</h1>
            </div>

            {/* Body */}
            <div className="p-8">
              <p className="text-[#555] text-lg text-center mb-8 leading-relaxed">{c.subtitle}</p>

              {/* Steps */}
              <div className="bg-[#f8faff] rounded-xl p-6 border border-[#e8f0fe] mb-8">
                <p className="font-bold text-[#1e3a5f] mb-4">{c.stepsTitle}</p>
                <ul className="space-y-3">
                  {c.steps.map((step, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-[#333]">
                      <span className="bg-[#48bb78] text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div className="text-center border-t border-[#e8f0fe] pt-6">
                <p className="text-[#888] text-sm mb-4">{c.contactTitle}</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href="https://wa.me/34662317561"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#25d366] hover:bg-[#1ebe57] text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center gap-2 text-sm"
                  >
                    {c.whatsapp}
                  </a>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="bg-white border border-[#2c5282] text-[#2c5282] hover:bg-[#f0f4ff] px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center gap-2 text-sm"
                  >
                    {c.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Back link */}
          <div className="text-center mt-8">
            <button
              onClick={() => navigate("/finder")}
              className="text-[#2c5282] hover:text-[#1e3a5f] text-sm font-medium transition-colors"
            >
              {c.backBtn}
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 bg-[#1a1a2e] text-center text-[#888] text-sm">
        <p className="text-[#555] text-xs">
          <a href={`mailto:${EMAIL}`} className="hover:text-[#888]">{EMAIL}</a>
          {" · "}
          <a href="https://wa.me/34662317561" target="_blank" rel="noopener noreferrer" className="hover:text-[#888]">{PHONE}</a>
          {" · "}
          <a href="https://propaxar.es" target="_blank" rel="noopener noreferrer" className="hover:text-[#888]">propaxar.es</a>
        </p>
        <p className="mt-2 text-[#444] text-xs">© {new Date().getFullYear()} Propaxar.</p>
      </footer>
    </div>
  );
};

export default FinderSuccess;
