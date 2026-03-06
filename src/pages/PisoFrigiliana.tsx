import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Bed, Bath, Home, Tag, Wind, Mountain, TreePine, MapPin, ChevronLeft, ChevronRight, X, MessageCircle, Mail, Phone, Globe } from "lucide-react";

const WHATSAPP_LINKS = {
  es: "https://wa.me/34662317561?text=Hola%20Manuel%2C%20me%20interesa%20el%20piso%20en%20Frigiliana%20(ref.%20pa225).%20%C2%BFPuedo%20agendar%20una%20visita%3F",
  en: "https://wa.me/34662317561?text=Hi%20Manuel%2C%20I%27m%20interested%20in%20the%20apartment%20in%20Frigiliana%20(ref.%20pa225).%20Can%20I%20schedule%20a%20viewing%3F",
};

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

const t = {
  es: {
    title: "Piso en Frigiliana — 750€/mes | Propaxar",
    metaDesc: "Dúplex de 1 dormitorio en el Casco Nuevo de Frigiliana. Terraza de 15m² con vistas a la montaña. 750€/mes. Ref. pa225.",
    ref: "Ref. pa225 · Alquiler residencial",
    heading: "Piso en Frigiliana",
    location: "Casco Nuevo, Frigiliana, Málaga",
    perMonth: "/mes",
    type: "Tipo",
    typeValue: "Piso",
    bedrooms: "Dormitorios",
    bathroom: "Baño",
    reference: "Referencia",
    features: "Características",
    featuresList: [
      { icon: Wind, label: "Aire acondicionado" },
      { icon: MapPin, label: "Cerca de servicios locales" },
      { icon: TreePine, label: "Terraza" },
      { icon: Mountain, label: "Vistas a la montaña" },
    ],
    description: "Descripción",
    descP1: <>A menudo, en Frigiliana tienes que elegir entre <strong>'vistas increíbles'</strong> (pero con 100 cuestas para llegar a casa) o <strong>'comodidad de acceso'</strong> (pero sin terraza). Este piso rompe esa regla.</>,
    descP2: <>Ubicado en el Casco Nuevo, este dúplex te ofrece la facilidad de llegar a tu puerta sin esfuerzo y, una vez dentro, te regala una de las mejores terrazas de la zona: <strong>15 metros cuadrados de espacio privado</strong> para vivir al aire libre.</>,
    descP3: <>Es una propiedad con carácter, dividida en niveles para darte privacidad, y con el tamaño justo para ser tu refugio personal en el pueblo más bonito de España. Perfecto para una persona o pareja que valore la luz natural y el espacio exterior.</>,
    locationTitle: "Ubicación",
    openMaps: "Abrir en Google Maps",
    gallery: "Galería completa",
    rentalType: "/mes · Alquiler residencial",
    whatsapp: "WhatsApp — Agendar visita",
    sendEmail: "Enviar email",
    agentName: "Manuel C. Fernández",
    agentRole: "Consultor inmobiliario · Frigiliana",
    agentBio: "40 años de conocimiento local. Te ayudo a encontrar exactamente lo que buscas — sin perder tiempo.",
    highlights: "Lo que destaca",
    highlightsList: [
      "Terraza privada de 15m²",
      "Casco Nuevo — acceso fácil sin cuestas",
      "Dúplex con niveles para privacidad",
      "Vistas a la montaña",
      "Aire acondicionado incluido",
      "Cerca de todos los servicios",
    ],
    address: "C. Ermita · Casco Nuevo, Frigiliana 29788",
  },
  en: {
    title: "Apartment in Frigiliana — 750€/month | Propaxar",
    metaDesc: "1-bedroom duplex in Frigiliana's Casco Nuevo. 15m² terrace with mountain views. 750€/month. Ref. pa225.",
    ref: "Ref. pa225 · Residential rental",
    heading: "Apartment in Frigiliana",
    location: "Casco Nuevo, Frigiliana, Málaga",
    perMonth: "/month",
    type: "Type",
    typeValue: "Apartment",
    bedrooms: "Bedrooms",
    bathroom: "Bathroom",
    reference: "Reference",
    features: "Features",
    featuresList: [
      { icon: Wind, label: "Air conditioning" },
      { icon: MapPin, label: "Close to local amenities" },
      { icon: TreePine, label: "Terrace" },
      { icon: Mountain, label: "Mountain views" },
    ],
    description: "Description",
    descP1: <>In Frigiliana, you often have to choose between <strong>'incredible views'</strong> (but 100 steep hills to get home) or <strong>'easy access'</strong> (but no terrace). This apartment breaks that rule.</>,
    descP2: <>Located in the Casco Nuevo, this duplex gives you the ease of reaching your door effortlessly and, once inside, rewards you with one of the best terraces in the area: <strong>15 square metres of private space</strong> for outdoor living.</>,
    descP3: <>A property with character, split across levels for privacy, and just the right size to be your personal retreat in Spain's most beautiful village. Perfect for an individual or couple who values natural light and outdoor space.</>,
    locationTitle: "Location",
    openMaps: "Open in Google Maps",
    gallery: "Full Gallery",
    rentalType: "/month · Residential rental",
    whatsapp: "WhatsApp — Schedule viewing",
    sendEmail: "Send email",
    agentName: "Manuel C. Fernández",
    agentRole: "Property consultant · Frigiliana",
    agentBio: "40 years of local knowledge. I help you find exactly what you're looking for — without wasting time.",
    highlights: "Highlights",
    highlightsList: [
      "Private 15m² terrace",
      "Casco Nuevo — easy access, no steep hills",
      "Duplex with split levels for privacy",
      "Mountain views",
      "Air conditioning included",
      "Close to all amenities",
    ],
    address: "C. Ermita · Casco Nuevo, Frigiliana 29788",
  },
};

