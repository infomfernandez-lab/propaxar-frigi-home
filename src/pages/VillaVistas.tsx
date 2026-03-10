import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Bed, Bath, Home, Tag, Wind, Mountain, TreePine, MapPin, ChevronLeft, ChevronRight, X, MessageCircle, Mail, Phone, Flame, Car, Waves, Sun, UtensilsCrossed } from "lucide-react";

const WHATSAPP_LINKS = {
  es: "https://wa.me/34662317561?text=Hola%20Manuel%2C%20me%20interesa%20la%20villa%20en%20Frigiliana%20con%20vistas%20panor%C3%A1micas%20(ref.%20pa219).%20%C2%BFPuedo%20agendar%20una%20visita%3F",
  en: "https://wa.me/34662317561?text=Hi%20Manuel%2C%20I%27m%20interested%20in%20the%20villa%20in%20Frigiliana%20with%20panoramic%20views%20(ref.%20pa219).%20Can%20I%20schedule%20a%20viewing%3F",
};

const PHOTOS = [
  "/images/properties/2715329-450898f9.jpg",
  "/images/properties/2715329-fffff734.jpg",
  "/images/properties/2715329-ffd0f281.jpg",
  "/images/properties/2715329-e01fa54b.jpg",
  "/images/properties/2715329-d8b3000c.jpg",
  "/images/properties/2715329-c6e758be.jpg",
  "/images/properties/2715329-c6deadca.jpg",
  "/images/properties/2715329-a8ba533b.jpg",
  "/images/properties/2715329-a1d8bd0c.jpg",
  "/images/properties/2715329-9c2eae77.jpg",
  "/images/properties/2715329-97eb620c.jpg",
  "/images/properties/2715329-93ad4953.jpg",
  "/images/properties/2715329-8ce85d51.jpg",
  "/images/properties/2715329-75e8d90d.jpg",
  "/images/properties/2715329-70b04a21.jpg",
  "/images/properties/2715329-535f6104.jpg",
  "/images/properties/2715329-4575c58a.jpg",
  "/images/properties/2715329-3f59e4c0.jpg",
  "/images/properties/2715329-2a81fdd0.jpg",
  "/images/properties/2715329-2097e680.jpg",
  "/images/properties/2715329-1be59e1a.jpg",
  "/images/properties/2715329-0d60ade4.jpg",
  "/images/properties/2715329-0ba84802.jpg",
];

