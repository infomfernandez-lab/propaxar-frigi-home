import { useState } from 'react';
import { Link } from 'react-router-dom';

type Lang = 'es' | 'en';

const content = {
  es: {
    backSite: '← Volver a Propaxar.es',
    title: 'Términos y Condiciones del Servicio',
    subtitle: 'Property Finder · Propaxar',
    updated: 'Última actualización: mayo de 2026',
    indexTitle: 'Índice',
    index: [
      'Descripción del Servicio',
      'Precio y Forma de Pago',
      'Política de Reembolso',
      'Entrega y Validez del Reporte',
      'Responsabilidades del Cliente',
      'Responsabilidades de Propaxar',
      'Limitaciones de Responsabilidad',
      'Privacidad y Protección de Datos',
      'Propiedad Intelectual',
      'Terminación del Servicio',
      'Cambios en los Términos',
      'Ley Aplicable',
      'Contacto',
    ],
    importantBox: '⚠️ Al contratar el servicio y realizar el pago, aceptas estos términos de forma expresa, constituyendo un acuerdo de prestación de servicios conforme a la legislación española y europea vigente.',
    contactTitle: '¿Tienes preguntas sobre estos términos?',
    footerNote: 'Propaxar · Frigiliana, Málaga, España · propaxar.es',
    sections: [
      {
        num: '1',
        title: 'Descripción del Servicio',
        content: [
          { type: 'p', text: '1.1. El servicio Property Finder de Propaxar ("el Servicio") consiste en la búsqueda, análisis y selección personalizada de propiedades disponibles en Frigiliana, Nerja y La Axarquía (Málaga, España) para alquiler de larga temporada o compra, adaptado al perfil exacto del cliente.' },
          { type: 'p', text: '1.2. El Servicio incluye:' },
          { type: 'ul', items: [
            'Búsqueda en el mercado completo: portales públicos, agencias locales, contactos directos y propiedades no publicadas.',
            'Selección y análisis de las mejores opciones disponibles según el perfil del cliente.',
            'Informe personalizado con análisis honesto de cada propiedad: zona, acceso, vecindario, gastos reales, historial.',
            'Recomendación profesional clara sobre qué opción encaja mejor y por qué.',
            'Acceso privado al informe mediante URL única durante 6 meses.',
            'Seguimiento activo durante 6 meses: actualizaciones semanales y alertas por WhatsApp ante nuevas propiedades relevantes.',
            'Acceso directo a Manuel Fernández vía WhatsApp y email durante todo el período.',
            'Acompañamiento en visitas y negociación si el cliente lo requiere.',
          ]},
          { type: 'p', text: '1.3. Entrega: El informe se entrega en un plazo de 24 a 48 horas laborables desde la confirmación del encargo y recepción del pago, mediante URL única, privada y personalizada.' },
          { type: 'p', text: '1.4. Alcance geográfico: El servicio cubre Frigiliana, Nerja y La Axarquía. La cobertura de zonas adicionales puede acordarse expresamente con el cliente.' },
          { type: 'p', text: '1.5. Naturaleza del servicio: Propaxar actúa como asesor independiente al servicio del cliente (comprador o inquilino). No actúa como agente de la propiedad ni representa los intereses del propietario o agencia vendedora.' },
        ],
      },
      {
        num: '2',
        title: 'Precio y Forma de Pago',
        content: [
          { type: 'highlight', text: '2.1. El precio del servicio se acuerda expresamente con el cliente antes del inicio del trabajo. La tarifa habitual es de €200 (doscientos euros), IVA incluido según legislación española vigente. En determinados casos puede acordarse una tarifa diferente según el alcance del encargo.' },
          { type: 'p', text: '2.2. El pago se realiza por transferencia bancaria, Bizum o el método acordado con el cliente en la consulta inicial. El trabajo comienza tras la recepción del pago.' },
          { type: 'p', text: '2.3. El pago es único y cubre el informe inicial completo más 6 meses de seguimiento activo. No existen cargos adicionales ni suscripciones.' },
          { type: 'p', text: '2.4. Confirmación: Propaxar confirmará por WhatsApp la recepción del pago y el inicio del trabajo.' },
        ],
      },
      {
        num: '3',
        title: 'Política de Reembolso',
        content: [
          { type: 'success', text: '3.1. REEMBOLSO TOTAL GARANTIZADO: Si el cliente alquila o compra una propiedad gestionada directamente por Propaxar (portfolio "Propaxar Direct"), se reembolsará el importe íntegro del servicio en un plazo máximo de 7 días hábiles tras la firma del contrato.' },
          { type: 'p', text: '3.2. Si el cliente no está satisfecho con el informe recibido, debe comunicarlo a info@propaxar.com en los 7 días naturales siguientes a la entrega. Propaxar evaluará cada caso de forma individual y resolverá con criterio de buena fe.' },
          { type: 'p', text: '3.3. No procede reembolso en los siguientes casos:' },
          { type: 'ul', items: [
            'Han transcurrido más de 7 días desde la entrega del informe.',
            'El cliente ha utilizado el informe para coordinar visitas a propiedades.',
            'El cliente encuentra propiedad a través de otra vía (agencia, portal, particular).',
            'El cliente modifica sustancialmente sus criterios de búsqueda tras recibir el informe.',
            'No existen propiedades disponibles que cumplan los criterios del cliente — esto se informa honestamente en el informe y no constituye un defecto del servicio.',
          ]},
          { type: 'p', text: '3.4. Los reembolsos aprobados se realizan por el mismo método de pago utilizado, en un plazo de 7 a 14 días hábiles.' },
        ],
      },
      {
        num: '4',
        title: 'Entrega y Validez del Informe',
        content: [
          { type: 'p', text: '4.1. La URL del informe permanece activa durante 6 meses completos (180 días naturales) desde la fecha de entrega.' },
          { type: 'p', text: '4.2. Las actualizaciones semanales incluyen:' },
          { type: 'ul', items: [
            'Nuevas propiedades que coincidan con el perfil del cliente.',
            'Cambios de precio o condiciones en propiedades ya incluidas.',
            'Retirada de propiedades ya alquiladas o no disponibles.',
            'Alertas proactivas por WhatsApp ante propiedades especialmente relevantes.',
          ]},
          { type: 'p', text: '4.3. Tras los 6 meses, la URL expira automáticamente. El cliente puede solicitar una actualización del informe al precio vigente en ese momento.' },
        ],
      },
      {
        num: '5',
        title: 'Responsabilidades del Cliente',
        content: [
          { type: 'p', text: '5.1. El cliente debe proporcionar información veraz y completa sobre su perfil de búsqueda: presupuesto real, necesidades, fechas y preferencias.' },
          { type: 'p', text: '5.2. El cliente debe responder a comunicaciones en plazos razonables (48-72 horas) para coordinar visitas o aclarar criterios.' },
          { type: 'p', text: '5.3. La URL del informe es personal e intransferible. El cliente no debe publicarla ni compartirla más allá de su pareja o familia directa involucrada en la decisión.' },
          { type: 'p', text: '5.4. Las decisiones finales de alquiler o compra son responsabilidad exclusiva del cliente. El informe es un instrumento de asesoramiento profesional, no una garantía de resultado.' },
          { type: 'p', text: '5.5. El cliente debe realizar sus propias visitas e inspecciones antes de comprometerse con cualquier propiedad.' },
        ],
      },
      {
        num: '6',
        title: 'Responsabilidades de Propaxar',
        content: [
          { type: 'p', text: '6.1. Entregar el informe completo en 24-48 horas laborables desde la recepción del pago.' },
          { type: 'p', text: '6.2. Proporcionar análisis honesto y directo basado en conocimiento local real. Esto incluye informar al cliente si sus expectativas no son realistas dado el mercado actual.' },
          { type: 'p', text: '6.3. Verificar personalmente la disponibilidad de cada propiedad incluida en el informe antes de su entrega.' },
          { type: 'p', text: '6.4. Responder a consultas del cliente en un plazo de 24 horas en días laborables.' },
          { type: 'p', text: '6.5. Mantener la privacidad de la URL del informe y de todos los datos del cliente.' },
          { type: 'p', text: '6.6. Actualizar el informe semanalmente durante los 6 meses de vigencia, siempre que existan cambios relevantes.' },
        ],
      },
      {
        num: '7',
        title: 'Limitaciones de Responsabilidad',
        content: [
          { type: 'p', text: '7.1. Propaxar no puede garantizar la existencia de propiedades disponibles que cumplan exactamente los criterios del cliente. El mercado de La Axarquía es limitado y variable. Si no hay opciones viables, se informará con total honestidad.' },
          { type: 'p', text: '7.2. Las propiedades no gestionadas directamente por Propaxar provienen de otras fuentes. Propaxar verifica la información pero no controla ni responde por decisiones de terceros (propietarios, otras agencias).' },
          { type: 'p', text: '7.3. Los precios son precisos en el momento de publicación del informe pero pueden cambiar sin previo aviso. Ningún precio está garantizado hasta la firma del contrato.' },
          { type: 'p', text: '7.4. La responsabilidad máxima de Propaxar bajo estos términos se limita al importe abonado por el servicio. Propaxar no es responsable de daños consecuentes, pérdida de oportunidades, gastos de viaje, depósitos pagados a terceros ni problemas derivados de contratos firmados directamente con propietarios.' },
        ],
      },
      {
        num: '8',
        title: 'Privacidad y Protección de Datos',
        content: [
          { type: 'p', text: '8.1. Propaxar recopila y trata: nombre completo, email, teléfono y criterios de búsqueda, con la única finalidad de prestar el servicio contratado.' },
          { type: 'p', text: '8.2. Los datos no se venden ni ceden a terceros con fines comerciales. Pueden compartirse únicamente con propietarios o agentes para coordinar visitas, siempre en relación directa con el encargo del cliente.' },
          { type: 'p', text: '8.3. Los datos se conservan durante la vigencia del servicio (6 meses) más 12 meses adicionales por obligaciones legales y contables.' },
          { type: 'p', text: '8.4. El cliente tiene derecho de acceso, rectificación, supresión, oposición y portabilidad de sus datos conforme al RGPD. Para ejercerlos: info@propaxar.com' },
        ],
      },
      {
        num: '9',
        title: 'Propiedad Intelectual',
        content: [
          { type: 'p', text: '9.1. El contenido del informe — análisis, redacción, estructura, recomendaciones — es propiedad intelectual de Propaxar y está protegido por la legislación española e internacional de derechos de autor.' },
          { type: 'p', text: '9.2. El cliente recibe una licencia personal, no exclusiva e intransferible para uso exclusivo en su búsqueda de vivienda.' },
          { type: 'p', text: '9.3. Queda prohibida cualquier reproducción, distribución, publicación o uso comercial del informe o de su estructura sin autorización expresa de Propaxar.' },
        ],
      },
      {
        num: '10',
        title: 'Terminación del Servicio',
        content: [
          { type: 'p', text: '10.1. El cliente puede cancelar el servicio en cualquier momento comunicándolo a info@propaxar.com, sujeto a la política de reembolso de la sección 3.' },
          { type: 'p', text: '10.2. Propaxar puede terminar el servicio si el cliente incumple estos términos, comparte públicamente la URL del informe, hace uso comercial no autorizado del mismo o muestra conducta abusiva.' },
          { type: 'p', text: '10.3. Si el cliente encuentra y firma contrato antes del fin del período de 6 meses, el servicio se considera completado satisfactoriamente.' },
        ],
      },
      {
        num: '11',
        title: 'Cambios en los Términos',
        content: [
          { type: 'p', text: '11.1. Propaxar puede actualizar estos términos. Los cambios se aplicarán únicamente a nuevos encargos realizados tras la fecha de actualización.' },
          { type: 'p', text: '11.2. Los cambios relevantes se notificarán por email a clientes con servicio activo con al menos 15 días de antelación.' },
          { type: 'p', text: '11.3. Los términos vigentes están siempre disponibles en: propaxar.es/terminos-finder' },
        ],
      },
      {
        num: '12',
        title: 'Ley Aplicable y Jurisdicción',
        content: [
          { type: 'p', text: '12.1. Estos términos se rigen por las leyes del Reino de España.' },
          { type: 'p', text: '12.2. Para la resolución de cualquier controversia, las partes se someten a la jurisdicción de los Juzgados y Tribunales de Torrox (Málaga), España.' },
          { type: 'p', text: '12.3. Antes de iniciar acciones legales, ambas partes se comprometen a intentar resolver cualquier disputa mediante comunicación directa y de buena fe.' },
          { type: 'p', text: '12.4. En caso de conflicto entre versiones en distintos idiomas, prevalece la versión en español.' },
        ],
      },
      {
        num: '13',
        title: 'Información de Contacto',
        content: [
          { type: 'contact', items: [
            'Propaxar',
            'Titular: Manuel Fernández Ramírez',
            'NIF: 53371882Z',
            'Email: info@propaxar.com',
            'WhatsApp: +34 662 317 561',
            'Ubicación: Frigiliana, Málaga, España',
            'Web: propaxar.es',
          ]},
        ],
      },
    ],
  },
  en: {
    backSite: '← Back to Propaxar.es',
    title: 'Terms and Conditions of Service',
    subtitle: 'Property Finder · Propaxar',
    updated: 'Last updated: May 2026',
    indexTitle: 'Index',
    index: [
      'Service Description',
      'Price and Payment',
      'Refund Policy',
      'Report Delivery and Validity',
      'Client Responsibilities',
      'Propaxar Responsibilities',
      'Limitations of Liability',
      'Privacy and Data Protection',
      'Intellectual Property',
      'Service Termination',
      'Changes to Terms',
      'Applicable Law',
      'Contact',
    ],
    importantBox: '⚠️ By engaging the service and making payment, you expressly accept these terms, constituting a service agreement under applicable Spanish and European law.',
    contactTitle: 'Questions about these terms?',
    footerNote: 'Propaxar · Frigiliana, Málaga, Spain · propaxar.es',
    sections: [
      {
        num: '1',
        title: 'Service Description',
        content: [
          { type: 'p', text: '1.1. The Propaxar Property Finder service ("the Service") consists of personalised property search, analysis and selection in Frigiliana, Nerja and La Axarquía (Málaga, Spain) for long-term rental or purchase, tailored to the client\'s exact profile.' },
          { type: 'p', text: '1.2. The Service includes:' },
          { type: 'ul', items: [
            'Full market search: public portals, local agencies, direct contacts and unlisted properties.',
            'Selection and analysis of the best available options matching the client\'s profile.',
            'Personalised report with honest analysis of each property: area, access, neighbourhood, real costs, history.',
            'Clear professional recommendation on which option best fits the client and why.',
            'Private access to the report via unique URL for 6 months.',
            'Active follow-up for 6 months: weekly updates and WhatsApp alerts for relevant new properties.',
            'Direct access to Manuel Fernández via WhatsApp and email throughout the period.',
            'Accompaniment on viewings and negotiation support if required.',
          ]},
          { type: 'p', text: '1.3. Delivery: The report is delivered within 24 to 48 working hours from confirmation of the engagement and receipt of payment, via a unique, private and personalised URL.' },
          { type: 'p', text: '1.4. Geographic scope: The service covers Frigiliana, Nerja and La Axarquía. Coverage of additional areas may be expressly agreed with the client.' },
          { type: 'p', text: '1.5. Nature of service: Propaxar acts as an independent advisor working for the client (buyer or tenant). It does not act as an agent of the property and does not represent the interests of the owner or selling agency.' },
        ],
      },
      {
        num: '2',
        title: 'Price and Payment',
        content: [
          { type: 'highlight', text: '2.1. The service fee is agreed expressly with the client before work begins. The standard fee is €200 (two hundred euros), VAT included under applicable Spanish law. A different fee may be agreed depending on the scope of the engagement.' },
          { type: 'p', text: '2.2. Payment is made by bank transfer, Bizum or the method agreed during the initial consultation. Work begins upon receipt of payment.' },
          { type: 'p', text: '2.3. Payment is a one-time fee covering the complete initial report plus 6 months of active follow-up. There are no additional charges or subscriptions.' },
          { type: 'p', text: '2.4. Confirmation: Propaxar will confirm receipt of payment and commencement of work via WhatsApp.' },
        ],
      },
      {
        num: '3',
        title: 'Refund Policy',
        content: [
          { type: 'success', text: '3.1. FULL REFUND GUARANTEED: If the client rents or purchases a property managed directly by Propaxar ("Propaxar Direct" portfolio), the full service fee will be refunded within a maximum of 7 working days after signing the contract.' },
          { type: 'p', text: '3.2. If the client is not satisfied with the report received, they must communicate this to info@propaxar.com within 7 calendar days of delivery. Propaxar will evaluate each case individually and resolve in good faith.' },
          { type: 'p', text: '3.3. Refunds do not apply in the following cases:' },
          { type: 'ul', items: [
            'More than 7 days have passed since delivery of the report.',
            'The client has used the report to coordinate property viewings.',
            'The client finds a property through another channel (agency, portal, private landlord).',
            'The client substantially changes their search criteria after receiving the report.',
            'No available properties match the client\'s criteria — this is communicated honestly in the report and does not constitute a service defect.',
          ]},
          { type: 'p', text: '3.4. Approved refunds are processed via the original payment method within 7 to 14 working days.' },
        ],
      },
      {
        num: '4',
        title: 'Report Delivery and Validity',
        content: [
          { type: 'p', text: '4.1. The report URL remains active for 6 full months (180 calendar days) from the delivery date.' },
          { type: 'p', text: '4.2. Weekly updates include:' },
          { type: 'ul', items: [
            'New properties matching the client\'s profile.',
            'Price or condition changes on previously included properties.',
            'Removal of properties that are no longer available.',
            'Proactive WhatsApp alerts for especially relevant new properties.',
          ]},
          { type: 'p', text: '4.3. After 6 months the URL expires automatically. The client may request an updated report at the current price.' },
        ],
      },
      {
        num: '5',
        title: 'Client Responsibilities',
        content: [
          { type: 'p', text: '5.1. The client must provide accurate and complete information about their search profile: real budget, needs, dates and preferences.' },
          { type: 'p', text: '5.2. The client must respond to communications within reasonable timeframes (48-72 hours) to coordinate viewings or clarify criteria.' },
          { type: 'p', text: '5.3. The report URL is personal and non-transferable. The client must not publish it or share it beyond their partner or immediate family involved in the decision.' },
          { type: 'p', text: '5.4. Final rental or purchase decisions are the client\'s sole responsibility. The report is a professional advisory tool, not a guarantee of outcome.' },
          { type: 'p', text: '5.5. The client must carry out their own visits and inspections before committing to any property.' },
        ],
      },
      {
        num: '6',
        title: 'Propaxar Responsibilities',
        content: [
          { type: 'p', text: '6.1. Deliver the complete report within 24-48 working hours from receipt of payment.' },
          { type: 'p', text: '6.2. Provide honest, direct analysis based on real local knowledge. This includes informing the client if their expectations are unrealistic given the current market.' },
          { type: 'p', text: '6.3. Personally verify the availability of each property included in the report before delivery.' },
          { type: 'p', text: '6.4. Respond to client queries within 24 hours on working days.' },
          { type: 'p', text: '6.5. Maintain the privacy of the report URL and all client data.' },
          { type: 'p', text: '6.6. Update the report weekly for 6 months, whenever there are relevant market changes.' },
        ],
      },
      {
        num: '7',
        title: 'Limitations of Liability',
        content: [
          { type: 'p', text: '7.1. Propaxar cannot guarantee the existence of available properties that exactly match the client\'s criteria. The La Axarquía market is limited and variable. If no viable options exist, this will be communicated with complete honesty.' },
          { type: 'p', text: '7.2. Properties not directly managed by Propaxar come from other sources. Propaxar verifies the information but does not control or take responsibility for third-party decisions (owners, other agencies).' },
          { type: 'p', text: '7.3. Prices are accurate at the time of report publication but may change without notice. No price is guaranteed until the contract is signed.' },
          { type: 'p', text: '7.4. Propaxar\'s maximum liability under these terms is limited to the amount paid for the service. Propaxar is not responsible for consequential damages, loss of opportunities, travel costs, deposits paid to third parties, or problems arising from contracts signed directly with owners.' },
        ],
      },
      {
        num: '8',
        title: 'Privacy and Data Protection',
        content: [
          { type: 'p', text: '8.1. Propaxar collects and processes: full name, email, phone and search criteria, solely for the purpose of providing the contracted service.' },
          { type: 'p', text: '8.2. Data is not sold or shared with third parties for commercial purposes. It may be shared only with owners or agents to coordinate viewings, directly related to the client\'s engagement.' },
          { type: 'p', text: '8.3. Data is retained for the service period (6 months) plus 12 additional months for legal and accounting obligations.' },
          { type: 'p', text: '8.4. The client has the right of access, rectification, erasure, objection and portability under GDPR. To exercise these rights: info@propaxar.com' },
        ],
      },
      {
        num: '9',
        title: 'Intellectual Property',
        content: [
          { type: 'p', text: '9.1. The content of the report — analysis, writing, structure, recommendations — is the intellectual property of Propaxar and is protected by Spanish and international copyright law.' },
          { type: 'p', text: '9.2. The client receives a personal, non-exclusive, non-transferable licence for use exclusively in their own property search.' },
          { type: 'p', text: '9.3. Any reproduction, distribution, publication or commercial use of the report or its structure without express authorisation from Propaxar is prohibited.' },
        ],
      },
      {
        num: '10',
        title: 'Service Termination',
        content: [
          { type: 'p', text: '10.1. The client may cancel the service at any time by notifying info@propaxar.com, subject to the refund policy in section 3.' },
          { type: 'p', text: '10.2. Propaxar may terminate the service if the client breaches these terms, publicly shares the report URL, makes unauthorised commercial use of it, or displays abusive behaviour.' },
          { type: 'p', text: '10.3. If the client finds and signs a contract before the 6-month period ends, the service is considered successfully completed.' },
        ],
      },
      {
        num: '11',
        title: 'Changes to Terms',
        content: [
          { type: 'p', text: '11.1. Propaxar may update these terms. Changes apply only to new engagements made after the update date.' },
          { type: 'p', text: '11.2. Material changes will be notified by email to clients with active service at least 15 days in advance.' },
          { type: 'p', text: '11.3. The current terms are always available at: propaxar.es/terminos-finder' },
        ],
      },
      {
        num: '12',
        title: 'Applicable Law and Jurisdiction',
        content: [
          { type: 'p', text: '12.1. These terms are governed by the laws of the Kingdom of Spain.' },
          { type: 'p', text: '12.2. For the resolution of any dispute, the parties submit to the jurisdiction of the Courts of Torrox (Málaga), Spain.' },
          { type: 'p', text: '12.3. Before initiating legal action, both parties commit to attempting resolution through direct communication in good faith.' },
          { type: 'p', text: '12.4. In the event of conflict between versions in different languages, the Spanish version prevails.' },
        ],
      },
      {
        num: '13',
        title: 'Contact Information',
        content: [
          { type: 'contact', items: [
            'Propaxar',
            'Owner: Manuel Fernández Ramírez',
            'NIF: 53371882Z',
            'Email: info@propaxar.com',
            'WhatsApp: +34 662 317 561',
            'Location: Frigiliana, Málaga, Spain',
            'Website: propaxar.es',
          ]},
        ],
      },
    ],
  },
};

