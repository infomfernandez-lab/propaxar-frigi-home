import { useState, useEffect } from "react";

type Lang = "es" | "en";

const t = (lang: Lang, es: string, en: string) => lang === "es" ? es : en;

const TerminosFinder = () => {
  const [lang, setLang] = useState<Lang>(() => {
    try {
      // Check URL param first
      const params = new URLSearchParams(window.location.search);
      if (params.get("lang") === "en") return "en";
      // Then localStorage
      const saved = localStorage.getItem("finder-lang");
      return saved === "en" ? "en" : "es";
    } catch { return "es"; }
  });

  useEffect(() => {
    localStorage.setItem("finder-lang", lang);
  }, [lang]);

  const T = (es: string, en: string) => t(lang, es, en);

  return (
    <div className="min-h-screen bg-[#f5f5f5] py-5 px-5" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      <div className="max-w-[900px] mx-auto">
        {/* Navigation + Language Selector */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-4 text-sm">
            <a href="https://propaxar.es" className="text-[#2c5282] hover:underline">← {T("Volver a Propaxar.es", "Back to Propaxar.es")}</a>
            <a href="/finder" className="text-[#2c5282] hover:underline">← {T("Volver a Property Finder", "Back to Property Finder")}</a>
          </div>
          <div className="flex items-center gap-1 text-sm font-medium text-[#333] shrink-0">
            <button
              onClick={() => setLang("es")}
              className={`px-2 py-1 transition-colors ${lang === "es" ? "text-[#2c5282] underline underline-offset-4 font-bold" : "hover:text-[#2c5282]"}`}
            >
              🇪🇸 ES
            </button>
            <span className="text-[#ccc]">|</span>
            <button
              onClick={() => setLang("en")}
              className={`px-2 py-1 transition-colors ${lang === "en" ? "text-[#2c5282] underline underline-offset-4 font-bold" : "hover:text-[#2c5282]"}`}
            >
              🇬🇧 EN
            </button>
          </div>
        </div>

        <div className="bg-white p-8 md:p-[60px] rounded-lg shadow-md">
          {/* Header */}
          <div className="text-center mb-12 pb-8 border-b-[3px] border-[#2c5282]">
            <a href="https://propaxar.es" className="text-[32px] font-bold text-[#2c5282] mb-2 block no-underline hover:opacity-80">PROPAXAR</a>
            <h1 className="text-2xl md:text-[32px] font-bold text-[#2c5282] mb-2">{T("Términos y Condiciones del Servicio", "Terms and Conditions of Service")}</h1>
            <p className="text-xl text-[#2c5282]">Property Finder Service</p>
            <p className="text-[#666] text-sm mt-2">{T("Última actualización: 10 de febrero de 2026", "Last updated: February 10, 2026")}</p>
          </div>

          {/* Important notice */}
          <div className="bg-[#fffbeb] border-l-4 border-[#ffd700] p-5 my-6">
            <p><strong className="text-[#d97706]">{T("IMPORTANTE:", "IMPORTANT:")}</strong> {T(
              "Al marcar la casilla de aceptación y realizar el pago, usted está aceptando estos términos y condiciones de forma electrónica, lo cual constituye un contrato legalmente vinculante conforme a la legislación española y europea vigente.",
              "By checking the acceptance box and making the payment, you are accepting these terms and conditions electronically, which constitutes a legally binding contract under current Spanish and European legislation."
            )}</p>
          </div>

          {/* 1. IDENTIFICACIÓN */}
          <h2 className="text-2xl text-[#2c5282] mt-10 mb-5 pb-2 border-b-2 border-[#e2e8f0]">1. {T("IDENTIFICACIÓN DE LAS PARTES", "IDENTIFICATION OF THE PARTIES")}</h2>

          <h3 className="text-lg text-[#2c5282] mt-8 mb-4">1.1. {T("El Prestador del Servicio", "The Service Provider")}</h3>
          <p className="mb-4 text-justify">
            {T("Nombre comercial", "Trading name")}: Propaxar<br />
            {T("Titular", "Owner")}: Manuel Fernández Ramírez<br />
            NIF: 53371882Z<br />
            {T("Domicilio", "Address")}: Frigiliana, 29788 Málaga, {T("España", "Spain")}<br />
            Email: info@propaxar.com<br />
            {T("Teléfono/WhatsApp", "Phone/WhatsApp")}: +34 662 317 561<br />
            {T("Actividad", "Activity")}: {T("Consultoría inmobiliaria y servicio de búsqueda de propiedades", "Real estate consultancy and property search service")}
          </p>

          <h3 className="text-lg text-[#2c5282] mt-8 mb-4">1.2. {T("El Cliente", "The Client")}</h3>
          <p className="mb-4 text-justify">{T(
            "La persona física o jurídica que contrata el servicio mediante la aceptación electrónica de estos términos y el pago correspondiente a través de la plataforma de pago segura.",
            "The natural or legal person who hires the service through the electronic acceptance of these terms and the corresponding payment through the secure payment platform."
          )}</p>

          {/* 2. OBJETO */}
          <h2 className="text-2xl text-[#2c5282] mt-10 mb-5 pb-2 border-b-2 border-[#e2e8f0]">2. {T("OBJETO DEL CONTRATO", "SUBJECT OF THE CONTRACT")}</h2>
          <p className="mb-4 text-justify">{T(
            'El presente contrato tiene por objeto la prestación del "Property Finder Service", que consiste en un servicio profesional de búsqueda, selección y coordinación de propiedades inmobiliarias para alquiler en la región de La Axarquía, provincia de Málaga, España.',
            'This contract has as its purpose the provision of the "Property Finder Service", which consists of a professional service of search, selection and coordination of rental properties in the La Axarquía region, province of Málaga, Spain.'
          )}</p>

          <h3 className="text-lg text-[#2c5282] mt-8 mb-4">2.1. {T("Servicios Incluidos", "Services Included")}</h3>
          <p className="mb-4">{T("El servicio comprende las siguientes actuaciones por parte del prestador:", "The service comprises the following actions by the provider:")}</p>
          <ul className="list-disc ml-8 mb-5 space-y-2">
            <li><strong>{T("Búsqueda exhaustiva de mercado:", "Exhaustive market search:")}</strong> {T(
              "Rastreo completo de propiedades disponibles en portales inmobiliarios (Idealista, Fotocasa, etc.), agencias locales y propiedades off-market de la red de contactos del prestador.",
              "Complete search of available properties on real estate portals (Idealista, Fotocasa, etc.), local agencies and off-market properties from the provider's contact network."
            )}</li>
            <li><strong>{T("Selección personalizada:", "Personalized selection:")}</strong> {T(
              "Búsqueda y preselección de propiedades disponibles en el mercado que cumplan razonablemente con los criterios específicos del cliente. El número de propiedades disponibles dependerá de las condiciones del mercado en el momento de la búsqueda.",
              "Search and pre-selection of properties available on the market that reasonably meet the client's specific criteria. The number of available properties will depend on market conditions at the time of the search."
            )}</li>
            <li><strong>{T("Análisis profesional:", "Professional analysis:")}</strong> {T(
              "Evaluación de cada propiedad seleccionada incluyendo valoración de precio, ubicación, estado, características y recomendaciones profesionales basadas en 10 años de experiencia local.",
              "Evaluation of each selected property including price assessment, location, condition, features and professional recommendations based on 10 years of local experience."
            )}</li>
            <li><strong>{T("Coordinación de visitas:", "Visit coordination:")}</strong> {T(
              "Organización y coordinación completa de las visitas a las propiedades seleccionadas con propietarios y/o agentes.",
              "Complete organisation and coordination of visits to selected properties with owners and/or agents."
            )}</li>
            <li><strong>{T("Asesoramiento durante el proceso:", "Advisory during the process:")}</strong> {T(
              "Consultoría profesional durante todo el proceso de búsqueda y visualización.",
              "Professional consultancy throughout the search and viewing process."
            )}</li>
            <li><strong>{T("Apoyo en negociación:", "Negotiation support:")}</strong> {T(
              "Asistencia en la negociación de condiciones de alquiler (si procede).",
              "Assistance in negotiating rental conditions (if applicable)."
            )}</li>
          </ul>

          {/* Price box */}
          <div className="bg-[#f0f9ff] border-2 border-[#3b82f6] p-6 my-8 rounded-lg">
            <h3 className="text-lg font-bold text-[#1e40af] mb-4">2.2. {T("Estructura de Precios y Pagos", "Price and Payment Structure")}</h3>

            <p className="font-bold mb-2">{T("PAGO INICIAL - €180 (IVA incluido)", "INITIAL PAYMENT - €180 (VAT included)")}</p>
            <ul className="list-disc ml-8 mb-4 space-y-1">
              <li>{T("Pago único e inmediato al contratar el servicio", "Single immediate payment when hiring the service")}</li>
              <li><strong>{T("NO REEMBOLSABLE", "NON-REFUNDABLE")}</strong> {T("excepto en el caso específico descrito en la sección 3.3", "except in the specific case described in section 3.3")}</li>
              <li>{T("Este pago cubre todo el trabajo de búsqueda, selección y coordinación descrito en el apartado 2.1", "This payment covers all the search, selection and coordination work described in section 2.1")}</li>
              <li>{T("Se realiza a través de la pasarela de pago segura Stripe", "Processed through the secure Stripe payment gateway")}</li>
            </ul>

            <p className="font-bold mb-2">{T("PAGO FINAL - €220 (IVA incluido)", "FINAL PAYMENT - €220 (VAT included)")}</p>
            <ul className="list-disc ml-8 mb-4 space-y-1">
              <li>{T(
                "Este pago adicional es exigible ÚNICAMENTE si el cliente decide formalizar el alquiler de una propiedad presentada por el prestador",
                "This additional payment is required ONLY if the client decides to formalise the rental of a property presented by the provider"
              )}</li>
              <li>{T(
                "Se realiza en el momento de la firma del contrato de alquiler o en un plazo máximo de 48 horas posterior",
                "Due at the time of signing the rental contract or within a maximum of 48 hours thereafter"
              )}</li>
              <li>{T(
                "Si el cliente NO alquila ninguna propiedad presentada, NO se exige este pago",
                "If the client does NOT rent any property presented, this payment is NOT required"
              )}</li>
            </ul>

            <p className="font-bold mb-2">{T("COSTE TOTAL DEL SERVICIO:", "TOTAL SERVICE COST:")}</p>
            <ul className="list-disc ml-8 space-y-1">
              <li>{T("Si NO se alquila ninguna propiedad:", "If does NOT rent any property:")} <strong>€180</strong></li>
              <li>{T("Si SÍ se alquila una propiedad presentada:", "If rents a presented property:")} <strong>€400</strong> (€180 + €220)</li>
              <li>{T("Si alquila propiedad gestionada por Propaxar:", "If rents property managed by Propaxar:")} <strong>€0</strong> ({T("reembolso completo de €180", "full refund of €180")}) ✅</li>
            </ul>
          </div>

          {/* 3. CONDICIONES PAGO INICIAL */}
          <h2 className="text-2xl text-[#2c5282] mt-10 mb-5 pb-2 border-b-2 border-[#e2e8f0]">3. {T("CONDICIONES DEL PAGO INICIAL (€180)", "INITIAL PAYMENT CONDITIONS (€180)")}</h2>

          <h3 className="text-lg text-[#2c5282] mt-8 mb-4">3.1. {T("No Reembolsable", "Non-Refundable")}</h3>
          <p className="mb-4 text-justify">{T(
            "El pago inicial de €180 es NO REEMBOLSABLE bajo ninguna circunstancia (excepto lo dispuesto en la sección 3.3), incluyendo pero no limitado a:",
            "The initial payment of €180 is NON-REFUNDABLE under any circumstances (except as provided in section 3.3), including but not limited to:"
          )}</p>
          <ul className="list-disc ml-8 mb-5 space-y-2">
            <li>{T("Cambio de opinión del cliente", "Change of mind by the client")}</li>
            <li>{T("Imposibilidad del cliente de viajar para ver las propiedades", "Client's inability to travel to view properties")}</li>
            <li>{T("Desistimiento del cliente en cualquier fase del proceso", "Client withdrawal at any stage of the process")}</li>
            <li>{T("Que ninguna de las propiedades presentadas sea de interés para el cliente", "None of the presented properties being of interest to the client")}</li>
            <li>{T("Que el cliente encuentre otra propiedad por medios propios", "The client finding another property by their own means")}</li>
          </ul>
          <p className="mb-4 text-justify">{T(
            "Este pago compensa el trabajo profesional de búsqueda exhaustiva, análisis y coordinación, independientemente del resultado final.",
            "This payment compensates the professional work of exhaustive search, analysis and coordination, regardless of the final outcome."
          )}</p>

          <h3 className="text-lg text-[#2c5282] mt-8 mb-4">3.2. {T("Momento del Pago", "Payment Timing")}</h3>
          <p className="mb-4 text-justify">{T(
            "El pago debe realizarse de forma inmediata al contratar el servicio, antes de que el prestador inicie cualquier trabajo de búsqueda. La confirmación del pago por parte de Stripe activa automáticamente el servicio.",
            "Payment must be made immediately upon hiring the service, before the provider begins any search work. Payment confirmation by Stripe automatically activates the service."
          )}</p>

          {/* 3.3 EXCEPTION */}
          <div className="bg-[#f0fff4] border-2 border-[#48bb78] p-6 my-8 rounded-lg">
            <h3 className="text-lg font-bold text-[#276749] mt-0 mb-4">3.3. {T(
              "EXCEPCIÓN: Reembolso por Alquiler de Propiedad Gestionada Directamente por Propaxar",
              "EXCEPTION: Refund for Property Managed Directly by Propaxar"
            )}</h3>
            <p className="mb-4 text-justify">{T(
              "Si el cliente decide alquilar una propiedad que es gestionada DIRECTAMENTE por Propaxar, el prestador reembolsará la totalidad de los €180 al cliente.",
              "If the client decides to rent a property that is managed DIRECTLY by Propaxar, the provider will refund the full €180 to the client."
            )}</p>
            <p className="mb-2">{T("En este caso:", "In this case:")}</p>
            <ul className="list-disc ml-8 mb-4 space-y-2">
              <li>{T("El cliente NO pagará los €220 adicionales", "The client will NOT pay the additional €220")}</li>
              <li>{T("El cliente recibirá reembolso completo de €180", "The client will receive a full refund of €180")}</li>
              <li>{T("Coste total del servicio:", "Total service cost:")} <strong>€0 ({T("GRATIS", "FREE")})</strong></li>
            </ul>
            <p className="mb-2 font-bold">{T("¿Qué son propiedades gestionadas directamente?", "What are directly managed properties?")}</p>
            <p className="mb-4 text-justify">{T(
              "Son aquellas en las que Propaxar tiene relación contractual directa con el propietario y gestiona el alquiler sin intermediarios.",
              "These are properties where Propaxar has a direct contractual relationship with the owner and manages the rental without intermediaries."
            )}</p>
            <p>{T(
              "El prestador identificará estas propiedades con el distintivo",
              "The provider will identify these properties with the label"
            )} <strong>🏠 PROPAXAR DIRECT</strong></p>
          </div>

          {/* 4. CONDICIONES PAGO FINAL */}
          <h2 className="text-2xl text-[#2c5282] mt-10 mb-5 pb-2 border-b-2 border-[#e2e8f0]">4. {T("CONDICIONES DEL PAGO FINAL (€220)", "FINAL PAYMENT CONDITIONS (€220)")}</h2>

          <h3 className="text-lg text-[#2c5282] mt-8 mb-4">4.1. {T("Exigibilidad", "Enforceability")}</h3>
          <p className="mb-4 text-justify">{T(
            "El pago final de €220 es exigible ÚNICAMENTE si se cumplen las siguientes condiciones:",
            "The final payment of €220 is required ONLY if the following conditions are met:"
          )}</p>
          <ol className="list-decimal ml-8 mb-5 space-y-2">
            <li>{T(
              "El cliente decide alquilar una propiedad que ha sido presentada por el prestador como parte del servicio contratado",
              "The client decides to rent a property that has been presented by the provider as part of the hired service"
            )}</li>
            <li>{T(
              "Se formaliza un contrato de alquiler para dicha propiedad",
              "A rental contract is formalised for said property"
            )}</li>
            <li>{T(
              "La propiedad es de un tercero (NO gestionada directamente por Propaxar)",
              "The property belongs to a third party (NOT managed directly by Propaxar)"
            )}</li>
          </ol>
          <div className="bg-[#fffbeb] border-l-4 border-[#ffd700] p-5 my-6">
            <p><strong className="text-[#d97706]">{T("IMPORTANTE:", "IMPORTANT:")}</strong> {T(
              "Si la propiedad alquilada es gestionada directamente por Propaxar, NO se exige este pago de €220 y se reembolsa el pago inicial de €180.",
              "If the rented property is managed directly by Propaxar, this €220 payment is NOT required and the initial €180 payment is refunded."
            )}</p>
          </div>

          <h3 className="text-lg text-[#2c5282] mt-8 mb-4">4.2. {T("Momento del Pago", "Payment Timing")}</h3>
          <p className="mb-4">{T("El pago de €220 debe realizarse:", "The €220 payment must be made:")}</p>
          <ul className="list-disc ml-8 mb-5 space-y-2">
            <li>{T(
              "En el momento de la firma del contrato de alquiler, o",
              "At the time of signing the rental contract, or"
            )}</li>
            <li>{T(
              "En un plazo máximo de 48 horas posterior a la firma del contrato de alquiler",
              "Within a maximum of 48 hours after signing the rental contract"
            )}</li>
          </ul>

          <h3 className="text-lg text-[#2c5282] mt-8 mb-4">4.3. {T("Forma de Pago", "Payment Method")}</h3>
          <p className="mb-4 text-justify">{T(
            "El prestador enviará al cliente un enlace de pago seguro a través de Stripe para realizar este segundo pago. El cliente deberá realizar el pago a través de dicho enlace.",
            "The provider will send the client a secure payment link through Stripe for this second payment. The client must make the payment through said link."
          )}</p>

          {/* 5. OBLIGACIONES PRESTADOR */}
          <h2 className="text-2xl text-[#2c5282] mt-10 mb-5 pb-2 border-b-2 border-[#e2e8f0]">5. {T("OBLIGACIONES DEL PRESTADOR", "PROVIDER'S OBLIGATIONS")}</h2>
          <p className="mb-4">{T("El prestador se compromete a:", "The provider commits to:")}</p>
          <ol className="list-decimal ml-8 mb-5 space-y-2">
            <li>{T(
              "Realizar una búsqueda exhaustiva y profesional del mercado inmobiliario en La Axarquía",
              "Carry out an exhaustive and professional search of the real estate market in La Axarquía"
            )}</li>
            <li>{T(
              "Presentar al cliente las propiedades disponibles en el mercado que cumplan razonablemente con los criterios especificados. El prestador no garantiza un número mínimo de propiedades disponibles, ya que esto depende de las condiciones del mercado.",
              "Present to the client the properties available on the market that reasonably meet the specified criteria. The provider does not guarantee a minimum number of available properties, as this depends on market conditions."
            )}</li>
            <li>{T(
              "Proporcionar información veraz y actualizada sobre cada propiedad",
              "Provide truthful and up-to-date information about each property"
            )}</li>
            <li>{T(
              "Coordinar las visitas a las propiedades con diligencia",
              "Coordinate property visits with diligence"
            )}</li>
            <li>{T(
              "Responder a las consultas del cliente en un plazo razonable (máximo 48 horas laborables)",
              "Respond to client queries within a reasonable timeframe (maximum 48 business hours)"
            )}</li>
            <li>{T(
              "Mantener la confidencialidad de los datos personales del cliente conforme al RGPD",
              "Maintain the confidentiality of the client's personal data in accordance with GDPR"
            )}</li>
            <li>{T(
              "Entregar los resultados de la búsqueda en un plazo de 48-72 horas desde la llamada inicial de cualificación",
              "Deliver search results within 48-72 hours of the initial qualification call"
            )}</li>
          </ol>

          {/* 6. IDENTIFICACIÓN PROPIEDADES */}
          <h2 className="text-2xl text-[#2c5282] mt-10 mb-5 pb-2 border-b-2 border-[#e2e8f0]">6. {T("IDENTIFICACIÓN DE PROPIEDADES GESTIONADAS DIRECTAMENTE", "IDENTIFICATION OF DIRECTLY MANAGED PROPERTIES")}</h2>
          <p className="mb-4">{T(
            "Durante la presentación de propiedades, el prestador identificará claramente:",
            "During the property presentation, the provider will clearly identify:"
          )}</p>
          <div className="bg-[#f0fff4] border-2 border-[#48bb78] p-5 my-4 rounded-lg">
            <p className="mb-2"><strong>🏠 {T("Gestionadas directamente por Propaxar:", "Managed directly by Propaxar:")}</strong> {T(
              'Marcadas "PROPAXAR DIRECT" — Sin coste adicional (reembolso €180)',
              'Marked "PROPAXAR DIRECT" — No additional cost (€180 refund)'
            )}</p>
          </div>
          <div className="bg-[#f0f9ff] border-2 border-[#3b82f6] p-5 my-4 rounded-lg">
            <p><strong>🏢 {T("Propiedades de terceros:", "Third-party properties:")}</strong> {T(
              "Gestionadas por otras agencias — €220 adicionales (€400 total)",
              "Managed by other agencies — €220 additional (€400 total)"
            )}</p>
          </div>

          {/* 7. OBLIGACIONES CLIENTE */}
          <h2 className="text-2xl text-[#2c5282] mt-10 mb-5 pb-2 border-b-2 border-[#e2e8f0]">7. {T("OBLIGACIONES DEL CLIENTE", "CLIENT'S OBLIGATIONS")}</h2>
          <p className="mb-4">{T("El cliente se compromete a:", "The client commits to:")}</p>
          <ol className="list-decimal ml-8 mb-5 space-y-2">
            <li>{T(
              "Proporcionar información veraz y completa sobre sus necesidades y criterios de búsqueda",
              "Provide truthful and complete information about their needs and search criteria"
            )}</li>
            <li>{T(
              "Realizar el pago inicial de €180 de forma inmediata al contratar el servicio",
              "Make the initial payment of €180 immediately upon hiring the service"
            )}</li>
            <li>{T(
              "Responder a las comunicaciones del prestador en un plazo razonable",
              "Respond to provider communications within a reasonable timeframe"
            )}</li>
            <li>{T(
              "Informar al prestador sobre cualquier cambio en sus criterios o circunstancias",
              "Inform the provider of any changes in their criteria or circumstances"
            )}</li>
            <li>{T(
              "Realizar el pago final de €220 en caso de alquilar una propiedad de terceros presentada por el prestador",
              "Make the final payment of €220 if renting a third-party property presented by the provider"
            )}</li>
            <li>{T(
              "No utilizar la información proporcionada por el prestador para contactar directamente con propietarios con el fin de eludir el pago del servicio",
              "Not use the information provided by the provider to contact owners directly in order to evade payment of the service"
            )}</li>
          </ol>

          <div className="bg-[#fffbeb] border-l-4 border-[#ffd700] p-5 my-6">
            <h3 className="text-lg font-bold text-[#2c5282] mt-0 mb-3">7.1. {T("Cláusula Anti-Elusión", "Anti-Evasion Clause")}</h3>
            <p className="text-justify">{T(
              "Si el prestador puede demostrar que el cliente ha utilizado información proporcionada por el servicio (direcciones, contactos, detalles específicos de propiedades) para formalizar un alquiler directamente con el propietario sin la intervención del prestador, con el objetivo de eludir el pago de los €220, el cliente deberá abonar dicha cantidad más los gastos legales derivados de su reclamación.",
              "If the provider can demonstrate that the client has used information provided by the service (addresses, contacts, specific property details) to formalise a rental directly with the owner without the provider's intervention, in order to evade the €220 payment, the client must pay said amount plus the legal costs arising from its claim."
            )}</p>
          </div>

          {/* 8. DURACIÓN */}
          <h2 className="text-2xl text-[#2c5282] mt-10 mb-5 pb-2 border-b-2 border-[#e2e8f0]">8. {T("DURACIÓN DEL SERVICIO", "SERVICE DURATION")}</h2>
          <p className="mb-4 text-justify">{T(
            "El servicio tiene una duración de 6 meses desde la fecha de contratación (fecha del pago inicial).",
            "The service has a duration of 6 months from the date of hiring (date of initial payment)."
          )}</p>
          <p className="mb-4">{T("Durante este período:", "During this period:")}</p>
          <ul className="list-disc ml-8 mb-5 space-y-2">
            <li>{T(
              "El prestador mantendrá activa la búsqueda de propiedades",
              "The provider will keep the property search active"
            )}</li>
            <li>{T(
              "Si aparecen nuevas propiedades que encajen con los criterios del cliente, el prestador las comunicará",
              "If new properties appear that match the client's criteria, the provider will communicate them"
            )}</li>
            <li>{T(
              "El cliente puede solicitar actualizaciones de la búsqueda",
              "The client can request search updates"
            )}</li>
          </ul>
          <p className="mb-4 text-justify">{T(
            "Transcurridos los 6 meses sin que el cliente haya alquilado una propiedad, el servicio se considerará finalizado sin obligaciones adicionales para ninguna de las partes.",
            "After 6 months without the client renting a property, the service will be considered terminated without additional obligations for either party."
          )}</p>

          {/* 9. LIMITACIÓN */}
          <h2 className="text-2xl text-[#2c5282] mt-10 mb-5 pb-2 border-b-2 border-[#e2e8f0]">9. {T("LIMITACIÓN DE RESPONSABILIDAD", "LIMITATION OF LIABILITY")}</h2>

          <h3 className="text-lg text-[#2c5282] mt-8 mb-4">9.1. {T("Disponibilidad de Propiedades", "Property Availability")}</h3>
          <p className="mb-4 text-justify">{T(
            "El prestador no puede garantizar que las propiedades presentadas estarán disponibles en el momento en que el cliente decida alquilarlas, ya que la disponibilidad depende de los propietarios y otros factores fuera del control del prestador.",
            "The provider cannot guarantee that the presented properties will be available at the time the client decides to rent them, as availability depends on owners and other factors outside the provider's control."
          )}</p>

          <h3 className="text-lg text-[#2c5282] mt-8 mb-4">9.2. {T("Información de Terceros", "Third-Party Information")}</h3>
          <p className="mb-4 text-justify">{T(
            "La información sobre propiedades proviene mayoritariamente de terceros (propietarios, agencias, portales). El prestador se compromete a verificar la información en la medida de lo posible, pero no se hace responsable de inexactitudes en la información proporcionada por terceros.",
            "Property information comes mostly from third parties (owners, agencies, portals). The provider commits to verifying the information as far as possible, but is not responsible for inaccuracies in information provided by third parties."
          )}</p>

          <h3 className="text-lg text-[#2c5282] mt-8 mb-4">9.3. {T("Decisión Final", "Final Decision")}</h3>
          <p className="mb-4 text-justify">{T(
            "El servicio es de asesoramiento y búsqueda. La decisión final de alquilar cualquier propiedad es exclusivamente del cliente. El prestador no se hace responsable de la satisfacción del cliente con la propiedad alquilada una vez formalizado el contrato de alquiler.",
            "The service is advisory and search-based. The final decision to rent any property rests exclusively with the client. The provider is not responsible for the client's satisfaction with the rented property once the rental contract is formalised."
          )}</p>

          <h3 className="text-lg text-[#2c5282] mt-8 mb-4">9.4. {T("Exclusión de Responsabilidad", "Exclusion of Liability")}</h3>
          <p className="mb-4">{T("El prestador NO se hace responsable de:", "The provider is NOT responsible for:")}</p>
          <ul className="list-disc ml-8 mb-5 space-y-2">
            <li>{T(
              "Defectos o problemas en las propiedades que no sean evidentes durante las visitas",
              "Defects or problems in properties that are not evident during visits"
            )}</li>
            <li>{T(
              "Incumplimientos del contrato de alquiler por parte del propietario",
              "Breaches of the rental contract by the owner"
            )}</li>
            <li>{T(
              "Cambios en las condiciones del mercado o disponibilidad de propiedades",
              "Changes in market conditions or property availability"
            )}</li>
            <li>{T(
              "Gastos de viaje del cliente para ver propiedades",
              "Client's travel expenses to view properties"
            )}</li>
          </ul>

          {/* 10. RGPD */}
          <h2 className="text-2xl text-[#2c5282] mt-10 mb-5 pb-2 border-b-2 border-[#e2e8f0]">10. {T("PROTECCIÓN DE DATOS PERSONALES (RGPD)", "PERSONAL DATA PROTECTION (GDPR)")}</h2>

          <h3 className="text-lg text-[#2c5282] mt-8 mb-4">10.1. {T("Responsable del Tratamiento", "Data Controller")}</h3>
          <p className="mb-4 text-justify">{T(
            "El responsable del tratamiento de los datos personales es Manuel Fernández Ramírez (Propaxar), con domicilio en Frigiliana, 29788 Málaga, España.",
            "The data controller is Manuel Fernández Ramírez (Propaxar), with address in Frigiliana, 29788 Málaga, Spain."
          )}</p>

          <h3 className="text-lg text-[#2c5282] mt-8 mb-4">10.2. {T("Finalidad del Tratamiento", "Purpose of Processing")}</h3>
          <p className="mb-4">{T(
            "Los datos personales recabados (nombre, email, teléfono, dirección de facturación) se utilizarán exclusivamente para:",
            "The personal data collected (name, email, phone, billing address) will be used exclusively for:"
          )}</p>
          <ul className="list-disc ml-8 mb-5 space-y-2">
            <li>{T("Prestar el servicio contratado", "Providing the hired service")}</li>
            <li>{T("Comunicaciones relacionadas con el servicio", "Service-related communications")}</li>
            <li>{T("Emisión de facturas y gestión de pagos", "Invoice issuance and payment management")}</li>
            <li>{T("Cumplimiento de obligaciones legales", "Compliance with legal obligations")}</li>
          </ul>

          <h3 className="text-lg text-[#2c5282] mt-8 mb-4">10.3. {T("Conservación de Datos", "Data Retention")}</h3>
          <p className="mb-4 text-justify">{T(
            "Los datos se conservarán durante la vigencia del servicio y posteriormente durante el plazo legalmente establecido para el cumplimiento de obligaciones fiscales y legales (mínimo 6 años).",
            "Data will be retained during the service period and subsequently for the legally established period for compliance with tax and legal obligations (minimum 6 years)."
          )}</p>

          <h3 className="text-lg text-[#2c5282] mt-8 mb-4">10.4. {T("Derechos del Cliente", "Client Rights")}</h3>
          <p className="mb-4">{T("El cliente tiene derecho a:", "The client has the right to:")}</p>
          <ul className="list-disc ml-8 mb-5 space-y-2">
            <li>{T("Acceder a sus datos personales", "Access their personal data")}</li>
            <li>{T("Rectificar datos inexactos", "Rectify inaccurate data")}</li>
            <li>{T("Solicitar la supresión de sus datos (cuando proceda legalmente)", "Request deletion of their data (when legally applicable)")}</li>
            <li>{T("Oponerse al tratamiento", "Object to processing")}</li>
            <li>{T("Solicitar la limitación del tratamiento", "Request restriction of processing")}</li>
            <li>{T("Portabilidad de datos", "Data portability")}</li>
          </ul>
          <p className="mb-4">{T(
            "Para ejercer estos derechos, el cliente puede contactar a:",
            "To exercise these rights, the client can contact:"
          )} <strong>info@propaxar.com</strong></p>

          {/* 11. DESISTIMIENTO */}
          <h2 className="text-2xl text-[#2c5282] mt-10 mb-5 pb-2 border-b-2 border-[#e2e8f0]">11. {T("DERECHO DE DESISTIMIENTO", "RIGHT OF WITHDRAWAL")}</h2>
          <p className="mb-4 text-justify">{T(
            "Conforme al artículo 103 del Real Decreto Legislativo 1/2007, de 16 de noviembre, por el que se aprueba el texto refundido de la Ley General para la Defensa de los Consumidores y Usuarios:",
            "In accordance with Article 103 of Royal Legislative Decree 1/2007, of November 16, approving the revised text of the General Law for the Defence of Consumers and Users:"
          )}</p>
          <div className="bg-[#fffbeb] border-l-4 border-[#ffd700] p-5 my-6">
            <p className="mb-4"><strong className="text-[#d97706]">{T(
              "El derecho de desistimiento NO es aplicable a este servicio",
              "The right of withdrawal is NOT applicable to this service"
            )}</strong> {T("porque se trata de:", "because it is:")}</p>
            <ul className="list-disc ml-8 mb-4 space-y-2">
              <li>{T(
                "Un servicio cuya ejecución ha comenzado, con el consentimiento expreso del cliente, antes de que expire el plazo de desistimiento",
                "A service whose execution has begun, with the express consent of the client, before the withdrawal period expires"
              )}</li>
              <li>{T(
                "Un servicio personalizado conforme a las especificaciones del cliente",
                "A personalised service according to the client's specifications"
              )}</li>
            </ul>
          </div>
          <p className="mb-4 text-justify">{T(
            "Al contratar el servicio, el cliente acepta expresamente que el prestador inicie la ejecución del servicio de forma inmediata, renunciando así a su derecho de desistimiento.",
            "By hiring the service, the client expressly accepts that the provider begins execution of the service immediately, thereby waiving their right of withdrawal."
          )}</p>

          {/* 12-13 */}
          <h2 className="text-2xl text-[#2c5282] mt-10 mb-5 pb-2 border-b-2 border-[#e2e8f0]">12. {T("MODIFICACIÓN DE LOS TÉRMINOS", "MODIFICATION OF TERMS")}</h2>
          <p className="mb-4 text-justify">{T(
            "El prestador se reserva el derecho de modificar estos términos y condiciones. Las modificaciones no afectarán a los servicios ya contratados, que se regirán por los términos vigentes en el momento de la contratación.",
            "The provider reserves the right to modify these terms and conditions. Modifications will not affect services already contracted, which will be governed by the terms in force at the time of hiring."
          )}</p>

          <h2 className="text-2xl text-[#2c5282] mt-10 mb-5 pb-2 border-b-2 border-[#e2e8f0]">13. {T("NULIDAD PARCIAL", "PARTIAL NULLITY")}</h2>
          <p className="mb-4 text-justify">{T(
            "Si alguna cláusula de estos términos fuera declarada nula o inaplicable, las demás cláusulas mantendrán su plena vigencia y efectos.",
            "If any clause of these terms is declared null or unenforceable, the remaining clauses will maintain their full validity and effect."
          )}</p>

          {/* 14. LEY */}
          <h2 className="text-2xl text-[#2c5282] mt-10 mb-5 pb-2 border-b-2 border-[#e2e8f0]">14. {T("LEY APLICABLE Y JURISDICCIÓN", "APPLICABLE LAW AND JURISDICTION")}</h2>

          <h3 className="text-lg text-[#2c5282] mt-8 mb-4">14.1. {T("Ley Aplicable", "Applicable Law")}</h3>
          <p className="mb-4">{T("Este contrato se rige por la legislación española, en particular:", "This contract is governed by Spanish legislation, in particular:")}</p>
          <ul className="list-disc ml-8 mb-5 space-y-2">
            <li>Código Civil Español</li>
            <li>Ley 34/2002, de Servicios de la Sociedad de la Información y Comercio Electrónico (LSSI)</li>
            <li>Real Decreto Legislativo 1/2007, de Defensa de Consumidores y Usuarios</li>
            <li>Reglamento (UE) 2016/679 de Protección de Datos (RGPD)</li>
          </ul>

          <h3 className="text-lg text-[#2c5282] mt-8 mb-4">14.2. {T("Jurisdicción", "Jurisdiction")}</h3>
          <p className="mb-4 text-justify">{T(
            "Para la resolución de cualquier controversia que pudiera derivarse de la interpretación o ejecución de este contrato, las partes se someten expresamente a los Juzgados y Tribunales de Torrox, Málaga, España, con renuncia expresa a cualquier otro fuero que pudiera corresponderles.",
            "For the resolution of any dispute that may arise from the interpretation or execution of this contract, the parties expressly submit to the Courts and Tribunals of Torrox, Málaga, Spain, with express waiver of any other jurisdiction that may correspond to them."
          )}</p>

          {/* 15. ACEPTACIÓN */}
          <h2 className="text-2xl text-[#2c5282] mt-10 mb-5 pb-2 border-b-2 border-[#e2e8f0]">15. {T("ACEPTACIÓN ELECTRÓNICA", "ELECTRONIC ACCEPTANCE")}</h2>
          <div className="bg-[#fffbeb] border-l-4 border-[#ffd700] p-5 my-6">
            <p className="mb-4">{T(
              "Al marcar la casilla de aceptación de estos términos y condiciones y realizar el pago a través de la pasarela segura, el cliente:",
              "By checking the acceptance box of these terms and conditions and making payment through the secure gateway, the client:"
            )}</p>
            <ol className="list-decimal ml-8 mb-4 space-y-2">
              <li>{T(
                "Declara haber leído, comprendido y aceptado la totalidad de estos términos y condiciones",
                "Declares having read, understood and accepted all of these terms and conditions"
              )}</li>
              <li>{T(
                "Acepta expresamente la estructura de precios (€180 + €220 en su caso)",
                "Expressly accepts the price structure (€180 + €220 if applicable)"
              )}</li>
              <li>{T(
                "Acepta expresamente que el pago inicial de €180 es NO REEMBOLSABLE (salvo lo previsto en la sección 3.3)",
                "Expressly accepts that the initial payment of €180 is NON-REFUNDABLE (except as provided in section 3.3)"
              )}</li>
              <li>{T(
                "Acepta que el servicio comience de forma inmediata tras el pago",
                "Accepts that the service begins immediately after payment"
              )}</li>
              <li>{T(
                "Renuncia expresamente a su derecho de desistimiento",
                "Expressly waives their right of withdrawal"
              )}</li>
              <li>{T(
                "Acepta que esta aceptación electrónica constituye un contrato legalmente vinculante",
                "Accepts that this electronic acceptance constitutes a legally binding contract"
              )}</li>
            </ol>
            <p className="text-justify">{T(
              "Conforme al artículo 24 de la Ley 34/2002 LSSI y el Reglamento (UE) 910/2014 (eIDAS), esta aceptación electrónica tiene la misma validez legal que una firma manuscrita.",
              "In accordance with Article 24 of Law 34/2002 LSSI and Regulation (EU) 910/2014 (eIDAS), this electronic acceptance has the same legal validity as a handwritten signature."
            )}</p>
          </div>

          {/* 16. REGISTRO */}
          <h2 className="text-2xl text-[#2c5282] mt-10 mb-5 pb-2 border-b-2 border-[#e2e8f0]">16. {T("REGISTRO DE LA ACEPTACIÓN", "ACCEPTANCE RECORD")}</h2>
          <p className="mb-4">{T("El prestador conservará registro electrónico de:", "The provider will keep electronic record of:")}</p>
          <ul className="list-disc ml-8 mb-5 space-y-2">
            <li>{T("Fecha y hora de la aceptación", "Date and time of acceptance")}</li>
            <li>{T("Dirección IP del cliente", "Client's IP address")}</li>
            <li>{T("Datos de identificación del cliente proporcionados en Stripe", "Client identification data provided in Stripe")}</li>
            <li>{T("Confirmación del pago", "Payment confirmation")}</li>
            <li>{T("Versión de los términos y condiciones aceptados", "Version of the accepted terms and conditions")}</li>
          </ul>
          <p className="mb-4 text-justify">{T(
            "Este registro constituye prueba de la perfección del contrato y podrá ser utilizado en caso de controversia.",
            "This record constitutes proof of the contract's formation and may be used in case of dispute."
          )}</p>

          {/* 17. CONTACTO */}
          <h2 className="text-2xl text-[#2c5282] mt-10 mb-5 pb-2 border-b-2 border-[#e2e8f0]">17. {T("CONTACTO", "CONTACT")}</h2>
          <p className="mb-4 text-justify">{T(
            "Para cualquier consulta, duda o reclamación relacionada con estos términos y condiciones o con el servicio contratado, el cliente puede contactar con:",
            "For any query, doubt or complaint related to these terms and conditions or with the hired service, the client can contact:"
          )}</p>
          <div className="bg-[#f7fafc] p-6 rounded-lg my-6">
            <p>
              <strong>Propaxar - Manuel Fernández Ramírez</strong><br />
              Email: info@propaxar.com<br />
              {T("Teléfono/WhatsApp", "Phone/WhatsApp")}: +34 662 317 561<br />
              {T("Dirección", "Address")}: Frigiliana, 29788 Málaga, {T("España", "Spain")}
            </p>
          </div>

          {/* Footer */}
          <div className="mt-16 pt-8 border-t-2 border-[#e2e8f0] text-center text-[#666] text-sm">
            <p>Propaxar © {new Date().getFullYear()}</p>
            <p>Property Finder Service</p>
            <p>La Axarquía, Costa del Sol, Málaga, {T("España", "Spain")}</p>
            <p className="mt-4">{T("Documento actualizado: 10 de febrero de 2026", "Document updated: February 10, 2026")}</p>
            <p>{T("Versión", "Version")}: 2.0</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerminosFinder;
