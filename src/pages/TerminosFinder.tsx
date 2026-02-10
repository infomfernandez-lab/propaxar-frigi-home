const TerminosFinder = () => {
  return (
    <div className="min-h-screen bg-[#f5f5f5] py-5 px-5" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      <div className="max-w-[900px] mx-auto bg-white p-8 md:p-[60px] rounded-lg shadow-md">
        {/* Header */}
        <div className="text-center mb-12 pb-8 border-b-[3px] border-[#2c5282]">
          <p className="text-[32px] font-bold text-[#2c5282] mb-2">PROPAXAR</p>
          <h1 className="text-2xl md:text-[32px] font-bold text-[#2c5282] mb-2">Términos y Condiciones del Servicio</h1>
          <p className="text-xl text-[#2c5282]">Property Finder Service</p>
          <p className="text-[#666] text-sm mt-2">Última actualización: 10 de febrero de 2026</p>
        </div>

        {/* Important notice */}
        <div className="bg-[#fffbeb] border-l-4 border-[#ffd700] p-5 my-6">
          <p><strong className="text-[#d97706]">IMPORTANTE:</strong> Al marcar la casilla de aceptación y realizar el pago, usted está aceptando estos términos y condiciones de forma electrónica, lo cual constituye un contrato legalmente vinculante conforme a la legislación española y europea vigente.</p>
        </div>

        {/* 1. IDENTIFICACIÓN */}
        <h2 className="text-2xl text-[#2c5282] mt-10 mb-5 pb-2 border-b-2 border-[#e2e8f0]">1. IDENTIFICACIÓN DE LAS PARTES</h2>

        <h3 className="text-lg text-[#2c5282] mt-8 mb-4">1.1. El Prestador del Servicio</h3>
        <p className="mb-4 text-justify">
          Nombre comercial: Propaxar<br />
          Titular: Manuel Fernández Ramírez<br />
          NIF: 53371882Z<br />
          Domicilio: Frigiliana, 29788 Málaga, España<br />
          Email: info@propaxar.com<br />
          Teléfono/WhatsApp: +34 662 317 561<br />
          Actividad: Consultoría inmobiliaria y servicio de búsqueda de propiedades
        </p>

        <h3 className="text-lg text-[#2c5282] mt-8 mb-4">1.2. El Cliente</h3>
        <p className="mb-4 text-justify">La persona física o jurídica que contrata el servicio mediante la aceptación electrónica de estos términos y el pago correspondiente a través de la plataforma de pago segura.</p>

        {/* 2. OBJETO */}
        <h2 className="text-2xl text-[#2c5282] mt-10 mb-5 pb-2 border-b-2 border-[#e2e8f0]">2. OBJETO DEL CONTRATO</h2>
        <p className="mb-4 text-justify">El presente contrato tiene por objeto la prestación del "Property Finder Service", que consiste en un servicio profesional de búsqueda, selección y coordinación de propiedades inmobiliarias para alquiler en la región de La Axarquía, provincia de Málaga, España.</p>

        <h3 className="text-lg text-[#2c5282] mt-8 mb-4">2.1. Servicios Incluidos</h3>
        <p className="mb-4">El servicio comprende las siguientes actuaciones por parte del prestador:</p>
        <ul className="list-disc ml-8 mb-5 space-y-2">
          <li><strong>Búsqueda exhaustiva de mercado:</strong> Rastreo completo de propiedades disponibles en portales inmobiliarios (Idealista, Fotocasa, etc.), agencias locales y propiedades off-market de la red de contactos del prestador.</li>
          <li><strong>Selección personalizada:</strong> Preselección de 15 propiedades candidatas iniciales y selección final de las 10 mejores propiedades que cumplan los criterios específicos del cliente.</li>
          <li><strong>Análisis profesional:</strong> Evaluación de cada propiedad seleccionada incluyendo valoración de precio, ubicación, estado, características y recomendaciones profesionales basadas en 10 años de experiencia local.</li>
          <li><strong>Coordinación de visitas:</strong> Organización y coordinación completa de las visitas a las propiedades seleccionadas con propietarios y/o agentes.</li>
          <li><strong>Asesoramiento durante el proceso:</strong> Consultoría profesional durante todo el proceso de búsqueda y visualización.</li>
          <li><strong>Apoyo en negociación:</strong> Asistencia en la negociación de condiciones de alquiler (si procede).</li>
        </ul>

        {/* Price box */}
        <div className="bg-[#f0f9ff] border-2 border-[#3b82f6] p-6 my-8 rounded-lg">
          <h3 className="text-lg font-bold text-[#1e40af] mb-4">2.2. Estructura de Precios y Pagos</h3>

          <p className="font-bold mb-2">PAGO INICIAL - €180 (IVA incluido)</p>
          <ul className="list-disc ml-8 mb-4 space-y-1">
            <li>Pago único e inmediato al contratar el servicio</li>
            <li><strong>NO REEMBOLSABLE</strong> bajo ninguna circunstancia</li>
            <li>Este pago cubre todo el trabajo de búsqueda, selección y coordinación descrito en el apartado 2.1</li>
            <li>Se realiza a través de la pasarela de pago segura Stripe</li>
          </ul>

          <p className="font-bold mb-2">PAGO FINAL - €220 (IVA incluido)</p>
          <ul className="list-disc ml-8 mb-4 space-y-1">
            <li>Este pago adicional es exigible ÚNICAMENTE si el cliente decide formalizar el alquiler de una propiedad presentada por el prestador</li>
            <li>Se realiza en el momento de la firma del contrato de alquiler o en un plazo máximo de 48 horas posterior</li>
            <li>Si el cliente NO alquila ninguna propiedad presentada, NO se exige este pago</li>
          </ul>

          <p className="font-bold mb-2">COSTE TOTAL DEL SERVICIO:</p>
          <ul className="list-disc ml-8 space-y-1">
            <li>Si NO se alquila ninguna propiedad: <strong>€180</strong></li>
            <li>Si SÍ se alquila una propiedad presentada: <strong>€400</strong> (€180 + €220)</li>
          </ul>
        </div>

        {/* 3. CONDICIONES PAGO INICIAL */}
        <h2 className="text-2xl text-[#2c5282] mt-10 mb-5 pb-2 border-b-2 border-[#e2e8f0]">3. CONDICIONES DEL PAGO INICIAL (€180)</h2>

        <h3 className="text-lg text-[#2c5282] mt-8 mb-4">3.1. No Reembolsable</h3>
        <p className="mb-4 text-justify">El pago inicial de €180 es NO REEMBOLSABLE bajo ninguna circunstancia, incluyendo pero no limitado a:</p>
        <ul className="list-disc ml-8 mb-5 space-y-2">
          <li>Cambio de opinión del cliente</li>
          <li>Imposibilidad del cliente de viajar para ver las propiedades</li>
          <li>Desistimiento del cliente en cualquier fase del proceso</li>
          <li>Que ninguna de las propiedades presentadas sea de interés para el cliente</li>
          <li>Que el cliente encuentre otra propiedad por medios propios</li>
        </ul>
        <p className="mb-4 text-justify">Este pago compensa el trabajo profesional de búsqueda exhaustiva, análisis y coordinación, independientemente del resultado final.</p>

        <h3 className="text-lg text-[#2c5282] mt-8 mb-4">3.2. Momento del Pago</h3>
        <p className="mb-4 text-justify">El pago debe realizarse de forma inmediata al contratar el servicio, antes de que el prestador inicie cualquier trabajo de búsqueda. La confirmación del pago por parte de Stripe activa automáticamente el servicio.</p>

        {/* 4. CONDICIONES PAGO FINAL */}
        <h2 className="text-2xl text-[#2c5282] mt-10 mb-5 pb-2 border-b-2 border-[#e2e8f0]">4. CONDICIONES DEL PAGO FINAL (€220)</h2>

        <h3 className="text-lg text-[#2c5282] mt-8 mb-4">4.1. Exigibilidad</h3>
        <p className="mb-4 text-justify">El pago final de €220 es exigible ÚNICAMENTE si se cumplen las siguientes condiciones:</p>
        <ol className="list-decimal ml-8 mb-5 space-y-2">
          <li>El cliente decide alquilar una propiedad que ha sido presentada por el prestador como parte del servicio contratado</li>
          <li>Se formaliza un contrato de alquiler para dicha propiedad</li>
        </ol>

        <h3 className="text-lg text-[#2c5282] mt-8 mb-4">4.2. Momento del Pago</h3>
        <p className="mb-4">El pago de €220 debe realizarse:</p>
        <ul className="list-disc ml-8 mb-5 space-y-2">
          <li>En el momento de la firma del contrato de alquiler, o</li>
          <li>En un plazo máximo de 48 horas posterior a la firma del contrato de alquiler</li>
        </ul>

        <h3 className="text-lg text-[#2c5282] mt-8 mb-4">4.3. Forma de Pago</h3>
        <p className="mb-4 text-justify">El prestador enviará al cliente un enlace de pago seguro a través de Stripe para realizar este segundo pago. El cliente deberá realizar el pago a través de dicho enlace.</p>

        {/* 5. OBLIGACIONES PRESTADOR */}
        <h2 className="text-2xl text-[#2c5282] mt-10 mb-5 pb-2 border-b-2 border-[#e2e8f0]">5. OBLIGACIONES DEL PRESTADOR</h2>
        <p className="mb-4">El prestador se compromete a:</p>
        <ol className="list-decimal ml-8 mb-5 space-y-2">
          <li>Realizar una búsqueda exhaustiva y profesional del mercado inmobiliario en La Axarquía</li>
          <li>Presentar al cliente un mínimo de 10 propiedades que cumplan razonablemente con los criterios especificados</li>
          <li>Proporcionar información veraz y actualizada sobre cada propiedad</li>
          <li>Coordinar las visitas a las propiedades con diligencia</li>
          <li>Responder a las consultas del cliente en un plazo razonable (máximo 48 horas laborables)</li>
          <li>Mantener la confidencialidad de los datos personales del cliente conforme al RGPD</li>
          <li>Entregar los resultados de la búsqueda en un plazo de 48-72 horas desde la llamada inicial de cualificación</li>
        </ol>

        {/* 6. OBLIGACIONES CLIENTE */}
        <h2 className="text-2xl text-[#2c5282] mt-10 mb-5 pb-2 border-b-2 border-[#e2e8f0]">6. OBLIGACIONES DEL CLIENTE</h2>
        <p className="mb-4">El cliente se compromete a:</p>
        <ol className="list-decimal ml-8 mb-5 space-y-2">
          <li>Proporcionar información veraz y completa sobre sus necesidades y criterios de búsqueda</li>
          <li>Realizar el pago inicial de €180 de forma inmediata al contratar el servicio</li>
          <li>Responder a las comunicaciones del prestador en un plazo razonable</li>
          <li>Informar al prestador sobre cualquier cambio en sus criterios o circunstancias</li>
          <li>Realizar el pago final de €220 en caso de alquilar una propiedad presentada por el prestador</li>
          <li>No utilizar la información proporcionada por el prestador para contactar directamente con propietarios con el fin de eludir el pago del servicio</li>
        </ol>

        <div className="bg-[#fffbeb] border-l-4 border-[#ffd700] p-5 my-6">
          <h3 className="text-lg font-bold text-[#2c5282] mt-0 mb-3">6.1. Cláusula Anti-Elusión</h3>
          <p className="text-justify">Si el prestador puede demostrar que el cliente ha utilizado información proporcionada por el servicio (direcciones, contactos, detalles específicos de propiedades) para formalizar un alquiler directamente con el propietario sin la intervención del prestador, con el objetivo de eludir el pago de los €220, el cliente deberá abonar dicha cantidad más los gastos legales derivados de su reclamación.</p>
        </div>

        {/* 7. DURACIÓN */}
        <h2 className="text-2xl text-[#2c5282] mt-10 mb-5 pb-2 border-b-2 border-[#e2e8f0]">7. DURACIÓN DEL SERVICIO</h2>
        <p className="mb-4 text-justify">El servicio tiene una duración de 6 meses desde la fecha de contratación (fecha del pago inicial).</p>
        <p className="mb-4">Durante este período:</p>
        <ul className="list-disc ml-8 mb-5 space-y-2">
          <li>El prestador mantendrá activa la búsqueda de propiedades</li>
          <li>Si aparecen nuevas propiedades que encajen con los criterios del cliente, el prestador las comunicará</li>
          <li>El cliente puede solicitar actualizaciones de la búsqueda</li>
        </ul>
        <p className="mb-4 text-justify">Transcurridos los 6 meses sin que el cliente haya alquilado una propiedad, el servicio se considerará finalizado sin obligaciones adicionales para ninguna de las partes.</p>

        {/* 8. LIMITACIÓN */}
        <h2 className="text-2xl text-[#2c5282] mt-10 mb-5 pb-2 border-b-2 border-[#e2e8f0]">8. LIMITACIÓN DE RESPONSABILIDAD</h2>

        <h3 className="text-lg text-[#2c5282] mt-8 mb-4">8.1. Disponibilidad de Propiedades</h3>
        <p className="mb-4 text-justify">El prestador no puede garantizar que las propiedades presentadas estarán disponibles en el momento en que el cliente decida alquilarlas, ya que la disponibilidad depende de los propietarios y otros factores fuera del control del prestador.</p>

        <h3 className="text-lg text-[#2c5282] mt-8 mb-4">8.2. Información de Terceros</h3>
        <p className="mb-4 text-justify">La información sobre propiedades proviene mayoritariamente de terceros (propietarios, agencias, portales). El prestador se compromete a verificar la información en la medida de lo posible, pero no se hace responsable de inexactitudes en la información proporcionada por terceros.</p>

        <h3 className="text-lg text-[#2c5282] mt-8 mb-4">8.3. Decisión Final</h3>
        <p className="mb-4 text-justify">El servicio es de asesoramiento y búsqueda. La decisión final de alquilar cualquier propiedad es exclusivamente del cliente. El prestador no se hace responsable de la satisfacción del cliente con la propiedad alquilada una vez formalizado el contrato de alquiler.</p>

        <h3 className="text-lg text-[#2c5282] mt-8 mb-4">8.4. Exclusión de Responsabilidad</h3>
        <p className="mb-4">El prestador NO se hace responsable de:</p>
        <ul className="list-disc ml-8 mb-5 space-y-2">
          <li>Defectos o problemas en las propiedades que no sean evidentes durante las visitas</li>
          <li>Incumplimientos del contrato de alquiler por parte del propietario</li>
          <li>Cambios en las condiciones del mercado o disponibilidad de propiedades</li>
          <li>Gastos de viaje del cliente para ver propiedades</li>
        </ul>

        {/* 9. RGPD */}
        <h2 className="text-2xl text-[#2c5282] mt-10 mb-5 pb-2 border-b-2 border-[#e2e8f0]">9. PROTECCIÓN DE DATOS PERSONALES (RGPD)</h2>

        <h3 className="text-lg text-[#2c5282] mt-8 mb-4">9.1. Responsable del Tratamiento</h3>
        <p className="mb-4 text-justify">El responsable del tratamiento de los datos personales es Manuel Fernández Ramírez (Propaxar), con domicilio en Frigiliana, 29788 Málaga, España.</p>

        <h3 className="text-lg text-[#2c5282] mt-8 mb-4">9.2. Finalidad del Tratamiento</h3>
        <p className="mb-4">Los datos personales recabados (nombre, email, teléfono, dirección de facturación) se utilizarán exclusivamente para:</p>
        <ul className="list-disc ml-8 mb-5 space-y-2">
          <li>Prestar el servicio contratado</li>
          <li>Comunicaciones relacionadas con el servicio</li>
          <li>Emisión de facturas y gestión de pagos</li>
          <li>Cumplimiento de obligaciones legales</li>
        </ul>

        <h3 className="text-lg text-[#2c5282] mt-8 mb-4">9.3. Conservación de Datos</h3>
        <p className="mb-4 text-justify">Los datos se conservarán durante la vigencia del servicio y posteriormente durante el plazo legalmente establecido para el cumplimiento de obligaciones fiscales y legales (mínimo 6 años).</p>

        <h3 className="text-lg text-[#2c5282] mt-8 mb-4">9.4. Derechos del Cliente</h3>
        <p className="mb-4">El cliente tiene derecho a:</p>
        <ul className="list-disc ml-8 mb-5 space-y-2">
          <li>Acceder a sus datos personales</li>
          <li>Rectificar datos inexactos</li>
          <li>Solicitar la supresión de sus datos (cuando proceda legalmente)</li>
          <li>Oponerse al tratamiento</li>
          <li>Solicitar la limitación del tratamiento</li>
          <li>Portabilidad de datos</li>
        </ul>
        <p className="mb-4">Para ejercer estos derechos, el cliente puede contactar a: <strong>info@propaxar.com</strong></p>

        {/* 10. DESISTIMIENTO */}
        <h2 className="text-2xl text-[#2c5282] mt-10 mb-5 pb-2 border-b-2 border-[#e2e8f0]">10. DERECHO DE DESISTIMIENTO</h2>
        <p className="mb-4 text-justify">Conforme al artículo 103 del Real Decreto Legislativo 1/2007, de 16 de noviembre, por el que se aprueba el texto refundido de la Ley General para la Defensa de los Consumidores y Usuarios:</p>
        <div className="bg-[#fffbeb] border-l-4 border-[#ffd700] p-5 my-6">
          <p className="mb-4"><strong className="text-[#d97706]">El derecho de desistimiento NO es aplicable a este servicio</strong> porque se trata de:</p>
          <ul className="list-disc ml-8 mb-4 space-y-2">
            <li>Un servicio cuya ejecución ha comenzado, con el consentimiento expreso del cliente, antes de que expire el plazo de desistimiento</li>
            <li>Un servicio personalizado conforme a las especificaciones del cliente</li>
          </ul>
        </div>
        <p className="mb-4 text-justify">Al contratar el servicio, el cliente acepta expresamente que el prestador inicie la ejecución del servicio de forma inmediata, renunciando así a su derecho de desistimiento.</p>

        {/* 11-12 */}
        <h2 className="text-2xl text-[#2c5282] mt-10 mb-5 pb-2 border-b-2 border-[#e2e8f0]">11. MODIFICACIÓN DE LOS TÉRMINOS</h2>
        <p className="mb-4 text-justify">El prestador se reserva el derecho de modificar estos términos y condiciones. Las modificaciones no afectarán a los servicios ya contratados, que se regirán por los términos vigentes en el momento de la contratación.</p>

        <h2 className="text-2xl text-[#2c5282] mt-10 mb-5 pb-2 border-b-2 border-[#e2e8f0]">12. NULIDAD PARCIAL</h2>
        <p className="mb-4 text-justify">Si alguna cláusula de estos términos fuera declarada nula o inaplicable, las demás cláusulas mantendrán su plena vigencia y efectos.</p>

        {/* 13. LEY */}
        <h2 className="text-2xl text-[#2c5282] mt-10 mb-5 pb-2 border-b-2 border-[#e2e8f0]">13. LEY APLICABLE Y JURISDICCIÓN</h2>

        <h3 className="text-lg text-[#2c5282] mt-8 mb-4">13.1. Ley Aplicable</h3>
        <p className="mb-4">Este contrato se rige por la legislación española, en particular:</p>
        <ul className="list-disc ml-8 mb-5 space-y-2">
          <li>Código Civil Español</li>
          <li>Ley 34/2002, de Servicios de la Sociedad de la Información y Comercio Electrónico (LSSI)</li>
          <li>Real Decreto Legislativo 1/2007, de Defensa de Consumidores y Usuarios</li>
          <li>Reglamento (UE) 2016/679 de Protección de Datos (RGPD)</li>
        </ul>

        <h3 className="text-lg text-[#2c5282] mt-8 mb-4">13.2. Jurisdicción</h3>
        <p className="mb-4 text-justify">Para la resolución de cualquier controversia que pudiera derivarse de la interpretación o ejecución de este contrato, las partes se someten expresamente a los Juzgados y Tribunales de Torrox, Málaga, España, con renuncia expresa a cualquier otro fuero que pudiera corresponderles.</p>

        {/* 14. ACEPTACIÓN */}
        <h2 className="text-2xl text-[#2c5282] mt-10 mb-5 pb-2 border-b-2 border-[#e2e8f0]">14. ACEPTACIÓN ELECTRÓNICA</h2>
        <div className="bg-[#fffbeb] border-l-4 border-[#ffd700] p-5 my-6">
          <p className="mb-4">Al marcar la casilla de aceptación de estos términos y condiciones y realizar el pago a través de la pasarela segura, el cliente:</p>
          <ol className="list-decimal ml-8 mb-4 space-y-2">
            <li>Declara haber leído, comprendido y aceptado la totalidad de estos términos y condiciones</li>
            <li>Acepta expresamente la estructura de precios (€180 + €220 en su caso)</li>
            <li>Acepta expresamente que el pago inicial de €180 es NO REEMBOLSABLE</li>
            <li>Acepta que el servicio comience de forma inmediata tras el pago</li>
            <li>Renuncia expresamente a su derecho de desistimiento</li>
            <li>Acepta que esta aceptación electrónica constituye un contrato legalmente vinculante</li>
          </ol>
          <p className="text-justify">Conforme al artículo 24 de la Ley 34/2002 LSSI y el Reglamento (UE) 910/2014 (eIDAS), esta aceptación electrónica tiene la misma validez legal que una firma manuscrita.</p>
        </div>

        {/* 15. REGISTRO */}
        <h2 className="text-2xl text-[#2c5282] mt-10 mb-5 pb-2 border-b-2 border-[#e2e8f0]">15. REGISTRO DE LA ACEPTACIÓN</h2>
        <p className="mb-4">El prestador conservará registro electrónico de:</p>
        <ul className="list-disc ml-8 mb-5 space-y-2">
          <li>Fecha y hora de la aceptación</li>
          <li>Dirección IP del cliente</li>
          <li>Datos de identificación del cliente proporcionados en Stripe</li>
          <li>Confirmación del pago</li>
          <li>Versión de los términos y condiciones aceptados</li>
        </ul>
        <p className="mb-4 text-justify">Este registro constituye prueba de la perfección del contrato y podrá ser utilizado en caso de controversia.</p>

        {/* 16. CONTACTO */}
        <h2 className="text-2xl text-[#2c5282] mt-10 mb-5 pb-2 border-b-2 border-[#e2e8f0]">16. CONTACTO</h2>
        <p className="mb-4 text-justify">Para cualquier consulta, duda o reclamación relacionada con estos términos y condiciones o con el servicio contratado, el cliente puede contactar con:</p>
        <div className="bg-[#f7fafc] p-6 rounded-lg my-6">
          <p>
            <strong>Propaxar - Manuel Fernández Ramírez</strong><br />
            Email: info@propaxar.com<br />
            Teléfono/WhatsApp: +34 662 317 561<br />
            Dirección: Frigiliana, 29788 Málaga, España
          </p>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t-2 border-[#e2e8f0] text-center text-[#666] text-sm">
          <p>Propaxar © {new Date().getFullYear()}</p>
          <p>Property Finder Service</p>
          <p>La Axarquía, Costa del Sol, Málaga, España</p>
          <p className="mt-4">Documento actualizado: 10 de febrero de 2026</p>
          <p>Versión: 1.0</p>
        </div>
      </div>
    </div>
  );
};

export default TerminosFinder;
