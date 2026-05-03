// src/pages/ReportePublico.tsx
// Página pública del reporte personalizado · Propaxar
// Web pública (propaxar-frigi-home) — NO va en el CRM
// Ruta: /r/:slug

import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/lib/supabase";

// --------------------------- Tipos ---------------------------

type Idioma = "en" | "es" | "nl" | "de" | "fr";
type PropSel = { propiedad_id: string; orden: number; analisis_personalizado: string };

type Reporte = {
  id: string;
  slug: string;
  lead_id: string | null;
  idioma: Idioma;
  estado: "activo" | "inactivo" | "borrador";
  nombre_cliente: string | null;
  texto_mercado: string | null;
  texto_recomendacion: string | null;
  propiedades_seleccionadas: PropSel[];
  created_at: string;
};

type Propiedad = {
  id: string;
  ref_interna: string | null;
  titulo: string;
  tipo: string | null;
  operacion: string | null;
  zona: string | null;
  precio: number | null;
  habitaciones: number | null;
  banos: number | null;
  m2_construidos: number | null;
  piscina: string | null;
  mascotas_permitidas: boolean | null;
  disponible: boolean | null;
  disponible_desde: string | null;
  propaxar_direct: boolean | null;
  puntos_fuertes: string | null;
  aspectos_a_considerar: string | null;
  descripcion: string | null;
  imagenes?: string[] | null;
};

type Lead = {
  id: string;
  persona: { nombre: string | null; apellidos: string | null; nacionalidad: string | null; idioma: string | null } | null;
  demanda: {
    tipo_operacion: string | null;
    presupuesto_max: number | null;
    zona_preferida: string | null;
    tipo_propiedad: string | null;
    habitaciones_min: number | null;
    mascotas: boolean | null;
    fecha_entrada: string | null;
    flexibilidad: string | null;
  } | null;
};

// --------------------------- i18n ---------------------------

