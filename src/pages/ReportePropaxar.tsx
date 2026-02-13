import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp, MapPin, Check, AlertTriangle, Star, ExternalLink, MessageCircle, Mail, Download, Clock, Search, Target, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import heroImg from "@/assets/hero-frigiliana.jpg";

// Report-specific color tokens
const COLORS = {
  green: "142 71% 45%",
  blueDark: "213 56% 23%",
  grayText: "215 19% 34%",
};

const WHATSAPP_LINK = "https://wa.me/34662317561?text=Hola%20Manuel%2C%20he%20visto%20el%20reporte%20y%20me%20gustaría%20hablar.";
const EMAIL_LINK = "mailto:info@propaxar.com?subject=Reporte%20Inmobiliario%20-%20Consulta";

// Scroll fade-in hook
function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, className: `transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}` };
}

// ─── PROPIEDADES REALES ───
const properties = [
  {
    id: 1,
    ref: "pa194",
    name: "Casa Zambra - Camino de la Cruz",
    price: "€1,600/mes",
    beds: 3,
    baths: 2,
    size: "100m²",
    rating: 5,
    badge: "PROPAXAR DIRECT",
    summary: "Casa rústica en zona premium. Vistas espectaculares 360°, acceso perfecto, luz natural todo el día. Orientación sur. Ideal trabajo remoto.",
    photos: [
      "https://propaxar.com/wp-content/uploads/2025/09/3843121-14b2d3a1.jpg",
      "https://propaxar.com/wp-content/uploads/2025/09/3843121-05a32812.jpg",
      "https://propaxar.com/wp-content/uploads/2025/09/3843121-524b50d1.jpg",
      "https://propaxar.com/wp-content/uploads/2025/09/3843121-c46b8798.jpg",
      "https://propaxar.com/wp-content/uploads/2025/09/3843121-58d0de97.jpg",
      "https://propaxar.com/wp-content/uploads/2025/09/3843121-e0cd04a0.jpg",
    ],
    location: { address: "Camino de la Cruz - Frigiliana Oeste", lat: 36.7928, lng: -3.8970 },
    pros: [
      "Ubicación perfecta - zona más demandada Frigiliana",
      "Acceso perfecto - coche hasta la puerta",
      "Vistas espectaculares mar, campo, montaña y pueblo",
      "Orientación sur - luz natural todo el día",
      "Espacios exteriores amplios y aprovechables",
      "2 baños completos",
      "Propietarios locales serios - respuesta rápida",
    ],
    cons: [
      "Casa contigua (pero muy privada)",
      "Carril al lado - se escuchan coches pasar ocasionalmente (no molesto)",
      "Internet WiMax 60MB - suficiente pero no fibra",
    ],
    analysis: {
      quality: { stars: 5, text: "Construcción estilo rústico muy bien mantenida. Propietarios cuidan casa impecablemente. Sin humedades, todo funciona perfectamente." },
      price: { stars: 4, label: "JUSTO", text: "€1,600 precio correcto para zona premium. Casas similares Loma Cruz: €1,100-1,500.\nPotencial negociación: Bajo (5%). Propietarios serios, precio justo desde inicio." },
      location: { stars: 5, label: "EXCELENTE", text: "Mejor zona Frigiliana campo. Alta demanda constante.\nAcceso rápido desde Frigiliana/Nerja/Torrox por varios caminos.\nOrientación sur perfecta." },
    },
    tests: [
      { label: "Internet", status: "ok", detail: "WiMax 60MB", note: "Instalado y funcionando - Starlink 300MB opcional €70/mes" },
      { label: "Móvil", status: "ok", detail: "Cobertura perfecta", note: "Movistar/Vodafone - 4-5 barras" },
      { label: "Ruido día", status: "ok", detail: "Bajo", note: "Carril con tráfico ocasional - no molesto" },
      { label: "Ruido noche", status: "ok", detail: "Silencioso", note: "Zona residencial tranquila" },
      { label: "Luz natural", status: "ok", detail: "Excelente", note: "Orientación sur - sol todo el día" },
      { label: "Agua", status: "ok", detail: "Presión buena", note: "Agua agrícola - sin cortes" },
    ],
    insider: {
      owner: "Loli Triviño - Propietaria española local. Muy atenta, mantiene propiedad impecable, seria y rápida si se necesita. Responde mismo día siempre.",
      history: "Alquilada últimos años larga temporada a extranjeros. Bien mantenida siempre. Sin incidencias nunca. Pintada hace 1 año.",
      neighbors: "Vecinos tranquilos, casa contigua pero privacidad total. Sin incidencias previas nunca. Ambiente agradable.",
    },
    lifestyle: {
      fits: [
        "Valoras vistas espectaculares + luz natural",
        "Quieres zona premium pero tranquila",
        "Trabajas remoto (internet 60MB suficiente)",
        "Priorizas acceso perfecto con coche",
      ],
      notFits: [
        "Necesitas fibra 300MB+ obligatorio",
        "Buscas aislamiento total (hay vecinos cerca)",
        "Presupuesto ajustado (hay opciones más baratas)",
      ],
    },
    listingUrl: "https://propaxar.com/property/villa-en-frigiliana-6",
    driveUrl: "https://drive.google.com/drive/folders/1XhEL6ay8jYCKPzayFkCQGvrAjU-0JRA1?usp=drive_link",
    mapsUrl: "https://www.google.com/maps?q=36.7928,-3.8970",
    gestion: "Propaxar",
    parking: "✅",
    vistas: 5,
    internet: "60MB",
    ruido: "Bajo",
    disponible: "1 Marzo 2026",
  },
  {
    id: 2,
    ref: "pa220",
    name: "Casa Fabi - Camino de la Cruz",
    price: "€1,600/mes",
    beds: 3,
    baths: 2,
    size: "120m²",
    rating: 4,
    badge: "PROPAXAR DIRECT",
    summary: "Casa amplia 120m² en zona alta. Vistas despejadas Mediterráneo y campo. Jardines agradables, piscina bien ubicada. DISPONIBLE YA (1 Feb).",
    photos: [
      "https://propaxar.com/wp-content/uploads/2025/09/IMG_8023-scaled.jpeg",
      "https://propaxar.com/wp-content/uploads/2025/09/IMG_8012-1-scaled.jpeg",
      "https://propaxar.com/wp-content/uploads/2025/09/IMG_8028-1-scaled.jpeg",
      "https://propaxar.com/wp-content/uploads/2025/09/IMG_8030-1-scaled.jpeg",
      "https://propaxar.com/wp-content/uploads/2025/09/IMG_8027-1-scaled.jpeg",
      "https://propaxar.com/wp-content/uploads/2025/09/IMG_8031-1-scaled.jpeg",
    ],
    location: { address: "Camino de la Cruz - Frigiliana Este", lat: 36.7930, lng: -3.8960 },
    pros: [
      "Disponible YA (1 Febrero) - antes que otras",
      "Casa más grande - 120m² espaciosa",
      "Vistas despejadas Mediterráneo + campo",
      "Jardines y exteriores agradables",
      "Piscina buen tamaño y ubicación",
      "Buena privacidad",
      "2 baños completos",
    ],
    cons: [
      "Escalera acceso vivienda (no todo en planta baja)",
      "Se escuchan vehículos ocasionalmente (sin molestia)",
      "Precio algo elevado para zona (€1,600 vs €1,200-1,500 similares)",
      "Internet WiMax 60MB - no fibra",
    ],
    analysis: {
      quality: { stars: 3, text: "Construcción buena calidad. Mantenimiento interior correcto. Algunos detalles menores pendientes pero nada importante." },
      price: { stars: 3, label: "ALGO ALTO", text: "€1,600 un poco por encima media zona. Similares €1,200-1,500.\nPotencial negociación: Moderado (8-10%). Podrías conseguir €1,450-1,500." },
      location: { stars: 4, label: "MUY BUENA", text: "Una de mejores zonas campo Frigiliana. Zona alta demanda.\nBuen acceso, cerca carretera principal." },
    },
    tests: [
      { label: "Internet", status: "ok", detail: "WiMax 60MB", note: "Instalado - Starlink 300MB opcional" },
      { label: "Móvil", status: "ok", detail: "Cobertura perfecta", note: "4-5 barras todas operadoras" },
      { label: "Ruido día", status: "ok", detail: "Moderado", note: "Tráfico ocasional carril" },
      { label: "Ruido noche", status: "ok", detail: "Silencioso", note: "Zona tranquila" },
      { label: "Luz natural", status: "ok", detail: "Muy buena", note: "Orientación correcta" },
      { label: "Agua", status: "ok", detail: "Presión correcta", note: "Agua agrícola fiable" },
    ],
    insider: {
      owner: "Sebastian Noberto - Propietario español local, hombre mayor serio y atento. Formal en todo. Sin problemas nunca.",
      history: "Siempre alquilada larga estancia. Mantenimiento regular. Inquilinos previos extranjeros contentos.",
      neighbors: "Vecinos al lado pero no pegados. Vecindario agradable y formal. Ninguna incidencia registrada nunca.",
    },
    lifestyle: {
      fits: [
        "Familia o pareja - necesitas espacio (120m²)",
        "Valoras vistas mar + campo",
        "Quieres mudarte YA (disponible 1 Feb)",
        "Priorizas tamaño sobre precio",
      ],
      notFits: [
        "Presupuesto ajustado €1,200-1,400 máximo",
        "Movilidad reducida (hay escaleras)",
        "Necesitas fibra rápida obligatorio",
      ],
    },
    listingUrl: "https://propaxar.com/property/villa-en-frigiliana-4/",
    driveUrl: "#",
    mapsUrl: "https://www.google.com/maps?q=36.7930,-3.8960",
    gestion: "Propaxar",
    parking: "✅",
    vistas: 5,
    internet: "60MB",
    ruido: "Moderado",
    disponible: "1 Febrero 2026 (YA)",
  },
  {
    id: 3,
    ref: "pa224",
    name: "Casa Loma de la Cruz - María del Mar",
    price: "€1,600/mes",
    beds: 3,
    baths: 1,
    size: "75m²",
    rating: 3,
    badge: "PROPAXAR DIRECT",
    summary: "Casa sólida en Loma Cruz. Construcción alta calidad, bien mantenida. Zona premium. Parking propio. Algo pequeña (75m²) y solo 1 baño.",
    photos: [
      "https://propaxar.com/wp-content/uploads/2026/02/IMG_7565-scaled.jpg",
      "https://propaxar.com/wp-content/uploads/2026/02/IMG_7652-scaled.jpg",
      "https://propaxar.com/wp-content/uploads/2026/02/IMG_7649-scaled.jpg",
      "https://propaxar.com/wp-content/uploads/2026/02/IMG_7645-scaled.jpg",
      "https://propaxar.com/wp-content/uploads/2026/02/IMG_7641-scaled.jpg",
      "https://propaxar.com/wp-content/uploads/2026/02/IMG_7637-scaled.jpg",
    ],
    location: { address: "Camino de la Cruz - Loma de la Cruz", lat: 36.7925, lng: -3.8968 },
    pros: [
      "Construcción alta calidad - sólida",
      "Muy bien mantenida - pintada reciente",
      "Ventanas nuevas instaladas",
      "Parking propio + entrada vehículos privada",
      "Zona Loma Cruz - alta demanda",
      "Buen aislamiento paredes/tejados",
    ],
    cons: [
      "Solo 75m² - algo pequeña para 3 dormitorios",
      "Solo 1 baño (vs 2 otras opciones)",
      "Habitaciones tamaño medio - no grandes",
      "Precio €1,600 algo elevado para tamaño (similares €1,000-1,500)",
      "Sol solo mediodía y tarde (no mañana)",
    ],
    analysis: {
      quality: { stars: 4, text: "Construcción sólida, muy bien mantenida. Propietaria cuida casa. Renovaciones recientes (pintura, ventanas). Sin problemas." },
      price: { stars: 2, label: "ELEVADO", text: "€1,600 alto para 75m². Similares 3 dorms: €1,000-1,500.\nPotencial negociación: Muy bajo (5%). Propietaria mantiene precio firme." },
      location: { stars: 4, label: "EXCELENTE", text: "Loma Cruz - mejor zona campo Frigiliana. Alta demanda constante.\nAcceso bueno, parking propio." },
    },
    tests: [
      { label: "Internet", status: "ok", detail: "WiMax 60MB", note: "Instalado - Starlink 300MB opcional" },
      { label: "Móvil", status: "ok", detail: "Cobertura buena", note: "4 barras" },
      { label: "Ruido día", status: "ok", detail: "Silencioso", note: "Sin ruidos" },
      { label: "Ruido noche", status: "ok", detail: "Muy silencioso", note: "Área tranquila total" },
      { label: "Luz natural", status: "ok", detail: "Buena tarde", note: "Sol mediodía-tarde" },
      { label: "Agua", status: "ok", detail: "Presión buena", note: "Agua agrícola fiable" },
    ],
    insider: {
      owner: "María del Mar Martín - Propietaria española local. Persona seria y comunicativa. Responde rápido siempre. Cuida mucho su propiedad.",
      history: "Alquilada siempre por años. Pintada recientemente. Ventanas nuevas. Mantenimiento impecable constante.",
      neighbors: "Vecinos cerca pero alta privacidad. Área sin ruidos, tranquila. Sin incidencias.",
    },
    lifestyle: {
      fits: [
        "Solo 2 personas (pareja) - espacio suficiente",
        "Valoras calidad construcción + mantenimiento",
        "Quieres zona premium Loma Cruz",
        "Priorizas tranquilidad absoluta",
      ],
      notFits: [
        "Familia 3-4 personas (pequeña + 1 baño)",
        "Presupuesto ajustado (cara para tamaño)",
        "Necesitas espacio grande (solo 75m²)",
      ],
    },
    listingUrl: "https://propaxar.com/property/villa-en-frigiliana-8/",
    driveUrl: "https://drive.google.com/drive/folders/1-aYgULtFXuoSE8vj88io7lh2kOJj_LNV?usp=drive_link",
    mapsUrl: "https://www.google.com/maps?q=36.7925,-3.8968",
    gestion: "Propaxar",
    parking: "✅",
    vistas: 4,
    internet: "60MB",
    ruido: "Muy bajo",
    disponible: "1 Marzo 2026",
  },
  {
    id: 4,
    ref: "pa223",
    name: "Villa Patricia - Frigiliana Norte",
    price: "€900/mes",
    beds: 2,
    baths: 2,
    size: "90m²",
    rating: 4,
    badge: "PROPAXAR DIRECT",
    summary: "MEJOR PRECIO - €900/mes. Casa tranquila zona norte. Orientación sur, luz natural. Exteriores amplios + huerto. Solo 2 dorms. Disponible Abril.",
    photos: [
      "https://propaxar.com/wp-content/uploads/2026/01/IMG_4099-scaled.jpg",
      "https://propaxar.com/wp-content/uploads/2026/01/IMG_4202-scaled.jpg",
      "https://propaxar.com/wp-content/uploads/2026/01/IMG_4178-scaled.jpg",
      "https://propaxar.com/wp-content/uploads/2026/01/IMG_4127-scaled.jpg",
      "https://propaxar.com/wp-content/uploads/2026/01/IMG_4108-scaled.jpg",
      "https://propaxar.com/wp-content/uploads/2026/01/IMG_4105-scaled.jpg",
    ],
    location: { address: "Villa Patricia, Diseminado - Frigiliana Norte", lat: 36.7945, lng: -3.8940 },
    pros: [
      "PRECIO EXCELENTE - €900 (€700 menos que otras)",
      "Ubicación muy tranquila - pocos vecinos",
      "Orientación sur - mucha luz natural",
      "Exteriores amplios con diferentes zonas",
      "Huerto incluido",
      "2 baños completos",
      "Ningún vecino detrás ni a los lados",
    ],
    cons: [
      "Solo 2 dormitorios (vs 3 otras opciones)",
      "Acceso 300m carril agrícola sin asfaltar",
      "Zona norte - algo alejada centro (3 min coche)",
      "Disponible solo Abril (mes después)",
      "Casa más pequeña 90m²",
    ],
    analysis: {
      quality: { stars: 3, text: "Casa sólida construida principios 2000. Bien mantenida. Estructura buena, sin problemas importantes." },
      price: { stars: 4, label: "MUY BUENO", text: "€900 justo. Similares zona norte: €900-1,300.\nAhorro: €8,400/año vs opciones €1,600.\nPotencial negociación: Moderado (5%). Podrías €850." },
      location: { stars: 3, label: "BUENA", text: "Zona muy tranquila. Acceso carretera principal 3 min.\nAlgo alejada centro pero compensado por precio/tranquilidad." },
    },
    tests: [
      { label: "Internet", status: "ok", detail: "WiMax 60MB", note: "Instalado - Starlink 300MB opcional" },
      { label: "Móvil", status: "ok", detail: "Cobertura buena", note: "3-4 barras" },
      { label: "Ruido día", status: "ok", detail: "Muy silencioso", note: "Aislamiento total" },
      { label: "Ruido noche", status: "ok", detail: "Silencio absoluto", note: "Zona muy tranquila" },
      { label: "Luz natural", status: "ok", detail: "Excelente", note: "Orientación sur perfecta" },
      { label: "Agua", status: "ok", detail: "Presión buena", note: "Agua agrícola sin problemas" },
    ],
    insider: {
      owner: "Jose Manuel Cobos - Propietario español local, persona seria. Inquilinos anteriores contentos siempre.",
      history: "Alquilada actualmente a Katinka hasta 31 Marzo 2026. Disponible 1 Abril. Sin incidencias nunca.",
      neighbors: "Zona silenciosa, pocos vecinos. Ninguno detrás ni a los lados. Privacidad total.",
    },
    lifestyle: {
      fits: [
        "Presupuesto ajustado PRIORIDAD (ahorro €8,400/año)",
        "Pareja o persona sola (2 dorms suficiente)",
        "Valoras tranquilidad/naturaleza sobre ubicación",
        "Quieres huerto cultivar tus verduras",
      ],
      notFits: [
        "Familia 3+ personas (solo 2 dormitorios)",
        "Priorizas estar cerca centro pueblo",
        "No tienes coche (zona alejada)",
      ],
    },
    listingUrl: "https://propaxar.com/property/villa-en-frigiliana-7",
    driveUrl: "https://drive.google.com/drive/folders/19AFahLBxd8K2Iz2TgKcKohYhADeThRSk?usp=drive_link",
    mapsUrl: "https://www.google.com/maps?q=36.7945,-3.8940",
    gestion: "Propaxar",
    parking: "✅",
    vistas: 4,
    internet: "60MB",
    ruido: "Muy bajo",
    disponible: "1 Abril 2026",
  },
];

