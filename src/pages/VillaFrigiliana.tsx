import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Bed, Bath, Home, Tag, Wind, Mountain, TreePine, MapPin, ChevronLeft, ChevronRight, X, MessageCircle, Mail, Phone, Globe, Flame, Car, Waves, Wifi, DoorOpen } from "lucide-react";

const WHATSAPP_LINKS = {
  es: "https://wa.me/34662317561?text=Hola%20Manuel%2C%20me%20interesa%20la%20villa%20en%20Frigiliana%20(ref.%20pa194).%20%C2%BFPuedo%20agendar%20una%20visita%3F",
  en: "https://wa.me/34662317561?text=Hi%20Manuel%2C%20I%27m%20interested%20in%20the%20villa%20in%20Frigiliana%20(ref.%20pa194).%20Can%20I%20schedule%20a%20viewing%3F",
};

const PHOTOS = [
  "/images/properties/3843121-14b2d3a1.jpg",
  "/images/properties/3843121-05a32812.jpg",
  "/images/properties/3843121-524b50d1.jpg",
  "/images/properties/3843121-c46b8798.jpg",
  "/images/properties/3843121-58d0de97.jpg",
  "/images/properties/3843121-e0cd04a0.jpg",
  "/images/properties/3843121-b3393a8e.jpg",
  "/images/properties/3843121-bd67a1c3.jpg",
  "/images/properties/3843121-2183a5f8.jpg",
  "/images/properties/3843121-60cd3a6b.jpg",
  "/images/properties/3843121-765ea3c7.jpg",
  "/images/properties/3843121-8760b81c.jpg",
  "/images/properties/3843121-2b220253.jpg",
  "/images/properties/3843121-ca3ef252.jpg",
  "/images/properties/3843121-cb09121a.jpg",
  "/images/properties/3843121-21aa5f66.jpg",
];

const t = {
  es: {
    title: "Villa en Frigiliana — 1.400€/mes | Propaxar",
    metaDesc: "Villa de 3 dormitorios y 2 baños en Frigiliana. Piscina privada, porche cubierto, vistas a la montaña. 1.400€/mes. Ref. pa194.",
    ref: "Ref. pa194 · Alquiler residencial",
    heading: "Villa en Frigiliana",
    location: "Frigiliana, Málaga",
    perMonth: "/mes",
    type: "Tipo",
    typeValue: "Villa",
    bedrooms: "Dormitorios",
    bathroom: "Baños",
    size: "Superficie",
    reference: "Referencia",
    features: "Características",
    featuresList: [
      { icon: Wind, label: "Aire acondicionado" },
      { icon: DoorOpen, label: "Armarios empotrados" },
      { icon: Flame, label: "BBQ" },
      { icon: Flame, label: "Chimenea" },
      { icon: Car, label: "Parking" },
      { icon: Waves, label: "Piscina privada" },
      { icon: Mountain, label: "Solarium" },
      { icon: TreePine, label: "Terraza" },
      { icon: Mountain, label: "Vistas a la montaña" },
      { icon: Wifi, label: "WiFi" },
    ],
    description: "Descripción",
    descIntro: <>Privacidad, acceso impecable y vida exterior los 365 días del año.</>,
    descP1: <>Esta propiedad destaca por combinar la estética rústica auténtica de la Axarquía con una infraestructura práctica, algo poco común en las casas de campo. Es una vivienda diseñada para quienes valoran la tranquilidad sin complicaciones logísticas.</>,
    descSubtitle: "Lo que hace única a esta Villa:",
    descBullets: [
      { title: "Acceso y Conectividad", text: <>Olvida los carriles de tierra complicados. El acceso desde el pueblo es <strong>directo, rápido y sencillo</strong>, lo que facilita el día a día para compras o visitas.</> },
      { title: "Parking", text: <>La propiedad cuenta con una zona de estacionamiento privada en la entrada con capacidad para <strong>varios vehículos</strong>, ideal para recibir visitas o para familias con más de un coche.</> },
      { title: 'El Porche "Todo Año"', text: <>El diseño del porche cubierto es excepcional. Está pensado para ser una extensión del salón incluso en <strong>días de lluvia en invierno</strong>, permitiéndote disfrutar del aire libre y las vistas protegida de los elementos. En los días de sol, se convierte en el mejor mirador de la zona.</> },
      { title: "Zona de Ocio Privada", text: <>La piscina cuenta con un <strong>fantástico solárium</strong> y una zona de barbacoa integrada, creando un espacio de entretenimiento totalmente privado rodeado de naturaleza.</> },
    ],
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
      "Piscina privada con solárium",
      "Porche cubierto — vida exterior todo el año",
      "Acceso directo y sencillo desde el pueblo",
      "Parking privado para varios vehículos",
      "3 dormitorios, 2 baños, 102m²",
      "Vistas a la montaña",
      "BBQ y chimenea",
      "WiFi incluido",
    ],
    address: "Frigiliana, Málaga 29788",
  },
  en: {
    title: "Villa in Frigiliana — €1,400/month | Propaxar",
    metaDesc: "3-bedroom, 2-bathroom villa in Frigiliana. Private pool, covered porch, mountain views. €1,400/month. Ref. pa194.",
    ref: "Ref. pa194 · Residential rental",
    heading: "Villa in Frigiliana",
    location: "Frigiliana, Málaga",
    perMonth: "/month",
    type: "Type",
    typeValue: "Villa",
    bedrooms: "Bedrooms",
    bathroom: "Bathrooms",
    size: "Size",
    reference: "Reference",
    features: "Features",
    featuresList: [
      { icon: Wind, label: "Air conditioning" },
      { icon: DoorOpen, label: "Built-in wardrobes" },
      { icon: Flame, label: "BBQ" },
      { icon: Flame, label: "Fireplace" },
      { icon: Car, label: "Parking" },
      { icon: Waves, label: "Private pool" },
      { icon: Mountain, label: "Solarium" },
      { icon: TreePine, label: "Terrace" },
      { icon: Mountain, label: "Mountain views" },
      { icon: Wifi, label: "WiFi" },
    ],
    description: "Description",
    descIntro: <>Privacy, impeccable access and outdoor living 365 days a year.</>,
    descP1: <>This property stands out by combining the authentic rustic aesthetic of the Axarquía with practical infrastructure — something uncommon in countryside homes. It's a home designed for those who value tranquillity without logistical complications.</>,
    descSubtitle: "What makes this Villa unique:",
    descBullets: [
      { title: "Access & Connectivity", text: <>Forget the complicated dirt tracks. The access from the village is <strong>direct, fast and simple</strong>, making daily life easy for shopping or visits.</> },
      { title: "Parking", text: <>The property has a private parking area at the entrance with capacity for <strong>several vehicles</strong>, ideal for receiving guests or for families with more than one car.</> },
      { title: 'The "All-Year" Porch', text: <>The covered porch design is exceptional. It's designed to be an extension of the living room even on <strong>rainy winter days</strong>, allowing you to enjoy the outdoors and the views protected from the elements. On sunny days, it becomes the best viewpoint in the area.</> },
      { title: "Private Leisure Area", text: <>The pool has a <strong>fantastic solarium</strong> and an integrated barbecue area, creating a completely private entertainment space surrounded by nature.</> },
    ],
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
      "Private pool with solarium",
      "Covered porch — outdoor living all year round",
      "Direct and easy access from the village",
      "Private parking for multiple vehicles",
      "3 bedrooms, 2 bathrooms, 102m²",
      "Mountain views",
      "BBQ and fireplace",
      "WiFi included",
    ],
    address: "Frigiliana, Málaga 29788",
  },
};

