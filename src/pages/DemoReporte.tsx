import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Helmet } from "react-helmet-async";
import { ChevronDown, ChevronUp, MapPin, Check, AlertTriangle, Star, MessageCircle, Mail, Search, Target, Award, Package, Trash2, Droplets, TrendingUp, FileText, Globe, CreditCard, Shield, Lock } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import heroImg from "@/assets/frigiliana-street.jpg";

const WHATSAPP_LINK = "https://wa.me/34662317561?text=Hello%20Manuel%2C%20I%27m%20interested%20in%20a%20Propaxar%20Market%20Report";
const EMAIL_LINK = "mailto:info@propaxar.com?subject=Market%20Report%20Inquiry";
const CTA_LINK = "https://buy.stripe.com/bJe6oJ9fS73gffkdepgEg05";

type Lang = "es" | "en";
const t = (lang: Lang, es: string, en: string) => (lang === "es" ? es : en);

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

// ─── PROPERTIES DATA (DEMO - anonymized, bilingual) ───
type Prop = {
  id: number; ref: string; name: string; price: string; beds: number; baths: number; size: string; rating: number;
  badge: { es: string; en: string }; badgeColor: string; available: { es: string; en: string };
  summary: { es: string; en: string };
  photos: string[];
  location: { address: { es: string; en: string }; lat: number; lng: number };
  pros: { es: string[]; en: string[] };
  cons: { es: string[]; en: string[] };
  analysis: {
    quality: { stars: number; text: { es: string; en: string } };
    price: { stars: number; label: { es: string; en: string }; text: { es: string; en: string } };
    location: { stars: number; label: { es: string; en: string }; text: { es: string; en: string } };
  };
  tests: { label: { es: string; en: string }; status: "ok" | "warn"; detail: { es: string; en: string }; note: { es: string; en: string } }[];
  insider: { owner: { es: string; en: string }; history: { es: string; en: string }; neighbors: { es: string; en: string } };
  lifestyle: { fits: { es: string[]; en: string[] }; notFits: { es: string[]; en: string[] } };
  parking: string; internet: string; noise: { es: string; en: string };
  neighborDirection: "north" | "south" | "east" | "west" | "multiple";
  nearestNeighborDistance: string;
};

