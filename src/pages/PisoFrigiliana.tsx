import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Bed, Bath, Home, Tag, Wind, Mountain, TreePine, MapPin, ChevronLeft, ChevronRight, X, MessageCircle, Mail, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";

const WHATSAPP_LINK = "https://wa.me/34662317561?text=Hola%20Manuel%2C%20me%20interesa%20el%20piso%20en%20Frigiliana%20(ref.%20pa225).%20%C2%BFPuedo%20agendar%20una%20visita%3F";

const PHOTOS = [
  "/images/properties/piso-frigi-01.jpg",
  "/images/properties/piso-frigi-02.jpg",
  "/images/properties/piso-frigi-03.jpg",
  "/images/properties/piso-frigi-04.jpg",
  "/images/properties/piso-frigi-05.jpg",
  "/images/properties/piso-frigi-06.jpg",
  "/images/properties/piso-frigi-07.jpg",
  "/images/properties/piso-frigi-08.jpg",
  "/images/properties/piso-frigi-09.jpg",
  "/images/properties/piso-frigi-10.jpg",
  "/images/properties/piso-frigi-11.jpg",
  "/images/properties/piso-frigi-12.jpg",
  "/images/properties/piso-frigi-13.jpg",
  "/images/properties/piso-frigi-14.jpg",
];

const FEATURES = [
  { icon: Wind, label: "Aire acondicionado" },
  { icon: MapPin, label: "Cerca de servicios locales" },
  { icon: TreePine, label: "Terraza" },
  { icon: Mountain, label: "Vistas a la montaña" },
];