type Lang = "es" | "en";

const MAPS_URL = "https://www.google.com/maps/place/Q3WQ%2B7VJ+Frigiliana";
const MAPS_EMBED = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3197.5!2d-3.895!3d36.788!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd7224b98b241ba1%3A0xe820b3a59482ebe0!2sFrigiliana%2C%20M%C3%A1laga!5e1!3m2!1ses!2ses";

const VillaFrigiliana = () => {
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

      {/* Language toggle */}
      <button
        onClick={toggleLang}
        className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-card/95 backdrop-blur-md border border-border shadow-lg px-3.5 py-2 hover:bg-card transition-colors"
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
              <div className="font-display text-4xl md:text-5xl font-bold text-primary">1.400€</div>
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
              <div className="grid grid-cols-5 gap-4 border border-border bg-card p-6">
                {[
                  { icon: Home, label: c.type, value: c.typeValue },
                  { icon: Bed, label: c.bedrooms, value: "3" },
                  { icon: Bath, label: c.bathroom, value: "2" },
                  { icon: Home, label: c.size, value: "102m²" },
                  { icon: Tag, label: c.reference, value: "pa194" },
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
                  <p className="font-semibold text-base">{c.descIntro}</p>
                  <p>{c.descP1}</p>
                  <h3 className="font-display text-base font-bold mt-6 mb-3">{c.descSubtitle}</h3>
                  <ul className="space-y-4">
                    {c.descBullets.map((b, i) => (
                      <li key={i}>
                        <strong>{b.title}:</strong> {b.text}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Location */}
              <div className="border border-border bg-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display text-lg font-bold text-foreground">{c.locationTitle}</h2>
                  <a
                    href={MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-muted hover:text-primary transition-colors flex items-center gap-1.5"
                  >
                    <MapPin className="w-3 h-3" />
                    {c.openMaps}
                  </a>
                </div>
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative group overflow-hidden border border-border"
                >
                  <iframe
                    src={MAPS_EMBED}
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
                    <div className="font-display text-4xl font-bold text-primary">1.400€</div>
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
                      href="mailto:info@propaxar.com?subject=Consulta%20Villa%20Frigiliana%20pa194"
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

export default VillaFrigiliana;
