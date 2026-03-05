import { useState } from 'react';
import { Link } from 'react-router-dom';

type Lang = 'es' | 'en';

// ─── Translation data ────────────────────────────────────────────────────────

const content = {
  es: {
    backSite: '← Volver a Propaxar.es',
    backFinder: '← Volver a la página principal',
    title: 'Términos y Condiciones',
    subtitle: 'Reporte de Mercado Propaxar',
    updated: 'Última actualización: 19 de febrero de 2026',
    indexTitle: 'Índice Rápido',
    index: [
      'Descripción del Servicio',
      'Precio y Pago',
      'Política de Reembolso',
      'Actualizaciones y Validez',
      'Responsabilidades del Cliente',
      'Responsabilidades de Propaxar',
      'Limitaciones y Exenciones',
      'Privacidad y Datos',
      'Propiedad Intelectual',
      'Terminación',
      'Cambios en los Términos',
      'Ley Aplicable',
      'Contacto',
    ],
    importantBox: '⚠️ IMPORTANTE: Al marcar la casilla de aceptación y realizar el pago, aceptas estos términos de forma electrónica, constituyendo un contrato legalmente vinculante conforme a la legislación española y europea vigente.',
    acceptTitle: 'Aceptación de Términos',
    acceptText: 'Al proceder con la compra del Reporte de Mercado Propaxar, el cliente declara haber leído, entendido y aceptado íntegramente estos Términos y Condiciones.',
    contactTitle: '¿Preguntas sobre estos términos?',
    footerNote: 'Propaxar · Frigiliana, Málaga, España · propaxar.es',
    sections: [
      {
        num: '1',
        title: 'Descripción del Servicio',
        content: [
          { type: 'p', text: '1.1. El Reporte de Mercado Propaxar ("el Servicio") es un análisis personalizado del mercado inmobiliario de alquileres de larga temporada en Frigiliana y zonas circundantes (Axarquía, Málaga, España).' },
          { type: 'p', text: '1.2. El Servicio incluye:' },
          { type: 'ul', items: [
            'Reporte personalizado con todas las propiedades disponibles, típicamente de 1-8 según las preferencias del cliente y la disponibilidad del mercado en el momento de la generación del reporte.',
            'Análisis profesional adaptado a criterios específicos del cliente (presupuesto, dormitorios, mascotas, fecha de entrada)',
            'Información privilegiada sobre logística de vida rural vs pueblo',
            'Análisis honesto del mercado actual y precios reales',
            '6 meses de seguimiento activo con actualizaciones semanales',
            'Acceso directo a Manuel Fernández (prestador del servicio) vía WhatsApp y email',
          ]},
          { type: 'p', text: '1.3. Entrega: Los reportes se entregan en 24-48 horas laborables tras la compra mediante una URL única, privada y personalizada accesible solo para el cliente.' },
          { type: 'p', text: '1.4. Alcance geográfico: El servicio cubre exclusivamente Frigiliana pueblo y zonas rurales circundantes (diseminados, campo). No incluye otras localidades de la Axarquía salvo mención expresa.' },
        ],
      },
      {
        num: '2',
        title: 'Precio y Pago',
        content: [
          { type: 'highlight', text: '2.1. Tarifa única: €180 (ciento ochenta euros). IVA incluido según legislación española vigente.' },
          { type: 'p', text: '2.2. Método de pago: Procesamiento seguro vía Stripe. Se aceptan tarjetas de crédito y débito Visa, Mastercard, American Express.' },
          { type: 'p', text: '2.3. Sin cargos recurrentes: El pago único de €180 cubre el reporte inicial completo más 6 meses de actualizaciones semanales. No existen suscripciones ni cargos adicionales.' },
          { type: 'p', text: '2.4. Moneda: Todos los precios están expresados en Euros (EUR). Conversiones de otras divisas según tipo de cambio del procesador de pago.' },
          { type: 'p', text: '2.5. Confirmación: Una vez completado el pago, el cliente recibe confirmación automática por email con recibo oficial. Propaxar confirma adicionalmente por WhatsApp el inicio del trabajo.' },
        ],
      },
      {
        num: '3',
        title: 'Política de Reembolso',
        content: [
          { type: 'success', text: '3.1. REEMBOLSO TOTAL GARANTIZADO (Propaxar Direct): Si el cliente alquila cualquier propiedad gestionada directamente por Propaxar (portfolio "Propaxar Direct"), se reembolsarán los €180 completos del coste del reporte en un plazo máximo de 7 días hábiles tras la firma del contrato de arrendamiento.' },
          { type: 'p', text: '3.2. Garantía de satisfacción: Si el cliente no está satisfecho con la calidad o contenido del reporte, debe contactar a info@propaxar.com dentro de los 7 días naturales siguientes a la entrega del reporte para discutir una resolución. Los reembolsos serán evaluados caso por caso.' },
          { type: 'p', text: '3.3. Condiciones que NO califican para reembolso:' },
          { type: 'ul', items: [
            'Han transcurrido más de 7 días desde la entrega del reporte',
            'El cliente ya ha utilizado el reporte para coordinar visitas a propiedades',
            'El cliente encuentra propiedad a través de otra agencia, portal o propietario directo',
            'El cliente cambia sus criterios de búsqueda significativamente después de recibir el reporte',
            'No existen propiedades disponibles que cumplan los criterios del cliente (esto se informa en el reporte, no es defecto del servicio)',
          ]},
          { type: 'p', text: '3.4. Proceso de reembolso: Los reembolsos aprobados se procesan a la misma tarjeta/método de pago usado en la compra original en un plazo de 7-14 días hábiles.' },
        ],
      },
      {
        num: '4',
        title: 'Actualizaciones y Validez del Reporte',
        content: [
          { type: 'p', text: '4.1. Vigencia: La URL del reporte permanece activa y accesible durante 6 meses completos (180 días naturales) desde la fecha de compra.' },
          { type: 'p', text: '4.2. Actualizaciones semanales incluyen:' },
          { type: 'ul', items: [
            'Nuevas propiedades que coinciden con los criterios del cliente',
            'Cambios de precios en propiedades incluidas previamente',
            'Eliminación de propiedades ya alquiladas o no disponibles',
            'Insights y tendencias actuales del mercado Frigiliana',
            'Alertas proactivas por WhatsApp si aparece una propiedad especialmente relevante',
          ]},
          { type: 'p', text: '4.3. Frecuencia: Las actualizaciones se realizan típicamente los viernes. Algunas semanas pueden no tener cambios significativos si el mercado permanece estable.' },
          { type: 'p', text: '4.4. Después de 6 meses: La URL del reporte expira automáticamente. El cliente puede comprar un nuevo reporte actualizado al precio vigente en ese momento.' },
        ],
      },
      {
        num: '5',
        title: 'Responsabilidades del Cliente',
        content: [
          { type: 'p', text: '5.1. Información precisa: El cliente debe proporcionar información veraz y completa sobre sus criterios de búsqueda: presupuesto real, número mínimo de dormitorios, necesidad de permitir mascotas, fecha de entrada deseada y cualquier otra preferencia relevante.' },
          { type: 'p', text: '5.2. Comunicación activa: El cliente debe responder a mensajes de WhatsApp y emails en plazos razonables (48-72 horas) para coordinar visitas, aclarar dudas o confirmar cambios en sus criterios.' },
          { type: 'p', text: '5.3. Privacidad de la URL: La URL del reporte es privada, personal e intransferible. El cliente no debe compartirla públicamente. Puede compartirla con pareja/familia directa involucrada en la decisión de alquiler.' },
          { type: 'p', text: '5.4. Decisión independiente: El cliente reconoce que el reporte es para fines informativos y de asesoramiento profesional. Las decisiones finales de alquiler son única y exclusivamente responsabilidad del cliente.' },
          { type: 'p', text: '5.5. Verificación personal: Aunque Propaxar verifica la información de las propiedades, el cliente debe realizar sus propias visitas e inspecciones antes de comprometerse con cualquier alquiler.' },
        ],
      },
      {
        num: '6',
        title: 'Responsabilidades de Propaxar',
        content: [
          { type: 'p', text: '6.1. Entrega puntual: Entregar el reporte completo en un plazo de 24-48 horas laborables desde el pago, con información precisa y verificada según las condiciones del mercado en el momento de creación.' },
          { type: 'p', text: '6.2. Análisis honesto: Proporcionar análisis honesto, directo y profesional basado en experiencia real y conocimiento local de más de 10 años. Esto incluye informar al cliente si sus expectativas no son realistas.' },
          { type: 'p', text: '6.3. Privacidad: Mantener la privacidad y seguridad de la URL del reporte. No compartir con terceros sin consentimiento del cliente.' },
          { type: 'p', text: '6.4. Disponibilidad: Responder a consultas del cliente en un plazo de 24 horas durante días laborables (lunes a viernes).' },
          { type: 'p', text: '6.5. Actualizaciones consistentes: Actualizar el reporte semanalmente (típicamente viernes) durante los 6 meses de vigencia, siempre que existan cambios relevantes en el mercado.' },
          { type: 'p', text: '6.6. Verificación de disponibilidad: Antes de incluir propiedades en el reporte, Propaxar verifica personalmente su disponibilidad real mediante contacto directo con propietarios o agentes gestores.' },
        ],
      },
      {
        num: '7',
        title: 'Limitaciones y Exenciones de Responsabilidad',
        content: [
          { type: 'p', text: '7.1. Disponibilidad de mercado: Propaxar NO puede garantizar que existan propiedades disponibles que cumplan exactamente los criterios del cliente. El mercado de alquileres larga temporada en Frigiliana rural es limitado. Si no existen opciones viables, esto se informará honestamente en el reporte.' },
          { type: 'p', text: '7.2. Propiedades de terceros: Las propiedades NO gestionadas por Propaxar provienen de portales públicos y otras agencias. Propaxar verifica esta información pero no controla su origen.' },
          { type: 'p', text: '7.3. Cambios de precio: Los precios de alquiler pueden cambiar sin previo aviso. Los precios en el reporte son precisos en el momento de publicación pero NO están garantizados hasta la firma del contrato.' },
          { type: 'p', text: '7.4. Sin garantía de resultado: Propaxar NO garantiza que el cliente encontrará o asegurará una propiedad de alquiler.' },
          { type: 'p', text: '7.5. Limitación de responsabilidad: La responsabilidad total de Propaxar bajo estos términos se limita estrictamente al importe pagado por el servicio (€180). Propaxar NO es responsable por:' },
          { type: 'ul', items: [
            'Daños consecuentes o indirectos',
            'Pérdida de oportunidades de alquiler',
            'Gastos de alojamiento temporal incurridos',
            'Costes de viajes de búsqueda de vivienda',
            'Pérdida de depósitos pagados a propietarios',
            'Problemas derivados de contratos firmados directamente con propietarios',
          ]},
        ],
      },
      {
        num: '8',
        title: 'Privacidad y Protección de Datos',
        content: [
          { type: 'p', text: '8.1. Datos recopilados: Propaxar recopila y procesa nombre completo, email, número de teléfono WhatsApp, y criterios de búsqueda de vivienda.' },
          { type: 'p', text: '8.2. Uso de datos: Los datos personales se utilizan exclusivamente para proporcionar el Servicio contratado y comunicación directa relacionada con la búsqueda de vivienda.' },
          { type: 'p', text: '8.3. Compartir con terceros: Los datos NO se venden ni comparten con terceros para fines comerciales. Pueden compartirse únicamente con propietarios (para coordinar visitas), otras agencias (si gestionan una propiedad de interés) o procesadores de pago (Stripe).' },
          { type: 'p', text: '8.4. Retención de datos: Los datos se conservan durante la vigencia del servicio (6 meses) más 12 meses adicionales para cumplir obligaciones legales y contables.' },
          { type: 'p', text: '8.5. Derechos del cliente (RGPD): Acceso, rectificación, eliminación ("derecho al olvido"), oposición al procesamiento y portabilidad de datos. Para ejercer estos derechos: info@propaxar.com' },
        ],
      },
      {
        num: '9',
        title: 'Propiedad Intelectual',
        content: [
          { type: 'p', text: '9.1. Derechos de autor: El contenido del reporte (análisis, redacción, estructura, diseño, recomendaciones, insights) es propiedad intelectual de Propaxar y está protegido por leyes de derechos de autor españolas e internacionales.' },
          { type: 'p', text: '9.2. Licencia de uso: Al comprar el servicio, el cliente recibe una licencia personal, no exclusiva, intransferible y no comercial para usar el reporte únicamente para su propia búsqueda de vivienda en Frigiliana.' },
          { type: 'p', text: '9.3. Prohibiciones: El cliente NO puede revender, redistribuir públicamente, publicar online, usar con fines comerciales, ni copiar la estructura del reporte.' },
        ],
      },
      {
        num: '10',
        title: 'Terminación del Servicio',
        content: [
          { type: 'p', text: '10.1. Terminación por el cliente: El cliente puede cancelar el servicio en cualquier momento enviando email a info@propaxar.com. Sin embargo, no se realizarán reembolsos después de 7 días desde la entrega del reporte, excepto en los casos especificados en la sección 3.1.' },
          { type: 'p', text: '10.2. Terminación por Propaxar: Propaxar se reserva el derecho de terminar el servicio si el cliente viola estos términos, comparte públicamente la URL del reporte, usa el servicio con fines comerciales no autorizados, o muestra conducta abusiva.' },
          { type: 'p', text: '10.3. Finalización exitosa: Si el cliente encuentra y alquila una vivienda antes del fin de los 6 meses, el servicio se considera completado exitosamente.' },
        ],
      },
      {
        num: '11',
        title: 'Cambios en los Términos',
        content: [
          { type: 'p', text: '11.1. Propaxar puede actualizar estos términos periódicamente. Los cambios aplican SOLO a nuevas compras realizadas después de la fecha de actualización.' },
          { type: 'p', text: '11.2. Los cambios significativos se notificarán por email a clientes con servicio activo con al menos 15 días de antelación.' },
          { type: 'p', text: '11.3. Los términos vigentes siempre están disponibles en: propaxar.es/terminos-finder' },
        ],
      },
      {
        num: '12',
        title: 'Ley Aplicable y Jurisdicción',
        content: [
          { type: 'p', text: '12.1. Estos términos y condiciones se rigen por las leyes del Reino de España.' },
          { type: 'p', text: '12.2. Para la resolución de cualquier controversia, las partes se someten a la jurisdicción de los Juzgados y Tribunales de Torrox (Málaga), España.' },
          { type: 'p', text: '12.3. Antes de iniciar acciones legales, las partes se comprometen a intentar resolver cualquier disputa de buena fe mediante comunicación directa.' },
          { type: 'p', text: '12.4. La versión en español de estos términos prevalece en caso de conflicto o ambigüedad con traducciones a otros idiomas.' },
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
            'Web: propaxar.es | propaxar.com',
            'Horario: Lunes a Viernes, 9:00–19:00 (CET/CEST). Respuesta típica en 24h laborables.',
          ]},
        ],
      },
    ],
  },
  en: {
    backSite: '← Back to Propaxar.es',
    backFinder: '← Back to main page',
    title: 'Terms and Conditions',
    subtitle: 'Propaxar Market Report',
    updated: 'Last updated: February 19, 2026',
    indexTitle: 'Quick Index',
    index: [
      'Service Description',
      'Price and Payment',
      'Refund Policy',
      'Updates and Validity',
      'Client Responsibilities',
      'Propaxar Responsibilities',
      'Limitations and Disclaimers',
      'Privacy and Data',
      'Intellectual Property',
      'Termination',
      'Changes to Terms',
      'Applicable Law',
      'Contact',
    ],
    importantBox: '⚠️ IMPORTANT: By checking the acceptance box and making the payment, you accept these terms electronically, constituting a legally binding contract under current Spanish and European legislation.',
    acceptTitle: 'Acceptance of Terms',
    acceptText: 'By proceeding with the purchase of the Propaxar Market Report, the client declares to have read, understood and fully accepted these Terms and Conditions.',
    contactTitle: 'Questions about these terms?',
    footerNote: 'Propaxar · Frigiliana, Málaga, Spain · propaxar.es',
    sections: [
      {
        num: '1',
        title: 'Service Description',
        content: [
          { type: 'p', text: '1.1. The Propaxar Market Report ("the Service") is a personalised analysis of the long-term rental real estate market in Frigiliana and surrounding areas (Axarquía, Málaga, Spain).' },
          { type: 'p', text: '1.2. The Service includes:' },
          { type: 'ul', items: [
            'Personalised report with all available properties, typically 1-8 depending on the client\'s preferences and market availability at the time of report generation.',
            'Professional analysis tailored to the client\'s specific criteria (budget, bedrooms, pets, move-in date)',
            'Insider information on rural vs. town living logistics',
            'Honest analysis of the current market and real prices',
            '6 months of active follow-up with weekly updates',
            'Direct access to Manuel Fernández (service provider) via WhatsApp and email',
          ]},
          { type: 'p', text: '1.3. Delivery: Reports are delivered within 24-48 business hours after purchase via a unique, private, personalised URL accessible only to the client.' },
          { type: 'p', text: '1.4. Geographic scope: The service covers exclusively Frigiliana village and surrounding rural areas. It does not include other Axarquía towns unless expressly mentioned.' },
        ],
      },
      {
        num: '2',
        title: 'Price and Payment',
        content: [
          { type: 'highlight', text: '2.1. One-time fee: €180 (one hundred and eighty euros). VAT included under current Spanish legislation.' },
          { type: 'p', text: '2.2. Payment method: Secure processing via Stripe. Visa, Mastercard, and American Express credit and debit cards accepted.' },
          { type: 'p', text: '2.3. No recurring charges: The one-time €180 payment covers the complete initial report plus 6 months of weekly updates. No subscriptions or additional charges exist.' },
          { type: 'p', text: '2.4. Currency: All prices are expressed in Euros (EUR). Conversions from other currencies are subject to the payment processor\'s exchange rate.' },
          { type: 'p', text: '2.5. Confirmation: Once payment is completed, the client receives automatic email confirmation with official receipt. Propaxar additionally confirms via WhatsApp that work has begun.' },
        ],
      },
      {
        num: '3',
        title: 'Refund Policy',
        content: [
          { type: 'success', text: '3.1. FULL REFUND GUARANTEED (Propaxar Direct): If the client rents any property managed directly by Propaxar ("Propaxar Direct" portfolio), the full €180 report cost will be refunded within a maximum of 7 business days after signing the rental contract.' },
          { type: 'p', text: '3.2. Satisfaction guarantee: If the client is not satisfied with the quality or content of the report, they must contact info@propaxar.com within 7 calendar days of report delivery to discuss a resolution. Refunds will be evaluated case by case.' },
          { type: 'p', text: '3.3. Conditions that do NOT qualify for a refund:' },
          { type: 'ul', items: [
            'More than 7 days have passed since report delivery',
            'The client has already used the report to coordinate property visits',
            'The client finds a property through another agency, portal, or direct owner',
            'The client significantly changes their search criteria after receiving the report',
            'No properties are available matching the client\'s criteria (this is reported honestly, it is not a service defect)',
          ]},
          { type: 'p', text: '3.4. Refund process: Approved refunds are processed to the same card/payment method used in the original purchase within 7-14 business days.' },
        ],
      },
      {
        num: '4',
        title: 'Report Updates and Validity',
        content: [
          { type: 'p', text: '4.1. Validity: The report URL remains active and accessible for 6 full months (180 calendar days) from the date of purchase.' },
          { type: 'p', text: '4.2. Weekly updates include:' },
          { type: 'ul', items: [
            'New properties matching the client\'s criteria',
            'Price changes for previously included properties',
            'Removal of already-rented or unavailable properties',
            'Current Frigiliana market insights and trends',
            'Proactive WhatsApp alerts if a particularly relevant property appears',
          ]},
          { type: 'p', text: '4.3. Frequency: Updates are typically made on Fridays. Some weeks may have no significant changes if the market remains stable.' },
          { type: 'p', text: '4.4. After 6 months: The report URL expires automatically. The client may purchase a new updated report at the then-current price.' },
        ],
      },
      {
        num: '5',
        title: 'Client Responsibilities',
        content: [
          { type: 'p', text: '5.1. Accurate information: The client must provide truthful and complete information about their search criteria: actual budget, minimum number of bedrooms, pet requirements, desired move-in date and any other relevant preferences.' },
          { type: 'p', text: '5.2. Active communication: The client must respond to WhatsApp messages and emails within reasonable timeframes (48-72 hours) to coordinate visits, clarify doubts or confirm changes in criteria.' },
          { type: 'p', text: '5.3. URL privacy: The report URL is private, personal and non-transferable. The client must not share it publicly. It may be shared with a partner/direct family involved in the rental decision.' },
          { type: 'p', text: '5.4. Independent decision: The client acknowledges that the report is for informational and professional advisory purposes. Final rental decisions are solely and exclusively the client\'s responsibility.' },
          { type: 'p', text: '5.5. Personal verification: Although Propaxar verifies property information, the client must conduct their own visits and inspections before committing to any rental.' },
        ],
      },
      {
        num: '6',
        title: 'Propaxar Responsibilities',
        content: [
          { type: 'p', text: '6.1. Timely delivery: Deliver the complete report within 24-48 business hours from payment, with accurate and verified information according to market conditions at the time of creation.' },
          { type: 'p', text: '6.2. Honest analysis: Provide honest, direct and professional analysis based on real experience and over 10 years of local knowledge. This includes informing the client if their expectations are unrealistic.' },
          { type: 'p', text: '6.3. Privacy: Maintain the privacy and security of the report URL. Not share with third parties without the client\'s consent.' },
          { type: 'p', text: '6.4. Availability: Respond to client queries within 24 hours on business days (Monday to Friday).' },
          { type: 'p', text: '6.5. Consistent updates: Update the report weekly (typically Fridays) during the 6-month validity period, whenever there are relevant changes in the market.' },
          { type: 'p', text: '6.6. Availability verification: Before including properties in the report, Propaxar personally verifies their actual availability through direct contact with owners or managing agents.' },
        ],
      },
      {
        num: '7',
        title: 'Limitations and Disclaimers',
        content: [
          { type: 'p', text: '7.1. Market availability: Propaxar CANNOT guarantee that properties exist that exactly match the client\'s criteria. If no viable options exist, this will be honestly reported.' },
          { type: 'p', text: '7.2. Third-party properties: Properties NOT managed by Propaxar come from public portals and other agencies. Propaxar verifies this information but does not control its source.' },
          { type: 'p', text: '7.3. Price changes: Rental prices may change without notice. Prices in the report are accurate at the time of publication but are NOT guaranteed until the contract is signed.' },
          { type: 'p', text: '7.4. No guaranteed outcome: Propaxar does NOT guarantee that the client will find or secure a rental property.' },
          { type: 'p', text: '7.5. Limitation of liability: Propaxar\'s total liability under these terms is strictly limited to the amount paid for the service (€180). Propaxar is NOT responsible for:' },
          { type: 'ul', items: [
            'Consequential or indirect damages',
            'Lost rental opportunities',
            'Temporary accommodation expenses incurred',
            'House-hunting travel costs',
            'Loss of deposits paid to owners',
            'Issues arising from contracts signed directly with owners',
          ]},
        ],
      },
      {
        num: '8',
        title: 'Privacy and Data Protection',
        content: [
          { type: 'p', text: '8.1. Data collected: Propaxar collects and processes full name, email, WhatsApp phone number, and housing search criteria.' },
          { type: 'p', text: '8.2. Data use: Personal data is used exclusively to provide the contracted Service and direct communication related to the housing search.' },
          { type: 'p', text: '8.3. Third-party sharing: Data is NOT sold or shared with third parties for commercial purposes. It may only be shared with property owners (to coordinate visits), other agencies (if they manage a property of interest), or payment processors (Stripe).' },
          { type: 'p', text: '8.4. Data retention: Data is retained during the service period (6 months) plus an additional 12 months to meet legal and accounting obligations.' },
          { type: 'p', text: '8.5. Client rights (GDPR): Access, rectification, deletion ("right to be forgotten"), objection to processing, and data portability. To exercise these rights: info@propaxar.com' },
        ],
      },
      {
        num: '9',
        title: 'Intellectual Property',
        content: [
          { type: 'p', text: '9.1. Copyright: The report content (analysis, writing, structure, design, recommendations, insights) is the intellectual property of Propaxar and is protected by Spanish and international copyright laws.' },
          { type: 'p', text: '9.2. Licence of use: By purchasing the service, the client receives a personal, non-exclusive, non-transferable and non-commercial licence to use the report solely for their own housing search in Frigiliana.' },
          { type: 'p', text: '9.3. Prohibitions: The client may NOT resell, publicly redistribute, publish online, use for commercial purposes, or copy the structure of the report.' },
        ],
      },
      {
        num: '10',
        title: 'Service Termination',
        content: [
          { type: 'p', text: '10.1. Termination by the client: The client may cancel the service at any time by emailing info@propaxar.com. However, no refunds will be made after 7 days from report delivery, except in the cases specified in section 3.1.' },
          { type: 'p', text: '10.2. Termination by Propaxar: Propaxar reserves the right to terminate the service if the client violates these terms, publicly shares the report URL, uses the service for unauthorised commercial purposes, or shows abusive conduct.' },
          { type: 'p', text: '10.3. Successful completion: If the client finds and rents a property before the end of the 6 months, the service is considered successfully completed.' },
        ],
      },
      {
        num: '11',
        title: 'Changes to Terms',
        content: [
          { type: 'p', text: '11.1. Propaxar may update these terms periodically. Changes apply ONLY to new purchases made after the update date.' },
          { type: 'p', text: '11.2. Significant changes will be notified by email to clients with active service at least 15 days in advance.' },
          { type: 'p', text: '11.3. Current terms are always available at: propaxar.es/terminos-finder' },
        ],
      },
      {
        num: '12',
        title: 'Applicable Law and Jurisdiction',
        content: [
          { type: 'p', text: '12.1. These terms and conditions are governed by the laws of the Kingdom of Spain.' },
          { type: 'p', text: '12.2. For the resolution of any dispute, the parties submit to the jurisdiction of the Courts of Torrox (Málaga), Spain.' },
          { type: 'p', text: '12.3. Before initiating legal action, the parties commit to attempting to resolve any dispute in good faith through direct communication.' },
          { type: 'p', text: '12.4. The Spanish version of these terms prevails in case of conflict or ambiguity with translations to other languages.' },
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
            'Web: propaxar.es | propaxar.com',
            'Hours: Monday to Friday, 9:00–19:00 (CET/CEST). Typical response within 24 business hours.',
          ]},
        ],
      },
    ],
  },
};

