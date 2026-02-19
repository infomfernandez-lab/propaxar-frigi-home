import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronDown, ChevronUp, MapPin, Check, AlertTriangle, Star, ExternalLink, MessageCircle, Mail, Download, Search, Target, Award, Package, Trash2, Droplets, TrendingUp, X, ChevronLeft, ChevronRight } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import heroImg from "@/assets/frigiliana-street.jpg";

const WHATSAPP_LINK = "https://wa.me/34662317561?text=Hello%20Manuel%2C%20I%20would%20like%20to%20arrange%20a%20visit%20for%20Villa%20Patricia.%20When%20would%20it%20be%20possible%3F";
const EMAIL_LINK = "mailto:info@propaxar.com?subject=Report%20Inquiry%20-%20Katinka";

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

// ─── PROPERTIES DATA (EN) ───
const properties = [
  {
    id: 1,
    ref: "pa223",
    name: "Villa Patricia",
    price: "€900/month",
    beds: 2,
    baths: 2,
    size: "90m²",
    rating: 5,
    badge: "✅ WITHIN BUDGET",
    badgeColor: "hsl(142 71% 45%)",
    available: "April 1, 2026",
    summary: "ONLY option in your €700-1,000 budget. Quiet house north area, south-facing, large outdoors + garden. Save €8,400/year vs others.",
    photos: [
      "https://propaxar.com/wp-content/uploads/2026/01/IMG_4099-scaled.jpg",
      "https://propaxar.com/wp-content/uploads/2026/01/IMG_4202-scaled.jpg",
      "https://propaxar.com/wp-content/uploads/2026/01/IMG_4178-scaled.jpg",
      "https://propaxar.com/wp-content/uploads/2026/01/IMG_4127-scaled.jpg",
      "https://propaxar.com/wp-content/uploads/2026/01/IMG_4108-scaled.jpg",
      "https://propaxar.com/wp-content/uploads/2026/01/IMG_4105-scaled.jpg",
    ],
    location: { address: "Villa Patricia, Diseminado - Frigiliana Norte", lat: 36.7892, lng: -3.8956 },
    pros: [
      "EXCELLENT PRICE - €900 (€700 less than other options)",
      "Very quiet location - few neighbours",
      "South-facing - lots of natural light",
      "Large outdoor areas with different zones",
      "Garden included",
      "2 full bathrooms",
      "No neighbours behind or to the sides - total privacy",
      "Pets allowed ✅",
    ],
    cons: [
      "Only 2 bedrooms (you said minimum 2, so OK)",
      "Access via 300m unpaved agricultural lane",
      "North area - slightly far from centre (11 min by car)",
      "Available April only (one month away)",
    ],
    analysis: {
      quality: { stars: 3, text: "Solid house built early 2000s. Well maintained. Good structure, no major issues." },
      price: { stars: 5, label: "EXCELLENT", text: "€900 is fair. Similar north zone: €900-1,300.\nSavings: €8,400/year vs €1,600 options.\nNegotiation potential: Moderate (5%). Could reach €850." },
      location: { stars: 3, label: "GOOD", text: "Very quiet area. Main road access 3 min.\nSlightly far from centre but compensated by price/tranquillity." },
    },
    tests: [
      { label: "Internet", status: "ok", detail: "WiMax 60MB", note: "Installed - Starlink 300MB optional" },
      { label: "Mobile signal", status: "ok", detail: "Good coverage", note: "3-4 bars" },
      { label: "Daytime noise", status: "ok", detail: "Very quiet", note: "Total isolation" },
      { label: "Night noise", status: "ok", detail: "Absolute silence", note: "Very peaceful area" },
      { label: "Natural light", status: "ok", detail: "Excellent", note: "Perfect south orientation" },
      { label: "Water", status: "ok", detail: "Good pressure", note: "Agricultural water, no issues" },
    ],
    insider: {
      owner: "Serious person. Previous tenants always happy.",
      history: "Currently rented until March 31, 2026. Available April 1. Never any incidents.",
      neighbors: "Quiet area, few neighbours. None behind or to the sides. Total privacy.",
    },
    lifestyle: {
      fits: [
        "€700-1,000 budget IS YOUR PRIORITY (only option)",
        "Couple or single person (2 beds sufficient)",
        "Value tranquillity/nature over location",
        "Want a garden to grow your own vegetables",
        "Have a car (area is slightly remote)",
      ],
      notFits: [
        "Need 3+ bedrooms mandatory",
        "Prioritise being close to the town centre",
        "No car (remote area)",
        "Need to move in before April",
      ],
    },
    listingUrl: "https://propaxar.com/property/villa-en-frigiliana-7",
    driveUrl: "https://drive.google.com/drive/folders/19AFahLBxd8K2Iz2TgKcKohYhADeThRSk",
    mapsUrl: "https://maps.app.goo.gl/g4oRBUCks5tGepKQ7",
    parking: "✅",
    internet: "60MB",
    noise: "Very low",
  },
  {
    id: 2,
    ref: "pa194",
    name: "Casa Zambra",
    price: "€1,600/month",
    beds: 3,
    baths: 2,
    size: "100m²",
    rating: 4,
    badge: "⚠ OVER BUDGET",
    badgeColor: "hsl(39 76% 61%)",
    available: "March 1, 2026",
    summary: "Premium area. Spectacular 360° views, perfect access. BUT €1,600/month = 60% more than your budget.",
    photos: [
      "https://propaxar.com/wp-content/uploads/2025/09/3843121-14b2d3a1.jpg",
      "https://propaxar.com/wp-content/uploads/2025/09/3843121-05a32812.jpg",
      "https://propaxar.com/wp-content/uploads/2025/09/3843121-524b50d1.jpg",
      "https://propaxar.com/wp-content/uploads/2025/09/3843121-c46b8798.jpg",
      "https://propaxar.com/wp-content/uploads/2025/09/3843121-58d0de97.jpg",
      "https://propaxar.com/wp-content/uploads/2025/09/3843121-e0cd04a0.jpg",
    ],
    location: { address: "Camino de la Cruz - Frigiliana West", lat: 36.7923, lng: -3.8934 },
    pros: [
      "Perfect location - most sought-after area in Frigiliana",
      "Spectacular 360° views: sea, countryside, mountains and town",
      "South-facing - natural light all day",
      "3 bedrooms + 2 bathrooms",
      "Excellent build quality",
      "Pets allowed ✅",
    ],
    cons: [
      "PRICE: €1,600/month = €600 OVER your budget",
      "WiMax 60MB internet - no fibre",
    ],
    analysis: {
      quality: { stars: 5, text: "Rustic style construction, very well maintained. Owners take immaculate care of the property." },
      price: { stars: 4, label: "FAIR", text: "€1,600 correct for premium area. BUT 60% more expensive than your maximum budget." },
      location: { stars: 5, label: "EXCELLENT", text: "Best countryside area in Frigiliana. Constantly high demand." },
    },
    tests: [
      { label: "Internet", status: "ok", detail: "WiMax 60MB", note: "Starlink 300MB optional €70/month" },
      { label: "Mobile signal", status: "ok", detail: "Perfect coverage", note: "4-5 bars" },
      { label: "Daytime noise", status: "ok", detail: "Low", note: "Quiet area" },
      { label: "Night noise", status: "ok", detail: "Silent", note: "No noise" },
      { label: "Natural light", status: "ok", detail: "Excellent", note: "South-facing" },
      { label: "Water", status: "ok", detail: "Good pressure", note: "No cuts" },
    ],
    insider: {
      owner: "Very attentive, always responds same day.",
      history: "Rented long-term in recent years. Always well maintained. No incidents.",
      neighbors: "Quiet neighbours. Never any incidents. Pleasant atmosphere.",
    },
    lifestyle: {
      fits: [
        "CAN INCREASE budget to €1,600/month",
        "Value premium location over price",
        "Need 3 bedrooms",
      ],
      notFits: [
        "Maximum budget €1,000/month (€600 difference)",
        "Prioritise saving over location",
      ],
    },
    listingUrl: "https://propaxar.com/property/villa-en-frigiliana-6",
    driveUrl: "https://drive.google.com/drive/folders/1XhEL6ay8jYCKPzayFkCQGvrAjU-0JRA1",
    mapsUrl: "https://maps.app.goo.gl/auk6udptJve6LfHf7",
    parking: "✅",
    internet: "60MB",
    noise: "Low",
  },
  {
    id: 3,
    ref: "pa220",
    name: "Casa Fabi",
    price: "€1,600/month",
    beds: 3,
    baths: 2,
    size: "120m²",
    rating: 4,
    badge: "⚠ OVER BUDGET",
    badgeColor: "hsl(39 76% 61%)",
    available: "February 1, 2026 (NOW)",
    summary: "Large house 120m², available NOW. BUT €1,600/month = 60% more than budget.",
    photos: [
      "https://propaxar.com/wp-content/uploads/2025/09/IMG_8023-scaled.jpeg",
      "https://propaxar.com/wp-content/uploads/2025/09/IMG_8012-1-scaled.jpeg",
      "https://propaxar.com/wp-content/uploads/2025/09/IMG_8028-1-scaled.jpeg",
      "https://propaxar.com/wp-content/uploads/2025/09/IMG_8030-1-scaled.jpeg",
      "https://propaxar.com/wp-content/uploads/2025/09/IMG_8027-1-scaled.jpeg",
      "https://propaxar.com/wp-content/uploads/2025/09/IMG_8031-1-scaled.jpeg",
    ],
    location: { address: "Camino de la Cruz - Frigiliana East", lat: 36.7901, lng: -3.8967 },
    pros: [
      "Available NOW (February 1) - before others",
      "Largest house - 120m²",
      "Clear views of Mediterranean + countryside",
      "Pets allowed ✅",
    ],
    cons: [
      "PRICE: €1,600/month = €600 OVER budget",
      "Staircase access (not ground floor)",
    ],
    analysis: {
      quality: { stars: 3, text: "Good quality construction. Correct interior maintenance." },
      price: { stars: 3, label: "SLIGHTLY HIGH", text: "€1,600 above average. BUT 60% more than your budget." },
      location: { stars: 4, label: "VERY GOOD", text: "High-demand area. Good access." },
    },
    tests: [
      { label: "Internet", status: "ok", detail: "WiMax 60MB", note: "Installed" },
      { label: "Mobile signal", status: "ok", detail: "Perfect coverage", note: "4-5 bars" },
      { label: "Daytime noise", status: "ok", detail: "Moderate", note: "Occasional traffic" },
      { label: "Night noise", status: "ok", detail: "Silent", note: "Quiet" },
      { label: "Natural light", status: "ok", detail: "Very good", note: "Correct" },
      { label: "Water", status: "ok", detail: "Correct pressure", note: "Reliable" },
    ],
    insider: {
      owner: "Serious older man, very attentive. Formal in everything. Never any problems.",
      history: "Always rented long-stay. Regular maintenance.",
      neighbors: "Neighbours nearby but not adjacent. Never any incidents.",
    },
    lifestyle: {
      fits: [
        "CAN INCREASE budget to €1,600/month",
        "Need space (120m²)",
        "Want to move in NOW (available Feb)",
      ],
      notFits: [
        "Maximum budget €1,000/month",
        "Reduced mobility (has stairs)",
      ],
    },
    listingUrl: "https://propaxar.com/property/villa-en-frigiliana-4/",
    driveUrl: "#",
    mapsUrl: "https://maps.app.goo.gl/E9DtJsReNg4RqBqq8",
    parking: "✅",
    internet: "60MB",
    noise: "Moderate",
  },
  {
    id: 4,
    ref: "pa224",
    name: "Casa Loma Cruz",
    price: "€1,600/month",
    beds: 2,
    baths: 1,
    size: "75m²",
    rating: 3,
    badge: "⚠ OVER BUDGET",
    badgeColor: "hsl(39 76% 61%)",
    available: "March 1, 2026",
    summary: "Premium Loma Cruz. Well maintained. BUT €1,600/month = 60% more + small (75m²) + only 1 bath.",
    photos: [
      "https://propaxar.com/wp-content/uploads/2026/02/IMG_7565-scaled.jpg",
      "https://propaxar.com/wp-content/uploads/2026/02/IMG_7652-scaled.jpg",
      "https://propaxar.com/wp-content/uploads/2026/02/IMG_7649-scaled.jpg",
      "https://propaxar.com/wp-content/uploads/2026/02/IMG_7645-scaled.jpg",
      "https://propaxar.com/wp-content/uploads/2026/02/IMG_7641-scaled.jpg",
      "https://propaxar.com/wp-content/uploads/2026/02/IMG_7637-scaled.jpg",
    ],
    location: { address: "Camino de la Cruz - Loma de la Cruz", lat: 36.7915, lng: -3.8945 },
    pros: [
      "Solid construction, very well maintained",
      "Own parking",
      "Premium Loma Cruz area",
      "Pets allowed ✅",
    ],
    cons: [
      "PRICE: €1,600/month = €600 OVER budget",
      "Only 75m² - small",
      "Only 1 bathroom",
      "High price for the size",
    ],
    analysis: {
      quality: { stars: 4, text: "Solid construction. Owner takes great care. Recent renovations." },
      price: { stars: 2, label: "HIGH", text: "€1,600 high for 75m². MUCH more than your budget." },
      location: { stars: 4, label: "EXCELLENT", text: "Loma Cruz - best area. High demand." },
    },
    tests: [
      { label: "Internet", status: "ok", detail: "WiMax 60MB", note: "Starlink optional" },
      { label: "Mobile signal", status: "ok", detail: "Good coverage", note: "4 bars" },
      { label: "Daytime noise", status: "ok", detail: "Silent", note: "No noise" },
      { label: "Night noise", status: "ok", detail: "Very silent", note: "Totally quiet" },
      { label: "Natural light", status: "ok", detail: "Good afternoon", note: "Midday-afternoon sun" },
      { label: "Water", status: "ok", detail: "Good pressure", note: "Reliable" },
    ],
    insider: {
      owner: "Serious and communicative person. Responds quickly. Takes great care of her property.",
      history: "Always rented by the year. Recently painted. New windows. Immaculate.",
      neighbors: "Neighbours close but high privacy. No noise. No incidents.",
    },
    lifestyle: {
      fits: [
        "CAN INCREASE budget to €1,600/month",
        "Only 2 people (sufficient space)",
        "Value quality over price",
      ],
      notFits: [
        "Maximum budget €1,000/month",
        "Family of 3-4 people (small + 1 bath)",
        "Need large space",
      ],
    },
    listingUrl: "https://propaxar.com/property/villa-en-frigiliana-8/",
    driveUrl: "https://drive.google.com/drive/folders/1-aYgULtFXuoSE8vj88io7lh2kOJj_LNV",
    mapsUrl: "https://maps.app.goo.gl/AgtDYV1cYkDpbDRt8",
    parking: "✅",
    internet: "60MB",
    noise: "Very low",
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
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "unset";
    };
  }, []);

  if (!currentSrc) return null;

  return (
    <div
      style={{ position: "fixed", inset: 0, zIndex: 99999, backgroundColor: "black" }}
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        style={{
          position: "fixed", top: 12, right: 12, zIndex: 100000,
          backgroundColor: "white", color: "black", border: "none",
          borderRadius: "50%", width: 50, height: 50,
          fontSize: 28, fontWeight: "bold", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 2px 12px rgba(0,0,0,0.5)"
        }}
        aria-label="Close"
      >
        ×
      </button>

      {/* Prev button */}
      {safeImages.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); prev(); }}
          style={{
            position: "fixed", left: 12, top: "50%", transform: "translateY(-50%)",
            zIndex: 100000, backgroundColor: "white", color: "black", border: "none",
            borderRadius: "50%", width: 50, height: 50,
            fontSize: 24, fontWeight: "bold", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 2px 12px rgba(0,0,0,0.5)"
          }}
          aria-label="Previous"
        >
          ←
        </button>
      )}

      {/* Image */}
      <div
        style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: "70px 60px" }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          key={currentSrc}
          src={currentSrc}
          alt={`Photo ${idx + 1}`}
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
          style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", display: "block" }}
          onError={(e) => {
            console.error("Lightbox image failed to load:", currentSrc);
            (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23333" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" fill="%23999" font-size="16"%3EImage unavailable%3C/text%3E%3C/svg%3E';
          }}
          onLoad={() => console.log("Lightbox image loaded OK:", currentSrc)}
        />
      </div>

      {/* Next button */}
      {safeImages.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); next(); }}
          style={{
            position: "fixed", right: 12, top: "50%", transform: "translateY(-50%)",
            zIndex: 100000, backgroundColor: "white", color: "black", border: "none",
            borderRadius: "50%", width: 50, height: 50,
            fontSize: 24, fontWeight: "bold", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 2px 12px rgba(0,0,0,0.5)"
          }}
          aria-label="Next"
        >
          →
        </button>
      )}

      {/* Counter */}
      {safeImages.length > 1 && (
        <div
          style={{
            position: "fixed", bottom: 16, left: "50%", transform: "translateX(-50%)",
            backgroundColor: "white", color: "black", borderRadius: 999,
            padding: "6px 16px", fontWeight: "bold", fontSize: 14,
            boxShadow: "0 2px 8px rgba(0,0,0,0.4)"
          }}
        >
          {idx + 1} / {safeImages.length}
        </div>
      )}
    </div>
  );
}

