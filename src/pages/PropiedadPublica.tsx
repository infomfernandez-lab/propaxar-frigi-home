// src/pages/PropiedadPublica.tsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Bed,
  Bath,
  Home,
  Tag,
  MapPin,
  ChevronLeft,
  ChevronRight,
  X,
  MessageCircle,
  Mail,
  Phone,
  Car,
  Waves,
  Wifi,
  Mountain,
  TreePine,
} from "lucide-react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://jkirjhpnddkrkpghpxdz.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpraXJqaHBuZGRrcmtwZ2hweGR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc3OTkyOTksImV4cCI6MjA5MzM3NTI5OX0.sot9GO_j8ZBXSFuccRz86Lnzfr2wiJ4w6ouV4f5ipjI",
);

type Lang = "es" | "en";
const bodyFont = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
const card: React.CSSProperties = {
  backgroundColor: "#ffffff",
  border: "1px solid #e5e7eb",
  boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
  borderRadius: "8px",
  overflow: "hidden",
};
const ZONA: Record<string, string> = {
  casco_antiguo: "Casco Antiguo",
  afueras: "Afueras",
  campo: "Campo",
  frigiliana: "Frigiliana",
  nerja: "Nerja",
  torrox: "Torrox",
};

export default function PropiedadPublica() {
  const { ref } = useParams<{ ref: string }>();
  const [prop, setProp] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [lang, setLang] = useState<Lang>(() => {
    try {
      const p = new URLSearchParams(window.location.search).get("lang");
      if (p === "en" || p === "es") return p;
      return (localStorage.getItem("finder-lang") as Lang) || "es";
    } catch {
      return "es";
    }
  });
  const [lb, setLb] = useState(false);
  const [lbIdx, setLbIdx] = useState(0);

  useEffect(() => {
    try {
      localStorage.setItem("finder-lang", lang);
    } catch {}
  }, [lang]);

  useEffect(() => {
    if (!ref) {
      setNotFound(true);
      setLoading(false);
      return;
    }
    supabase
      .from("propiedades")
      .select("*")
      .eq("ref_interna", ref)
      .single()
      .then(({ data }) => {
        if (!data) setNotFound(true);
        else setProp(data);
        setLoading(false);
      });
  }, [ref]);

  const isEs = lang === "es";
  if (loading)
    return (
      <div
        style={{
          fontFamily: bodyFont,
          backgroundColor: "#2d3e4e",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "rgba(255,255,255,0.6)",
        }}
      >
        Cargando…
      </div>
    );
  if (notFound || !prop)
    return (
      <div
        style={{
          fontFamily: bodyFont,
          backgroundColor: "#f5f5f5",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <div>
          <div style={{ fontSize: 64, marginBottom: 16 }}>🏠</div>
          <h1 style={{ color: "#2d3e4e" }}>Propiedad no encontrada</h1>
          <p style={{ color: "#666" }}>
            Ref. <strong>{ref}</strong> no existe.
          </p>
          <a href="/" style={{ color: "#3d5a73" }}>
            ← Propaxar
          </a>
        </div>
      </div>
    );

  const imgs = prop.imagenes ?? [];
  const zona = prop.zona ? (ZONA[prop.zona] ?? prop.zona) : "Frigiliana";
  const isAlq = prop.operacion === "alquiler" || prop.operacion === "ambas";
  const precio = prop.precio ? `${Number(prop.precio).toLocaleString("es-ES")}€` : "Consultar";
  const periodo = isAlq ? (isEs ? "/mes" : "/month") : "";
  const operacion = isAlq ? (isEs ? "Alquiler residencial" : "Residential rental") : isEs ? "Venta" : "For sale";
  const tipo = prop.tipo ? prop.tipo.charAt(0).toUpperCase() + prop.tipo.slice(1) : "—";
  const waText = isEs
    ? `Hola Manuel, me interesa la propiedad en Frigiliana (ref. ${prop.ref_interna}). ¿Puedo agendar una visita?`
    : `Hi Manuel, I'm interested in the property in Frigiliana (ref. ${prop.ref_interna}). Can I schedule a viewing?`;
  const waLink = `https://wa.me/34662317561?text=${encodeURIComponent(waText)}`;

  const features: { icon: any; label: string }[] = [
    prop.piscina && prop.piscina !== "no" && { icon: Waves, label: isEs ? "Piscina privada" : "Private pool" },
    prop.parking && prop.parking !== "no" && { icon: Car, label: "Parking" },
    prop.jardin && { icon: TreePine, label: isEs ? "Jardín" : "Garden" },
    prop.terraza && { icon: Mountain, label: isEs ? "Terraza" : "Terrace" },
    prop.internet === "fibra" && { icon: Wifi, label: isEs ? "Fibra óptica" : "Fibre optic" },
    prop.internet && prop.internet !== "sin_internet" && prop.internet !== "fibra" && { icon: Wifi, label: "WiFi" },
    prop.mascotas_permitidas && { icon: Home, label: isEs ? "Mascotas permitidas" : "Pets allowed" },
    prop.amueblado && prop.amueblado !== "sin_amueblar" && { icon: Home, label: isEs ? "Amueblado" : "Furnished" },
    prop.vistas === "mar" && { icon: Mountain, label: isEs ? "Vistas al mar" : "Sea views" },
    prop.vistas === "montana" && { icon: Mountain, label: isEs ? "Vistas a la montaña" : "Mountain views" },
  ].filter(Boolean) as { icon: any; label: string }[];

  const highlights: string[] = [
    prop.habitaciones && `${prop.habitaciones} ${isEs ? "dormitorios" : "bedrooms"}`,
    prop.banos && `${prop.banos} ${isEs ? "baños" : "bathrooms"}`,
    prop.m2_construidos && `${prop.m2_construidos}m²`,
    prop.piscina && prop.piscina !== "no" && (isEs ? "Piscina privada" : "Private pool"),
    prop.jardin && (isEs ? "Jardín" : "Garden"),
    prop.terraza && (isEs ? "Terraza" : "Terrace"),
    prop.parking && prop.parking !== "no" && (isEs ? "Parking privado" : "Private parking"),
    prop.vistas === "mar" && (isEs ? "Vistas al mar" : "Sea views"),
    prop.vistas === "montana" && (isEs ? "Vistas a la montaña" : "Mountain views"),
    prop.internet === "fibra" && (isEs ? "Fibra óptica" : "Fibre optic"),
    prop.mascotas_permitidas && (isEs ? "Mascotas permitidas" : "Pets allowed"),
    prop.disponible_desde &&
      (isEs ? `Disponible desde ${prop.disponible_desde}` : `Available from ${prop.disponible_desde}`),
  ].filter(Boolean) as string[];

  const desc = prop.perfil_ia ?? prop.descripcion ?? prop.puntos_fuertes ?? "";
  const analisis = [
    prop.analisis_acceso && { t: isEs ? "Acceso" : "Access", v: prop.analisis_acceso },
    prop.analisis_agua && { t: isEs ? "Agua y servicios" : "Water & services", v: prop.analisis_agua },
    prop.analisis_internet && { t: "Internet", v: prop.analisis_internet },
    prop.analisis_vecindario && { t: isEs ? "Vecindario" : "Neighbourhood", v: prop.analisis_vecindario },
    prop.analisis_historial && { t: isEs ? "Historial" : "History", v: prop.analisis_historial },
  ].filter(Boolean) as { t: string; v: string }[];

  const stats = [
    { icon: Home, label: isEs ? "Tipo" : "Type", value: tipo },
    prop.habitaciones != null && {
      icon: Bed,
      label: isEs ? "Dormitorios" : "Bedrooms",
      value: String(prop.habitaciones),
    },
    prop.banos != null && { icon: Bath, label: isEs ? "Baños" : "Bathrooms", value: String(prop.banos) },
    prop.m2_construidos != null && { icon: Home, label: "m²", value: `${prop.m2_construidos}m²` },
    { icon: Tag, label: "Ref.", value: prop.ref_interna },
  ].filter(Boolean) as { icon: any; label: string; value: string }[];

  return (
    <>
      <Helmet>
        <title>
          {prop.titulo} — {precio}
          {periodo} | Propaxar
        </title>
        <meta
          name="description"
          content={`${prop.habitaciones ?? ""} ${isEs ? "dormitorios" : "bedrooms"} en ${zona}. ${precio}${periodo}. Ref. ${prop.ref_interna}.`}
        />
        {imgs[0] && <meta property="og:image" content={imgs[0]} />}
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div style={{ fontFamily: bodyFont, backgroundColor: "#f5f5f5", color: "#1a1a1a", minHeight: "100vh" }}>
        {/* Top bar */}
        <div style={{ backgroundColor: "#2d3e4e", position: "sticky", top: 0, zIndex: 50 }}>
          <div
            style={{
              maxWidth: 960,
              margin: "0 auto",
              padding: "0 16px",
              height: 56,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <a
              href="/"
              style={{ color: "white", fontWeight: 900, fontSize: 18, letterSpacing: -0.5, textDecoration: "none" }}
            >
              Propaxar
            </a>
            <button
              onClick={() => setLang((l) => (l === "es" ? "en" : "es"))}
              style={{
                border: "1px solid rgba(255,255,255,0.45)",
                color: "white",
                borderRadius: 6,
                padding: "6px 14px",
                fontSize: 13,
                fontWeight: 600,
                background: "transparent",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              {isEs ? "EN" : "ES"}
            </button>
          </div>
        </div>

        {/* Hero */}
        <section
          style={{
            background: "linear-gradient(135deg, #2d3e4e 0%, #3d5a73 50%, #2d3e4e 100%)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{ maxWidth: 960, margin: "0 auto", padding: "48px 24px 64px" }}>
            <p
              style={{
                color: "rgba(255,255,255,0.5)",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 3,
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              Ref. {prop.ref_interna.toUpperCase()} · {operacion}
              {prop.propaxar_direct && (
                <span
                  style={{
                    marginLeft: 10,
                    backgroundColor: "#22c55e",
                    color: "white",
                    borderRadius: 4,
                    padding: "2px 8px",
                    fontSize: 10,
                  }}
                >
                  PROPAXAR DIRECT
                </span>
              )}
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "flex-end",
                justifyContent: "space-between",
                gap: 16,
                marginBottom: 32,
              }}
            >
              <div>
                <h1
                  style={{
                    color: "white",
                    fontWeight: 900,
                    fontSize: "clamp(2rem,5vw,3rem)",
                    letterSpacing: "-0.025em",
                    lineHeight: 1.1,
                    margin: 0,
                  }}
                >
                  {prop.titulo}
                </h1>
                <p
                  style={{
                    color: "rgba(255,255,255,0.6)",
                    fontSize: 14,
                    marginTop: 8,
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <MapPin style={{ width: 14, height: 14 }} />
                  {zona}, Málaga
                </p>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ color: "white", fontWeight: 900, fontSize: "clamp(2rem,5vw,3rem)" }}>{precio}</div>
                <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 14 }}>{periodo}</div>
              </div>
            </div>
            {imgs.length > 0 ? (
              <div
                onClick={() => {
                  setLbIdx(0);
                  setLb(true);
                }}
                style={{
                  cursor: "pointer",
                  overflow: "hidden",
                  borderRadius: 8,
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
              >
                <img
                  src={imgs[0]}
                  alt={prop.titulo}
                  style={{
                    width: "100%",
                    objectFit: "cover",
                    maxHeight: 480,
                    display: "block",
                    transition: "transform 0.5s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />
              </div>
            ) : (
              <div
                style={{
                  height: 320,
                  borderRadius: 8,
                  border: "1px solid rgba(255,255,255,0.1)",
                  backgroundColor: "rgba(255,255,255,0.05)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  color: "rgba(255,255,255,0.3)",
                  gap: 8,
                }}
              >
                <Home style={{ width: 48, height: 48 }} />
                <p style={{ margin: 0, fontSize: 14 }}>{isEs ? "Imágenes próximamente" : "Images coming soon"}</p>
              </div>
            )}
          </div>
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
            <svg
              viewBox="0 0 1440 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: "100%", display: "block" }}
            >
              <path d="M0 48h1440V24C1200 0 960 48 720 24S240 0 0 24V48z" fill="#f5f5f5" />
            </svg>
          </div>
        </section>

        {/* Content */}
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "48px 16px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 24, alignItems: "start" }}>
            {/* Left */}
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {/* Stats */}
              <div style={card}>
                <div style={{ padding: "16px 24px", backgroundColor: "#f0f4f8", borderBottom: "1px solid #d1dde8" }}>
                  <p style={{ fontWeight: 700, fontSize: 16, color: "#2d3e4e", margin: 0 }}>
                    {isEs ? "Visión general" : "Overview"}
                  </p>
                </div>
                <div
                  style={{
                    padding: "20px 24px",
                    display: "grid",
                    gridTemplateColumns: `repeat(${stats.length}, 1fr)`,
                    gap: 16,
                  }}
                >
                  {stats.map((s, i) => (
                    <div key={i} style={{ textAlign: "center" }}>
                      <s.icon
                        style={{ width: 20, height: 20, margin: "0 auto 8px", color: "#3d5a73", display: "block" }}
                      />
                      <div style={{ fontWeight: 900, fontSize: 20, color: "#1a1a1a" }}>{s.value}</div>
                      <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1, color: "#9ca3af" }}>
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              {features.length > 0 && (
                <div style={card}>
                  <div style={{ padding: "16px 24px", backgroundColor: "#f0f4f8", borderBottom: "1px solid #d1dde8" }}>
                    <p style={{ fontWeight: 700, fontSize: 16, color: "#2d3e4e", margin: 0 }}>
                      {isEs ? "Características" : "Features"}
                    </p>
                  </div>
                  <div style={{ padding: "20px 24px", display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12 }}>
                    {features.map((f, i) => (
                      <div
                        key={i}
                        style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 14, color: "#1a1a1a" }}
                      >
                        <div
                          style={{
                            width: 32,
                            height: 32,
                            borderRadius: 8,
                            backgroundColor: "rgba(61,90,115,0.1)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          <f.icon style={{ width: 16, height: 16, color: "#3d5a73" }} />
                        </div>
                        {f.label}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              {(desc || analisis.length > 0) && (
                <div style={card}>
                  <div style={{ padding: "16px 24px", backgroundColor: "#f0f4f8", borderBottom: "1px solid #d1dde8" }}>
                    <p style={{ fontWeight: 700, fontSize: 16, color: "#2d3e4e", margin: 0 }}>
                      {isEs ? "Descripción" : "Description"}
                    </p>
                  </div>
                  <div
                    style={{
                      padding: "20px 24px",
                      fontSize: 14,
                      lineHeight: 1.7,
                      color: "#444",
                      display: "flex",
                      flexDirection: "column",
                      gap: 16,
                    }}
                  >
                    {desc && <p style={{ whiteSpace: "pre-wrap", margin: 0 }}>{desc}</p>}
                    {analisis.length > 0 && (
                      <>
                        <h3 style={{ fontWeight: 900, fontSize: 16, color: "#2d3e4e", margin: "8px 0 4px" }}>
                          {isEs ? "Análisis de la propiedad:" : "Property analysis:"}
                        </h3>
                        <ul
                          style={{
                            padding: 0,
                            listStyle: "none",
                            margin: 0,
                            display: "flex",
                            flexDirection: "column",
                            gap: 16,
                          }}
                        >
                          {analisis.map((a, i) => (
                            <li key={i}>
                              <strong style={{ color: "#1a1a1a" }}>{a.t}:</strong>{" "}
                              <span style={{ color: "#666" }}>{a.v}</span>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                    {prop.aspectos_a_considerar && (
                      <div
                        style={{
                          padding: 16,
                          borderRadius: 8,
                          backgroundColor: "#fef9ec",
                          borderLeft: "4px solid #f59e0b",
                        }}
                      >
                        <p style={{ fontSize: 12, fontWeight: 700, color: "#92400e", margin: "0 0 4px" }}>
                          {isEs ? "Aspectos a considerar:" : "Points to consider:"}
                        </p>
                        <p style={{ fontSize: 12, color: "#78350f", margin: 0 }}>{prop.aspectos_a_considerar}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Gallery */}
              {imgs.length > 1 && (
                <div style={card}>
                  <div style={{ padding: "16px 24px", backgroundColor: "#f0f4f8", borderBottom: "1px solid #d1dde8" }}>
                    <p style={{ fontWeight: 700, fontSize: 16, color: "#2d3e4e", margin: 0 }}>
                      {isEs ? "Galería completa" : "Full Gallery"} ({imgs.length})
                    </p>
                  </div>
                  <div style={{ padding: "20px 24px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
                      {imgs.map((photo: string, i: number) => (
                        <div
                          key={i}
                          onClick={() => {
                            setLbIdx(i);
                            setLb(true);
                          }}
                          style={{
                            cursor: "pointer",
                            overflow: "hidden",
                            borderRadius: 8,
                            aspectRatio: "4/3",
                            border: "1px solid #e5e7eb",
                          }}
                        >
                          <img
                            src={photo}
                            alt={`Foto ${i + 1}`}
                            loading="lazy"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              transition: "transform 0.5s",
                              display: "block",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right - sticky */}
            <div style={{ position: "sticky", top: 72, display: "flex", flexDirection: "column", gap: 16 }}>
              {/* Price */}
              <div
                style={{
                  borderRadius: 8,
                  overflow: "hidden",
                  background: "linear-gradient(135deg, #2d3e4e 0%, #3d5a73 100%)",
                  color: "white",
                }}
              >
                <div style={{ padding: 24, textAlign: "center" }}>
                  <div style={{ fontWeight: 900, fontSize: 36, lineHeight: 1.1 }}>{precio}</div>
                  <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, marginTop: 4 }}>
                    {periodo} · {operacion}
                  </div>
                  {!prop.disponible && (
                    <div
                      style={{
                        marginTop: 8,
                        display: "inline-block",
                        backgroundColor: "rgba(239,68,68,0.3)",
                        color: "#fca5a5",
                        borderRadius: 999,
                        padding: "2px 12px",
                        fontSize: 11,
                      }}
                    >
                      {isEs ? "No disponible" : "Not available"}
                    </div>
                  )}
                </div>
                <div style={{ padding: "0 24px 24px", display: "flex", flexDirection: "column", gap: 12 }}>
                  {[
                    {
                      href: waLink,
                      bg: "#22c55e",
                      icon: MessageCircle,
                      label: isEs ? "WhatsApp — Agendar visita" : "WhatsApp — Schedule viewing",
                      fw: 700,
                    },
                    {
                      href: `mailto:info@propaxar.com?subject=${encodeURIComponent(`Consulta ${prop.ref_interna}`)}`,
                      bg: "rgba(255,255,255,0.12)",
                      border: "1px solid rgba(255,255,255,0.25)",
                      icon: Mail,
                      label: isEs ? "Enviar email" : "Send email",
                      fw: 700,
                    },
                    {
                      href: "tel:+34662317561",
                      bg: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      icon: Phone,
                      label: "+34 662 317 561",
                      fw: 600,
                      opacity: 0.8,
                    },
                  ].map((btn, i) => (
                    <a
                      key={i}
                      href={btn.href}
                      target={btn.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                        padding: "12px 16px",
                        borderRadius: 8,
                        backgroundColor: btn.bg,
                        border: btn.border ?? "none",
                        color: btn.opacity ? `rgba(255,255,255,${btn.opacity})` : "#fff",
                        textDecoration: "none",
                        fontSize: 14,
                        fontWeight: btn.fw,
                        boxSizing: "border-box",
                      }}
                    >
                      <btn.icon style={{ width: 16, height: 16 }} />
                      {btn.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Agent */}
              <div
                style={{
                  borderRadius: 8,
                  padding: 24,
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      backgroundColor: "#3d5a73",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 900,
                      fontSize: 18,
                      color: "white",
                    }}
                  >
                    M
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: "#1a1a1a" }}>Manuel C. Fernández</div>
                    <div style={{ fontSize: 12, color: "#9ca3af" }}>
                      {isEs ? "Consultor inmobiliario · Frigiliana" : "Property consultant · Frigiliana"}
                    </div>
                  </div>
                </div>
                <p style={{ fontSize: 12, lineHeight: 1.6, color: "#666", margin: 0 }}>
                  {isEs
                    ? "40 años de conocimiento local. Te ayudo a encontrar exactamente lo que buscas — sin perder tiempo."
                    : "40 years of local knowledge. I help you find exactly what you're looking for — without wasting time."}
                </p>
              </div>

              {/* Highlights */}
              {highlights.length > 0 && (
                <div
                  style={{
                    borderRadius: 8,
                    padding: 24,
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                  }}
                >
                  <h3
                    style={{
                      fontSize: 11,
                      fontWeight: 900,
                      textTransform: "uppercase",
                      letterSpacing: 3,
                      color: "#2d3e4e",
                      margin: "0 0 16px",
                    }}
                  >
                    {isEs ? "Lo que destaca" : "Highlights"}
                  </h3>
                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: 0,
                      display: "flex",
                      flexDirection: "column",
                      gap: 10,
                    }}
                  >
                    {highlights.map((item, i) => (
                      <li
                        key={i}
                        style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 12, color: "#1a1a1a" }}
                      >
                        <span style={{ fontWeight: 900, color: "#22c55e", flexShrink: 0 }}>✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ backgroundColor: "#2d3e4e", padding: "32px 16px" }}>
          <div
            style={{
              maxWidth: 960,
              margin: "0 auto",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            <span style={{ color: "white", fontWeight: 900, fontSize: 18 }}>Propaxar</span>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>© 2026 Propaxar · Frigiliana, Málaga</span>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lb && imgs.length > 0 && (
        <div
          onClick={() => setLb(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 999,
            backgroundColor: "rgba(0,0,0,0.92)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <button
            onClick={() => setLb(false)}
            style={{
              position: "absolute",
              top: 16,
              right: 16,
              background: "none",
              border: "none",
              color: "rgba(255,255,255,0.8)",
              cursor: "pointer",
            }}
          >
            <X style={{ width: 32, height: 32 }} />
          </button>
          {imgs.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLbIdx((i) => (i - 1 + imgs.length) % imgs.length);
                }}
                style={{
                  position: "absolute",
                  left: 16,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  color: "rgba(255,255,255,0.8)",
                  cursor: "pointer",
                }}
              >
                <ChevronLeft style={{ width: 40, height: 40 }} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLbIdx((i) => (i + 1) % imgs.length);
                }}
                style={{
                  position: "absolute",
                  right: 16,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  color: "rgba(255,255,255,0.8)",
                  cursor: "pointer",
                }}
              >
                <ChevronRight style={{ width: 40, height: 40 }} />
              </button>
            </>
          )}
          <img
            src={imgs[lbIdx]}
            alt=""
            style={{ maxWidth: "90vw", maxHeight: "85vh", objectFit: "contain" }}
            onClick={(e) => e.stopPropagation()}
          />
          <div
            style={{
              position: "absolute",
              bottom: 16,
              left: "50%",
              transform: "translateX(-50%)",
              color: "rgba(255,255,255,0.6)",
              fontSize: 14,
              fontFamily: "monospace",
            }}
          >
            {lbIdx + 1} / {imgs.length}
          </div>
        </div>
      )}
    </>
  );
}