// ─── Stars component ───
const Stars = ({ count, max = 5 }: { count: number; max?: number }) => (
  <span className="inline-flex gap-0.5">
    {Array.from({ length: max }, (_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < count ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))}
  </span>
);

// ─── Property Card ───
function PropertyCard({ p }: { p: typeof properties[0] }) {
  const [open, setOpen] = useState(false);
  const fade = useFadeIn();

  return (
    <div ref={fade.ref} className={fade.className}>
      <Card className="overflow-hidden border-0" style={{ boxShadow: "0 4px 24px hsl(0 0% 0%/0.08)", borderRadius: 12 }}>
        {/* Thumbnail */}
        <div className="relative h-52 bg-gray-200 overflow-hidden">
          <img src={p.photos[0]} alt={p.name} className="w-full h-full object-cover" loading="lazy" />
          {p.badge && (
            <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white" style={{ background: "hsl(142 71% 45%)" }}>
              🏠 {p.badge} ✨
            </span>
          )}
          <span className="absolute top-3 right-3 px-2 py-1 rounded text-xs font-bold text-white bg-black/50">
            {p.ref.toUpperCase()}
          </span>
        </div>

        <CardContent className="p-5 space-y-3">
          <h3 className="text-lg font-bold" style={{ color: "hsl(213 56% 23%)" }}>{p.name}</h3>
          <p className="text-sm" style={{ color: "hsl(215 19% 34%)" }}>{p.price} · {p.beds} dorm · {p.baths} baños · {p.size}</p>
          <div className="flex items-center gap-2">
            <Stars count={p.rating} />
            <span className="text-sm font-medium">Mi Recomendación: {p.rating}/5</span>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: "hsl(215 19% 34%)" }}>"{p.summary}"</p>
          <Button
            className="w-full mt-2 font-semibold"
            style={{ background: "hsl(213 56% 23%)", color: "#fff", borderRadius: 8 }}
            onClick={() => setOpen(!open)}
          >
            {open ? "CERRAR ANÁLISIS" : "VER ANÁLISIS COMPLETO"}
            {open ? <ChevronUp className="ml-2 w-4 h-4" /> : <ChevronDown className="ml-2 w-4 h-4" />}
          </Button>
        </CardContent>

        {/* ─── Expanded analysis ─── */}
        {open && (
          <div className="border-t px-5 pb-6 space-y-6 animate-fade-in">
            {/* Photo gallery */}
            <div className="grid grid-cols-3 gap-2 pt-4">
              {p.photos.map((src, i) => (
                <img key={i} src={src} alt={`Foto ${i + 1}`} className="rounded-lg w-full h-24 object-cover" loading="lazy" />
              ))}
            </div>

            {/* Location */}
            <div>
              <h4 className="font-bold flex items-center gap-2 mb-2" style={{ color: "hsl(213 56% 23%)" }}>
                <MapPin className="w-4 h-4" /> UBICACIÓN
              </h4>
              <p className="text-sm mb-2">{p.location.address}</p>
              <div className="rounded-lg overflow-hidden h-48 bg-gray-100">
                <iframe
                  title={`Mapa ${p.name}`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${p.location.lat},${p.location.lng}&zoom=16`}
                />
              </div>
            </div>

            {/* Pros */}
            <div>
              <h4 className="font-bold flex items-center gap-2 mb-2" style={{ color: "hsl(142 71% 45%)" }}>
                <Check className="w-4 h-4" /> VENTAJAS
              </h4>
              <ul className="space-y-1">
                {p.pros.map((t, i) => <li key={i} className="text-sm flex items-start gap-2"><Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "hsl(142 71% 45%)" }} />{t}</li>)}
              </ul>
            </div>

            {/* Cons */}
            <div>
              <h4 className="font-bold flex items-center gap-2 mb-2 text-amber-600">
                <AlertTriangle className="w-4 h-4" /> CONSIDERACIONES
              </h4>
              <ul className="space-y-1">
                {p.cons.map((t, i) => <li key={i} className="text-sm flex items-start gap-2"><AlertTriangle className="w-4 h-4 mt-0.5 shrink-0 text-amber-500" />{t}</li>)}
              </ul>
            </div>

            {/* Professional Analysis Tabs */}
            <div>
              <h4 className="font-bold mb-3" style={{ color: "hsl(213 56% 23%)" }}>📊 MI ANÁLISIS PROFESIONAL</h4>
              <Tabs defaultValue="quality">
                <TabsList className="w-full">
                  <TabsTrigger value="quality" className="flex-1 text-xs">CALIDAD</TabsTrigger>
                  <TabsTrigger value="price" className="flex-1 text-xs">PRECIO</TabsTrigger>
                  <TabsTrigger value="location" className="flex-1 text-xs">UBICACIÓN</TabsTrigger>
                </TabsList>
                {(["quality", "price", "location"] as const).map((key) => (
                  <TabsContent key={key} value={key} className="mt-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <Stars count={p.analysis[key].stars} />
                      <span className="text-sm font-semibold">({p.analysis[key].stars}/5)</span>
                      {"label" in p.analysis[key] && (
                        <Badge className="text-xs" style={{ background: "hsl(142 71% 45%)", color: "#fff", border: "none" }}>{(p.analysis[key] as any).label}</Badge>
                      )}
                    </div>
                    <p className="text-sm whitespace-pre-line" style={{ color: "hsl(215 19% 34%)" }}>{p.analysis[key].text}</p>
                  </TabsContent>
                ))}
              </Tabs>
            </div>

            {/* Tests */}
            <div>
              <h4 className="font-bold mb-3" style={{ color: "hsl(213 56% 23%)" }}>📡 TESTS REALIZADOS IN SITU</h4>
              <div className="space-y-2">
                {p.tests.map((t, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm">
                    <span className={t.status === "ok" ? "text-green-600" : "text-amber-500"}>{t.status === "ok" ? "✅" : "⚠️"}</span>
                    <div>
                      <span className="font-semibold">{t.label}:</span>{" "}
                      <span className={t.status === "ok" ? "text-green-700" : "text-amber-600"}>{t.detail}</span>
                      <p className="text-xs" style={{ color: "hsl(215 19% 34%)" }}>({t.note})</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Insider info */}
            <div>
              <h4 className="font-bold mb-3" style={{ color: "hsl(213 56% 23%)" }}>👤 INFORMACIÓN PRIVILEGIADA (Solo yo sé esto)</h4>
              {([["PROPIETARIO/A", p.insider.owner], ["HISTORIA", p.insider.history], ["VECINOS", p.insider.neighbors]] as const).map(([label, text]) => (
                <div key={label} className="mb-3">
                  <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: "hsl(215 19% 34%)" }}>{label}:</p>
                  <p className="text-sm" style={{ color: "hsl(215 19% 34%)" }}>{text}</p>
                </div>
              ))}
            </div>

            {/* Lifestyle fit */}
            <div>
              <h4 className="font-bold mb-3" style={{ color: "hsl(213 56% 23%)" }}>🌍 ENCAJA CONTIGO SI...</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-bold mb-2" style={{ color: "hsl(142 71% 45%)" }}>✅ SÍ ENCAJA SI:</p>
                  {p.lifestyle.fits.map((t, i) => <p key={i} className="text-sm">• {t}</p>)}
                </div>
                <div>
                  <p className="text-sm font-bold mb-2 text-red-600">❌ NO ENCAJA SI:</p>
                  {p.lifestyle.notFits.map((t, i) => <p key={i} className="text-sm">• {t}</p>)}
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="flex-1">
                <Button className="w-full font-semibold" style={{ background: "hsl(142 71% 45%)", color: "#fff", borderRadius: 8 }}>
                  <MessageCircle className="w-4 h-4 mr-2" /> QUIERO VER ESTA CASA
                </Button>
              </a>
              <a href={p.listingUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                <Button variant="outline" className="w-full font-semibold" style={{ borderRadius: 8 }}>
                  <ExternalLink className="w-4 h-4 mr-2" /> Ver en propaxar.com
                </Button>
              </a>
              <a href={p.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                <Button variant="outline" className="w-full font-semibold" style={{ borderRadius: 8 }}>
                  <MapPin className="w-4 h-4 mr-2" /> Google Maps
                </Button>
              </a>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

// ─── Main Page ───
export default function ReportePropaxar() {
  const contentRef = useRef<HTMLDivElement>(null);
  const heroFade = useFadeIn();
  const summaryFade = useFadeIn();
  const marketFade = useFadeIn();
  const propsFade = useFadeIn();
  const compFade = useFadeIn();
  const recoFade = useFadeIn();
  const stepsFade = useFadeIn();
  const pdfFade = useFadeIn();

  const handleDownloadPdf = async () => {
    const html2pdf = (await import("html2pdf.js")).default;
    const el = contentRef.current;
    if (!el) return;
    el.querySelectorAll("[data-no-print]").forEach((n) => (n as HTMLElement).style.display = "none");
    await html2pdf().set({
      margin: 10,
      filename: `Reporte_Frigiliana_Propaxar_${new Date().toISOString().slice(0, 10)}.pdf`,
      image: { type: "jpeg", quality: 0.95 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    }).from(el).save();
    el.querySelectorAll("[data-no-print]").forEach((n) => (n as HTMLElement).style.display = "");
  };

  const validUntil = new Date();
  validUntil.setMonth(validUntil.getMonth() + 6);
  const validStr = validUntil.toLocaleDateString("es-ES", { month: "long", year: "numeric" });

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: '<meta name="robots" content="noindex, nofollow" />' }} />

      {/* ─── 1. HERO ─── */}
      <section className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden">
        <img src={heroImg} alt="Frigiliana" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/55" />
        <div ref={heroFade.ref} className={`relative z-10 px-6 max-w-xl ${heroFade.className}`}>
          <img src="/propaxar-vision.png" alt="Propaxar" className="h-10 mx-auto mb-6 opacity-90" />
          <h1 className="text-3xl md:text-5xl font-bold leading-tight text-white mb-2">REPORTE INMOBILIARIO<br />PERSONALIZADO</h1>
          <p className="text-xl md:text-2xl font-medium mt-4 text-white/90">Cliente Demo</p>
          <p className="text-base text-white/70">Frigiliana · Febrero 2026</p>
          <p className="text-sm mt-6 text-white/60">Elaborado por Manuel Fernández<br />Analista Inmobiliario · 10 años experiencia</p>
          <ChevronDown className="mx-auto mt-10 w-8 h-8 animate-bounce text-white/60" />
        </div>
      </section>

      <div ref={contentRef}>
        {/* ─── 2. RESUMEN EJECUTIVO ─── */}
        <section className="py-16 px-4 md:px-8 max-w-5xl mx-auto" ref={summaryFade.ref}>
          <div className={summaryFade.className}>
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10" style={{ color: "hsl(213 56% 23%)" }}>Resumen de tu Búsqueda</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: <Search className="w-7 h-7" />, title: "BÚSQUEDA", items: ["35 propiedades mercado", "15 visitadas personalmente", "4 seleccionadas finales"] },
                { icon: <Target className="w-7 h-7" />, title: "TU PERFIL", items: ["Presupuesto: €900-1,600/mes", "Zona: Frigiliana campo", "Must-haves: Piscina, Parking, Mascotas OK"] },
                { icon: <Award className="w-7 h-7" />, title: "MI RECOMENDACIÓN", items: ["Mejor opción: Propiedad #1", "Casa Zambra Loma Cruz", "€1,600/mes · 3 dormitorios · 2 baños"] },
              ].map((c, i) => (
                <Card key={i} className="border-0 text-center" style={{ boxShadow: "0 4px 20px hsl(0 0% 0%/0.07)", borderRadius: 12 }}>
                  <CardContent className="p-6 space-y-3">
                    <div className="mx-auto w-14 h-14 rounded-full flex items-center justify-center" style={{ background: "hsl(213 56% 23%/0.08)", color: "hsl(213 56% 23%)" }}>{c.icon}</div>
                    <h3 className="font-bold text-sm tracking-wide" style={{ color: "hsl(213 56% 23%)" }}>{c.title}</h3>
                    {c.items.map((t, j) => <p key={j} className="text-sm" style={{ color: "hsl(215 19% 34%)" }}>{t}</p>)}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 3. ESTADO MERCADO ─── */}
        <section className="py-16 px-4 md:px-8 max-w-5xl mx-auto" style={{ background: "hsl(210 20% 98%)" }} ref={marketFade.ref}>
          <div className={marketFade.className}>
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10" style={{ color: "hsl(213 56% 23%)" }}>Mercado Actual - Febrero 2026</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-0" style={{ boxShadow: "0 4px 20px hsl(0 0% 0%/0.07)", borderRadius: 12 }}>
                <CardContent className="p-6">
                  <h3 className="font-bold mb-4" style={{ color: "hsl(213 56% 23%)" }}>Precios promedio Frigiliana campo</h3>
                  {[["2 dormitorios + piscina", "€900-1,200/mes"], ["3 dormitorios + piscina", "€1,200-1,600/mes"], ["3 dorms + piscina zona premium", "€1,500-1,800/mes"]].map(([k, v]) => (
                    <div key={k} className="flex justify-between py-2 border-b last:border-0 text-sm">
                      <span>{k}</span><span className="font-semibold">{v}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
              <Card className="border-0" style={{ boxShadow: "0 4px 20px hsl(0 0% 0%/0.07)", borderRadius: 12 }}>
                <CardContent className="p-6">
                  <h3 className="font-bold mb-4" style={{ color: "hsl(213 56% 23%)" }}>Mi análisis</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "hsl(215 19% 34%)" }}>
                    "Mercado equilibrado en febrero. Buena disponibilidad zona Loma Cruz (zona premium más demandada). Las 4 propiedades seleccionadas son TODAS Propaxar Direct - te reembolso €180 si alquilas cualquiera. Servicio gratis total."
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* ─── 4. PROPIEDADES ─── */}
        <section className="py-16 px-4 md:px-8 max-w-5xl mx-auto" ref={propsFade.ref}>
          <div className={propsFade.className}>
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-2" style={{ color: "hsl(213 56% 23%)" }}>4 Propiedades Seleccionadas para Ti</h2>
            <p className="text-center text-sm mb-10" style={{ color: "hsl(215 19% 34%)" }}>Todas son PROPAXAR DIRECT ✨ = Reembolso €180 garantizado</p>
            <div className="grid md:grid-cols-2 gap-6">
              {properties.map((p) => <PropertyCard key={p.id} p={p} />)}
            </div>
          </div>
        </section>

        {/* ─── 5. COMPARATIVA ─── */}
        <section className="py-16 px-4 md:px-8 max-w-5xl mx-auto" style={{ background: "hsl(210 20% 98%)" }} ref={compFade.ref}>
          <div className={compFade.className}>
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10" style={{ color: "hsl(213 56% 23%)" }}>Comparativa Rápida</h2>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    {["Ref", "Nombre", "Precio", "Dorms", "Baños", "M²", "Parking", "Vistas", "Disponible", "⭐"].map((h) => (
                      <TableHead key={h} className="text-xs font-bold whitespace-nowrap">{h}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {properties.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell className="font-bold text-xs">{p.ref.toUpperCase()}</TableCell>
                      <TableCell className="font-semibold text-sm whitespace-nowrap">{p.name.split(" - ")[0]}</TableCell>
                      <TableCell className="text-sm">{p.price.replace("/mes", "")}</TableCell>
                      <TableCell className="text-sm">{p.beds}</TableCell>
                      <TableCell className="text-sm">{p.baths}</TableCell>
                      <TableCell className="text-sm">{p.size}</TableCell>
                      <TableCell className="text-sm">{p.parking}</TableCell>
                      <TableCell><Stars count={p.vistas} /></TableCell>
                      <TableCell className="text-xs">{p.disponible}</TableCell>
                      <TableCell className="font-bold text-base">{p.rating}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </section>

        {/* ─── 6. RECOMENDACIÓN ─── */}
        <section className="py-16 px-4 md:px-8 max-w-5xl mx-auto" ref={recoFade.ref}>
          <div className={recoFade.className}>
            <Card className="border-0 overflow-hidden" style={{ background: "linear-gradient(135deg, hsl(142 71% 45%), hsl(142 71% 38%))", borderRadius: 16 }}>
              <CardContent className="p-8 text-white space-y-4">
                <h2 className="text-2xl font-bold text-white">🥇 MI RECOMENDACIÓN PRINCIPAL</h2>
                <p className="text-lg font-semibold text-white">Propiedad #1 - Casa Zambra Loma Cruz (pa194)</p>
                <p className="text-lg font-semibold text-white">€1,600/mes · 3 dormitorios · 2 baños · 100m²</p>
                <div className="text-sm leading-relaxed text-white/90 space-y-2">
                  <p><strong>POR QUÉ ES TU CASA PERFECTA:</strong></p>
                  <p>✅ Ubicación zona premium Loma Cruz (mejor zona Frigiliana campo)</p>
                  <p>✅ Vistas espectaculares 360° (mar + campo + montaña + pueblo)</p>
                  <p>✅ Construcción calidad + mantenimiento impecable</p>
                  <p>✅ Acceso perfecto - coche hasta puerta</p>
                  <p>✅ Orientación sur - luz natural todo el día</p>
                  <p>✅ 2 baños completos (vs 1 baño otras opciones)</p>
                  <p>✅ Propietarios locales serios - respuesta rápida siempre</p>
                  <p className="mt-4"><strong>REEMBOLSO €180 + SERVICIO GRATIS ✨</strong></p>
                </div>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" data-no-print>
                  <Button className="mt-4 text-base font-bold px-10 py-5" style={{ background: "#fff", color: "hsl(142 71% 35%)", borderRadius: 10 }}>
                    QUIERO VER ESTA CASA
                  </Button>
                </a>
              </CardContent>
            </Card>
            <div className="mt-6 space-y-2 text-sm" style={{ color: "hsl(215 19% 34%)" }}>
              <p><strong>🥈 Segunda opción:</strong> Propiedad #4 (Villa Patricia) si priorizas precio sobre ubicación (ahorro €8,400/año)</p>
              <p><strong>🥉 Tercera opción:</strong> Propiedad #2 (Casa Fabi) si necesitas 120m² espaciosos + disponible YA (1 Feb)</p>
              <p><strong>⚠️ Descarto:</strong> Propiedad #3 (María del Mar) - precio alto €1,600 para solo 75m² + 1 baño</p>
            </div>
          </div>
        </section>

        {/* ─── 7. PRÓXIMOS PASOS ─── */}
        <section className="py-16 px-4 md:px-8 max-w-5xl mx-auto" style={{ background: "hsl(210 20% 98%)" }} ref={stepsFade.ref}>
          <div className={stepsFade.className}>
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10" style={{ color: "hsl(213 56% 23%)" }}>Próximos Pasos</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { num: "1️⃣", title: "LEE EL REPORTE", desc: "Tómate 1-2 días con calma" },
                { num: "2️⃣", title: "MARCA FAVORITAS", desc: "Anota las 2-3 que más te gustan" },
                { num: "3️⃣", title: "AVÍSAME WHATSAPP", desc: "Coordino visitas en 24-48h" },
                { num: "4️⃣", title: "VEN A VERLAS", desc: "Te acompaño personalmente" },
              ].map((s, i) => (
                <div key={i} className="text-center space-y-2">
                  <div className="text-3xl">{s.num}</div>
                  <h3 className="font-bold text-sm" style={{ color: "hsl(213 56% 23%)" }}>{s.title}</h3>
                  <p className="text-sm" style={{ color: "hsl(215 19% 34%)" }}>{s.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 p-6 rounded-xl text-center" style={{ background: "hsl(39 76% 61%/0.15)", borderRadius: 12 }}>
              <p className="font-bold text-sm" style={{ color: "hsl(213 56% 23%)" }}>💡 IMPORTANTE</p>
              <p className="text-sm mt-2" style={{ color: "hsl(215 19% 34%)" }}>Casas buenas Loma Cruz se alquilan rápido (7-14 días típico). Si ves algo que te gusta, avísame pronto.</p>
              <p className="text-sm mt-1" style={{ color: "hsl(215 19% 34%)" }}>Reporte válido <strong>6 MESES</strong>. Si mercado cambia antes de mudarte, actualizo <strong>GRATIS</strong>.</p>
            </div>
          </div>
        </section>

        {/* ─── 8. DESCARGAR PDF ─── */}
        <section className="py-16 px-4 md:px-8 max-w-3xl mx-auto text-center" ref={pdfFade.ref} data-no-print>
          <div className={pdfFade.className}>
            <Card className="border-0" style={{ boxShadow: "0 4px 24px hsl(0 0% 0%/0.08)", borderRadius: 16 }}>
              <CardContent className="p-8 space-y-4">
                <Download className="w-10 h-10 mx-auto" style={{ color: "hsl(142 71% 45%)" }} />
                <h2 className="text-xl font-bold" style={{ color: "hsl(213 56% 23%)" }}>DESCARGA TU REPORTE</h2>
                <p className="text-sm" style={{ color: "hsl(215 19% 34%)" }}>Guarda offline · Imprímelo · Compártelo</p>
                <Button
                  onClick={handleDownloadPdf}
                  className="text-base font-bold px-10 py-5"
                  style={{ background: "hsl(142 71% 45%)", color: "#fff", borderRadius: 10 }}
                >
                  <Download className="w-5 h-5 mr-2" /> DESCARGAR PDF
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>

      {/* ─── 9. FOOTER ─── */}
      <footer className="py-12 px-4 text-center text-white" style={{ background: "hsl(213 56% 23%)" }} data-no-print>
        <img src="/propaxar-vision.png" alt="Propaxar" className="h-8 mx-auto mb-6 brightness-200" />
        <p className="text-lg font-semibold mb-4 text-white">¿Dudas sobre el reporte?</p>
        <div className="flex flex-col sm:flex-row justify-center gap-3 mb-6">
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
            <Button className="font-semibold" style={{ background: "hsl(142 71% 45%)", color: "#fff", borderRadius: 8 }}>
              <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp +34 662 317 561
            </Button>
          </a>
          <a href={EMAIL_LINK}>
            <Button variant="outline" className="font-semibold border-white/30 text-white hover:bg-white/10" style={{ borderRadius: 8 }}>
              <Mail className="w-4 h-4 mr-2" /> info@propaxar.com
            </Button>
          </a>
        </div>
        <p className="text-sm text-white/70">Manuel Fernández Ramírez</p>
        <p className="text-sm text-white/70">Analista Inmobiliario · 10 años experiencia Frigiliana</p>
        <div className="mt-6 pt-4 border-t border-white/20 text-xs text-white/50">
          <p>© 2026 Propaxar · Reporte válido hasta {validStr}</p>
        </div>
      </footer>
    </>
  );
}
