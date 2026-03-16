import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Bed, Bath, Home, Tag, Wind, Mountain, TreePine, MapPin, ChevronLeft, ChevronRight, X, MessageCircle, Mail, Phone, Flame, Car, Waves, Wifi, Sun, Eye, Coffee, Shrub } from "lucide-react";

const WHATSAPP_LINKS = {
  es: "https://wa.me/34662317561?text=Hola%20Manuel%2C%20me%20interesa%20la%20casa%20rural%20en%20Frigiliana%20(ref.%20pa218).%20%C2%BFPuedo%20agendar%20una%20visita%3F",
  en: "https://wa.me/34662317561?text=Hi%20Manuel%2C%20I%27m%20interested%20in%20the%20rural%20house%20in%20Frigiliana%20(ref.%20pa218).%20Can%20I%20schedule%20a%20viewing%3F",
};

const PHOTOS = [
  "/images/properties/casa-rural-01.jpg",
  "/images/properties/casa-rural-02.jpg",
  "/images/properties/casa-rural-03.jpg",
  "/images/properties/casa-rural-04.jpg",
  "/images/properties/casa-rural-05.jpg",
  "/images/properties/casa-rural-06.jpg",
  "/images/properties/casa-rural-07.jpg",
  "/images/properties/casa-rural-08.jpg",
  "/images/properties/casa-rural-09.jpg",
  "/images/properties/casa-rural-10.jpg",
  "/images/properties/casa-rural-11.jpg",
  "/images/properties/casa-rural-12.jpg",
  "/images/properties/casa-rural-13.jpg",
  "/images/properties/casa-rural-14.jpg",
  "/images/properties/casa-rural-15.jpg",
  "/images/properties/casa-rural-16.jpg",
  "/images/properties/casa-rural-17.jpg",
];

const t = {
  es: {
    title: "Casa rural en Frigiliana — 1.000€/mes | Propaxar",
    metaDesc: "Casa rural de 2 dormitorios y 1 baño en Frigiliana. Piscina privada, jardín, vistas al mar y montaña. 1.000€/mes. Ref. pa218.",
    ref: "Ref. pa218 · Alquiler residencial",
    heading: "Casa rural en Frigiliana",
    location: "Frigiliana, Málaga",
    perMonth: "/mes",
    type: "Tipo",
    typeValue: "Villa",
    bedrooms: "Dormitorios",
    bathroom: "Baño",
    size: "Superficie",
    reference: "Referencia",
    features: "Características",
    featuresList: [
      { icon: Wind, label: "Aire acondicionado" },
      { icon: Flame, label: "BBQ" },
      { icon: MapPin, label: "Cerca de servicios locales" },
      { icon: Shrub, label: "Jardín espacioso" },
      { icon: Car, label: "Parking" },
      { icon: Coffee, label: "Patio" },
      { icon: Waves, label: "Piscina privada" },
      { icon: Sun, label: "Solarium" },
      { icon: Eye, label: "Terraza con vista panorámica" },
      { icon: TreePine, label: "Terraza para comer al aire libre" },
      { icon: Eye, label: "Vista al mar" },
      { icon: Mountain, label: "Vistas a la montaña" },
      { icon: Wifi, label: "WiFi" },
    ],
    description: "Descripción",
    descIntro: <>Si estás buscando una casa donde relajarte, inspirarte y disfrutar de la vida al aire libre… esta puede ser la tuya.</>,
    descP1: <>A solo 5 minutos de Frigiliana, con acceso cómodo y asfaltado, te espera una propiedad que lo tiene todo para disfrutar desde el primer día. La vivienda cuenta con dos dormitorios, un baño completo, una cocina funcional y un salón acogedor que conecta con el exterior.</>,
    descSubtitle: "Lo que hace única a esta casa:",
    descBullets: [
      { title: "Zonas ajardinadas", text: <>Flores y árboles rodean la propiedad creando un entorno natural de <strong>belleza excepcional</strong>.</> },
      { title: "Barbacoa", text: <>Zona de BBQ integrada para disfrutar de <strong>comidas al aire libre</strong> en cualquier época del año.</> },
      { title: "Vistas panorámicas", text: <>Desde la terraza disfrutarás de <strong>vistas al mar y la montaña</strong> que te dejarán sin palabras.</> },
      { title: "Piscina privada", text: <>Una piscina privada rodeada de naturaleza, perfecta para <strong>refrescarte y relajarte</strong> en total privacidad.</> },
      { title: "Espacios exteriores", text: <>Diferentes rincones para <strong>leer, descansar o compartir momentos</strong> en buena compañía.</> },
    ],
    descClosing: "Una casa para disfrutar todo el año o pasar una temporada larga, en plena naturaleza y con total privacidad.",
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
      "Piscina privada rodeada de naturaleza",
      "Vistas panorámicas al mar y la montaña",
      "Jardín espacioso con zonas ajardinadas",
      "BBQ y múltiples espacios al aire libre",
      "2 dormitorios, 1 baño, 60m²",
      "Acceso cómodo y asfaltado",
      "A 5 minutos de Frigiliana",
      "WiFi incluido",
    ],
    address: "Frigiliana, Málaga 29788",
    langToggle: "EN",
  },
  en: {
    title: "Rural house in Frigiliana — €1,000/month | Propaxar",
    metaDesc: "2-bedroom, 1-bathroom rural house in Frigiliana. Private pool, garden, sea & mountain views. €1,000/month. Ref. pa218.",
    ref: "Ref. pa218 · Residential rental",
    heading: "Rural house in Frigiliana",
    location: "Frigiliana, Málaga",
    perMonth: "/month",
    type: "Type",
    typeValue: "Villa",
    bedrooms: "Bedrooms",
    bathroom: "Bathroom",
    size: "Size",
    reference: "Reference",
    features: "Features",
    featuresList: [
      { icon: Wind, label: "Air conditioning" },
      { icon: Flame, label: "BBQ" },
      { icon: MapPin, label: "Near local amenities" },
      { icon: Shrub, label: "Spacious garden" },
      { icon: Car, label: "Parking" },
      { icon: Coffee, label: "Patio" },
      { icon: Waves, label: "Private pool" },
      { icon: Sun, label: "Solarium" },
      { icon: Eye, label: "Panoramic view terrace" },
      { icon: TreePine, label: "Outdoor dining terrace" },
      { icon: Eye, label: "Sea views" },
      { icon: Mountain, label: "Mountain views" },
      { icon: Wifi, label: "WiFi" },
    ],
    description: "Description",
    descIntro: <>If you're looking for a home where you can relax, find inspiration and enjoy outdoor living… this could be yours.</>,
    descP1: <>Just 5 minutes from Frigiliana, with easy asphalted access, this property has everything you need to enjoy from day one. The house features two bedrooms, a full bathroom, a functional kitchen and a cosy living room that opens to the outdoors.</>,
    descSubtitle: "What makes this house unique:",
    descBullets: [
      { title: "Landscaped gardens", text: <>Flowers and trees surround the property creating a natural setting of <strong>exceptional beauty</strong>.</> },
      { title: "BBQ area", text: <>An integrated BBQ zone for enjoying <strong>outdoor meals</strong> any time of year.</> },
      { title: "Panoramic views", text: <>From the terrace you'll enjoy <strong>sea and mountain views</strong> that will leave you speechless.</> },
      { title: "Private pool", text: <>A private pool surrounded by nature, perfect for <strong>cooling off and relaxing</strong> in total privacy.</> },
      { title: "Outdoor spaces", text: <>Different corners for <strong>reading, resting or sharing moments</strong> in good company.</> },
    ],
    descClosing: "A house to enjoy all year round or for a long season, immersed in nature with total privacy.",
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
      "Private pool surrounded by nature",
      "Panoramic sea and mountain views",
      "Spacious landscaped garden",
      "BBQ and multiple outdoor spaces",
      "2 bedrooms, 1 bathroom, 60m²",
      "Easy asphalted access",
      "5 minutes from Frigiliana",
      "WiFi included",
    ],
    address: "Frigiliana, Málaga 29788",
    langToggle: "ES",
  },
};