type Lang = "es" | "en";

const PisoFrigiliana = () => {
  const [lang, setLang] = useState<Lang>(() => {
    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get("lang");
    if (urlLang === "en" || urlLang === "es") return urlLang;
    return (localStorage.getItem("finder-lang") as Lang) || "es";
  });
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(0);

  useEffect(() => {
    localStorage.setItem("finder-lang", lang);
  }, [lang]);

  const c = t[lang];

  const openLightbox = (idx: number) => {
    setLightboxIdx(idx);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);
  const prevImage = () => setLightboxIdx((p) => (p - 1 + PHOTOS.length) % PHOTOS.length);
  const nextImage = () => setLightboxIdx((p) => (p + 1) % PHOTOS.length);

  const toggleLang = () => setLang((l) => (l === "es" ? "en" : "es"));

  return (
    <>
      <Helmet>
        <title>{c.title}</title>
        <meta name="description" content={c.metaDesc} />
      </Helmet>

      {/* Language toggle — fixed top-right */}
      <button
        onClick={toggleLang}
        className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-card/95 backdrop-blur-md border border-border shadow-lg px-3.5 py-2 hover:bg-card transition-colors group"
        aria-label="Toggle language"
      >
        <Globe className="w-4 h-4 text-primary" />
        <span className="text-xs font-bold tracking-wide">
          <span className={lang === "es" ? "text-primary" : "text-muted"}>ES</span>
          <span className="text-muted mx-1">|</span>
          <span className={lang === "en" ? "text-primary" : "text-muted"}>EN</span>
        </span>
      </button>

      <main className="bg-background min-h-screen pt-6">

        {/* Header */}
        <header className="max-w-[1100px] mx-auto px-5 pt-6 pb-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p className="text-xs font-mono tracking-widest uppercase text-muted mb-2">{c.ref}</p>
              <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground leading-tight">
                {c.heading}
              </h1>
              <p className="flex items-center gap-2 text-muted mt-2 text-sm">
                <MapPin className="w-4 h-4" />
                {c.location}
              </p>
            </div>
            <div className="text-right">
              <div className="font-display text-4xl md:text-5xl font-bold text-primary">750€</div>
              <div className="text-sm text-muted font-medium">{c.perMonth}</div>
            </div>
          </div>
        </header>

        {/* Hero Photo */}
        <section className="max-w-[1100px] mx-auto px-5 pb-8">
          <div
            className="cursor-pointer overflow-hidden border border-border"
            onClick={() => openLightbox(0)}
          >
            <img
              src={PHOTOS[0]}
              alt={`${c.heading} - Vista principal`}
              className="w-full object-cover max-h-[500px] hover:scale-105 transition-transform duration-500"
            />
          </div>
        </section>

        {/* Content Grid */}
        <section className="max-w-[1100px] mx-auto px-5 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Quick stats */}
              <div className="grid grid-cols-4 gap-4 border border-border bg-card p-6">
                {[
                  { icon: Home, label: c.type, value: c.typeValue },
                  { icon: Bed, label: c.bedrooms, value: "1" },
                  { icon: Bath, label: c.bathroom, value: "1" },
                  { icon: Tag, label: c.reference, value: "pa225" },
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
                <h2 className="font-display text-lg font-bold text-foreground mb-4">{c.features}</h2>
                <div className="grid grid-cols-2 gap-3">
                  {c.featuresList.map((f, i) => (
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
                <h2 className="font-display text-lg font-bold text-foreground mb-4">{c.description}</h2>
                <div className="space-y-4 text-sm text-foreground leading-relaxed">
                  <p>{c.descP1}</p>
                  <p>{c.descP2}</p>
                  <p>{c.descP3}</p>
                </div>
              </div>

              {/* Location */}
              <div className="border border-border bg-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display text-lg font-bold text-foreground">{c.locationTitle}</h2>
                  <a
                    href="https://www.google.com/maps/place/C.+Ermita,+29788+Frigiliana,+M%C3%A1laga"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-muted hover:text-primary transition-colors flex items-center gap-1.5"
                  >
                    <MapPin className="w-3 h-3" />
                    {c.openMaps}
                  </a>
                </div>
                <a
                  href="https://www.google.com/maps/place/C.+Ermita,+29788+Frigiliana,+M%C3%A1laga"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative group overflow-hidden border border-border"
                >
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3790.2290712553013!2d-3.8949735999999997!3d36.7879436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd7224b98b241ba1%3A0xe820b3a59482ebe0!2sC.%20Ermita%2C%2029788%20Frigiliana%2C%20M%C3%A1laga!5e1!3m2!1ses!2ses!4v1772797075045!5m2!1ses!2ses"
                    width="100%"
                    height="300"
                    style={{ border: 0, pointerEvents: "none" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={c.locationTitle}
                  />
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-card/95 backdrop-blur-sm text-foreground text-xs font-semibold px-4 py-2 border border-border shadow-sm">
                      {c.openMaps} ↗
                    </span>
                  </div>
                </a>
                <p className="text-xs text-muted mt-3 font-mono">{c.address}</p>
              </div>

              {/* Full Gallery */}
              <div className="border border-border bg-card p-6">
                <h2 className="font-display text-lg font-bold text-foreground mb-4">{c.gallery}</h2>
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

            {/* Right column - Contact */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-4">
                {/* Price card */}
                <div className="border border-border bg-card p-6">
                  <div className="text-center mb-6">
                    <div className="font-display text-4xl font-bold text-primary">750€</div>
                    <div className="text-sm text-muted">{c.rentalType}</div>
                  </div>
                  <div className="space-y-3">
                    <a
                      href={WHATSAPP_LINKS[lang]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full bg-[hsl(142,71%,45%)] hover:bg-[hsl(142,71%,40%)] text-white font-semibold py-3 px-4 transition-colors text-sm"
                    >
                      <MessageCircle className="w-4 h-4" />
                      {c.whatsapp}
                    </a>
                    <a
                      href="mailto:info@propaxar.com?subject=Consulta%20Piso%20Frigiliana%20pa225"
                      className="flex items-center justify-center gap-2 w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-4 transition-colors text-sm"
                    >
                      <Mail className="w-4 h-4" />
                      {c.sendEmail}
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
                      <div className="font-bold text-foreground text-sm">{c.agentName}</div>
                      <div className="text-xs text-muted">{c.agentRole}</div>
                    </div>
                  </div>
                  <p className="text-xs text-muted leading-relaxed">{c.agentBio}</p>
                </div>

                {/* Highlights */}
                <div className="border border-border bg-card p-6">
                  <h3 className="font-display text-sm font-bold text-foreground mb-3 uppercase tracking-wide">{c.highlights}</h3>
                  <ul className="space-y-2">
                    {c.highlightsList.map((item, i) => (
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
            <div className="text-xs text-muted">© 2026 Propaxar · Frigiliana, Málaga</div>
          </div>
        </footer>
      </main>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[999] bg-black/90 flex items-center justify-center" onClick={closeLightbox}>
          <button className="absolute top-4 right-4 text-white/80 hover:text-white z-10" onClick={closeLightbox}>
            <X className="w-8 h-8" />
          </button>
          <button className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white z-10" onClick={(e) => { e.stopPropagation(); prevImage(); }}>
            <ChevronLeft className="w-10 h-10" />
          </button>
          <button className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white z-10" onClick={(e) => { e.stopPropagation(); nextImage(); }}>
            <ChevronRight className="w-10 h-10" />
          </button>
          <img
            src={PHOTOS[lightboxIdx]}
            alt={`Foto ${lightboxIdx + 1}`}
            className="w-[90vw] h-[85vh] object-contain"
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
