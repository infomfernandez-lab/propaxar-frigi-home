import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { Helmet } from "react-helmet-async";
import { ChevronDown, ChevronUp, MapPin, Check, AlertTriangle, Star, ExternalLink, MessageCircle, Mail, Download, Search, Target, Award, FileText, Globe, CreditCard, Shield, TrendingUp, Package, Trash2, Droplets } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import heroImg from "@/assets/frigiliana-street.jpg";

const WHATSAPP_LINK = "https://wa.me/34662317561?text=Hello%20Manuel%2C%20I%27m%20Nadia%20Horsted.%20I%27d%20like%20to%20arrange%20a%20viewing.";
const EMAIL_LINK = "mailto:info@propaxar.com?subject=Report%20Inquiry%20-%20Nadia%20Horsted";

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

// ─── PROPERTIES DATA ───
const properties = [
  {
    id: 1,
    ref: "pa194",
    name: "Casa Zambra",
    zone: "",
    price: "€1,600/month",
    priceNum: 1600,
    beds: 3,
    baths: 2,
    size: "100m²",
    sizeNum: 100,
    pool: true,
    furnished: true,
    pets: true,
    available: "1 March 2026",
    rank: 1,
    rankLabel: "#1 BEST MATCH",
    rankColor: "hsl(142 71% 45%)",
    badgeExtra: "PROPAXAR DIRECT ✨",
    badgeExtraColor: "hsl(39 76% 61%)",
    driveUrl: "https://drive.google.com/drive/folders/1XhEL6ay8jYCKPzayFkCQGvrAjU-0JRA1",
    listingUrl: "https://propaxar.com/property/villa-en-frigiliana-6",
    photos: [
      "/images/properties/3843121-14b2d3a1.jpg",
      "/images/properties/3843121-05a32812.jpg",
      "/images/properties/3843121-524b50d1.jpg",
      "/images/properties/3843121-c46b8798.jpg",
      "/images/properties/3843121-58d0de97.jpg",
      "/images/properties/3843121-e0cd04a0.jpg",
    ],
    criteria: {
      price: "ok" as const,
      beds: "ok" as const,
      baths: "ok" as const,
      surface: "warn" as const,
      pool: "ok" as const,
      furnished: "ok" as const,
      pets: "ok" as const,
      seaViews: "ok" as const,
      countryViews: "ok" as const,
      parking: "ok" as const,
      solarium: "ok" as const,
      terrace: "ok" as const,
      availableMay: "ok" as const,
    },
    matchCount: 13,
    matchTotal: 16,
    analysis: {
      quality: { stars: 5, label: "EXCELLENT", text: "Rustic-style construction, extremely well maintained. Solid build quality with great wall and roof insulation. Feels warm in winter and cool in summer." },
      location: { stars: 5, label: "EXCELLENT", text: "One of the most sought-after areas in Frigiliana — quick and easy access from Frigiliana village, Nerja and Torrox via multiple routes. High demand zone with limited supply." },
      price: { stars: 4, label: "FAIR", text: "At €1,600/month this is correctly priced for the quality and location. Comparable properties range €1,100–1,500. At the upper end but justified." },
    },
    professionalAnalysis: {
      access: "Car reaches directly beside the house — perfect access. Private parking area for multiple vehicles. No road-sharing issues.",
      water: "Agricultural water supply, good pressure. Reliable service.",
      internet: "WiMAX antenna up to 60Mb currently installed. Starlink possible (up to 300Mb) if you need faster speeds for remote work. Mobile coverage is excellent.",
      neighbourhood: "Very low noise. Adjacent house but very private. A country lane nearby — occasional cars audible but not bothersome. Quiet, tranquil neighbours. No previous incidents.",
      history: "Rented for long-term stays in recent years. Well-managed, regularly maintained. Clean rental track record.",
      owner: "Local Spanish owners, attentive and reliable. Quick to respond if issues arise. Professional and trustworthy.",
    },
    pros: [
      "Perfect access — car right to the door",
      "Minutes from the village centre",
      "South-facing — natural light all day",
      "Spectacular views: sea, mountains, village, countryside",
      "Pleasant and very usable outdoor spaces",
      "Private pool",
    ],
    cons: [
      "Adjacent house (but very private — not an issue in practice)",
      "Surface is 100m² vs your 120m² minimum — worth checking if this works for you as a couple",
      "Country lane nearby — occasional passing cars (minor)",
    ],
  },
  {
    id: 2,
    ref: "pa224",
    name: "Cortijo Los Olivos",
    zone: "",
    price: "€1,600/month",
    priceNum: 1600,
    beds: 3,
    baths: 1,
    size: "75m²",
    sizeNum: 75,
    pool: true,
    furnished: true,
    pets: true,
    available: "1 March 2026",
    rank: 2,
    rankLabel: "#2 GOOD OPTION",
    rankColor: "hsl(213 56% 43%)",
    badgeExtra: "PROPAXAR DIRECT ✨",
    badgeExtraColor: "hsl(39 76% 61%)",
    driveUrl: "https://drive.google.com/drive/folders/1-aYgULtFXuoSE8vj88io7lh2kOJj_LNV",
    listingUrl: "https://propaxar.com/property/villa-en-frigiliana-8/",
    photos: [
      "/images/properties/IMG_7565.jpg",
      "/images/properties/IMG_7652.jpg",
      "/images/properties/IMG_7649.jpg",
      "/images/properties/IMG_7645.jpg",
      "/images/properties/IMG_7641.jpg",
      "/images/properties/IMG_7637.jpg",
    ],
    criteria: {
      price: "ok" as const,
      beds: "ok" as const,
      baths: "fail" as const,
      surface: "fail" as const,
      pool: "ok" as const,
      furnished: "ok" as const,
      pets: "ok" as const,
      seaViews: "ok" as const,
      countryViews: "ok" as const,
      parking: "ok" as const,
      solarium: "ok" as const,
      terrace: "ok" as const,
      availableMay: "ok" as const,
    },
    matchCount: 10,
    matchTotal: 16,
    analysis: {
      quality: { stars: 4, label: "GOOD", text: "Solid construction, very well maintained. Recently painted, new windows installed. Good insulation." },
      location: { stars: 4, label: "GOOD", text: "One of the best rural areas near Frigiliana. High demand zone with great privacy despite neighbouring houses." },
      price: { stars: 2, label: "HIGH", text: "At €1,600/month for 75m² this is slightly overpriced. Similar properties rent for €1,000–1,500. Limited room to negotiate." },
    },
    professionalAnalysis: {
      access: "Private parking, car reaches beside the house, private vehicle entrance.",
      water: "Agricultural water, good pressure.",
      internet: "WiMAX up to 60Mb, Starlink option up to 300Mb. Good mobile coverage.",
      neighbourhood: "Quiet area, no noise, neighbours close but high privacy.",
      history: "Always rented by the year. Recently painted. New windows. Immaculate.",
      owner: "Local Spanish owner, serious and communicative. Responds quickly. Takes great care of her property.",
    },
    pros: [
      "Highly accessible villa",
      "Excellent area",
      "High-quality construction",
      "Good insulation",
    ],
    cons: [
      "Only 1 bathroom (does not meet your 2-bath requirement)",
      "Small surface (75m²)",
      "Price slightly high for the size",
      "Limited negotiation margin",
    ],
  },
  {
    id: 3,
    ref: "pa226",
    name: "Villa Celia",
    zone: "",
    price: "€2,500/month",
    priceNum: 2500,
    beds: 4,
    baths: 2,
    size: "200m²",
    sizeNum: 200,
    pool: true,
    furnished: true,
    pets: true,
    available: "1 March 2026",
    rank: 3,
    rankLabel: "#3 PREMIUM OPTION",
    rankColor: "hsl(271 50% 50%)",
    badgeExtra: "PROPAXAR DIRECT ✨",
    badgeExtraColor: "hsl(39 76% 61%)",
    driveUrl: "",
    listingUrl: "https://propaxar.com/property/villa-en-frigiliana-9/",
    photos: [],
    criteria: {
      price: "fail" as const,
      beds: "ok" as const,
      baths: "ok" as const,
      surface: "ok" as const,
      pool: "ok" as const,
      furnished: "ok" as const,
      pets: "ok" as const,
      seaViews: "ok" as const,
      countryViews: "ok" as const,
      parking: "ok" as const,
      solarium: "ok" as const,
      terrace: "ok" as const,
      availableMay: "ok" as const,
    },
    matchCount: 10,
    matchTotal: 16,
    analysis: {
      quality: { stars: 0, text: "" },
      location: { stars: 0, text: "" },
      price: { stars: 0, text: "" },
    },
    professionalAnalysis: null,
    pros: [
      "Exceptional space — 200m²",
      "4 bedrooms (ideal for home office + guests)",
      "Large garden and vegetable patch",
      "Dry land plot",
      "Premium rural lifestyle",
    ],
    cons: [
      "€500 above your maximum budget",
      "No detailed inspection data yet",
      "Rating pending",
    ],
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

// ─── Status Icon ───
const StatusIcon = ({ status }: { status: "ok" | "warn" | "fail" }) => {
  if (status === "ok") return <span className="text-green-600">✅</span>;
  if (status === "warn") return <span className="text-amber-500">⚠️</span>;
  return <span className="text-red-500">❌</span>;
};

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
      {safeImages.length > 1 && <button onClick={(e) => { e.stopPropagation(); prev(); }} style={{ position: "fixed", left: 12, top: "50%", transform: "translateY(-50%)", zIndex: 100000, backgroundColor: "white", color: "black", border: "none", borderRadius: "50%", width: 50, height: 50, fontSize: 24, fontWeight: "bold", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 12px rgba(0,0,0,0.5)" }} aria-label="Previous">←</button>}
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: "70px 60px" }} onClick={(e) => e.stopPropagation()}>
        <img key={currentSrc} src={currentSrc} alt={`Photo ${idx + 1}`} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", display: "block" }} />
      </div>
      {safeImages.length > 1 && <button onClick={(e) => { e.stopPropagation(); next(); }} style={{ position: "fixed", right: 12, top: "50%", transform: "translateY(-50%)", zIndex: 100000, backgroundColor: "white", color: "black", border: "none", borderRadius: "50%", width: 50, height: 50, fontSize: 24, fontWeight: "bold", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 12px rgba(0,0,0,0.5)" }} aria-label="Next">→</button>}
      {safeImages.length > 1 && <div style={{ position: "fixed", bottom: 16, left: "50%", transform: "translateX(-50%)", backgroundColor: "white", color: "black", borderRadius: 999, padding: "6px 16px", fontWeight: "bold", fontSize: 14, boxShadow: "0 2px 8px rgba(0,0,0,0.4)" }}>{idx + 1} / {safeImages.length}</div>}
    </div>,
    document.body
  );
}

// ─── Property Card ───
function PropertyCard({ p, defaultOpen = false }: { p: typeof properties[0]; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const [lightbox, setLightbox] = useState<{ open: boolean; index: number }>({ open: false, index: 0 });
  const fade = useFadeIn();

  const hasPhotos = p.photos.length > 0;
  const hasAnalysis = p.professionalAnalysis !== null;

  return (
    <div ref={fade.ref} className={fade.className}>
      {lightbox.open && hasPhotos && (
        <Lightbox images={p.photos} initialIndex={lightbox.index} onClose={() => setLightbox({ open: false, index: 0 })} />
      )}

      <Card className="overflow-hidden border-0" style={{ boxShadow: "0 4px 24px hsl(0 0% 0%/0.08)", borderRadius: 12 }}>
        {/* Badges */}
        <div className="flex flex-wrap gap-2 px-5 pt-5">
          <span className="px-3 py-1 rounded-full text-xs font-bold text-white" style={{ background: p.rankColor }}>{p.rankLabel}</span>
          <span className="px-3 py-1 rounded-full text-xs font-bold text-white" style={{ background: p.badgeExtraColor }}>{p.badgeExtra}</span>
        </div>

        {/* Thumbnail */}
        {hasPhotos && (
          <div className="relative h-52 bg-gray-200 overflow-hidden cursor-pointer mx-5 mt-3 rounded-lg" onClick={() => setLightbox({ open: true, index: 0 })}>
            <img src={p.photos[0]} alt={p.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" loading="lazy" />
            <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full">📷 {p.photos.length} photos</div>
          </div>
        )}

        <CardContent className="p-5 space-y-3">
          <h3 className="text-lg font-bold" style={{ color: "hsl(213 56% 23%)" }}>{p.ref} · {p.name}{p.zone ? ` · ${p.zone}` : ""}</h3>

          {/* Specs grid */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
            <div className="flex justify-between"><span>Price:</span><span className="font-semibold">{p.price} <StatusIcon status={p.criteria.price} /></span></div>
            <div className="flex justify-between"><span>Bedrooms:</span><span className="font-semibold">{p.beds} <StatusIcon status={p.criteria.beds} /></span></div>
            <div className="flex justify-between"><span>Bathrooms:</span><span className="font-semibold">{p.baths} <StatusIcon status={p.criteria.baths} /></span></div>
            <div className="flex justify-between"><span>Surface:</span><span className="font-semibold">{p.size} <StatusIcon status={p.criteria.surface} /></span></div>
            <div className="flex justify-between"><span>Pool:</span><span className="font-semibold">{p.pool ? "Private" : "No"} <StatusIcon status={p.criteria.pool} /></span></div>
            <div className="flex justify-between"><span>Furnished:</span><span className="font-semibold">{p.furnished ? "Yes" : "No"} <StatusIcon status={p.criteria.furnished} /></span></div>
            <div className="flex justify-between"><span>Pets:</span><span className="font-semibold">{p.pets ? "Yes" : "No"} <StatusIcon status={p.criteria.pets} /></span></div>
            <div className="flex justify-between"><span>Available:</span><span className="font-semibold">{p.available} <StatusIcon status={p.criteria.availableMay} /></span></div>
          </div>

          {/* Compatibility bar */}
          <div className="pt-2">
            <div className="flex justify-between text-sm mb-1">
              <span className="font-semibold" style={{ color: "hsl(213 56% 23%)" }}>Compatibility Score</span>
              <span className="font-bold" style={{ color: p.matchCount >= 12 ? "hsl(142 71% 45%)" : "hsl(39 76% 51%)" }}>{p.matchCount}/{p.matchTotal} · {Math.round(p.matchCount / p.matchTotal * 100)}%</span>
            </div>
            <Progress value={p.matchCount / p.matchTotal * 100} className="h-3" />
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-2 pt-1">
            {p.listingUrl && (
              <a href={p.listingUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" className="text-xs"><ExternalLink className="w-3 h-3 mr-1" /> View on Propaxar</Button>
              </a>
            )}
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
            {/* Photo gallery */}
            {hasPhotos && (
              <div className="pt-4">
                <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: "hsl(215 19% 34%)" }}>Click to enlarge</p>
                <div className="grid grid-cols-3 gap-2">
                  {p.photos.map((src, i) => (
                    <img key={i} src={src} alt={`Photo ${i + 1}`} className="rounded-lg w-full h-24 object-cover cursor-pointer hover:opacity-80 hover:scale-105 transition-all duration-200" loading="lazy" onClick={() => setLightbox({ open: true, index: i })} />
                  ))}
                </div>
              </div>
            )}

            {/* Analysis tabs */}
            {hasAnalysis && p.analysis.quality.stars > 0 && (
              <div>
                <h4 className="font-bold mb-3" style={{ color: "hsl(213 56% 23%)" }}>📊 RATINGS</h4>
                <Tabs defaultValue="quality">
                  <TabsList className="w-full">
                    <TabsTrigger value="quality" className="flex-1 text-xs">QUALITY</TabsTrigger>
                    <TabsTrigger value="location" className="flex-1 text-xs">LOCATION</TabsTrigger>
                    <TabsTrigger value="price" className="flex-1 text-xs">PRICE</TabsTrigger>
                  </TabsList>
                  {(["quality", "location", "price"] as const).map((key) => (
                    <TabsContent key={key} value={key} className="mt-3 space-y-2">
                      <div className="flex items-center gap-2">
                        <Stars count={p.analysis[key].stars} />
                        <span className="text-sm font-semibold">({p.analysis[key].stars}/5)</span>
                        {"label" in p.analysis[key] && p.analysis[key].label && (
                          <Badge className="text-xs" style={{ background: "hsl(142 71% 45%)", color: "#fff", border: "none" }}>{(p.analysis[key] as any).label}</Badge>
                        )}
                      </div>
                      <p className="text-sm whitespace-pre-line" style={{ color: "hsl(215 19% 34%)" }}>{p.analysis[key].text}</p>
                    </TabsContent>
                  ))}
                </Tabs>
              </div>
            )}

            {/* Professional Analysis - collapsible */}
            {hasAnalysis && p.professionalAnalysis && (
              <div className="rounded-xl p-5 space-y-4" style={{ background: "hsl(142 71% 45%/0.06)" }}>
                <h4 className="font-bold" style={{ color: "hsl(213 56% 23%)" }}>🔍 MY PROFESSIONAL ANALYSIS</h4>
                {[
                  ["Access & Parking", p.professionalAnalysis.access],
                  ["Water & Services", p.professionalAnalysis.water],
                  ["Internet & Connectivity", p.professionalAnalysis.internet],
                  ["Neighbourhood & Noise", p.professionalAnalysis.neighbourhood],
                  ["Property History", p.professionalAnalysis.history],
                  ["Owner Profile", p.professionalAnalysis.owner],
                ].map(([label, text]) => (
                  <div key={label}>
                    <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: "hsl(213 56% 23%)" }}>{label}</p>
                    <p className="text-sm" style={{ color: "hsl(215 19% 34%)" }}>{text}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Note for pa226 */}
            {!hasAnalysis && (
              <div className="rounded-xl p-5" style={{ background: "hsl(271 50% 50%/0.06)" }}>
                <h4 className="font-bold mb-2" style={{ color: "hsl(271 50% 50%)" }}>📝 NOTE</h4>
                <p className="text-sm" style={{ color: "hsl(215 19% 34%)" }}>
                  No detailed analysis available yet for this property. However, based on market knowledge and its specifications, this is a premium-tier property. At €2,500/month it exceeds your stated budget by €500 — but given your price flexibility, it may be worth considering if the extra space (200m², 4 bedrooms, large garden, vegetable plot) is valuable to you.
                </p>
              </div>
            )}

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

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="flex-1">
                <Button className="w-full font-semibold" style={{ background: "hsl(142 71% 45%)", color: "#fff", borderRadius: 8 }}>
                  <MessageCircle className="w-4 h-4 mr-2" /> 📅 Request Viewing
                </Button>
              </a>
              <a href={p.listingUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                <Button variant="outline" className="w-full font-semibold" style={{ borderRadius: 8 }}>
                  <ExternalLink className="w-4 h-4 mr-2" /> 🔗 Full Listing
                </Button>
              </a>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

// ─── Comparison Table ───
function ComparisonTable() {
  const fade = useFadeIn();
  const rows: { label: string; need: string; values: { text: string; status: "ok" | "warn" | "fail" | "na" }[] }[] = [
    { label: "Monthly Price", need: "€1,500–2,000", values: [{ text: "€1,600", status: "ok" }, { text: "€1,600", status: "ok" }, { text: "€2,500", status: "fail" }] },
    { label: "Bedrooms", need: "Min 3", values: [{ text: "3", status: "ok" }, { text: "3", status: "ok" }, { text: "4", status: "ok" }] },
    { label: "Bathrooms", need: "Min 2", values: [{ text: "2", status: "ok" }, { text: "1", status: "fail" }, { text: "2", status: "ok" }] },
    { label: "Surface", need: "Min 120m²", values: [{ text: "100m²", status: "warn" }, { text: "75m²", status: "fail" }, { text: "200m²", status: "ok" }] },
    { label: "Private Pool", need: "Yes", values: [{ text: "✅", status: "ok" }, { text: "✅", status: "ok" }, { text: "✅", status: "ok" }] },
    { label: "Furnished", need: "Yes", values: [{ text: "✅", status: "ok" }, { text: "✅", status: "ok" }, { text: "✅", status: "ok" }] },
    { label: "Pets", need: "Yes", values: [{ text: "✅", status: "ok" }, { text: "✅", status: "ok" }, { text: "✅", status: "ok" }] },
    { label: "Sea Views", need: "Yes", values: [{ text: "✅", status: "ok" }, { text: "✅", status: "ok" }, { text: "✅", status: "ok" }] },
    { label: "Country Views", need: "Yes", values: [{ text: "✅", status: "ok" }, { text: "✅", status: "ok" }, { text: "✅", status: "ok" }] },
    { label: "Parking", need: "Yes", values: [{ text: "✅", status: "ok" }, { text: "✅", status: "ok" }, { text: "✅", status: "ok" }] },
    { label: "Solarium", need: "Yes", values: [{ text: "✅", status: "ok" }, { text: "✅", status: "ok" }, { text: "✅", status: "ok" }] },
    { label: "Terrace", need: "Yes", values: [{ text: "✅", status: "ok" }, { text: "✅", status: "ok" }, { text: "✅", status: "ok" }] },
    { label: "Available < May", need: "Yes", values: [{ text: "Mar", status: "ok" }, { text: "Mar", status: "ok" }, { text: "Mar", status: "ok" }] },
    { label: "Location Rating", need: "High", values: [{ text: "⭐⭐⭐⭐⭐ 5/5", status: "ok" }, { text: "⭐⭐⭐⭐ 4/5", status: "ok" }, { text: "N/A", status: "na" }] },
    { label: "Price Rating", need: "Fair", values: [{ text: "⭐⭐⭐⭐ 4/5", status: "ok" }, { text: "⭐⭐ 2/5", status: "fail" }, { text: "N/A", status: "na" }] },
    { label: "Quality Rating", need: "High", values: [{ text: "⭐⭐⭐⭐⭐ 5/5", status: "ok" }, { text: "⭐⭐⭐⭐ 4/5", status: "ok" }, { text: "N/A", status: "na" }] },
    { label: "TOTAL MATCH", need: "16 criteria", values: [{ text: "🟢 13/16", status: "ok" }, { text: "🟡 10/16", status: "warn" }, { text: "🟡 10/16", status: "warn" }] },
  ];

  const statusBg = (s: string) => {
    if (s === "ok") return "hsl(142 71% 45%/0.1)";
    if (s === "warn") return "hsl(39 76% 61%/0.15)";
    if (s === "fail") return "hsl(0 72% 51%/0.1)";
    return "transparent";
  };

  return (
    <div ref={fade.ref} className={fade.className}>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs font-bold whitespace-nowrap">Criteria</TableHead>
              <TableHead className="text-xs font-bold whitespace-nowrap">Your Need</TableHead>
              <TableHead className="text-xs font-bold whitespace-nowrap">pa194 Casa Zambra</TableHead>
              <TableHead className="text-xs font-bold whitespace-nowrap">pa224 Cortijo Los Olivos</TableHead>
              <TableHead className="text-xs font-bold whitespace-nowrap">pa226 Villa Celia</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((r, i) => (
              <TableRow key={i} className={i === rows.length - 1 ? "font-bold" : ""}>
                <TableCell className="text-xs font-semibold whitespace-nowrap">{r.label}</TableCell>
                <TableCell className="text-xs">{r.need}</TableCell>
                {r.values.map((v, j) => (
                  <TableCell key={j} className="text-xs" style={{ background: statusBg(v.status) }}>{v.text}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

// ─── Main Page ───
export default function ReporteNadiaEN() {
  const contentRef = useRef<HTMLDivElement>(null);
  const heroFade = useFadeIn();
  const profileFade = useFadeIn();
  const marketFade = useFadeIn();
  const propsFade = useFadeIn();
  const logisticsFade = useFadeIn();
  const chartFade = useFadeIn();
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
      filename: `Propaxar_Report_Nadia_Horsted_${new Date().toISOString().slice(0, 10)}.pdf`,
      image: { type: "jpeg", quality: 0.95 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    }).from(el).save();
    el.querySelectorAll("[data-no-print]").forEach((n) => (n as HTMLElement).style.display = "");
  };

  const validUntil = new Date();
  validUntil.setMonth(validUntil.getMonth() + 6);
  const validStr = validUntil.toLocaleDateString("en-GB", { month: "long", year: "numeric" });

  const reportUrl = "https://propaxar.es/reporte/nadia-horsted-n-b4x9k2-en";
  const metaTitle = "📊 Nadia, here's your Frigiliana property report";
  const metaDescription = "3 hand-picked properties selected for you by Manuel Fernández, your local property expert in La Axarquía.";
  const ogImage = "https://propaxar.es/images/frigiliana-hero.jpg";

  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>Your Personal Property Report · Nadia Horsted · Propaxar</title>
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

      {/* ─── 1. HERO ─── */}
      <section className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden">
        <img src={heroImg} alt="Frigiliana" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/55" />
        <div ref={heroFade.ref} className={`relative z-10 px-6 max-w-xl ${heroFade.className}`}>
          <img src="/propaxar-vision.png" alt="Propaxar" className="h-10 mx-auto mb-6 opacity-90" />
          <h1 className="text-4xl md:text-6xl font-bold leading-tight text-white mb-3">
            Your Personal<br />Property Report
          </h1>
          <p className="text-xl md:text-2xl font-medium mt-4 text-white/90">
            Prepared exclusively for <strong>Nadia Horsted Narejo</strong>
          </p>
          <p className="text-base mt-2 text-white/70">by Manuel Fernández · Propaxar · La Axarquía</p>

          {/* Badges row */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {["🗓 27 February 2026", "🏡 3 Properties Selected", "📍 Frigiliana · La Axarquía", "🌐 Confidential"].map((b) => (
              <span key={b} className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/15 text-white/90 backdrop-blur-sm">{b}</span>
            ))}
          </div>

          <p className="text-sm mt-8 italic text-white/60 max-w-md mx-auto leading-relaxed">
            "I have personally visited and analysed each of these properties with your profile in mind. This is not an automated list — it is a curated selection based on your specific needs."
            <br />— Manuel Fernández, Propaxar
          </p>

          <ChevronDown className="mx-auto mt-8 w-8 h-8 animate-bounce text-white/60" />
        </div>
      </section>

      <div ref={contentRef}>

        {/* ─── 2. CLIENT PROFILE SUMMARY ─── */}
        <section className="py-16 px-4 md:px-8 max-w-5xl mx-auto" ref={profileFade.ref}>
          <div className={profileFade.className}>
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10" style={{ color: "hsl(213 56% 23%)" }}>Your Search Profile</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-0" style={{ boxShadow: "0 4px 20px hsl(0 0% 0%/0.07)", borderRadius: 12 }}>
                <CardContent className="p-6">
                  <h3 className="font-bold mb-4 text-sm uppercase tracking-wide" style={{ color: "hsl(213 56% 23%)" }}>Your Requirements</h3>
                  <div className="space-y-2">
                    {[
                      ["Property Type", "Independent rural house"],
                      ["Bedrooms", "Minimum 3"],
                      ["Bathrooms", "Minimum 2"],
                      ["Surface", "Minimum 120 m²"],
                      ["Monthly Budget", "€1,500 – €2,000"],
                      ["Price Flexibility", "Yes"],
                      ["Furnished", "Yes"],
                      ["Pets Allowed", "Yes"],
                      ["Outdoor Space", "Parking · Solarium · Terrace"],
                      ["Views", "Sea · Countryside"],
                      ["Entry Date", "1 May 2026"],
                      ["Contract", "Long-term (years)"],
                      ["Motivation", "Work relocation"],
                    ].map(([k, v]) => (
                      <div key={k} className="flex justify-between py-1.5 border-b last:border-0 text-sm">
                        <span style={{ color: "hsl(215 19% 45%)" }}>{k}</span>
                        <span className="font-semibold text-right" style={{ color: "hsl(213 56% 23%)" }}>{v}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0" style={{ boxShadow: "0 4px 20px hsl(0 0% 0%/0.07)", borderRadius: 12 }}>
                <CardContent className="p-6">
                  <h3 className="font-bold mb-4 text-sm uppercase tracking-wide" style={{ color: "hsl(213 56% 23%)" }}>Your Profile</h3>
                  <div className="space-y-2">
                    {[
                      ["Occupants", "Couple"],
                      ["Nationality", "Danish"],
                      ["Communication", "English"],
                      ["Urgency", "🔴 Urgent"],
                      ["Priority Level", "5/5 ★★★★★"],
                      ["Solvency", "Pending verification"],
                    ].map(([k, v]) => (
                      <div key={k} className="flex justify-between py-1.5 border-b last:border-0 text-sm">
                        <span style={{ color: "hsl(215 19% 45%)" }}>{k}</span>
                        <span className="font-semibold" style={{ color: "hsl(213 56% 23%)" }}>{v}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* ─── 3. MARKET CONTEXT ─── */}
        <section className="py-12 px-4 md:px-8 max-w-5xl mx-auto" ref={marketFade.ref}>
          <div className={marketFade.className}>
            <Card className="border-0" style={{ boxShadow: "0 4px 20px hsl(0 0% 0%/0.07)", borderRadius: 12 }}>
              <CardContent className="p-8">
                <h2 className="text-xl font-bold mb-4" style={{ color: "hsl(213 56% 23%)" }}>Current Market in La Axarquía · February 2026</h2>
                <p className="text-sm leading-relaxed" style={{ color: "hsl(215 19% 34%)" }}>
                  The rural rental market around Frigiliana remains highly competitive, with quality long-term rental properties at €1,200–2,000/month in very limited supply. The three properties in this report represent the best available options that match your criteria right now. I recommend moving quickly — especially on pa194, which has already attracted interest.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ─── 4. PROPERTIES SECTION ─── */}
        <section className="py-16 px-4 md:px-8 max-w-5xl mx-auto" ref={propsFade.ref}>
          <div className={propsFade.className}>
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-2" style={{ color: "hsl(213 56% 23%)" }}>Your 3 Selected Properties</h2>
            <p className="text-center text-sm mb-10" style={{ color: "hsl(215 19% 34%)" }}>Sorted by compatibility with your profile</p>
            <div className="grid grid-cols-1 gap-6">
              {properties.map((p, i) => <PropertyCard key={p.id} p={p} defaultOpen={i === 0} />)}
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
          </div>
        </section>

        {/* ─── 6. MARKET EVOLUTION CHART ─── */}
        <section className="py-12 px-4 md:px-8 max-w-5xl mx-auto" ref={chartFade.ref}>
          <div className={chartFade.className}>
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

        {/* ─── 7. COMPARISON TABLE ─── */}
        <section className="py-16 px-4 md:px-8 max-w-5xl mx-auto" style={{ background: "hsl(210 20% 98%)" }} ref={compFade.ref}>
          <div className={compFade.className}>
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10" style={{ color: "hsl(213 56% 23%)" }}>Property Comparison</h2>
            <ComparisonTable />
          </div>
        </section>

        {/* ─── 6. RECOMMENDATION ─── */}
        <section className="py-16 px-4 md:px-8 max-w-5xl mx-auto" ref={recoFade.ref}>
          <div className={recoFade.className}>
            <Card className="border-0 overflow-hidden" style={{ background: "linear-gradient(135deg, hsl(142 71% 45%), hsl(142 71% 38%))", borderRadius: 16 }}>
              <CardContent className="p-8 text-white space-y-4">
                <h2 className="text-2xl font-bold text-white">🏆 My Recommendation for You, Nadia</h2>
                <p className="text-lg font-semibold text-white">pa194 · Casa Zambra is my top recommendation.</p>
                <div className="text-sm leading-relaxed text-white/90 space-y-3">
                  <p>It meets 13 out of 16 of your criteria, is within budget, has 3 bedrooms, 2 bathrooms, private pool, south-facing orientation with spectacular views, and is available from 1 March.</p>
                  <p>The only point to verify: the surface is 100m² vs your stated minimum of 120m². For a couple, 100m² of quality rural construction is typically very comfortable — I recommend you visit and judge for yourself.</p>
                  <p className="font-semibold mt-4">I suggest we arrange a viewing of pa194 as a priority, followed by pa226 if the budget is flexible.</p>
                </div>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" data-no-print>
                  <Button className="mt-4 text-base font-bold px-10 py-5" style={{ background: "#fff", color: "hsl(142 71% 35%)", borderRadius: 10 }}>
                    <MessageCircle className="w-5 h-5 mr-2" /> ARRANGE A VIEWING
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ─── 7. NEXT STEPS ─── */}
        <section className="py-16 px-4 md:px-8 max-w-5xl mx-auto" style={{ background: "hsl(210 20% 98%)" }} ref={stepsFade.ref}>
          <div className={stepsFade.className}>
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10" style={{ color: "hsl(213 56% 23%)" }}>Next Steps</h2>
            <div className="grid sm:grid-cols-3 gap-8">
              {[
                { num: "1️⃣", title: "Reply to confirm your interest", desc: "Tell me which properties you'd like to visit" },
                { num: "2️⃣", title: "We arrange viewings", desc: "I coordinate everything with owners directly, at your convenience" },
                { num: "3️⃣", title: "You choose, I handle the rest", desc: "Contract, negotiation, handover · All included in the Property Finder service" },
              ].map((s, i) => (
                <div key={i} className="text-center space-y-3">
                  <div className="text-4xl">{s.num}</div>
                  <h3 className="font-bold text-sm" style={{ color: "hsl(213 56% 23%)" }}>{s.title}</h3>
                  <p className="text-sm" style={{ color: "hsl(215 19% 34%)" }}>{s.desc}</p>
                </div>
              ))}
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
                <Button onClick={handleDownloadPdf} className="text-base font-bold px-10 py-5" style={{ background: "hsl(142 71% 45%)", color: "#fff", borderRadius: 10 }}>
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
        <p className="text-xl font-bold mb-1 text-white">Manuel Fernández · Propaxar</p>
        <p className="text-sm text-white/70 mb-4">Your Personal Property Expert in La Axarquía</p>
        <div className="flex flex-col sm:flex-row justify-center gap-3 mb-4">
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
        <p className="text-sm text-white/70">🌐 propaxar.com</p>
        <p className="text-xs text-white/50 mt-2">📍 Frigiliana · La Axarquía · Andalucía</p>
        <div className="mt-6 pt-4 border-t border-white/20 text-xs text-white/50 space-y-1">
          <p><em>This report is confidential and prepared exclusively for Nadia Horsted Narejo.</em></p>
          <p>© 2026 Propaxar · All rights reserved · Report valid until {validStr}</p>
        </div>
        {/* Powered by watermark */}
        <p className="text-[10px] text-white/30 mt-4">Powered by Propaxar</p>
      </footer>
    </>
  );
}