// ─── Component ────────────────────────────────────────────────────────────────

const TerminosFinder = () => {
  const [lang, setLang] = useState<Lang>('en');
  const t = content[lang];

  const renderContent = (item: any, idx: number) => {
    if (item.type === 'p') return (
      <p key={idx} className="text-[14px] leading-[1.75] text-gray-600 mb-3">{item.text}</p>
    );
    if (item.type === 'ul') return (
      <ul key={idx} className="mb-4 space-y-1.5">
        {item.items.map((li: string, i: number) => (
          <li key={i} className="flex items-start gap-2 text-[14px] leading-[1.65] text-gray-600">
            <span className="mt-1 text-[10px] flex-shrink-0" style={{ color: 'hsl(222,28%,30%)' }}>▸</span>
            {li}
          </li>
        ))}
      </ul>
    );
    if (item.type === 'highlight') return (
      <div key={idx} className="rounded-lg px-5 py-4 mb-4 text-[14px] leading-[1.7]"
        style={{ backgroundColor: 'hsl(222,28%,16%)', color: '#fff' }}>
        {item.text}
      </div>
    );
    if (item.type === 'success') return (
      <div key={idx} className="rounded-lg px-5 py-4 mb-4 text-[14px] leading-[1.7]"
        style={{ backgroundColor: 'hsl(142,60%,95%)', color: 'hsl(142,60%,25%)', border: '1px solid hsl(142,60%,80%)' }}>
        {item.text}
      </div>
    );
    if (item.type === 'contact') return (
      <div key={idx} className="rounded-lg px-5 py-4 mb-4 space-y-1"
        style={{ backgroundColor: 'hsl(222,28%,97%)', border: '1px solid hsl(222,28%,88%)' }}>
        {item.items.map((line: string, i: number) => (
          <p key={i} className="text-[14px] text-gray-700">{line}</p>
        ))}
      </div>
    );
    return null;
  };

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* Top bar */}
      <div className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-sm">
        <div className="max-w-[860px] mx-auto px-5 py-3 flex items-center justify-between">
          <Link to="/" className="text-[13px] text-gray-400 hover:text-gray-700 transition-colors">
            {t.backSite}
          </Link>
          <div className="flex items-center gap-1 text-[13px] font-medium text-gray-400">
            <button onClick={() => setLang('en')} className={`px-2 py-1 rounded transition-colors ${lang === 'en' ? 'text-gray-900 font-bold' : 'hover:text-gray-700'}`}>EN</button>
            <span className="opacity-30">|</span>
            <button onClick={() => setLang('es')} className={`px-2 py-1 rounded transition-colors ${lang === 'es' ? 'text-gray-900 font-bold' : 'hover:text-gray-700'}`}>ES</button>
          </div>
        </div>
      </div>

      <div className="max-w-[860px] mx-auto px-5 py-12 md:py-16">

        {/* Header */}
        <div className="mb-12">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] mb-3" style={{ color: 'hsl(222,28%,45%)' }}>
            Propaxar · Property Finder
          </p>
          <h1 className="text-[28px] md:text-[36px] font-extrabold leading-tight mb-2" style={{ color: 'hsl(222,28%,16%)' }}>
            {t.title}
          </h1>
          <p className="text-[13px] text-gray-400">{t.updated}</p>
        </div>

        {/* Important box */}
        <div className="rounded-xl px-6 py-5 mb-10 text-[13px] leading-[1.7] text-amber-800"
          style={{ backgroundColor: 'hsl(39,100%,95%)', border: '1px solid hsl(39,100%,80%)' }}>
          {t.importantBox}
        </div>

        {/* Index */}
        <div className="rounded-xl px-6 py-6 mb-12"
          style={{ backgroundColor: 'hsl(222,28%,97%)', border: '1px solid hsl(222,28%,90%)' }}>
          <p className="text-[11px] font-bold uppercase tracking-[0.15em] mb-4" style={{ color: 'hsl(222,28%,45%)' }}>
            {t.indexTitle}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1.5">
            {t.index.map((item, i) => (
              <a key={i} href={`#section-${i + 1}`}
                className="text-[13px] text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-2">
                <span className="text-[10px] font-bold" style={{ color: 'hsl(222,28%,45%)' }}>{String(i + 1).padStart(2, '0')}</span>
                {item}
              </a>
            ))}
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-12">
          {t.sections.map((section, i) => (
            <div key={i} id={`section-${i + 1}`} className="scroll-mt-20">
              <div className="flex items-baseline gap-3 mb-5">
                <span className="text-[11px] font-bold uppercase tracking-[0.15em]" style={{ color: 'hsl(222,28%,55%)' }}>
                  {section.num}
                </span>
                <h2 className="text-[18px] font-bold" style={{ color: 'hsl(222,28%,16%)' }}>
                  {section.title}
                </h2>
              </div>
              <div className="pl-0 md:pl-6 border-l-2" style={{ borderColor: 'hsl(222,28%,90%)' }}>
                {section.content.map((item, idx) => renderContent(item, idx))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 rounded-xl px-6 py-8 text-center"
          style={{ backgroundColor: 'hsl(222,28%,16%)' }}>
          <p className="text-[13px] font-semibold text-white/60 mb-2">{t.contactTitle}</p>
          <a href="mailto:info@propaxar.com"
            className="text-[15px] font-bold text-white hover:text-white/80 transition-colors">
            info@propaxar.com
          </a>
          <p className="text-[13px] text-white/40 mt-1">+34 662 317 561 · WhatsApp</p>
        </div>

        {/* Footer note */}
        <p className="text-center text-[12px] text-gray-300 mt-8">{t.footerNote}</p>
      </div>
    </div>
  );
};

export default TerminosFinder;
