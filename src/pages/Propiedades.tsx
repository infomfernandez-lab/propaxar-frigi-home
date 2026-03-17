import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/contexts/LanguageContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Bed, Bath, Maximize, MapPin } from "lucide-react";

const properties = [
  {
    id: "pa226",
    slug: "/property/villacelia",
    name: "Villa Celia",
    image: "/images/properties/villa-celia-01.jpg",
    price: 2500,
    beds: 5,
    baths: 2,
    m2: 150,
    tagEs: "Exclusiva",
    tagEn: "Exclusive",
    descEs: "Vistas 360°, piscina privada vallada, acceso 100% asfaltado.",
    descEn: "360° views, fenced private pool, fully paved access.",
  },
  {
    id: "pa219",
    slug: "/property/villavistas",
    name: "Villa Vistas",
    image: "/images/properties/3843121-60cd3a6b.jpg",
    price: 1700,
    beds: 3,
    baths: 2,
    m2: null,
    tagEs: "Vistas al mar",
    tagEn: "Sea views",
    descEs: "Impresionantes vistas al mar y a la montaña desde todas las estancias.",
    descEn: "Stunning sea and mountain views from every room.",
  },
  {
    id: "pa220",
    slug: "/property/villapanorama",
    name: "Villa Panorama",
    image: "/images/properties/IMG_8007.jpg",
    price: 1600,
    beds: 3,
    baths: 2,
    m2: 100,
    tagEs: "Panorámica",
    tagEn: "Panoramic",
    descEs: "Amplias vistas panorámicas en un entorno natural privilegiado.",
    descEn: "Wide panoramic views in a privileged natural setting.",
  },
  {
    id: "pa224",
    slug: "/property/villaolivos",
    name: "Villa Olivos",
    image: "/images/properties/IMG_7565.jpg",
    price: 1600,
    beds: 3,
    baths: 1,
    m2: 95,
    tagEs: "Naturaleza",
    tagEn: "Nature",
    descEs: "Rodeada de olivos con total privacidad y tranquilidad.",
    descEn: "Surrounded by olive trees with total privacy and tranquility.",
  },
  {
    id: "pa194",
    slug: "/property/villaenfrigiliana",
    name: "Villa en Frigiliana",
    image: "/images/properties/2715329-0ba84802.jpg",
    price: 1400,
    beds: 3,
    baths: 2,
    m2: 102,
    tagEs: "Piscina & BBQ",
    tagEn: "Pool & BBQ",
    descEs: "Acceso asfaltado, parking privado, porche todo el año, piscina y BBQ.",
    descEn: "Paved access, private parking, year-round porch, pool & BBQ.",
  },
  {
    id: "pa218",
    slug: "/property/casarural",
    name: "Casa Rural",
    image: "/images/properties/casa-rural-01.jpg",
    price: 1000,
    beds: 2,
    baths: 1,
    m2: 60,
    tagEs: "Rústica",
    tagEn: "Rustic",
    descEs: "Encantadora casa rústica con vistas a la montaña.",
    descEn: "Charming rustic house with mountain views.",
  },
  {
    id: "pa227",
    slug: "/property/casaenfrigiliana",
    name: "Casa en Frigiliana",
    image: "/images/properties/IMG_4431.jpg",
    price: 1200,
    beds: 2,
    baths: 1,
    m2: 85,
    tagEs: "Reformada",
    tagEn: "Renovated",
    descEs: "Casa adosada reformada en el centro de Frigiliana con terraza y vistas.",
    descEn: "Renovated townhouse in the centre of Frigiliana with terrace and views.",
  },
  {
    id: "pa225",
    slug: "/property/pisoenfrigiliana",
    name: "Piso en Frigiliana",
    image: "/images/properties/piso-frigi-01.jpg",
    price: 750,
    beds: 1,
    baths: 1,
    m2: null,
    tagEs: "Centro",
    tagEn: "Town center",
    descEs: "Piso acogedor con terraza de 15m² en el centro del pueblo.",
    descEn: "Cozy apartment with 15m² terrace in the town center.",
  },
];

const Propiedades = () => {
  const { language } = useLanguage();
  const isEn = language === "en";

  return (
    <main className="min-h-screen bg-[hsl(222,20%,96%)]">
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Navigation />

      {/* Hero */}
      <section
        className="pt-[60px] relative overflow-hidden"
        style={{ backgroundColor: "hsl(222, 28%, 16%)" }}
      >
        <div className="max-w-[1200px] mx-auto px-5 md:px-8 py-16 md:py-24">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-white/50" />
            <span className="text-white/50 text-sm font-medium tracking-wide uppercase">
              Frigiliana, Málaga
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4">
            {isEn ? "Properties for Rent" : "Propiedades en Alquiler"}
          </h1>
          <p className="text-white/60 text-lg md:text-xl max-w-2xl">
            {isEn
              ? "Handpicked homes in Frigiliana — no middlemen, direct from Propaxar."
              : "Casas seleccionadas en Frigiliana — sin intermediarios, directo desde Propaxar."}
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-[1200px] mx-auto px-5 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((p) => (
            <Link
              key={p.id}
              to={p.slug}
              className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-white/95 backdrop-blur-sm text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md text-[hsl(222,28%,16%)]">
                    {isEn ? p.tagEn : p.tagEs}
                  </span>
                </div>
                <div className="absolute bottom-3 right-3">
                  <span className="bg-[hsl(222,28%,16%)]/90 backdrop-blur-sm text-white text-sm font-bold px-3 py-1.5 rounded-md">
                    {p.price.toLocaleString()}€
                    <span className="text-white/60 font-normal text-xs">
                      /{isEn ? "mo" : "mes"}
                    </span>
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-lg font-bold text-[hsl(222,28%,16%)]">
                    {p.name}
                  </h2>
                  <span className="text-xs text-[hsl(222,28%,16%)]/40 font-mono">
                    {p.id}
                  </span>
                </div>
                <p className="text-sm text-[hsl(222,28%,16%)]/55 mb-4 line-clamp-2">
                  {isEn ? p.descEn : p.descEs}
                </p>
                <div className="flex items-center gap-4 text-[hsl(222,28%,16%)]/50 text-sm">
                  <span className="flex items-center gap-1.5">
                    <Bed className="w-4 h-4" /> {p.beds}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Bath className="w-4 h-4" /> {p.baths}
                  </span>
                  {p.m2 && (
                    <span className="flex items-center gap-1.5">
                      <Maximize className="w-4 h-4" /> {p.m2}m²
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Propiedades;
