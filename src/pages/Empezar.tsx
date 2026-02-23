import { ArrowRight, ArrowDown, Check, X, Shield, Clock, MessageCircle, Star, MapPin, Home, Phone } from "lucide-react";
import { Helmet } from "react-helmet-async";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const STRIPE_LINK = "https://buy.stripe.com/bJe14pbo0drEebg6Q1gEg03";
const WHATSAPP = "https://wa.me/34662317561?text=Hola%20Manuel%2C%20tengo%20una%20pregunta%20sobre%20el%20reporte";
const TERMS_HREF = "/terminos-finder";

const Empezar = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Helmet>
        <title>Encuentra Tu Casa en Frigiliana | Propaxar</title>
        <meta name="description" content="Reporte de mercado personalizado para encontrar tu vivienda ideal en Frigiliana. Experto local, entrega en 24-48h, garantía de reembolso." />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* ═══════════════════ HERO ═══════════════════ */}
        <section
          className="relative min-h-[90vh] flex items-center justify-center"
          style={{
            backgroundImage: `url(https://propaxar.com/wp-content/uploads/2026/01/Gemini_Generated_Image_wyt8u3wyt8u3wyt8.png)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/55" />
          <div className="relative z-10 max-w-[800px] mx-auto px-5 text-center py-20">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white/90 text-sm font-medium px-4 py-2 rounded-full mb-6">
              <MapPin className="w-4 h-4" /> Frigiliana · Nerja · Torrox
            </div>
            <h1 className="text-[32px] md:text-[54px] font-extrabold text-white leading-[1.08] mb-5">
              ENCUENTRA TU CASA PERFECTA EN FRIGILIANA
            </h1>
            <p className="text-[18px] md:text-[22px] text-white/90 leading-relaxed mb-8 max-w-[650px] mx-auto">
              Sin perder tiempo. Sin propiedades ya alquiladas. Con experto local nacido aquí.
            </p>
            <button
              onClick={() => scrollTo("problema")}
              className="inline-flex items-center gap-3 bg-white text-foreground text-lg font-semibold px-10 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
            >
              Ver Cómo Funciona
              <ArrowDown className="w-5 h-5" />
            </button>
          </div>
        </section>

        {/* ═══════════════════ PROBLEM ═══════════════════ */}
        <section id="problema" className="py-16 md:py-24 bg-background">
          <div className="max-w-[700px] mx-auto px-5">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-10">
              ¿Cansado de esto?
            </h2>
            <div className="space-y-5">
              {[
                "Buscar durante semanas sin encontrar nada que encaje",
                "Propiedades que ya están alquiladas cuando llamas",
                "Fotos engañosas que no coinciden con la realidad",
                "No conocer los precios reales de la zona",
                "Perder tiempo visitando pisos que no merecen la pena",
              ].map((pain, i) => (
                <div key={i} className="flex items-start gap-4 bg-destructive/5 border border-destructive/20 rounded-xl p-5">
                  <X className="w-6 h-6 text-destructive shrink-0 mt-0.5" />
                  <p className="text-foreground text-[17px] leading-relaxed">{pain}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <button
                onClick={() => scrollTo("solucion")}
                className="inline-flex items-center gap-2 text-primary font-semibold text-lg hover:underline"
              >
                Hay una forma mejor <ArrowDown className="w-5 h-5" />
              </button>
            </div>
          </div>
        </section>

        {/* ═══════════════════ SOLUTION ═══════════════════ */}
        <section id="solucion" className="py-16 md:py-24 bg-card">
          <div className="max-w-[800px] mx-auto px-5">
            <div className="text-center mb-12">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">La Solución</p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                REPORTE COMPLETO DEL MERCADO
              </h2>
              <p className="text-xl text-foreground-muted">Personalizado para ti</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
              {[
                "Análisis de todas las propiedades disponibles",
                "Precios reales verificados por experto local",
                "Fotos actualizadas y descripción honesta",
                "Comparativa de barrios y ubicaciones",
                "Contacto directo con propietarios",
                "6 meses de seguimiento incluido",
              ].map((benefit, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-background rounded-xl">
                  <div className="w-7 h-7 rounded-full bg-success/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-success" />
                  </div>
                  <p className="text-foreground text-[16px]">{benefit}</p>
                </div>
              ))}
            </div>

            {/* Price */}
            <div className="text-center bg-background border-2 border-primary/20 rounded-2xl p-8">
              <p className="text-4xl md:text-5xl font-extrabold text-foreground mb-2">€250</p>
              <p className="text-foreground-muted text-lg mb-6">Pago único · Reembolsable si alquilas una propiedad mía</p>
              <a
                href="/demo-reporte"
                className="inline-flex items-center gap-2 btn-primary text-lg"
              >
                Ver Ejemplo Real <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </section>

        {/* ═══════════════════ DEMO VISUAL ═══════════════════ */}
        <section className="py-16 md:py-24 bg-background">
          <div className="max-w-[800px] mx-auto px-5 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              VE EXACTAMENTE QUÉ RECIBES
            </h2>
            <p className="text-lg text-foreground-muted mb-10 max-w-[550px] mx-auto">
              Hemos preparado un reporte de demostración para que veas la calidad y el nivel de detalle.
            </p>

            {/* Blurred preview mock */}
            <div className="relative rounded-2xl overflow-hidden border border-border shadow-xl mb-8 mx-auto max-w-[600px]">
              <div className="bg-card p-8 md:p-12 space-y-4">
                <div className="h-6 bg-primary/20 rounded w-3/4 mx-auto" />
                <div className="h-4 bg-primary/10 rounded w-full" />
                <div className="h-4 bg-primary/10 rounded w-5/6" />
                <div className="h-40 bg-primary/5 rounded-xl mt-4" />
                <div className="h-4 bg-primary/10 rounded w-2/3" />
                <div className="h-4 bg-primary/10 rounded w-4/5" />
                <div className="h-32 bg-primary/5 rounded-xl" />
              </div>
              <div className="absolute inset-0 backdrop-blur-[6px] bg-white/30 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Home className="w-8 h-8 text-primary" />
                  </div>
                  <p className="text-foreground font-bold text-xl mb-2">Reporte Demo Disponible</p>
                  <p className="text-foreground-muted text-sm">Mira el formato real antes de comprar</p>
                </div>
              </div>
            </div>

            <a
              href="/demo-reporte"
              className="inline-flex items-center gap-2 btn-primary text-lg"
            >
              Ver Reporte Completo Demo <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </section>

        {/* ═══════════════════ AUTHORITY ═══════════════════ */}
        <section className="py-16 md:py-24 bg-card">
          <div className="max-w-[800px] mx-auto px-5">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                POR QUÉ CONFIAR EN MÍ
              </h2>
            </div>

            <div className="flex flex-col md:flex-row gap-10 items-center">
              {/* Photo */}
              <div className="shrink-0">
                <div className="w-[200px] h-[200px] rounded-full bg-primary/10 flex items-center justify-center overflow-hidden border-4 border-primary/20">
                  <img
                    src="https://propaxar.com/wp-content/uploads/2024/12/Manuel-Fernandez.jpg"
                    alt="Manuel Fernández, fundador de Propaxar"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Credentials */}
              <div className="space-y-5">
                <h3 className="text-2xl font-bold text-foreground">Manuel Fernández</h3>
                <p className="text-foreground-muted text-[17px] leading-relaxed">
                  Fundador de Propaxar. Nacido y criado en Frigiliana. Más de 10 años ayudando a familias a encontrar su hogar ideal en la Axarquía.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { icon: MapPin, text: "Nacido en Frigiliana" },
                    { icon: Clock, text: "+10 años de experiencia" },
                    { icon: Home, text: "+200 familias ayudadas" },
                    { icon: Star, text: "Conocimiento local profundo" },
                  ].map(({ icon: Icon, text }, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Icon className="w-5 h-5 text-primary shrink-0" />
                      <span className="text-foreground text-[15px]">{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════ HOW IT WORKS ═══════════════════ */}
        <section id="como-funciona" className="py-16 md:py-24 bg-background">
          <div className="max-w-[800px] mx-auto px-5">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
              ASÍ DE FÁCIL
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { num: "1", icon: "💳", title: "Compra el reporte", desc: "Pago seguro con Stripe. Recibirás confirmación inmediata." },
                { num: "2", icon: "📞", title: "Hablamos 15 min", desc: "Te llamo para entender exactamente qué buscas." },
                { num: "3", icon: "📋", title: "Recibes tu reporte", desc: "En 24-48h, análisis completo del mercado personalizado." },
              ].map((step, i) => (
                <div key={i} className="text-center p-6">
                  <div className="text-5xl mb-4">{step.icon}</div>
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-bold mx-auto mb-4">
                    {step.num}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
                  <p className="text-foreground-muted leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <a
                href={STRIPE_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 btn-primary text-xl px-12 py-5"
              >
                Empezar Ahora — €250 <ArrowRight className="w-6 h-6" />
              </a>
              <p className="text-sm text-foreground-muted mt-3">
                Al comprar aceptas los{" "}
                <a href={TERMS_HREF} target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">
                  términos y condiciones
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* ═══════════════════ GUARANTEE ═══════════════════ */}
        <section className="py-16 md:py-24 bg-card">
          <div className="max-w-[700px] mx-auto px-5 text-center">
            <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
              <Shield className="w-10 h-10 text-success" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              GARANTÍA DE REEMBOLSO
            </h2>
            <p className="text-lg text-foreground-muted leading-relaxed mb-8 max-w-[550px] mx-auto">
              Si finalmente alquilas una propiedad de las que te presento, los €250 del reporte se descuentan íntegramente de mi comisión. <strong className="text-foreground">Riesgo cero para ti.</strong>
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              {[
                { icon: Shield, label: "Pago seguro Stripe" },
                { icon: Clock, label: "Reporte en 24-48h" },
                { icon: MessageCircle, label: "Soporte por WhatsApp" },
              ].map(({ icon: Icon, label }, i) => (
                <div key={i} className="flex items-center gap-2 text-foreground-muted text-sm">
                  <Icon className="w-4 h-4 text-primary" />
                  {label}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════ FAQ ═══════════════════ */}
        <section className="py-16 md:py-24 bg-background">
          <div className="max-w-[700px] mx-auto px-5">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-10">
              PREGUNTAS FRECUENTES
            </h2>

            <Accordion type="single" collapsible className="space-y-4">
              {[
                {
                  q: "¿Por qué debería pagar €250 por un reporte?",
                  a: "Porque te ahorra semanas de búsqueda ineficiente. Recibes un análisis profesional del mercado completo, verificado por un experto local que conoce cada calle de Frigiliana. Además, si alquilas una propiedad mía, te devuelvo los €250.",
                },
                {
                  q: "¿Qué pasa si no encuentro nada que me guste?",
                  a: "El reporte incluye 6 meses de seguimiento. Si no hay nada que encaje ahora, te aviso en cuanto aparezca algo nuevo que cumpla tus criterios. El mercado cambia constantemente.",
                },
                {
                  q: "¿Cuánto tarda en llegar el reporte?",
                  a: "Entre 24 y 48 horas después de nuestra llamada inicial de 15 minutos. Primero necesito entender bien qué buscas para personalizar el análisis.",
                },
                {
                  q: "¿Puedo ver un ejemplo antes de comprar?",
                  a: "Sí, tenemos un reporte de demostración disponible con datos reales (parcialmente anonimizados). Puedes verlo antes de decidir.",
                },
              ].map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="bg-card border border-border rounded-xl px-6 shadow-sm"
                >
                  <AccordionTrigger className="text-left text-foreground font-semibold text-base md:text-lg hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-foreground-muted leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="text-center mt-8">
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
              >
                <MessageCircle className="w-5 h-5" />
                ¿Más preguntas? Escríbeme por WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* ═══════════════════ FINAL CTA ═══════════════════ */}
        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="max-w-[600px] mx-auto px-5 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ¿LISTO PARA ENCONTRAR TU CASA?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8">
              Deja de buscar a ciegas. Recibe tu reporte personalizado en 24-48h.
            </p>

            <a
              href={STRIPE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white text-foreground text-xl font-bold px-12 py-5 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-0.5 mb-4"
            >
              Comprar Reporte Ahora — €250 <ArrowRight className="w-6 h-6" />
            </a>

            <p className="text-sm text-primary-foreground/70 mb-6">
              Al comprar aceptas los{" "}
              <a href={TERMS_HREF} target="_blank" rel="noopener noreferrer" className="underline hover:text-white">
                términos y condiciones
              </a>
            </p>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-primary-foreground/70">
              <span className="flex items-center gap-1.5"><Shield className="w-4 h-4" /> Pago seguro Stripe 🔒</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> Reporte en 24-48h ⚡</span>
            </div>
          </div>
        </section>

        {/* ═══════════════════ STICKY MOBILE CTA ═══════════════════ */}
        <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-card/95 backdrop-blur-sm border-t border-border p-3 text-center">
          <a
            href={STRIPE_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full btn-primary text-lg py-4"
          >
            Comprar Reporte — €250
          </a>
          <a href={TERMS_HREF} target="_blank" rel="noopener noreferrer" className="text-xs text-foreground-muted underline mt-1 inline-block">
            Términos y condiciones
          </a>
        </div>

        {/* Bottom spacer for sticky CTA on mobile */}
        <div className="h-24 md:hidden" />
      </div>
    </>
  );
};

export default Empezar;