const PisoFrigiliana = () => {
  const navigate = useNavigate();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(0);

  const openLightbox = (idx: number) => {
    setLightboxIdx(idx);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const prevImage = () => setLightboxIdx((p) => (p - 1 + PHOTOS.length) % PHOTOS.length);
  const nextImage = () => setLightboxIdx((p) => (p + 1) % PHOTOS.length);

  return (
    <>
      <Helmet>
        <title>Piso en Frigiliana — 750€/mes | Propaxar</title>
        <meta name="description" content="Dúplex de 1 dormitorio en el Casco Nuevo de Frigiliana. Terraza de 20m² con vistas a la montaña. 750€/mes. Ref. pa225." />
      </Helmet>

      <Navigation />

      <main className="bg-background min-h-screen pt-20">
        {/* Back button */}
        <div className="max-w-[1100px] mx-auto px-5 pt-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver
          </button>
        </div>

        {/* Header */}
        <header className="max-w-[1100px] mx-auto px-5 pt-6 pb-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p className="text-xs font-mono tracking-widest uppercase text-muted mb-2">Ref. pa225 · Alquiler residencial</p>
              <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground leading-tight">
                Piso en Frigiliana
              </h1>
              <p className="flex items-center gap-2 text-muted mt-2 text-sm">
                <MapPin className="w-4 h-4" />
                Casco Nuevo, Frigiliana, Málaga
              </p>
            </div>
            <div className="text-right">
              <div className="font-display text-4xl md:text-5xl font-bold text-primary">750€</div>
              <div className="text-sm text-muted font-medium">/mes</div>
            </div>
          </div>
        </header>

        {/* Photo Gallery */}
        <section className="max-w-[1100px] mx-auto px-5 pb-8">
          {/* Main hero image + grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
            {/* Main large image */}
            <div
              className="md:col-span-2 md:row-span-2 cursor-pointer overflow-hidden border border-border"
              onClick={() => openLightbox(0)}
            >
              <img
                src={PHOTOS[0]}
                alt="Piso en Frigiliana - Vista principal"
                className="w-full h-full object-cover min-h-[280px] md:min-h-[420px] hover:scale-105 transition-transform duration-500"
              />
            </div>
            {/* 4 smaller images */}
            {PHOTOS.slice(1, 5).map((photo, i) => (
              <div
                key={i}
                className="cursor-pointer overflow-hidden border border-border relative"
                onClick={() => openLightbox(i + 1)}
              >
                <img
                  src={photo}
                  alt={`Piso en Frigiliana - Foto ${i + 2}`}
                  className="w-full h-full object-cover min-h-[130px] md:min-h-[205px] hover:scale-105 transition-transform duration-500"
                />
                {i === 3 && (
                  <div className="absolute inset-0 bg-primary/60 flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-lg">+{PHOTOS.length - 5} fotos</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Content Grid */}
        <section className="max-w-[1100px] mx-auto px-5 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column - Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Quick stats */}
              <div className="grid grid-cols-4 gap-4 border border-border bg-card p-6">
                {[
                  { icon: Home, label: "Tipo", value: "Piso" },
                  { icon: Bed, label: "Dormitorios", value: "1" },
                  { icon: Bath, label: "Baño", value: "1" },
                  { icon: Tag, label: "Referencia", value: "pa225" },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <stat.icon className="w-5 h-5 mx-auto mb-2 text-muted" />
                    <div className="font-display text-xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-xs text-muted uppercase tracking-wide">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Features */}
              <div className="border border-border bg-card p-6">
                <h2 className="font-display text-lg font-bold text-foreground mb-4">Características</h2>
                <div className="grid grid-cols-2 gap-3">
                  {FEATURES.map((f, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-foreground">
                      <div className="w-8 h-8 bg-background flex items-center justify-center border border-border">
                        <f.icon className="w-4 h-4 text-primary" />
                      </div>
                      {f.label}
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="border border-border bg-card p-6">
                <h2 className="font-display text-lg font-bold text-foreground mb-4">Descripción</h2>
                <div className="space-y-4 text-sm text-foreground leading-relaxed">
                  <p>
                    A menudo, en Frigiliana tienes que elegir entre <strong>'vistas increíbles'</strong> (pero con 100 cuestas para llegar a casa) o <strong>'comodidad de acceso'</strong> (pero sin terraza). Este piso rompe esa regla.
                  </p>
                  <p>
                    Ubicado en el Casco Nuevo, este dúplex te ofrece la facilidad de llegar a tu puerta sin esfuerzo y, una vez dentro, te regala una de las mejores terrazas de la zona: <strong>20 metros cuadrados de espacio privado</strong> para vivir al aire libre.
                  </p>
                  <p>
                    Es una propiedad con carácter, dividida en niveles para darte privacidad, y con el tamaño justo para ser tu refugio personal en el pueblo más bonito de España. Perfecto para una persona o pareja que valore la luz natural y el espacio exterior.
                  </p>
                </div>
              </div>

              {/* Full Gallery */}
              <div className="border border-border bg-card p-6">
                <h2 className="font-display text-lg font-bold text-foreground mb-4">Galería completa</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {PHOTOS.map((photo, i) => (
                    <div
                      key={i}
                      className="cursor-pointer overflow-hidden border border-border aspect-[4/3]"
                      onClick={() => openLightbox(i)}
                    >
                      <img
                        src={photo}
                        alt={`Foto ${i + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right column - Contact card */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-4">
                {/* Price card */}
                <div className="border border-border bg-card p-6">
                  <div className="text-center mb-6">
                    <div className="font-display text-4xl font-bold text-primary">750€</div>
                    <div className="text-sm text-muted">/mes · Alquiler residencial</div>
                  </div>

                  <div className="space-y-3">
                    <a
                      href={WHATSAPP_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full bg-[hsl(142,71%,45%)] hover:bg-[hsl(142,71%,40%)] text-white font-semibold py-3 px-4 transition-colors text-sm"
                    >
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp — Agendar visita
                    </a>
                    <a
                      href="mailto:info@propaxar.com?subject=Consulta%20Piso%20Frigiliana%20pa225"
                      className="flex items-center justify-center gap-2 w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-4 transition-colors text-sm"
                    >
                      <Mail className="w-4 h-4" />
                      Enviar email
                    </a>
                    <a
                      href="tel:+34662317561"
                      className="flex items-center justify-center gap-2 w-full border border-border bg-background hover:bg-card text-foreground font-semibold py-3 px-4 transition-colors text-sm"
                    >
                      <Phone className="w-4 h-4" />
                      +34 662 317 561
                    </a>
                  </div>
                </div>

                {/* Agent card */}
                <div className="border border-border bg-card p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg rounded-full">
                      M
                    </div>
                    <div>
                      <div className="font-bold text-foreground text-sm">Manuel C. Fernández</div>
                      <div className="text-xs text-muted">Consultor inmobiliario · Frigiliana</div>
                    </div>
                  </div>
                  <p className="text-xs text-muted leading-relaxed">
                    40 años de conocimiento local. Conozco cada propiedad y cada propietario de Frigiliana.
                    Te ayudo a encontrar exactamente lo que buscas — sin perder tiempo.
                  </p>
                </div>

                {/* Highlights */}
                <div className="border border-border bg-card p-6">
                  <h3 className="font-display text-sm font-bold text-foreground mb-3 uppercase tracking-wide">Lo que destaca</h3>
                  <ul className="space-y-2">
                    {[
                      "Terraza privada de 20m²",
                      "Casco Nuevo — acceso fácil sin cuestas",
                      "Dúplex con niveles para privacidad",
                      "Vistas a la montaña",
                      "Aire acondicionado incluido",
                      "Cerca de todos los servicios",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-foreground">
                        <span className="text-[hsl(var(--success))] font-bold mt-0.5">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border bg-card py-8">
          <div className="max-w-[1100px] mx-auto px-5 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="font-display text-lg font-bold text-primary">Propaxar</div>
            <div className="text-xs text-muted">© 2026 Propaxar · Frigiliana, Málaga · Manuel C. Fernández Ramírez</div>
          </div>
        </footer>
      </main>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[999] bg-black/90 flex items-center justify-center" onClick={closeLightbox}>
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white z-10"
            onClick={closeLightbox}
          >
            <X className="w-8 h-8" />
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white z-10"
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
          >
            <ChevronLeft className="w-10 h-10" />
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white z-10"
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
          >
            <ChevronRight className="w-10 h-10" />
          </button>
          <img
            src={PHOTOS[lightboxIdx]}
            alt={`Foto ${lightboxIdx + 1}`}
            className="max-w-[90vw] max-h-[85vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm font-mono">
            {lightboxIdx + 1} / {PHOTOS.length}
          </div>
        </div>
      )}
    </>
  );
};

export default PisoFrigiliana;
