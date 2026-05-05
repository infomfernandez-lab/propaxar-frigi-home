// src/pages/PropiedadPublica.tsx
// Página pública dinámica — propaxar.es/pa194
// Carga datos desde Supabase por ref_interna

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Bed, Bath, Home, Tag, MapPin, ChevronLeft, ChevronRight, X,
  MessageCircle, Mail, Phone, Car, Waves, Wifi, Mountain, TreePine,
  Maximize,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

type Lang = "es" | "en";

type Prop = {
  id: string;
  ref_interna: string;
  titulo: string;
  tipo: string | null;
  zona: string | null;
  precio: number | null;
  habitaciones: number | null;
  banos: number | null;
  m2_construidos: number | null;
  operacion: string;
  disponible: boolean;
  mascotas_permitidas: boolean | null;
  piscina: string | null;
  parking: string | null;
  jardin: boolean | null;
  terraza: boolean | null;
  vistas: string | null;
  amueblado: string | null;
  internet: string | null;
  descripcion: string | null;
  puntos_fuertes: string | null;
  aspectos_a_considerar: string | null;
  analisis_acceso: string | null;
  analisis_agua: string | null;
  analisis_internet: string | null;
  analisis_vecindario: string | null;
  analisis_historial: string | null;
  perfil_ia: string | null;
  imagenes: string[] | null;
  disponible_desde: string | null;
  propaxar_direct: boolean;
  direccion: string | null;
};

const ZONA_LABEL: Record<string, string> = {
  casco_antiguo: "Casco antiguo", afueras: "Afueras", campo: "Campo",
  frigiliana: "Frigiliana", nerja: "Nerja", torrox: "Torrox",
};