type Lang = "es" | "en";

const MAPS_URL = "https://www.google.com/maps/place/R33M%2BV39+Frigiliana,+M%C3%A1laga";
const MAPS_EMBED = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3197.5!2d-3.9173!3d36.8047!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd7224b09423f143%3A0x7633d63a2455631a!2sR33M%2BV39%20Frigiliana%2C%20M%C3%A1laga!5e1!3m2!1ses!2ses!4v1772797075045!5m2!1ses!2ses";

const bodyFont = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
const cardStyle = { backgroundColor: '#ffffff', border: '1px solid #e5e7eb', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' };

const CasaRural = () => {
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
                <div className="text-white font-black" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>1.000€</div>
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
                  <p className="font-bold text-base" style={{ color: '#2d3e4e' }}>Visión general</p>
                </div>
                <div className="px-6 py-5 grid grid-cols-5 gap-4">
                  {[
                    { icon: Home, label: c.type, value: c.typeValue },
                    { icon: Bed, label: c.bedrooms, value: "2" },
                    { icon: Bath, label: c.bathroom, value: "1" },
                    { icon: Home, label: c.size, value: "60m²" },
                    { icon: Tag, label: c.reference, value: "pa218" },
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
                  <h3 className="font-black text-base mt-6 mb-3" style={{ color: '#2d3e4e' }}>{c.descSubtitle}</h3>
                  <ul className="space-y-4">
                    {c.descBullets.map((b, i) => (
                      <li key={i}>
                        <strong style={{ color: '#1a1a1a' }}>{b.title}:</strong>{' '}
                        <span style={{ color: '#666' }}>{b.text}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 font-medium" style={{ color: '#1a1a1a' }}>{c.descClosing}</p>
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
                    <div className="font-black text-4xl mb-1">1.000€</div>
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
                      href="mailto:info@propaxar.com?subject=Consulta%20Casa%20Rural%20Frigiliana%20pa218"
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

export default CasaRural;
