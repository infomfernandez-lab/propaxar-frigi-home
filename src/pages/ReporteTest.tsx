import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp, MapPin, Check, AlertTriangle, Star, ExternalLink, MessageCircle, Mail, Download, Clock, Search, Target, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import heroImg from "@/assets/hero-frigiliana.jpg";

// Report-specific color tokens as inline styles
const COLORS = {
  green: "142 71% 45%",
  blueDark: "213 56% 23%",
  grayText: "215 19% 34%",
};

const WHATSAPP_LINK = "https://wa.me/34662317561?text=Hola%20Manuel%2C%20he%20visto%20el%20reporte%20y%20me%20gustaría%20hablar.";
const EMAIL_LINK = "mailto:info@propaxar.com?subject=Reporte%20Inmobiliario%20-%20Consulta";

// ─── Scroll fade-in hook ───
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

// ─── Properties data ───
const properties = [
  {
    id: 1,
    name: "Casa Calle Suspiro, 23",
    price: "€950/mes",
    beds: 2,
    size: "85m²",
    rating: 5,
    badge: "PROPAXAR DIRECT",
    summary: "Casa centro pueblo, terraza con vistas increíbles, internet 600MB testeado. Ideal para trabajo remoto.",
    photos: Array(6).fill("/placeholder.svg"),
    location: { address: "Calle Suspiro, 23 - Centro Frigiliana", lat: 36.7926, lng: -3.8965 },
    pros: [
      "Centro del pueblo - 2 min andando a todo",
      "Terraza 15m² con vistas valle increíbles",
      "Recién renovada (2023) - acabados modernos",
      "Agua garantizada (red municipal)",
      "Propietaria alemana seria, responde rápido",
      "Fibra 600MB testeada ✅",
    ],
    cons: [
      "Calle estrecha - coche acceso complicado",
      "Sin parking incluido (público 100m - €40/mes)",
      "Vecinos arriba tienen perro (ladridos ocasionales)",
      "Algo de ruido viernes/sábado noche (bares cerca)",
    ],
    analysis: {
      quality: { stars: 4, text: "Casa sólida, muros gruesos, techo alto. Sin humedades. Renovación 2023 bien hecha - yo la vi personalmente." },
      price: { stars: 4, label: "JUSTO", text: "Casas similares esta calle: €900-1,000/mes. No está sobrevalorada.\nPotencial negociación: Bajo (10%). Podrías conseguir €920 si firmas contrato largo (2 años)." },
      location: { stars: 5, label: "EXCELENTE", text: "Mejor zona centro Frigiliana. Todo a pie.\nOrientación sur-este (sol mañana)." },
    },
    tests: [
      { label: "Internet", status: "ok", detail: "Fibra 600MB", note: "Testeado con Speedtest - velocidad real confirmada" },
      { label: "Móvil", status: "ok", detail: "Cobertura excelente", note: "Movistar/Vodafone - 4 barras" },
      { label: "Ruido día", status: "ok", detail: "Silencioso", note: "Medido 10:00-14:00 - <30dB" },
      { label: "Ruido noche", status: "warn", detail: "Moderado viernes/sábado", note: "Bares cercanos hasta 01:00" },
      { label: "Luz natural", status: "ok", detail: "Excelente", note: "Sur-este, sol 08:00-16:00" },
      { label: "Agua", status: "ok", detail: "Presión buena", note: "Red municipal - sin cortes históricos" },
    ],
    insider: {
      owner: "Alemana, 60 años, vive en Alemania. Seria, responde emails mismo día. Alquiló anteriormente a pareja inglesa 3 años sin problemas. Precio fijo, no sube cada año.",
      history: "Casa de familia local vendida 2020. Nueva propietaria la renovó completa. Inquilinos anteriores: alemanes jubilados (2021-2023), se fueron porque volvieron a Alemania.",
      neighbors: "Arriba: Pareja española con perro pequeño (no molesta). Abajo: Tienda souvenirs (cierra 20:00). Calle tranquila de día, algo animada fines de semana.",
    },
    lifestyle: {
      fits: [
        "Trabajas remoto (internet excelente)",
        "Quieres estar en el pueblo, todo a pie",
        "Valoras vistas y luz natural",
        "Te gusta ambiente pueblo (bares, gente)",
      ],
      notFits: [
        "Priorizas coche en puerta todos los días",
        "Necesitas silencio absoluto fines de semana",
        "Quieres parking incluido obligatorio",
      ],
    },
    listingUrl: "#",
    mapsUrl: "https://www.google.com/maps?q=36.7926,-3.8965",
    gestion: "Propaxar",
    parking: "❌",
    vistas: 5,
    internet: "600MB",
    ruido: "Medio",
  },
  {
    id: 2,
    name: "Apartamento Calle Alta, 7",
    price: "€1,100/mes",
    beds: 3,
    size: "110m²",
    rating: 4,
    badge: null,
    summary: "Apartamento amplio en zona alta. 3 dormitorios, parking incluido. Vistas parciales. Gestión por agencia local.",
    photos: Array(4).fill("/placeholder.svg"),
    location: { address: "Calle Alta, 7 - Frigiliana", lat: 36.7935, lng: -3.8950 },
    pros: [
      "3 dormitorios - ideal para familia",
      "Parking privado incluido",
      "Zona tranquila, poco ruido",
      "Buena conexión carretera N-340",
    ],
    cons: [
      "Internet solo 100MB (no fibra)",
      "Vistas parciales - no panorámicas",
      "Gestión por agencia (respuesta más lenta)",
      "Precio algo elevado para la zona",
    ],
    analysis: {
      quality: { stars: 4, text: "Buen estado general. Construcción sólida. Cocina necesita actualización menor." },
      price: { stars: 3, label: "ALTO", text: "Algo por encima del mercado para la zona alta. Negociable un 5-8%." },
      location: { stars: 3, label: "BUENA", text: "Zona alta, necesitas coche para bajar al centro. Buenas vistas parciales." },
    },
    tests: [
      { label: "Internet", status: "warn", detail: "100MB ADSL", note: "Sin fibra disponible en esta calle" },
      { label: "Móvil", status: "ok", detail: "Buena cobertura", note: "3-4 barras" },
      { label: "Ruido día", status: "ok", detail: "Muy silencioso", note: "<25dB" },
      { label: "Ruido noche", status: "ok", detail: "Silencioso", note: "Zona residencial" },
      { label: "Luz natural", status: "ok", detail: "Buena", note: "Orientación oeste" },
      { label: "Agua", status: "ok", detail: "Presión normal", note: "Sin incidencias" },
    ],
    insider: {
      owner: "Familia española local. Gestión delegada a agencia inmobiliaria de Nerja. Respuesta 24-48h.",
      history: "Propiedad familiar desde 2005. Reformada parcialmente 2019. Varios inquilinos extranjeros.",
      neighbors: "Edificio tranquilo. Mayoría residentes locales permanentes.",
    },
    lifestyle: {
      fits: [
        "Necesitas parking sí o sí",
        "Familia o pareja que necesita espacio",
        "Prefieres tranquilidad absoluta",
      ],
      notFits: [
        "Trabajas remoto y necesitas internet rápido",
        "Quieres vivir en el centro sin coche",
        "Buscas las mejores vistas",
      ],
    },
    listingUrl: "#",
    mapsUrl: "https://www.google.com/maps?q=36.7935,-3.8950",
    gestion: "Agencia",
    parking: "✅",
    vistas: 3,
    internet: "100MB",
    ruido: "Bajo",
  },
  {
    id: 3,
    name: "Casa Calle Baja, 12",
    price: "€850/mes",
    beds: 2,
    size: "70m²",
    rating: 4,
    badge: null,
    summary: "Casa acogedora en zona baja del pueblo. Precio competitivo, buenas vistas. Internet 300MB. Ideal para presupuesto ajustado.",
    photos: Array(4).fill("/placeholder.svg"),
    location: { address: "Calle Baja, 12 - Frigiliana", lat: 36.7918, lng: -3.8970 },
    pros: [
      "Precio más bajo de las 3 opciones",
      "Buenas vistas al valle",
      "Internet 300MB - suficiente para trabajo remoto",
      "Zona tranquila de día y noche",
    ],
    cons: [
      "Sin parking (zona complicada para aparcar)",
      "Casa más pequeña (70m²)",
      "Necesita pequeños arreglos menores",
      "Gestión por agencia (respuesta variable)",
    ],
    analysis: {
      quality: { stars: 3, text: "Casa correcta. Algunos detalles menores pendientes. Estructura buena." },
      price: { stars: 5, label: "MUY BUENO", text: "Excelente relación calidad/precio para Frigiliana centro-bajo." },
      location: { stars: 4, label: "MUY BUENA", text: "Zona baja pero accesible. 5 min andando al centro." },
    },
    tests: [
      { label: "Internet", status: "ok", detail: "300MB fibra", note: "Buena velocidad confirmada" },
      { label: "Móvil", status: "ok", detail: "Buena cobertura", note: "3-4 barras" },
      { label: "Ruido día", status: "ok", detail: "Silencioso", note: "Zona residencial" },
      { label: "Ruido noche", status: "ok", detail: "Muy silencioso", note: "Sin bares cerca" },
      { label: "Luz natural", status: "ok", detail: "Buena", note: "Orientación sur" },
      { label: "Agua", status: "ok", detail: "Presión normal", note: "Red municipal" },
    ],
    insider: {
      owner: "Pareja española. Viven en Málaga. Respuesta por email 24-48h.",
      history: "Alquilada a turistas hasta 2024. Ahora buscan inquilino largo plazo.",
      neighbors: "Vecindario tranquilo. Mezcla de locales y extranjeros.",
    },
    lifestyle: {
      fits: [
        "Presupuesto ajustado es prioridad",
        "Valoras tranquilidad sobre ubicación céntrica",
        "No necesitas mucho espacio",
      ],
      notFits: [
        "Necesitas parking",
        "Quieres casa grande o reformada",
        "Prefieres estar en el centro exacto",
      ],
    },
    listingUrl: "#",
    mapsUrl: "https://www.google.com/maps?q=36.7918,-3.8970",
    gestion: "Agencia",
    parking: "❌",
    vistas: 4,
    internet: "300MB",
    ruido: "Bajo",
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
        </div>

        <CardContent className="p-5 space-y-3">
          <h3 className="text-lg font-bold" style={{ color: "hsl(213 56% 23%)" }}>{p.name}</h3>
          <p className="text-sm" style={{ color: "hsl(215 19% 34%)" }}>{p.price} · {p.beds} dorm · {p.size}</p>
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
              <h4 className="font-bold mb-3" style={{ color: "hsl(213 56% 23%)" }}>👤 INFORMACIÓN PRIVILEGIADA</h4>
              {([["PROPIETARIA", p.insider.owner], ["HISTORIA", p.insider.history], ["VECINOS", p.insider.neighbors]] as const).map(([label, text]) => (
                <div key={label} className="mb-3">
                  <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: "hsl(215 19% 34%)" }}>{label}:</p>
                  <p className="text-sm" style={{ color: "hsl(215 19% 34%)" }}>{text}</p>
                </div>
              ))}
            </div>

            {/* Lifestyle fit */}
            <div>
              <h4 className="font-bold mb-3" style={{ color: "hsl(213 56% 23%)" }}>🌍 TU VIDA AQUÍ</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-bold mb-2" style={{ color: "hsl(142 71% 45%)" }}>ENCAJA CONTIGO SI:</p>
                  {p.lifestyle.fits.map((t, i) => <p key={i} className="text-sm">✅ {t}</p>)}
                </div>
                <div>
                  <p className="text-sm font-bold mb-2 text-red-600">NO ENCAJA SI:</p>
                  {p.lifestyle.notFits.map((t, i) => <p key={i} className="text-sm">❌ {t}</p>)}
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="flex-1">
                <Button className="w-full font-semibold" style={{ background: "hsl(142 71% 45%)", color: "#fff", borderRadius: 8 }}>
                  <Mail className="w-4 h-4 mr-2" /> QUIERO VER ESTA CASA
                </Button>
              </a>
              <a href={p.listingUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                <Button variant="outline" className="w-full font-semibold" style={{ borderRadius: 8 }}>
                  <ExternalLink className="w-4 h-4 mr-2" /> Ver anuncio original
                </Button>
              </a>
              <a href={p.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                <Button variant="outline" className="w-full font-semibold" style={{ borderRadius: 8 }}>
                  <MapPin className="w-4 h-4 mr-2" /> Ver en Google Maps
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
export default function ReporteTest() {
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
    // Hide no-print elements
    el.querySelectorAll("[data-no-print]").forEach((n) => (n as HTMLElement).style.display = "none");
    await html2pdf().set({
      margin: 10,
      filename: `Reporte_Frigiliana_${new Date().toISOString().slice(0, 10)}.pdf`,
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
      {/* noindex */}
      <div dangerouslySetInnerHTML={{ __html: '' }} />

      {/* ─── 1. HERO ─── */}
      <section className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden">
        <img src={heroImg} alt="Frigiliana" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/55" />
        <div ref={heroFade.ref} className={`relative z-10 px-6 max-w-xl ${heroFade.className}`}>
          <img src="/propaxar-vision.png" alt="Propaxar" className="h-10 mx-auto mb-6 opacity-90" />
          <h1 className="text-3xl md:text-5xl font-bold leading-tight text-white mb-2">REPORTE INMOBILIARIO<br />PERSONALIZADO</h1>
          <p className="text-xl md:text-2xl font-medium mt-4 text-white/90">Cliente Test</p>
          <p className="text-base text-white/70">Frigiliana · Febrero 2026</p>
          <p className="text-sm mt-6 text-white/60">Elaborado por Manuel Fernández<br />Analista Inmobiliario</p>
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
                { icon: <Search className="w-7 h-7" />, title: "BÚSQUEDA", items: ["237 anuncios revisados", "18 propiedades visitadas", "8 seleccionadas finales"] },
                { icon: <Target className="w-7 h-7" />, title: "TU PERFIL", items: ["Presupuesto: €900-1,000/mes", "Zona: Frigiliana centro", "Must-haves: Terraza, Internet, Vistas"] },
                { icon: <Award className="w-7 h-7" />, title: "MI RECOMENDACIÓN", items: ["Mejor opción: Propiedad #1", "Casa Calle Suspiro", "€950/mes · 2 dormitorios"] },
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
                  <h3 className="font-bold mb-4" style={{ color: "hsl(213 56% 23%)" }}>Precios promedio Frigiliana</h3>
                  {[["1 dormitorio", "€650-800/mes"], ["2 dormitorios", "€850-1,100/mes"], ["3 dormitorios", "€1,200-1,500/mes"]].map(([k, v]) => (
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
                    "El mercado está equilibrado. Buena disponibilidad en tu rango de precio. Febrero es buen momento para alquilar - menos competencia que primavera."
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* ─── 4. PROPIEDADES ─── */}
        <section className="py-16 px-4 md:px-8 max-w-5xl mx-auto" ref={propsFade.ref}>
          <div className={propsFade.className}>
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-2" style={{ color: "hsl(213 56% 23%)" }}>Propiedades Seleccionadas para Ti</h2>
            <p className="text-center text-sm mb-10" style={{ color: "hsl(215 19% 34%)" }}>Click en cada una para ver análisis completo</p>
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
                    {["Propiedad", "Precio", "Dorms", "Parking", "Vistas", "Internet", "Ruido", "Gestión", "⭐"].map((h) => (
                      <TableHead key={h} className="text-xs font-bold whitespace-nowrap">{h}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {properties.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell className="font-semibold text-sm whitespace-nowrap">#{p.id} {p.name.split(",")[0].replace("Casa ", "").replace("Apartamento ", "")}</TableCell>
                      <TableCell className="text-sm">{p.price.replace("/mes", "")}</TableCell>
                      <TableCell className="text-sm">{p.beds}</TableCell>
                      <TableCell className="text-sm">{p.parking}</TableCell>
                      <TableCell><Stars count={p.vistas} /></TableCell>
                      <TableCell className="text-sm">{p.internet}</TableCell>
                      <TableCell className="text-sm">{p.ruido}</TableCell>
                      <TableCell className="text-sm">{p.gestion}</TableCell>
                      <TableCell className="font-bold">{p.rating}</TableCell>
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
                <p className="text-lg font-semibold text-white">Propiedad #1 - Casa Calle Suspiro · €950/mes · 2 dormitorios</p>
                <div className="text-sm leading-relaxed text-white/90 space-y-2">
                  <p><strong>POR QUÉ:</strong> Esta casa encaja perfectamente con tu perfil. Dijiste que trabajas remoto y necesitas internet excelente - tiene fibra 600MB testeada. Quieres vistas y terraza - tiene ambas. La ubicación es inmejorable para vivir sin coche.</p>
                  <p>Única pega: parking. Pero hay público 100m por €40/mes.</p>
                  <p>Además, la gestiono YO directamente - te reembolso los €180 del reporte si la alquilas. <strong>SERVICIO GRATIS ✨</strong></p>
                </div>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" data-no-print>
                  <Button className="mt-4 text-base font-bold px-10 py-5" style={{ background: "#fff", color: "hsl(142 71% 35%)", borderRadius: 10 }}>
                    AGENDAR VISITA
                  </Button>
                </a>
              </CardContent>
            </Card>
            <div className="mt-6 space-y-2 text-sm" style={{ color: "hsl(215 19% 34%)" }}>
              <p><strong>Segunda opción:</strong> Propiedad #3 si priorizas precio sobre ubicación.</p>
              <p><strong>Tercera opción:</strong> Propiedad #2 si necesitas parking obligatorio.</p>
            </div>
          </div>
        </section>

        {/* ─── 7. PRÓXIMOS PASOS ─── */}
        <section className="py-16 px-4 md:px-8 max-w-5xl mx-auto" style={{ background: "hsl(210 20% 98%)" }} ref={stepsFade.ref}>
          <div className={stepsFade.className}>
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10" style={{ color: "hsl(213 56% 23%)" }}>Próximos Pasos</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { num: "1️⃣", title: "LEE EL REPORTE CON CALMA", desc: "Tómate 1-2 días para digerirlo bien" },
                { num: "2️⃣", title: "MARCA TUS FAVORITAS", desc: "Anota las 2-3 que más te interesan" },
                { num: "3️⃣", title: "AVÍSAME POR WHATSAPP", desc: "Te coordino visitas en 24-48h" },
                { num: "4️⃣", title: "VEN A VERLAS", desc: "Te acompaño personalmente si quieres" },
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
              <p className="text-sm mt-2" style={{ color: "hsl(215 19% 34%)" }}>Las propiedades buenas se alquilan rápido en Frigiliana. Si ves algo que te gusta, avísame pronto.</p>
              <p className="text-sm mt-1" style={{ color: "hsl(215 19% 34%)" }}>Tu reporte es válido <strong>6 MESES</strong>. Si el mercado cambia antes de tu mudanza, te lo actualizo <strong>GRATIS</strong>.</p>
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
                <p className="text-sm" style={{ color: "hsl(215 19% 34%)" }}>Guarda este reporte offline · Imprímelo o compártelo</p>
                <Button
                  onClick={handleDownloadPdf}
                  className="text-base font-bold px-10 py-5"
                  style={{ background: "hsl(142 71% 45%)", color: "#fff", borderRadius: 10 }}
                >
                  <Download className="w-5 h-5 mr-2" /> DESCARGAR PDF
                </Button>
                <p className="text-xs" style={{ color: "hsl(215 19% 34%)" }}>Tamaño: ~8MB · 18 páginas</p>
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
              <MessageCircle className="w-4 h-4 mr-2" /> +34 662 317 561
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