const properties: Prop[] = [
  {
    id: 1, ref: "pa223", name: "Villa Patricia", price: "€900/month", beds: 2, baths: 2, size: "90m²", rating: 5,
    badge: { es: "✅ DENTRO DE PRESUPUESTO", en: "✅ WITHIN BUDGET" },
    badgeColor: "hsl(142 71% 45%)",
    available: { es: "Primavera 2026", en: "Spring 2026" },
    summary: {
      es: "ÚNICA opción en tu presupuesto €850-1.000. Casa tranquila zona norte, orientación sur, amplios exteriores + jardín.",
      en: "ONLY option in your €850-1,000 budget. Quiet house north area, south-facing, large outdoors + garden.",
    },
    photos: [
      "/images/properties/IMG_4099.jpg",
      "/images/properties/IMG_4202.jpg",
      "/images/properties/IMG_4178.jpg",
      "/images/properties/IMG_4127.jpg",
      "/images/properties/IMG_4108.jpg",
      "/images/properties/IMG_4105.jpg",
    ],
    location: { address: { es: "Diseminado - Frigiliana Norte", en: "Diseminado - Frigiliana North" }, lat: 36.7892, lng: -3.8956 },
    pros: {
      es: [
        "PRECIO EXCELENTE - €900 (€700 menos que otras opciones)",
        "Ubicación muy tranquila - pocos vecinos",
        "Orientación sur - mucha luz natural",
        "Grandes zonas exteriores con distintas áreas",
        "Jardín incluido",
        "2 baños completos",
        "Sin vecinos detrás ni a los lados - privacidad total",
        "Mascotas permitidas ✅",
      ],
      en: [
        "EXCELLENT PRICE - €900 (€700 less than other options)",
        "Very quiet location - few neighbours",
        "South-facing - lots of natural light",
        "Large outdoor areas with different zones",
        "Garden included",
        "2 full bathrooms",
        "No neighbours behind or to the sides - total privacy",
        "Pets allowed ✅",
      ],
    },
    cons: {
      es: [
        "Solo 2 dormitorios (mínimo 2, así que OK)",
        "Acceso por camino agrícola sin asfaltar de 300m",
        "Zona norte - algo lejos del centro (11 min en coche)",
      ],
      en: [
        "Only 2 bedrooms (minimum 2, so OK)",
        "Access via 300m unpaved agricultural lane",
        "North area - slightly far from centre (11 min by car)",
      ],
    },
    analysis: {
      quality: { stars: 3, text: { es: "Casa sólida construida a principios de los 2000. Bien mantenida. Buena estructura, sin problemas importantes.", en: "Solid house built early 2000s. Well maintained. Good structure, no major issues." } },
      price: { stars: 5, label: { es: "EXCELENTE", en: "EXCELLENT" }, text: { es: "€900 es justo. Zona norte similar: €900-1.300.\nAhorro: €8.400/año vs opciones de €1.600.", en: "€900 is fair. Similar north zone: €900-1,300.\nSavings: €8,400/year vs €1,600 options." } },
      location: { stars: 3, label: { es: "BUENA", en: "GOOD" }, text: { es: "Zona muy tranquila. Acceso a carretera principal en 3 min.\nAlgo lejos del centro pero compensado por precio/tranquilidad.", en: "Very quiet area. Main road access 3 min.\nSlightly far from centre but compensated by price/tranquillity." } },
    },
    tests: [
      { label: { es: "Internet", en: "Internet" }, status: "ok", detail: { es: "WiMax 60MB", en: "WiMax 60MB" }, note: { es: "Instalado - Starlink 300MB opcional", en: "Installed - Starlink 300MB optional" } },
      { label: { es: "Cobertura móvil", en: "Mobile signal" }, status: "ok", detail: { es: "Buena cobertura", en: "Good coverage" }, note: { es: "3-4 barras", en: "3-4 bars" } },
      { label: { es: "Ruido diurno", en: "Daytime noise" }, status: "ok", detail: { es: "Muy tranquilo", en: "Very quiet" }, note: { es: "Aislamiento total", en: "Total isolation" } },
      { label: { es: "Ruido nocturno", en: "Night noise" }, status: "ok", detail: { es: "Silencio absoluto", en: "Absolute silence" }, note: { es: "Zona muy tranquila", en: "Very peaceful area" } },
      { label: { es: "Luz natural", en: "Natural light" }, status: "ok", detail: { es: "Excelente", en: "Excellent" }, note: { es: "Orientación sur perfecta", en: "Perfect south orientation" } },
      { label: { es: "Agua", en: "Water" }, status: "ok", detail: { es: "Buena presión", en: "Good pressure" }, note: { es: "Agua agrícola, sin problemas", en: "Agricultural water, no issues" } },
    ],
    insider: {
      owner: { es: "Persona seria. Inquilinos anteriores siempre contentos.", en: "Serious person. Previous tenants always happy." },
      history: { es: "Disponible Primavera 2026. Nunca incidentes.", en: "Available Spring 2026. Never any incidents." },
      neighbors: { es: "Zona tranquila, pocos vecinos. Ninguno detrás ni a los lados. Privacidad total.", en: "Quiet area, few neighbours. None behind or to the sides. Total privacy." },
    },
    lifestyle: {
      fits: {
        es: [
          "Presupuesto €850-1.000 ES TU PRIORIDAD (única opción)",
          "Pareja o persona sola (2 dorm. suficientes)",
          "Valoras tranquilidad/naturaleza sobre ubicación",
          "Quieres jardín para cultivar",
          "Tienes coche (zona algo remota)",
        ],
        en: [
          "€850-1,000 budget IS YOUR PRIORITY (only option)",
          "Couple or single person (2 beds sufficient)",
          "Value tranquillity/nature over location",
          "Want a garden to grow your own vegetables",
          "Have a car (area is slightly remote)",
        ],
      },
      notFits: {
        es: [
          "Necesitas 3+ dormitorios obligatorios",
          "Priorizas estar cerca del centro del pueblo",
          "Sin coche (zona remota)",
        ],
        en: [
          "Need 3+ bedrooms mandatory",
          "Prioritise being close to the town centre",
          "No car (remote area)",
        ],
      },
    },
    parking: "✅", internet: "60MB", noise: { es: "Muy bajo", en: "Very low" },
    neighborDirection: "east", nearestNeighborDistance: "75m",
  },
  {
    id: 2, ref: "pa194", name: "Casa del Campo", price: "€1,600/month", beds: 3, baths: 2, size: "100m²", rating: 4,
    badge: { es: "⚠ FUERA DE PRESUPUESTO", en: "⚠ OVER BUDGET" },
    badgeColor: "hsl(39 76% 61%)",
    available: { es: "Primavera 2026", en: "Spring 2026" },
    summary: { es: "Zona premium. Vistas espectaculares 360°, acceso perfecto. PERO €1.600/mes = 60% más que tu presupuesto.", en: "Premium area. Spectacular 360° views, perfect access. BUT €1,600/month = 60% more than your budget." },
    photos: [
      "/images/properties/3843121-14b2d3a1.jpg",
      "/images/properties/3843121-05a32812.jpg",
      "/images/properties/3843121-524b50d1.jpg",
      "/images/properties/3843121-c46b8798.jpg",
      "/images/properties/3843121-58d0de97.jpg",
      "/images/properties/3843121-e0cd04a0.jpg",
    ],
    location: { address: { es: "Camino de la Cruz - Frigiliana Oeste", en: "Camino de la Cruz - Frigiliana West" }, lat: 36.7923, lng: -3.8934 },
    pros: {
      es: ["Ubicación perfecta - zona más buscada de Frigiliana", "Vistas espectaculares 360°: mar, campo, montaña y pueblo", "Orientación sur - luz natural todo el día", "3 dormitorios + 2 baños", "Excelente calidad de construcción", "Mascotas permitidas ✅"],
      en: ["Perfect location - most sought-after area in Frigiliana", "Spectacular 360° views: sea, countryside, mountains and town", "South-facing - natural light all day", "3 bedrooms + 2 bathrooms", "Excellent build quality", "Pets allowed ✅"],
    },
    cons: {
      es: ["PRECIO: €1.600/mes = €600 POR ENCIMA de tu presupuesto", "Internet WiMax 60MB - sin fibra"],
      en: ["PRICE: €1,600/month = €600 OVER your budget", "WiMax 60MB internet - no fibre"],
    },
    analysis: {
      quality: { stars: 5, text: { es: "Construcción estilo rústico, muy bien mantenida. Propietarios cuidan la vivienda de forma impecable.", en: "Rustic style construction, very well maintained. Owners take immaculate care of the property." } },
      price: { stars: 4, label: { es: "JUSTO", en: "FAIR" }, text: { es: "€1.600 correcto para zona premium. PERO 60% más caro que tu presupuesto máximo.", en: "€1,600 correct for premium area. BUT 60% more expensive than your maximum budget." } },
      location: { stars: 5, label: { es: "EXCELENTE", en: "EXCELLENT" }, text: { es: "Mejor zona campo de Frigiliana. Demanda alta constante.", en: "Best countryside area in Frigiliana. Constantly high demand." } },
    },
    tests: [
      { label: { es: "Internet", en: "Internet" }, status: "ok", detail: { es: "WiMax 60MB", en: "WiMax 60MB" }, note: { es: "Starlink 300MB opcional €70/mes", en: "Starlink 300MB optional €70/month" } },
      { label: { es: "Cobertura móvil", en: "Mobile signal" }, status: "ok", detail: { es: "Cobertura perfecta", en: "Perfect coverage" }, note: { es: "4-5 barras", en: "4-5 bars" } },
      { label: { es: "Ruido diurno", en: "Daytime noise" }, status: "ok", detail: { es: "Bajo", en: "Low" }, note: { es: "Zona tranquila", en: "Quiet area" } },
      { label: { es: "Ruido nocturno", en: "Night noise" }, status: "ok", detail: { es: "Silencioso", en: "Silent" }, note: { es: "Sin ruido", en: "No noise" } },
      { label: { es: "Luz natural", en: "Natural light" }, status: "ok", detail: { es: "Excelente", en: "Excellent" }, note: { es: "Orientación sur", en: "South-facing" } },
      { label: { es: "Agua", en: "Water" }, status: "ok", detail: { es: "Buena presión", en: "Good pressure" }, note: { es: "Sin cortes", en: "No cuts" } },
    ],
    insider: {
      owner: { es: "Muy atento, siempre responde el mismo día.", en: "Very attentive, always responds same day." },
      history: { es: "Alquilada largo plazo en años recientes. Siempre bien mantenida. Sin incidentes.", en: "Rented long-term in recent years. Always well maintained. No incidents." },
      neighbors: { es: "Vecinos tranquilos. Nunca incidentes. Ambiente agradable.", en: "Quiet neighbours. Never any incidents. Pleasant atmosphere." },
    },
    lifestyle: {
      fits: { es: ["PUEDES SUBIR presupuesto a €1.600/mes", "Valoras ubicación premium sobre precio", "Necesitas 3 dormitorios"], en: ["CAN INCREASE budget to €1,600/month", "Value premium location over price", "Need 3 bedrooms"] },
      notFits: { es: ["Presupuesto máximo €1.000/mes (€600 de diferencia)", "Priorizas ahorrar sobre ubicación"], en: ["Maximum budget €1,000/month (€600 difference)", "Prioritise saving over location"] },
    },
    parking: "✅", internet: "60MB", noise: { es: "Bajo", en: "Low" },
    neighborDirection: "south", nearestNeighborDistance: "40m",
  },
  {
    id: 3, ref: "pa220", name: "Casa Fabi", price: "€1,600/month", beds: 3, baths: 2, size: "120m²", rating: 4,
    badge: { es: "⚠ FUERA DE PRESUPUESTO", en: "⚠ OVER BUDGET" },
    badgeColor: "hsl(39 76% 61%)",
    available: { es: "Primavera 2026", en: "Spring 2026" },
    summary: { es: "Casa grande 120m², disponible YA. PERO €1.600/mes = 60% más que el presupuesto.", en: "Large house 120m², available NOW. BUT €1,600/month = 60% more than budget." },
    photos: ["/images/properties/IMG_8023.jpg"],
    location: { address: { es: "Frigiliana Este", en: "Frigiliana East" }, lat: 36.7901, lng: -3.8967 },
    pros: { es: ["Disponible YA", "Casa más grande - 120m²", "Vistas despejadas", "Mascotas permitidas ✅"], en: ["Available NOW", "Largest house - 120m²", "Clear views", "Pets allowed ✅"] },
    cons: { es: ["PRECIO: €1.600/mes = €600 POR ENCIMA del presupuesto", "Acceso por escaleras"], en: ["PRICE: €1,600/month = €600 OVER budget", "Staircase access"] },
    analysis: {
      quality: { stars: 3, text: { es: "Construcción de buena calidad.", en: "Good quality construction." } },
      price: { stars: 3, label: { es: "ALGO ALTO", en: "SLIGHTLY HIGH" }, text: { es: "€1.600 por encima de la media.", en: "€1,600 above average." } },
      location: { stars: 4, label: { es: "MUY BUENA", en: "VERY GOOD" }, text: { es: "Zona de alta demanda.", en: "High-demand area." } },
    },
    tests: [],
    insider: { owner: { es: "", en: "" }, history: { es: "", en: "" }, neighbors: { es: "", en: "" } },
    lifestyle: { fits: { es: [], en: [] }, notFits: { es: [], en: [] } },
    parking: "✅", internet: "60MB", noise: { es: "Moderado", en: "Moderate" },
    neighborDirection: "multiple", nearestNeighborDistance: "30m",
  },
  {
    id: 4, ref: "pa224", name: "Casa Loma Cruz", price: "€1,600/month", beds: 2, baths: 1, size: "75m²", rating: 3,
    badge: { es: "⚠ FUERA DE PRESUPUESTO", en: "⚠ OVER BUDGET" },
    badgeColor: "hsl(39 76% 61%)",
    available: { es: "Primavera 2026", en: "Spring 2026" },
    summary: { es: "Premium Loma Cruz. Bien mantenida. PERO €1.600/mes = 60% más + pequeña (75m²).", en: "Premium Loma Cruz. Well maintained. BUT €1,600/month = 60% more + small (75m²)." },
    photos: ["/images/properties/IMG_7565.jpg"],
    location: { address: { es: "Loma de la Cruz", en: "Loma de la Cruz" }, lat: 36.7915, lng: -3.8945 },
    pros: { es: ["Construcción sólida", "Aparcamiento propio", "Zona premium", "Mascotas permitidas ✅"], en: ["Solid construction", "Own parking", "Premium area", "Pets allowed ✅"] },
    cons: { es: ["PRECIO: €1.600/mes", "Solo 75m²", "Solo 1 baño"], en: ["PRICE: €1,600/month", "Only 75m²", "Only 1 bathroom"] },
    analysis: {
      quality: { stars: 4, text: { es: "Construcción sólida.", en: "Solid construction." } },
      price: { stars: 2, label: { es: "ALTO", en: "HIGH" }, text: { es: "€1.600 alto para 75m².", en: "€1,600 high for 75m²." } },
      location: { stars: 4, label: { es: "EXCELENTE", en: "EXCELLENT" }, text: { es: "Loma Cruz - mejor zona.", en: "Loma Cruz - best area." } },
    },
    tests: [],
    insider: { owner: { es: "", en: "" }, history: { es: "", en: "" }, neighbors: { es: "", en: "" } },
    lifestyle: { fits: { es: [], en: [] }, notFits: { es: [], en: [] } },
    parking: "✅", internet: "60MB", noise: { es: "Muy bajo", en: "Very low" },
    neighborDirection: "west", nearestNeighborDistance: "50m",
  },
];