const T: Record<Idioma, Record<string, string>> = {
  en: {
    hero_title: "Your Personal Property Report",
    hero_prepared: "Prepared exclusively for",
    hero_by: "by Manuel Fernández · Propaxar · La Axarquía",
    hero_zone: "Frigiliana · La Axarquía",
    hero_confidential: "Confidential",
    hero_quote: "I have personally visited and analysed each of these properties with your profile in mind. This is not an automated list — it is a curated selection based on your specific needs.",
    profile_title: "Your search profile",
    profile_req: "YOUR REQUIREMENTS",
    profile_you: "YOUR PROFILE",
    op: "Operation", budget: "Budget", zone: "Zone", type: "Type", bedrooms: "Min. bedrooms",
    pets: "Pets", move_in: "Move-in date", flex: "Flexibility",
    name: "Name", nationality: "Nationality", language: "Language",
    market_title: "Current Market in La Axarquía",
    props_title: "Selected Properties",
    best_match: "BEST MATCH", good_option: "GOOD OPTION", option: "OPTION",
    direct: "PROPAXAR DIRECT",
    view_full: "VIEW FULL ANALYSIS", hide: "HIDE",
    strengths: "Strengths", considerations: "Considerations",
    custom_analysis: "Manuel's analysis for you",
    request_viewing: "Request Viewing",
    compare_title: "At a glance",
    requirement: "Requirement",
    rec_title: "Final Recommendation",
    arrange: "ARRANGE A VIEWING",
    next_title: "Next steps",
    n1_t: "Tell me your favourites", n1_d: "Reply to confirm which properties you'd like to visit.",
    n2_t: "I arrange the viewings", n2_d: "I coordinate with each owner and prepare a viewing route.",
    n3_t: "We meet in Frigiliana", n3_d: "I host you in person and walk you through every property.",
    inactive: "This report is not available.",
    properties: "properties", available: "Available",
    yes: "Yes", no: "No", any: "Any",
  },
  es: {
    hero_title: "Tu Reporte de Propiedades Personalizado",
    hero_prepared: "Preparado exclusivamente para",
    hero_by: "por Manuel Fernández · Propaxar · La Axarquía",
    hero_zone: "Frigiliana · La Axarquía",
    hero_confidential: "Confidencial",
    hero_quote: "He visitado y analizado personalmente cada una de estas propiedades pensando en tu perfil. No es una lista automatizada — es una selección curada según tus necesidades específicas.",
    profile_title: "Tu perfil de búsqueda",
    profile_req: "TUS REQUISITOS",
    profile_you: "TU PERFIL",
    op: "Operación", budget: "Presupuesto", zone: "Zona", type: "Tipo", bedrooms: "Habitaciones mín.",
    pets: "Mascotas", move_in: "Fecha entrada", flex: "Flexibilidad",
    name: "Nombre", nationality: "Nacionalidad", language: "Idioma",
    market_title: "Mercado actual en La Axarquía",
    props_title: "Propiedades seleccionadas",
    best_match: "MEJOR OPCIÓN", good_option: "BUENA OPCIÓN", option: "OPCIÓN",
    direct: "PROPAXAR DIRECT",
    view_full: "VER ANÁLISIS COMPLETO", hide: "OCULTAR",
    strengths: "Puntos fuertes", considerations: "A considerar",
    custom_analysis: "Análisis de Manuel para ti",
    request_viewing: "Solicitar visita",
    compare_title: "Tabla comparativa",
    requirement: "Requisito",
    rec_title: "Recomendación final",
    arrange: "AGENDAR VISITA",
    next_title: "Próximos pasos",
    n1_t: "Dime tus favoritas", n1_d: "Responde para confirmar qué propiedades te gustaría visitar.",
    n2_t: "Coordino las visitas", n2_d: "Hablo con cada propietario y preparo la ruta.",
    n3_t: "Nos vemos en Frigiliana", n3_d: "Te recibo en persona y visitamos cada propiedad.",
    inactive: "Este reporte no está disponible.",
    properties: "propiedades", available: "Disponible",
    yes: "Sí", no: "No", any: "Indiferente",
  },
  nl: {
    hero_title: "Uw Persoonlijk Vastgoedrapport",
    hero_prepared: "Exclusief samengesteld voor",
    hero_by: "door Manuel Fernández · Propaxar · La Axarquía",
    hero_zone: "Frigiliana · La Axarquía",
    hero_confidential: "Vertrouwelijk",
    hero_quote: "Ik heb elk van deze panden persoonlijk bezocht en geanalyseerd met uw profiel in gedachten. Dit is geen automatische lijst — het is een gerichte selectie.",
    profile_title: "Uw zoekprofiel",
    profile_req: "UW WENSEN", profile_you: "UW PROFIEL",
    op: "Type", budget: "Budget", zone: "Zone", type: "Soort", bedrooms: "Min. slaapkamers",
    pets: "Huisdieren", move_in: "Inhuisdatum", flex: "Flexibiliteit",
    name: "Naam", nationality: "Nationaliteit", language: "Taal",
    market_title: "Huidige markt in La Axarquía",
    props_title: "Geselecteerde panden",
    best_match: "BESTE MATCH", good_option: "GOEDE OPTIE", option: "OPTIE",
    direct: "PROPAXAR DIRECT",
    view_full: "VOLLEDIGE ANALYSE", hide: "VERBERGEN",
    strengths: "Sterke punten", considerations: "Aandachtspunten",
    custom_analysis: "Analyse van Manuel voor u",
    request_viewing: "Bezichtiging aanvragen",
    compare_title: "Vergelijking",
    requirement: "Vereiste",
    rec_title: "Eindadvies",
    arrange: "BEZICHTIGING REGELEN",
    next_title: "Volgende stappen",
    n1_t: "Laat uw favorieten weten", n1_d: "Antwoord welke panden u wilt bezichtigen.",
    n2_t: "Ik regel de bezichtigingen", n2_d: "Ik coördineer met elke eigenaar.",
    n3_t: "We ontmoeten elkaar in Frigiliana", n3_d: "Ik ontvang u persoonlijk.",
    inactive: "Dit rapport is niet beschikbaar.",
    properties: "panden", available: "Beschikbaar",
    yes: "Ja", no: "Nee", any: "Geen voorkeur",
  },
  de: {
    hero_title: "Ihr persönlicher Immobilienbericht",
    hero_prepared: "Exklusiv erstellt für",
    hero_by: "von Manuel Fernández · Propaxar · La Axarquía",
    hero_zone: "Frigiliana · La Axarquía",
    hero_confidential: "Vertraulich",
    hero_quote: "Ich habe jede dieser Immobilien persönlich besichtigt und mit Blick auf Ihr Profil analysiert. Dies ist keine automatische Liste, sondern eine kuratierte Auswahl.",
    profile_title: "Ihr Suchprofil",
    profile_req: "IHRE ANFORDERUNGEN", profile_you: "IHR PROFIL",
    op: "Vorgang", budget: "Budget", zone: "Lage", type: "Typ", bedrooms: "Min. Zimmer",
    pets: "Haustiere", move_in: "Einzugsdatum", flex: "Flexibilität",
    name: "Name", nationality: "Nationalität", language: "Sprache",
    market_title: "Aktueller Markt in La Axarquía",
    props_title: "Ausgewählte Immobilien",
    best_match: "BESTE OPTION", good_option: "GUTE OPTION", option: "OPTION",
    direct: "PROPAXAR DIRECT",
    view_full: "VOLLSTÄNDIGE ANALYSE", hide: "VERBERGEN",
    strengths: "Stärken", considerations: "Zu beachten",
    custom_analysis: "Manuels Analyse für Sie",
    request_viewing: "Besichtigung anfragen",
    compare_title: "Vergleich",
    requirement: "Anforderung",
    rec_title: "Abschließende Empfehlung",
    arrange: "BESICHTIGUNG VEREINBAREN",
    next_title: "Nächste Schritte",
    n1_t: "Nennen Sie Ihre Favoriten", n1_d: "Antworten Sie, welche Immobilien Sie besichtigen möchten.",
    n2_t: "Ich organisiere die Termine", n2_d: "Ich koordiniere mit jedem Eigentümer.",
    n3_t: "Wir treffen uns in Frigiliana", n3_d: "Ich empfange Sie persönlich.",
    inactive: "Dieser Bericht ist nicht verfügbar.",
    properties: "Immobilien", available: "Verfügbar",
    yes: "Ja", no: "Nein", any: "Egal",
  },
  fr: {
    hero_title: "Votre Rapport Immobilier Personnel",
    hero_prepared: "Préparé exclusivement pour",
    hero_by: "par Manuel Fernández · Propaxar · La Axarquía",
    hero_zone: "Frigiliana · La Axarquía",
    hero_confidential: "Confidentiel",
    hero_quote: "J'ai visité et analysé personnellement chacune de ces propriétés en pensant à votre profil. Ce n'est pas une liste automatisée — c'est une sélection sur mesure.",
    profile_title: "Votre profil de recherche",
    profile_req: "VOS CRITÈRES", profile_you: "VOTRE PROFIL",
    op: "Opération", budget: "Budget", zone: "Zone", type: "Type", bedrooms: "Chambres min.",
    pets: "Animaux", move_in: "Date d'entrée", flex: "Flexibilité",
    name: "Nom", nationality: "Nationalité", language: "Langue",
    market_title: "Le marché actuel à La Axarquía",
    props_title: "Propriétés sélectionnées",
    best_match: "MEILLEUR CHOIX", good_option: "BONNE OPTION", option: "OPTION",
    direct: "PROPAXAR DIRECT",
    view_full: "ANALYSE COMPLÈTE", hide: "MASQUER",
    strengths: "Points forts", considerations: "À considérer",
    custom_analysis: "L'analyse de Manuel pour vous",
    request_viewing: "Demander une visite",
    compare_title: "Comparatif",
    requirement: "Critère",
    rec_title: "Recommandation finale",
    arrange: "ORGANISER UNE VISITE",
    next_title: "Prochaines étapes",
    n1_t: "Indiquez vos favoris", n1_d: "Répondez en confirmant les propriétés à visiter.",
    n2_t: "J'organise les visites", n2_d: "Je coordonne avec chaque propriétaire.",
    n3_t: "Rendez-vous à Frigiliana", n3_d: "Je vous reçois en personne.",
    inactive: "Ce rapport n'est pas disponible.",
    properties: "propriétés", available: "Disponible",
    yes: "Oui", no: "Non", any: "Indifférent",
  },
};

