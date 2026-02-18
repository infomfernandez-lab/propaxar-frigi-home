import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp, MapPin, Check, AlertTriangle, Star, ExternalLink, MessageCircle, Mail, Download, Search, Target, Award, Package, Trash2, Droplets, TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import heroImg from "@/assets/hero-frigiliana.jpg";

const WHATSAPP_LINK = "https://wa.me/34662317561?text=Hola%20Manuel%2C%20me%20gustaría%20organizar%20una%20visita%20para%20Villa%20Patricia.%20%C2%BFCuándo%20sería%20posible%3F";
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

// ─── DATOS KATINKA ───
const properties = [
  {
    id: 1,
    ref: "pa223",
    name: "Villa Patricia - Frigiliana Norte",
    price: "€900/mes",
    beds: 2,
    baths: 2,
    size: "90m²",
    rating: 5,
    badge: "✅ DENTRO PRESUPUESTO",
    badgeColor: "hsl(142 71% 45%)",
    summary: "ÚNICA opción en tu presupuesto €700-1,000. Casa tranquila zona norte, orientación sur, exteriores amplios + huerto. Ahorro €8,400/año vs otras.",
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
      "PRECIO EXCELENTE - €900 (€700 menos que otras opciones)",
      "Ubicación muy tranquila - pocos vecinos",
      "Orientación sur - mucha luz natural",
      "Exteriores amplios con diferentes zonas",
      "Huerto incluido",
      "2 baños completos",
      "Ningún vecino detrás ni a los lados",
      "Mascotas permitidas ✅",
    ],
    cons: [
      "Solo 2 dormitorios (dijiste mínimo 2, así que OK)",
      "Acceso 300m carril agrícola sin asfaltar",
      "Zona norte - algo alejada centro (3 min coche)",
      "Disponible solo Abril (mes después)",
    ],
    analysis: {
      quality: { stars: 3, text: "Casa sólida construida principios 2000. Bien mantenida. Estructura buena, sin problemas importantes." },
      price: { stars: 5, label: "EXCELENTE", text: "€900 justo. Similares zona norte: €900-1,300.\nAhorro: €8,400/año vs opciones €1,600.\nPotencial negociación: Moderado (5%). Podrías €850." },
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
      owner: "Persona seria. Inquilinos anteriores contentos siempre.",
      history: "Alquilada actualmente a inquilino hasta 31 Marzo 2026. Disponible 1 Abril. Sin incidencias nunca.",
      neighbors: "Zona silenciosa, pocos vecinos. Ninguno detrás ni a los lados. Privacidad total.",
    },
    lifestyle: {
      fits: [
        "Presupuesto €700-1,000 ES PRIORIDAD (única opción)",
        "Pareja o persona sola (2 dorms suficiente)",
        "Valoras tranquilidad/naturaleza sobre ubicación",
        "Quieres huerto cultivar tus verduras",
        "Tienes coche (zona algo alejada)",
      ],
      notFits: [
        "Necesitas 3+ dormitorios obligatorio",
        "Priorizas estar cerca centro pueblo",
        "No tienes coche (zona alejada)",
        "Necesitas mudarte antes de Abril",
      ],
    },
    listingUrl: "https://propaxar.com/property/villa-en-frigiliana-7",
    driveUrl: "https://drive.google.com/drive/folders/19AFahLBxd8K2Iz2TgKcKohYhADeThRSk",
    mapsUrl: "https://www.google.com/maps?q=36.7945,-3.8940",
    gestion: "Agencia",
    parking: "✅",
    vistas: 4,
    internet: "60MB",
    ruido: "Muy bajo",
    disponible: "1 Abril 2026",
  },
  {
    id: 2,
    ref: "pa194",
    name: "Casa Zambra - Loma Cruz Oeste",
    price: "€1,600/mes",
    beds: 3,
    baths: 2,
    size: "100m²",
    rating: 5,
    badge: "⚠️ FUERA PRESUPUESTO",
    badgeColor: "hsl(39 76% 61%)",
    summary: "Zona premium. Vistas espectaculares 360°, acceso perfecto. PERO €1,600/mes = 60% más caro que tu presupuesto.",
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
      "Vistas espectaculares mar, campo, montaña y pueblo",
      "Orientación sur - luz natural todo el día",
      "3 dormitorios + 2 baños",
      "Construcción calidad excelente",
      "Mascotas permitidas ✅",
    ],
    cons: [
      "PRECIO: €1,600/mes = €600 FUERA tu presupuesto",
      "Internet WiMax 60MB - no fibra",
    ],
    analysis: {
      quality: { stars: 5, text: "Construcción estilo rústico muy bien mantenida. Propietarios cuidan casa impecablemente." },
      price: { stars: 4, label: "JUSTO", text: "€1,600 correcto para zona premium. PERO 60% más caro que tu presupuesto máximo." },
      location: { stars: 5, label: "EXCELENTE", text: "Mejor zona Frigiliana campo. Alta demanda constante." },
    },
    tests: [
      { label: "Internet", status: "ok", detail: "WiMax 60MB", note: "Starlink 300MB opcional €70/mes" },
      { label: "Móvil", status: "ok", detail: "Cobertura perfecta", note: "4-5 barras" },
      { label: "Ruido día", status: "ok", detail: "Bajo", note: "Zona tranquila" },
      { label: "Ruido noche", status: "ok", detail: "Silencioso", note: "Sin ruidos" },
      { label: "Luz natural", status: "ok", detail: "Excelente", note: "Orientación sur" },
      { label: "Agua", status: "ok", detail: "Presión buena", note: "Sin cortes" },
    ],
    insider: {
      owner: "Muy atenta, responde mismo día siempre.",
      history: "Alquilada últimos años larga temporada. Bien mantenida siempre. Sin incidencias.",
      neighbors: "Vecinos tranquilos. Sin incidencias previas nunca. Ambiente agradable.",
    },
    lifestyle: {
      fits: [
        "PUEDES SUBIR presupuesto a €1,600/mes",
        "Valoras ubicación premium sobre precio",
        "Necesitas 3 dormitorios",
      ],
      notFits: [
        "Presupuesto máximo €1,000/mes (€600 diferencia)",
        "Priorizas ahorro sobre ubicación",
      ],
    },
    listingUrl: "https://propaxar.com/property/villa-en-frigiliana-6",
    driveUrl: "https://drive.google.com/drive/folders/1XhEL6ay8jYCKPzayFkCQGvrAjU-0JRA1",
    mapsUrl: "https://www.google.com/maps?q=36.7928,-3.8970",
    gestion: "Agencia",
    parking: "✅",
    vistas: 5,
    internet: "60MB",
    ruido: "Bajo",
    disponible: "1 Marzo 2026",
  },
  {
    id: 3,
    ref: "pa220",
    name: "Casa Fabi - Loma Cruz Este",
    price: "€1,600/mes",
    beds: 3,
    baths: 2,
    size: "120m²",
    rating: 4,
    badge: "⚠️ FUERA PRESUPUESTO",
    badgeColor: "hsl(39 76% 61%)",
    summary: "Casa amplia 120m², disponible YA. PERO €1,600/mes = 60% más caro que presupuesto.",
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
      "Casa más grande - 120m²",
      "Vistas despejadas Mediterráneo + campo",
      "Mascotas permitidas ✅",
    ],
    cons: [
      "PRECIO: €1,600/mes = €600 FUERA presupuesto",
      "Escalera acceso (no planta baja)",
    ],
    analysis: {
      quality: { stars: 3, text: "Construcción buena calidad. Mantenimiento interior correcto." },
      price: { stars: 3, label: "ALGO ALTO", text: "€1,600 por encima media. PERO 60% más que tu presupuesto." },
      location: { stars: 4, label: "MUY BUENA", text: "Zona alta demanda. Buen acceso." },
    },
    tests: [
      { label: "Internet", status: "ok", detail: "WiMax 60MB", note: "Instalado" },
      { label: "Móvil", status: "ok", detail: "Cobertura perfecta", note: "4-5 barras" },
      { label: "Ruido día", status: "ok", detail: "Moderado", note: "Tráfico ocasional" },
      { label: "Ruido noche", status: "ok", detail: "Silencioso", note: "Tranquilo" },
      { label: "Luz natural", status: "ok", detail: "Muy buena", note: "Correcta" },
      { label: "Agua", status: "ok", detail: "Presión correcta", note: "Fiable" },
    ],
    insider: {
      owner: "Hombre mayor serio y atento. Formal en todo. Sin problemas nunca.",
      history: "Siempre alquilada larga estancia. Mantenimiento regular.",
      neighbors: "Vecinos al lado pero no pegados. Sin incidencias nunca.",
    },
    lifestyle: {
      fits: [
        "PUEDES SUBIR presupuesto a €1,600/mes",
        "Necesitas espacio (120m²)",
        "Quieres mudarte YA (disponible Feb)",
      ],
      notFits: [
        "Presupuesto máximo €1,000/mes",
        "Movilidad reducida (hay escaleras)",
      ],
    },
    listingUrl: "https://propaxar.com/property/villa-en-frigiliana-4/",
    driveUrl: "#",
    mapsUrl: "https://www.google.com/maps?q=36.7930,-3.8960",
    gestion: "Agencia",
    parking: "✅",
    vistas: 5,
    internet: "60MB",
    ruido: "Moderado",
    disponible: "1 Febrero 2026 (YA)",
  },
  {
    id: 4,
    ref: "pa224",
    name: "Casa Loma Cruz - María del Mar",
    price: "€1,600/mes",
    beds: 3,
    baths: 1,
    size: "75m²",
    rating: 3,
    badge: "⚠️ FUERA PRESUPUESTO",
    badgeColor: "hsl(39 76% 61%)",
    summary: "Loma Cruz premium. Bien mantenida. PERO €1,600/mes = 60% más caro + pequeña (75m²) + solo 1 baño.",
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
      "Construcción sólida, muy bien mantenida",
      "Parking propio",
      "Zona Loma Cruz premium",
      "Mascotas permitidas ✅",
    ],
    cons: [
      "PRECIO: €1,600/mes = €600 FUERA presupuesto",
      "Solo 75m² - pequeña",
      "Solo 1 baño",
      "Precio alto para tamaño",
    ],
    analysis: {
      quality: { stars: 4, text: "Construcción sólida. Propietaria cuida mucho. Renovaciones recientes." },
      price: { stars: 2, label: "ALTO", text: "€1,600 alto para 75m². MUCHO más que tu presupuesto." },
      location: { stars: 4, label: "EXCELENTE", text: "Loma Cruz - mejor zona. Alta demanda." },
    },
    tests: [
      { label: "Internet", status: "ok", detail: "WiMax 60MB", note: "Starlink opcional" },
      { label: "Móvil", status: "ok", detail: "Cobertura buena", note: "4 barras" },
      { label: "Ruido día", status: "ok", detail: "Silencioso", note: "Sin ruidos" },
      { label: "Ruido noche", status: "ok", detail: "Muy silencioso", note: "Tranquila total" },
      { label: "Luz natural", status: "ok", detail: "Buena tarde", note: "Sol mediodía-tarde" },
      { label: "Agua", status: "ok", detail: "Presión buena", note: "Fiable" },
    ],
    insider: {
      owner: "Persona seria y comunicativa. Responde rápido siempre. Cuida mucho su propiedad.",
      history: "Alquilada siempre por años. Pintada reciente. Ventanas nuevas. Impecable.",
      neighbors: "Vecinos cerca pero privacidad alta. Sin ruidos. Sin incidencias.",
    },
    lifestyle: {
      fits: [
        "PUEDES SUBIR presupuesto a €1,600/mes",
        "Solo 2 personas (espacio suficiente)",
        "Valoras calidad sobre precio",
      ],
      notFits: [
        "Presupuesto máximo €1,000/mes",
        "Familia 3-4 personas (pequeña + 1 baño)",
        "Necesitas espacio grande",
      ],
    },
    listingUrl: "https://propaxar.com/property/villa-en-frigiliana-8/",
    driveUrl: "https://drive.google.com/drive/folders/1-aYgULtFXuoSE8vj88io7lh2kOJj_LNV",
    mapsUrl: "https://www.google.com/maps?q=36.7925,-3.8968",
    gestion: "Agencia",
    parking: "✅",
    vistas: 4,
    internet: "60MB",
    ruido: "Muy bajo",
    disponible: "1 Marzo 2026",
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
            <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white" style={{ background: p.badgeColor }}>
              {p.badge}
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
            <span className="text-sm font-medium">Para tu perfil: {p.rating}/5</span>
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
              <a href={p.mapsUrl} target="_blank" rel="noopener noreferrer" className="block rounded-lg overflow-hidden h-48 bg-gray-100 relative group cursor-pointer">
                <iframe
                  title={`Mapa ${p.name}`}
                  width="100%"
                  height="100%"
                  style={{ border: 0, pointerEvents: "none" }}
                  loading="lazy"
                  src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${p.location.lat},${p.location.lng}&zoom=16`}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 px-3 py-1 rounded-full text-xs font-semibold shadow">Abrir en Google Maps</span>
                </div>
              </a>
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
              <h4 className="font-bold mb-3" style={{ color: "hsl(213 56% 23%)" }}>👤 INFORMACIÓN PRIVILEGIADA</h4>
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
  const logisticsFade = useFadeIn();
  const pdfFade = useFadeIn();

  const handleDownloadPdf = async () => {
    const html2pdf = (await import("html2pdf.js")).default;
    const el = contentRef.current;
    if (!el) return;
    el.querySelectorAll("[data-no-print]").forEach((n) => (n as HTMLElement).style.display = "none");
    await html2pdf().set({
      margin: 10,
      filename: `Reporte_Katinka_${new Date().toISOString().slice(0, 10)}.pdf`,
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
          <h1 className="text-4xl md:text-6xl font-bold leading-tight text-white mb-3">
            REPORTE INMOBILIARIO<br />PERSONALIZADO
          </h1>
          <p className="text-2xl md:text-3xl font-medium mt-5 text-white/90">Katinka</p>
          <p className="text-lg md:text-xl text-white/70 mt-1">Frigiliana · Febrero 2026</p>
          <p className="text-base mt-6 text-white/60">Elaborado por Manuel Fernández<br />Analista Inmobiliario</p>
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
                { icon: <Search className="w-7 h-7" />, title: "BÚSQUEDA", items: ["35 propiedades mercado", "4 seleccionadas", "SOLO 1 en presupuesto"] },
                { icon: <Target className="w-7 h-7" />, title: "TU PERFIL", items: ["Presupuesto: €700-1,000/mes", "Dormitorios: 2+", "Mascotas: Sí"] },
                { icon: <Award className="w-7 h-7" />, title: "MI RECOMENDACIÓN", items: ["ÚNICA opción: Villa Patricia", "€900/mes · 2 dormitorios", "Resto fuera presupuesto"] },
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
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10" style={{ color: "hsl(213 56% 23%)" }}>Realidad del Mercado - Febrero 2026</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-0" style={{ boxShadow: "0 4px 20px hsl(0 0% 0%/0.07)", borderRadius: 12 }}>
                <CardContent className="p-6">
                  <h3 className="font-bold mb-4" style={{ color: "hsl(213 56% 23%)" }}>Precios promedio Frigiliana</h3>
                  {[["2 dorms básico", "€700-900/mes"], ["2 dorms + piscina", "€900-1,200/mes"], ["3 dorms zona premium", "€1,500-1,800/mes"]].map(([k, v]) => (
                    <div key={k} className="flex justify-between py-2 border-b last:border-0 text-sm">
                      <span>{k}</span><span className="font-semibold">{v}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
              <Card className="border-0" style={{ boxShadow: "0 4px 20px hsl(0 0% 0%/0.07)", borderRadius: 12 }}>
                <CardContent className="p-6">
                  <h3 className="font-bold mb-4" style={{ color: "hsl(213 56% 23%)" }}>Mi análisis para ti</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "hsl(215 19% 34%)" }}>
                    <strong>IMPORTANTE Katinka:</strong> Mercado Frigiliana campo tiene pocas opciones €700-1,000. La mayoría está €1,200-1,600.
                    Villa Patricia es RARA oportunidad en tu rango - no verás muchas así.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* ─── 4. PROPIEDADES ─── */}
        <section className="py-16 px-4 md:px-8 max-w-5xl mx-auto" ref={propsFade.ref}>
          <div className={propsFade.className}>
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-2" style={{ color: "hsl(213 56% 23%)" }}>4 Propiedades Analizadas</h2>
            <p className="text-center text-sm mb-10" style={{ color: "hsl(215 19% 34%)" }}>
              ✅ 1 dentro presupuesto · ⚠️ 3 fuera presupuesto (€1,600/mes)
            </p>
            <div className="grid grid-cols-1 gap-6">
              {properties.map((p) => <PropertyCard key={p.id} p={p} />)}
            </div>
          </div>
        </section>

        {/* ─── 5. LOGÍSTICA DE VIDA EN EL CAMPO VS PUEBLO ─── */}
        <section className="py-16 px-4 md:px-8 max-w-5xl mx-auto" ref={logisticsFade.ref}>
          <div className={logisticsFade.className}>
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-1" style={{ color: "hsl(213 56% 23%)" }}>
              Logística de vida en el campo vs pueblo
            </h2>
            <p className="text-center text-sm mb-10" style={{ color: "hsl(215 19% 34%)" }}>The Insider's Truth</p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {[
                {
                  icon: <Package className="w-7 h-7" />,
                  title: "Envío de Paquetes y Amazon",
                  campo: "En los diseminados de Frigiliana no existe entrega puerta a puerta. Te gestionamos el alta en un Punto de Recogida (Parcel Point) local para que recibas tus compras sin problemas.",
                  pueblo: "Cada vivienda tiene su propia dirección con entrega puerta a puerta. También puedes usar un Parcel Point si lo prefieres.",
                },
                {
                  icon: <Trash2 className="w-7 h-7" />,
                  title: "Recogida de Basura",
                  campo: "El camión de basura no accede a los carriles rurales. Los residuos deben depositarse en los puntos limpios situados en la carretera principal. Es la norma para preservar el entorno natural.",
                  pueblo: "La recogida se hace casa por casa. Debes depositar tu basura en el exterior después de las 21:30h. Si lo haces antes pueden sancionarte.",
                },
                {
                  icon: <Droplets className="w-7 h-7" />,
                  title: "Agua",
                  campo: "El agua en las casas rurales suele proceder de pozos comunitarios o privados.",
                  pueblo: "El agua procede de la red municipal de aguas, generalmente gestionada por la empresa pública Aqualia.",
                },
              ].map((c, i) => (
                <Card key={i} className="border" style={{ borderColor: "hsl(212 26% 83%)", borderRadius: 12 }}>
                  <CardContent className="p-6 space-y-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "hsl(213 56% 23%/0.08)", color: "hsl(213 56% 23%)" }}>
                      {c.icon}
                    </div>
                    <h3 className="font-bold text-sm" style={{ color: "hsl(213 56% 23%)" }}>{c.title}</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: "hsl(213 56% 23%)" }}>🌿 En el Campo</p>
                        <p className="text-sm leading-relaxed" style={{ color: "hsl(215 19% 34%)" }}>{c.campo}</p>
                      </div>
                      <div className="border-t pt-3" style={{ borderColor: "hsl(212 26% 90%)" }}>
                        <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: "hsl(213 56% 40%)" }}>🏘️ En el Pueblo</p>
                        <p className="text-sm leading-relaxed" style={{ color: "hsl(215 19% 34%)" }}>{c.pueblo}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Gráfica Evolución del Mercado */}
            <Card className="border-0" style={{ boxShadow: "0 4px 20px hsl(0 0% 0%/0.07)", borderRadius: 12 }}>
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-5 h-5" style={{ color: "hsl(142 71% 45%)" }} />
                  <h3 className="font-bold" style={{ color: "hsl(213 56% 23%)" }}>Evolución del Mercado en Frigiliana</h3>
                </div>
                <p className="text-xs mb-6" style={{ color: "hsl(215 19% 34%)" }}>
                  Precio medio +6% anual · Disponibilidad alquiler larga temporada &lt;1%
                </p>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={[
                      { year: "2020", precio: 650 },
                      { year: "2021", precio: 690 },
                      { year: "2022", precio: 730 },
                      { year: "2023", precio: 780 },
                      { year: "2024", precio: 830 },
                      { year: "2025", precio: 880 },
                      { year: "2026", precio: 935 },
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(212 26% 83%)" />
                      <XAxis dataKey="year" tick={{ fontSize: 12, fill: "hsl(215 19% 34%)" }} />
                      <YAxis tick={{ fontSize: 12, fill: "hsl(215 19% 34%)" }} tickFormatter={(v) => `€${v}`} />
                      <Tooltip formatter={(value: number) => [`€${value}/mes`, "Precio medio"]} />
                      <Line type="monotone" dataKey="precio" stroke="hsl(213 56% 23%)" strokeWidth={2.5} dot={{ fill: "hsl(213 56% 23%)", r: 4 }} activeDot={{ r: 6, fill: "hsl(142 71% 45%)" }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ─── 6. COMPARATIVA ─── */}
        <section className="py-16 px-4 md:px-8 max-w-5xl mx-auto" style={{ background: "hsl(210 20% 98%)" }} ref={compFade.ref}>
          <div className={compFade.className}>
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10" style={{ color: "hsl(213 56% 23%)" }}>Comparativa Rápida</h2>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    {["Ref", "Nombre", "Precio", "Dorms", "Baños", "M²", "Disponible", "Tu perfil"].map((h) => (
                      <TableHead key={h} className="text-xs font-bold whitespace-nowrap">{h}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {properties.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell className="font-bold text-xs">{p.ref.toUpperCase()}</TableCell>
                      <TableCell className="font-semibold text-sm whitespace-nowrap">{p.name.split(" - ")[0]}</TableCell>
                      <TableCell className={p.id === 1 ? "text-sm font-bold text-green-600" : "text-sm text-red-600"}>{p.price}</TableCell>
                      <TableCell className="text-sm">{p.beds}</TableCell>
                      <TableCell className="text-sm">{p.baths}</TableCell>
                      <TableCell className="text-sm">{p.size}</TableCell>
                      <TableCell className="text-xs">{p.disponible}</TableCell>
                      <TableCell className="font-bold text-base">{p.rating}/5</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </section>

        {/* ─── 7. RECOMENDACIÓN ─── */}
        <section className="py-16 px-4 md:px-8 max-w-5xl mx-auto" ref={recoFade.ref}>
          <div className={recoFade.className}>
            <Card className="border-0 overflow-hidden" style={{ background: "linear-gradient(135deg, hsl(142 71% 45%), hsl(142 71% 38%))", borderRadius: 16 }}>
              <CardContent className="p-8 text-white space-y-4">
                <h2 className="text-2xl font-bold text-white">🥇 MI RECOMENDACIÓN KATINKA</h2>
                <p className="text-lg font-semibold text-white">Villa Patricia (pa223)</p>
                <p className="text-lg font-semibold text-white">€900/mes · 2 dormitorios · 2 baños</p>
                <div className="text-sm leading-relaxed text-white/90 space-y-2">
                  <p><strong>POR QUÉ ES TU ÚNICA OPCIÓN REALISTA:</strong></p>
                  <p>✅ €900/mes = DENTRO tu presupuesto (€700-1,000)</p>
                  <p>✅ 2 dormitorios = Cumple tu mínimo</p>
                  <p>✅ Mascotas permitidas ✅</p>
                  <p>✅ 2 baños completos (más cómodo)</p>
                  <p>✅ Huerto incluido (extra único)</p>
                  <p>✅ AHORRO: €8,400/año vs otras opciones</p>
                  <p className="mt-4"><strong>Las otras 3 casas están a €1,600/mes = €600 más que tu presupuesto máximo.</strong></p>
                  <p>Las incluí para que veas qué hay en mercado, pero son 60% más caras.</p>
                </div>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" data-no-print>
                  <Button className="mt-4 text-base font-bold px-10 py-5" style={{ background: "#fff", color: "hsl(142 71% 35%)", borderRadius: 10 }}>
                    QUIERO VER VILLA PATRICIA
                  </Button>
                </a>
              </CardContent>
            </Card>
            <div className="mt-6 space-y-2 text-sm" style={{ color: "hsl(215 19% 34%)" }}>
              <p><strong>⚠️ Sobre las otras 3:</strong> Si puedes/quieres subir presupuesto a €1,600/mes, Casa Zambra (pa194) es excelente opción - zona premium, 3 dorms, vistas espectaculares.</p>
              <p><strong>💡 ¿Quieres que busque más opciones €700-1,000?</strong> Puedo seguir buscando, pero honestamente son escasas en Frigiliana campo.</p>
            </div>
          </div>
        </section>

        {/* ─── 8. PRÓXIMOS PASOS ─── */}
        <section className="py-16 px-4 md:px-8 max-w-5xl mx-auto" style={{ background: "hsl(210 20% 98%)" }} ref={stepsFade.ref}>
          <div className={stepsFade.className}>
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10" style={{ color: "hsl(213 56% 23%)" }}>Próximos Pasos</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { num: "1️⃣", title: "REVISA REPORTE", desc: "Tómate 1-2 días" },
                { num: "2️⃣", title: "DECIDE PRESUPUESTO", desc: "¿€900 OK o puedes €1,600?" },
                { num: "3️⃣", title: "AVÍSAME WHATSAPP", desc: "Coordino visita Villa Patricia" },
                { num: "4️⃣", title: "VEN A VERLA", desc: "Te acompaño personalmente" },
              ].map((s, i) => (
                <div key={i} className="text-center space-y-2">
                  <div className="text-3xl">{s.num}</div>
                  <h3 className="font-bold text-sm" style={{ color: "hsl(213 56% 23%)" }}>{s.title}</h3>
                  <p className="text-sm" style={{ color: "hsl(215 19% 34%)" }}>{s.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 p-6 rounded-xl text-center" style={{ background: "hsl(39 76% 61%/0.15)", borderRadius: 12 }}>
              <p className="font-bold text-sm" style={{ color: "hsl(213 56% 23%)" }}>💡 IMPORTANTE KATINKA</p>
              <p className="text-sm mt-2" style={{ color: "hsl(215 19% 34%)" }}>
                Villa Patricia es RARA en mercado - pocas casas €900 con piscina + 2 baños.
                Si te interesa, avísame pronto. Disponible 1 Abril.
              </p>
              <p className="text-sm mt-1" style={{ color: "hsl(215 19% 34%)" }}>
                Reporte válido <strong>6 MESES</strong>. Seguimiento incluido hasta que encuentres.
              </p>
            </div>
          </div>
        </section>

        {/* ─── 9. DESCARGAR PDF ─── */}
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