const t = {
  es: {
    title: "Villa en Frigiliana · Vistas a todo — 1.700€/mes | Propaxar",
    metaDesc: "Villa de 3 dormitorios y 2 baños en Frigiliana con vistas panorámicas al mar y montaña. Piscina privada, BBQ, jardín con frutales. 1.700€/mes. Ref. pa219.",
    ref: "Ref. pa219 · Alquiler residencial",
    heading: "Villa en Frigiliana",
    subtitle: "Vistas a todo",
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
      { icon: Flame, label: "BBQ" },
      { icon: Flame, label: "Chimenea" },
      { icon: Home, label: "Oficina en casa" },
      { icon: Bed, label: "Habitación en suite" },
      { icon: TreePine, label: "Jardín espacioso" },
      { icon: Car, label: "Parking (3-4 coches)" },
      { icon: Waves, label: "Piscina privada" },
      { icon: Sun, label: "Solarium" },
      { icon: Mountain, label: "Terraza panorámica" },
      { icon: UtensilsCrossed, label: "Terraza para comer al aire libre" },
      { icon: TreePine, label: "Terreno con frutales" },
      { icon: Mountain, label: "Vista al mar" },
      { icon: Mountain, label: "Vistas a la montaña" },
    ],
    description: "Descripción",
    descIntro: <>El sueño mediterráneo hecho realidad — privacidad absoluta con vistas al mar, montaña y pueblo.</>,
    descP1: <>A solo 8 minutos en coche del icónico pueblo blanco de Frigiliana, esta villa ofrece la combinación perfecta entre la tranquilidad del campo y la cercanía a la vida local. Situada en una zona apacible con buen acceso, esta propiedad es un refugio privado donde el lujo de la naturaleza se fusiona con la comodidad de un hogar perfectamente equipado.</>,
    descSubtitle: "Lo que hace única esta Villa:",
    descBullets: [
      { title: "Exteriores Excepcionales", text: <>Los exteriores son el alma de la casa: un porche cubierto de cañizo, ideal para el verano, te invita a relajarte y contemplar una <strong>vista espectacular que abarca el Mar Mediterráneo, el campo circundante y el perfil encalado del pueblo de Frigiliana</strong>. Cuenta además con una gran barbacoa y despensa.</> },
      { title: "Piscina Privada con Vistas", text: <>En la parte superior, la <strong>piscina privada con su solárium</strong> te espera para refrescarte y disfrutar de las mismas vistas panorámicas que desde el porche.</> },
      { title: "Confort Interior", text: <>Los interiores están diseñados para el confort: <strong>acogedora chimenea y aire acondicionado</strong>, garantizando temperatura ideal en cualquier estación. Dormitorio principal en suite.</> },
      { title: "Parking y Jardín", text: <>La propiedad dispone de un <strong>jardín con árboles frutales</strong> y un amplio aparcamiento en la entrada, con capacidad para <strong>3 o 4 coches</strong>, asegurando la máxima privacidad y funcionalidad.</> },
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
      "Vistas panorámicas: mar, montaña y pueblo",
      "Piscina privada con solárium",
      "Porche cubierto con BBQ y despensa",
      "Parking privado para 3-4 vehículos",
      "3 dormitorios, 2 baños (1 en suite)",
      "Jardín con árboles frutales",
      "Aire acondicionado y chimenea",
      "A 8 min del pueblo de Frigiliana",
    ],
    address: "Frigiliana, Málaga 29788",
    langToggle: "EN",
  },
  en: {
    title: "Villa in Frigiliana · Panoramic Views — €1,700/month | Propaxar",
    metaDesc: "3-bedroom, 2-bathroom villa in Frigiliana with panoramic sea and mountain views. Private pool, BBQ, fruit garden. €1,700/month. Ref. pa219.",
    ref: "Ref. pa219 · Residential rental",
    heading: "Villa in Frigiliana",
    subtitle: "Panoramic Views",
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
      { icon: Flame, label: "BBQ" },
      { icon: Flame, label: "Fireplace" },
      { icon: Home, label: "Home office space" },
      { icon: Bed, label: "En-suite bedroom" },
      { icon: TreePine, label: "Spacious garden" },
      { icon: Car, label: "Parking (3-4 cars)" },
      { icon: Waves, label: "Private pool" },
      { icon: Sun, label: "Solarium" },
      { icon: Mountain, label: "Panoramic terrace" },
      { icon: UtensilsCrossed, label: "Outdoor dining terrace" },
      { icon: TreePine, label: "Fruit tree garden" },
      { icon: Mountain, label: "Sea views" },
      { icon: Mountain, label: "Mountain views" },
    ],
    description: "Description",
    descIntro: <>The Mediterranean dream come true — total privacy with sea, mountain and village views.</>,
    descP1: <>Just 8 minutes by car from the iconic white village of Frigiliana, this villa offers the perfect combination of countryside tranquillity and proximity to local life. Set in a peaceful area with good access, this property is a private retreat where nature's luxury merges with the comfort of a perfectly equipped home.</>,
    descSubtitle: "What makes this Villa unique:",
    descBullets: [
      { title: "Exceptional Outdoors", text: <>The outdoors are the soul of the house: a reed-covered porch, ideal for summer, invites you to relax and contemplate a <strong>spectacular view spanning the Mediterranean Sea, the surrounding countryside and the whitewashed outline of Frigiliana village</strong>. It also features a large barbecue and pantry.</> },
      { title: "Private Pool with Views", text: <>On the upper level, the <strong>private pool with its solarium</strong> awaits you for a refreshing dip while enjoying the same panoramic views as from the porch.</> },
      { title: "Interior Comfort", text: <>The interiors are designed for comfort: <strong>cozy fireplace and air conditioning</strong>, guaranteeing an ideal temperature in any season. Master bedroom en-suite.</> },
      { title: "Parking & Garden", text: <>The property has a <strong>garden with fruit trees</strong> and ample parking at the entrance, with capacity for <strong>3 to 4 cars</strong>, ensuring maximum privacy and functionality.</> },
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
      "Panoramic views: sea, mountain and village",
      "Private pool with solarium",
      "Covered porch with BBQ and pantry",
      "Private parking for 3-4 vehicles",
      "3 bedrooms, 2 bathrooms (1 en-suite)",
      "Garden with fruit trees",
      "Air conditioning and fireplace",
      "8 min from Frigiliana village",
    ],
    address: "Frigiliana, Málaga 29788",
    langToggle: "ES",
  },
};

type Lang = "es" | "en";

const MAPS_URL = "https://www.google.com/maps/place/R32H%2B69H+Frigiliana,+M%C3%A1laga";
const MAPS_EMBED = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3197.5!2d-3.8878!3d36.7925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd7224c1a4f6e8c1%3A0x1234567890abcdef!2sR32H%2B69H%20Frigiliana%2C%20M%C3%A1laga!5e1!3m2!1ses!2ses!4v1772797075045!5m2!1ses!2ses";

const bodyFont = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
const cardStyle = { backgroundColor: '#ffffff', border: '1px solid #e5e7eb', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' };

const VillaVistas = () => {
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
                <p className="text-white/70 font-semibold text-xl mt-1">{c.subtitle}</p>
                <p className="flex items-center gap-2 mt-2 text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  <MapPin className="w-4 h-4" />
                  {c.location}
                </p>
              </div>
              <div className="text-right">
                <div className="text-white font-black" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>1.600€</div>
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
                alt={`${c.heading} - ${c.subtitle}`}
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
                    { icon: Bed, label: c.bedrooms, value: "3" },
                    { icon: Bath, label: c.bathroom, value: "2" },
                    { icon: Home, label: c.size, value: "—" },
                    { icon: Tag, label: c.reference, value: "pa219" },
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
                    <div className="font-black text-4xl mb-1">1.600€</div>
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
                      href="mailto:info@propaxar.com?subject=Consulta%20Villa%20Frigiliana%20Vistas%20pa219"
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

export default VillaVistas;