// ─── Stars ───
const Stars = ({ count, max = 5 }: { count: number; max?: number }) => (
  <span className="inline-flex gap-0.5">
    {Array.from({ length: max }, (_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < count ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))}
  </span>
);

// ─── Neighbor Map SVG ───
function NeighborMap({ direction, distance, lang }: { direction: string; distance: string; lang: Lang }) {
  const dirPositions: Record<string, { cx: number; cy: number }[]> = {
    north: [{ cx: 100, cy: 25 }],
    south: [{ cx: 100, cy: 175 }],
    east: [{ cx: 175, cy: 100 }],
    west: [{ cx: 25, cy: 100 }],
    multiple: [{ cx: 175, cy: 100 }, { cx: 100, cy: 175 }],
  };
  const neighbors = dirPositions[direction] || dirPositions.east;
  const dirLabel = lang === "es"
    ? ({ north: "norte", south: "sur", east: "este", west: "oeste", multiple: "varios" } as Record<string, string>)[direction] || direction
    : direction;

  return (
    <div className="mt-3 flex flex-col items-center">
      <svg viewBox="0 0 200 200" width="180" height="180" className="rounded-lg" style={{ background: "hsl(142 71% 45%/0.06)" }}>
        <line x1="0" y1="100" x2="200" y2="100" stroke="hsl(212 26% 83%)" strokeWidth="0.5" strokeDasharray="4" />
        <line x1="100" y1="0" x2="100" y2="200" stroke="hsl(212 26% 83%)" strokeWidth="0.5" strokeDasharray="4" />
        <text x="100" y="12" textAnchor="middle" fontSize="9" fill="hsl(215 19% 55%)">N</text>
        <text x="100" y="197" textAnchor="middle" fontSize="9" fill="hsl(215 19% 55%)">S</text>
        <text x="8" y="104" textAnchor="middle" fontSize="9" fill="hsl(215 19% 55%)">{lang === "es" ? "O" : "W"}</text>
        <text x="192" y="104" textAnchor="middle" fontSize="9" fill="hsl(215 19% 55%)">E</text>
        <rect x="82" y="82" width="36" height="36" rx="6" fill="hsl(213 56% 23%)" />
        <text x="100" y="104" textAnchor="middle" fontSize="8" fill="white" fontWeight="bold">{lang === "es" ? "TÚ" : "YOU"}</text>
        {neighbors.map((n, i) => (
          <g key={i}>
            <circle cx={n.cx} cy={n.cy} r="14" fill="hsl(39 76% 61%/0.3)" stroke="hsl(39 76% 61%)" strokeWidth="1.5" />
            <text x={n.cx} y={n.cy + 3} textAnchor="middle" fontSize="7" fill="hsl(39 76% 61%)">🏠</text>
            <line x1="100" y1="100" x2={n.cx} y2={n.cy} stroke="hsl(215 19% 55%)" strokeWidth="0.8" strokeDasharray="3" />
          </g>
        ))}
        <text x="100" y="145" textAnchor="middle" fontSize="9" fill="hsl(213 56% 23%)" fontWeight="bold">≈ {distance}</text>
      </svg>
      <p className="text-xs mt-1" style={{ color: "hsl(215 19% 55%)" }}>
        {lang === "es" ? `Vecino más cercano: ${distance} ${dirLabel}` : `Nearest neighbour: ${distance} ${dirLabel}`}
      </p>
    </div>
  );
}