// ─── Content block renderer ───────────────────────────────────────────────────

function ContentBlock({ block }: { block: { type: string; text?: string; items?: string[] } }) {
  if (block.type === 'p') {
    return <p className="mb-3 text-gray-700 leading-relaxed">{block.text}</p>;
  }
  if (block.type === 'ul') {
    return (
      <ul className="mb-4 space-y-1.5 ml-1">
        {block.items?.map((item, i) => (
          <li key={i} className="flex gap-2 text-gray-700">
            <span className="text-blue-500 mt-1 flex-shrink-0">▸</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }
  if (block.type === 'highlight') {
    return (
      <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-lg p-4 mb-4">
        <p className="text-blue-800 font-semibold">{block.text}</p>
      </div>
    );
  }
  if (block.type === 'success') {
    return (
      <div className="bg-green-50 border-2 border-green-400 rounded-xl p-5 mb-4">
        <p className="text-green-800 font-semibold leading-relaxed">{block.text}</p>
      </div>
    );
  }
  if (block.type === 'contact') {
    return (
      <div className="bg-gray-50 rounded-xl p-5 space-y-1.5">
        {block.items?.map((item, i) => (
          <p key={i} className={`text-gray-700 ${i === 0 ? 'font-bold text-blue-700 text-lg' : ''}`}>
            {item.includes('info@propaxar.com')
              ? <>{item.replace('info@propaxar.com', '')}<a href="mailto:info@propaxar.com" className="text-blue-600 underline">info@propaxar.com</a></>
              : item.includes('+34 662 317 561')
              ? <>{item.replace('+34 662 317 561', '')}<a href="https://wa.me/34662317561" className="text-green-600 underline">+34 662 317 561</a></>
              : item
            }
          </p>
        ))}
      </div>
    );
  }
  return null;
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function TerminosFinder() {
  const [lang, setLang] = useState<Lang>(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get('lang') === 'en') return 'en';
      const saved = localStorage.getItem('propaxar-language');
      return saved === 'en' ? 'en' : 'es';
    } catch { return 'es'; }
  });

  const [openSection, setOpenSection] = useState<number | null>(null);
  const C = content[lang];

  const toggleSection = (i: number) => setOpenSection(openSection === i ? null : i);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* ── Sticky header ── */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <a href="https://propaxar.es" className="text-xl font-black text-blue-700 tracking-tight hover:opacity-80 transition">
            PROPAXAR
          </a>

          <div className="flex items-center gap-3">
            {/* Nav links */}
            <div className="hidden sm:flex gap-3 text-sm">
              <a href="https://propaxar.es" className="text-gray-500 hover:text-blue-600 transition">{C.backSite}</a>
              <Link to="/finder" className="text-gray-500 hover:text-blue-600 transition">{C.backFinder}</Link>
            </div>
            {/* Language toggle */}
            <div className="flex rounded-lg overflow-hidden border border-gray-200 text-sm font-semibold">
              <button
                onClick={() => setLang('es')}
                className={`px-3 py-1.5 transition ${lang === 'es' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              >🇪🇸 ES</button>
              <button
                onClick={() => setLang('en')}
                className={`px-3 py-1.5 transition ${lang === 'en' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              >🇬🇧 EN</button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-10">
        {/* ── Page header ── */}
        <div className="text-center mb-10">
          <div className="inline-block bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
            {C.subtitle}
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">{C.title}</h1>
          <p className="text-sm text-gray-500">{C.updated}</p>
        </div>

        {/* ── Important notice ── */}
        <div className="bg-amber-50 border border-amber-300 rounded-xl p-4 mb-8 text-sm text-amber-800 leading-relaxed">
          {C.importantBox}
        </div>

        <div className="grid md:grid-cols-[260px_1fr] gap-8 items-start">
          {/* ── Sticky index sidebar ── */}
          <aside className="hidden md:block sticky top-[73px]">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">{C.indexTitle}</p>
              <nav className="space-y-1">
                {C.index.map((label, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setOpenSection(i);
                      document.getElementById(`section-${i}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    className="w-full text-left text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg px-3 py-1.5 transition flex gap-2"
                  >
                    <span className="text-blue-400 font-bold w-5 flex-shrink-0">{i + 1}.</span>
                    {label}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* ── Sections ── */}
          <div className="space-y-3">
            {C.sections.map((section, i) => (
              <div
                key={i}
                id={`section-${i}`}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden scroll-mt-20"
              >
                {/* Section header / trigger */}
                <button
                  onClick={() => toggleSection(i)}
                  className="w-full flex items-center justify-between gap-3 px-6 py-5 text-left hover:bg-gray-50 transition"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-black flex items-center justify-center flex-shrink-0">
                      {section.num}
                    </span>
                    <span className="font-bold text-gray-900">{section.title}</span>
                  </div>
                  <span className={`text-gray-400 transition-transform duration-200 text-lg ${openSection === i ? 'rotate-180' : ''}`}>
                    ▾
                  </span>
                </button>

                {/* Collapsible content */}
                {openSection === i && (
                  <div className="px-6 pb-6 pt-1 border-t border-gray-100">
                    {section.content.map((block, j) => (
                      <ContentBlock key={j} block={block as { type: string; text?: string; items?: string[] }} />
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* ── Acceptance box ── */}
            <div className="bg-blue-700 rounded-2xl p-6 text-white text-center">
              <h3 className="text-lg font-black mb-2">{C.acceptTitle}</h3>
              <p className="text-blue-100 text-sm leading-relaxed">{C.acceptText}</p>
            </div>
          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-200 bg-white mt-12 py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="font-bold text-blue-700 mb-1">{C.contactTitle}</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm mt-2">
            <a href="mailto:info@propaxar.com" className="text-blue-600 hover:underline">📧 info@propaxar.com</a>
            <a href="https://wa.me/34662317561" className="text-green-600 hover:underline">💬 +34 662 317 561</a>
          </div>
          <p className="text-gray-400 text-xs mt-4">{C.footerNote}</p>
        </div>
      </footer>
    </div>
  );
}