// --------------------------- Matching score ---------------------------

function matchScore(
  prop: Pick<Propiedad, "precio" | "operacion" | "zona" | "tipo" | "habitaciones" | "mascotas_permitidas">,
  demand: NonNullable<Lead["demanda"]> | null,
): number {
  if (!demand) return 0;
  let s = 0;
  const pmax = Number(demand.presupuesto_max ?? 0);
  const precio = Number(prop.precio ?? 0);
  if (pmax > 0 && precio > 0) {
    if (precio <= pmax) s += 30;
    else if (precio <= pmax * 1.1) s += 15;
  } else if (pmax === 0) s += 15;

  const dop = demand.tipo_operacion === "compra" ? "venta" : demand.tipo_operacion;
  if (!prop.operacion || prop.operacion === "ambas" || prop.operacion === dop) s += 20;

  if (!demand.zona_preferida || demand.zona_preferida === "indiferente") s += 20;
  else if (prop.zona && demand.zona_preferida === prop.zona) s += 20;

  if (!demand.tipo_propiedad || demand.tipo_propiedad === "indiferente") s += 15;
  else if (prop.tipo && demand.tipo_propiedad === prop.tipo) s += 15;

  const hmin = demand.habitaciones_min ?? null;
  const h = prop.habitaciones ?? null;
  if (hmin == null) s += 10;
  else if (h != null) {
    if (h >= hmin) s += 10;
    else if (h === hmin - 1) s += 5;
  }
  if (!demand.mascotas) s += 5;
  else if (prop.mascotas_permitidas === true) s += 5;
  return Math.min(100, s);
}