const bodyFont = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
const cardStyle: React.CSSProperties = { backgroundColor: '#ffffff', border: '1px solid #e5e7eb', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' };

function featuresList(p: Prop, lang: Lang) {
  const features: { icon: any; label: string }[] = [];
  if (p.piscina && p.piscina !== "no") features.push({ icon: Waves, label: lang === "es" ? "Piscina" : "Pool" });
  if (p.parking && p.parking !== "no") features.push({ icon: Car, label: lang === "es" ? "Parking" : "Parking" });
  if (p.jardin) features.push({ icon: TreePine, label: lang === "es" ? "Jardín" : "Garden" });
  if (p.terraza) features.push({ icon: Mountain, label: lang === "es" ? "Terraza" : "Terrace" });
  if (p.internet && p.internet !== "sin_internet") features.push({ icon: Wifi, label: p.internet === "fibra" ? "Fibra óptica" : "WiFi" });
  if (p.mascotas_permitidas) features.push({ icon: Home, label: lang === "es" ? "Mascotas permitidas" : "Pets allowed" });
  if (p.amueblado && p.amueblado !== "sin_amueblar") features.push({ icon: Home, label: lang === "es" ? "Amueblado" : "Furnished" });
  if (p.vistas && p.vistas !== "sin_vistas") {
    const vLabel: Record<string, string> = {
      mar: lang === "es" ? "Vistas al mar" : "Sea views",
      montana: lang === "es" ? "Vistas a la montaña" : "Mountain views",
      pueblo: lang === "es" ? "Vistas al pueblo" : "Village views",
    };
    features.push({ icon: Mountain, label: vLabel[p.vistas] ?? p.vistas });
  }
  return features;
}

function highlightsList(p: Prop, lang: Lang): string[] {
  const h: string[] = [];
  if (p.habitaciones) h.push(lang === "es" ? `${p.habitaciones} dormitorios` : `${p.habitaciones} bedrooms`);
  if (p.banos) h.push(lang === "es" ? `${p.banos} baños` : `${p.banos} bathrooms`);
  if (p.m2_construidos) h.push(`${p.m2_construidos}m²`);
  if (p.piscina && p.piscina !== "no") h.push(lang === "es" ? "Piscina privada" : "Private pool");
  if (p.jardin) h.push(lang === "es" ? "Jardín" : "Garden");
  if (p.terraza) h.push(lang === "es" ? "Terraza" : "Terrace");
  if (p.parking && p.parking !== "no") h.push(lang === "es" ? "Parking privado" : "Private parking");
  if (p.vistas === "mar") h.push(lang === "es" ? "Vistas al mar" : "Sea views");
  if (p.internet === "fibra") h.push(lang === "es" ? "Fibra óptica" : "Fibre optic");
  if (p.mascotas_permitidas) h.push(lang === "es" ? "Mascotas permitidas" : "Pets allowed");
  if (p.disponible_desde) h.push(lang === "es" ? `Disponible desde ${p.disponible_desde}` : `Available from ${p.disponible_desde}`);
  return h;
}

export default function PropiedadPublica() {
  const { ref } = useParams<{ ref: string }>();
  const navigate = useNavigate();
  const [prop, setProp] = useState<Prop | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [lang, setLang] = useState<Lang>(() => {
    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get("lang");
    if (urlLang === "en" || urlLang === "es") return urlLang as Lang;
    return (localStorage.getItem("finder-lang") as Lang) || "es";
  });
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(0);

  useEffect(() => {
    localStorage.setItem("finder-lang", lang);
  }, [lang]);

  useEffect(() => {
    if (!ref) { setNotFound(true); setLoading(false); return; }
    (async () => {
      setLoading(true);
      const { data } = await supabase
        .from("propiedades")
        .select("*")
        .eq("ref_interna", ref)
        .single();
      if (!data) { setNotFound(true); } else { setProp(data as Prop); }
      setLoading(false);
    })();
  }, [ref]);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: bodyFont }}>
        <p style={{ color: '#6b7280', fontSize: 15 }}>Cargando…</p>
      </div>
    );
  }

  if (notFound || !prop) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: bodyFont, padding: 24 }}>
        <div style={{ textAlign: 'center', maxWidth: 420 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🏠</div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#111827', marginBottom: 8 }}>Propiedad no encontrada</h1>
          <p style={{ color: '#6b7280', fontSize: 14, marginBottom: 20 }}>
            La referencia <strong>{ref}</strong> no existe o no está disponible.
          </p>
          <button onClick={() => navigate('/')} style={{ background: '#1E2535', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: 8, fontWeight: 600, cursor: 'pointer' }}>
            ← Volver a Propaxar
          </button>
        </div>
      </div>
    );
  }

  const imgs = prop.imagenes ?? [];
  const features = featuresList(prop, lang);
  const highlights = highlightsList(prop, lang);
  const isAlquiler = prop.operacion === "alquiler" || prop.operacion === "ambas";
  const precioLabel = prop.precio ? `${Number(prop.precio).toLocaleString("es-ES")}€` : "Consultar";
  const periodoLabel = isAlquiler ? (lang === "es" ? "/mes" : "/month") : "";
  const operacionLabel = isAlquiler ? (lang === "es" ? "Alquiler residencial" : "Residential rental") : (lang === "es" ? "Venta" : "For sale");
  const zonaLabel = prop.zona ? (ZONA_LABEL[prop.zona] ?? prop.zona) : "Frigiliana, Málaga";
  const tipoLabel = prop.tipo ? prop.tipo.charAt(0).toUpperCase() + prop.tipo.slice(1) : "—";

  const waMsg = lang === "es"
    ? `Hola Manuel, me interesa la propiedad en Frigiliana (ref. ${prop.ref_interna}). ¿Puedo agendar una visita?`
    : `Hi Manuel, I'm interested in the property in Frigiliana (ref. ${prop.ref_interna}). Can I schedule a viewing?`;
  const waLink = `https://wa.me/34662317561?text=${encodeURIComponent(waMsg)}`;
  const emailSubject = `Consulta propiedad ${prop.ref_interna}`;

  const metaTitle = `${prop.titulo} — ${precioLabel}${periodoLabel} | Propaxar`;
  const metaDesc = lang === "es"
    ? `${prop.habitaciones ?? ""}${prop.habitaciones ? " dormitorios" : ""} en ${zonaLabel}. ${prop.descripcion?.slice(0, 100) ?? ""} ${precioLabel}${periodoLabel}. Ref. ${prop.ref_interna}.`
    : `${prop.habitaciones ?? ""}${prop.habitaciones ? " bedrooms" : ""} in ${zonaLabel}. ${precioLabel}${periodoLabel}. Ref. ${prop.ref_interna}.`;

  const descripcionPrincipal = prop.perfil_ia ?? prop.descripcion ?? prop.puntos_fuertes ?? "";
  const aspectos = prop.aspectos_a_considerar;

  const analisisBullets = [
    prop.analisis_acceso && { title: lang === "es" ? "Acceso" : "Access", text: prop.analisis_acceso },
    prop.analisis_agua && { title: lang === "es" ? "Agua y servicios" : "Water & services", text: prop.analisis_agua },
    prop.analisis_internet && { title: lang === "es" ? "Internet" : "Internet", text: prop.analisis_internet },
    prop.analisis_vecindario && { title: lang === "es" ? "Vecindario" : "Neighbourhood", text: prop.analisis_vecindario },
    prop.analisis_historial && { title: lang === "es" ? "Historial" : "History", text: prop.analisis_historial },
  ].filter(Boolean) as { title: string; text: string }[];

  const quickStats = [
    { icon: Home, label: lang === "es" ? "Tipo" : "Type", value: tipoLabel },
    prop.habitaciones && { icon: Bed, label: lang === "es" ? "Dormitorios" : "Bedrooms", value: prop.habitaciones.toString() },
    prop.banos && { icon: Bath, label: lang === "es" ? "Baños" : "Bathrooms", value: prop.banos.toString() },
    prop.m2_construidos && { icon: Maximize, label: "m²", value: `${prop.m2_construidos}m²` },
    { icon: Tag, label: "Ref.", value: prop.ref_interna },
  ].filter(Boolean) as { icon: any; label: string; value: string }[];

  return (
    <>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDesc} />
        {imgs[0] && <meta property="og:image" content={imgs[0]} />}
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDesc} />
      </Helmet>

      <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', fontFamily: bodyFont, color: '#111827' }}>
        {/* Top bar */}
        <div style={{ backgroundColor: '#1E2535', color: '#fff', padding: '12px 0' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <a href="/" style={{ color: '#fff', fontWeight: 700, fontSize: 16, textDecoration: 'none', letterSpacing: '0.04em' }}>Propaxar</a>
            <button
              onClick={() => setLang(l => l === "es" ? "en" : "es")}
              style={{ border: '1px solid rgba(255,255,255,0.45)', color: 'white', borderRadius: 6, padding: '6px 14px', fontSize: 13, fontWeight: 600, background: 'transparent', cursor: 'pointer' }}
            >
              {lang === "es" ? "EN" : "ES"}
            </button>
          </div>
        </div>

        {/* Hero */}
        <div style={{ backgroundColor: '#fff', borderBottom: '1px solid #e5e7eb' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 20px' }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 12, color: '#6b7280', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                Ref. {prop.ref_interna} · {operacionLabel}
              </span>
              {prop.propaxar_direct && (
                <span style={{ fontSize: 11, background: '#1E2535', color: '#fff', padding: '3px 8px', borderRadius: 4, fontWeight: 700, letterSpacing: '0.05em' }}>
                  PROPAXAR DIRECT
                </span>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
              <div>
                <h1 style={{ fontSize: 30, fontWeight: 700, color: '#111827', margin: 0, lineHeight: 1.2 }}>{prop.titulo}</h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8, color: '#6b7280', fontSize: 14 }}>
                  <MapPin size={14} />
                  <span>{zonaLabel}, Málaga</span>
                </div>
              </div>
              <div>
                <p style={{ fontSize: 32, fontWeight: 800, color: '#1E2535', margin: 0 }}>{precioLabel}</p>
                <p style={{ fontSize: 13, color: '#6b7280', margin: 0 }}>{periodoLabel} · {operacionLabel}</p>
              </div>
            </div>

            {imgs.length > 0 ? (
              <div
                onClick={() => { setLightboxIdx(0); setLightboxOpen(true); }}
                style={{ width: '100%', height: 'min(60vh, 480px)', borderRadius: 12, overflow: 'hidden', cursor: 'pointer', backgroundColor: '#f3f4f6' }}
              >
                <img src={imgs[0]} alt={prop.titulo} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
            ) : (
              <div style={{ width: '100%', height: 320, borderRadius: 12, backgroundColor: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 8, color: '#9ca3af' }}>
                <Home size={36} />
                <p style={{ fontSize: 14, margin: 0 }}>{lang === "es" ? "Imágenes próximamente" : "Images coming soon"}</p>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: 24 }} className="propax-grid">
            {/* Left column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

              {/* Quick stats */}
              <div style={{ ...cardStyle, borderRadius: 12, padding: 20 }}>
                <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: '#111827' }}>
                  {lang === "es" ? "Visión general" : "Overview"}
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: 14 }}>
                  {quickStats.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                      <div key={i} style={{ textAlign: 'center', padding: '12px 8px', backgroundColor: '#f9fafb', borderRadius: 8 }}>
                        <Icon size={20} color="#1E2535" style={{ margin: '0 auto 6px' }} />
                        <p style={{ fontWeight: 700, fontSize: 14, color: '#111827', margin: 0 }}>{stat.value}</p>
                        <p style={{ fontSize: 11, color: '#6b7280', margin: '2px 0 0' }}>{stat.label}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Features */}
              {features.length > 0 && (
                <div style={{ ...cardStyle, borderRadius: 12, padding: 20 }}>
                  <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: '#111827' }}>
                    {lang === "es" ? "Características" : "Features"}
                  </h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 10 }}>
                    {features.map((f, i) => {
                      const Icon = f.icon;
                      return (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', backgroundColor: '#f9fafb', borderRadius: 8 }}>
                          <Icon size={18} color="#1E2535" />
                          <span style={{ fontSize: 13, color: '#374151' }}>{f.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Description */}
              {descripcionPrincipal && (
                <div style={{ ...cardStyle, borderRadius: 12, padding: 20 }}>
                  <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: '#111827' }}>
                    {lang === "es" ? "Descripción" : "Description"}
                  </h2>
                  <div style={{ fontSize: 14, lineHeight: 1.7, color: '#374151' }}>
                    <p style={{ whiteSpace: 'pre-wrap', margin: 0 }}>{descripcionPrincipal}</p>
                    {analisisBullets.length > 0 && (
                      <>
                        <p style={{ fontWeight: 700, marginTop: 18, marginBottom: 8, color: '#111827' }}>
                          {lang === "es" ? "Análisis de la propiedad:" : "Property analysis:"}
                        </p>
                        <ul style={{ paddingLeft: 18, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                          {analisisBullets.map((b, i) => (
                            <li key={i}>
                              <strong style={{ color: '#111827' }}>{b.title}:</strong> {b.text}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                    {aspectos && (
                      <div style={{ marginTop: 18, padding: 14, backgroundColor: '#fef9e7', borderRadius: 8, border: '1px solid #fde68a' }}>
                        <p style={{ fontWeight: 700, marginBottom: 6, color: '#92400e' }}>
                          {lang === "es" ? "Aspectos a considerar:" : "Points to consider:"}
                        </p>
                        <p style={{ margin: 0, color: '#78350f', whiteSpace: 'pre-wrap' }}>{aspectos}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Gallery */}
              {imgs.length > 1 && (
                <div style={{ ...cardStyle, borderRadius: 12, padding: 20 }}>
                  <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: '#111827' }}>
                    {lang === "es" ? "Galería completa" : "Full Gallery"} ({imgs.length})
                  </h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 8 }}>
                    {imgs.map((photo, i) => (
                      <div
                        key={i}
                        onClick={() => { setLightboxIdx(i); setLightboxOpen(true); }}
                        style={{ aspectRatio: '4/3', borderRadius: 8, overflow: 'hidden', cursor: 'pointer', backgroundColor: '#f3f4f6' }}
                      >
                        <img src={photo} alt={`${prop.titulo} ${i + 1}`} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Location */}
              {prop.direccion && (
                <div style={{ ...cardStyle, borderRadius: 12, padding: 20 }}>
                  <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#111827' }}>
                    {lang === "es" ? "Ubicación" : "Location"}
                  </h2>
                  <p style={{ fontSize: 14, color: '#374151', margin: 0 }}>{prop.direccion}</p>
                  <p style={{ fontSize: 13, color: '#6b7280', margin: '4px 0 0' }}>{zonaLabel}, Málaga 29788</p>
                </div>
              )}
            </div>

            {/* Right column — Sticky */}
            <div className="propax-sticky">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, position: 'sticky', top: 20 }}>

                {/* Price card */}
                <div style={{ backgroundColor: '#1E2535', color: '#fff', borderRadius: 12, padding: 22 }}>
                  <div style={{ marginBottom: 16 }}>
                    <p style={{ fontSize: 28, fontWeight: 800, margin: 0 }}>{precioLabel}</p>
                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', margin: 0 }}>{periodoLabel} · {operacionLabel}</p>
                    {!prop.disponible && (
                      <p style={{ marginTop: 8, padding: '4px 8px', background: 'rgba(248,113,113,0.18)', color: '#fca5a5', borderRadius: 4, fontSize: 12, display: 'inline-block', fontWeight: 600 }}>
                        {lang === "es" ? "No disponible" : "Not available"}
                      </p>
                    )}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <a href={waLink} target="_blank" rel="noreferrer"
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: '#fff', color: '#1E2535', padding: '12px 16px', borderRadius: 8, textDecoration: 'none', fontWeight: 700, fontSize: 14 }}>
                      <MessageCircle size={16} />
                      {lang === "es" ? "WhatsApp — Agendar visita" : "WhatsApp — Schedule viewing"}
                    </a>
                    <a href={`mailto:info@propaxar.com?subject=${encodeURIComponent(emailSubject)}`}
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)', color: '#fff', padding: '12px 16px', borderRadius: 8, textDecoration: 'none', fontWeight: 600, fontSize: 14 }}>
                      <Mail size={16} />
                      {lang === "es" ? "Enviar email" : "Send email"}
                    </a>
                    <a href="tel:+34662317561"
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, color: 'rgba(255,255,255,0.8)', padding: '6px', textDecoration: 'none', fontWeight: 500, fontSize: 13 }}>
                      <Phone size={14} />
                      +34 662 317 561
                    </a>
                  </div>
                </div>

                {/* Agent card */}
                <div style={{ ...cardStyle, borderRadius: 12, padding: 18 }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 10 }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#1E2535', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>M</div>
                    <div>
                      <p style={{ fontWeight: 700, margin: 0, fontSize: 14 }}>Manuel C. Fernández</p>
                      <p style={{ margin: 0, fontSize: 12, color: '#6b7280' }}>
                        {lang === "es" ? "Consultor inmobiliario · Frigiliana" : "Property consultant · Frigiliana"}
                      </p>
                    </div>
                  </div>
                  <p style={{ margin: 0, fontSize: 13, color: '#374151', lineHeight: 1.55 }}>
                    {lang === "es"
                      ? "40 años de conocimiento local. Te ayudo a encontrar exactamente lo que buscas — sin perder tiempo."
                      : "40 years of local knowledge. I help you find exactly what you're looking for — without wasting time."}
                  </p>
                </div>

                {/* Highlights */}
                {highlights.length > 0 && (
                  <div style={{ ...cardStyle, borderRadius: 12, padding: 18 }}>
                    <p style={{ fontWeight: 700, marginBottom: 10, fontSize: 14 }}>
                      {lang === "es" ? "Lo que destaca" : "Highlights"}
                    </p>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {highlights.map((item, i) => (
                        <li key={i} style={{ display: 'flex', gap: 8, alignItems: 'start', fontSize: 13, color: '#374151' }}>
                          <span style={{ color: '#16a34a', fontWeight: 700 }}>✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ backgroundColor: '#1E2535', color: '#fff', padding: '24px 0', marginTop: 40 }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
            <span style={{ fontWeight: 700 }}>Propaxar</span>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>© 2026 Propaxar · Frigiliana, Málaga</span>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && imgs.length > 0 && (
        <div
          onClick={() => setLightboxOpen(false)}
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.92)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(255,255,255,0.12)', border: 'none', color: '#fff', padding: 8, borderRadius: '50%', cursor: 'pointer' }}
            aria-label="Close"
          >
            <X size={20} />
          </button>
          {imgs.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); setLightboxIdx(i => (i - 1 + imgs.length) % imgs.length); }}
                style={{ position: 'absolute', left: 16, background: 'rgba(255,255,255,0.12)', border: 'none', color: '#fff', padding: 10, borderRadius: '50%', cursor: 'pointer' }}
                aria-label="Previous"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setLightboxIdx(i => (i + 1) % imgs.length); }}
                style={{ position: 'absolute', right: 16, background: 'rgba(255,255,255,0.12)', border: 'none', color: '#fff', padding: 10, borderRadius: '50%', cursor: 'pointer' }}
                aria-label="Next"
              >
                <ChevronRight size={22} />
              </button>
            </>
          )}
          <img
            src={imgs[lightboxIdx]}
            alt={`${prop.titulo} ${lightboxIdx + 1}`}
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '92vw', maxHeight: '85vh', objectFit: 'contain', display: 'block' }}
          />
          <div style={{ position: 'absolute', bottom: 20, left: 0, right: 0, textAlign: 'center', color: 'rgba(255,255,255,0.85)', fontSize: 13 }}>
            {lightboxIdx + 1} / {imgs.length}
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 900px) {
          .propax-grid {
            grid-template-columns: minmax(0, 1fr) 340px !important;
          }
        }
      `}</style>
    </>
  );
}
