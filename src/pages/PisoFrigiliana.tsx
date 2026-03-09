import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Bed, Bath, Home, Tag, Wind, Mountain, TreePine, MapPin, ChevronLeft, ChevronRight, X, MessageCircle, Mail, Phone } from "lucide-react";

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
    descIntro: <>A menudo, en Frigiliana tienes que elegir entre <strong>'vistas increíbles'</strong> (pero con 100 cuestas para llegar a casa) o <strong>'comodidad de acceso'</strong> (pero sin terraza). Este piso rompe esa regla.</>,
    descP1: <>Ubicado en el Casco Nuevo, este dúplex te ofrece la facilidad de llegar a tu puerta sin esfuerzo y, una vez dentro, te regala una de las mejores terrazas de la zona: <strong>15 metros cuadrados de espacio privado</strong> para vivir al aire libre.</>,
    descP2: <>Es una propiedad con carácter, dividida en niveles para darte privacidad, y con el tamaño justo para ser tu refugio personal en el pueblo más bonito de España. Perfecto para una persona o pareja que valore la luz natural y el espacio exterior.</>,
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
    langToggle: "EN",
    overview: "Visión general",
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
    descIntro: <>In Frigiliana, you often have to choose between <strong>'incredible views'</strong> (but 100 steep hills to get home) or <strong>'easy access'</strong> (but no terrace). This apartment breaks that rule.</>,
    descP1: <>Located in the Casco Nuevo, this duplex gives you the ease of reaching your door effortlessly and, once inside, rewards you with one of the best terraces in the area: <strong>15 square metres of private space</strong> for outdoor living.</>,
    descP2: <>A property with character, split across levels for privacy, and just the right size to be your personal retreat in Spain's most beautiful village. Perfect for an individual or couple who values natural light and outdoor space.</>,
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
    langToggle: "ES",
    overview: "Overview",
  },
};

type Lang = "es" | "en";

const MAPS_URL = "https://www.google.com/maps/place/C.+Ermita,+29788+Frigiliana,+M%C3%A1laga";
const MAPS_EMBED = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3790.2290712553013!2d-3.8949735999999997!3d36.7879436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd7224b98b241ba1%3A0xe820b3a59482ebe0!2sC.%20Ermita%2C%2029788%20Frigiliana%2C%20M%C3%A1laga!5e1!3m2!1ses!2ses!4v1772797075045!5m2!1ses!2ses";