const WHATSAPP = "34662317561";
const wa = (msg: string) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;

// --------------------------- Componente ---------------------------

export default function ReportePublico() {
  const { slug } = useParams<{ slug: string }>();
  const [reporte, setReporte] = useState<Reporte | null>(null);
  const [propiedades, setPropiedades] = useState<Propiedad[]>([]);
  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  useEffect(() => {
    (async () => {
      if (!slug) return;
      const { data: r } = await supabase
        .from("reportes")
        .select("*")
        .eq("slug", slug)
        .eq("estado", "activo")
        .maybeSingle();
      if (!r) { setNotFound(true); setLoading(false); return; }
      setReporte(r as Reporte);

      const ids = ((r.propiedades_seleccionadas as PropSel[]) ?? []).map((p) => p.propiedad_id);
      if (ids.length) {
        const { data: props } = await supabase.from("propiedades").select("*").in("id", ids);
        setPropiedades((props ?? []) as Propiedad[]);
      }
      if (r.lead_id) {
        const { data: l } = await supabase
          .from("leads")
          .select("id, persona:personas(nombre, apellidos, nacionalidad, idioma), demanda:demandas(tipo_operacion, presupuesto_max, zona_preferida, tipo_propiedad, habitaciones_min, mascotas, fecha_entrada, flexibilidad)")
          .eq("id", r.lead_id)
          .maybeSingle();
        if (l) setLead(l as unknown as Lead);
      }
      setLoading(false);
    })();
  }, [slug]);

  const t = T[reporte?.idioma ?? "en"];

  const ordered = useMemo(() => {
    if (!reporte) return [];
    const sels = [...(reporte.propiedades_seleccionadas ?? [])].sort((a, b) => a.orden - b.orden);
    const map = new Map(propiedades.map((p) => [p.id, p]));
    return sels
      .map((s) => ({ sel: s, prop: map.get(s.propiedad_id) }))
      .filter((x): x is { sel: PropSel; prop: Propiedad } => !!x.prop);
  }, [reporte, propiedades]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500">
        <Helmet><meta name="robots" content="noindex, nofollow" /></Helmet>
        …
      </main>
    );
  }
  if (notFound || !reporte) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-50">
        <Helmet><meta name="robots" content="noindex, nofollow" /></Helmet>
        <div className="text-center">
          <p className="text-xl font-semibold text-slate-700">{T.en.inactive}</p>
          <p className="mt-2 text-sm text-slate-500">Propaxar · Manuel Fernández</p>
        </div>
      </main>
    );
  }

  const cliente = reporte.nombre_cliente ?? lead?.persona?.nombre ?? "";
  const fecha = new Date(reporte.created_at).toLocaleDateString(reporte.idioma);
  const d = lead?.demanda;
  const p = lead?.persona;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <Helmet>
        <title>{`${t.hero_title} · Propaxar`}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* HERO */}
      <header
        className="relative text-white px-6 py-20 md:py-28"
        style={{
          backgroundImage: "linear-gradient(rgba(20,30,50,0.75), rgba(20,30,50,0.85)), url('/images/frigiliana-hero.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-xs tracking-[0.3em] font-bold text-[#D4A017] mb-2">PROPAXAR</div>
          <div className="text-[10px] tracking-widest font-semibold uppercase text-white/70 mb-6">{t.hero_confidential}</div>
          <h1 className="font-serif text-4xl md:text-6xl leading-tight">{t.hero_title}</h1>
          <p className="mt-6 text-lg md:text-xl text-white/90">{t.hero_prepared} <span className="font-semibold">{cliente}</span></p>
          <p className="mt-1 text-sm text-white/70">{t.hero_by}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-white/70">
            <span>{fecha}</span>
            <span className="opacity-50">·</span>
            <span>{ordered.length} {t.properties}</span>
            <span className="opacity-50">·</span>
            <span>{t.hero_zone}</span>
          </div>
          <blockquote className="mt-10 max-w-3xl border-l-2 border-[#D4A017] pl-6 text-white/90 italic">
            "{t.hero_quote}"
            <footer className="mt-3 not-italic text-xs tracking-wide text-white/60">— Manuel Fernández, Propaxar</footer>
          </blockquote>
        </div>
      </header>

      {/* PROFILE */}
      <section className="px-6 py-14 max-w-5xl mx-auto">
        <h2 className="font-serif text-2xl md:text-3xl mb-6">{t.profile_title}</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <ProfileCard title={t.profile_req}>
            <KV k={t.op} v={fmtOp(d?.tipo_operacion, t)} />
            <KV k={t.budget} v={d?.presupuesto_max ? `${Number(d.presupuesto_max).toLocaleString()} €` : "—"} />
            <KV k={t.zone} v={fmtZona(d?.zona_preferida, t)} />
            <KV k={t.type} v={fmtTipo(d?.tipo_propiedad, t)} />
            <KV k={t.bedrooms} v={d?.habitaciones_min?.toString() ?? "—"} />
            <KV k={t.pets} v={d?.mascotas == null ? "—" : d.mascotas ? t.yes : t.no} />
            <KV k={t.move_in} v={d?.fecha_entrada ?? "—"} />
            <KV k={t.flex} v={d?.flexibilidad ?? "—"} />
          </ProfileCard>
          <ProfileCard title={t.profile_you}>
            <KV k={t.name} v={[p?.nombre, p?.apellidos].filter(Boolean).join(" ") || cliente || "—"} />
            <KV k={t.nationality} v={p?.nacionalidad ?? "—"} />
            <KV k={t.language} v={p?.idioma ?? reporte.idioma} />
          </ProfileCard>
        </div>
      </section>

      {/* MARKET */}
      {reporte.texto_mercado && (
        <section className="px-6 py-14 bg-white border-y border-slate-200">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl mb-4">{t.market_title}</h2>
            <p className="whitespace-pre-line text-slate-700 leading-relaxed">{reporte.texto_mercado}</p>
          </div>
        </section>
      )}

      {/* PROPS */}
      <section className="px-6 py-14 max-w-5xl mx-auto">
        <h2 className="font-serif text-2xl md:text-3xl mb-8">{t.props_title}</h2>
        <div className="space-y-10">
          {ordered.map(({ sel, prop }, i) => {
            const score = matchScore(prop, lead?.demanda ?? null);
            const badge = i === 0 ? `#1 ${t.best_match}` : i === 1 ? `#2 ${t.good_option}` : `#${i + 1} ${t.option}`;
            const img = prop.imagenes && prop.imagenes[0];
            const isOpen = !!expanded[prop.id];
            return (
              <article key={prop.id} className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                <div className="relative h-64 md:h-80 bg-slate-100">
                  {img ? (
                    <img src={img} alt={prop.titulo} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400">{prop.titulo}</div>
                  )}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="text-[10px] tracking-widest font-bold bg-[#2D3748] text-white px-3 py-1 rounded">{badge}</span>
                    {prop.propaxar_direct && (
                      <span className="text-[10px] tracking-widest font-bold bg-[#D4A017] text-white px-3 py-1 rounded">{t.direct}</span>
                    )}
                  </div>
                </div>

                <div className="p-6 md:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-xs tracking-widest text-slate-500">{prop.ref_interna ?? ""}</p>
                      <h3 className="font-serif text-2xl mt-1">{prop.titulo}</h3>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-semibold text-[#2D3748]">
                        {prop.precio ? `${Number(prop.precio).toLocaleString()} €` : "—"}
                        {prop.operacion !== "venta" && <span className="text-sm font-normal text-slate-500">/mes</span>}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
                    <Spec label={t.bedrooms} v={prop.habitaciones?.toString()} />
                    <Spec label="Baños" v={prop.banos?.toString()} />
                    <Spec label="m²" v={prop.m2_construidos?.toString()} />
                    <Spec label="Piscina" v={prop.piscina} />
                    <Spec label={t.pets} v={prop.mascotas_permitidas == null ? "—" : prop.mascotas_permitidas ? t.yes : t.no} />
                    <Spec label={t.available} v={prop.disponible_desde ?? (prop.disponible ? t.yes : "—")} />
                  </div>

                  {lead?.demanda && (
                    <div className="mt-6 flex items-center gap-3">
                      <div className="flex-1 bg-slate-100 h-2 rounded">
                        <div
                          className={`h-2 rounded ${score >= 70 ? "bg-emerald-500" : score >= 40 ? "bg-amber-500" : "bg-slate-400"}`}
                          style={{ width: `${score}%` }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-slate-600">{score}%</span>
                    </div>
                  )}

                  <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                    <button
                      onClick={() => setExpanded((s) => ({ ...s, [prop.id]: !s[prop.id] }))}
                      className="text-xs tracking-widest font-bold text-[#2D3748] border-b-2 border-[#D4A017] hover:text-[#D4A017]"
                    >
                      {isOpen ? t.hide : t.view_full}
                    </button>
                    <a
                      href={wa(`Hola Manuel, me interesa la propiedad ${prop.ref_interna ?? prop.titulo}.`)}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs tracking-widest font-bold bg-[#2D3748] text-white px-5 py-3 rounded hover:bg-[#1a202c]"
                    >
                      {t.request_viewing}
                    </a>
                  </div>

                  {isOpen && (
                    <div className="mt-6 border-t border-slate-200 pt-6 space-y-6">
                      {prop.imagenes && prop.imagenes.length > 1 && (
                        <div className="grid grid-cols-3 gap-2">
                          {prop.imagenes.slice(0, 6).map((u) => (
                            <img key={u} src={u} alt={prop.titulo} className="w-full h-28 object-cover rounded" />
                          ))}
                        </div>
                      )}
                      {sel.analisis_personalizado && (
                        <div>
                          <h4 className="text-xs tracking-widest font-bold text-[#D4A017] mb-2">{t.custom_analysis}</h4>
                          <p className="whitespace-pre-line text-slate-700 leading-relaxed">{sel.analisis_personalizado}</p>
                        </div>
                      )}
                      <div className="grid md:grid-cols-2 gap-4">
                        {prop.puntos_fuertes && (
                          <div className="bg-emerald-50 border border-emerald-100 rounded p-4">
                            <h4 className="text-xs tracking-widest font-bold text-emerald-800 mb-2">{t.strengths}</h4>
                            <p className="whitespace-pre-line text-sm text-emerald-900">{prop.puntos_fuertes}</p>
                          </div>
                        )}
                        {prop.aspectos_a_considerar && (
                          <div className="bg-amber-50 border border-amber-100 rounded p-4">
                            <h4 className="text-xs tracking-widest font-bold text-amber-800 mb-2">{t.considerations}</h4>
                            <p className="whitespace-pre-line text-sm text-amber-900">{prop.aspectos_a_considerar}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* COMPARE */}
      {ordered.length > 0 && lead?.demanda && (
        <section className="px-6 py-14 bg-white border-y border-slate-200">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl mb-6">{t.compare_title}</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="text-left text-xs tracking-widest text-slate-500">
                    <th className="py-3 pr-4">{t.requirement}</th>
                    {ordered.map(({ prop }, i) => (
                      <th key={prop.id} className="py-3 px-3">#{i + 1} {prop.ref_interna}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <CompareRow label={t.budget} cells={ordered.map(({ prop }) => ({
                    text: prop.precio ? `${Number(prop.precio).toLocaleString()} €` : "—",
                    status: !lead.demanda?.presupuesto_max || !prop.precio ? "n" : prop.precio <= (lead.demanda.presupuesto_max ?? 0) ? "g" : prop.precio <= (lead.demanda.presupuesto_max ?? 0) * 1.1 ? "a" : "r",
                  }))} />
                  <CompareRow label={t.zone} cells={ordered.map(({ prop }) => ({
                    text: fmtZona(prop.zona, t),
                    status: !lead.demanda?.zona_preferida || lead.demanda.zona_preferida === "indiferente" ? "n" : prop.zona === lead.demanda.zona_preferida ? "g" : "r",
                  }))} />
                  <CompareRow label={t.type} cells={ordered.map(({ prop }) => ({
                    text: fmtTipo(prop.tipo, t),
                    status: !lead.demanda?.tipo_propiedad || lead.demanda.tipo_propiedad === "indiferente" ? "n" : prop.tipo === lead.demanda.tipo_propiedad ? "g" : "r",
                  }))} />
                  <CompareRow label={t.bedrooms} cells={ordered.map(({ prop }) => ({
                    text: prop.habitaciones?.toString() ?? "—",
                    status: !lead.demanda?.habitaciones_min ? "n" : (prop.habitaciones ?? 0) >= lead.demanda.habitaciones_min ? "g" : (prop.habitaciones ?? 0) === lead.demanda.habitaciones_min - 1 ? "a" : "r",
                  }))} />
                  <CompareRow label={t.pets} cells={ordered.map(({ prop }) => ({
                    text: prop.mascotas_permitidas == null ? "—" : prop.mascotas_permitidas ? t.yes : t.no,
                    status: !lead.demanda?.mascotas ? "n" : prop.mascotas_permitidas ? "g" : "r",
                  }))} />
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* RECOMMENDATION */}
      {reporte.texto_recomendacion && (
        <section className="px-6 py-16 max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-2xl md:text-3xl mb-4">{t.rec_title}</h2>
          <p className="whitespace-pre-line text-slate-700 leading-relaxed text-left">{reporte.texto_recomendacion}</p>
          <a
            href={wa(`Hola Manuel, me gustaría agendar una visita tras leer mi reporte.`)}
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-8 text-xs tracking-widest font-bold bg-[#D4A017] text-white px-8 py-4 rounded hover:bg-[#b8870f]"
          >
            {t.arrange}
          </a>
        </section>
      )}

      {/* NEXT STEPS */}
      <section className="px-6 py-16 bg-[#2D3748] text-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-2xl md:text-3xl mb-8">{t.next_title}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Step n="1" title={t.n1_t} desc={t.n1_d} />
            <Step n="2" title={t.n2_t} desc={t.n2_d} />
            <Step n="3" title={t.n3_t} desc={t.n3_d} />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-6 py-10 text-center bg-slate-900 text-white/70">
        <p className="text-xs tracking-[0.3em] font-bold text-[#D4A017]">PROPAXAR</p>
        <p className="mt-2 text-sm">Manuel Fernández · +34 662 317 561 · info@propaxar.es</p>
      </footer>
    </main>
  );
}

// --------------------------- Subcomponentes ---------------------------

function ProfileCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6">
      <h3 className="text-xs tracking-widest font-bold text-[#D4A017] mb-4">{title}</h3>
      <dl className="space-y-2">{children}</dl>
    </div>
  );
}
function KV({ k, v }: { k: string; v: string | null | undefined }) {
  return (
    <div className="flex justify-between gap-4 text-sm border-b border-slate-100 py-2 last:border-0">
      <dt className="text-slate-500">{k}</dt>
      <dd className="text-slate-900 font-medium text-right">{v || "—"}</dd>
    </div>
  );
}
function Spec({ label, v }: { label: string; v: string | null | undefined }) {
  return (
    <div>
      <p className="text-[10px] tracking-widest text-slate-500 uppercase">{label}</p>
      <p className="text-sm font-semibold text-slate-900 mt-1">{v || "—"}</p>
    </div>
  );
}
function Step({ n, title, desc }: { n: string; title: string; desc: string }) {
  return (
    <div className="border-l-2 border-[#D4A017] pl-5">
      <p className="text-3xl font-serif text-[#D4A017]">{n}</p>
      <p className="mt-2 font-semibold">{title}</p>
      <p className="mt-1 text-sm text-white/70">{desc}</p>
    </div>
  );
}
function CompareRow({ label, cells }: { label: string; cells: { text: string; status: "g" | "a" | "r" | "n" }[] }) {
  const cls = (s: "g" | "a" | "r" | "n") =>
    s === "g" ? "bg-emerald-50 text-emerald-800" :
    s === "a" ? "bg-amber-50 text-amber-800" :
    s === "r" ? "bg-rose-50 text-rose-800" :
    "text-slate-600";
  return (
    <tr className="border-t border-slate-100">
      <td className="py-3 pr-4 font-medium text-slate-700">{label}</td>
      {cells.map((c, i) => (
        <td key={i} className={`py-3 px-3 rounded ${cls(c.status)}`}>{c.text}</td>
      ))}
    </tr>
  );
}

// --------------------------- Helpers ---------------------------

function fmtOp(op: string | null | undefined, _t: Record<string, string>) {
  if (!op) return "—";
  if (op === "alquiler") return "Alquiler / Rent";
  if (op === "compra" || op === "venta") return "Compra / Sale";
  return op;
}
function fmtZona(z: string | null | undefined, t: Record<string, string>) {
  if (!z) return "—";
  if (z === "indiferente") return t.any;
  if (z === "casco_antiguo") return "Casco antiguo";
  if (z === "afueras") return "Afueras";
  if (z === "campo") return "Campo";
  return z;
}
function fmtTipo(tp: string | null | undefined, t: Record<string, string>) {
  if (!tp) return "—";
  if (tp === "indiferente") return t.any;
  return tp.charAt(0).toUpperCase() + tp.slice(1);
}