// ─── Property Card ───
function PropertyCard({ p }: { p: typeof properties[0] }) {
  const [open, setOpen] = useState(false);
  const [lightbox, setLightbox] = useState<{ open: boolean; index: number }>({ open: false, index: 0 });
  const fade = useFadeIn();

  return (
    <div ref={fade.ref} className={fade.className}>
      {lightbox.open && (
        <Lightbox images={p.photos} initialIndex={lightbox.index} onClose={() => setLightbox({ open: false, index: 0 })} />
      )}

      <Card className="overflow-hidden border-0" style={{ boxShadow: "0 4px 24px hsl(0 0% 0%/0.08)", borderRadius: 12 }}>
        {/* Thumbnail */}
        <div
          className="relative h-52 bg-gray-200 overflow-hidden cursor-pointer"
          onClick={() => setLightbox({ open: true, index: 0 })}
        >
          <img src={p.photos[0]} alt={p.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" loading="lazy" />
          {p.badge && (
            <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white" style={{ background: p.badgeColor }}>
              {p.badge}
            </span>
          )}
          <span className="absolute top-3 right-3 px-2 py-1 rounded text-xs font-bold text-white bg-black/50">
            {p.ref.toUpperCase()}
          </span>
          <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
            📷 {p.photos.length} photos
          </div>
        </div>

        <CardContent className="p-5 space-y-3">
          <h3 className="text-lg font-bold" style={{ color: "hsl(213 56% 23%)" }}>{p.name}</h3>
          <p className="text-sm" style={{ color: "hsl(215 19% 34%)" }}>{p.price} · {p.beds} beds · {p.baths} baths · {p.size}</p>
          <div className="flex items-center gap-2">
            <Stars count={p.rating} />
            <span className="text-sm font-medium">For your profile: {p.rating}/5</span>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: "hsl(215 19% 34%)" }}>"{p.summary}"</p>
          <div className="flex gap-2 text-xs text-gray-500">
            <span>📅 {p.available}</span>
            <span>·</span>
            <span>🐾 Pets: Yes</span>
          </div>
          <Button
            className="w-full mt-2 font-semibold"
            style={{ background: "hsl(213 56% 23%)", color: "#fff", borderRadius: 8 }}
            onClick={() => setOpen(!open)}
          >
            {open ? "CLOSE ANALYSIS" : "VIEW FULL ANALYSIS"}
            {open ? <ChevronUp className="ml-2 w-4 h-4" /> : <ChevronDown className="ml-2 w-4 h-4" />}
          </Button>
        </CardContent>

        {/* ─── Expanded ─── */}
        {open && (
          <div className="border-t px-5 pb-6 space-y-6 animate-fade-in">
            {/* Photo gallery with lightbox */}
            <div className="pt-4">
              <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: "hsl(215 19% 34%)" }}>Click to enlarge</p>
              <div className="grid grid-cols-3 gap-2">
                {p.photos.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`Photo ${i + 1}`}
                    className="rounded-lg w-full h-24 object-cover cursor-pointer hover:opacity-80 hover:scale-105 transition-all duration-200"
                    loading="lazy"
                    onClick={() => setLightbox({ open: true, index: i })}
                  />
                ))}
              </div>
            </div>

            {/* Location / Map */}
            <div>
              <h4 className="font-bold flex items-center gap-2 mb-2" style={{ color: "hsl(213 56% 23%)" }}>
                <MapPin className="w-4 h-4" /> LOCATION
              </h4>
              <p className="text-sm mb-2">{p.location.address}</p>
              <a
                href={p.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-lg overflow-hidden h-48 bg-gray-100 relative group cursor-pointer"
                title="Open in Google Maps"
              >
                <iframe
                  title={`Map ${p.name}`}
                  width="100%"
                  height="100%"
                  style={{ border: 0, pointerEvents: "none" }}
                  loading="lazy"
                  src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${p.location.lat},${p.location.lng}&zoom=16`}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 px-4 py-2 rounded-full text-xs font-semibold shadow flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> 📍 Open in Google Maps
                  </span>
                </div>
              </a>
            </div>

            {/* Pros */}
            <div>
              <h4 className="font-bold flex items-center gap-2 mb-2" style={{ color: "hsl(142 71% 45%)" }}>
                <Check className="w-4 h-4" /> ADVANTAGES
              </h4>
              <ul className="space-y-1">
                {p.pros.map((t, i) => <li key={i} className="text-sm flex items-start gap-2"><Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "hsl(142 71% 45%)" }} />{t}</li>)}
              </ul>
            </div>

            {/* Cons */}
            <div>
              <h4 className="font-bold flex items-center gap-2 mb-2 text-amber-600">
                <AlertTriangle className="w-4 h-4" /> CONSIDERATIONS
              </h4>
              <ul className="space-y-1">
                {p.cons.map((t, i) => <li key={i} className="text-sm flex items-start gap-2"><AlertTriangle className="w-4 h-4 mt-0.5 shrink-0 text-amber-500" />{t}</li>)}
              </ul>
            </div>

            {/* Analysis tabs */}
            <div>
              <h4 className="font-bold mb-3" style={{ color: "hsl(213 56% 23%)" }}>📊 MY PROFESSIONAL ANALYSIS</h4>
              <Tabs defaultValue="quality">
                <TabsList className="w-full">
                  <TabsTrigger value="quality" className="flex-1 text-xs">QUALITY</TabsTrigger>
                  <TabsTrigger value="price" className="flex-1 text-xs">PRICE</TabsTrigger>
                  <TabsTrigger value="location" className="flex-1 text-xs">LOCATION</TabsTrigger>
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
              <h4 className="font-bold mb-3" style={{ color: "hsl(213 56% 23%)" }}>📡 ON-SITE TESTS PERFORMED</h4>
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

            {/* Insider */}
            <div>
              <h4 className="font-bold mb-3" style={{ color: "hsl(213 56% 23%)" }}>👤 INSIDER INFORMATION</h4>
              {([["OWNER", p.insider.owner], ["HISTORY", p.insider.history], ["NEIGHBOURS", p.insider.neighbors]] as const).map(([label, text]) => (
                <div key={label} className="mb-3">
                  <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: "hsl(215 19% 34%)" }}>{label}:</p>
                  <p className="text-sm" style={{ color: "hsl(215 19% 34%)" }}>{text}</p>
                </div>
              ))}
            </div>

            {/* Lifestyle fit */}
            <div>
              <h4 className="font-bold mb-3" style={{ color: "hsl(213 56% 23%)" }}>🌍 IT FITS YOU IF...</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-bold mb-2" style={{ color: "hsl(142 71% 45%)" }}>✅ FITS YOU IF:</p>
                  {p.lifestyle.fits.map((t, i) => <p key={i} className="text-sm">• {t}</p>)}
                </div>
                <div>
                  <p className="text-sm font-bold mb-2 text-red-600">❌ DOESN'T FIT IF:</p>
                  {p.lifestyle.notFits.map((t, i) => <p key={i} className="text-sm">• {t}</p>)}
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="flex-1">
                <Button className="w-full font-semibold" style={{ background: "hsl(142 71% 45%)", color: "#fff", borderRadius: 8 }}>
                  <MessageCircle className="w-4 h-4 mr-2" /> I WANT TO VISIT {p.name.toUpperCase()}
                </Button>
              </a>
              <a href={p.listingUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                <Button variant="outline" className="w-full font-semibold" style={{ borderRadius: 8 }}>
                  <ExternalLink className="w-4 h-4 mr-2" /> View on propaxar.com
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
export default function ReporteKatinkaEN() {
  const contentRef = useRef<HTMLDivElement>(null);
  const heroFade = useFadeIn();
  const summaryFade = useFadeIn();
  const marketFade = useFadeIn();
  const propsFade = useFadeIn();
  const logisticsFade = useFadeIn();
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
      filename: `Propaxar_Report_Katinka_${new Date().toISOString().slice(0, 10)}.pdf`,
      image: { type: "jpeg", quality: 0.95 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    }).from(el).save();
    el.querySelectorAll("[data-no-print]").forEach((n) => (n as HTMLElement).style.display = "");
  };

  const validUntil = new Date();
  validUntil.setMonth(validUntil.getMonth() + 6);
  const validStr = validUntil.toLocaleDateString("en-GB", { month: "long", year: "numeric" });

  return (
    <>
      {/* SEO: noindex for private client report */}
      <meta name="robots" content="noindex, nofollow" />

      {/* ─── 1. HERO ─── */}
      <section className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden">
        <img src={heroImg} alt="Frigiliana" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/55" />
        <div ref={heroFade.ref} className={`relative z-10 px-6 max-w-xl ${heroFade.className}`}>
          <img src="/propaxar-vision.png" alt="Propaxar" className="h-10 mx-auto mb-6 opacity-90" />
          <h1 className="text-4xl md:text-6xl font-bold leading-tight text-white mb-3">
            PERSONALISED<br />PROPERTY REPORT
          </h1>
          <p className="text-2xl md:text-3xl font-medium mt-5 text-white/90">Katinka</p>
          <p className="text-lg md:text-xl text-white/70 mt-1">Frigiliana · February 2026</p>
          <p className="text-base mt-6 text-white/60">Prepared by Manuel Fernández<br />Property Analyst</p>
          <ChevronDown className="mx-auto mt-10 w-8 h-8 animate-bounce text-white/60" />
        </div>
      </section>

      <div ref={contentRef}>

        {/* ─── LAST UPDATED BADGE ─── */}
        <div className="flex justify-center py-6 px-4">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border" style={{ background: "hsl(213 56% 23%/0.06)", borderColor: "hsl(213 56% 23%/0.2)", color: "hsl(213 56% 23%)" }}>
            📅 Last Updated: February 18, 2026 <span className="text-xs font-normal opacity-70">(Week 1 of 24)</span>
          </div>
        </div>

        {/* ─── 2. YOUR SEARCH SUMMARY ─── */}
        <section className="py-12 px-4 md:px-8 max-w-5xl mx-auto" ref={summaryFade.ref}>
          <div className={summaryFade.className}>
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10" style={{ color: "hsl(213 56% 23%)" }}>Your Search Summary</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: <Search className="w-7 h-7" />,
                  title: "SEARCH",
                  items: ["47 properties on market", "4 selected", "ONLY 1 within budget"],
                },
                {
                  icon: <Target className="w-7 h-7" />,
                  title: "YOUR PROFILE",
                  items: ["Budget: €700-1,000/month", "Bedrooms: 2+", "Pets: Yes", "Move-in: April 1, 2026"],
                },
                {
                  icon: <Award className="w-7 h-7" />,
                  title: "MY RECOMMENDATION",
                  items: ["ONLY option: Villa Patricia", "€900/month · 2 bedrooms", "Rest over budget"],
                },
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

        {/* ─── 3. MARKET REALITY ─── */}
        <section className="py-16 px-4 md:px-8 max-w-5xl mx-auto" style={{ background: "hsl(210 20% 98%)" }} ref={marketFade.ref}>
          <div className={marketFade.className}>
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10" style={{ color: "hsl(213 56% 23%)" }}>Market Reality - February 2026</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-0" style={{ boxShadow: "0 4px 20px hsl(0 0% 0%/0.07)", borderRadius: 12 }}>
                <CardContent className="p-6">
                  <h3 className="font-bold mb-4" style={{ color: "hsl(213 56% 23%)" }}>Average Prices Frigiliana</h3>
                  {[["2 beds basic", "€1,200/month"], ["2 beds + pool", "€1,400/month"], ["3 beds premium area", "€1,600/month"]].map(([k, v]) => (
                    <div key={k} className="flex justify-between py-2 border-b last:border-0 text-sm">
                      <span>{k}</span><span className="font-semibold">{v}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
              <Card className="border-0" style={{ boxShadow: "0 4px 20px hsl(0 0% 0%/0.07)", borderRadius: 12 }}>
                <CardContent className="p-6">
                  <h3 className="font-bold mb-4" style={{ color: "hsl(213 56% 23%)" }}>My analysis for you</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "hsl(215 19% 34%)" }}>
                    <strong>IMPORTANT Katinka:</strong> Frigiliana countryside market has few options €700-1,000. Most are €1,200-1,600.
                    Villa Patricia is a <strong>RARE opportunity</strong> in your range - you won't see many like this.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* ─── 4. PROPERTIES ANALYZED ─── */}
        <section className="py-16 px-4 md:px-8 max-w-5xl mx-auto" ref={propsFade.ref}>
          <div className={propsFade.className}>
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-2" style={{ color: "hsl(213 56% 23%)" }}>4 Properties Analyzed</h2>
            <p className="text-center text-sm mb-10" style={{ color: "hsl(215 19% 34%)" }}>
              ✅ 1 within budget · ⚠ 3 over budget (€1,600/month)
            </p>
            <div className="grid grid-cols-1 gap-6">
              {properties.map((p) => <PropertyCard key={p.id} p={p} />)}
            </div>
          </div>
        </section>

        {/* ─── 5. COUNTRY VS TOWN LOGISTICS ─── */}
        <section className="py-16 px-4 md:px-8 max-w-5xl mx-auto" ref={logisticsFade.ref}>
          <div className={logisticsFade.className}>
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-1" style={{ color: "hsl(213 56% 23%)" }}>
              Country vs Town Living Logistics
            </h2>
            <p className="text-center text-sm mb-10" style={{ color: "hsl(215 19% 34%)" }}>The Insider's Truth</p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {[
                {
                  icon: <Package className="w-7 h-7" />,
                  title: "Package Delivery and Amazon",
                  countryside: "There is no door-to-door delivery in rural Frigiliana areas. We'll help you register at a local Parcel Point so you can receive your purchases without problems.",
                  town: "Each home has its own address with door-to-door delivery. You can also use a Parcel Point if you prefer.",
                },
                {
                  icon: <Trash2 className="w-7 h-7" />,
                  title: "Waste Collection",
                  countryside: "The garbage truck does not access rural lanes. Waste must be deposited at clean points located on the main road. This is the rule to preserve the natural environment.",
                  town: "Collection is done house by house. You must put your garbage outside after 9:30 PM. If you do it earlier, you may be fined.",
                },
                {
                  icon: <Droplets className="w-7 h-7" />,
                  title: "Water",
                  countryside: "Water in rural houses usually comes from community or private wells.",
                  town: "Water comes from the municipal water network, generally managed by the public company Aqualia.",
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
                        <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: "hsl(213 56% 23%)" }}>🌿 IN THE COUNTRYSIDE</p>
                        <p className="text-sm leading-relaxed" style={{ color: "hsl(215 19% 34%)" }}>{c.countryside}</p>
                      </div>
                      <div className="border-t pt-3" style={{ borderColor: "hsl(212 26% 90%)" }}>
                        <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: "hsl(213 56% 40%)" }}>🏘️ IN THE TOWN</p>
                        <p className="text-sm leading-relaxed" style={{ color: "hsl(215 19% 34%)" }}>{c.town}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* ─── 6. MARKET EVOLUTION CHART ─── */}
            <Card className="border-0" style={{ boxShadow: "0 4px 20px hsl(0 0% 0%/0.07)", borderRadius: 12 }}>
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-5 h-5" style={{ color: "hsl(142 71% 45%)" }} />
                  <h3 className="font-bold" style={{ color: "hsl(213 56% 23%)" }}>Market Evolution in Frigiliana</h3>
                </div>
                <p className="text-xs mb-6" style={{ color: "hsl(215 19% 34%)" }}>
                  Average price +6% yearly · Long-term rental availability &lt;1%
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
                      <Tooltip formatter={(value: number) => [`€${value}/month`, "Average price"]} />
                      <Line type="monotone" dataKey="price" stroke="hsl(213 56% 23%)" strokeWidth={2.5} dot={{ fill: "hsl(213 56% 23%)", r: 4 }} activeDot={{ r: 6, fill: "hsl(142 71% 45%)" }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ─── 7. QUICK COMPARISON ─── */}
        <section className="py-16 px-4 md:px-8 max-w-5xl mx-auto" style={{ background: "hsl(210 20% 98%)" }} ref={compFade.ref}>
          <div className={compFade.className}>
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10" style={{ color: "hsl(213 56% 23%)" }}>Quick Comparison</h2>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    {["Ref", "Name", "Price", "Beds", "Baths", "m²", "Available", "Your match"].map((h) => (
                      <TableHead key={h} className="text-xs font-bold whitespace-nowrap">{h}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {properties.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell className="font-bold text-xs">{p.ref.toUpperCase()}</TableCell>
                      <TableCell className="font-semibold text-sm whitespace-nowrap">{p.name}</TableCell>
                      <TableCell className={p.id === 1 ? "text-sm font-bold text-green-600" : "text-sm text-red-600"}>{p.price}</TableCell>
                      <TableCell className="text-sm">{p.beds}</TableCell>
                      <TableCell className="text-sm">{p.baths}</TableCell>
                      <TableCell className="text-sm">{p.size}</TableCell>
                      <TableCell className="text-xs">{p.available}</TableCell>
                      <TableCell className="font-bold text-base">{p.rating}/5 {p.id === 1 ? "✓" : ""}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </section>

        {/* ─── 8. MY RECOMMENDATION ─── */}
        <section className="py-16 px-4 md:px-8 max-w-5xl mx-auto" ref={recoFade.ref}>
          <div className={recoFade.className}>
            <Card className="border-0 overflow-hidden" style={{ background: "linear-gradient(135deg, hsl(142 71% 45%), hsl(142 71% 38%))", borderRadius: 16 }}>
              <CardContent className="p-8 text-white space-y-4">
                <h2 className="text-2xl font-bold text-white">🥇 MY RECOMMENDATION KATINKA</h2>
                <p className="text-lg font-semibold text-white">Villa Patricia (pa223)</p>
                <p className="text-lg font-semibold text-white">€900/month · 2 bedrooms · 2 bathrooms</p>
                <div className="text-sm leading-relaxed text-white/90 space-y-2">
                  <p><strong>WHY IT'S YOUR ONLY REALISTIC OPTION:</strong></p>
                  <p>✅ €900/month = WITHIN your budget (€700-1,000)</p>
                  <p>✅ 2 bedrooms = Meets your minimum</p>
                  <p>✅ Pets allowed ✅</p>
                  <p>✅ 2 full bathrooms (more comfortable)</p>
                  <p>✅ Garden included (unique extra)</p>
                  <p>✅ SAVINGS: €8,400/year vs other options</p>
                  <p className="mt-4"><strong>The other 3 houses are at €1,600/month = €600 more than your max budget.</strong></p>
                  <p>I included them so you see what's on the market, but they're 60% more expensive.</p>
                  <p className="mt-3"><strong>About the other 3:</strong> If you can/want to increase budget to €1,600/month, Casa Zambra (pa194) is excellent option - premium area, 3 beds, spectacular views.</p>
                  <p className="mt-2">💡 Want me to find more €700-1,000 options? I can keep looking, but honestly they're scarce in Frigiliana countryside.</p>
                </div>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" data-no-print>
                  <Button className="mt-4 text-base font-bold px-10 py-5" style={{ background: "#fff", color: "hsl(142 71% 35%)", borderRadius: 10 }}>
                    I WANT TO SEE VILLA PATRICIA
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ─── 9. NEXT STEPS ─── */}
        <section className="py-16 px-4 md:px-8 max-w-5xl mx-auto" style={{ background: "hsl(210 20% 98%)" }} ref={stepsFade.ref}>
          <div className={stepsFade.className}>
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10" style={{ color: "hsl(213 56% 23%)" }}>Next Steps</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { num: "1️⃣", title: "REVIEW REPORT", desc: "Take 1-2 days" },
                { num: "2️⃣", title: "DECIDE BUDGET", desc: "€900 OK or can you do €1,600?" },
                { num: "3️⃣", title: "TEXT ME WHATSAPP", desc: "I'll coordinate Villa Patricia visit" },
                { num: "4️⃣", title: "COME SEE IT", desc: "I'll accompany you personally" },
              ].map((s, i) => (
                <div key={i} className="text-center space-y-2">
                  <div className="text-3xl">{s.num}</div>
                  <h3 className="font-bold text-sm" style={{ color: "hsl(213 56% 23%)" }}>{s.title}</h3>
                  <p className="text-sm" style={{ color: "hsl(215 19% 34%)" }}>{s.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 p-6 rounded-xl text-center" style={{ background: "hsl(39 76% 61%/0.15)", borderRadius: 12 }}>
              <p className="font-bold text-sm" style={{ color: "hsl(213 56% 23%)" }}>💡 IMPORTANT KATINKA</p>
              <p className="text-sm mt-2" style={{ color: "hsl(215 19% 34%)" }}>
                Villa Patricia is RARE on market - few €900 houses with pool + 2 baths. If interested, let me know soon. Available April 1.
              </p>
              <p className="text-sm mt-1" style={{ color: "hsl(215 19% 34%)" }}>
                Report valid <strong>6 MONTHS</strong>. Follow-up included until you find.
              </p>
            </div>
          </div>
        </section>

        {/* ─── PDF DOWNLOAD ─── */}
        <section className="py-16 px-4 md:px-8 max-w-3xl mx-auto text-center" ref={pdfFade.ref} data-no-print>
          <div className={pdfFade.className}>
            <Card className="border-0" style={{ boxShadow: "0 4px 24px hsl(0 0% 0%/0.08)", borderRadius: 16 }}>
              <CardContent className="p-8 space-y-4">
                <Download className="w-10 h-10 mx-auto" style={{ color: "hsl(142 71% 45%)" }} />
                <h2 className="text-xl font-bold" style={{ color: "hsl(213 56% 23%)" }}>DOWNLOAD YOUR REPORT</h2>
                <p className="text-sm" style={{ color: "hsl(215 19% 34%)" }}>Save offline · Print it · Share it</p>
                <Button
                  onClick={handleDownloadPdf}
                  className="text-base font-bold px-10 py-5"
                  style={{ background: "hsl(142 71% 45%)", color: "#fff", borderRadius: 10 }}
                >
                  <Download className="w-5 h-5 mr-2" /> DOWNLOAD PDF
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>

      {/* ─── FOOTER ─── */}
      <footer className="py-12 px-4 text-center text-white" style={{ background: "hsl(213 56% 23%)" }} data-no-print>
        <img src="/propaxar-vision.png" alt="Propaxar" className="h-8 mx-auto mb-6 brightness-200" />
        <p className="text-xl font-bold mb-1 text-white">PROPAXAR</p>
        <p className="text-sm text-white/70 mb-4">Your Local Expert in Frigiliana</p>
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
        <p className="text-xs text-white/50 mt-2">📍 Serving Frigiliana & Axarquía since 2020</p>
        <div className="mt-6 pt-4 border-t border-white/20 text-xs text-white/50">
          <p>© 2026 Propaxar · Report valid until {validStr}</p>
        </div>
      </footer>
    </>
  );
}