const bodyFont = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
const cardStyle = { backgroundColor: '#ffffff', border: '1px solid #e5e7eb', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' };

const PisoFrigiliana = () => {
  const [lang, setLang] = useState<Lang>(() => {
    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get("lang");
    if (urlLang === "en" || urlLang === "es") return urlLang;
    return (localStorage.getItem("finder-lang") as Lang) || "es";
  });
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(0);

  useEffect(() => { localStorage.setItem("finder-lang", lang); }, [lang]);

  const c = t[lang];
  const openLightbox = (idx: number) => { setLightboxIdx(idx); setLightboxOpen(true); };
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

      <div style={{ fontFamily: bodyFont, backgroundColor: '#f5f5f5', color: '#1a1a1a', minHeight: '100vh' }}>

        {/* ── Top bar ── */}
        <div style={{ backgroundColor: '#2d3e4e', position: 'sticky', top: 0, zIndex: 50 }}>
          <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
            <span className="text-white font-black text-lg tracking-tight">Propaxar</span>
            <button
              onClick={toggleLang}
              style={{ border: '1px solid rgba(255,255,255,0.45)', color: 'white', borderRadius: '6px', padding: '6px 14px', fontSize: '13px', fontWeight: 600, background: 'transparent', cursor: 'pointer', transition: 'background 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              {c.langToggle}
            </button>
          </div>
        </div>

        {/* ── Hero ── */}
        <section
          className="relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #2d3e4e 0%, #3d5a73 50%, #2d3e4e 100%)' }}
        >
          <div className="relative max-w-5xl mx-auto px-6 pt-12 pb-16">
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: 'rgba(255,255,255,0.5)' }}>{c.ref}</p>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
              <div>
                <h1
                  className="font-black text-white leading-tight"
                  style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', letterSpacing: '-0.025em', lineHeight: 1.1 }}
                >
                  {c.heading}
                </h1>
                <p className="flex items-center gap-2 mt-2 text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  <MapPin className="w-4 h-4" />
                  {c.location}
                </p>
              </div>
              <div className="text-right">
                <div className="text-white font-black" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>750€</div>
                <div className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>{c.perMonth}</div>
              </div>
            </div>

            {/* Hero image */}
            <div
              className="cursor-pointer overflow-hidden rounded-lg"
              style={{ border: '1px solid rgba(255,255,255,0.15)' }}
              onClick={() => openLightbox(0)}
            >
              <img
                src={PHOTOS[0]}
                alt={`${c.heading} - Vista principal`}
                className="w-full object-cover max-h-[480px] hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Wave */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
              <path d="M0 48h1440V24C1200 0 960 48 720 24S240 0 0 24V48z" fill="#f5f5f5" />
            </svg>
          </div>
        </section>

        {/* ── Content ── */}
        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Left column */}
            <div className="lg:col-span-2 space-y-6">

              {/* Quick stats */}
              <div className="rounded-lg overflow-hidden" style={cardStyle}>
                <div className="px-6 py-4" style={{ backgroundColor: '#f0f4f8', borderBottom: '1px solid #d1dde8' }}>
                  <p className="font-bold text-base" style={{ color: '#2d3e4e' }}>{c.overview}</p>
                </div>
                <div className="px-6 py-5 grid grid-cols-4 gap-4">
                  {[
                    { icon: Home, label: c.type, value: c.typeValue },
                    { icon: Bed, label: c.bedrooms, value: "1" },
                    { icon: Bath, label: c.bathroom, value: "1" },
                    { icon: Tag, label: c.reference, value: "pa225" },
                  ].map((stat, i) => (
                    <div key={i} className="text-center">
                      <stat.icon className="w-5 h-5 mx-auto mb-2" style={{ color: '#3d5a73' }} />
                      <div className="font-black text-xl" style={{ color: '#1a1a1a' }}>{stat.value}</div>
                      <div className="text-xs uppercase tracking-wide" style={{ color: '#9ca3af' }}>{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="rounded-lg overflow-hidden" style={cardStyle}>
                <div className="px-6 py-4" style={{ backgroundColor: '#f0f4f8', borderBottom: '1px solid #d1dde8' }}>
                  <p className="font-bold text-base" style={{ color: '#2d3e4e' }}>{c.features}</p>
                </div>
                <div className="px-6 py-5 grid grid-cols-2 gap-3">
                  {c.featuresList.map((f, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm" style={{ color: '#1a1a1a' }}>
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: 'rgba(61,90,115,0.1)' }}
                      >
                        <f.icon className="w-4 h-4" style={{ color: '#3d5a73' }} />
                      </div>
                      {f.label}
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="rounded-lg overflow-hidden" style={cardStyle}>
                <div className="px-6 py-4" style={{ backgroundColor: '#f0f4f8', borderBottom: '1px solid #d1dde8' }}>
                  <p className="font-bold text-base" style={{ color: '#2d3e4e' }}>{c.description}</p>
                </div>
                <div className="px-6 py-5 space-y-4 text-sm leading-relaxed" style={{ color: '#444' }}>
                  <p className="font-bold text-base" style={{ color: '#1a1a1a' }}>{c.descIntro}</p>
                  <p>{c.descP1}</p>
                  <p>{c.descP2}</p>
                </div>
              </div>

              {/* Location */}
              <div className="rounded-lg overflow-hidden" style={cardStyle}>
                <div className="px-6 py-4 flex items-center justify-between" style={{ backgroundColor: '#f0f4f8', borderBottom: '1px solid #d1dde8' }}>
                  <p className="font-bold text-base" style={{ color: '#2d3e4e' }}>{c.locationTitle}</p>
                  <a
                    href={MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold flex items-center gap-1.5 hover:opacity-70 transition-opacity"
                    style={{ color: '#3d5a73' }}
                  >
                    <MapPin className="w-3 h-3" />
                    {c.openMaps} ↗
                  </a>
                </div>
                <div className="px-6 py-5">
                  <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="block relative group overflow-hidden rounded-lg" style={{ border: '1px solid #e5e7eb' }}>
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
                    <div className="absolute inset-0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold px-4 py-2 rounded-lg" style={{ backgroundColor: '#fff', color: '#1a1a1a', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
                        {c.openMaps} ↗
                      </span>
                    </div>
                  </a>
                  <p className="text-xs mt-3" style={{ color: '#9ca3af' }}>{c.address}</p>
                </div>
              </div>

              {/* Gallery */}
              <div className="rounded-lg overflow-hidden" style={cardStyle}>
                <div className="px-6 py-4" style={{ backgroundColor: '#f0f4f8', borderBottom: '1px solid #d1dde8' }}>
                  <p className="font-bold text-base" style={{ color: '#2d3e4e' }}>{c.gallery}</p>
                </div>
                <div className="px-6 py-5">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {PHOTOS.map((photo, i) => (
                      <div
                        key={i}
                        className="cursor-pointer overflow-hidden rounded-lg aspect-[4/3]"
                        style={{ border: '1px solid #e5e7eb' }}
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
            </div>

            {/* Right column — Sticky sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-20 space-y-4">

                {/* Price card */}
                <div className="rounded-lg overflow-hidden text-white" style={{ background: 'linear-gradient(135deg, #2d3e4e 0%, #3d5a73 100%)' }}>
                  <div className="px-6 py-6 text-center">
                    <div className="font-black text-4xl mb-1">750€</div>
                    <div className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>{c.rentalType}</div>
                  </div>
                  <div className="px-6 pb-6 space-y-3">
                    <a
                      href={WHATSAPP_LINKS[lang]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full font-bold py-3 px-4 rounded-lg transition-all text-sm hover:opacity-90"
                      style={{ backgroundColor: '#22c55e', color: '#fff' }}
                    >
                      <MessageCircle className="w-4 h-4" />
                      {c.whatsapp}
                    </a>
                    <a
                      href="mailto:info@propaxar.com?subject=Consulta%20Piso%20Frigiliana%20pa225"
                      className="flex items-center justify-center gap-2 w-full font-bold py-3 px-4 rounded-lg transition-all text-sm hover:bg-white/20"
                      style={{ backgroundColor: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)', color: '#fff' }}
                    >
                      <Mail className="w-4 h-4" />
                      {c.sendEmail}
                    </a>
                    <a
                      href="tel:+34662317561"
                      className="flex items-center justify-center gap-2 w-full font-semibold py-3 px-4 rounded-lg transition-all text-sm hover:bg-white/20"
                      style={{ backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.8)' }}
                    >
                      <Phone className="w-4 h-4" />
                      +34 662 317 561
                    </a>
                  </div>
                </div>

                {/* Agent card */}
                <div className="rounded-lg p-6" style={cardStyle}>
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center font-black text-lg text-white"
                      style={{ backgroundColor: '#3d5a73' }}
                    >
                      M
                    </div>
                    <div>
                      <div className="font-bold text-sm" style={{ color: '#1a1a1a' }}>{c.agentName}</div>
                      <div className="text-xs" style={{ color: '#9ca3af' }}>{c.agentRole}</div>
                    </div>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: '#666' }}>{c.agentBio}</p>
                </div>

                {/* Highlights */}
                <div className="rounded-lg p-6" style={cardStyle}>
                  <h3 className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: '#2d3e4e' }}>{c.highlights}</h3>
                  <ul className="space-y-2.5">
                    {c.highlightsList.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs" style={{ color: '#1a1a1a' }}>
                        <span className="font-black mt-0.5" style={{ color: '#22c55e' }}>✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ backgroundColor: '#2d3e4e' }} className="py-8">
          <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="text-white font-black text-lg">Propaxar</span>
            <span className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>© 2026 Propaxar · Frigiliana, Málaga</span>
          </div>
        </div>
      </div>

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