// ─── Lightbox ───
function Lightbox({ images, initialIndex, onClose }: { images: string[]; initialIndex: number; onClose: () => void }) {
  const [idx, setIdx] = useState(initialIndex);
  const safeImages = images && images.length > 0 ? images : [];
  const currentSrc = safeImages[idx] ?? "";
  const prev = () => setIdx((i) => (i === 0 ? safeImages.length - 1 : i - 1));
  const next = () => setIdx((i) => (i + 1) % safeImages.length);
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", handleKey);
    return () => { document.removeEventListener("keydown", handleKey); document.body.style.overflow = "unset"; };
  }, []);
  if (!currentSrc) return null;
  return createPortal(
    <div style={{ position: "fixed", inset: 0, zIndex: 99999, backgroundColor: "black" }} onClick={onClose}>
      <button onClick={(e) => { e.stopPropagation(); onClose(); }} style={{ position: "fixed", top: 12, right: 12, zIndex: 100000, backgroundColor: "white", color: "black", border: "none", borderRadius: "50%", width: 50, height: 50, fontSize: 28, fontWeight: "bold", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 12px rgba(0,0,0,0.5)" }} aria-label="Close">×</button>
      {safeImages.length > 1 && (<button onClick={(e) => { e.stopPropagation(); prev(); }} style={{ position: "fixed", left: 12, top: "50%", transform: "translateY(-50%)", zIndex: 100000, backgroundColor: "white", color: "black", border: "none", borderRadius: "50%", width: 50, height: 50, fontSize: 24, fontWeight: "bold", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 12px rgba(0,0,0,0.5)" }} aria-label="Previous">←</button>)}
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: "70px 60px" }} onClick={(e) => e.stopPropagation()}>
        <img key={currentSrc} src={currentSrc} alt={`Photo ${idx + 1}`} crossOrigin="anonymous" referrerPolicy="no-referrer" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", display: "block" }} onError={(e) => { (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23333" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" fill="%23999" font-size="16"%3EImage unavailable%3C/text%3E%3C/svg%3E'; }} />
      </div>
      {safeImages.length > 1 && (<button onClick={(e) => { e.stopPropagation(); next(); }} style={{ position: "fixed", right: 12, top: "50%", transform: "translateY(-50%)", zIndex: 100000, backgroundColor: "white", color: "black", border: "none", borderRadius: "50%", width: 50, height: 50, fontSize: 24, fontWeight: "bold", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 12px rgba(0,0,0,0.5)" }} aria-label="Next">→</button>)}
      {safeImages.length > 1 && (<div style={{ position: "fixed", bottom: 16, left: "50%", transform: "translateX(-50%)", backgroundColor: "white", color: "black", borderRadius: 999, padding: "6px 16px", fontWeight: "bold", fontSize: 14, boxShadow: "0 2px 8px rgba(0,0,0,0.4)" }}>{idx + 1} / {safeImages.length}</div>)}
    </div>,
    document.body
  );
}

// ─── Demo Property Card ───
function DemoPropertyCard({ p, lang }: { p: Prop; lang: Lang }) {
  const [open, setOpen] = useState(false);
  const [lightbox, setLightbox] = useState<{ open: boolean; index: number }>({ open: false, index: 0 });
  const fade = useFadeIn();

  return (
    <div ref={fade.ref} className={fade.className}>
      {lightbox.open && (
        <Lightbox images={p.photos} initialIndex={lightbox.index} onClose={() => setLightbox({ open: false, index: 0 })} />
      )}

      <Card className="overflow-hidden border-0" style={{ boxShadow: "0 4px 24px hsl(0 0% 0%/0.08)", borderRadius: 12 }}>
        <div className="relative h-52 bg-gray-200 overflow-hidden cursor-pointer" onClick={() => setLightbox({ open: true, index: 0 })}>
          <img src={p.photos[0]} alt={p.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" loading="lazy" />
          <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white" style={{ background: p.badgeColor }}>{p.badge[lang]}</span>
          <span className="absolute top-3 right-3 px-2 py-1 rounded text-xs font-bold text-white bg-black/50">{p.ref.toUpperCase()}</span>
          <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full">📷 {p.photos.length} {t(lang, "fotos", "photos")}</div>
        </div>

        <CardContent className="p-5 space-y-3">
          <h3 className="text-lg font-bold" style={{ color: "hsl(213 56% 23%)" }}>{p.name}</h3>
          <p className="text-sm" style={{ color: "hsl(215 19% 34%)" }}>
            {p.price} · {p.beds} {t(lang, "dorm.", "beds")} · {p.baths} {t(lang, "baños", "baths")} · {p.size}
          </p>
          <div className="flex items-center gap-2">
            <Stars count={p.rating} />
            <span className="text-sm font-medium">{t(lang, "Para tu perfil", "For your profile")}: {p.rating}/5</span>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: "hsl(215 19% 34%)" }}>"{p.summary[lang]}"</p>
          <div className="flex gap-2 text-xs text-gray-500">
            <span>📅 {p.available[lang]}</span>
            <span>·</span>
            <span>🐾 {t(lang, "Mascotas: Sí", "Pets: Yes")}</span>
          </div>
          <p className="text-xs italic" style={{ color: "hsl(215 19% 55%)" }}>📍 {t(lang, "Coordenadas exactas en el reporte completo", "Exact coordinates in full report")}</p>
          <Button className="w-full mt-2 font-semibold" style={{ background: "hsl(213 56% 23%)", color: "#fff", borderRadius: 8 }} onClick={() => setOpen(!open)}>
            {open ? t(lang, "CERRAR ANÁLISIS", "CLOSE ANALYSIS") : t(lang, "VER ANÁLISIS COMPLETO", "VIEW FULL ANALYSIS")}
            {open ? <ChevronUp className="ml-2 w-4 h-4" /> : <ChevronDown className="ml-2 w-4 h-4" />}
          </Button>
        </CardContent>

        {open && (
          <div className="border-t px-5 pb-6 space-y-6 animate-fade-in">
            <div className="pt-4">
              <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: "hsl(215 19% 34%)" }}>{t(lang, "Haz clic para ampliar", "Click to enlarge")}</p>
              <div className="grid grid-cols-3 gap-2">
                {p.photos.map((src, i) => (
                  <img key={i} src={src} alt={`Photo ${i + 1}`} className="rounded-lg w-full h-24 object-cover cursor-pointer hover:opacity-80 hover:scale-105 transition-all duration-200" loading="lazy" onClick={() => setLightbox({ open: true, index: i })} />
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold flex items-center gap-2 mb-2" style={{ color: "hsl(213 56% 23%)" }}>
                <MapPin className="w-4 h-4" /> {t(lang, "UBICACIÓN", "LOCATION")}
              </h4>
              <p className="text-sm mb-2">{p.location.address[lang]}</p>
              <div className="rounded-lg h-48 bg-gray-100 flex items-center justify-center border" style={{ borderColor: "hsl(212 26% 83%)" }}>
                <div className="text-center">
                  <MapPin className="w-8 h-8 mx-auto mb-2" style={{ color: "hsl(215 19% 55%)" }} />
                  <p className="text-sm font-semibold" style={{ color: "hsl(213 56% 23%)" }}>{t(lang, "GPS exacto y mapa en el reporte completo", "Exact GPS & Map in Full Report")}</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold flex items-center gap-2 mb-2" style={{ color: "hsl(142 71% 45%)" }}><Check className="w-4 h-4" /> {t(lang, "VENTAJAS", "ADVANTAGES")}</h4>
              <ul className="space-y-1">
                {p.pros[lang].map((tx, i) => <li key={i} className="text-sm flex items-start gap-2"><Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "hsl(142 71% 45%)" }} />{tx}</li>)}
              </ul>
            </div>

            <div>
              <h4 className="font-bold flex items-center gap-2 mb-2 text-amber-600"><AlertTriangle className="w-4 h-4" /> {t(lang, "CONSIDERACIONES", "CONSIDERATIONS")}</h4>
              <ul className="space-y-1">
                {p.cons[lang].map((tx, i) => <li key={i} className="text-sm flex items-start gap-2"><AlertTriangle className="w-4 h-4 mt-0.5 shrink-0 text-amber-500" />{tx}</li>)}
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-3" style={{ color: "hsl(213 56% 23%)" }}>📊 {t(lang, "MI ANÁLISIS PROFESIONAL", "MY PROFESSIONAL ANALYSIS")}</h4>
              <Tabs defaultValue="quality">
                <TabsList className="w-full">
                  <TabsTrigger value="quality" className="flex-1 text-xs">{t(lang, "CALIDAD", "QUALITY")}</TabsTrigger>
                  <TabsTrigger value="price" className="flex-1 text-xs">{t(lang, "PRECIO", "PRICE")}</TabsTrigger>
                  <TabsTrigger value="location" className="flex-1 text-xs">{t(lang, "UBICACIÓN", "LOCATION")}</TabsTrigger>
                </TabsList>
                {(["quality", "price", "location"] as const).map((key) => (
                  <TabsContent key={key} value={key} className="mt-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <Stars count={p.analysis[key].stars} />
                      <span className="text-sm font-semibold">({p.analysis[key].stars}/5)</span>
                      {"label" in p.analysis[key] && (
                        <Badge className="text-xs" style={{ background: "hsl(142 71% 45%)", color: "#fff", border: "none" }}>{(p.analysis[key] as any).label[lang]}</Badge>
                      )}
                    </div>
                    <p className="text-sm whitespace-pre-line" style={{ color: "hsl(215 19% 34%)" }}>{p.analysis[key].text[lang]}</p>
                  </TabsContent>
                ))}
              </Tabs>
            </div>

            <div>
              <h4 className="font-bold mb-3" style={{ color: "hsl(213 56% 23%)" }}>📡 {t(lang, "PRUEBAS REALIZADAS IN SITU", "ON-SITE TESTS PERFORMED")}</h4>
              <div className="space-y-2">
                {p.tests.map((te, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm">
                    <span className={te.status === "ok" ? "text-green-600" : "text-amber-500"}>{te.status === "ok" ? "✅" : "⚠️"}</span>
                    <div>
                      <span className="font-semibold">{te.label[lang]}:</span>{" "}
                      <span className={te.status === "ok" ? "text-green-700" : "text-amber-600"}>{te.detail[lang]}</span>
                      <p className="text-xs" style={{ color: "hsl(215 19% 34%)" }}>({te.note[lang]})</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-3" style={{ color: "hsl(213 56% 23%)" }}>👤 {t(lang, "INFORMACIÓN PRIVILEGIADA", "INSIDER INFORMATION")}</h4>
              {([
                [t(lang, "PROPIETARIO", "OWNER"), p.insider.owner[lang]],
                [t(lang, "HISTORIAL", "HISTORY"), p.insider.history[lang]],
                [t(lang, "VECINOS", "NEIGHBOURS"), p.insider.neighbors[lang]],
              ] as const).map(([label, text]) => (
                <div key={label} className="mb-3">
                  <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: "hsl(215 19% 34%)" }}>{label}:</p>
                  <p className="text-sm" style={{ color: "hsl(215 19% 34%)" }}>{text}</p>
                </div>
              ))}
              <NeighborMap direction={p.neighborDirection} distance={p.nearestNeighborDistance} lang={lang} />
            </div>

            <div>
              <h4 className="font-bold mb-3" style={{ color: "hsl(213 56% 23%)" }}>🌍 {t(lang, "TE ENCAJA SI...", "IT FITS YOU IF...")}</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-bold mb-2" style={{ color: "hsl(142 71% 45%)" }}>✅ {t(lang, "TE ENCAJA SI:", "FITS YOU IF:")}</p>
                  {p.lifestyle.fits[lang].map((tx, i) => <p key={i} className="text-sm">• {tx}</p>)}
                </div>
                <div>
                  <p className="text-sm font-bold mb-2 text-red-600">❌ {t(lang, "NO ENCAJA SI:", "DOESN'T FIT IF:")}</p>
                  {p.lifestyle.notFits[lang].map((tx, i) => <p key={i} className="text-sm">• {tx}</p>)}
                </div>
              </div>
            </div>

            <div className="rounded-lg p-4 text-center border" style={{ borderColor: "hsl(212 26% 83%)", background: "hsl(210 20% 98%)" }}>
              <p className="text-sm font-semibold" style={{ color: "hsl(213 56% 23%)" }}>📞 {t(lang, "Datos de contacto y URLs en el reporte completo", "Contact details & property URLs available in full report")}</p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

// ─── Main Page ───
export default function DemoReporte() {
  const { language } = useLanguage();
  const lang = language as Lang;
  const contentRef = useRef<HTMLDivElement>(null);
  const heroFade = useFadeIn();
  const summaryFade = useFadeIn();
  const marketFade = useFadeIn();
  const propsFade = useFadeIn();
  const logisticsFade = useFadeIn();
  const compFade = useFadeIn();
  const recoFade = useFadeIn();
  const ctaFade = useFadeIn();
  const docsFade = useFadeIn();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  const reportUrl = "https://propaxar.es/demo-reporte";
  const metaTitle = t(lang, "📊 Reporte Demo - Mira lo que recibes | Propaxar", "📊 Demo Report - See What You Get | Propaxar");
  const metaDescription = t(lang, "Reporte de propiedades de muestra para Frigiliana. Mira lo que incluye tu análisis de mercado personalizado.", "Sample property report for Frigiliana. See what's included in your personalized market analysis.");
  const ogImage = "https://propaxar.es/images/frigiliana-hero.jpg";

  return (
    <>
      <Helmet>
        <html lang={lang} />
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="robots" content="noindex, nofollow" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={reportUrl} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={ogImage} />
      </Helmet>

      {/* WATERMARK */}
      <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center" style={{ transform: "rotate(-30deg)" }}>
        <p className="text-[120px] md:text-[200px] font-black whitespace-nowrap select-none" style={{ color: "rgba(0,0,0,0.04)" }}>
          {t(lang, "MUESTRA DEMO", "DEMO SAMPLE")}
        </p>
      </div>

      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden">
        <img src={heroImg} alt="Frigiliana" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/55" />
        <div ref={heroFade.ref} className={`relative z-10 px-6 max-w-xl ${heroFade.className}`}>
          <img src="/propaxar-vision.png" alt="Propaxar" className="h-10 mx-auto mb-6 opacity-90" />
          <h1 className="text-4xl md:text-6xl font-bold leading-tight text-white mb-3">
            {lang === "es" ? (<>REPORTE<br />PERSONALIZADO</>) : (<>PERSONALISED<br />PROPERTY REPORT</>)}
          </h1>
          <p className="text-2xl md:text-3xl font-medium mt-5 text-white/90">Sarah M.</p>
          <p className="text-lg md:text-xl text-white/70 mt-1">Frigiliana · {t(lang, "Primavera 2026", "Spring 2026")}</p>
          <p className="text-base mt-6 text-white/60">{t(lang, "Preparado por Manuel Fernández", "Prepared by Manuel Fernández")}<br />{t(lang, "Analista de Propiedades", "Property Analyst")}</p>
          <ChevronDown className="mx-auto mt-10 w-8 h-8 animate-bounce text-white/60" />
        </div>
      </section>

      <div ref={contentRef}>
        {/* DEMO BANNER */}
        <div className="py-4 px-4" style={{ background: "linear-gradient(135deg, hsl(39 76% 61%), hsl(39 76% 51%))" }}>
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-base md:text-lg font-bold text-white flex items-center justify-center gap-2">
              <FileText className="w-5 h-5" />
              <Star className="w-5 h-5" />
              {t(lang, "REPORTE DE MUESTRA - Mira lo que recibes", "DEMO SAMPLE REPORT - See What You Get")}
            </p>
            <p className="text-sm text-white/90 mt-1">
              {t(lang, "Es un reporte real creado para una clienta satisfecha (nombre cambiado por privacidad)", "This is a real report created for a satisfied client (name changed for privacy)")}
            </p>
          </div>
        </div>

        {/* LAST UPDATED */}
        <div className="flex justify-center py-6 px-4">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border" style={{ background: "hsl(213 56% 23%/0.06)", borderColor: "hsl(213 56% 23%/0.2)", color: "hsl(213 56% 23%)" }}>
            📅 {t(lang, "Última actualización: Febrero 2026", "Last Updated: February 2026")} <span className="text-xs font-normal opacity-70">{t(lang, "(Semana 1 de 24)", "(Week 1 of 24)")}</span>
          </div>
        </div>

        {/* SEARCH SUMMARY */}
        <section className="py-12 px-4 md:px-8 max-w-5xl mx-auto" ref={summaryFade.ref}>
          <div className={summaryFade.className}>
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10" style={{ color: "hsl(213 56% 23%)" }}>{t(lang, "Resumen de tu búsqueda", "Your Search Summary")}</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: <Search className="w-7 h-7" />, title: t(lang, "BÚSQUEDA", "SEARCH"), items: [t(lang, "47 propiedades en el mercado", "47 properties on market"), t(lang, "4 seleccionadas", "4 selected"), t(lang, "SOLO 1 dentro de presupuesto", "ONLY 1 within budget")] },
                { icon: <Target className="w-7 h-7" />, title: t(lang, "TU PERFIL", "YOUR PROFILE"), items: [t(lang, "Presupuesto: €850-1.000/mes", "Budget: €850-1,000/month"), t(lang, "Dormitorios: 2+", "Bedrooms: 2+"), t(lang, "Mascotas: 2 gatos", "Pets: 2 cats"), t(lang, "Mudanza: Primavera 2026", "Move-in: Spring 2026")] },
                { icon: <Award className="w-7 h-7" />, title: t(lang, "MI RECOMENDACIÓN", "MY RECOMMENDATION"), items: [t(lang, "ÚNICA opción: Villa Patricia", "ONLY option: Villa Patricia"), t(lang, "€900/mes · 2 dormitorios", "€900/month · 2 bedrooms"), t(lang, "Resto fuera de presupuesto", "Rest over budget")] },
              ].map((c, i) => (
                <Card key={i} className="border-0 text-center" style={{ boxShadow: "0 4px 20px hsl(0 0% 0%/0.07)", borderRadius: 12 }}>
                  <CardContent className="p-6 space-y-3">
                    <div className="mx-auto w-14 h-14 rounded-full flex items-center justify-center" style={{ background: "hsl(213 56% 23%/0.08)", color: "hsl(213 56% 23%)" }}>{c.icon}</div>
                    <h3 className="font-bold text-sm tracking-wide" style={{ color: "hsl(213 56% 23%)" }}>{c.title}</h3>
                    {c.items.map((tx, j) => <p key={j} className="text-sm" style={{ color: "hsl(215 19% 34%)" }}>{tx}</p>)}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* MARKET */}
        <section className="py-16 px-4 md:px-8 max-w-5xl mx-auto" style={{ background: "hsl(210 20% 98%)" }} ref={marketFade.ref}>
          <div className={marketFade.className}>
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10" style={{ color: "hsl(213 56% 23%)" }}>{t(lang, "Realidad del Mercado - 2026", "Market Reality - 2026")}</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-0" style={{ boxShadow: "0 4px 20px hsl(0 0% 0%/0.07)", borderRadius: 12 }}>
                <CardContent className="p-6">
                  <h3 className="font-bold mb-4" style={{ color: "hsl(213 56% 23%)" }}>{t(lang, "Precios medios Frigiliana", "Average Prices Frigiliana")}</h3>
                  {(lang === "es"
                    ? [["2 dorm. básico", "€1.200/mes"], ["2 dorm. + piscina", "€1.400/mes"], ["3 dorm. zona premium", "€1.600/mes"]]
                    : [["2 beds basic", "€1,200/month"], ["2 beds + pool", "€1,400/month"], ["3 beds premium area", "€1,600/month"]]
                  ).map(([k, v]) => (
                    <div key={k} className="flex justify-between py-2 border-b last:border-0 text-sm">
                      <span>{k}</span><span className="font-semibold">{v}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
              <Card className="border-0" style={{ boxShadow: "0 4px 20px hsl(0 0% 0%/0.07)", borderRadius: 12 }}>
                <CardContent className="p-6">
                  <h3 className="font-bold mb-4" style={{ color: "hsl(213 56% 23%)" }}>{t(lang, "Mi análisis para ti", "My analysis for you")}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "hsl(215 19% 34%)" }}>
                    {lang === "es" ? (
                      <><strong>IMPORTANTE Sarah:</strong> El mercado de campo en Frigiliana tiene pocas opciones €850-1.000. La mayoría están en €1.200-1.600. Villa Patricia es una <strong>oportunidad RARA</strong> en tu rango - no verás muchas así.</>
                    ) : (
                      <><strong>IMPORTANT Sarah:</strong> Frigiliana countryside market has few options €850-1,000. Most are €1,200-1,600. Villa Patricia is a <strong>RARE opportunity</strong> in your range - you won't see many like this.</>
                    )}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* DOCS & LEGAL */}
        <section className="py-16 px-4 md:px-8 max-w-5xl mx-auto" ref={docsFade.ref}>
          <div className={docsFade.className}>
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-2" style={{ color: "hsl(213 56% 23%)" }}>
              {t(lang, "Documentación y Requisitos Legales", "Documentation & Legal Requirements")}
            </h2>
            <p className="text-center text-sm mb-10" style={{ color: "hsl(215 19% 34%)" }}>
              {t(lang, "Lo que necesitas para alquilar legalmente en España", "What you need to rent legally in Spain")}
            </p>
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              {[
                {
                  icon: <FileText className="w-7 h-7" />,
                  title: t(lang, "NIE (Número de Identidad de Extranjero)", "NIE (Foreigners' ID Number)"),
                  urgency: t(lang, "ESENCIAL", "ESSENTIAL"),
                  urgencyColor: "hsl(0 72% 51%)",
                  description: t(lang, "Necesario para TODOS los contratos, cuentas bancarias y suministros. Sin él literalmente no puedes alquilar.", "Required for ALL contracts, bank accounts, utilities. Without it, you literally cannot rent."),
                  steps: lang === "es"
                    ? ["Solicítalo en el Consulado de España (tu país) o Comisaría (España)", "Tramitación: 2-4 semanas desde el extranjero, 1-2 semanas en España", "Documentos: pasaporte, formulario EX-15, justificante del motivo"]
                    : ["Apply at Spanish Consulate (home country) or Police Station (Spain)", "Processing: 2-4 weeks from abroad, 1-2 weeks in Spain", "Documents: passport, application form EX-15, proof of reason"],
                  tip: t(lang, "💡 Empieza YA si no lo tienes. Es el bloqueante #1.", "💡 Start this NOW if you don't have one. It's the #1 blocker."),
                },
                {
                  icon: <CreditCard className="w-7 h-7" />,
                  title: t(lang, "Cuenta Bancaria Española", "Spanish Bank Account"),
                  urgency: t(lang, "ESENCIAL", "ESSENTIAL"),
                  urgencyColor: "hsl(0 72% 51%)",
                  description: t(lang, "La mayoría de propietarios exigen el alquiler por transferencia bancaria española. También necesario para suministros.", "Most landlords require rent via Spanish bank transfer. Also needed for utilities."),
                  steps: lang === "es"
                    ? ["Abre en cualquier banco con NIE + pasaporte (Sabadell, CaixaBank, BBVA)", "Algunos bancos permiten apertura remota (N26, Openbank)", "Tramitación: el mismo día en oficina con NIE"]
                    : ["Open at any bank with NIE + passport (Sabadell, CaixaBank, BBVA)", "Some banks allow opening remotely (N26, Openbank)", "Processing: same day in branch with NIE"],
                  tip: t(lang, "💡 Puedo recomendarte una oficina en Nerja donde hablan inglés.", "💡 I can recommend a branch in Nerja where they speak English."),
                },
                {
                  icon: <Globe className="w-7 h-7" />,
                  title: t(lang, "Empadronamiento", "Empadronamiento (Town Registration)"),
                  urgency: t(lang, "EN 3 MESES", "WITHIN 3 MONTHS"),
                  urgencyColor: "hsl(39 76% 51%)",
                  description: t(lang, "Inscripción obligatoria en el ayuntamiento. Necesaria para sanidad, voto y residencia.", "Mandatory registration at your local town hall. Required for healthcare, voting, and residency."),
                  steps: lang === "es"
                    ? ["Acude al Ayuntamiento de Frigiliana con contrato de alquiler + pasaporte", "Gratis, mismo día", "Necesario para: sanidad pública, colegios, residencia"]
                    : ["Go to Frigiliana Town Hall with rental contract + passport", "Free of charge, done same day", "Needed for: public healthcare, schools, residency application"],
                  tip: t(lang, "💡 Te acompaño al Ayuntamiento - no hablan inglés.", "💡 I'll accompany you to Town Hall - they don't speak English."),
                },
                {
                  icon: <Shield className="w-7 h-7" />,
                  title: t(lang, "Esenciales del Contrato de Alquiler", "Rental Contract Essentials"),
                  urgency: t(lang, "AL FIRMAR", "AT SIGNING"),
                  urgencyColor: "hsl(213 56% 43%)",
                  description: t(lang, "La ley española (LAU) protege a los inquilinos. Puntos clave a verificar.", "Spanish rental law (LAU) protects tenants. Key things to verify in your contract."),
                  steps: lang === "es"
                    ? ["Duración mínima (para propietarios particulares)", "Fianza: máximo 2 meses (1 mes legal + 1 mes garantía)", "Subidas: ligadas al IPC (índice INE), máx. una vez al año", "Reviso TODOS los contratos antes de firmar"]
                    : ["Minimum duration (for individual landlords)", "Deposit: max 2 months rent (1 month legally + 1 month guarantee)", "Rent increases: tied to CPI (INE index), max once per year", "I review ALL contracts before you sign"],
                  tip: t(lang, "💡 Nunca firmes sin entender cada cláusula. Yo traduzco y explico todo.", "💡 Never sign without understanding every clause. I translate and explain everything."),
                },
              ].map((doc, i) => (
                <Card key={i} className="border-0 overflow-hidden" style={{ boxShadow: "0 4px 20px hsl(0 0% 0%/0.07)", borderRadius: 12 }}>
                  <CardContent className="p-6 space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style={{ background: "hsl(213 56% 23%/0.08)", color: "hsl(213 56% 23%)" }}>{doc.icon}</div>
                      <div>
                        <h3 className="font-bold text-sm" style={{ color: "hsl(213 56% 23%)" }}>{doc.title}</h3>
                        <span className="inline-block text-xs font-bold mt-1 px-2 py-0.5 rounded-full text-white" style={{ background: doc.urgencyColor }}>{doc.urgency}</span>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed filter blur-[5px] select-none" style={{ color: "hsl(215 19% 34%)" }}>{doc.description}</p>
                    <ul className="space-y-1 filter blur-[5px] select-none">
                      {doc.steps.map((s, j) => (
                        <li key={j} className="text-sm flex items-start gap-2">
                          <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "hsl(142 71% 45%)" }} />
                          <span style={{ color: "hsl(215 19% 34%)" }}>{s}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-xs font-medium filter blur-[5px] select-none" style={{ color: "hsl(213 56% 40%)" }}>{doc.tip}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-0" style={{ boxShadow: "0 4px 20px hsl(0 0% 0%/0.07)", borderRadius: 12 }}>
              <CardContent className="p-6">
                <h3 className="font-bold mb-4" style={{ color: "hsl(213 56% 23%)" }}>📄 {t(lang, "También bueno saber", "Also Good to Know")}</h3>
                <div className="grid sm:grid-cols-2 gap-4 filter blur-[5px] select-none">
                  {(lang === "es" ? [
                    { title: "Certificado Digital", desc: "Para trámites online del gobierno. Solicítalo en la FNMT tras obtener el NIE." },
                    { title: "Seguro de Hogar", desc: "Algunos propietarios lo exigen. €150-300/año. Cubre incendio, robo, responsabilidad civil." },
                    { title: "Permiso de Conducir", desc: "¿No-UE? Canjéalo en 6 meses en Tráfico Málaga." },
                    { title: "Obligaciones Fiscales", desc: "Si resides >183 días/año: declaración IRPF en España." },
                  ] : [
                    { title: "Certificado Digital", desc: "For online government services. Apply at FNMT after getting NIE." },
                    { title: "Home Insurance", desc: "Some landlords require it. €150-300/year. Covers fire, theft, liability." },
                    { title: "Driving Licence", desc: "Non-EU? Exchange within 6 months at Tráfico Málaga." },
                    { title: "Tax Obligations", desc: "If residing >183 days/year: Spanish tax return (IRPF)." },
                  ]).map((d, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <FileText className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "hsl(213 56% 40%)" }} />
                      <div>
                        <p className="text-sm font-semibold" style={{ color: "hsl(213 56% 23%)" }}>{d.title}</p>
                        <p className="text-xs" style={{ color: "hsl(215 19% 45%)" }}>{d.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* PROPERTIES */}
        <section className="py-16 px-4 md:px-8 max-w-5xl mx-auto" ref={propsFade.ref}>
          <div className={propsFade.className}>
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-2" style={{ color: "hsl(213 56% 23%)" }}>{t(lang, "Propiedades Analizadas", "Properties Analyzed")}</h2>
            <p className="text-center text-sm mb-10" style={{ color: "hsl(215 19% 34%)" }}>
              {t(lang, "Mostrando 1 de 6-8 propiedades · El reporte completo las incluye todas", "Showing 1 of 6-8 properties · Full report includes all")}
            </p>
            <div className="grid grid-cols-1 gap-6">
              <DemoPropertyCard p={properties[0]} lang={lang} />
              <div className="border-t" style={{ borderColor: "hsl(212 26% 83%)" }} />

              <div className="relative">
                <div className="filter blur-sm pointer-events-none select-none">
                  {properties.slice(1).map((p) => (
                    <Card key={p.id} className="overflow-hidden border-0 mb-6" style={{ boxShadow: "0 4px 24px hsl(0 0% 0%/0.08)", borderRadius: 12 }}>
                      <div className="relative h-52 bg-gray-200 overflow-hidden">
                        <img src={p.photos[0]} alt={p.name} className="w-full h-full object-cover" loading="lazy" />
                        <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white" style={{ background: p.badgeColor }}>{p.badge[lang]}</span>
                      </div>
                      <CardContent className="p-5 space-y-3">
                        <h3 className="text-lg font-bold" style={{ color: "hsl(213 56% 23%)" }}>{p.name}</h3>
                        <p className="text-sm">{p.price} · {p.beds} {t(lang, "dorm.", "beds")} · {p.baths} {t(lang, "baños", "baths")} · {p.size}</p>
                        <Stars count={p.rating} />
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div className="text-center p-8 max-w-md">
                    <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: "hsl(213 56% 23%/0.1)" }}>
                      <Lock className="w-8 h-8" style={{ color: "hsl(213 56% 23%)" }} />
                    </div>
                    <h3 className="text-xl font-bold mb-2" style={{ color: "hsl(213 56% 23%)" }}>
                      {t(lang, "5-7 propiedades más en el reporte completo", "5-7 More Properties in Full Report")}
                    </h3>
                    <p className="text-sm mb-6" style={{ color: "hsl(215 19% 34%)" }}>
                      {t(lang, "Desbloquea el análisis completo de 6-8 propiedades verificadas según tu búsqueda", "Unlock complete analysis of 6-8 verified properties tailored specifically to your search criteria")}
                    </p>
                    <div className="text-left max-w-xs mx-auto mb-2">
                      <p className="text-sm font-bold mb-3" style={{ color: "hsl(213 56% 23%)" }}>{t(lang, "Cada propiedad incluye:", "Each Property Includes:")}</p>
                      <div className="space-y-2">
                        {(lang === "es" ? [
                          "Análisis interno detallado y reseña honesta",
                          "Valoración de acceso y dificultad de conducción con mapas",
                          "Nivel de privacidad y mapas de proximidad de vecinos",
                          "Galerías de fotos completas",
                          "Datos de contacto directo y coordenadas GPS",
                          "Recomendación profesional de cuál es mejor para TI",
                        ] : [
                          "Detailed insider analysis and honest review",
                          "Access & driving difficulty ratings with maps",
                          "Privacy level & neighbor proximity maps",
                          "Complete photo galleries",
                          "Direct contact details & GPS coordinates",
                          "Professional recommendation which is best for YOU",
                        ]).map((tx, i) => (
                          <div key={i} className="flex items-start gap-2 text-sm">
                            <span style={{ color: "hsl(142 71% 45%)" }}>✓</span>
                            <span style={{ color: "hsl(215 19% 34%)" }}>{tx}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* LOGISTICS */}
        <section className="py-16 px-4 md:px-8 max-w-5xl mx-auto" ref={logisticsFade.ref}>
          <div className={logisticsFade.className}>
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-1" style={{ color: "hsl(213 56% 23%)" }}>
              {t(lang, "Logística: vivir en campo vs pueblo", "Country vs Town Living Logistics")}
            </h2>
            <p className="text-center text-sm mb-10" style={{ color: "hsl(215 19% 34%)" }}>{t(lang, "La verdad desde dentro", "The Insider's Truth")}</p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {[
                {
                  icon: <Package className="w-7 h-7" />,
                  title: t(lang, "Paquetería y Amazon", "Package Delivery and Amazon"),
                  countryside: t(lang, "No hay entrega puerta a puerta en zonas rurales de Frigiliana. Te ayudamos a registrarte en un punto de recogida local.", "There is no door-to-door delivery in rural Frigiliana areas. We'll help you register at a local Parcel Point."),
                  town: t(lang, "Cada vivienda tiene su dirección con entrega puerta a puerta.", "Each home has its own address with door-to-door delivery."),
                },
                {
                  icon: <Trash2 className="w-7 h-7" />,
                  title: t(lang, "Recogida de Basura", "Waste Collection"),
                  countryside: t(lang, "El camión no accede a caminos rurales. La basura se deja en puntos limpios de la carretera principal.", "The garbage truck does not access rural lanes. Waste must be deposited at clean points on the main road."),
                  town: t(lang, "Recogida casa por casa. Saca la basura tras las 21:30.", "Collection is done house by house. Put garbage outside after 9:30 PM."),
                },
                {
                  icon: <Droplets className="w-7 h-7" />,
                  title: t(lang, "Agua", "Water"),
                  countryside: t(lang, "El agua en casas rurales suele venir de pozos comunitarios o privados.", "Water in rural houses usually comes from community or private wells."),
                  town: t(lang, "Agua de la red municipal, gestionada por Aqualia.", "Water comes from the municipal network, managed by Aqualia."),
                },
              ].map((c, i) => (
                <Card key={i} className="border" style={{ borderColor: "hsl(212 26% 83%)", borderRadius: 12 }}>
                  <CardContent className="p-6 space-y-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "hsl(213 56% 23%/0.08)", color: "hsl(213 56% 23%)" }}>{c.icon}</div>
                    <h3 className="font-bold text-sm" style={{ color: "hsl(213 56% 23%)" }}>{c.title}</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: "hsl(213 56% 23%)" }}>🌿 {t(lang, "EN EL CAMPO", "IN THE COUNTRYSIDE")}</p>
                        <p className="text-sm leading-relaxed" style={{ color: "hsl(215 19% 34%)" }}>{c.countryside}</p>
                      </div>
                      <div className="border-t pt-3" style={{ borderColor: "hsl(212 26% 90%)" }}>
                        <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: "hsl(213 56% 40%)" }}>🏘️ {t(lang, "EN EL PUEBLO", "IN THE TOWN")}</p>
                        <p className="text-sm leading-relaxed" style={{ color: "hsl(215 19% 34%)" }}>{c.town}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-0" style={{ boxShadow: "0 4px 20px hsl(0 0% 0%/0.07)", borderRadius: 12 }}>
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-5 h-5" style={{ color: "hsl(142 71% 45%)" }} />
                  <h3 className="font-bold" style={{ color: "hsl(213 56% 23%)" }}>{t(lang, "Evolución del mercado en Frigiliana", "Market Evolution in Frigiliana")}</h3>
                </div>
                <p className="text-xs mb-6" style={{ color: "hsl(215 19% 34%)" }}>
                  {t(lang, "Precio medio +6% anual · Disponibilidad de alquiler de larga estancia <1%", "Average price +6% yearly · Long-term rental availability <1%")}
                </p>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={[
                      { year: "2020", price: 650 },
                      { year: "2021", price: 690 },
                      { year: "2022", price: 730 },
                      { year: "2023", price: 780 },
                      { year: "2024", price: 830 },
                      { year: "2025", price: 880 },
                      { year: "2026", price: 935 },
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(212 26% 83%)" />
                      <XAxis dataKey="year" tick={{ fontSize: 12, fill: "hsl(215 19% 34%)" }} />
                      <YAxis tick={{ fontSize: 12, fill: "hsl(215 19% 34%)" }} tickFormatter={(v) => `€${v}`} />
                      <Tooltip formatter={(value: number) => [`€${value}/${t(lang, "mes", "month")}`, t(lang, "Precio medio", "Average price")]} />
                      <Line type="monotone" dataKey="price" stroke="hsl(213 56% 23%)" strokeWidth={2.5} dot={{ fill: "hsl(213 56% 23%)", r: 4 }} activeDot={{ r: 6, fill: "hsl(142 71% 45%)" }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* COMPARISON */}
        <section className="py-16 px-4 md:px-8 max-w-5xl mx-auto" style={{ background: "hsl(210 20% 98%)" }} ref={compFade.ref}>
          <div className={compFade.className}>
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10" style={{ color: "hsl(213 56% 23%)" }}>{t(lang, "Comparativa rápida", "Quick Comparison")}</h2>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    {(lang === "es"
                      ? ["Ref", "Nombre", "Precio", "Dorm.", "Baños", "m²", "Disponible", "Tu match"]
                      : ["Ref", "Name", "Price", "Beds", "Baths", "m²", "Available", "Your match"]
                    ).map((h) => (
                      <TableHead key={h} className="text-xs font-bold whitespace-nowrap">{h}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-bold text-xs">{properties[0].ref.toUpperCase()}</TableCell>
                    <TableCell className="font-semibold text-sm whitespace-nowrap">{properties[0].name}</TableCell>
                    <TableCell className="text-sm font-bold text-green-600">{properties[0].price}</TableCell>
                    <TableCell className="text-sm">{properties[0].beds}</TableCell>
                    <TableCell className="text-sm">{properties[0].baths}</TableCell>
                    <TableCell className="text-sm">{properties[0].size}</TableCell>
                    <TableCell className="text-xs">{properties[0].available[lang]}</TableCell>
                    <TableCell className="font-bold text-base">{properties[0].rating}/5 ✓</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={8} className="p-0">
                      <div className="relative">
                        <div className="filter blur-sm pointer-events-none select-none">
                          {properties.slice(1).map((p) => (
                            <div key={p.id} className="flex justify-between px-4 py-3 border-t text-sm" style={{ borderColor: "hsl(212 26% 90%)" }}>
                              <span>{p.ref.toUpperCase()}</span>
                              <span>{p.name}</span>
                              <span>{p.price}</span>
                              <span>{p.beds}</span>
                              <span>{p.baths}</span>
                              <span>{p.size}</span>
                              <span>{p.available[lang]}</span>
                              <span>{p.rating}/5</span>
                            </div>
                          ))}
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="flex items-center gap-2 text-sm font-medium" style={{ color: "hsl(215 19% 55%)" }}>
                            <Lock className="w-4 h-4" />
                            <span>{t(lang, "5-7 propiedades más en el reporte completo", "5-7 more properties in full report")}</span>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </section>

        {/* RECOMMENDATION (BLURRED) */}
        <section className="py-16 px-4 md:px-8 max-w-5xl mx-auto" ref={recoFade.ref}>
          <div className={recoFade.className}>
            <div className="relative">
              <div className="filter blur-sm pointer-events-none select-none">
                <Card className="border-0 overflow-hidden" style={{ background: "linear-gradient(135deg, hsl(142 71% 45%), hsl(142 71% 38%))", borderRadius: 16 }}>
                  <CardContent className="p-8 text-white space-y-4">
                    <h2 className="text-2xl font-bold text-white">🥇 {t(lang, "MI RECOMENDACIÓN SARAH", "MY RECOMMENDATION SARAH")}</h2>
                    <p className="text-lg font-semibold text-white">Villa Patricia (pa223)</p>
                    <p className="text-lg font-semibold text-white">€900/{t(lang, "mes", "month")} · {t(lang, "2 dormitorios · 2 baños", "2 bedrooms · 2 bathrooms")}</p>
                    <div className="text-sm leading-relaxed text-white/90 space-y-2">
                      <p><strong>{t(lang, "POR QUÉ ES TU ÚNICA OPCIÓN REALISTA:", "WHY IT'S YOUR ONLY REALISTIC OPTION:")}</strong></p>
                      <p>✅ €900/{t(lang, "mes = DENTRO de tu presupuesto", "month = WITHIN your budget")}</p>
                      <p>✅ {t(lang, "2 dormitorios = cumple tu mínimo", "2 bedrooms = Meets your minimum")}</p>
                      <p>✅ {t(lang, "Mascotas permitidas", "Pets allowed")} ✅</p>
                      <p>✅ {t(lang, "2 baños completos", "2 full bathrooms")}</p>
                      <p>✅ {t(lang, "Jardín incluido", "Garden included")}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="text-center p-6">
                  <Lock className="w-10 h-10 mx-auto mb-3" style={{ color: "hsl(213 56% 23%)" }} />
                  <h3 className="text-xl font-bold mb-2" style={{ color: "hsl(213 56% 23%)" }}>
                    {t(lang, "Recomendación profesional", "Professional Recommendation")}
                  </h3>
                  <p className="text-sm mb-1" style={{ color: "hsl(215 19% 34%)" }}>
                    {t(lang, "Según tus necesidades y prioridades, analizo todas las propiedades y te recomiendo la mejor opción para TI", "Based on your specific needs and priorities, I analyze all properties and recommend the best match for YOU")}
                  </p>
                  <p className="text-xs font-medium" style={{ color: "hsl(215 19% 55%)" }}>
                    {t(lang, "Incluida en el reporte personalizado completo", "Included in full personalized report")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* FOOTER */}
      <footer className="py-12 px-4 text-center text-white" style={{ background: "hsl(213 56% 23%)" }}>
        <img src="/propaxar-vision.png" alt="Propaxar" className="h-8 mx-auto mb-6 brightness-200" />
        <p className="text-xl font-bold mb-1 text-white">PROPAXAR</p>
        <p className="text-sm text-white/70 mb-4">{t(lang, "Tu experto local en Frigiliana", "Your Local Expert in Frigiliana")}</p>
        <p className="text-base font-semibold mb-1 text-white">Manuel Fernandez</p>
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
        <p className="text-sm text-white/70">www.propaxar.es</p>
        <p className="text-xs text-white/50 mt-2">📍 {t(lang, "Sirviendo a Frigiliana y la Axarquía desde 2020", "Serving Frigiliana & Axarquía since 2020")}</p>
        <div className="mt-6 pt-4 border-t border-white/20 text-xs text-white/50">
          <p>© 2026 Propaxar</p>
        </div>
      </footer>

    </>
  );
}
